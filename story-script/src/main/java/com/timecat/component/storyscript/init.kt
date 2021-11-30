package com.timecat.component.storyscript

import android.app.ActivityManager
import android.app.Application
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Process
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
const val PKG = "com.timecat.component"

class AppTaskList(private val app: Application) : SimpleTaskList<Application>() {
    private val isDebuggable = app.isDebuggable()
    private val currentProcessName = app.resolveCurrentProcessName()
    fun add(moduleName: String, moduleIndex: Int, clazz: Class<out InitTask>, process: String, background: Boolean, debugOnly: Boolean, priority: Short, depends: Set<String>) {
        val name = "$moduleName:${clazz.simpleName}"
        val realPriority = (moduleIndex shl 16) or (priority.toInt() + Short.MAX_VALUE)
        add(name, process, background, debugOnly, realPriority, depends) {
            clazz.newInstance().execute(app)
        }
    }

    fun add(name: String, process: String = "all", background: Boolean = false, debugOnly: Boolean = false, priority: Int = 0, depends: Set<String> = setOf(), block: suspend (Application) -> Unit) {
        if (debugOnly && !isDebuggable) {
            log("===> $name SKIPPED : debug only")
            return
        }
        when (process) {
            "all" -> {}
            "main" -> {
                if (currentProcessName != app.packageName) {
                    log("===> $name SKIPPED : main process only")
                    return
                }
            }
            else -> {
                if (currentProcessName != "${app.packageName}:${process}") {
                    log("===> $name SKIPPED : process [$currentProcessName] [${app.packageName}:${process}] only")
                    return
                }
            }
        }
        add(name, background, priority, depends, block)
    }
}

object InitManager {

    var compliance: Boolean = false
        set(value) {
            if (value && !field) {
                field = true
                complianceRunnable?.run()
                complianceRunnable = null
            }
        }

    private var complianceRunnable: Runnable? = null

    fun init(app: Application) {
        val modules = app.meta("modules") ?: ""
        init(app, modules.split(",").toTypedArray())
    }

    fun init(app: Application, modules: Array<String>) {

        val trigger = ":compliance"
        val taskList = AppTaskList(app)
        val manager = TaskManager(taskList, setOf(trigger))

        modules.map { it.replace("[^0-9a-zA-Z_]+".toRegex(), "") }.forEachIndexed { index, it ->
            try {
                val loaderClass = Class.forName("$PKG.generated.InitLoader_$it")
                val loader = loaderClass.newInstance()
                loaderClass.getMethod("load", AppTaskList::class.java, Int::class.java).invoke(loader, taskList, index)
            } catch (e: ClassNotFoundException) {
                log("There is no Loader in module: $it.")
            } catch (e: Throwable) {
                log(e.message!!)
                e.printStackTrace()
            }
        }

        val sp = app.getSharedPreferences("${app.packageName}-$trigger", Context.MODE_PRIVATE)
        compliance = sp.getBoolean(trigger, false)
        if (compliance) {
            GlobalScope.launch {
                manager.finish(trigger, app)
            }
        } else {
            complianceRunnable = Runnable {
                GlobalScope.launch {
                    manager.finish(trigger, app)
                    sp.edit().putBoolean(trigger, true).apply()
                }
            }
        }
        GlobalScope.launch {
            manager.start(app)
        }
    }
}

internal fun Context.meta(key: String): String? {
    try {
        return packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA).metaData?.getString(key)
    } catch (e: PackageManager.NameNotFoundException) {
        e.printStackTrace()
    }
    return null
}

internal fun Context.isDebuggable(): Boolean = try {
    applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0
} catch (e: Exception) {
    e.printStackTrace()
    false
}

internal fun Context.resolveCurrentProcessName(): String? {
    val pid = Process.myPid()
    (getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager).runningAppProcesses?.forEach {
        if (it.pid == pid) {
            return it.processName
        }
    }
    return null
}
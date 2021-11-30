package com.timecat.component.storyscript

import android.app.ActivityManager
import android.app.Application
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.os.Looper
import android.os.Process
import com.timecat.component.commonsdk.utils.override.LogUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import kotlin.system.measureTimeMillis

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
const val PKG = "com.timecat.component"

interface InitTask {
    suspend fun execute(app: Application)
}

class Task(
    val name: String,
    val background: Boolean = false,    // 是否在工作线程执行任务 background ? Main : IO
    val priority: Int = 0,              // 进程运行的优先级，值小的先执行
    val depends: Set<String> = setOf(), // 依赖的任务列表
    val block: suspend () -> Unit = {},
) {
    val children: MutableSet<Task> = mutableSetOf()
}

class TaskList(private val app: Application) {
    private val isDebuggable = app.isDebuggable()
    private val currentProcessName = app.resolveCurrentProcessName()

    internal val items: ArrayList<Task> = ArrayList()

    fun add(moduleName: String, moduleIndex: Int, clazz: Class<out InitTask>, process: String, background: Boolean, debugOnly: Boolean, priority: Short, depends: Set<String>) {
        val name = "$moduleName:${clazz.simpleName}"
        val realPriority = (moduleIndex shl 16) or (priority.toInt() + Short.MAX_VALUE)
        add(name, process, background, debugOnly, realPriority, depends) {
            clazz.newInstance().execute(app)
        }
    }

    fun add(name: String, process: String = "all", background: Boolean = false, debugOnly: Boolean = false, priority: Int = 0, depends: Set<String> = setOf(), block: suspend () -> Unit) {
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
        items.add(Task(name, background, priority, depends, block))
    }
}

class TaskManager(
    private val taskList: TaskList,
    triggers: Set<String> = setOf(),
    val scope: CoroutineScope = GlobalScope,
) {

    private val done: MutableSet<String> = mutableSetOf()
    private val triggerMap: Map<String, Task> = triggers.map { it to Task(it) }.toMap()

    suspend fun start() {
        // 根据优先级排序
        taskList.items.sortBy { it.priority }

        // 生成任务映射表
        val map = taskList.items.map { it.name to it }.toMap()


        val syncTasks = mutableSetOf<Task>()
        val aloneTasks = mutableSetOf<Task>()

        taskList.items.forEach {
            when {
                // 有依赖的任务
                it.depends.isNotEmpty() -> {
                    // 检测循环依赖
                    checkDependence(listOf(it.name), it.depends, map)
                    // 明确任务依赖关系
                    it.depends.forEach { taskName ->
                        val item = triggerMap[taskName] ?: map[taskName] ?: throw Throwable("Cannot find dependence $taskName ")
                        item.children.add(it)
                    }
                }
                // 无依赖的异步任务
                it.background -> aloneTasks.add(it)
                // 无依赖的同步任务，在主线程执行
                else -> syncTasks.add(it)
            }
        }

        // 无依赖的异步任务，在子线程并行执行
        aloneTasks.forEach {
            flowOf(it).onEach(this::execute).launchIn(scope)
        }

        // 无依赖的同步任务，在主线程顺序执行
        if (Looper.getMainLooper() === Looper.myLooper()) {
            syncTasks.forEach {
                execute(it)
            }
        } else {
            syncTasks.asFlow().flowOn(Dispatchers.Main).onEach(this::execute).launchIn(scope)
        }
    }

    private fun checkDependence(path: List<String>, depends: Set<String>, map: Map<String, Task>) {

        depends.forEach {
            if (path.contains(it)) {
                throw Throwable("Recycle dependence: $path => $it")
            }
            map[it]?.let { item ->
                checkDependence(path + it, item.depends, map)
            }
        }
    }

    fun finish(name: String) {
        triggerMap[name]?.let {
            finish(name, it.children)
        }
    }

    private suspend fun execute(task: Task) {

        val time = measureTimeMillis {
            try {
                task.block()
            } catch (e: Exception) {
                log("===> ${task.name} ERROR : $e")
                e.printStackTrace()
            }
        }
        log("===> ${task.name} DONE : ${time}ms")

        finish(task.name, task.children)
    }


    private fun finish(name: String, children: MutableSet<Task>) = synchronized(done) {
        done.add(name)
        children.filter { done.containsAll(it.depends) }.forEach {
            val flowOn = if (it.background) Dispatchers.Default else Dispatchers.Main
            flowOf(it).flowOn(flowOn).onEach(this::execute).launchIn(scope)
        }
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
        val taskList = TaskList(app)
        val manager = TaskManager(taskList, setOf(trigger))

        modules.map { it.replace("[^0-9a-zA-Z_]+".toRegex(), "") }.forEachIndexed { index, it ->
            try {
                val loaderClass = Class.forName("$PKG.generated.InitLoader_$it")
                val loader = loaderClass.newInstance()
                loaderClass.getMethod("load", TaskList::class.java, Int::class.java).invoke(loader, taskList, index)
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
            manager.finish(trigger)
        } else {
            complianceRunnable = Runnable {
                manager.finish(trigger)
                sp.edit().putBoolean(trigger, true).apply()
            }
        }
        GlobalScope.launch {
            manager.start()
        }
    }
}

internal fun log(message: String) {
    LogUtil.d(message);
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
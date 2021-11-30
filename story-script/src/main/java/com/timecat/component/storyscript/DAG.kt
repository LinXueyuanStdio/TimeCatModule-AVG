package com.timecat.component.storyscript

import android.app.Application
import android.os.Looper
import com.timecat.component.commonsdk.utils.override.LogUtil
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlin.system.measureTimeMillis

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
interface InitTask {
    suspend fun execute(app: Application)
}

class Task<T>(
    val name: String,
    val background: Boolean = false,    // 是否在工作线程执行任务 background ? Main : IO
    val priority: Int = 0,              // 进程运行的优先级，值小的先执行
    val depends: Set<String> = setOf(), // 依赖的任务列表
    val block: suspend (T) -> Unit = {},
) {
    val children: MutableSet<Task<T>> = mutableSetOf()
}

open class SimpleTaskList<T> {
    internal val items: ArrayList<Task<T>> = ArrayList()
    fun remove(name: String) {
        items.removeAll { it.name == name }
    }

    fun add(task: Task<T>) {
        remove(task.name)
        items.add(task)
    }

    fun add(
        name: String,
        background: Boolean = false,
        priority: Int = 0,
        depends: Set<String> = setOf(),
        block: suspend (T) -> Unit = {},
    ) = add(Task(name, background, priority, depends, block))
}

class SimpleTaskManager<T>(
    scope: () -> CoroutineScope = { GlobalScope },
) : TaskManager<T>(SimpleTaskList(), scope = scope)

open class TaskManager<T>(
    private val taskList: SimpleTaskList<T>,
    triggers: Set<String> = setOf(),
    val scope: () -> CoroutineScope = { GlobalScope },
) {
    val mutex = Mutex()
    private val done: MutableSet<String> = mutableSetOf()
    private val triggerMap: Map<String, Task<T>> = triggers.map { it to Task<T>(it) }.toMap()

    //region taskList
    fun add(task: Task<T>) = taskList.add(task)
    fun add(
        name: String,
        background: Boolean = false,
        priority: Int = 0,
        depends: Set<String> = setOf(),
        block: suspend (T) -> Unit = {},
    ) = taskList.add(name, background, priority, depends, block)

    fun remove(name: String) = taskList.remove(name)
    //endregion

    suspend fun start(event: T) {
        // 根据优先级排序
        taskList.items.sortBy { it.priority }

        // 生成任务映射表
        val map = taskList.items.map { it.name to it }.toMap()

        val syncTasks = mutableSetOf<Task<T>>()
        val aloneTasks = mutableSetOf<Task<T>>()

        taskList.items.forEach { task ->
            when {
                // 有依赖的任务
                task.depends.isNotEmpty() -> {
                    // 检测循环依赖
                    checkDependence(listOf(task.name), task.depends, map)
                    // 明确任务依赖关系
                    task.depends.forEach { taskName ->
                        val item = triggerMap[taskName] ?: map[taskName] ?: throw Throwable("Cannot find dependence $taskName ")
                        item.children.add(task)
                    }
                }
                // 无依赖的异步任务
                task.background -> aloneTasks.add(task)
                // 无依赖的同步任务，在主线程执行
                else -> syncTasks.add(task)
            }
        }

        // 无依赖的异步任务，在子线程并行执行
        aloneTasks.forEach {
            flowOf(it).onEach {
                this.execute(it, event)
            }.launchIn(scope())
        }

        // 无依赖的同步任务，在主线程顺序执行
        for (task in syncTasks) {
            execute(task, event)
        }
//        if (Looper.getMainLooper() === Looper.myLooper()) {
//            println("is main")
//            syncTasks.asFlow().onEach(this::execute)
//        } else {
//            syncTasks.asFlow().flowOn(Dispatchers.Main).onEach {
//                this.execute(it, event)
//            }.launchIn(scope())
//        }
    }

    private fun checkDependence(path: List<String>, depends: Set<String>, map: Map<String, Task<T>>) {
        depends.forEach {
            if (path.contains(it)) {
                throw Throwable("Recycle dependence: $path => $it")
            }
            map[it]?.let { item ->
                checkDependence(path + it, item.depends, map)
            }
        }
    }

    /**
     * 同步执行一个任务及其依赖
     */
    private suspend fun execute(task: Task<T>, event: T) {
        val time = measureTimeMillis {
            try {
                task.block(event)
            } catch (e: Exception) {
                log("===> ${task.name} ERROR : $e")
                e.printStackTrace()
            }
        }
        log("===> ${task.name} DONE : ${time}ms")

        finish(task.name, task.children, event)
    }

    //    val poolA = newSingleThreadContext("A")
//    val poolB = newSingleThreadContext("B")
    private suspend fun finish(name: String, children: MutableSet<Task<T>>, event: T) {
        mutex.withLock(done) {
            done.add(name)
        }
        val childTasks = children.filter { done.containsAll(it.depends) }
        coroutineScope {
            childTasks.map { task ->
                val flowOn = if (task.background) Dispatchers.Default else Dispatchers.Main
//                val flowOn = if (task.background) poolA else poolB
                async(flowOn) {
                    execute(task, event)
                }
            }.awaitAll()
        }
    }

    suspend fun finish(name: String, event: T) {
        triggerMap[name]?.let {
            finish(name, it.children, event)
        }
    }
}

internal fun log(message: String) {
    println(message)
    LogUtil.sd(message)
}

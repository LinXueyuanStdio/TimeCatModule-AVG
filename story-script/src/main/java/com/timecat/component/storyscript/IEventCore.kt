package com.timecat.component.storyscript

import android.app.Application
import androidx.activity.ComponentActivity
import androidx.fragment.app.Fragment
import androidx.lifecycle.*
import com.timecat.component.commonsdk.utils.override.LogUtil
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.collect
import java.util.logging.Level
import kotlin.collections.set
import kotlin.system.measureTimeMillis

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/27
 * @description null
 * @usage null
 */
interface IEventCore : ViewModelStoreOwner, LifecycleOwner {
    suspend fun getAssetsPath(): String
    suspend fun readFile(filename: String): String
    fun loadAssets(text: String)
}


inline fun <reified T> getEventObserverCount(event: Class<T>): Int {
    return ApplicationScopeViewModelProvider.get(EventBusCore::class.java)
        .getEventObserverCount(event.name)
}

inline fun <reified T> getEventObserverCount(scope: ViewModelStoreOwner, event: Class<T>): Int {
    return ViewModelProvider(scope).get(EventBusCore::class.java)
        .getEventObserverCount(event.name)
}


//移除事件
inline fun <reified T> removeStickyEvent(event: Class<T>) {
    ApplicationScopeViewModelProvider.get(EventBusCore::class.java)
        .removeStickEvent(event.name)
}

inline fun <reified T> removeStickyEvent(scope: ViewModelStoreOwner, event: Class<T>) {
    ViewModelProvider(scope).get(EventBusCore::class.java)
        .removeStickEvent(event.name)
}


// 清除事件缓存
inline fun <reified T> clearStickyEvent(event: Class<T>) {
    ApplicationScopeViewModelProvider.get(EventBusCore::class.java)
        .clearStickEvent(event.name)
}

inline fun <reified T> clearStickyEvent(scope: ViewModelStoreOwner, event: Class<T>) {
    ViewModelProvider(scope).get(EventBusCore::class.java)
        .clearStickEvent(event.name)
}


fun <T> LifecycleOwner.launchWhenStateAtLeast(
    minState: Lifecycle.State,
    block: suspend CoroutineScope.() -> T
) {
    lifecycleScope.launch {
        lifecycle.whenStateAtLeast(minState, block)
    }
}

//_______________________________________
//          post event
//_______________________________________

//Application范围的事件
inline fun <reified T> postEvent(event: T, timeMillis: Long = 0L) {
    ApplicationScopeViewModelProvider.get(EventBusCore::class.java)
        .postEvent(T::class.java.name, event!!, timeMillis)
}

//限定范围的事件
inline fun <reified T> postEvent(scope: ViewModelStoreOwner, event: T, timeMillis: Long = 0L) {
    ViewModelProvider(scope)[EventBusCore::class.java]
        .postEvent(T::class.java.name, event!!, timeMillis)
}

inline fun <reified T> IEventCore.postEvent(event: T, timeMillis: Long = 0L) = postEvent(this, event, timeMillis)

//限定范围的事件
suspend inline fun <reified T> postSyncEvent(scope: ViewModelStoreOwner, event: T, timeMillis: Long = 0L) {
    ViewModelProvider(scope)[EventBusCore::class.java]
        .postSyncEvent(T::class.java.name, event!!, timeMillis)
}

suspend inline fun <reified T> IEventCore.postSyncEvent(event: T, timeMillis: Long = 0L) = postSyncEvent(this, event, timeMillis)

//_______________________________________
//          observe event
//_______________________________________

//监听App Scope 事件
inline fun <reified T> LifecycleOwner.observeEvent(
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) {
    ApplicationScopeViewModelProvider.get(EventBusCore::class.java)
        .observeEvent(
            this,
            T::class.java.name,
            minActiveState,
            dispatcher,
            isSticky,
            onReceived
        )
}

//监听Fragment Scope 事件
inline fun <reified T> observeEvent(
    scope: Fragment,
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) {
    ViewModelProvider(scope)[EventBusCore::class.java]
        .observeEvent(
            scope,
            T::class.java.name,
            minActiveState,
            dispatcher,
            isSticky,
            onReceived
        )
}

//Fragment 监听Activity Scope 事件
inline fun <reified T> observeEvent(
    scope: ComponentActivity,
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) {
    ViewModelProvider(scope)[EventBusCore::class.java]
        .observeEvent(
            scope,
            T::class.java.name,
            minActiveState,
            dispatcher,
            isSticky,
            onReceived
        )
}

inline fun <reified T> IEventCore.observeEvent(
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) = observeEvent(this, this, dispatcher, minActiveState, isSticky, onReceived)

inline fun <reified T> observeEvent(
    scope: ViewModelStoreOwner, lifecycleOwner: LifecycleOwner,
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) {
    ViewModelProvider(scope)[EventBusCore::class.java]
        .observeEvent(
            lifecycleOwner,
            T::class.java.name,
            minActiveState,
            dispatcher,
            isSticky,
            onReceived
        )
}

inline fun <reified T> IEventCore.observeSyncEvent(
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    observerName: String,
    background: Boolean = false,
    priority: Int = 0,
    depends: Set<String> = setOf(),
    noinline block: suspend (T) -> Unit = {},
) = observeSyncEvent(this, this, dispatcher, minActiveState, observerName, background, priority, depends, block)

inline fun <reified T> observeSyncEvent(
    scope: ViewModelStoreOwner, lifecycleOwner: LifecycleOwner,
    dispatcher: CoroutineDispatcher = Dispatchers.Main.immediate,
    minActiveState: Lifecycle.State = Lifecycle.State.STARTED,
    observerName: String,
    background: Boolean = false,
    priority: Int = 0,
    depends: Set<String> = setOf(),
    noinline block: suspend (T) -> Unit = {},
) {
    ViewModelProvider(scope)[EventBusCore::class.java]
        .observeSyncEvent(
            lifecycleOwner,
            T::class.java.name,
            minActiveState,
            dispatcher,
            observerName, background, priority, depends, block
        )
}

inline fun <reified T> observeEvent(
    coroutineScope: CoroutineScope,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) {
    coroutineScope.launch {
        ApplicationScopeViewModelProvider.get(EventBusCore::class.java)
            .observeWithoutLifecycle(
                T::class.java.name,
                isSticky,
                onReceived
            )
    }
}

inline fun <reified T> observeEvent(
    scope: ViewModelStoreOwner,
    coroutineScope: CoroutineScope,
    isSticky: Boolean = false,
    noinline onReceived: suspend (T) -> Unit
) {
    coroutineScope.launch {
        ViewModelProvider(scope)[EventBusCore::class.java]
            .observeWithoutLifecycle(
                T::class.java.name,
                isSticky,
                onReceived
            )
    }
}

class EventBusCore : ViewModel() {

    //同步事件
    private val syncEvents: HashMap<String, SimpleTaskManager<Any>> = HashMap()

    //正常事件
    private val eventFlows: HashMap<String, MutableSharedFlow<Any>> = HashMap()

    //粘性事件
    private val stickyEventFlows: HashMap<String, MutableSharedFlow<Any>> = HashMap()

    private fun getSyncFlow(eventName: String): SimpleTaskManager<Any> {
        return syncEvents[eventName] ?: SimpleTaskManager<Any> { viewModelScope }.also {
            syncEvents[eventName] = it
        }
    }

    private fun getEventFlow(eventName: String, isSticky: Boolean): MutableSharedFlow<Any> {
        return if (isSticky) {
            stickyEventFlows[eventName]
        } else {
            eventFlows[eventName]
        } ?: MutableSharedFlow<Any>(
            replay = if (isSticky) 1 else 0,
            extraBufferCapacity = Int.MAX_VALUE
        ).also {
            if (isSticky) {
                stickyEventFlows[eventName] = it
            } else {
                eventFlows[eventName] = it
            }
        }
    }

    fun <T : Any> observeEvent(
        lifecycleOwner: LifecycleOwner,
        eventName: String,
        minState: Lifecycle.State,
        dispatcher: CoroutineDispatcher,
        isSticky: Boolean,
        onReceived: suspend (T) -> Unit
    ) {
        EventBusInitializer.logger?.log(Level.WARNING, "observe Event:$eventName")
        lifecycleOwner.launchWhenStateAtLeast(minState) {
            getEventFlow(eventName, isSticky).collect { value ->
                this.launch(dispatcher) {
                    invokeReceived(value, onReceived)
                }
            }
        }
    }

    fun <T : Any> observeSyncEvent(
        lifecycleOwner: LifecycleOwner,
        eventName: String,
        minState: Lifecycle.State,
        dispatcher: CoroutineDispatcher,
        observerName: String,
        background: Boolean = false,
        priority: Int = 0,
        depends: Set<String> = setOf(),
        block: suspend (T) -> Unit = {},
    ) {
        EventBusInitializer.logger?.log(Level.WARNING, "observe Event:$eventName")
        lifecycleOwner.launchWhenStateAtLeast(minState) {
            getSyncFlow(eventName).add(observerName, background, priority, depends) {
//                withContext(dispatcher) {
                    invokeReceived(it, block)
//                }
            }
        }
    }

    suspend fun <T : Any> observeWithoutLifecycle(
        eventName: String,
        isSticky: Boolean,
        onReceived: suspend (T) -> Unit
    ) {
        getEventFlow(eventName, isSticky).collect { value ->
            invokeReceived(value, onReceived)
        }
    }

    fun <T : Any> observeSyncEventWithoutLifecycle(
        eventName: String,
        observerName: String,
        background: Boolean = false,
        priority: Int = 0,
        depends: Set<String> = setOf(),
        block: suspend (T) -> Unit = {},
    ) {
        getSyncFlow(eventName).add(observerName, background, priority, depends) {
            invokeReceived(it, block)
        }
    }

    fun postEvent(eventName: String, value: Any, timeMillis: Long) {
        EventBusInitializer.logger?.log(Level.WARNING, "post Event:$eventName")
        listOfNotNull(
            getEventFlow(eventName, false),
            getEventFlow(eventName, true)
        ).forEach { flow ->
            viewModelScope.launch {
                delay(timeMillis)
                flow.emit(value)
            }
        }
    }

    //TODO sync post event
    suspend fun postSyncEvent(eventName: String, value: Any, timeMillis: Long) {
        EventBusInitializer.logger?.log(Level.WARNING, "post Event:$eventName")
        delay(timeMillis)
        val time = measureTimeMillis {
            getSyncFlow(eventName).start(value)
        }
        LogUtil.se("${time}")
    }


    fun removeStickEvent(eventName: String) {
        stickyEventFlows.remove(eventName)
    }

    fun clearStickEvent(eventName: String) {
        stickyEventFlows[eventName]?.resetReplayCache()
    }

    private suspend fun <T : Any> invokeReceived(value: Any, onReceived: suspend (T) -> Unit) {
        try {
            onReceived.invoke(value as T)
        } catch (e: ClassCastException) {
            EventBusInitializer.logger?.log(
                Level.WARNING,
                "class cast error on message received: $value",
                e
            )
        } catch (e: Exception) {
            EventBusInitializer.logger?.log(
                Level.WARNING,
                "error on message received: $value",
                e
            )
        }
    }

    fun getEventObserverCount(eventName: String): Int {
        val stickyObserverCount = stickyEventFlows[eventName]?.subscriptionCount?.value ?: 0
        val normalObserverCount = eventFlows[eventName]?.subscriptionCount?.value ?: 0
        return stickyObserverCount + normalObserverCount
    }
}

object ApplicationScopeViewModelProvider : ViewModelStoreOwner {

    private val eventViewModelStore: ViewModelStore = ViewModelStore()

    override fun getViewModelStore(): ViewModelStore {
        return eventViewModelStore
    }

    private val mApplicationProvider: ViewModelProvider by lazy {
        ViewModelProvider(
            ApplicationScopeViewModelProvider,
            ViewModelProvider.AndroidViewModelFactory.getInstance(EventBusInitializer.application)
        )
    }

    fun <T : ViewModel> get(modelClass: Class<T>): T {
        return mApplicationProvider[modelClass]
    }
}

interface ILogger {
    fun log(level: Level, msg: String)
    fun log(level: Level, msg: String, th: Throwable)
}

object EventBusInitializer {

    lateinit var application: Application

    var logger: ILogger? = null

    fun init(application: Application, logger: ILogger? = null) {
        EventBusInitializer.application = application
        this.logger = logger
    }

}
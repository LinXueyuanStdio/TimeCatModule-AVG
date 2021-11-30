package com.timecat.component.storyscript

import android.content.Context
import android.util.Log
import com.timecat.component.commonsdk.utils.override.LogUtil
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/27
 * @description 脚本，和核心交互
 * @usage null
 */
class Script(
    val context: Context,
    val core: IEventCore,
) : IScript {
    val parser = StoryScript(context, this)
    var macros = mutableMapOf<String, (List<String>, Map<String, Any?>) -> Unit>()
    var macroKeys = mutableListOf<Any>()
    var scriptName: String? = null
    var loading = false
    var waiting = false
    var script: String? = ""

    var isSkip = false
    var isAuto = false
    var autoInterval: Long = 1000

    fun initStoryScript() {
        parser.onCreate()
        parser.onStoryScriptCreate()
        core.observeEvent<ScriptEvent.Init>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.Init")
            registerEventObservers()
        }
    }

    private fun registerEventObservers() {
        core.observeEvent<ScriptEvent.Load>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.Load")
            script_load(it.name, it.autoStart, it.next)
        }
        core.observeEvent<ScriptEvent.Trigger>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.Trigger")
            script_trigger(it.DONOTSTOPAUTOORSKIP, it.next)
        }
        core.observeSyncEvent<ScriptEvent.Exec>(
            Dispatchers.IO,
            observerName = "script",
            background = true
        ) {
            LogUtil.se("ScriptEvent.Exec")
            script_exec(it.command, it.flags, it.params, it.next)
        }
        core.observeEvent<ScriptEvent.SetAutoInterval>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.SetAutoInterval")
            script_set_autointerval(it.autoInterval ?: autoInterval)
        }
        core.observeEvent<ScriptEvent.GetAutoInterval>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.GetAutoInterval")
            script_get_autointerval(it.callback)
        }
        core.observeEvent<ScriptEvent.Mode>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.Mode")
            script_mode(it.mode)
        }
        core.observeEvent<StoreEvent.SaveArchive>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.SaveArchive")
            script_save_archive(it.saveScene, it.next)
        }
        core.observeEvent<StoreEvent.LoadArchive>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.LoadArchive")
            script_load_archive(it.loadScene(), it.next)
        }
        core.postEvent(StoreEvent.LoadGlobal())
        core.observeEvent<StoreEvent.SaveGlobal>(Dispatchers.IO) {
            LogUtil.se("ScriptEvent.SaveGlobal")
            save_global(it.next)
        }
    }

    private suspend fun script_load(name: String, autoStart: Boolean, next: suspend () -> Unit) {
        load(name, autoStart, next)
    }

    private suspend fun script_trigger(DONOTSTOPAUTOORSKIP: Boolean, next: suspend () -> Unit) {
        trigger(DONOTSTOPAUTOORSKIP, next)
    }

//    /**
//     * add macro
//     * 暂时不用实现
//     */
//    suspend fun script_addmacro(context: Context, next:()->Unit) {
//
//    }

//    /**
//     * handle macros
//     * 暂时不用实现
//     */
//    suspend fun script_exec2(
//        command: String,
//        flags: List<String>,
//        params: Map<String, Any?>,
//        next: suspend () -> Unit
//    ) {
//        next()
//        if (command in macroKeys) {
//            val func = this.macros[command] ?: return
//            val macroData = func(flags, params)
//
//            val ss = this.parser
//
//            if (macroData is String) {
//                ss.BLOCKSTACK.push(ss.CURRENTBLOCK)
//                const blockData = parser.parse(macroData)
//                const block = new InsertedBlock(blockData)
//
//                ss.CURRENTBLOCK = block
//            } else {
//                ss.BLOCKSTACK.push(ss.CURRENTBLOCK)
//                const blockData = macroData
//                const block = new InsertedBlock(blockData)
//
//                ss.CURRENTBLOCK = block
//            }
//        }
//    }

    /**
     * listen script execute
     */
    private suspend fun script_exec(
        command: String,
        flags: List<String>,
        params: Map<String, Any?>,
        next: suspend () -> Unit
    ) {
        if (command == "story") {
            when {
                "goto" in flags -> {
                    val name = params["name"] as? String ?: ""
                    this.script = name
                    this.load(name, true, next)
                    // await this.beginStory()
                }
                "save" in flags -> {
                    val name = params["name"] as? String ?: "default"
                    val extra = params
                    core.postEvent(StoreEvent.SaveArchive(name, extra))
                }
                "load" in flags -> {
                    val name = params["name"] as? String ?: "default"
                    core.postEvent(StoreEvent.LoadArchive(name, { Scene() }))
                }
                "mode" in flags -> {
                    this.isAuto = false
                    this.isSkip = false
                    when {
                        "auto" in flags -> {
                            this.autoInterval = params["interval"] as? Long ?: this.autoInterval
                            this.isAuto = true
                        }
                        "skip" in flags -> {
                            this.isSkip = true
                        }
                        "normal" in flags -> {
                            // do nothing
                        }
                    }
                }
            }
        } else {
            next()
        }
    }

    private fun script_set_autointerval(autoInterval: Long) {
        this.autoInterval = autoInterval
    }

    private fun script_get_autointerval(callback: (Long) -> Unit) {
        callback(autoInterval)
    }

    private fun script_mode(mode: String) {
        this.isAuto = false
        this.isSkip = false
        when (mode) {
            "auto" -> {
                this.isAuto = true
                core.postEvent(ScriptEvent.Trigger(true))
            }
            "skip" -> {
                this.isSkip = true
                core.postEvent(ScriptEvent.Trigger(true))
            }
            else -> {
                core.postEvent(ScriptEvent.Trigger(false))
            }
        }
    }

    /**
     * saveScene = {
     *     ctx.data.$$scene = $$scene
     * }
     */
    private suspend fun script_save_archive(saveScene: (Scene) -> Unit, next: suspend () -> Unit) {
        // const { blocks, saveScope } = this.parser.getData()
        val blocks = this.parser.getBlockData()
        val saveScope = this.parser.getSaveScope()
        val scene = Scene(
            script = this.scriptName,
            blocks,
            saveScope,
            autoInterval = this.autoInterval,
        )

        saveScene(scene)
        // ctx.globalData.$$scene = { globalScope }
        next()
    }

    private suspend fun script_load_archive(scene: Scene, next: suspend () -> Unit) {
        val (script, blocks, saveScope, autoInterval) = scene

        this.load(script, false, {})
        this.parser.setSaveScope(saveScope)
        this.parser.setBlockData(blocks)
        this.autoInterval = autoInterval
        next()
    }

    /**
     * save global variables once any of them changed
     */
    private suspend fun save_global(next: suspend () -> Unit) {
//        const globalScope = this.parser.getGlobalScope()TODO
//
//        ctx.globalData.$$scene = { globalScope }TODO
        next()
    }

    private suspend fun load(name: String?, autoStart: Boolean, next: suspend () -> Unit) {
        val scriptName = name

        if (scriptName != null) {
            val assetsPath = core.getAssetsPath()
            val scriptFile = "${assetsPath}${scriptName}.bks"
            val scriptConfig = "${assetsPath}${scriptName}.bkc"

            this.loading = true
            // this.props.onLoading && this.props.onLoading()
            core.postEvent(ScriptEvent.Loading)
            coroutineScope {
                val task1 = async {
                    val text = core.readFile(scriptConfig)
                    core.loadAssets(text)
                    true
                }
                val task2 = async {
                    val text = core.readFile(scriptFile)
                    parser.load(text.trim())
                    true
                }
                task1.await() && task2.await()
            }
            this.scriptName = scriptName

            // this.props.onLoadingComplete && this.props.onLoadingComplete()
            core.postEvent(ScriptEvent.Loaded)
            this.loading = false

            next()

            if (autoStart) {
                beginStory()
            }
        } else {
            Log.e("", "You must pass a script url")
            next()
        }
    }

    private suspend fun beginStory() {
        var stepRet = this.parser.next()
        LogUtil.se(stepRet)
        LogUtil.se("${stepRet!!::class}")
        var ret = (stepRet as? Map<String, Any?>)?.let { Return.fromMap(it) } ?: return
        LogUtil.se(ret)

        while (!ret.done) {
            val context = ret.value

            if (this.isSkip) {
                context.flags.add("_skip_")
            }

            if (this.isAuto) {
                context.flags.add("_auto_")
            }

            this.waiting = true
            core.postSyncEvent(
                ScriptEvent.Exec(
                    context.command,
                    context.flags,
                    context.params,
                )
            )
//            coroutineScope {
//                val task = async {
//                    true
//                }
//                task.await()
//            }
            this.waiting = false

            if (context.isBreak && this.isAuto) {
                delay(this.autoInterval)
                return core.postEvent(ScriptEvent.Trigger(true))
            } else if (context.isBreak && this.isSkip) {
                // avoid executing to the end directly...
                delay(80)
                return core.postEvent(ScriptEvent.Trigger(true))
            } else if (context.isBreak) {
                break
            }
            stepRet = this.parser.next()
            ret = (stepRet as? Map<String, Any?>)?.let { Return.fromMap(it) } ?: break
            LogUtil.se(ret)
        }
        if (ret.done) {
            this.isAuto = false
            this.isSkip = false
            LogUtil.se("Script executed to end.")
        }
    }

    private suspend fun trigger(DONOTSTOPAUTOORSKIP: Boolean = false, next: suspend () -> Unit) {
        next()
        if (!loading) {
            if (!DONOTSTOPAUTOORSKIP) {
                isAuto = false
                isSkip = false
            }
            if (!waiting) {
                beginStory()
            }
        }
    }

    override fun handleGlobalChanged() {
        core.postEvent(StoreEvent.SaveGlobal(mapOf()))
    }
}
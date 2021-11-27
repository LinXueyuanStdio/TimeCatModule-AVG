package com.timecat.component.storyscript

import android.content.Context

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/27
 * @description null
 * @usage null
 */
class Script(
    val context: Context,
    val core: IEngineCore,
) : IScript {
    val parser = StoryScript(context, this)
    var macros = {}
    var macroKeys = mutableListOf<Any>()
    var scriptName = null
    var loading = false
    var waiting = false

    var isSkip = false
    var isAuto = false
    var autoInterval = 1000

    fun initStoryScript() {
        parser.onCreate()
        parser.onStoryScriptCreate()
    }

    suspend fun script_load() {
        load()
    }

    fun script_trigger() {
        trigger()
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
//    fun script_exec() {
//
//    }

    /**
     * listen script execute
     */
    suspend fun script_exec(ctx: ScriptContext, next:suspend () -> Unit) {
        val (command, flags, params) = ctx

        if (command == "story") {
            if (flags.contains("goto")) {
                this.script = params.name;
                await this.load({ name: params.name, autoStart: true }, next);
                // await this.beginStory();
            } else if (flags.contains("save")) {
                const name = params.name || 'default';
                const extra = Object.assign({}, params);

                delete extra.name;
                await core.post('save-archive', { name, extra });
            } else if (flags.includes("load")) {
                const name = params.name || 'default';

                await core.post('load-archive', { name });
            } else if (flags.contains("mode")) {
                this.isAuto = false
                this.isSkip = false
                if (flags.contains("auto")) {
                    this.autoInterval = params.interval || this.autoInterval;
                    this.isAuto = true
                } else if (flags.contains("skip")) {
                    this.isSkip = true
                } else if (flags.contains("normal")) {
                    // do nothing
                }
            }
        } else {
            next()
        }
    }

    fun script_set_autointerval() {

    }

    fun script_get_autointerval() {

    }

    fun script_mode() {

    }

    fun script_save_archive() {

    }

    fun script_load_archive() {

    }

    fun load_global() {

    }

    fun save_global() {

    }

    suspend fun load() {

    }

    fun beginStory() {

    }

    fun trigger() {

    }

    override fun handleGlobalChanged() {

    }
}
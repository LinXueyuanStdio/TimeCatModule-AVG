package com.timecat.component.storyscript

import javax.script.ScriptEngine
import javax.script.ScriptEngineManager


/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/17
 * @description null
 * @usage null
 */
class StoryScript {
    val engine: ScriptEngine = ScriptEngineManager().getEngineByName("rhino")

    init {
        val ctx = engine.context
    }
}
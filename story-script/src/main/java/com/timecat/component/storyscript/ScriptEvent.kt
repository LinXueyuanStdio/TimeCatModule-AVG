package com.timecat.component.storyscript

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
sealed class ScriptEvent(val next: suspend () -> Unit = {}) {
    object Init : ScriptEvent()
    object Loading : ScriptEvent()
    object Loaded : ScriptEvent()
    class Load(val name: String, val autoStart: Boolean, next: suspend () -> Unit = {}) : ScriptEvent(next)
    class Trigger(val DONOTSTOPAUTOORSKIP: Boolean = false, next: suspend () -> Unit = {}) : ScriptEvent(next)
    class Mode(val mode: String) : ScriptEvent()
    class SetAutoInterval(val autoInterval: Long?=null) : ScriptEvent()
    class GetAutoInterval(val callback: (Long)->Unit) : ScriptEvent()
    class Exec(val command: String, val flags: List<String>, val params: Map<String, Any?>, next: suspend () -> Unit = {}) : ScriptEvent(next)
}
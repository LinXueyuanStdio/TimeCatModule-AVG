package com.timecat.component.storyscript

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
sealed class StoreEvent(val next: suspend () -> Unit = {}) {
    class LoadGlobal() : StoreEvent()
    class SaveGlobal(extra: Map<String, Any?>) : StoreEvent()
    class LoadArchive(val name: String, val loadScene:()->Scene) : StoreEvent()
    class SaveArchive(val name: String, extra: Map<String, Any?>, val saveScene:(Scene)->Unit={}) : StoreEvent()
}
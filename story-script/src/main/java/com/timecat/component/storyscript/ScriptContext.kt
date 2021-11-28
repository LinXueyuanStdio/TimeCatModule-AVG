package com.timecat.component.storyscript

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class ScriptContext(
    var command: String,
    var flags: MutableList<String>,
    var params: MutableMap<String, Any?>,
    var isBreak: Boolean = false,
)

class Return(var done: Boolean, var value: ScriptContext)
data class Scene(
    var script: String? = "",
    var blocks: Scene? = null,
    var saveScope: Scene? = null,
    var autoInterval: Long = 1000,
)
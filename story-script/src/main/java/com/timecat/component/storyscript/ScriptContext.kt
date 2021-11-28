package com.timecat.component.storyscript

import com.alibaba.fastjson.JSONArray
import com.alibaba.fastjson.JSONObject
import com.timecat.component.commonsdk.utils.override.LogUtil

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
data class ScriptContext(
    var command: String,
    var flags: MutableList<String>,
    var params: MutableMap<String, Any?>,
    var isBreak: Boolean = false,
)

fun JSONObject.getStringList(key: String): MutableList<String> {
    return getJSONArray(key)?.toListString() ?: mutableListOf()
}

fun JSONObject.getParamsMap(key: String): MutableMap<String, Any?> {
    val value = getJSONObject(key)
    LogUtil.e(value)
    return value?.innerMap ?: mutableMapOf()
}

fun JSONArray.toListString(): MutableList<String> {
    val list: MutableList<String> = mutableListOf()
    for (i in this) {
        list.add("$i")
    }
    return list
}

class Return(var done: Boolean, var value: ScriptContext) {
    companion object {
        fun fromMap(map: Map<String, Any?>): Return {
            val obj = JSONObject(map)
            val done = obj.getBoolean("done") ?: false
            val value = obj.getJSONObject("value") ?: JSONObject()
            val command = value.getString("command")
            val flags = value.getStringList("flags")
            val params = value.getParamsMap("params")
            val isBreak = value.getBoolean("break")
            val ctx = ScriptContext(command, flags, params, isBreak)
            return Return(done, ctx)
        }
    }
}

data class Scene(
    var script: String? = "",
    var blocks: Scene? = null,
    var saveScope: Scene? = null,
    var autoInterval: Long = 1000,
)
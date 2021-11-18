package com.timecat.component.storyscript

import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.JSONObject

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/18
 * @description null
 * @usage null
 */
object StoryParser {
    fun parse(storyAst: Any): JSONObject? {
        if (storyAst is Map<*, *>) {
            val obj = JSONObject(storyAst as? Map<String, Any>)
            return obj
        } else if (storyAst is String) {
            val ast: JSONObject = JSON.parse(storyAst) as? JSONObject ?: return null
            return ast
        }
        return null
    }
}
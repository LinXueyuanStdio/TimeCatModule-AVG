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
    fun parse(storyAst: String): JSONObject? {
        val ast: JSONObject = JSON.parse(storyAst) as? JSONObject ?: return null
//        if (ast is Map<*, *>) {
//            val map = ast as Map<*, *>
//            for (key in map.keys) {
//                val value = map[key]
//                LogUtil.sd("key:$key,value:$value")
//            }
//        }
        return ast
    }
}
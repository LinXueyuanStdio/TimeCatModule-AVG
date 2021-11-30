package com.timecat.module.vge.plugins

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
data class StoryCommand(val command: String, val flags: List<String>, val params: Map<String, Any?>)
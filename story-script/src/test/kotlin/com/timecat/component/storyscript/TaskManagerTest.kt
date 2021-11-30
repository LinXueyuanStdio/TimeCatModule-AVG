package com.timecat.component.storyscript

import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class TaskManagerTest {
    @Test
    fun test() = runBlocking {
        val list = SimpleTaskList<String>()
        val manager = TaskManager(list, scope = { this })
        val ans = mutableListOf<String>()
        list.add("A") {
            delay(100)
            println(it)
            ans.add("A")
        }
        list.add("B", depends = setOf("A")) {
            delay(100)
            println(it)
            ans.add("B")
        }
        list.add("C", depends = setOf("A")) {
            delay(100)
            println(it)
            ans.add("C")
        }
        list.add("D", depends = setOf("B", "C")) {
            delay(100)
            println(it)
            ans.add("D")
        }
        manager.start("go")
        println(ans)
        assertTrue(ans.toString() == "[A, B, C, D]" || ans.toString() == "[A, C, B, D]")
    }
}
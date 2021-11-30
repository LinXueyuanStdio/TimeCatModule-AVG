package com.timecat.component.storyscript

import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
suspend fun <T, V> Iterable<T>.asyncAll(coroutine: suspend (T) -> V): Iterable<V> = coroutineScope {
    this@asyncAll.map {
        async {
            coroutine(it)
        }
    }.awaitAll()
}
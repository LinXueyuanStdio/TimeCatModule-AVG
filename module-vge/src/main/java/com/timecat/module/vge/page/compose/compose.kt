package com.timecat.module.vge.page.scene

import androidx.compose.animation.Crossfade
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.tooling.preview.Preview

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
@Composable
@Preview
fun TextView() {
    Text(text = "this is a compose TextView")
    var currentPage by remember { mutableStateOf("A") }
    Crossfade(targetState = currentPage) { screen ->
        when (screen) {
            "A" -> Text("Page A")
            "B" -> Text("Page B")
        }
    }
}

@Composable
@Preview
fun Selection() {
    Text(text = "this is a compose TextView")
}

@Composable
@Preview
fun BGImage() {
    Text(text = "this is a compose TextView")
}

@Composable
@Preview
fun FGImage() {
    Text(text = "this is a compose TextView")
}

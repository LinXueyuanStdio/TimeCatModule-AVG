package com.timecat.module.vge.page.compose

import androidx.compose.animation.*
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
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

@ExperimentalAnimationApi
@Composable
@Preview
fun Selection() {
    Text(text = "this is a compose TextView")
    Box(
        modifier = Modifier
            .fillMaxSize()
    ) {
        var visible by remember { mutableStateOf(false) }

        Button(
            modifier = Modifier.align(Alignment.TopCenter),
            onClick = {
                visible = !visible
            }
        ) {
            Text("Toggle Visibility")
        }

        val animationDuration = 2000

        AnimatedVisibility(
            modifier = Modifier.align(Alignment.BottomCenter),
            visible = visible,
            enter = fadeIn(animationSpec = tween(durationMillis = animationDuration)),
            exit = fadeOut(animationSpec = tween(durationMillis = animationDuration))
        ) {
            Text("ABC")
        }
    }
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

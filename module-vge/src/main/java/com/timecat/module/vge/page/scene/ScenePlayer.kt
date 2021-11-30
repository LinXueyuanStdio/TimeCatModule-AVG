package com.timecat.module.vge.page.scene

import android.content.Context
import com.timecat.component.storyscript.IEventCore
import com.timecat.module.vge.plugins.StoryCommand

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class ScenePlayer(
    val context: Context,
    val core: IEventCore,
) {

    private var sceneView: SceneView? = null
    suspend fun postSyncCommand(storyCommand: StoryCommand) {
        val (command, flags, params) = storyCommand
    }

    fun bindView(sceneView: SceneView) {
        this.sceneView?.scenePlayer = null
        this.sceneView = sceneView
        sceneView.scenePlayer = this
//        engine.context.displayer = storyView.displayer
//        notifyDisplayerSizeChanged(storyView.displayer.width, storyView.displayer.height)
        sceneView.postInvalidate()
    }
}
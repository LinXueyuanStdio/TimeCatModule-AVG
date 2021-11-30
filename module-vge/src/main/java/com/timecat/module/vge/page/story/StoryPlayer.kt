package com.timecat.module.vge.page.story

import com.timecat.module.vge.plugins.StoryCommand

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class StoryPlayer(

) {
    private var storyView: StoryView? = null
    suspend fun postSyncCommand(storyCommand: StoryCommand) {
        val (command, flags, params) = storyCommand
        when (command) {
            "bg" -> {

            }
            else -> {add()}
        }
    }

    fun add() {
        val no = floatArrayOf(-1f, -1f, -1f)
        storyView?.playAdd(BalloonParticleContants.BALLOON_PATHTYPE_EXTEND, "particle/balloon/1.png", 1000, no, true)
    }

    fun bindView(storyView: StoryView) {
        this.storyView?.storyPlayer = null
        this.storyView = storyView
        storyView.storyPlayer = this
//        engine.context.displayer = storyView.displayer
//        notifyDisplayerSizeChanged(storyView.displayer.width, storyView.displayer.height)
        storyView.postInvalidate()
    }
}
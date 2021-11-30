package com.timecat.module.vge.page.story

import android.content.Context
import android.graphics.drawable.BitmapDrawable
import com.timecat.component.storyscript.IEventCore
import com.timecat.layout.ui.layout.setShakelessClickListener
import com.timecat.module.vge.plugins.StoryCommand
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.IOException
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class StoryPlayer(
    val context: Context,
    val core: IEventCore,
) {
    private var storyView: StoryView? = null
    suspend fun postSyncCommand(storyCommand: StoryCommand) {
        val (command, flags, params) = storyCommand
        when (command) {
            "bg" -> {
                val filename = params.get("file") as? String ?: return
                try {
                    val inputStream = context.assets.open(core.getAssetsPath() + filename)
                    val bitmapDrawable = BitmapDrawable.createFromStream(inputStream, filename)
                    inputStream.close()
                    withContext(Dispatchers.Main) {
                        storyView?.background = bitmapDrawable
                    }
                } catch (ex: IOException) {
                    ex.printStackTrace()
                }
            }
            "p" -> {
                suspendCoroutine<Boolean> { con ->
                    storyView?.setShakelessClickListener {
                        storyView?.setOnClickListener(null)
                        con.resume(true)
                    }
                }
            }
            else -> {
                add()
            }
        }
    }

    fun add() {
        val paths = listOf(
            "1.png",
            "2.png",
            "3.png",
            "4.png",
            "5.png",
            "6.png",
            "7.png",
            "8.png",
            "9.png",
            "10.png",
            "11.png",
            "12.png",
            "13.png",
            "14.png",
            "15.png",
            "16.png",
        )
        val no = floatArrayOf(-1f, -1f, -1f)
        storyView?.playAdd(BalloonParticleContants.BALLOON_PATHTYPE_EXTEND, paths.random(), 1000, no, true)
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
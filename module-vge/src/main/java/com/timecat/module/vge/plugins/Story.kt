package com.timecat.module.vge.plugins

import android.content.Context
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.ICorePlugin
import com.timecat.component.storyscript.IEventCore
import com.timecat.component.storyscript.ScriptEvent
import com.timecat.component.storyscript.observeSyncEvent
import com.timecat.module.vge.page.story.StoryPlayer
import kotlinx.coroutines.Dispatchers

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class Story(
    val context: Context,
    val core: IEventCore,
    val storyPlayer: StoryPlayer,
) : ICorePlugin {
    override fun init() {
        core.observeSyncEvent<ScriptEvent.Exec>(
            Dispatchers.Main,
            observerName = this::class.java.name,
            background = false
        ) {
            LogUtil.se("ScriptEvent.Exec")
            storyPlayer.postSyncCommand(StoryCommand(it.command, it.flags, it.params))
        }
    }
}
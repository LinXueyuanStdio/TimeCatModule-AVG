package com.timecat.module.vge.plugins

import android.content.Context
import android.graphics.Color
import com.afollestad.materialdialogs.callbacks.onDismiss
import com.kuaishou.akdanmaku.data.DanmakuItemData
import com.kuaishou.akdanmaku.ecs.component.action.Actions
import com.kuaishou.akdanmaku.ui.DanmakuPlayer
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.ICorePlugin
import com.timecat.component.storyscript.IEventCore
import com.timecat.component.storyscript.ScriptEvent
import com.timecat.component.storyscript.observeSyncEvent
import com.timecat.middle.block.ext.showDialog
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine
import kotlin.random.Random

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class Danmaku(
    val context: Context,
    val core: IEventCore,
    val danmakuPlayer: DanmakuPlayer,
) : ICorePlugin {
    override fun init() {
        core.observeSyncEvent<ScriptEvent.Exec>(
            Dispatchers.Main,
            observerName = this::class.java.name,
            background = true
        ) {
            LogUtil.se("ScriptEvent.Exec")
            val content = "${it.command} ${it.flags}, ${it.params}"
            val danmaku = DanmakuItemData(
                Random.nextLong(),
                danmakuPlayer.getCurrentTimeMs() + 500,
                content,
                DanmakuItemData.DANMAKU_MODE_ROLLING,
                25,
                Color.WHITE,
                9,
                DanmakuItemData.DANMAKU_STYLE_ICON_UP,
                9
            )
            val item = danmakuPlayer.obtainItem(danmaku)
//            val sequenceAction = Actions.sequence(
//                Actions.rotateBy(360f, 1000L),
//                Actions.scaleTo(1.5f, 1.5f, 500L),
//                Actions.scaleTo(0.8f, 0.8f, 300L)
//            )
            item.addAction(
//                Actions.moveBy(0f, 300f, 1735L),
//                sequenceAction,
                Actions.sequence(Actions.fadeOut(500L), Actions.fadeIn(300L))
            )
            danmakuPlayer.send(item)
        }
    }
}
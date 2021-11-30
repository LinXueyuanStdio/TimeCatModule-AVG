package com.timecat.module.vge.plugins.show

import android.content.Context
import android.view.ViewGroup
import com.afollestad.materialdialogs.callbacks.onDismiss
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.IEventCore
import com.timecat.component.storyscript.ScriptEvent
import com.timecat.component.storyscript.observeSyncEvent
import com.timecat.layout.ui.business.form.Body
import com.timecat.middle.block.ext.showDialog
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class Show(
    val context: Context,
    val core: IEventCore,
    val container: ViewGroup,
) {
    fun initShow() {
        core.observeSyncEvent<ScriptEvent.Exec>(
            Dispatchers.Main,
            observerName = "show",
            background = false
        ) {
            LogUtil.se("ScriptEvent.Exec")
            withContext(Dispatchers.Main) {
                container.Body("command = ${it.command}\nflags = ${it.flags}\nparams = ${it.params}")
                suspendCoroutine<Boolean> { actor ->
                    context.showDialog {
                        title(text = "${it.command}")
                        onDismiss {
                            actor.resume(true)
                        }
                    }
                }
            }
        }
    }
}
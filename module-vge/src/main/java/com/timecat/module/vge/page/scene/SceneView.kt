package com.timecat.module.vge.page.scene

import android.content.Context
import android.util.AttributeSet
import androidx.constraintlayout.widget.ConstraintLayout
import com.timecat.component.commonsdk.extension.beGone
import com.timecat.component.commonsdk.extension.beVisible
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.*
import com.timecat.layout.ui.layout.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class SceneView : ConstraintLayout, ICoreView {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )

    var scenePlayer: ScenePlayer? = null
        set(value) {
            field = value
            coreViews.forEach {
                it.core = value?.core
            }
        }

    val coreViews: List<ICoreView>
        get() = listOf(
            this,
            bgView,
            textWindow,
        )

    var bgView: BgView
    var textWindow: TextWindow

    init {
        bgView = BgView(context).apply {
            layout_width = match_parent
            layout_height = match_parent
        }.also {
            addView(it)
        }

        textWindow = TextWindow(context).apply {
            layout_width = match_parent
            layout_height = 96

            margin_bottom = 10
            margin_start = 10
            margin_end = 10

            padding = 10

            bottom_toBottomOf = parent_id

            beGone()
        }.also {
            addView(it)
        }

    }

    fun init(context: Context) {

    }

    //region ICoreView
    override var core: IEventCore? = null
        set(value) {
            field = value
            if (value != null) {
                init(value)
            } else {
                core?.removeSyncEvent(ScriptEvent.Exec::class.java, this::class.java.name)
            }
        }

    override fun init(core: IEventCore) {
        core.observeSyncEvent<ScriptEvent.Exec>(
            Dispatchers.Main,
            observerName = this::class.java.name,
            background = false
        ) {
            LogUtil.se("ScriptEvent.Exec")
            val command = it.command
            val flags = it.flags
            val params = it.params
            when (command) {
                "router" -> {
                    if ("push" in flags) {
                        if ("path" in params) {
                            var filename = params["path"] as? String ?: ""
                            if (filename.startsWith("/")) {
                                filename = filename.substring(1)
                            }
                            core.postEvent(ScriptEvent.Load(filename, true))
                        }
                    }
                }
            }
        }
    }
    //endregion
}
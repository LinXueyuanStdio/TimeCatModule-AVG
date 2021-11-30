package com.timecat.module.vge.page.scene

import android.content.Context
import android.util.AttributeSet
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.appcompat.widget.AppCompatImageView
import androidx.appcompat.widget.AppCompatTextView
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.*
import com.timecat.layout.ui.layout.setShakelessClickListener
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class SelectionView : LinearLayout, ICoreView {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )

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
            when (command) {
                "select" -> {
                    withContext(Dispatchers.Main) {
                        suspendCoroutine<Boolean> { con ->
//                            setShakelessClickListener {
//                                setOnClickListener(null)
//                                con.resume(true)
//                            }
                        }
                    }
                }
            }
        }
    }
    //endregion
}
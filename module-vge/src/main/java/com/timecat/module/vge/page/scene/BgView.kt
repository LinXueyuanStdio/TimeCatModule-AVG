package com.timecat.module.vge.page.scene

import android.content.Context
import android.graphics.drawable.BitmapDrawable
import android.util.AttributeSet
import android.view.View
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.IOException

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
class BgView : View, ICoreView {
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
            val params = it.params
            when (command) {
                "bg" -> {
                    val filename = params.get("file") as? String ?: return@observeSyncEvent
                    try {
                        val inputStream = context.assets.open(core.getAssetsPath() + filename)
                        val bitmapDrawable = BitmapDrawable.createFromStream(inputStream, filename)
                        inputStream.close()
                        withContext(Dispatchers.Main) {
                            background = bitmapDrawable
                        }
                    } catch (ex: IOException) {
                        ex.printStackTrace()
                    }
                }
            }
        }
    }
    //endregion
}
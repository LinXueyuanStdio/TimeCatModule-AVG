package com.timecat.module.vge.plugins.show

import android.content.Context
import android.view.ViewGroup
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry
import com.timecat.component.storyscript.IEventCore
import com.timecat.component.storyscript.ScriptEvent
import com.timecat.component.storyscript.observeEvent
import com.timecat.layout.ui.business.form.Body
import kotlinx.coroutines.Dispatchers

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
) : LifecycleOwner {

    fun initShow() {
        observeEvent<ScriptEvent.Exec>(core, this, Dispatchers.Main) {
            container.Body("command = ${it.command}\nflags = ${it.flags}\nparams = ${it.params}")
        }
    }

    //region LifecycleOwner
    private val mLifecycleRegistry: LifecycleRegistry = LifecycleRegistry(this)
    override fun getLifecycle(): Lifecycle {
        return mLifecycleRegistry
    }
    //endregion
}
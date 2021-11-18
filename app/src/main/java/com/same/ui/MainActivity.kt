package com.same.ui

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.StoryScript
import com.xiaojinzi.component.impl.*

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        LogUtil.DEBUG = true
        LogUtil.OPEN_LOG = true
        val linearLayout = LinearLayout(this)
        linearLayout.orientation = LinearLayout.VERTICAL
        val s = StoryScript(this)
        s.onCreate()
        linearLayout.addView(createButton("run") {
            val result = s.parse("@name tag")
            LogUtil.e(result)
        })
        linearLayout.addView(createButton("run2") {
            val result = s.parse("""
                #while x > 1 + 1 && ((x == 'test' || y >= 30) && a) || (b + 2) * -10
                [name]
                这是一句话，哈哈~！
                [name flagB]
                Some words!
                #end
            """)
            LogUtil.e(result)
        })
        setContentView(linearLayout)
    }

    private fun createButton(name: String, path: String): Button {
        val button = createButton(name)
        button.setOnClickListener { go(path) }
        return button
    }

    private fun createButton(name: String, onClickListener: View.OnClickListener): Button {
        val button = createButton(name)
        button.setOnClickListener(onClickListener)
        return button
    }

    private fun createButton(name: String): Button {
        val button = Button(this)
        button.text = name
        val layoutParams = LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        button.layoutParams = layoutParams
        button.gravity = Gravity.CENTER
        return button
    }

    private fun go(path: String) {
        Router.with().hostAndPath(path)
            .forward(object : Callback {
                override fun onSuccess(result: RouterResult) {}
                override fun onEvent(
                    successResult: RouterResult?,
                    errorResult: RouterErrorResult?
                ) {
                }

                override fun onCancel(originalRequest: RouterRequest?) {}
                override fun onError(errorResult: RouterErrorResult) {
                    Log.e("ui", errorResult.error.toString())
                }
            })
    }
}
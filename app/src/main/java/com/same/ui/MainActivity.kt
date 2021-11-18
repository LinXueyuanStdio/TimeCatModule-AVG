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
import javax.script.SimpleBindings

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val linearLayout = LinearLayout(this)
        linearLayout.orientation = LinearLayout.VERTICAL
        linearLayout.addView(createButton("run") {
            val s = StoryScript()
            val e = s.engine
            val f1 = resources.assets.open("ohm.js")
            val f2 = resources.assets.open("StoryScript.js")
            val f3 = resources.assets.open("app.js")
            e.eval(f1.reader())
            e.eval(f2.reader())
            e.eval(f3.reader())
            val b = SimpleBindings()
            b["scriptString"] = "@name tag"
            val result = e.eval("parseScriptSync", b)
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
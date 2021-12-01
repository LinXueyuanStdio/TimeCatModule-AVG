package com.same.ui

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.EventBusInitializer
import com.timecat.component.storyscript.IScript
import com.timecat.component.storyscript.StoryScript
import com.timecat.module.vge.page.StoryComposeActivity
import com.timecat.module.vge.page.VgeActivity
import com.xiaojinzi.component.impl.*

class MainActivity : Activity() {
    val script by lazy {
        StoryScript(this, object : IScript {
            override fun handleGlobalChanged() {
                LogUtil.e("handleGlobalChanged")
            }
        }).also {
            it.onCreate()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        LogUtil.DEBUG = true
        LogUtil.OPEN_LOG = true
        val linearLayout = LinearLayout(this)
        linearLayout.orientation = LinearLayout.VERTICAL
        linearLayout.addView(createButton("parse") {
            val result = script.parse("@name tag")
            LogUtil.e(result?.let { it::class.java })
            LogUtil.e(result)
//            E/TimeCat: ┆ Thread:main - 1 - @lxy  - MainActivity.onCreate$lambda-1 (MainActivity.kt:32)
//            ┆ class java.util.HashMap
//            └──────────────────────────────────────────────────────────────────────────
//            ┆ Thread:main - 1 - @lxy  - MainActivity.onCreate$lambda-1 (MainActivity.kt:33)
//            ┆ {BLOCKSTACK=[], CURRENTBLOCK={done=false, currentLine=0.0, data=[{flags=[tag], command=name, type=content, params={}}]}}
//            └──────────────────────────────────────────────────────────────────────────
        })
        linearLayout.addView(createButton("parse2") {
            val result = script.parse(
                """
                #while x > 1 + 1 && ((x == 'test' || y >= 30) && a) || (b + 2) * -10
                [name]
                这是一句话，哈哈~！
                [name flagB]
                Some words!
                #end
            """
            )
            LogUtil.e(result)
        })
        linearLayout.addView(createButton("VgeActivity") {
            startActivity(Intent(this, VgeActivity::class.java))
        })
        linearLayout.addView(createButton("StoryActivity") {
            startActivity(Intent(this, StoryComposeActivity::class.java))
        })
        // 2021-11-18 22:51:32.889 5244-5244/com.timecat.fake.avg E/TimeCat: ┆ Thread:main - 2 - @lxy  - MainActivity.onCreate$lambda-0 (MainActivity.kt:26)
        // ┆ {CURRENTBLOCK={data=[{flags=[tag], type=content, params={}, command=name}], done=false, currentLine=0.0}, BLOCKSTACK=[]}
        // └──────────────────────────────────────────────────────────────────────────
        // 2021-11-18 22:51:34.628 5244-5244/com.timecat.fake.avg E/TimeCat: ┆ Thread:main - 2 - @lxy  - MainActivity.onCreate$lambda-1 (MainActivity.kt:37)
        // ┆ {CURRENTBLOCK={data=[{condition={type=expression, value={left={type=expression, value={left={prefix=null, type=variable, value=x}, right={type=expression, value={left={type=value, value=1.0}, right={type=value, value=1.0}, operator=+}}, operator=>}}, right={type=expression, value={left={type=expression, value={left={type=expression, value={left={type=expression, value={left={prefix=null, type=variable, value=x}, right={type=value, value=test}, operator===}}, right={type=expression, value={left={prefix=null, type=variable, value=y}, right={type=value, value=30.0}, operator=>=}}, operator=||}}, right={prefix=null, type=variable, value=a}, operator=&&}}, right={type=expression, value={left={type=expression, value={left={prefix=null, type=variable, value=b}, right={type=value, value=2.0}, operator=+}}, right={type=expression, value={left={type=value, value=0.0}, right={type=value, value=10.0}, operator=-}}, operator=*}}, operator=||}}, operator=&&}}, name=while, block=[{flags=[], type=content, params={}, command=name}, {flags=[], type=content, params={raw={type=value, value=这是一句话，哈哈~！}}, command=*}, {flags=[flagB], type=content, params={}, command=name}, {flags=[], type=content, params={raw={type=value, value=Some words!}}, command=*}], type=logic}], done=false, currentLine=0.0}, BLOCKSTACK=[]}
        // └──────────────────────────────────────────────────────────────────────────
        setContentView(linearLayout)
        EventBusInitializer.init(application)
    }

    override fun onDestroy() {
        super.onDestroy()
        script.onDestroy()
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
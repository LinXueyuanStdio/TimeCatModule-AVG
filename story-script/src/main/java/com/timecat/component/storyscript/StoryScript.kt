package com.timecat.component.storyscript

import android.content.Context
import android.util.Log
import com.alibaba.fastjson.JSONArray
import com.timecat.component.engine.js.Bridge
import com.timecat.component.engine.js.HermesRuntime
import com.timecat.component.engine.js.JSCallback
import java.io.IOException
import java.io.InputStream
import java.nio.charset.Charset

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/17
 * @description null
 * @usage null
 */
class StoryScript(
    val context: Context,
    val handleGlobalChanged: IScript,
) {
    val bridge by lazy { Bridge() }
    val jsRuntime by lazy { HermesRuntime() }

    fun onCreate() {
        bridge.initialize(jsRuntime)
        context.loadJSTemplateFromAssets("story/index.min.js")?.let {
            bridge.loadScriptFromString(it)
        }
        context.loadJSTemplateFromAssets("story/app.js")?.let {
            bridge.loadScriptFromString(it)
        }
    }

    fun evalSync(functionName: String, args: Any? = null): Any? {
        return bridge.callJSFunctionSync(functionName, args)
    }

    fun parse(script: String): Any? {
        return evalSync("StoryParser", script)
    }

    fun parse2JSONArray(text: String): JSONArray? {
        val obj = parse(text)
        Log.e("parse", obj?.let { it::class }.toString())
        Log.e("parse", (obj).toString())
        val list = obj as? ArrayList<*> ?: return null
        return JSONArray(list)
    }

    fun load(script: String): Any? {
        return evalSync("StoryLoad", script)
    }

    fun next(): Any? {
        return evalSync("StoryNext")
    }

    fun onStoryScriptCreate() {
        bridge.callJSFunction("onStoryScriptCreate", false, object : JSCallback() {
            override fun invoke(`object`: Any?) {
                handleGlobalChanged.handleGlobalChanged()
            }
        })
    }

    fun onDestroy() {
        bridge.destroy()
        jsRuntime.close()
    }

    private fun Context.loadJSTemplateFromAssets(filename: String): String? {
        var js: String? = null
        try {
            val stream: InputStream = assets.open(filename)
            val size = stream.available()
            val buffer = ByteArray(size)
            stream.read(buffer)
            stream.close()
            js = String(buffer, Charset.defaultCharset())
        } catch (ex: IOException) {
            ex.printStackTrace()
        }
        return js
    }

    fun setSaveScope(saveScope: Scene?) {
    }

    fun setBlockData(blocks: Scene?) {
    }

    fun getSaveScope(): Scene? {
        return null
    }

    fun getBlockData(): Scene? {
        return null
    }
}


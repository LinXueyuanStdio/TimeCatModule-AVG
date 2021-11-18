package com.timecat.component.storyscript

import android.content.Context
import com.timecat.component.engine.js.Bridge
import com.timecat.component.engine.js.HermesRuntime
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
class StoryScript(val context: Context) {
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
        return evalSync("parseScriptSync", script)
    }

    fun onDestroy() {
        bridge.destroy()
        jsRuntime.close()
    }
}

fun Context.loadJSTemplateFromAssets(filename: String): String? {
    var js: String? = null
    try {
        val `is`: InputStream = getAssets().open(filename)
        val size = `is`.available()
        val buffer = ByteArray(size)
        `is`.read(buffer)
        `is`.close()
        js = String(buffer, Charset.defaultCharset())
    } catch (ex: IOException) {
        ex.printStackTrace()
    }
    return js
}
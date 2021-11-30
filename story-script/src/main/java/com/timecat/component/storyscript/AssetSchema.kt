package com.timecat.component.storyscript

import android.content.Context
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import java.io.IOException

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class AssetSchema {
}

fun Context.getBitmapDrawable(filename: String): Drawable? {
    var bitmapDrawable: Drawable? = null

    try {
        val inputStream = assets.open(filename)
        bitmapDrawable = BitmapDrawable.createFromStream(inputStream, filename)
        inputStream.close()
    } catch (ex: IOException) {
        ex.printStackTrace()
    }
    return bitmapDrawable
}

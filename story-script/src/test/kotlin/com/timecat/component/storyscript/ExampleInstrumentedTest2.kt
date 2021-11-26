package com.timecat.component.storyscript

import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import junit.framework.Assert.assertEquals
import org.junit.Test
import org.junit.runner.RunWith

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/26
 * @description null
 * @usage null
 */
@RunWith(AndroidJUnit4::class)
class ExampleInstrumentedTest2 {
    @Test
    fun useAppContext() {
        // Context of the app under test.
        val appContext = InstrumentationRegistry.getInstrumentation().targetContext
        print(appContext.packageName)
        assertEquals("com.example.android.architecture.blueprints.reactive", appContext.packageName)
    }
}
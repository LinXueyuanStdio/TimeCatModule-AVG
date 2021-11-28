package com.timecat.module.vge.page

import android.view.ViewGroup
import androidx.lifecycle.ViewModelStore
import com.timecat.component.storyscript.IEventCore
import com.timecat.component.storyscript.Script
import com.timecat.layout.ui.business.form.Body
import com.timecat.middle.setting.BaseSettingActivity

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class StoryActivity : BaseSettingActivity() {
    override fun title(): String = "故事"
    override fun addSettingItems(container: ViewGroup) {
        val story = Script(this, object : IEventCore {
            override suspend fun getAssetsPath(): String {
                return "TestStory"
            }

            override suspend fun readFile(filename: String): String {
                val text = assets.open(filename).bufferedReader().use { it.readText() }
                return text
            }

            override fun loadAssets(text: String) {
            }

            override fun getViewModelStore(): ViewModelStore {
                return this@StoryActivity.viewModelStore
            }
        })
        val storyScript = """
            [bg file='chapters/1/1_bg_pre.png']
        
            [text show]
            I should believe that even the most impossible dreams might come true.[r]
            Henryk Sienkiewicz[r]
            [text set italic=true]
            Quo Vadis[p]
            [text set italic=false]
        
            [bg file='chapters/1/1_bg_pre.png' pretrans]
            [bg file='chapters/1/1_bg_bw.png' trans method='ripple']
        
            Water...[p]
            Dark...[p]
            Confusion...[p]
        
            【Self】
            Where am I?[p]
            ...[p]
            Seems that i have been in deep water.[p]
            Why...[p]
            Why the heck am I here?[p]
            【】
        
            [bg file='chapters/1/1_bg_bw.png' pretrans]
            [bg file='chapters/1/1_bg_down.png' trans method='crossfade']
        
            oh![p]
        
            [router push path='/story/2']
        """
        story.initStoryScript()
        val jsonArray = story.parser.parse2JSONArray(storyScript)
        if (jsonArray == null) {
            container.Body("error when parse.")
            return
        }
        for (i in jsonArray) {
            container.Body("${i}")
        }
    }
}
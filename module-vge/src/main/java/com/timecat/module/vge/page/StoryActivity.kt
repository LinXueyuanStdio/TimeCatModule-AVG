package com.timecat.module.vge.page

import android.os.Handler
import android.os.Looper
import android.os.Message
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.content.res.ResourcesCompat
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.ViewModelStore
import com.google.android.material.chip.Chip
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.kuaishou.akdanmaku.DanmakuConfig
import com.kuaishou.akdanmaku.data.DanmakuItemData
import com.kuaishou.akdanmaku.ecs.DanmakuEngine
import com.kuaishou.akdanmaku.ecs.component.filter.*
import com.kuaishou.akdanmaku.render.SimpleRenderer
import com.kuaishou.akdanmaku.render.TypedDanmakuRenderer
import com.kuaishou.akdanmaku.ui.DanmakuPlayer
import com.kuaishou.akdanmaku.ui.DanmakuView
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.component.storyscript.IEventCore
import com.timecat.component.storyscript.Script
import com.timecat.component.storyscript.ScriptEvent
import com.timecat.component.storyscript.postEvent
import com.timecat.layout.ui.business.form.HorizontalContainer
import com.timecat.layout.ui.layout.*
import com.timecat.middle.setting.BaseSettingActivity
import com.timecat.module.vge.R
import com.timecat.module.vge.page.story.StoryPlayer
import com.timecat.module.vge.page.story.StoryView
import com.timecat.module.vge.plugins.Danmaku
import com.timecat.module.vge.plugins.Show
import com.timecat.module.vge.plugins.Story

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class StoryActivity : BaseSettingActivity() {
    override fun title(): String = "故事"
    val core = object : IEventCore {
        override suspend fun getAssetsPath(): String {
            LogUtil.se("getAssetsPath")
            return "TestStory/assets/"
        }

        override suspend fun readFile(filename: String): String {
            LogUtil.se("read ${filename}")
            val text = assets.open(filename).bufferedReader().use { it.readText() }
            LogUtil.se("    -> ${text}")
            return text
        }

        override fun loadAssets(text: String) {
            LogUtil.se("loadAssets ${text}")
        }

        override fun getViewModelStore(): ViewModelStore {
            return this@StoryActivity.viewModelStore
        }

        override fun getLifecycle(): Lifecycle {
            return this@StoryActivity.lifecycle
        }
    }

    private lateinit var danmakuPlayer: DanmakuPlayer
    private var paused = false
    private val simpleRenderer = SimpleRenderer()
    private val renderer by lazy {
        TypedDanmakuRenderer(
            simpleRenderer,
            DanmakuItemData.DANMAKU_STYLE_ICON_UP to UpLogoRenderer(
                ResourcesCompat.getDrawable(resources, R.drawable.ic_cat_special_24dp, theme)!!
            )
        )
    }

    private lateinit var danmakuView: DanmakuView
    private lateinit var storyView: StoryView

    private val mainHandler = object : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            when (msg.what) {
                MSG_START -> danmakuPlayer.start(config)
                MSG_UPDATE_DATA -> updateDanmakuData()
            }
        }
    }
    private var dataFilters = emptyMap<Int, DanmakuFilter>()
    private var config = DanmakuConfig().apply {
        dataFilter = createDataFilters()
        dataFilters = dataFilter.associateBy { it.filterParams }
        layoutFilter = createLayoutFilters()
        textSizeScale = 0.8f
    }

    private fun createDataFilters(): List<DanmakuDataFilter> =
        listOf(
            TypeFilter(),
            TextColorFilter(),
            UserIdFilter(),
            GuestFilter(),
            BlockedTextFilter { it == 0L },
            DuplicateMergedFilter()
        )

    private fun createLayoutFilters(): List<DanmakuLayoutFilter> = emptyList()

    override fun addSettingItems(container: ViewGroup) {
        danmakuView = DanmakuView(this).apply {
            layout_width = match_parent
            layout_height = 96
        }
        container.addView(danmakuView)
        storyView = StoryView(this).apply {
            layout_width = match_parent
            layout_height = 96
        }
        storyView.init(this)
        container.addView(storyView)

        danmakuPlayer = DanmakuPlayer(renderer).also {
            it.bindView(danmakuView)
        }
        mainHandler.sendEmptyMessageDelayed(MSG_UPDATE_DATA, 2000)
        mainHandler.sendEmptyMessageDelayed(MSG_START, 2500)

        val storyPlayer = StoryPlayer().also {
            it.bindView(storyView)
        }
        listOf(
            Script(this, core),
            Show(this, core, container),
            Danmaku(this, core, danmakuPlayer),
            Story(this, core, storyPlayer),
        ).forEach { it.init() }

        val skip = Chip(this).apply {
            text = "跳过"
            setShakelessClickListener {
                core.postEvent(ScriptEvent.Mode("skip"))
            }
        }
        val auto = Chip(this).apply {
            text = "自动"
            setShakelessClickListener {
                core.postEvent(ScriptEvent.Mode("auto"))
            }
        }
        val load = Chip(this).apply {
            text = "加载"
            setShakelessClickListener {
                core.postEvent(ScriptEvent.Load("scripts/1", true))
            }
        }
        container.HorizontalScrollView {
            layout_width = match_parent
            layout_height = 24
            HorizontalContainer {
                layout_width = 0
                layout_height = 24
                addView(load)
                addView(skip)
                addView(auto)
            }
        }

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

//        val jsonArray = story.parser.parse2JSONArray(storyScript)
//        if (jsonArray == null) {
//            container.Body("error when parse.")
//            return
//        }
//        for (i in jsonArray) {
//            container.Body("${i}")
//        }

        container.post {
            core.postEvent(ScriptEvent.Init)
        }
    }

    override fun onResume() {
        super.onResume()

        if (paused) {
            danmakuPlayer.start()
            paused = false
        }
    }

    override fun onPause() {
        super.onPause()

        danmakuPlayer.pause()
        paused = true
    }

    override fun onDestroy() {
        super.onDestroy()

        danmakuPlayer.release()
    }

    private fun updateDanmakuData() {
        Thread {
            LogUtil.d(DanmakuEngine.TAG, "[Sample] 开始加载数据")
            val jsonString = assets.open("test_danmaku_data.json").bufferedReader().use { it.readText() }
            val type = object : TypeToken<List<DanmakuItemData>>() {}.type
            LogUtil.d(DanmakuEngine.TAG, "[Sample] 开始解析数据")
            val dataList = Gson().fromJson<List<DanmakuItemData>>(jsonString, type)
            danmakuPlayer.updateData(dataList)
            LogUtil.d(DanmakuEngine.TAG, "[Sample] 数据已加载(count = ${dataList.size})")
            danmakuView.post {
                Toast.makeText(this, "数据已加载", Toast.LENGTH_SHORT).show()
            }
        }.start()
        danmakuView.post {
            Toast.makeText(this, "开始加载数据", Toast.LENGTH_SHORT).show()
        }
    }

    companion object {
        private const val MSG_START = 1001
        private const val MSG_UPDATE_DATA = 2001
    }

}
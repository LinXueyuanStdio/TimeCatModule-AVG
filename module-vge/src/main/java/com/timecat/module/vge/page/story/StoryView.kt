package com.timecat.module.vge.page.story

import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.graphics.PixelFormat
import android.opengl.GLSurfaceView
import android.os.PowerManager
import android.util.AttributeSet
import android.view.SurfaceView
import android.view.View
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.LifecycleOwner
import com.badlogic.gdx.ApplicationListener
import com.badlogic.gdx.Gdx
import com.badlogic.gdx.Input
import com.badlogic.gdx.InputProcessor
import com.badlogic.gdx.backends.android.AndroidApplicationConfiguration
import com.badlogic.gdx.backends.android.GdxView
import com.timecat.component.commonsdk.utils.override.LogUtil
import org.greenrobot.eventbus.EventBus

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/28
 * @description null
 * @usage null
 */
class StoryView : GdxView, InputProcessor {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )

    var storyPlayer: StoryPlayer? = null
    var openDEBUGLog = false

    //粒子效果UI容器层
    private lateinit var mContainer: InterceptableViewGroup

    //粒子效果绘制层
    private var particleEffectView: BalloonParticleEffectView? = null

    //Fragment 处于销毁过程中标志位
    private var m_isDestorying = false

    //Fragment 处于OnStop标志位
    private var m_isStoping = false

    //Screen 是否需要重建播放
    private val m_isNeedBuild = true

    private var m_hasBuilt = false

    fun playAdd(pathtype: Int, path: String?, dur: Int, rgb: FloatArray?, isSelf: Boolean) {
        if (openDEBUGLog) {
            LogUtil.se("PlayAdd")
        }
        if (m_isStoping || isScreenLock()) return
        if (path == null) return
        if (path == "") return
        val isLand = this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE
        particleEffectView?.add(path, dur, isLand, rgb, isSelf)
        particleEffectView?.setOnStateListener(object : BalloonParticleEffectView.OnStateListener {
            override fun OnBegin(isself: Boolean) {
                EventBus.getDefault().post(BalloonParticleEvents.BalloonParticleLifeCircleBegin(isself))
            }

            override fun OnFinish(isself: Boolean) {
                EventBus.getDefault().post(BalloonParticleEvents.BalloonParticleLifeCircleEnd(isself))
            }
        })
    }

    fun switchSound(open: Boolean) {
        if (openDEBUGLog) {
            LogUtil.se("switchSound")
        }
        particleEffectView?.switchSound(open)
    }

    fun onDestroy() {
        if (openDEBUGLog) {
            LogUtil.se("preDestory")
        }
        if (!m_hasBuilt) {
            return
        }
        particleEffectView!!.forceOver()
        particleEffectView!!.setCanDraw(false)
        m_isDestorying = true
        m_isStoping = true
    }

    fun init(owner: LifecycleOwner) {
        if (openDEBUGLog) {
            LogUtil.se("onViewCreated")
        }
        mContainer = InterceptableViewGroup(context)
        addView(mContainer)
        buildGDX()
        owner.lifecycle.addObserver(object : LifecycleEventObserver {
            override fun onStateChanged(source: LifecycleOwner, event: Lifecycle.Event) {
                when (event) {
                    Lifecycle.Event.ON_CREATE -> {}
                    Lifecycle.Event.ON_START -> onStart()
                    Lifecycle.Event.ON_RESUME -> onResume()
                    Lifecycle.Event.ON_PAUSE -> onPause()
                    Lifecycle.Event.ON_STOP -> onStop()
                    Lifecycle.Event.ON_DESTROY -> onDestroy()
                    Lifecycle.Event.ON_ANY -> {}
                }
            }
        })
    }

    fun buildGDX() {
        if (openDEBUGLog) {
            LogUtil.se("buildGDX")
        }
        particleEffectView = BalloonParticleEffectView()
        val effectView = createGLAlpha(particleEffectView!!)
        mContainer.addView(effectView)
        mContainer.setIntercept(true)
        Gdx.input.setInputProcessor(this)
        Gdx.input.isCatchBackKey = true
        m_hasBuilt = true
    }

    fun onStart() {
        if (openDEBUGLog) {
            LogUtil.se("onStart")
        }
        m_isStoping = false
        if (particleEffectView != null) {
            particleEffectView!!.setCanDraw(true)
        }
    }

    fun onStop() {
        if (openDEBUGLog) {
            LogUtil.se("onStop")
        }
        m_isStoping = true
        particleEffectView!!.setCanDraw(false)
    }

    override fun onResume() {
        if (openDEBUGLog) {
            LogUtil.se("onResume")
        }
        super.onResume()
        if (particleEffectView != null) {
            particleEffectView!!.closeforceOver()
        }
    }

    override fun onPause() {
        if (openDEBUGLog) {
            LogUtil.se("onPause")
        }
        if (particleEffectView != null) {
            particleEffectView!!.forceOver()
        }
        super.onPause()
    }

    override fun onConfigurationChanged(config: Configuration) {
        if (openDEBUGLog) {
            LogUtil.se("onConfigurationChanged")
        }
        super.onConfigurationChanged(config)
        mContainer.removeAllViews()
        buildGDX()
    }

    private fun createGLAlpha(application: ApplicationListener): View {
        if (openDEBUGLog) {
            LogUtil.se("CreateGLAlpha")
        }

        //	    GLSurfaceView透明相关
        val cfg = AndroidApplicationConfiguration()
        cfg.a = 8
        cfg.b = cfg.a
        cfg.g = cfg.b
        cfg.r = cfg.g
        val view: View = initializeForView(application, cfg)
        if (view is SurfaceView) {
            val glView = _graphics.view as GLSurfaceView
            glView.holder.setFormat(PixelFormat.TRANSLUCENT)
            glView.setZOrderMediaOverlay(true)
            glView.setZOrderOnTop(true)
        }
        return view
    }

    override fun keyDown(i: Int): Boolean {
        if (openDEBUGLog) {
            LogUtil.se("CreateGLAlpha")
        }
        if (i == Input.Keys.BACK) {
            val intent = Intent()
            intent.action = GiftParticleContants.BROADCAST_GIFTPARTICLE_BACKKEY
            context?.sendBroadcast(intent)
            return true
        }
        return false
    }

    override fun keyUp(i: Int): Boolean {
        return false
    }

    override fun keyTyped(c: Char): Boolean {
        return false
    }

    override fun touchDown(i: Int, i1: Int, i2: Int, i3: Int): Boolean {
        return false
    }

    override fun touchUp(i: Int, i1: Int, i2: Int, i3: Int): Boolean {
        return false
    }

    override fun touchDragged(i: Int, i1: Int, i2: Int): Boolean {
        return false
    }

    override fun mouseMoved(i: Int, i1: Int): Boolean {
        return false
    }

    override fun scrolled(amountX: Float, amountY: Float): Boolean {
        return false
    }

    private fun isScreenLock(): Boolean {
        return try {
            val pm = context?.getSystemService(Context.POWER_SERVICE) as? PowerManager
            val isScreenOn = pm?.isScreenOn ?: true //如果为true，则表示屏幕“亮”了，否则屏幕“暗”了。
            !isScreenOn
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
}
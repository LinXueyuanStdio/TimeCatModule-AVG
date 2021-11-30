package com.badlogic.gdx.backends.android

import android.annotation.TargetApi
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import android.os.Debug
import android.os.Handler
import android.util.AttributeSet
import android.util.Log
import android.view.*
import android.widget.FrameLayout
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import com.badlogic.gdx.*
import com.badlogic.gdx.Application.ApplicationType
import com.badlogic.gdx.backends.android.*
import com.badlogic.gdx.backends.android.surfaceview.FillResolutionStrategy
import com.badlogic.gdx.utils.*
import com.badlogic.gdx.utils.Array
import com.timecat.component.commonsdk.utils.override.LogUtil
import com.timecat.extend.arms.BaseApplication

/**
 * @author 林学渊
 * @email linxy59@mail2.sysu.edu.cn
 * @date 2021/11/30
 * @description null
 * @usage null
 */
open class GdxView : ConstraintLayout, Application, AndroidApplicationBase {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(
        context,
        attrs,
        defStyleAttr
    )

    /** Callbacks interface for letting the fragment interact with the Activitiy, parent fragment or target fragment.
     *
     * @author Bartol Karuza (me@bartolkaruza.com)
     */
    interface Callbacks {
        fun exit()
    }

    init {
        GdxNativesLoader.load()
    }

    protected lateinit var _graphics: AndroidGraphics
    protected var _input: AndroidInput? = null
    protected var _audio: AndroidAudio? = null
    protected var _files: AndroidFiles? = null
    protected var _net: AndroidNet? = null
    protected var _clipboard: AndroidClipboard? = null
    protected var listener: ApplicationListener? = null
    var _handler: Handler? = null
    protected var firstResume = true
    protected val _runnables = Array<Runnable>()
    protected val _executedRunnables = Array<Runnable>()
    protected val _lifecycleListeners = SnapshotArray<LifecycleListener>(LifecycleListener::class.java)
    private val androidEventListeners = Array<AndroidEventListener>()
    protected var _logLevel = Application.LOG_INFO
    protected var _applicationLogger: ApplicationLogger? = null
    protected var callbacks: Callbacks? = null

    override fun startActivity(intent: Intent) {
        context?.startActivity(intent)
    }

    fun onAttach(activity: Context?) {
        if (activity is Callbacks) {
            callbacks = activity
        } else {
            throw RuntimeException(
                "Missing AndroidFragmentApplication.Callbacks. Please implement AndroidFragmentApplication.Callbacks on the parent activity, fragment or target fragment."
            )
        }
    }

    fun onDetach() {
        callbacks = null
    }

    protected fun createLayoutParams(): FrameLayout.LayoutParams? {
        val layoutParams = FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )
        layoutParams.gravity = Gravity.CENTER
        return layoutParams
    }

    protected fun createWakeLock(use: Boolean) {
        if (use) {
            applicationWindow?.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
    }

    @TargetApi(19)
    override fun useImmersiveMode(use: Boolean) {
        if (!use || getVersion() < Build.VERSION_CODES.KITKAT) return
        val view = _graphics.view
        val code = (View.SYSTEM_UI_FLAG_LAYOUT_STABLE or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or View.SYSTEM_UI_FLAG_FULLSCREEN
            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)
        view.systemUiVisibility = code
    }

    /** This method has to be called in the
     * [Fragment.onCreateView] method. It sets up all
     * the things necessary to get input, render via OpenGL and so on. Uses a default [AndroidApplicationConfiguration].
     *
     *
     * Note: you have to return the returned view from the
     * [Fragment.onCreateView]!
     *
     * @param listener the [ApplicationListener] implementing the program logic
     * @return the GLSurfaceView of the application
     */
    fun initializeForView(listener: ApplicationListener?): View? {
        val config = AndroidApplicationConfiguration()
        return initializeForView(listener, config)
    }

    /** This method has to be called in the
     * [Fragment.onCreateView] method. It sets up all
     * the things necessary to get input, render via OpenGL and so on. You can configure other aspects of the application with the
     * rest of the fields in the [AndroidApplicationConfiguration] instance.
     *
     *
     * Note: you have to return the returned view from
     * [Fragment.onCreateView]
     *
     * @param listener the [ApplicationListener] implementing the program logic
     * @param config the [AndroidApplicationConfiguration], defining various settings of the application (use accelerometer,
     * etc.).
     * @return the GLSurfaceView of the application
     */
    fun initializeForView(listener: ApplicationListener?, config: AndroidApplicationConfiguration): View {
        if (getVersion() < AndroidApplicationBase.MINIMUM_SDK) {
            throw GdxRuntimeException("LibGDX requires Android API Level " + AndroidApplicationBase.MINIMUM_SDK + " or later.")
        }
        setApplicationLogger(AndroidApplicationLogger())
        _graphics = AndroidGraphics(this, config, if (config.resolutionStrategy == null) FillResolutionStrategy() else config.resolutionStrategy)
        _input = createInput(this, context, _graphics.view, config)
        _audio = createAudio(context, config)
        _files = createFiles()
        _net = AndroidNet(this, config)
        this.listener = listener
        _handler = Handler()
        _clipboard = AndroidClipboard(context)

        // Add a specialized audio lifecycle listener
        addLifecycleListener(object : LifecycleListener {
            override fun resume() {
                _audio!!.resume()
            }

            override fun pause() {
                _audio!!.pause()
            }

            override fun dispose() {
                _audio!!.dispose()
            }
        })
        Gdx.app = this
        Gdx.input = getInput()
        Gdx.audio = getAudio()
        Gdx.files = getFiles()
        Gdx.graphics = getGraphics()
        Gdx.net = getNet()
        createWakeLock(config.useWakelock)
        useImmersiveMode(config.useImmersiveMode)
        if (config.useImmersiveMode && getVersion() >= Build.VERSION_CODES.KITKAT) {
            val vlistener = AndroidVisibilityListener()
            vlistener.createListener(this)
        }

        // detect an already connected bluetooth keyboardAvailable
        if (resources.configuration.keyboard != Configuration.KEYBOARD_NOKEYS) _input!!.setKeyboardAvailable(true)
        return _graphics.view
    }

    open fun onPause() {
        val isContinuous = _graphics.isContinuousRendering
        val isContinuousEnforced = AndroidGraphics.enforceContinuousRendering

        // from here we don't want non continuous rendering
        AndroidGraphics.enforceContinuousRendering = true
        _graphics.isContinuousRendering = true
        // calls to setContinuousRendering(false) from other thread (ex: GLThread)
        // will be ignored at this point...
        _graphics.pause()
        _input!!.onPause()

        checkRemoving()
        AndroidGraphics.enforceContinuousRendering = isContinuousEnforced
        _graphics.isContinuousRendering = isContinuous
        _graphics.onPauseGLSurfaceView()
    }

    open fun onResume() {
        Gdx.app = this
        Gdx.input = getInput()
        Gdx.audio = getAudio()
        Gdx.files = getFiles()
        Gdx.graphics = getGraphics()
        Gdx.net = getNet()
        _input!!.onResume()
        if (_graphics != null) {
            _graphics.onResumeGLSurfaceView()
        }
        if (!firstResume) {
            _graphics.resume()
        } else firstResume = false
    }

    override fun getApplicationListener(): ApplicationListener? {
        return listener
    }

    override fun getAudio(): Audio? {
        return _audio
    }

    override fun getInput(): AndroidInput? {
        return _input
    }

    override fun getFiles(): Files? {
        return _files
    }

    override fun getGraphics(): Graphics? {
        return _graphics
    }

    override fun getNet(): Net? {
        return _net
    }

    override fun getType(): ApplicationType? {
        return ApplicationType.Android
    }

    override fun getVersion(): Int {
        return Build.VERSION.SDK_INT
    }

    override fun getJavaHeap(): Long {
        return Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()
    }

    override fun getNativeHeap(): Long {
        return Debug.getNativeHeapAllocatedSize()
    }

    override fun getPreferences(name: String?): Preferences? {
        return AndroidPreferences(context.getSharedPreferences(name, Context.MODE_PRIVATE))
    }

    override fun getClipboard(): Clipboard? {
        return _clipboard
    }

    override fun postRunnable(runnable: Runnable) {
        synchronized(_runnables) {
            _runnables.add(runnable)
            Gdx.graphics.requestRendering()
        }
    }

    override fun onConfigurationChanged(config: Configuration) {
        super.onConfigurationChanged(config)
        var keyboardAvailable = false
        if (config.hardKeyboardHidden == Configuration.HARDKEYBOARDHIDDEN_NO) keyboardAvailable = true
        _input!!.setKeyboardAvailable(keyboardAvailable)
    }

    override fun exit() {
        _handler!!.post { callbacks!!.exit() }
    }

    override fun debug(tag: String?, message: String?) {
        if (_logLevel >= Application.LOG_DEBUG) {
            Log.d(tag, message!!)
        }
    }

    override fun debug(tag: String?, message: String?, exception: Throwable?) {
        if (_logLevel >= Application.LOG_DEBUG) {
            Log.d(tag, message, exception)
        }
    }

    override fun log(tag: String?, message: String?) {
        if (_logLevel >= Application.LOG_INFO) Log.i(tag, message!!)
    }

    override fun log(tag: String?, message: String?, exception: Throwable?) {
        if (_logLevel >= Application.LOG_INFO) Log.i(tag, message, exception)
    }

    override fun error(tag: String?, message: String?) {
        if (_logLevel >= Application.LOG_ERROR) LogUtil.se(message!!)
    }

    override fun error(tag: String?, message: String?, exception: Throwable?) {
        if (_logLevel >= Application.LOG_ERROR) LogUtil.se(message + exception)
    }

    override fun setLogLevel(logLevel: Int) {
        this._logLevel = logLevel
    }

    override fun getLogLevel(): Int {
        return _logLevel
    }

    override fun setApplicationLogger(applicationLogger: ApplicationLogger?) {
        this._applicationLogger = applicationLogger
    }

    override fun getApplicationLogger(): ApplicationLogger? {
        return _applicationLogger
    }

    override fun addLifecycleListener(listener: LifecycleListener) {
        synchronized(_lifecycleListeners) { _lifecycleListeners.add(listener) }
    }

    override fun removeLifecycleListener(listener: LifecycleListener) {
        synchronized(_lifecycleListeners) { _lifecycleListeners.removeValue(listener, true) }
    }

    override fun getRunnables(): Array<Runnable>? {
        return _runnables
    }

    override fun getExecutedRunnables(): Array<Runnable>? {
        return _executedRunnables
    }

    override fun runOnUiThread(runnable: Runnable) {
        postRunnable(runnable)
//        getActivity().runOnUiThread(runnable)TODO
    }

    override fun getLifecycleListeners(): SnapshotArray<LifecycleListener>? {
        return _lifecycleListeners
    }

    fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        // forward events to our listeners if there are any installed
        synchronized(androidEventListeners) {
            for (i in 0 until androidEventListeners.size) {
                androidEventListeners[i].onActivityResult(requestCode, resultCode, data)
            }
        }
    }

    /** Adds an event listener for Android specific event such as onActivityResult(...).  */
    fun addAndroidEventListener(listener: AndroidEventListener) {
        synchronized(androidEventListeners) { androidEventListeners.add(listener) }
    }

    /** Removes an event listener for Android specific event such as onActivityResult(...).  */
    fun removeAndroidEventListener(listener: AndroidEventListener) {
        synchronized(androidEventListeners) { androidEventListeners.removeValue(listener, true) }
    }

    override fun getApplicationWindow(): Window? {
        return if(context is Activity) (context as Activity).getWindow() else null
    }

    override fun createAudio(context: Context?, config: AndroidApplicationConfiguration?): AndroidAudio? {
        return DefaultAndroidAudio(context, config)
    }

    override fun createInput(activity: Application?, context: Context?, view: Any?, config: AndroidApplicationConfiguration?): AndroidInput? {
        return DefaultAndroidInput(this, context, _graphics.view, config)
    }

    protected fun createFiles(): AndroidFiles {
        return DefaultAndroidFiles(resources.assets, BaseApplication.getContext(), true)
    }

    override fun getWindowManager(): WindowManager? {
        return context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    }

    fun checkRemoving() {
        // davebaol & mobidevelop:
        // This fragment (or one of the parent)  is currently being removed from its activity or the activity is in the process of finishing
//        if (isRemoving() || isAnyParentFragmentRemoving() || getActivity().isFinishing()) {
//            _graphics.clearManagedCaches()
//            _graphics.destroy()
//        }
//    }
//    /**
//     * Iterates over nested fragments hierarchy and returns true if one of the fragment is in the removal process
//     *
//     * @return true - one of the parent fragments is being removed
//     */
//    private fun isAnyParentFragmentRemoving(): Boolean {
//        var fragment: Fragment? = getParentFragment()
//        while (fragment != null) {
//            if (fragment.isRemoving) return true
//            fragment = fragment.parentFragment
//        }
//        return false
    }
}
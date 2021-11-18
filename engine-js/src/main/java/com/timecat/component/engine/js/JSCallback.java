package com.timecat.component.engine.js;

import com.facebook.proguard.annotations.DoNotStrip;

@DoNotStrip
public abstract class JSCallback {

    @DoNotStrip
    public abstract void invoke(Object object);
}

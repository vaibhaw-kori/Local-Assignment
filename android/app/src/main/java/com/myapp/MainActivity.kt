package com.myapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String = "MyApp"

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return ReactActivityDelegate(this, mainComponentName)
    }
}

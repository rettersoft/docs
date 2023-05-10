# Using Android Client SDK
```text
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
...
dependencies {
  implementation 'com.github.rettersoft:rio-android-sdk:{latest-version}'
}
```
Proguard config
```text
-keep class com.rettermobile** { *; }
-keep class com.rettermobile.* { *; }
```
```kotlin
rio = Rio(
    applicationContext = applicationContext,
    projectId = "<ProjectId>",
    culture= "en",
    config = RioNetworkConfig.build {
        region = RioRegion.EU_WEST_1
        sslPinningEnabled = false // default: true
    }
)
rio.authenticateWithCustomToken("<CUSTOM_TOKEN>") { isSuccess, throwable ->
    // If you don't call this method, client will send actions as an anonymous user.
    if (isSuccess) {
        // do success
    } else {
        // use throwable
    }
}
rio.setOnClientAuthStatusChangeListener { rbsClientAuthStatus, rbsUser ->
}
rio.getCloudObject(RioCloudObjectOptions(classId = "<ClassId>"), onSuccess = { cloudObj ->
    // Listen To Realtime Updates On Cloud Objects
    cloudObj.public.subscribe( eventFired = { event ->
        // ...
    }, errorFired = { throwable ->
        // ...
    })
    cloudObj.call<ParserClazz>(RioCallMethodOptions(
        method = "<method>",
        body = input,
    ), onSuccess = {
        onSuccess?.invoke(it.body)
    }, onError = {
        onError?.invoke(it)
    })
}, onError = { throwable ->
})
rio.signOut() { isSuccess, throwable ->
    if (isSuccess) {
        // do success
    } else {
        // use throwable
    }
}
```
---
title: Android SDK
description: Rio has an SDK for Android.
---

Rio has an SDK for Android.
You need to have a Rio projectId to use our SDKs.

## Installation

Add it in your root build.gradle at the end of repositories:

```text
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
```

### Add the dependency

Latest Version:

```text
dependencies {
  implementation 'com.github.rettersoft:rio-android-sdk:{latest-version}'
}
```

Proguard config

```text
-keep class com.rettermobile** { *; }
-keep class com.rettermobile.* { *; }
```

## Initialize SDK

Initialize the SDK with your project id created in Rio console.

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
```

## Authenticate

Rio client's authenticateWithCustomToken method should be used to authenticate a user. If you don't call this method, client will send actions as an anonymous user.

```kotlin
rio.authenticateWithCustomToken("<CUSTOM_TOKEN>") { isSuccess, throwable ->
    if (isSuccess) {
        // do success
    } else {
        // use throwable
    }
}
```

You can sign out with .signout method.

```kotlin
rio.signOut() { isSuccess, throwable ->
    if (isSuccess) {
        // do success
    } else {
        // use throwable
    }
}
```

You can also receive auth status changes.

```kotlin
rio.setOnClientAuthStatusChangeListener { rbsClientAuthStatus, rbsUser ->
    // ...
}
```

## Get A Cloud Object

```kotlin
rio.getCloudObject(RioCloudObjectOptions(classId = "<ClassId>"), onSuccess = { cloudObj ->
    // cloudObj.call()
    // cloudObj.instanceId()
    // etc..
}, onError = { throwable ->
})
```

## Call A Method On A Cloud Object

```kotlin
cloudObj.call<ParserClazz>(RioCallMethodOptions(
    method = "<method>",
    body = input,
), onSuccess = {
    onSuccess?.invoke(it.body)
}, onError = {
    onError?.invoke(it)
})
```

## Listen To Realtime Updates On Cloud Objects

```kotlin
cloudObj.public.subscribe( eventFired = { event ->
    // ...
}, errorFired = { throwable ->
    // ...
})
```

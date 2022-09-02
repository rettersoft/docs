---
title: SDKs
description: Rio has SDKs for iOS, Android and Web platforms.
---

Rio has SDKs for iOS, Android and Web platforms.
You need to have a Rio projectId to use our SDKs.

---

## Web

Firstly, we need to install Rio JS sdk.
Rio SDK's eases you to call methods and allows you to authenticate clients with Rio.
You can see how to use the sdk on github repo.

### Installation

> npm install @retter/sdk

Now, we can initiate sdk with projectId.
You can find project id from console's home page.

```typescript
import Rio from '@retter/sdk'

const rio = Rio.getInstance({
    projectId: '{your-project-id}'
})
```

### Get A Cloud Object

We can get an existing class' cloud object from sdk.

```typescript
const todoObject = await rio.getCloudObject({
    classId: 'Todo' // previously created class
})
```

### Call A Method On A Cloud Object

With cloud object, we can access several methods and properties. We can call methods with call method, get the current instance with instanceId, etc.

To continue with demo, let's call the createTodo method with todo item. This methods required task field from body.

```typescript
await todoObject.call({
    method: 'createTodo',
    body: {
        task: 'Buy tickets for latest Robert Pattinson movie'
    }
})
```

Now, we can fetch todos. On listTodos method, we returned an items array. We can reach them from response.

```typescript
const response = await todoObject.call({
    method: 'listTodos'
})

const items = response.body.items
/**
    Output:
    [
        {
            "task": "Buy tickets for latest Robert Pattinson movie",
            "isCompleted": false
        }
    ]
*/
```

To mark the task as completed, we can call markTodoAsCompleted method with task.

```typescript
await todoObject.call({
    method: 'markTodoAsCompleted',
    body: {
        task: "Buy tickets for latest Robert Pattinson movie"
    }
})
```

If we list todo items now, we can see isCompleted field as true.

```json
[
    {
        "task": "Buy tickets for latest Robert Pattinson movie",
        "isCompleted": false
    }
]
```

We can also take realtime updates from cloud objects.
Because of updating public state (in previous article), we can subscribe the public state.
When a new item created or existing one is updated, we will be notified.

```typescript
todoObject.state.public.subscribe(state => {
    const items = state.items

    /*
    [
        {
            "task": "Buy tickets for latest Robert Pattinson movie",
            "isCompleted": true
        }
    ]
    */
})
```

That's it. It is simple as that.

## iOS

### Installation

#### Cocoapods

Rio is available through CocoaPods. To install it, simply add the following line to your Podfile:

> pod 'Rio'

#### Swift Package Manager

You can use swift package manager with following repo url and using main branch:

> <https://github.com/rettersoft/rio-ios-sdk>

### Initialize SDK

Initialize the SDK with your project id created in Rio console.

> let rio = Rio.init(config: RioConfig(projectId: "{PROJECT_ID}"))

### Authenticate

Rio client's authenticateWithCustomToken method should be used to authenticate a user. If you don't call this method, client will send actions as an anonymous user.

> rio.authenticateWithCustomToken(customToken)

You can sign out with .signout method.

> rio.signOut()

### Rio Delegate

You can attach a delegate to Rio client.

> rio.delegate = self

And start receiving authentication state changes.

```swift
extension ViewController : RioClientDelegate {
    func rioClient(client: Rio, authStatusChanged toStatus: RioClientAuthStatus) {
        
    }
}
```

### Get A Cloud Object

```swift
rio.getCloudObject(with: RioCloudObjectOptions(classID: "Test")) { object in
    
} onError: { error in
    
}
```

### Call A Method On A Cloud Object

```swift
object.call(with: RioCloudObjectOptions(method: "sayHello")) { resp in
    
} onError: { error in
    
}
```

### Listen To Realtime Updates On Cloud Objects

```swift
object.state?.public.subscribe(onSuccess: { data in
    
}, onError: { err in
    
})
```

## Android

### Installation

Add it in your root build.gradle at the end of repositories:

```text
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
```

#### Add the dependency

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

### Initialize SDK

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

### Authenticate

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

### Get A Cloud Object

```kotlin
rio.getCloudObject(RioCloudObjectOptions(classId = "<ClassId>"), onSuccess = { cloudObj ->
    // cloudObj.call()
    // cloudObj.instanceId()
    // etc..
}, onError = { throwable ->
})
```

### Call A Method On A Cloud Object

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

### Listen To Realtime Updates On Cloud Objects

```kotlin
cloudObj.public.subscribe( eventFired = { event ->
    // ...
}, errorFired = { throwable ->
    // ...
})
```

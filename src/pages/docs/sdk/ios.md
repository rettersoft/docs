---
title: iOS SDK
description: Rio has an SDK for iOS.
---

Rio has an SDK for iOS.
You need to have a Rio projectId to use our SDKs.

## Installation

### Cocoapods

Rio is available through CocoaPods. To install it, simply add the following line to your Podfile:

> pod 'Rio'

### Swift Package Manager

You can use swift package manager with following repo url and using main branch:

> <https://github.com/rettersoft/rio-ios-sdk>

## Initialize SDK

Initialize the SDK with your project id created in Rio console.

> let rio = Rio.init(config: RioConfig(projectId: "{PROJECT_ID}"))

## Authenticate

Rio client's authenticateWithCustomToken method should be used to authenticate a user. If you don't call this method, client will send actions as an anonymous user.

> rio.authenticateWithCustomToken(customToken)

You can sign out with .signout method.

> rio.signOut()

## Rio Delegate

You can attach a delegate to Rio client.

> rio.delegate = self

And start receiving authentication state changes.

```swift
extension ViewController : RioClientDelegate {
    func rioClient(client: Rio, authStatusChanged toStatus: RioClientAuthStatus) {
        
    }
}
```

## Get A Cloud Object

```swift
rio.getCloudObject(with: RioCloudObjectOptions(classID: "Test")) { object in
    
} onError: { error in
    
}
```

## Call A Method On A Cloud Object

```swift
object.call(with: RioCloudObjectOptions(method: "sayHello")) { resp in
    
} onError: { error in
    
}
```

## Listen To Realtime Updates On Cloud Objects

```swift
object.state?.public.subscribe(onSuccess: { data in
    
}, onError: { err in
    
})
```

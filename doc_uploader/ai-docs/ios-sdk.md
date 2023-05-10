# Using iOS Client SDK
> pod 'Rio'
or swift package manager
> <https://github.com/rettersoft/rio-ios-sdk>
### Example swift statements
```swift
let rio = Rio.init(config: RioConfig(projectId: "{PROJECT_ID}"))
// Get a custom token from any public method:
rio.authenticateWithCustomToken(customToken)
rio.delegate = self
extension ViewController : RioClientDelegate {
    // listen for auth status changes
    func rioClient(client: Rio, authStatusChanged toStatus: RioClientAuthStatus) { }
}
rio.signOut()
struct RetryConfig {
    let delay: Double // 50ms
    let rate: Double // 1.5
    let count: Int // 3
}
struct RioCloudObjectOptions {
    classID: String?
    instanceID: String?
    keyValue: (key: String, value: String)?
    method: String?
    headers: [String: String]?
    queryString: [String: Any]?
    httpMethod: Moya.Method?
    body: [String: Any]?
    path: String?
    useLocal: Bool? // When true, it will not make a network request assuming this instance exists
    isStaticMethod: Bool?
    culture: String?
    retryConfig: RetryConfig? // WRITE methods can return 570. You can retry with this config
}
// Get an instance
rio.getCloudObject(with: RioCloudObjectOptions(classID: "Test")) { object in
} onError: { error in
}
// Call method
object.call(with: RioCloudObjectOptions(method: "sayHello")) { resp in
} onError: { error in
}
object.state?.public.subscribe(onSuccess: { data in
}, onError: { err in  
})
```
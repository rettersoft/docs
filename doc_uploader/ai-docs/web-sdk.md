# Using Web Client SDK for Web and Nodejs
> npm install @retter/sdk
```typescript
import Retter from '@retter/sdk'
const rio = Retter.getInstance(config: RetterClientConfig)
interface RetterClientConfig {
    projectId: string // From console
    region?: RetterRegion
    platform?: string // web | node
    culture?: string
}
await rio.authenticateWithCustomToken('{CUSTOM_TOKEN}') // After custom token from a public method like login
rio.authStatus.subscribe((event: RetterAuthChangedEvent) => {})
enum RetterAuthStatus { SIGNED_IN, SIGNED_OUT, AUTH_FAILED }
interface RetterAuthChangedEvent {
    authStatus: RetterAuthStatus
    identity?: string // role of the user
    uid?: string // unique id of the user
    message?: string
}
type Dict = { [key: string]: any }
type StringVals = { [key: string]: string }
const obj = await rio.getCloudObject(config: RetterCloudObjectConfig)
interface RetterCloudObjectConfig {
    classId: string
    key?: { name: string, value: string }
    instanceId?: string
    method?: string // Rio method name
    headers?: StringVals
    pathParams?: string
    queryStringParams?: StringVals
    body?: Dict
    httpMethod?: 'get' | 'delete' | 'post' | 'put'
    base64Encode?: boolean // default: true, only get requests
}
// Realtime updates
obj.state.public.subscribe((state: Dict) => {})
obj.state.user.subscribe((state: Dict) => {})
obj.state.role.subscribe((state: Dict) => {})
const response = await obj.call(params: RetterCloudObjectCall)
interface RetterCloudObjectCall {
    method: string
    headers?: StringVals
    queryStringParams?: StringVals
    body?: Dict
    httpMethod?: 'get' | 'delete' | 'post' | 'put' // default: post
    base64Encode?: boolean // default: true, only get requests
    retryConfig: {
        delay?: number // default 50ms
        count?: number // default 3
        rate?: number // default 1.5
    }
}
```
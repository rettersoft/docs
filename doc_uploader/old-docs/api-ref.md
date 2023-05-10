# In your serverside code you can use RDK to use 
# get, set files to storage,
# write, read, query database
# redis caching etc.
# Database
```typescript
import RDK from '@retter/rdk'
const rdk = new RDK()
await rdk.writeToDatabase({ partKey: 'p', sortKey: 's', memory: true, data: { key: 'value' } })
await rdk.readDatabase({ partKey: 'p', sortKey: 's', memory: true })
await rdk.queryDatabase({ partKey: 'p', beginsWith: 's', limit: 10 })
await rdk.removeFromDatabase({ partKey: 'p', sortKey: 's' })
await rdk.setLookupKey({ key: { name: 'email', value: 'j@d.com' } }) // Sets lookup key for the same class
await rdk.getLookupKey({ key: { name: 'email', value: 'j@d.com' } }) // returns instanceId
const { statusCode, body } = await rdk.getInstance({ classId: 'MyClass', body: {} }) // creates instance
await rdk.getInstance({ classId: 'MyClass', instanceId: 'myInstanceId' })
const r = await rdk.methodCall({
    classId: 'SomeClass',
    methodName: 'someMethod',
    instanceId: '{instanceId}',
    body: { someData: 'someData' }
})
if(r.statusCode === 200) { console.log(r.body) }
await rdk.setFile({ body: "Hello World", filename: "hello.txt" })
const r = await rdk.getFile({ filename: "hello.txt" })
await rdk.setMemory({ key: 'foo', value: 'bar', 
    expireAt: 5, // optional, seconds
})
await rdk.incrementMemory({ key: 'i', value: 3 })
const r = await rdk.getMemory({ key: 'foo' })
// r.success : boolean
// r.data? : any
// r.error? : string
await rdk.deleteMemory({ key: 'foo' })
```

Data Structures used in rdk library @retter/rdk
```typescript
interface KV { [key: string]: any }
export interface KVString { [key: string]: string }
interface State<PUB = KV, PRIV = KV> {
    public?: PUB
    private?: PRIV
    user?: USER
    role?: ROLE
}
interface StepResponse<T = any, PUB = KV, PRIV = KV, USER = UserState, ROLE = RoleState> {
    state?: State<PUB, PRIV, USER, ROLE>
    response?: Response<T>
    nextFlowId?: string
}
interface Data<I = any, O = any, PUB = KV, PRIV = KV, USER = UserState, ROLE = RoleState>
    extends StepResponse<O, PUB, PRIV, USER, ROLE> {
    context: Context
    env: KV
    config: Configuration
    version: number
    state: State<PUB, PRIV, USER, ROLE>
    request: Request<I>
    response: Response<O>
    schedule: Schedule[]
    tasks: Task[]
    nextFlowId?: string
}
interface Request<T = any> {
    httpMethod: string
    body?: T
    headers: KV
    queryStringParams: KV
    requestTime: string // in iso date time format
}
interface Response<T = any> {
    statusCode: number
    body?: T
    headers?: KV,
    isBase64Encoded?: boolean
}
interface Context {
    requestId:string
    projectId:string
    action:string
    identity:string
    serviceId?:string
    headers?:KV
    classId:string
    instanceId?:string
    methodName:string
    claims?:KV
    isAnonymous?:boolean
    culture?:string
    platform?:string
    userId?:string
    sourceIP:string
    sessionId?:string
    clientOs?:string
    targetServiceIds?:string[]
    relatedUserId?:string
    pathParameters?: {
        path: string
        rule?: string
        params?: KVString
    }
}
interface State {
    public?:KV
    private?:KV
}
```
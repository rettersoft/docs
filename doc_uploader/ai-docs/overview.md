# Rio is a object oriented cloud development platform.
Install Rio CLI:
> npm install -g @retter/rio-cli
Create rio profile:
> rio set-profile --profile-name profile1 --secret-id SECRET_ID --secret-key SECRET_KEY
Create a new project:
> rio init my-project --profile profile1
> cd my-project
my-project
├── classes
│   └── TestClass
│       ├── index.ts
│       ├── package.json
│       └── template.yml
├── models
│   └── InputModel.json
├── package.json
├── tsconfig.json
└── rio.json
> rio deploy --profile profile1
Endpoints after deploy:
(POST or any method) -> https://api.retter.io/{projectId}/TestClass/CALL/{instanceId}/{methodName}
(POST) https://api.retter.io/{projectId}/TestClass/INIT/{instanceId}/
Clients can directly use these endpoints or use rio sdk.
Classes and methods:
template.yml:
```yaml
init: index.init # required - initializes state of an instance
authorizer: index.authorizer # optional - decides which caller can call which method
getInstanceId: index.getInstanceId # optional - if not defined, instanceId is generated by Rio
getState: index.getState # optional - if not defined, state is returned as is
methods:
  - method: someMethod
    inputModel: SomeModel
	type: WRITE
	handler: index.someMethod
```
# Method types
WRITE: Read write instance state, immediate, No FIFO. Returns statusCode 570 if called concurrently. Can return a response.
QUEUED_WRITE: Read write instance state, FIFO, concurrency 1. Cannot return a response. Just receives the incoming message and fifo's it.
READ: Read state. No concurrency limit.
STATIC: No state. No concurrency limit.
# Classes   
Each instance has it's own state. Classes have methods, methods have different types. Basically methods are used to manipulate instance state. Methods receive state and context information in "data" parameter, can modify and return it.
In Rio, instead of storing data in a database, we store data in instances. Each instance has it's own state. Each class has methods. Basically methods are used to manipulate instance state. Methods receive state and context information in "data" parameter, can modify and return it. STATIC methods can be used to create API's without state.
# Instances
You can query for instances only with instanceId or lookup keys. There is no other instance search mechanism. If you need a complex instance search, like searching for users or products, you need to mirror instance state to a database. You can use a STATIC method to search for instances in that database.
# Models
Create JSONSchema files in models folder.
> rio generate // This generates rio.ts file in each class folder
# Class implementation
Index.ts looks like below:
```typescript
import RDK, { Data, InitResponse, Response, StepResponse } from "@retter/rdk"
import { SomeModel } from './rio'
const rdk=new RDK()
export async function authorizer(data:Data):Promise<Response>{
    if(data.context.identity==='admin') return {statusCode:200}
    if(data.context.instanceId===data.context.userId) return {statusCode:200}
    return {statusCode:401}
}
export async function init(data:Data):Promise<Data>{
    data.state.private={foo:'bar'}
    return data
}
export async function getInstanceId(data:Data):Promise<string>{
    return data.context.userId
}
export async function someMethod(data:Data<SomeModel>):Promise<Data>{
    const name=data.request.body.name
    data.state.private.message=`Hello ${data.request.body.name}`
    data.response={statusCode:200,body:{message:'ok'}}
    return data
}
```
# Request
Use data.request to access request information.
# Response
Update data.response to return a response. If you set caching headers in response, Rio will cache the response in CDN.
# In your serverside code you can use RDK to use - get, set files to storage, write, read, query database, redis caching etc.
```typescript
//unspecified types are strings
import RDK from '@retter/rdk'
const rdk=new RDK()
//interfaces
Data<I=any,O=any,PUB=KeyValue,PRIV=KeyValue,USER=UserState,ROLE=RoleState>extends StepResponse<O,PUB,PRIV,USER,ROLE>{context:Context,env:KeyValue,config:Configuration,version:number,state:State<PUB,PRIV,USER,ROLE>,request:Request<I>,response:Response<O>,tasks:Task[]}
KVStr{[key:string]:string}
OpR{success:boolean,data?:any,error?}
CObjR<T=any>{statusCode:number,body?:T,headers?:KVStr,retryAfter?:number}
Res<T=any>extends CObjR<T>{isBase64Encoded?:boolean,retryAfter?:number}
WDB{partKey,sortKey,memory?:boolean,data:Record<string,any>}
RDB{partKey,sortKey,memory?:boolean}
QDB{partKey,beginsWith?,greaterOrEqual?,lessOrEqual?,reverse?:boolean,nextToken?,limit?:number}
RFDB{partKey,sortKey}
GF{filename}
SF extends GF{body}
SFO extends GF{body?,size:number,large:boolean}
LII{classId?,nextToken?,instanceIdPrefix?}
GM{key}
DM{key}
SM{key,value:any,expireAt?:number}
IM{key,path?,value:number}
GI{httpMethod?,queryStringParams?:Record<string,any>,headers?:KVStr,body?:any,classId,instanceId?,lookupKey?:{name,value}}
MC extends GI{methodName,retryConfig?:RetryConfig}
LUK{key:{name,value}}
LUR{success:boolean,data?:{instanceId},error?}
Context{requestId;projectId,action,identity,serviceId?,headers?,classId,instanceId?,methodName,isAnonymous?,userId?,sourceIP,sessionId?}
//methods
writeToDatabase(i:WDB):Promise<OR|undefined>{}
readDatabase(i:RDB):Promise<OR|undefined>{}
queryDatabase(i:QDB):Promise<OR|undefined>{}
removeFromDatabase(i:RFDB):Promise<OR|undefined>{}
setLookupKey(k:LKey):Promise<LResp>{}
getLookupKey(k:LKey):Promise<LResp>{}
deleteLookupKey(k:LKey):Promise<LResp>{}
getInstance(i:GI):Promise<CR|undefined>{}
methodCall(i:MC):Promise<CR|undefined>{}
listInstanceIds(i:LII):Promise<OR|undefined>{}
setFile(i:SF):Promise<OR|undefined>{}
getFile(i:GF):Promise<OR|undefined>{}
deleteFile(i:GF):Promise<OR|undefined>{}
getMemory(i:GM):Promise<OR|undefined>{}
setMemory(i:SM):Promise<OR|undefined>{}
incrementMemory(i:IM):Promise<OR|undefined>{}
```
# Tasks
```typescript
data.tasks = [{
after:5, // seconds
method:"someMethod",
classId:"OtherClass", // defaults to same class
instanceId:"other-instance-id", // defaults to same instance
payload:{foo:'bar'} // optional payload
}]
```
# Scheduling
You can schedule STATIC methods to run periodically.
```yml
methods:
  - method: cronA
    ...
    schedule: rate(30 minutes) # or cron...
```
A use case for cloud deps is, to create a library containing a product list, and then use it in multiple classes.
# Sending and validating Querystrings to methods
## Below there is a sample template.yml and implementation where we use query strings.
When calling a method url:
For primitive types:
?foo=bar&a=5&b=6
For complex json:
?data={SOME_JSON_BASE64}&__isbase64=true
QueryString's are validated with JSONSchema. However Rio passes always string values to methods. You need to cast them to your desired type.
template.yml:
```yaml
init: 
    handler: index.init
methods:
  - method: helloWorld
    queryStringModel: HelloInput # defined in models folder as JSONSchema
    type: READ
    handler: index.helloWorld
```
## Use querystrings in your methods
```typescript
import {HelloInput} from './rio'
export async function helloWorld(data:Data):Promise<Data> {
    let params=data.request.queryStringParams as HelloInput
    data.response={statusCode:200,body:{message:`Hello ${params.name}!`}}
    return data
}
```
# Auth Sample
## EmailAuth class
```typescript
import RDK from '@retter/rdk';
const rdk=new RDK();
export async function sendOtp(data:Data):Promise<Data>{
    data.state.private.otp=Math.floor(100000+Math.random()*900000);
    // Send email with otp
    return {...data,response={statusCode:200,body:'OK'}}
}
export async function init(data:Data):Promise<Data>{
    data.state.private={otp:null,email:data.request.body.email};
    return {...data,response={statusCode:200,body:'OK'}}
}
export async function verifyOtp(data:Data):Promise<Data>{    
    if(data.state.private.otp!==data.body.otp)return{...data,response={statusCode:401,body:'Invalid OTP'}};
    const user=await rdk.getInstance({className:'User',lookupKey:{name:'email',value:data.state.public.email}});
    let id=null;
    if(user.success){id=user.instanceId}//instance id of existing user
    else{ const newUser=await rdk.getInstance({className:'User'});id=newUser.instanceId;}
    const customToken=await rdk.generateCustomToken({identity:'user',userId:id});
    return {...data,response={statusCode:200,body:customToken}};
}
```
## User class
```typescript
// Can use these in authorizer
// data.context.identity: (caller class name) | (an identity string representing the role of the caller, set when generating a custom auth token)
// data.context.userId: User id of the caller
// data.context.methodName: Method that is being called
// data.context.sourceIp
// data.context.instanceId
// Cache authorizer result by putting caching headers in response if needed
export async function authorizer(data:Data):Promise<Response>{
    if(data.context.methodName==='INIT'&&data.context.identity==='EmailAuth') return {statusCode:200}
    if(data.context.instanceId===data.context.userId) return {statusCode:200}
    return {statusCode:401}
}
export async function init(data:Data):Promise<Data>{
    const email=data.request.body.email
    data.state.public={email}
    await rdk.setLookUpKey({key:{name:"email",value:email}})
    return data
}
```
# CLIENT SIDE
```swift
// After receiving the token from verifyOtp method:
let rio=Rio.init(config:RioConfig(projectId:"{PROJECT_ID}"))
rio.authenticateWithCustomToken(customToken)
```
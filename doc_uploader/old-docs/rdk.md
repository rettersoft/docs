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
Context {requestId;projectId,action,identity,serviceId?,headers?,classId,instanceId?,methodName,isAnonymous?,userId?,sourceIP,sessionId?}
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
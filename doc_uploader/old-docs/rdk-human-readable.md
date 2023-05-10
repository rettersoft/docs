// interfaces:
OpResp{success:boolean,data?:any,error?}
CObjResp<T=any>{statusCode:number,body?:T,headers?:KeyValueString,retryAfter?:number}
Response<T=any>extends CObjResp<T>{isBase64Encoded?:boolean,retryAfter?:number}
WriteToDatabase{partKey,sortKey,memory?:boolean,data:Record<string,any>}
ReadDatabase{partKey,sortKey,memory?:boolean}
QueryDatabase{partKey,beginsWith?,greaterOrEqual?,lessOrEqual?,reverse?:boolean,nextToken?,limit?:number}
RemoveFromDatabase{partKey,sortKey}
GetFile {filename}
SetFile extends GetFile{body}
SetFileOperation extends GetFile{body?,size:number,large:boolean}
ListInstanceIds{classId?,nextToken?,instanceIdPrefix?}
GetMemory{key}
DeleteMemory{key}
SetMemory{key,value:any,expireAt?:number}
IncrementMemory{key,path?,value:number}
GetInstance{httpMethod?,queryStringParams?:Record<string,any>,headers?:KeyValueString,body?:any,classId,
instanceId?,//if not specified a new instance will be created
lookupKey?:{name,value}//if specified will be used to get instance
}
MethodCall extends GetInstance{methodName,retryConfig?:RetryConfig}
LUKey{key:{name,value}}
LUResponse{success:boolean,data?:{instanceId},error?}
//rdkmethods:
writeToDatabase(i:WriteToDatabase):Promise<OpResp|undefined>{}
readDatabase(i:ReadDatabase):Promise<OpResp|undefined>{}
queryDatabase(i:QueryDatabase):Promise<OpResp|undefined>{}
removeFromDatabase(i:RemoveFromDatabase):Promise<OpResp|undefined>{}
setLookupKey(k:LUKey):Promise<LUResponse>
getLookupKey(k:LUKey):Promise<LUResponse>
deleteLookupKey(k:LUKey):Promise<LUResponse>
getInstance(i:GetInstance):Promise<CObjResp|undefined>
methodCall(i:MethodCall):Promise<CObjResp|undefined>
listInstanceIds(i:ListInstanceIds):Promise<OpResp|undefined>
setFile(i:SetFile):Promise<OpResp|undefined>
getFile(i:GetFile):Promise<OpResp|undefined>
deleteFile(i:GetFile):Promise<OpResp|undefined>
getMemory(i:GetMemory):Promise<OpResp|undefined>
setMemory(i:SetMemory):Promise<OpResp|undefined>
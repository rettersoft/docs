---
title: Method Data Context
description: Data object used in every method call has some useful attributes.
---

Data object used in every method call has some useful attributes. Mainly they are; Request, Response, State and Context.

## Request

Contains information about the request method has received. Has the following form:

### Request Model

```typescript
interface Request<T = any> {
    httpMethod: string
    body?: T
    headers: { [key: string]: string }
    queryStringParams: { [key: string]: string }
}
```

### Request Example

```typescript
if(data.request.httpMethod==='POST'){
    const userMessage=data.request.body.userMessage
}
```

## Response

Using the response, anyting can be returned in the body.

### Response Model

```typescript
interface Response<T = any> {
    statusCode: number
    body?: T
    headers?: { [key: string]: string },
    isBase64Encoded?: boolean
}
```

### Response Example

```typescript
if(calculationResult==='correct'){
    data.response={
        statusCode: 200, body: 'Success!'
        }
}
return data;
```

## Context

Context has the metadata values of data.

### Context Model

```typescript
interface Context {
    requestId: string
    projectId: string
    action: string
    identity: string
    serviceId?: string
    headers?: { [key: string]: any }
    classId: string
    instanceId?: string
    methodName: string
    refererClassId?: string
    refererInstanceId?: string
    refererMethodName?: string
    refererUserId?: string
    refererIdentity?: string
    claims?: { [key: string]: any }
    isAnonymous?: boolean
    culture?: string
    platform?: string
    userId?: string
    sourceIP: string
    sessionId?: string
    clientOs?: string
    targetServiceIds?: string[]
    relatedUserId?: string
    pathParameters?: {
        path: string
        rule?: string
        params?: { [key: string]: string }
    }
}
```

## State

State represents the state of that instance. Contrary to public, private object can not be accessed from other instances.

### State Model

```typescript
interface State {
    public?: { [key: string]: any }
    private?: { [key: string]: any }
    user?: { [userId: string]: { [key: string]: any } }
    role?: { [identity: string]: { [key: string]: any } }
}
```

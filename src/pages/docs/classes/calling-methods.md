---
title: Calling Methods
description: Methods can be called from all of our SDKs, tasks, schedules and RDK.
---

Methods can be called from all of our SDKs, tasks, schedules and RDK.

---

## From SDKs

### Instantiate SDK client

```typescript
import Retter from '@retter/sdk'

const rio = Retter.getInstance({
  projectId: '{PROJECT_ID}',
  region: RetterRegion.euWest1
})
```

### Getting an object instance and calling its method

Rio class methods can be called from Rio iOS/Android/JS SDK's like below:

Example JS SDK call:

```typescript
const cloudObject = await rio.getCloudObject({
    classId: 'Test'
})

await cloudObject.call({
    method: 'sayHello',
    body: {
        firstName: "Baran Baygan"
    }
})
```

### Using Rio generated code

Rio can generate client side code for 3 platforms (iOS/Android/JS).

> Class Editor -> More -> Generate Helper File -> Typescript Client

Save this file to your project, name it rio.ts and import it like this:

```typescript
import {
  SayHelloInput, // Example model
  Classes
} from './rio'

Then you can do this:

// Pass the rio sdk client you created earlier.
const cloudObject = await Classes.Test.getInstance(rio)

// You can find the methods and parameters as types in your typescript code.
await cloudObject.sayHello({
    firstName: "Jane"
})
```

> Every time you make changes to your backend code, you need to re-generate helper code and download it again.

---

## From RDK

You can call methods from your classes and create new instances from your classes via RDK.

```typescript
export interface GetInstance {
    httpMethod?: string
    queryStringParams?: Record<string, any>
    headers?: KeyValueString
    body?: any
    classId: string
    instanceId?: string
    lookupKey?: { name: string;  value: string }
}

export interface MethodCall extends GetInstance {
    methodName: string
    retryConfig?: { delay: number;  count: number;  rate: number }
}

async function methodCall(input: MethodCall): Promise<CloudObjectResponse | undefined> {
    // ...
}

async function getInstance(input: GetInstance): Promise<CloudObjectResponse | undefined> {
    // ...
}
```

### Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.getInstance({ classId: 'MyClass', body: {} })
await rdk.getInstance({ classId: 'MyClass', instanceId: 'myInstanceId' })
await rdk.methodCall({ classId: 'MyClass', instanceId: 'myInstanceId', methodName: 'myMethod' })

await rdk.pipeline()
    .getInstance({ classId: 'MyClass', body: {} })
    .getInstance({ classId: 'MyClass', instanceId: 'myInstanceId' })
    .methodCall({ classId: 'MyClass', instanceId: 'myInstanceId', methodName: 'myMethod' })
    .send()
```

### API Reference

#### Get / Init Instances

| Parameter         | Type                | Required            | Description         |
| ----------------- | ------------------- | ------------------- | ------------------- |
| httpMethod        | string              | false               | HTTP method |
| queryStringParams | Record<string, any> | false               | Query string parameters |
| headers           | Record<string, any> | false               | Headers |
| body              | any                 | false               | Request body |
| classId           | string              | true                | Class ID |
| instanceId        | string              | false               | Instance ID |
| lookupKey         | { name: string;  value: string } | false  | Look up key for determining instance ID |
| retryConfig       | { delay: number;  count: number;  rate: number } | false | Retry configuration |

#### Call Methods

| Parameter         | Type                | Required            | Description         |
| ----------------- | ------------------- | ------------------- | ------------------- |
| httpMethod        | string              | false               | HTTP method |
| queryStringParams | Record<string, any> | false               | Query string parameters |
| headers           | Record<string, any> | false               | Headers |
| body              | any                 | false               | Request body |
| classId           | string              | true                | Class ID |
| instanceId        | string              | false               | Instance ID |
| lookupKey         | { name: string;  value: string } | false  | Look up key for determining instance ID |
| methodName        | string              | true                | Method name |
| retryConfig       | { delay: number;  count: number;  rate: number } | false | Retry configuration |

---

## Rest Endpoint

Every call made to instance methods are actually calls made to REST endpoints.
When you call methods in TEST screen you can actually find all endpoints in browsers network inspection window.

### Getting an instance

URL: <https://{ALIAS}.api.retter.io/{PROJECT_ID}}/INSTANCE/{CLASS_NAME}>

### Calling methods

URL: <https://{ALIAS}.api.retter.io/{PROJECT_ID}/CALL/{CLASS_NAME}/{METHOD_NAME}/{INSTANCE_ID}>

You can either GET or POST to these url's.

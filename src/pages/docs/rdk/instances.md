---
title: Instances
description: Database is a built-in NoSQL data storage with in-memory acceleration layer that you can interact via RDK.
---

You can create new instances from a class as well as call their methods on existing ones.

- You cannot call more than 10 getInstances in parallel.
- You cannot call more than 10 methods in parallel.

- Nested calls have depth limit. You cannot make nested calls more than 5 levels.

> It's dangerous to create loops by nested method calls and make sure you don't call write methods from the same instance.

```typescript
interface GetInstance {
    httpMethod?: string
    queryStringParams?: Record<string, any>
    headers?: KeyValueString
    body?: any
    classId: string
    instanceId?: string
    lookupKey?: {
        name: string
        value: string
    }
}

interface MethodCall extends GetInstance {
    methodName: string
    retryConfig?: RetryConfig,
}

interface CloudObjectResponse<T = any> {
    statusCode: number
    body?: T
    headers?: KeyValueString
}

interface GetInstanceResponse extends CloudObjectResponse {
    body?: {
        newInstance: boolean
        instanceId: string
        init?: MethodDefinitionCommonModels
        get?: MethodDefinitionCommonModels
        methods: MethodDefinitionSummary[],
        response?: any
    }
}

async function getInstance(input: GetInstance): Promise<GetInstanceResponse | undefined> {
    // ...
}
async function methodCall(input: MethodCall): Promise<CloudObjectResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.getInstance({ classId: 'TestClass' })
await rdk.methodCall({ classId: 'TestClass', instanceId: 'my-instance-id', methodName: 'sayHello' })

await rdk.pipeline()
    .getInstance({ classId: 'AnotherTestClass' })
    .getInstance({ classId: 'AnotherTestClass', instanceId: 'another-instance-id' })
    .methodCall({ classId: 'AnotherTestClass', instanceId: 'another-instance-id', methodName: 'sayHello' })
    .methodCall({ classId: 'AnotherTestClass', instanceId: 'another-instance-id', methodName: 'sayHello', body: { a: 1 } })
    .send()
```

---

## API Reference

### Get Instance Input

| Parameter         | Type                | Required            | Description         |
| ----------------- | ------------------- | ------------------- | ------------------- |
| classId | string | true | Class ID |
| instanceId | string | false | Instance ID. You can skip this parameter to create a new instance or to use advantage of getInstanceId delegate method. |
| lookupKey | { name: string; value: string } | false | Resolve instance via lookup key |
| httpMethod | string | false | HTTP method. Default value is POST |
| queryStringParams | Record<string, any> | false | Query string parameters |
| headers | Record<string, string> | false | Request headers |
| body | Record<string, any> | false | Payload |

### Method Call Input

| Parameter         | Type                | Required            | Description         |
| ----------------- | ------------------- | ------------------- | ------------------- |
| classId | string | true | Class ID |
| instanceId | string | false | Instance ID. You can skip this parameter to create a new instance or to use advantage of getInstanceId delegate method. |
| lookupKey | { name: string; value: string } | false | Resolve instance via lookup key |
| methodName | string | true | Method name |
| httpMethod | string | false | HTTP method. Default value is POST |
| queryStringParams | Record<string, any> | false | Query string parameters |
| headers | Record<string, string> | false | Request headers |
| body | Record<string, any> | false | Payload |
| retryConfig | { delay: number;  count: number;  rate: number } | false | Retry configuration with backoff strategy. The delay parameter is in milliseconds |

### Get Instance Output

| Parameter         | Type                | Required            | Description         |
| ----------------- | ------------------- | ------------------- | ------------------- |
| statusCode | number | true | HTTP status code |
| headers | Record<string, string> | true | Response headers |
| body.newInstance | boolean | true | Flag to detect whether the instance is newly created or not |
| body.instanceId | string | true | Instance id |
| body.init | MethodDefinitionCommonModels | false | Validation models for init delegate method (constructor) |
| body.get | MethodDefinitionCommonModels | false | Validation models for get delegate method |
| body.methods | MethodDefinitionSummary[] | false | List of available methods |
| body.response | Record<string, any> | false | Actual response body |

### Method Call Output

| Parameter         | Type                | Required            | Description         |
| ----------------- | ------------------- | ------------------- | ------------------- |
| statusCode | number | true | HTTP status code |
| headers | Record<string, string> | true | Response headers |
| body | Record<string, any> | false | Response body |

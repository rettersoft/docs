---
title: Classes
description: Classes are basic building blocks in Rio.
---

Classes are basic building blocks in Rio.
Each instance of a class represents a data state and set of methods associated with it.
Classes might have multiple instances as well as they have only one instance just like a singleton class in object oriented programming.

Write concurrency of each instance is 1. If an instance busy, rio will let the client know, so they can retry the request.
Our SDKs handle this retry procedures automatically.

> Asynchronous writes go through a FIFO queue under the hood.
If a class designed to consume asynchronous writes really slow and there are more than 20K messages in the queue, that will start to affect each instance of the class.
To prevent that kind of heavy traffic on a single class that makes the instances block each other, the state must be separated into multiple classes.
On the other hand, that might be convenient for singleton classes wih eventually consistent states.

You define classes in a file called *template.yml*.
Below is a sample template file defining a Rio class:

```typescript
init: index.init
getState: index.getState
methods:
  - method: sayHello
    type: WRITE
    handler: index.sayHello
```

In object oriented approach usually there is a constructor method and other methods.
Here we have a init method and list of other methods defined in **methods** section.

Constructor method is defined in **index.init**.
It's purpose is to initialize the state of this instance when it is first created.
An example init method can be something like:

```typescript
export async function init(data: Data): Promise<Data> {
    data.state.private = { foo: "bar" }
    return data
}
```

This class has one method called **sayHello** and it is defined in **index.sayHello** file.

```typescript
export async function sayHello(data: Data): Promise<Data> {
    data.state.private.foo = "Hello World" // Set some field on state
    return data
}
```

Let's think of a simple **User** class with an updateProfile method:

```typescript
init: index.init
getState: index.getState
methods:
  - method: updateProfile
    type: WRITE
    handler: index.updateProfile
```

We can have a separate instance of this class for every single user in our system.
There could be millions of instances.
Each instance's method can be called and handed it's own state data as it's input.
**updateProfile** method can be like:

```typescript
export async function updateProfile(data: Data): Promise<Data> {
    data.state.private.firstName = data.request.body.firstName 
    return data
}
```

---

## Template Reference

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| accelerated   | boolean             | false               | Flag to decide whether to cache instances or not |
| authorizer    | string              | false               | Delegate method for authorization. (*filename.methodName*) |
| destroy       | string              | false               | Delegate method for approving instance deletion. (*filename.methodName*) |
| init          | string              | false               | Delegate method for constructor. (*filename.methodName*) |
| get           | string              | false               | Delegate method for getting existing instances. (*filename.methodName*) |
| getInstanceId | string              | false               | Delegate method for generating custom instanceId |
| getState      | string              | false               | Delegate method for returning states conditionally |
| dependencies  | string[]            | false               | Custom dependencies to use in deployment |
| destinations  | string[]            | false               | Custom destinations to use on state changes |
| logMasks      | Array<{ path: string }> | false           | Log masks. Please see [Logs](https://docs.retter.io/docs/projects/logs#log-masking) section for more details. |
| methods       | Method[]            | false               | Method definitions |
| description   | string              | false               | Description to put into the auto-generated documentation. |

### Handler Model

Most of Rio's delegate methods accept Handler model as well as they accept source code strings.

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| handler       | string              | true                | Handler method's path. (*filename.methodName*) |
| queryStringModel | string           | false               | Name of the validation model for query strings |
| inputModel    | string              | false               | Name of the validation model for input body |
| outputModel   | string              | false               | Name of the validation model for output body |
| errorModel    | string              | false               | Name of the validation model for error response |

### Method Model

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| method        | string              | true                | Name of the method |
| type          | READ, STATIC, WRITE, QUEUED_WRITE | false | Type of the method. Default is WRITE. |
| description   | string              | false               | Description to put into the auto-generated documentation. |
| queryStringModel | string           | false               | Name of the validation model for query strings |
| inputModel    | string              | false               | Name of the validation model for input body |
| outputModel   | string              | false               | Name of the validation model for output body |
| errorModel    | string              | false               | Name of the validation model for error response |
| handler       | string              | true                | Handler method's path. (*filename.methodName*) |
| schedule      | string              | false               | Schedule rule. It's only available for STATIC methods. |
| timeout       | number              | 25                  | Timeout of a method. Only QUEUED_WRITE methods support this parameter. |

---

## Instances

Except for static methods, everything else in a Rio class is instance-based.
When creating a new instance INIT delegate method is called.
Lifecycle of an instance is documented [here](/docs/components/classes#lifecycle-of-delegate-methods).

### States

State is a basic storage unit for your instance. Every instance has a state.
Best practice is to keep the size of the state relatively small.

You can store JSON serializable data in your state by 4 different access level: public, user, role, private.

- Everything in public state can be accessible from outside of your instance such as Firestore's realtime streams.
- User state keeps the data by user id. To access that part of the state, clients must have the user id in the token.
- Role state keeps the data by identity. To access that part of the state, clients must have the identity in the token.
- Private state is available for your methods only.

> A state of a single instance cannot be larger than 5 MB.
> If your class works in accelerated mode, the limit is 250 KB after compression.

In your implementation, you update the state object any way you want. Clients connected to this object will receive updates according to their permission level.

### Working With States

There are two methods for accessing and manipulating states from outside of Rio.

#### getState

Clients can either get the state via REST api or they can subscribe to state via sdk.

If you want to get your state via REST api you can define a delegate function in your template file and customize what part of state you will return to anybody making the call. Below there is a getState function in template:

```yaml
getState: index.getState
```

Below is the implementation of getState function which returns private state to any caller. Of course this is pretty unsecure. Don’t do this at home :)

```typescript
export async function getState(data: Data): Promise<Response> {
    return { 
        statusCode: 200, 
        body: {
            ...data.state.private,
        }
    }
}
```

Actually any method can be used to returning part of or full state to any caller. getState is a special method used in developer console.
Other than that you can write another method and use it from your clients.

#### setState

Rio Developer Console has a feature that provides you the current state and lets you overwrite it with your own value as long as you stick with the state model.
The features requires a specific method called *setState* to be able to work properly.

```yaml
methods:
  - method: setState
    type: WRITE
    handler: index.setState
```

Below is the implementation of setState function which overwrites current state with the payload. Of course this is pretty unsecure. Don’t do this at home :)

```typescript
export async function setState(data: Data): Promise<Data> {
    const { state } = data.request.body || {};
    data.state = state;
    return data;
}
```

Actually all WRITE and QUEUED_WRITE methods can be used to update part of or full state. setState is a special method used in developer console.

---

## Methods

Methods are places that you put your business logic and implementations.
You can as many methods as you like in your template file.

```yaml
init: index.init
getState: index.getState
authorizer: index.authorizer
methods:
  - method: sayHello
    inputModel: SayHelloInput
    tag: test
    type: READ
    handler: index.sayHello
  - method: sayByeBye
    inputModel: SayByeByeInput
    tag: test
    type: STATIC
    handler: index.sayByeBye
```

---

### Method Types

There are 4 method types: **READ**, **STATIC**, **WRITE**, **QUEUED_WRITE**.
Read only methods like READ and STATIC can't modify states but they can use operations through RDK.

#### STATIC

Rio's static methods don't interact with instances as in static methods in traditional object oriented programming.
You can call them via SDKs, RDK, tasks just like other types of methods.
Unlike others, static methods support also scheduling.
You can define schedule rules to call static methods in regular basis.

```yaml
init: index.init
getState: index.getState
authorizer: index.authorizer
methods:
  - method: cronA
    type: STATIC
    handler: index.cronA
    schedule: rate(30 minutes)
  - method: cronB
    type: STATIC
    handler: index.cronB
    schedule: cron(0 18 ? * MON-FRI *)
```

In the example above, cronA is called every 30 minutes and cronB is called every week monday to friday at 6 PM.

> For more details about crons please visit <https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html>

#### ASYNC_STATIC

Async STATIC methods are the longer running versions of the regular STATIC methods.
They run in the background and it's possible to execute them for 890 seconds.

#### READ

Read methods should be called in instance scope.
They get the current value of the state but they cannot write anything.

#### ASYNC_READ

Async READ methods are the longer running versions of the regular READ methods.
They run in the background and it's possible to execute them for 890 seconds.

#### WRITE

Unlike read methods, write methods are able to write to states.
Concurrent write to an instance's state is always **1**.
To accomplish that, WRITE methods use locks to manage concurrency.

If another call is about to write to the state, Rio returns with a special error code 570 to inform the sdk.
SDK automatically retries it according to the configuration.
If you don't use one of our SDKs, it's your responsibility to handle retry procedure.

#### QUEUED_WRITE

Queued write methods are also able to write to states.
They are based on a FIFO queue, so concurrency management handled automatically.

If there is a new WRITE method while a queued write method is still on progress, Rio opens a few seconds gap right after queued write method completed.
Thus, next WRITE method is able to execute, even if there are lots of pending requests in FIFO queue.

---

Data object used in every method call has some useful attributes. Mainly they are; Request, Response, State and Context.

### Method Data

#### Request

Contains information about the request method has received. Has the following form:

```typescript
interface Request<T = any> {
    httpMethod: string
    body?: T
    headers: { [key: string]: string }
    queryStringParams: { [key: string]: string }
    requestTime: string // in iso date time format
}
```

```typescript
if(data.request.httpMethod==='POST'){
    const userMessage=data.request.body.userMessage
}
```

#### Response

Using the response, anything can be returned in the body.

```typescript
interface Response<T = any> {
    statusCode: number
    body?: T
    headers?: { [key: string]: string },
    isBase64Encoded?: boolean
}
```

```typescript
if(calculationResult==='correct'){
    data.response={
        statusCode: 200, body: 'Success!'
        }
}
return data;
```

#### Context

Context has the metadata values of data.

```typescript
interface Context {
    requestId: string
    projectId: string
    action: string
    identity: string
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
    pathParameters?: {
        path: string
        rule?: string
        params?: { [key: string]: string }
    }
}
```

#### State

State represents the state of that instance. Contrary to public, private object can not be accessed from other instances.

```typescript
interface State {
    public?: { [key: string]: any }
    private?: { [key: string]: any }
    user?: { [userId: string]: { [key: string]: any } }
    role?: { [identity: string]: { [key: string]: any } }
}
```

#### Tasks

Sometimes you may want to make another method request but don't need back an immediate response.
Let's say you have created an order and you would like to send it to Reporting class.
You can trigger a method call by setting data.tasks property.

data.tasks property is an array of Task items which looks like this:

```typescript
export interface Task {
    classId?: string;
    instanceId?: string;
    lookupKey?: { name: string; value: string };
    payload?: any;
    method: string;
    after: number;
}
```

Below example triggers two different methods, one for the same instance another one to another class' instance.

```typescript
data.tasks = [
    {
        after: 5,
        method: "someMethod"
    },
    {
        after: 0,
        method: "someOtherMethodOnAnotherClass",
        classId: "OtherClass",
        instanceId: "other-instance-id",
        payload: { foo: 'bar' }
    }
]
```

- **after :** Defined in seconds. You can define a delay for all kinds of methods. This means execute the method after the provided amount of seconds delay. We currently support delays up to 1 year. (31536000 seconds)
- **method :** Name of the method to call.
- **classId (optional) :** Name of class. If not given, same classId will be used making this request.
- **instanceId (optional) :** Instance id for a class. If not given request will be sent to the same instance making this request.
- **payload (optional) :** A payload to send to triggered method. It will be delivered in data.request.body field.

> You cannot trigger more than 250 tasks in a single call. Total payload cannot be larger than 250KB.

---

### Lifecycle of Delegate Methods

Classes define delegate methods in template.yml file. When creating a new instance of a class these delegate methods are called:

1) getInstanceId
2) authorizer
3) init
4) destroy

![Images](/lifecycle.png)

#### getInstanceId

(OPTIONAL) if defined, getInstanceId is called first. It should return a string which will be the id of the new instance. If not defined a random string is generated.

#### authorizer

(OPTIONAL) It should return a status code. If 200 a new instance can be created. Authorizer can be cached if correct headers are returned. At the cache period it is not called again.

When creating a new instance, authorizer is called with data.context.methodName = 'INIT'.
When getting an instance, authorizer is called with data.context.methodName = 'GET'.

#### init

It should initialize and make some configurations for the new instance. This method is called only once for the same instanceId. If you return same ID from getInstanceId then this method is not called the second time.

#### destroy

Upon deletion of an instance "destroy" delegate method is called. You can do final cleanup here. This method can prevent instance deletion by returning a status code other than 200.

---

### Calling Methods

Methods can be called from all of our SDKs, tasks, schedules and RDK.

#### From SDKs

> Instantiate SDK client

```typescript
import Retter from '@retter/sdk'

const rio = Retter.getInstance({
  projectId: '{PROJECT_ID}',
  region: RetterRegion.euWest1
})
```

> Getting an object instance and calling its method

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

---

#### From RDK

You can call methods from your classes and create new instances from your classes via RDK.

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

#### Get / Init Instances Reference

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

#### Call Methods Reference

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

#### Rest Endpoint

Every call made to instance methods are actually calls made to REST endpoints.
When you call methods in TEST screen you can actually find all endpoints in browsers network inspection window.

> Getting an instance

URL: <https://{ALIAS}.api.retter.io/{PROJECT_ID}}/INSTANCE/{CLASS_NAME}>

> Calling methods

URL: <https://{ALIAS}.api.retter.io/{PROJECT_ID}/CALL/{CLASS_NAME}/{METHOD_NAME}/{INSTANCE_ID}>

You can send GET, POST, PUT, PATCH, DELETE, etc. requests to these url's.

---

## Scheduling

You can use scheduling mechanism to call methods as a CRON Job. Only STATIC methods can be scheduled.

In the example below, cronA is called every 30 minutes and cronB is called every week monday to friday at 6 PM.

```yaml
init: index.init
getState: index.getState
authorizer: index.authorizer
methods:
  - method: cronA
    type: STATIC
    handler: index.cronA
    schedule: rate(30 minutes)
  - method: cronB
    type: STATIC
    handler: index.cronB
    schedule: cron(0 18 ? * MON-FRI *)
```

> Rio uses "cron and rate expressions". For more details please visit <https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html>

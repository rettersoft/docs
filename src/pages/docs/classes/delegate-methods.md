---
title: Delegate Methods
description: There are some special methods you can define on a class.
---

There are some special methods you can define on a class:

- authorizer
- init
- get
- getState
- getInstanceId
- destroy

## init

Init method is a required method. You need to set it in your template file. When a new instance is created init method is called. You can return an initial state for this instance.

**Definition in template:**

```yaml
init:
  handler: index.init
  inputModel: SomeModel
  outputModel: SomeModel
  errorModel: SomeModel
  queryStringModel: SomeModel
```

**Method implementation:**

```typescript
export async function init(data: Data): Promise<Data> {
    data.state.public = { foo: "bar" }
    return data
}
```

> Besides initializing your state, you can also make rdk calls in INIT. For instance: you can set lookup keys here like following example:

```typescript
export async function init(data: Data): Promise<Data> {
    data.state.public = { foo: "bar" }
    await rdk.setLookUpKey({
        key: { name: "someName", value: "myValue" }
    })
    return data
}
```



## getInstanceId

Every instance will have a unique id if getInstanceId of class is not implemented. If you implement getInstanceId you can create an instance with an instanceId you choose.

For example you can create an instance with instanceId same as the caller users userId. Think of an e-commerce application and you have a Cart class. You would like to create Cart instances with users Id. You can use this code to have each Cart instance the id of the user.

**Definition in template:**
```yaml
getInstanceId: index.getInstanceId
```

**Method implementation:**


```typescript
export async function getInstanceId(data: Data): Promise<string> {
    return "MyInstanceId"
}
```

## authorizer



Every call made to your class calls the authorizer method defined in your template file.
You can break execution at this point.
An example authorizer could be like:

**Definition in template:**
```yaml
authorizer: index.authorizer
```

**Method implementation:**

```typescript
export async function authorizer(data: Data): Promise<Response> {
    if(data.context.identity === 'developer') 
        return { statusCode: 204 }
    return { statusCode: 401 }
}
```

## getState


This method can be used to get state object when a client asks for state. You can return part of the state or even a modified version of the state to a caller by changing this function.

**Definition in template:**
```yaml
getState: index.getState
```

**Method implementation:**

```typescript
export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: data.state };
}
```

For example you can calculate and add some extra fields to the state object

```typescript
export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: {
      ...data.state,
      someCalculatedField: data.state.public.something + 1
    }}
}
```

or you can just return some part of the state depending on the role of the requester.

```typescript
export async function getState(data: Data): Promise<Response> {
    if(data.context.identity === 'superuser')
      // Return all state
      return { statusCode: 200, body: data.state }
    else 
      // Return just public part
      return { statusCode: 200, body: data.state.public }
}
```



## get

When you try to get an existing instance, get method is called. You can return a custom response.

**Definition in template:**
```yaml
get: index._get
```

**Method implementation:**
```typescript
export async function _get(data: Data): Promise<Data> {
    data.response = { statusCode: 200, body: { customKey: 'customValue' } }
    return data
}
```


## destroy

When you try to delete an instance destroy method is called. If you want to keep the instance you can respond with a status code other than 2xx. This is optional.

**Definition in template:**
```yaml
destroy: index.destroy
```

**Method implementation:**
```typescript
export async function destroy(data: Data): Promise<string> {
    data.response = { statusCode: 204 }
    return data
}
```
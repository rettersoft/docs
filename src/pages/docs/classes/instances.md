---
title: Instances
description: Except for static methods, everything else in a Rio class is instance-based.
---

Except for static methods, everything else in a Rio class is instance-based.

---
## Creating a new instance

When creating a new instance INIT delegate method is called. Check init documentation [here](/docs/classes/delegate-methods#init).

Lifecycle of an instance is documented [here](/docs/classes/lifecycle).

## State

State is a basic storage unit for your instance. Every instance has a state.
Best practice is to keep the size of the state relatively small.

You can store JSON serializable data in your state by 4 different access level: public, user, role, private.

- Everything in public state can be accessible from outside of your instance such as Firestore's realtime streams.
- User state keeps the data by user id. To access that part of the state, clients must have the user id in the token.
- Role state keeps the data by identity. To access that part of the state, clients must have the identity in the token.
- Private state is available for your methods only.

> A state of a single instance cannot be larger than 5 MB.
> If your class works in accelerated mode, the limit is 250 KB after compression.

### What Do You Do With State?

In your server side code you update the state object any way you want. Clients connected to this object will receive updates according to their permission level.

### getState

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

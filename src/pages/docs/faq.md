---
title: FAQ
description: Frequently Asked Questions
---

You can find answers to frequently asked questions here.

---

## How does authentication and authorization work in RIO? How can I make use of them?

Authentication answers the question "Who?". RIO supports JWT as main authentication layer.
Creating (generateCustomToken) a valid token via RDK means validating someone's identity and signing a token for them.
Once a client makes a call, RIO automatically handles the token and updates identity and userId.
Thus, you don't have to do anything authenticate the coming request.

Authorization is totally a different case. Even people with a valid token might not be able to call certain methods in your application.
To accomplish that, you should define a authorizer method and put your business logic into it.

Let's say you have two methods and they have different authorization rules. You can manage who can access your methods as following example.

```typescript
export function authorizer(data: Data): Promise<Data> {
    const { identity, methodName } = data.context
    switch (methodName) {
        case 'myMethodA':
            if (identity === 'user') data.response = { statusCode: 204 }
            return data

        case 'myMethodB':
            if (identity === 'admin') data.response = { statusCode: 204 }
            return data
    }
    data.response = { statusCode: 401, body: { message: 'You are not authorized!' } }
    return data
}
```

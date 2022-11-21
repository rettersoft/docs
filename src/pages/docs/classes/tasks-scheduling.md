---
title: Tasks & Scheduling
description: Tasks are for triggering methods after specified amount of seconds.
---

Tasks are for triggering methods after specified amount of seconds.

---

## Tasks

Sometimes you may want to make another method request but don't need back an immediate response.
Let's say you have created an order and you would like to send it to Reporting class.
You can trigger a method call by setting data.tasks property.

data.tasks property is an array of Task items which looks like this:

```typescript
export interface Task {
    classId?: string;
    instanceId?: string;
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

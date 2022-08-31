---
title: Tasks & Scheduling
description: Tasks is for triggering methods after specified amount of seconds.
---

Tasks is for triggering methods after specified amount of seconds.

---

## Tasks

Sometimes you may want to make another method request but don't need back an immediate response.
Let's say you have created an order and you would like to send it to Reporting class.
You can trigger a method call by setting data.tasks property.

data.tasks property is an array of Schedule items which looks like this:

```typescript
export interface Schedule {
    classId?: string;
    instanceId?: string;
    payload?: any;
    method: string;
    after: number;
}
```

Below example schedules two different calls, one for the same instance another one to another class instance.

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

- **after :** Defined in seconds. You can define a delay for methods with invocationType:IMMEDIATE. This means execute this method after this delay, but immediately execute it. They won't be queued. We currently support delays up to 12 hours.
- **method :** Name of the method to call.
- **classId (optional) :** Name of class. If not given, same classId will be used making this request.
- **instanceId (optional) :** Instance id for a class. If not given request will be sent to the same instance making this request.
- **payload (optional) :** A payload to send to scheduled method. It will be delivered in data.request.body field.

---

## Scheduling

Besides tasks support, Rio also supports crons.

> For more details please visit <https://docs-retter.vercel.app/docs/classes/methods#static>

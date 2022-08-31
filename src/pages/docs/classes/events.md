---
title: Events
description: By publishing and subscribing events, you can implement an event driven architecture.
---

By publishing events and subscribing to them from your class methods, you can implement an event driven architecture.

```typescript
data.events.push({ name: 'CUSTOM_EVENT', payload: { a: 1, b: 2 } })
```

```yaml
  - method: onEventReceive
    type: READ
    handler: index.onEventReceived
    subscriptions:
      - name: CUSTOM_EVENT
        instanceId: $.instanceId
        filters:
          - $.userId:
              EX: true
```

---

## API Reference

### Publishing Events

You should push your events into `data.events` array in the following model.

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| name          | string              | true                | Event's name
| payload       | Record<string, any> | true                | Event's payload

### Filters

You should push your events into `data.events` array in the following model.

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| EX            | boolean             | false               | Checks if the target value is not undefined
| EQ            | any                 | false               | Checks if the target value equals to given value
| NE            | any                 | false               | Checks if the target value does not equal to given value
| GT            | string | number     | false               | Checks if the target value is greater than given value
| GTE           | string | number     | false               | Checks if the target value is greater than or equal to given value
| LT            | string | number     | false               | Checks if the target value is less than given value
| LTE           | string | number     | false               | Checks if the target value is less than or equal to given value
| IN            | string | array      | false               | Cross checks if values match according to the type of the values
| NIN           | string | array      | false               | Cross checks if values don't match according to the type of the values

> IN and NIN have different working perspectives according to their types.

| Target Type   | Provided Type       | Description         |
| ------------- | ------------------- | ------------------- |
| array         | array               | Checks if target array contains any of provided array
| array         | string              | Checks if target array contains provided string
| string        | array               | Checks if target string exists in provided array
| string        | string              | Checks if target string contains provided string

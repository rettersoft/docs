---
title: Deployment
description: You can deploy your classes via RDK.
---

You can deploy your classes via RDK.

> You cannot deploy more than 5 classes in parallel.

```typescript
interface DeleteClass {
    classId: string
}

interface DeleteInstance {
    classId: string
    instanceId: string
}

async function deleteClass(input: DeleteClass): Promise<CloudObjectResponse | undefined> {
    // ...
}

async function deleteInstance(input: DeleteInstance): Promise<CloudObjectResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.deleteClass({ classId: 'MyClass' })
await rdk.deleteInstance({ classId: 'MyClass', instanceId: 'myInstanceId' })

await rdk.pipeline()
    .deleteClass({ classId: 'MyClass' })
    .deleteInstance({ classId: 'MyClass', instanceId: 'myInstanceId' })
    .send()
```

---

## API Reference

### Delete Class Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| classId       | string              | false               | Class ID to delete |

### Delete Class Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

### Delete Instance Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| classId       | string              | false               | Class ID to delete |
| instanceId    | string              | false               | Instance ID to delete |

### Delete Instance Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

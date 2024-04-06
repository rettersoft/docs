---
title: Delete Classes & Instances
description: You can delete your classes and instances via RDK.
---

You can delete your classes and instances via RDK.

- You cannot delete more than 10 classes in parallel.
- You cannot delete more than 10 instances in parallel.

> Write methods cannot delete their own instances.

```typescript
interface DeleteClass {
    classId: string
}

interface DeleteInstance {
    classId: string
    instanceId: string
}

interface DeleteAllInstances {
    classId: string
}

async function deleteClass(input: DeleteClass): Promise<CloudObjectResponse | undefined> {
    // ...
}

async function deleteInstance(input: DeleteInstance): Promise<CloudObjectResponse | undefined> {
    // ...
}

async function deleteAllInstances(input: DeleteAllInstances): Promise<OperationResponse | undefined> {
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
await rdk.deleteAllInstances({ classId: 'MyClass' })

await rdk.pipeline()
    .deleteClass({ classId: 'MyClass' })
    .deleteInstance({ classId: 'MyClass', instanceId: 'myInstanceId' })
    .deleteAllInstances({ classId: 'MyClass' })
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

### Delete All Instances Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| classId       | string              | false               | Class ID to delete its instances |

### Delete All Instance Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

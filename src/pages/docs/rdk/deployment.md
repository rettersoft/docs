---
title: Deployment
description: You can deploy your classes via RDK.
---

You can deploy your classes via RDK.

- You cannot deploy more than 5 classes in parallel.

```typescript
interface DeployClass {
    classId: string
    force?: boolean
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function deployClass(input: DeployClass): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.deployClass({ classId: 'User', force: true })

await rdk.pipeline()
    .deployClass({ classId: 'User', force: true })
    .deployClass({ classId: 'Product', force: true })
    .send()
```

---

## API Reference

### Deploy Class Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| classId       | string              | false               | Class ID to deploy |
| force         | boolean             | false               | Flag to decide whether to force the deployment or not |

### Deploy Class Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

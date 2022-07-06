---
title: Deployment
description: You can deploy your classes via RDK.
---

You can deploy your classes via RDK.

> You cannot deploy more than 5 classes in parallel.

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

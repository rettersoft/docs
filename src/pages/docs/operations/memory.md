---
title: Memory
description: Memory is a built-in in-memory cache that you can interact via RDK.
---

Memory is a built-in in-memory cache that you can interact via RDK.

- You cannot set more than 25 keys in parallel.
- You cannot delete more than 25 keys in parallel.
- You cannot get more than 100 keys in parallel.

```typescript
interface GetMemory {
    key: string
}
interface DeleteMemory {
    key: string
}
interface SetMemory {
    key: string
    value: any
    expireAt?: number
}
interface IncrementMemory {
    key: string
    path?: string
    value: number
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function setMemory(input: SetMemory): Promise<OperationResponse | undefined> {
    // ...
}

async function getMemory(input: GetMemory): Promise<OperationResponse | undefined> {
    // ...
}

async function deleteMemory(input: DeleteMemory): Promise<OperationResponse | undefined> {
    // ...
}

async function incrementMemory(input: IncrementMemory): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.setMemory({ key: 'my-key', value: 'my-value' })
await rdk.incrementMemory({ key: 'my-key', value: 3 })
await rdk.getMemory({ key: 'my-key' })
await rdk.deleteMemory({ key: 'my-key' })

await rdk.pipeline()
    .setMemory({ key: 'my-key', value: 'my-value' })
    .incrementMemory({ key: 'my-key', value: 3 })
    .getMemory({ key: 'my-key' })
    .deleteMemory({ key: 'my-key' })
    .send()
```

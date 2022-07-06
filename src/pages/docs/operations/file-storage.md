---
title: File Storage
description: File Storage is an easy to use disk API that you can interact via RDK.
---

File Storage is an easy to use disk API that you can interact via RDK.

- You cannot set more than 5 files in parallel.
- You cannot get more than 10 files in parallel.
- You cannot delete more than 5 files in parallel.

```typescript
interface GetFile {
    filename: string
}
interface SetFile extends GetFile {
    body: string
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function getFile(input: GetFile): Promise<OperationResponse | undefined> {
    // ...
}

async function setFile(input: SetFile): Promise<OperationResponse | undefined> {
    // ...
}

async function deleteFile(input: GetFile): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.setFile({ setName: 'my-set', sortKey: 'my-sort-key', data: { key: 'value' } })
await rdk.getFile({ setName: 'my-set', sortKey: 'my-sort-key' })
await rdk.deleteFile({ setName: 'my-set', beginsWith: 'my', limit: 10 })

await rdk.pipeline()
    .setFile({ filename: 'my-file', body: 'my-content' })
    .getFile({ filename: 'my-file' })
    .deleteFile({ filename: 'my-file' })
    .send()
```

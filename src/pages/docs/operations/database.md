---
title: Database
description: Database is a built-in NoSQL data storage with in-memory acceleration layer that you can interact via RDK.
---

Database is a built-in NoSQL data storage with in-memory acceleration layer that you can interact via RDK.

- You cannot write more than 25 records in parallel.
- You cannot get more than 100 records in parallel.
- You cannot remove more than 25 records in parallel.
- You cannot run more than 10 queries in parallel.

```typescript
interface WriteToDatabase {
    partKey: string
    sortKey: string
    memory?: boolean
    data: Record<string, unknown>
}
interface ReadDatabase {
    partKey: string
    sortKey: string
    memory?: boolean
}
interface QueryDatabase {
    partKey: string
    beginsWith?: string
    greaterOrEqual?: string
    lessOrEqual?: string
    reverse?: boolean
    nextToken?: string
    limit?: number
}
interface RemoveFromDatabase {
    partKey: string
    sortKey: string
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function writeToDatabase(input: WriteToDatabase): Promise<OperationResponse | undefined> {
    // ...
}
async function readDatabase(input: ReadDatabase): Promise<OperationResponse | undefined> {
    // ...
}
async function queryDatabase(input: QueryDatabase): Promise<OperationResponse | undefined> {
    // ...
}
async function removeFromDatabase(input: RemoveFromDatabase): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.writeToDatabase({ partKey: 'my-part', sortKey: 'my-sort', memory: true, data: { key: 'value' } })
await rdk.readDatabase({ partKey: 'my-part', sortKey: 'my-sort', memory: true })
await rdk.queryDatabase({ partKey: 'my-part', beginsWith: 'my', limit: 10 })
await rdk.removeFromDatabase({ partKey: 'my-part', sortKey: 'my-sort' })

await rdk.pipeline()
    .writeToDatabase({ partKey: 'my-part', sortKey: 'my-sort', memory: true, data: { key: 'value' } })
    .readDatabase({ partKey: 'my-part', sortKey: 'my-sort', memory: true })
    .queryDatabase({ partKey: 'my-part', beginsWith: 'my', limit: 10 })
    .removeFromDatabase({ partKey: 'my-part', sortKey: 'my-sort' })
    .send()
```

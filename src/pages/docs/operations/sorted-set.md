---
title: Sorted Set
description: Sorted Set is an easy to use NoSQL database that you can put your records in order.
---

Sorted Set is an easy to use NoSQL database that you can put your records in order.

```typescript
interface GetFromSortedSet {
    setName: string
    sortKey: string
}
interface RemoveFromSortedSet {
    setName: string
    sortKey: string
}
interface AddToSortedSet {
    setName: string
    sortKey: string
    data: Record<string, unknown>
}
interface QuerySortedSet {
    setName: string
    beginsWith?: string
    greaterOrEqual?: string
    lessOrEqual?: string
    reverse?: boolean
    nextToken?: string
    limit?: number
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function addToSortedSet(input: AddToSortedSet): Promise<OperationResponse | undefined> {
    // ...
}
async function getFromSortedSet(input: GetFromSortedSet): Promise<OperationResponse | undefined> {
    // ...
}
async function removeFromSortedSet(input: RemoveFromSortedSet): Promise<OperationResponse | undefined> {
    // ...
}
async function querySortedSet(input: QuerySortedSet): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.addToSortedSet({ setName: 'my-set', sortKey: 'my-sort-key', data: { key: 'value' } })
await rdk.getFromSortedSet({ setName: 'my-set', sortKey: 'my-sort-key' })
await rdk.querySortedSet({ setName: 'my-set', beginsWith: 'my', limit: 10 })
await rdk.removeFromSortedSet({ setName: 'my-set', sortKey: 'my-sort-key' })

await rdk.pipeline()
    .addToSortedSet({ setName: 'my-set', sortKey: 'my-sort-key', data: { key: 'value' } })
    .getFromSortedSet({ setName: 'my-set', sortKey: 'my-sort-key' })
    .querySortedSet({ setName: 'my-set', beginsWith: 'my', limit: 10 })
    .removeFromSortedSet({ setName: 'my-set', sortKey: 'my-sort-key' })
    .send()
```

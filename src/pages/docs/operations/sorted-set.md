---
title: Sorted Set
description: Sorted Set is an easy to use NoSQL database that you can put your records in order.
---

Sorted Set is an easy to use NoSQL database that you can put your records in order.

- You cannot add more than 25 keys in parallel.
- You cannot get more than 100 keys in parallel.
- You cannot remove more than 25 keys in parallel.
- You cannot run more than 10 queries in parallel.

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

---

## API Reference

### Add To Sorted Set Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| setName       | string              | true                | Set's name |
| sortKey       | string              | true                | Sort key |
| data          | Record<string, any> | true                | Data |

### Get From Sorted Set Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| setName       | string              | true                | Set's name |
| sortKey       | string              | true                | Sort key |

### Remove From Sorted Set Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| setName       | string              | true                | Set's name |
| sortKey       | string              | true                | Sort key |

### Query Sorted Set Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| setName       | string              | true                | Set's name |
| beginsWith    | string              | false               | Comparison filter for sort key |
| greaterOrEqual | string             | false               | Comparison filter for sort key |
| lessOrEqual   | string              | false               | Comparison filter for sort key |
| reverse       | boolean             | false               | Flag to decide whether to scan data backwards or not |
| nextToken     | string              | false               | Pagination token |
| limit         | number              | false               | Limits the number of records in the result |

### Operation Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

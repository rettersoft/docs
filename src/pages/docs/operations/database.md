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
    data: Record<string, any>
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

---

## API Reference

### Write To Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |
| memory        | string              | false               | Flag to decide whether to put the data into memory or not |
| data          | Record<string, any> | true                | Actual data of the record |

### Read Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |
| memory        | string              | false               | Flag to decide whether to put the data into memory or not |

### Remove From Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |

### Query Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
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

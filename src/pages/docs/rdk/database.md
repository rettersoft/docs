---
title: Database
description: Database is a built-in NoSQL data storage with in-memory acceleration layer that you can interact via RDK.
---

Database is a built-in NoSQL data storage with in-memory acceleration layer that you can interact via RDK.

- You cannot write more than 25 records in parallel.
- You cannot increase paths in parallel.
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

interface IncrementDatabase {
    partKey: string
    sortKey: string
    path?: string
    value: number
    memory?: boolean
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

interface RemovePartitionFromDatabase {
    partKey: string
}

interface RemoveFromDatabase extends RemovePartitionFromDatabase {
    sortKey: string
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

export interface ReadDatabaseResponse extends OperationResponse {
    data?: { part: string, sort: string, data?: any }
}

export type DatabaseOutput = { partKey: string, sortKey: string, data?: any }
export interface QueryDatabaseResponse extends OperationResponse {
    data?: { items?: DatabaseOutput[], nextToken?: string }
}

async function writeToDatabase(input: WriteToDatabase): Promise<OperationResponse | undefined> {
    // ...
}
async function incrementDatabase(input: IncrementDatabase): Promise<OperationResponse | undefined> {
    // ...
}
async function readDatabase(input: ReadDatabase): Promise<ReadDatabaseResponse | undefined> {
    // ...
}
async function queryDatabase(input: QueryDatabase): Promise<QueryDatabaseResponse | undefined> {
    // ...
}
async function removeFromDatabase(input: RemoveFromDatabase): Promise<OperationResponse | undefined> {
    // ...
}
async function removePartitionFromDatabase(input: RemovePartitionFromDatabase): Promise<OperationResponse | undefined> {
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
    .writeToDatabase({ partKey: 'my-part', sortKey: 'my-other-sort', memory: true, data: { key: 'value2' } })
    .readDatabase({ partKey: 'my-part', sortKey: 'my-sort', memory: true })
    .queryDatabase({ partKey: 'my-part', beginsWith: 'my', limit: 10 })
    .removeFromDatabase({ partKey: 'my-part', sortKey: 'my-sort' })
    .removePartitionFromDatabase({ partKey: 'my-part' })
    .send()
```

---

## API Reference

### Write To Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |
| memory        | boolean             | false               | Flag to decide whether to put the data into memory or not |
| expireAt      | number              | false               | Time to live in seconds |
| data          | Record<string, any> | true                | Actual data of the record |

### Increment Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |
| path          | string              | false               | Path to increase the value. If you don't provide it, data will end up as a number |
| memory        | boolean             | false               | Flag to decide whether to put the data into memory or not |
| value         | number              | true                | Amount |

### Read Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |
| memory        | boolean             | false               | Flag to decide whether to put the data into memory or not |

### Remove From Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |
| sortKey       | string              | true                | Sort key of the record |

### Remove Partition From Database Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| partKey       | string              | true                | Partition key of the record |

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

### Read Database Response

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | { part: string, sort: string, data?: any } | false              | Successful response |
| error         | string              | false               | Reason of failure |

### Remove Partition From Database Response

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | { executionId: string } | false              | Successful response |
| error         | string              | false               | Reason of failure |

### Query Database Response

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | { items?: DatabaseOutput[], nextToken?: string } | false        | Successful response |
| error         | string              | false               | Reason of failure |

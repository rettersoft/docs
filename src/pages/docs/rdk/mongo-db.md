---
title: MongoDB
description: The `rdk.mongodb` function provides an abstraction layer for interacting with MongoDB databases, allowing developers to perform various CRUD operations and advanced MongoDB features. It supports operations such as inserting, updating, deleting, querying, aggregating, and more, all with a consistent API.
---

## MongoDB

`rdk.mongodb` allows developers to:

1. Connect to a MongoDB database using a URI.
2. Perform operations on a specific collection.
3. Utilize MongoDB CRUD and aggregation operations in a structured manner.

---

**Version Compatibility**: Compatible with RIO version 2.1.21 and above. and RDK 2.0.27 and above

**Operation Exclusivity**: Only one operation (e.g., `find`, `insertOne`) should be provided per request.

---

## Function Signature

```typescript
rdk.mongodb(request: MongoRequest): Promise<MongoResponse>
```

### `MongoRequest`
An object specifying the MongoDB operation and its parameters.

### `MongoResponse`
A promise resolving to the result of the operation or an error if the operation fails.

---

## Request Parameters

### Common Parameters

| Parameter    | Type   | Description                                              | Required |
|--------------|--------|----------------------------------------------------------|----------|
| `uri`        | string | MongoDB connection URI.                                   | Yes      |
| `database`   | string | The database name to perform the operation on.           | Yes      |
| `collection` | string | The collection name to perform the operation on.         | Yes      |

### Supported Operations
Each operation accepts specific fields. Below are details about the operations and their parameters:

#### Find Operations

| Operation | Interface       | Parameters                           |
|-----------|-----------------|--------------------------------------|
| `find`    | `MongoFind`     | `filter`, `skip`, `limit`, `options` |
| `findOne` | `BaseMongoQuery`| `filter`, `options`                  |

#### Update Operations

| Operation             | Interface             | Parameters                                           |
|-----------------------|-----------------------|----------------------------------------------------|
| `updateOne`           | `MongoQueryWithUpdate`| `filter`, `update`, `options` (supports `upsert`)   |
| `updateMany`          | `MongoQueryWithUpdate`| `filter`, `update`, `options` (supports `upsert`)   |
| `findOneAndUpdate`    | `MongoQueryWithUpdate`| `filter`, `update`, `options` (e.g., `returnDocument`, `upsert`) |

#### Insert Operations

| Operation    | Interface        | Parameters            |
|--------------|------------------|-----------------------|
| `insertOne`  | `MongoInsertOne` | `document`, `options` |
| `insertMany` | `MongoInsertMany`| `documents`, `options`|

#### Delete Operations

| Operation             | Interface       | Parameters          |
|-----------------------|-----------------|---------------------|
| `deleteOne`           | `BaseMongoQuery`| `filter`, `options` |
| `deleteMany`          | `BaseMongoQuery`| `filter`, `options` |
| `findOneAndDelete`    | `BaseMongoQuery`| `filter`, `options` |

#### Advanced Operations

| Operation         | Interface        | Parameters                         |
|-------------------|------------------|------------------------------------|
| `aggregate`       | `MongoAggregate`| `pipeline`, `options`             |
| `countDocuments`  | `MongoCountDocuments` | `filter`, `options`             |
| `distinct`        | `MongoDistinct` | `key`, `filter`                   |

---

## Example Usage

### Insert a Document
```typescript
const insertOneResult = await rdk.mongodb({
    uri: MONGO_DB_URI,
    database: 'admin',
    collection: 'users',
    insertOne: {
        document: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
    },
});
```

### Update a Document (Upsert)
```typescript
const updateOneResult = await rdk.mongodb({
    uri: MONGO_DB_URI,
    database: 'admin',
    collection: 'users',
    updateOne: {
        filter: { email: 'john.doe@example.com' },
        update: { $set: { name: 'John Updated' } },
        options: { upsert: true },
    },
});
```

### Query Multiple Documents
```typescript
const findResult = await rdk.mongodb({
    uri: MONGO_DB_URI,
    database: 'admin',
    collection: 'users',
    find: {
        filter: { isActive: true },
        limit: 10,
    },
});
```

### Perform Aggregation
```typescript
const aggregateResult = await rdk.mongodb({
    uri: MONGO_DB_URI,
    database: 'admin',
    collection: 'orders',
    aggregate: {
        pipeline: [
            { $match: { status: 'shipped' } },
            { $group: { _id: '$customerId', totalOrders: { $sum: 1 } } },
        ],
    },
});
```

### Count Documents
```typescript
const countResult = await rdk.mongodb({
    uri: MONGO_DB_URI,
    database: 'admin',
    collection: 'users',
    countDocuments: {
        filter: { isActive: true },
    },
});
```

---

## Error Handling

### Response Structure
All operations return a structured response:
```typescript
interface MongoResponse {
    success: boolean;
    data?: any;
    error?: any;
}
```

### Example
```typescript
if (!response.success) {
    console.error('Error:', response.error);
}
```



For additional questions or troubleshooting, refer to the RDK MongoDB documentation or contact support.
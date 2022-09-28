---
title: Bulk Import
description: You can call methods and create instances through a bulk data.
---

You can call methods and create instances through a bulk data.
You can prepare your batches as in your method calls or class initiations via RDK.

- You cannot start more than 3 bulk imports in parallel.
- Bulk import requests in a single batch cannot be more than 250 KB.

```typescript
export interface BulkImport {
    getInstance?: GetInstance[],
    methodCall?: MethodCall[],
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function bulkImport(input: BulkImport): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.bulkImport({ getInstance: [{ classId: 'MyClass' }], methodCall: [{ classId: 'MyClass', methodName: 'myMethod', instanceId: 'myInstance' }] })

await rdk.pipeline()
    .bulkImport({ getInstance: [{ classId: 'MyClass', body: { x: 1, y: 2 } }] })
    .bulkImport({ methodCall: [{ classId: 'MyClass', methodName: 'myMethod', instanceId: 'myInstance', body: { a: 'X', b: 'Y' } }] })
    .send()
```

---

## API Reference

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| getInstance   | GetInstance[]       | false               | Bulk getInstance requests |
| methodCall    | MethodCall[]        | false               | Bulk methodCall requests |

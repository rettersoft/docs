---
title: RDK
description: RDK is the API layer of Rio operations.
---

RDK is the API layer of Rio operations.

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()
```

You can use pipelines to send multiple operations in a single execution.

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()
await rdk.pipeline()
    .writeToDatabase({ partKey: 'my-part', sortKey: 'my-sort', memory: true, data: { key: 'value' } })
    .setFile({ filename: 'my-file', body: 'my-content' })
    .setLookupKey({ key: { name: 'msisdn', value: '905987654321' } })
    .addToSortedSet({ setName: 'my-set', sortKey: 'my-sort-key', data: { key: 'value' } })
    .send()
```

---
title: Caching
description: You can invalidate your cached responses via RDK.
---

You can invalidate your cached responses via RDK.

> You cannot invalidate more than 5 cached responses in parralel

```typescript
interface InvalidateCache {
    classId?: string
    methodName?: string
    instanceId?: string
}

interface InvalidateCacheResponse {
    success: boolean
    data?: {
        id: string
    }
    error?: string
}

async function invalidateCache(input: InvalidateCache): Promise<InvalidateCacheResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.invalidateCache({ classId: 'User', instanceId: 'user001', methodName: 'getProfile' })

await rdk.pipeline()
    .invalidateCache({ classId: 'User', instanceId: 'user000', methodName: 'getProfile' })
    .invalidateCache({ classId: 'User', instanceId: 'user001', methodName: 'getProfile' })
    .send()

```

---

## API Reference

### Invalidate Cache Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| classId       | string              | false               | Class ID of cached response |
| methodName    | string              | false               | Method name of cached response |
| instanceId    | string              | false               | Instance ID of cached response |

### Invalidate Cache Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | { id: string }      | false               | Successful response |
| error         | string              | false               | Reason of failure |

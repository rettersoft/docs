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

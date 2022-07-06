---
title: Caching
description: You can invalidate your cached responses via RDK.
---

You can invalidate your cached responses via RDK.

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
```

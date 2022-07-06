---
title: Authentication
description: You can generate custom tokens via RDK.
---

You can generate custom tokens via RDK.

```typescript
interface GenerateCustomToken {
    userId: string
    identity: string
    claims?: KeyValue
}

interface GenerateCustomTokenResponse {
    success: boolean
    data?: {
        customToken: string
    }
    error?: string
}

async function generateCustomToken(input: GenerateCustomToken): Promise<GenerateCustomTokenResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.generateCustomToken({ userId: 'user00', identity: 'enduser', claims: { name: 'John Doe' } })

await rdk.pipeline()
    .generateCustomToken({ userId: 'user01', identity: 'enduser', claims: { name: 'John Doe' } })
    .generateCustomToken({ userId: 'user02', identity: 'enduser', claims: { name: 'Jane Doe' } })
    .send()
```

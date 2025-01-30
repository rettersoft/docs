---
title: Authentication
description: You can generate custom tokens via RDK.
---

You can generate custom tokens via RDK.

- You cannot generate more than 10 custom tokens in parallel.
- accessTokenTTL refreshTokenTTL support added in 2.1.23

```typescript
interface GenerateCustomToken {
    userId: string
    identity: string
    claims?: KeyValue
    accessTokenTTL?: number // in seconds and works in rio@2.1.23
    refreshTokenTTL?: number // in seconds and works in rio@2.1.23
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

await rdk.generateCustomToken({ userId: 'user00', identity: 'enduser', claims: { name: 'John Doe' }, accessTokenTTL: 3600, refreshTokenTTL: 86400 })

await rdk.pipeline()
    .generateCustomToken({ userId: 'user01', identity: 'enduser', claims: { name: 'John Doe' } })
    .generateCustomToken({ userId: 'user02', identity: 'enduser', claims: { name: 'Jane Doe' } })
    .send()
```

---

## API Reference

### Generate Custom Token Input

| Parameter      | Type                | Required            | Description         |
| -------------  | ------------------- | ------------------- | ------------------- |
| userId         | string              | true                | User's ID to put into the token |
| identity       | string              | true                | User's identity (role) to put into the token |
| claims         | Record<string, any> | false               | User's metadata to put into the token |
| accessTokenTTL | number              | false               | Access token time-to-live in seconds (max: 3600) |
| refreshTokenTTL| number              | false               | Refresh token time-to-live in seconds (must be greater than accessTokenTTL) |

### Generate Custom Token Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | { customToken: string } | false           | Successful response |
| error         | string              | false               | Reason of failure |

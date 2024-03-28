---
title: Authentication
description: You can generate custom tokens via RDK.
---

You can generate custom tokens via RDK.

> You cannot generate more than 10 custom tokens in parallel.

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

---

## API Reference

### Generate Custom Token Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| userId        | string              | true                | User's ID to put into the token |
| identity      | string              | true                | User's identity (role) to put into the token |
| claims        | Record<string, any> | false               | User's metadata to put into the token |

### Generate Custom Token Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | { customToken: string } | false           | Successful response |
| error         | string              | false               | Reason of failure |

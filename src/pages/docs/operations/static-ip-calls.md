---
title: Static IP Calls Storage
description: You can make API calls to outside of Rio from a static IP address.
---

You can make API calls to outside of Rio from a static IP address.

```typescript
interface StaticIPRequest {
    url: string
    data: {
        requestData?: any
        returnData?: any
        returnEndpoint?: StaticIPCallback
    }
    headers?: Record<string, string>
    method?: StaticIPHttpMethod
    timeout?: number
    sync?: boolean
    auth?: {
        username: string
        password: string
    }
    disableSSL?: boolean
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function request(input: StaticIPRequest): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.request({ url: 'https://api.ipify.org?format=json', method: 'GET' })
```

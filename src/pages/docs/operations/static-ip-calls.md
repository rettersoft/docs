---
title: Static IP Calls
description: You can make API calls to outside of Rio from a static IP address.
---

You can make API calls to outside of Rio from a static IP address.

> You cannot make more than 3 requests in parallel.

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

async function httpRequest(input: StaticIPRequest): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.request({ url: 'https://api.ipify.org?format=json', method: 'GET' })
await rdk.httpRequest({ url: 'https://api.ipify.org?format=json', method: 'GET' })

await rdk.pipeline()
    .request({ url: 'https://api.ipify.org?format=json', method: 'GET' })
    .request({ url: 'https://api.ipify.org?format=json', method: 'POST' })
    .httpRequest({ url: 'https://api.ipify.org?format=json', method: 'GET' })
    .httpRequest({ url: 'https://api.ipify.org?format=json', method: 'POST' })
    .send()
```

---

## API Reference

### Static IP Request Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| url           | string              | true                | URL |
| data          | { requestData?: any; returnData?: any; returnEndpoint?: StaticIPCallback } | true                | Request body |
| method        | string              | false               | HTTP method |
| headers       | Record<string, string> | false               | Request headers |
| timeout       | number              | false               | Timeout |
| sync          | boolean             | false               | Flag to decide whether to respond synchronously or not |
| auth          | { username: string, password: string } | false               | Basic authentication parameters |
| disableSSL    | boolean             | false               | Flag to decide whether to disable SSL verification |

### Operation Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

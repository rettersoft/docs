---
title: Lookup Keys
description: You can use lookup keys to assign multiple references to instances.
---

You can use lookup keys to assign multiple references to instances.
Most common use of a lookup key is to assign email and msisdn to a user's profile.
Thus, you can reach the instance by calling it with email or msisdn.

- You cannot get more than 100 keys in parallel.
- You cannot set more than 25 keys in parallel.
- You cannot delete more than 25 keys in parallel.

```typescript
interface LookUpKey {
    key: {
        name: string
        value: string
    }
}

interface OperationResponse {
    success: boolean
    data?: any
    error?: string
}

async function getLookUpKey(input: LookUpKey): Promise<OperationResponse | undefined> {
    // ...
}

async function setLookUpKey(input: LookUpKey): Promise<OperationResponse | undefined> {
    // ...
}

async function deleteLookUpKey(input: LookUpKey): Promise<OperationResponse | undefined> {
    // ...
}
```

---

## Usage

```typescript
import RDK from '@retter/rdk'

const rdk = new RDK()

await rdk.getLookupKey({ key: { name: 'msisdn', value: '905987654321' } })
await rdk.setLookupKey({ key: { name: 'msisdn', value: '905987654321' } })
await rdk.deleteLookupKey({ key: { name: 'msisdn', value: '905987654321' } })

await rdk.pipeline()
    .setLookupKey({ key: { name: 'msisdn', value: '905987654321' } })
    .getLookupKey({ key: { name: 'msisdn', value: '905987654321' } })
    .deleteLookupKey({ key: { name: 'msisdn', value: '905987654321' } })
    .send()
```

---

## API Reference

### Lookup Key Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| key           | { name: string, value: string } | true                | Lookup key's name and value |

### Operation Output

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| success       | boolean             | true                | Returns true if operation is successful |
| data          | any                 | false               | Successful response |
| error         | string              | false               | Reason of failure |

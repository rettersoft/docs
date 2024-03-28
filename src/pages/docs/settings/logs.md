---
title: Logs
description: Every call made to the classes in your project will show up in logs.
---

Every call made to the classes in your project will show up in logs.

---

## Log Adapters

In Rio, you can access request and response logs through developer console in most cases, projects might require more sophisticated query options.
Rio has two different types of log adapters to send all logs to your third party services.

### Http Log Adapter

Http Log Adapter is for general purposes. You can receive all of your logs via an HTTP API and send them to wherever you want to.

```typescript
interface HttpLogAdapter {
    type: 'HTTP'
    endpoint: string
    apiKey: string
}
```

### Kinesis Log Adapter

Kinesis Log Adapter supports directly AWS Kinesis service that requires no custom implementation for receiving logs.
On the other hand, you need to implement a consumer on your AWS account for processing your logs in batches.

```typescript
interface HttpLogAdapter {
    type: 'KINESIS'
    streamName: string
    accessKeyId: string
    secretAccessKey: string
    region: string
}
```

### Dynamic Parameters In Log Adapter Configuration

Log adapters support VTL templates to allow you provide dynamic values in configuration.
There are 3 different resources for accessing dynamic values: context, environment variables and state.
You can access context and state via *$data* parameter while accessing environment variables through their own parameter called *$env*.

```text
http://mydomain.com/$data.context.instanceId/$data.state.private.valueFromPrivateState/$env.ENV_VAR
```

## Log Masking

You can exclude your sensitive data from log records by simply masking them out in your class templates.
You can target only request and response objects in your method's payload.

Please see usage of logMasks parameter below.

```yaml
init: index.init
methods:
  - method: hello
    handler: index.hello
logMasks:
  - path: "request.headers.api_key"
  - path: "request.body.password"
  - path: "response.headers.next_token"
  - path: "response.body.msisdn"
```

---
title: Settings
description: All configuration available in project scope can be found under Settings tab.
---

All configuration available in project scope can be found under Settings tab.
You can change project's name in **Config** tab.
Additionally, you can deactive project by clicking the red button in **Danger Zone**.

---

## Secrets

There are three secret keys in Rio: access, refresh and custom secret keys.
Rio core uses these secret keys to generate access, refresh and custom tokens.
If you regenerate any of these keys, existing tokens will become invalid immediately.

## Environments

You can define environment variables as a JSON document here.
They will be available in your methods through your programming language's default environment support.
For example, in nodejs, you can access them via *process.env*

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

## Tracing Adapters

In Rio, you can enable tracing mode for your project.
In tracing mode, all of your API calls will be pushed to XRAY for detailed analysis.

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| type          | string (XRAY)       | true                | Tracing service.    |

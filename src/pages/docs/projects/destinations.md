---
title: Destinations
description: You can use destination adapters to subscribe every state change and send them to Elasticsearch, Firestore or your own custom REST API.
---


You can use destination adapters to subscribe every state change and send them to Elasticsearch, Firestore or your own custom REST API.
For Elasticsearch, we support only elastic.co's cloud service for now.

If your destination adapter become unavailable, Rio retries to send the state change with an exponential backoff strategy.
To configure your retry behavior, you should provide delay and max count.

> Please make sure that your destination adapter id is unique in your project scope.

```typescript
{
    public: {}, // public state
    user: {
        [userId]: {} // state available to userId
    },
    role: {
        [roleId]: {} // state available to roleId
    },
    private: {}, // private state
}
```

## Destinations in Templates

To use any of these destinations, you should add them into your class templates.

```yaml
destinations:
    - id: yourDestinationId
```

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| id            | string              | true                | Destination's unique ID |

## API Reference

| Parameter         | Type                                    | Required            | Description         |
| ----------------- | --------------------------------------- | ------------------- | ------------------- |
| id                | string                                  | true                | Destination's unique ID |
| type              | string (Elasticsearch, Firestore, Http) | true                | Destination's type |
| pfactor           | number                                  | false               | Parallelization factor. If you set this, queue will be consumed by the number you provided in parallel |
| retryConfig.delay | number                                  | false               | delay multiplexer after a failed execution |
| retryConfig.count | number                                  | false               | maximum retry count after a failed execution |

### Concurrency

By default, destinations have instanceId based concurrency which means each instanceId has its own queue to push messages in order.
These messages will be delivered in parallel by number of active instanceIds.

If you want to manage concurrency you should provide a parallelization factor in your destination configuration.
When you set an integer greater than zero, core will limit concurrent threads to that value instead of number of active instanceIds.

### Elasticsearch Support

| Parameter         | Type                                    | Required            | Description         |
| ----------------- | --------------------------------------- | ------------------- | ------------------- |
| cloudId           | string                                  | true                | Elasti.co's cloud id |
| username          | string                                  | true                | Elasti.co's username |
| password          | string                                  | true                | Elasti.co's password |
| index             | string                                  | true                | Index name to push the data into |

### Http Support

| Parameter             | Type                                    | Required            | Description         |
| --------------------- | --------------------------------------- | ------------------- | ------------------- |
| method                | string                                  | true                | Http method |
| url                   | string                                  | true                | Request url |
| headers.<header_name> | string                                  | false               | Request header's name and value |

### Dynamic Parameters In Destination Configuration

Destinations support VTL templates to allow you provide dynamic values in configuration.
There are 3 different resources for accessing dynamic values: context, environment variables and state.
You can access context and state via *$data* parameter while accessing environment variables through their own parameter called *$env*.

```text
http://mydomain.com/$data.context.instanceId/$data.state.private.valueFromPrivateState/$env.ENV_VAR
```

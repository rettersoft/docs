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
    _public: {}, // public state
    _user: {
        [userId]: {} // state available to userId
    },
    _role: {
        [roleId]: {} // state available to roleId
    },
    _private: {}, // private state
}
```

## Concurrency

By default, destinations have instanceId based concurrency which means each instanceId has its own queue to push messages in order.
These messages will be delivered in parallel by number of active instanceIds.

If you want to manage concurrency you should provide a parallelization factor in your destination configuration.
When you set an integer greater than zero, core will limit concurrent threads to that value instead of number of active instanceIds.

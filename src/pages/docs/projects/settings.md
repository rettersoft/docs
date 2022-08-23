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
Rio has graylog support as a log adapter to send all logs to your graylog server.
All you have to do is that you add a log adapter by providing **endpoint**, **username** and **password**.

## Destination Adapters

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

### Concurrency

By default, destinations have instanceId based concurrency which means each instanceId has its own queue to push messages in order.
These messages will be delivered in parallel by number of active instanceIds.

If you want to manage concurrency you should provide a parallelization factor in your destination configuration.
When you set an integer greater than zero, core will limit concurrent threads to that value instead of number of active instanceIds.

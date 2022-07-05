---
title: Limits
description: There are subscription and hard limits.
---

There are two types of limits.

Hard limits refer to system wide limits, which cannot be changed by upgrading to a new subscription.
Subscription limits refer to project specific limits which can be changed by upgrading to a newer subscription.
There are also two types of subscription limits: daily and total.

---

## Subscription Limits

Each project has it's own subscription.
A subscription defines how much resource this project is entitled to use per day or month.
A project can be configured to have daily or monthly limits.
A free subscription daily limits are:

- **Class Limit :** Number of total classes you can have. It's 5 classes by default.
- **User Code Duration :** Total milliseconds your code can run in each day. It's 1,500,000 milliseconds by default.
- **Api Call :** Number of API calls made to your classes in each day. These consist of calls from outside of Rio. Nor the ones made from RDK or Schedule/Task commands. It's 5000 by default.
- **Method Lambda Call :** Method calls made within Rio in each day. These can be made with RDK or Schedule/Task commands. It's 5000 by default.
- **Operations :** Number of operations you can call in each day such as file, memory, lookup keys etc. It's 5000 by default.
- **State Size :** Total size of instance state data you can store. It's 100,000 KB by default.
- **File Storage :** Size of total stored files on Rio disk. It's 20,000 KB by default.
- **Memory Storage :** Size of total global memory usage. It's 1,000 KB by default.
- **Lookup Key Storage :** Size of data stored in lookup key storage. It's 1,000 KB by default.
- **SortedSet Storage :** Size of data stored in sorted sets. It's 5,000 KB by default.

## Hard Limits

- **Single Schedule API Call :** Number of methods to trigger in a single *tasks* call. It cannot be more than 250.

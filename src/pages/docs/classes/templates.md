---
title: Templates
description: Rio Classes are defined in template files.
---

Rio Classes are defined in template files.
A template looks like this:

```yaml
init: index.init
getState: index.getState
authorizer: index.authorizer
methods:
  - method: sayHello
    inputModel: SayHelloInput
    tag: test
    type: READ
    handler: index.sayHello
```

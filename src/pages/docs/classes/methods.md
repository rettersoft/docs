---
title: Methods
description: Methods are places that you put your business logic and implementations.
---

Methods are places that you put your business logic and implementations.
You can as many methods as you like in your template file.

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
  - method: sayByeBye
    inputModel: SayByeByeInput
    tag: test
    type: STATIC
    handler: index.sayByeBye
```

---

## Method Types

There are 4 method types: **READ**, **STATIC**, **WRITE**, **QUEUED_WRITE**.
Read only methods like READ and STATIC can't modify states but they can use operations through RDK.

### STATIC

Rio's static methods don't interact with instances as in static methods in traditional object oriented programming.
You can call them via SDKs, RDK, tasks just like other types of methods.
Unlike others, static methods support also scheduling.
You can define schedule rules to call static methods in regular basis.

```yaml
init: index.init
getState: index.getState
authorizer: index.authorizer
methods:
  - method: cronA
    type: STATIC
    handler: index.cronA
    schedule: rate(30 minutes)
  - method: cronB
    type: STATIC
    handler: index.cronB
    schedule: cron(0 18 ? * MON-FRI *)
```

In the example above, cronA is called every 30 minutes and cronB is called every week monday to friday at 6 PM.

> For more details about crons please visit <https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html>

### READ

Read methods should be called in instance scope.
They get the current value of the state but they cannot write anything.

### WRITE

Unlike read methods, write methods are able to write to states.
Concurrent write to an instance's state is always **1**.
To accomplish that, WRITE methods use locks to manage concurrency.

If another call is about to write to the state, Rio returns with a special error code 570 to inform the sdk.
SDK automatically retries it according to the configuration.
If you don't use one of our SDKs, it's your responsibility to handle retry procedure.

### QUEUED_WRITE

Queued write methods are also able to write to states.
They are based on a FIFO queue, so concurrency management handled automatically.

If there is a new WRITE method while a queued write method is still on progress, Rio opens a few seconds gap right after queued write method completed.
Thus, next WRITE method is able to execute, even if there are lots of pending requests in FIFO queue.

---

## Validation

Rio has an optional built-in validation with JSON schema models.
After adding a valid JSON schema into models, you assign them to your methods as input, output, query string or error model.
Rio will evaluate the data with your model and inform the client accordingly.

Let's say we have a model called SayHelloInput

```json
{
  "type": "object",
  "required": [
    "firstName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "age": {
      "description": "Age in years which must be equal to or greater than zero.",
      "type": "integer",
      "minimum": 0
    }
  }
}
```

### Post Body Validation

To validate a post body you need to define validation in inputModel field like this:

```yaml
init: index.init
getState: index.getState
methods:
  - method: sayHello
    inputModel: SayHelloInput
    tag: test
    handler: index.sayHello
```

### Query String Validation

To validate data sent in querystrings you need to define validation in queryStringInputModel field like this:

```yaml
init: index.init
getState: index.getState
methods:
  - method: sayHello
    queryStringInputModel: SayHelloInput
    tag: test
    handler: index.sayHello
```

### Failed Validations

Rio uses AJV for model validation. If a validation fails Rio returnes a response with status code: 400.

```json
{
  "code": "VALIDATION",
  "message": "Model validation has been failed.",
  "issues": [
    {
      "instancePath": "",
      "schemaPath": "#/required",
      "keyword": "required",
      "params": {
        "missingProperty": "firstName"
      },
      "message": "must have required property 'firstName'"
    }
  ]
}
```

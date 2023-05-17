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

---

## API Reference

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| accelerated   | boolean             | false               | Flag to decide whether to cache instances or not |
| authorizer    | string              | false               | Delegate method for authorization. (*filename.methodName*) |
| destroy       | string              | false               | Delegate method for approving instance deletion. (*filename.methodName*) |
| init          | string              | false               | Delegate method for constructor. (*filename.methodName*) |
| get           | string              | false               | Delegate method for getting existing instances. (*filename.methodName*) |
| getInstanceId | string              | false               | Delegate method for generating custom instanceId |
| getState      | string              | false               | Delegate method for returning states conditionally |
| dependencies  | string[]            | false               | Custom dependencies to use in deployment |
| destinations  | string[]            | false               | Custom destinations to use on state changes |
| logMasks      | Array<{ path: string }> | false           | Log masks. Please see [Logs](https://docs.retter.io/docs/projects/logs#log-masking) section for more details. |
| methods       | Method[]            | false               | Method definitions |
| description   | string              | false               | Description to put into the auto-generated documentation. |

## Handler Model

Most of Rio's delegate methods accept Handler model as well as they accept source code strings.

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| handler       | string              | true                | Handler method's path. (*filename.methodName*) |
| queryStringModel | string           | false               | Name of the validation model for query strings |
| inputModel    | string              | false               | Name of the validation model for input body |
| outputModel   | string              | false               | Name of the validation model for output body |
| errorModel    | string              | false               | Name of the validation model for error response |

## Method Model

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| method        | string              | true                | Name of the method |
| type          | READ, STATIC, WRITE, QUEUED_WRITE | false | Type of the method. Default is WRITE. |
| description   | string              | false               | Description to put into the auto-generated documentation. |
| queryStringModel | string           | false               | Name of the validation model for query strings |
| inputModel    | string              | false               | Name of the validation model for input body |
| outputModel   | string              | false               | Name of the validation model for output body |
| errorModel    | string              | false               | Name of the validation model for error response |
| handler       | string              | true                | Handler method's path. (*filename.methodName*) |
| schedule      | string              | false               | Schedule rule. It's only available for STATIC methods. |

---
title: Models
description: Models are backbone of Rio's validation mechanism.
---

Models are backbone of Rio's validation mechanism.
You can assign models to methods in order to validate before your method call.
Thus, your code will be more readable and less error prone. We strictly suggests schemas written with JSON Schema (Draft-07).

> Rio doesn't support references in models for now.

```json
models/Person.json

{
  "title": "Person",
  "type": "object",
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

You will be provided client-side models written in Kotlin, Swift and Typescript when you use models in your project.

> Rio doesn't support any kind of reference usages in JSON schema models.

## Required Variables in Models

While defining models, we specify the type of each variable and if a variable needs to be initialized.

If a variable is in the required array, this means that variable needs to be initialized in typescript code.

### User Model Example

```json
{
  "type": "object",
  "required": [ // these specified fields needs to be initialized
    "userFullName", 
    "email",
    "userId",
  ],
  "properties": {
    "userId": {
      "type": "string"
    },
    "userRank": {
      "type": "string"
    },
    "userFullName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "lastEnteredPlatform":{
      "enum": [
        "WEB",
        "IOS",
        "ANDROID"
      ]
    }
  }
}
```

For more advanced use cases please visit <https://json-schema.org>.

## Using A Model

In order to user models for validation, you need to import them in your class template file.
There are 4 types of models:

- **inputModel :** Request body input model
- **outputModel :** Response body output model
- **errorModel :** Error response body output model
- **queryStringModel :** Query string params input model

Usage:

```yaml
classes/User/template.yml

authorizer: index.authorizer
init:
  handler: index.init
  inputModel: UserProfileInputModel
  outputModel: ProfileModel
  errorModel: ErrorModel
  queryStringModel: ProfileQSModel
get:
  handler: index.getInstance
  inputModel: UserProfileGetModel
  outputModel: ProfileModel
  errorModel: ErrorModel
  queryStringModel: ProfileQSModel
getState: index.getState
getInstanceId: index.getInstanceId
methods:
  - method: updateProfileInput
    inputModel: StoreInfo
    outputModel: ProfileModel
    errorModel: ErrorModel
    queryStringModel: ProfileQSModel
    type: WRITE
    handler: index.update

  - method: getStoreInfo
    queryStringModel: UserProfileParamsModel
    outputModel: ProfileModel
    errorModel: ErrorModel
    queryStringModel: ProfileQSModel
    type: READ
    handler: index.profile
```

### Advanced Query String Model

Models for query string variables work a little different from other kind of models. This is important for two main reasons.

First of all, just like any other web framework or web application, their internal format must be `Record<string, string>`.
As a workaround, RIO looks for two special query string keys: data:string and __isbase64:boolean.
If you provide them RIO directly assumes that there is some information in base64 format in data key.
Thus, whatever you put into data overwrites the query string variables and your final data become `Record<string, any>` format.

Secondly, to be able to validate queryStringModel, RIO tries to convert each variable to expected type.
Only primitive types are supported for this feature.
After the conversion phase, RIO checks if the data is valid and sends the original data to the handler method.

```typescript
const model = {
    "type": "object",
    "properties": {
        "chars": { "type": "string" },
        "num1": { "type": "number" },
    },
    "required": [ "num1" ],
    "additionalProperties": false
}

const queryStringData = { chars: 'XyZ!', num1: '1', num2: '2' }
```

> Before validation, RIO converts each type according to the model.

## Adding Models to Methods

After we created the model (in this example CreateTodoInput and CreateTodoOutput), we should add the model to the method file which we are going to use.
Add the models to your methods in template.yml file.

```yaml
# template.yml
...rest
methods:
    - method: createTodo
      inputModel: CreateTodoInput     # CreateTodoInput model added
      outputModel: CreateTodoOutput   # CreateTodoOutput model added
      handler: index.createTodo
```

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

To validate data sent in querystrings you need to define validation in queryStringModel field like this:

```yaml
init: index.init
getState: index.getState
methods:
  - method: sayHello
    queryStringModel: SayHelloInput
    tag: test
    handler: index.sayHello
```

### Error Validations

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

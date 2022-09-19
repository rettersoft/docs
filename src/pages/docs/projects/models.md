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
getState: index.getState
getInstanceId: index.getInstanceId
methods:
  - method: updateProfileInput
    inputModel: StoreInfo
    outputModel: ProfileModel
    errorModel: ErrorModel
    type: WRITE
    handler: index.update

  - method: getStoreInfo
    queryStringModel: UserProfileParamsModel
    outputModel: ProfileModel
    errorModel: ErrorModel
    type: READ
    handler: index.profile
```

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

## Using the Created Models

After we add the models to our method, we can use autocomplete to use our models in our method.

```typescript
// index.ts
import { CreateTodoInput, CreateTodoOutput } from './rio'

export async function createTodo(data: Data<CreateTodoInput, CreateTodoOutput>): Promise<StepResponse> {
    const { task } = data.request.body // autocompleted

    data.response = {
        statusCode: 200,
        body: {
            task, // autocompleted
        }
    }

    return data
}
```

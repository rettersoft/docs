---
title: Email/Password Auth 
description: A sample User class for email/password based authentication
---

In this sample we will create a simple User class with several methods: login / register / updateProfile.

Login and register methods will be STATIC methods. updateProfile will be a WRITE method.

Let's start by creating a Rio project.

```typescript
rio init UserAuthSample
```

Rio cli creates a project with following structure:

![Images](/samples/email-password-auth/folder-1.png)

## User class

Let's rename `Test` class as `User` and add a new method `register` to it's template.

```yaml
init: index.init
getState: index.getState
methods:
  - method: register
    type: STATIC
    handler: index.register
```


I defined register as a STATIC method because when calling this I won't have an instance of User. Think of this as a User database and there are no users in it at first. Static methods can be called without instances. In this method we will create a new instance of User class.

## Input validation for register method

Now let's define a JSON schema model for our register method. Create a new file called `RegisterInput.json' in models folder.

```json
{
  "type": "object",
  "required": ["firstName", "lastName", "age", "password"],
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name."
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name."
    },
    "email": {
      "description": "Email of user",
      "type": "string"
    },
    "password": {
      "description": "Password of user.",
      "type": "string"
    }
  }
}
```

Now I can use this model in my class template file:

```yaml
init: index.init
getState: index.getState
methods:
  - method: register
    tag: test
    type: STATIC
    inputModel: RegisterInput
    handler: index.register
```

## Register method body

At this point I still don't have a function code declaration. Let's create a method in index.ts file:

```typescript
export async function register(data: Data): Promise<Data> {
    // This is a STATIC method. 
    data.response = {
        statusCode: 200,
        body: "OK",
    };
    return data;
}
```

## Importing models in index.ts

I can also create my input model as a file to my class and import it. To do so let's execute following command in terminal:

```
rio generate
```

This command generates rio.ts file and puts it into each class folder. At this point I can import my models in my index.ts file and use it in my register function:

```typescript
import { RegisterInput } from "./rio"

// RegisterInput is given as a param to generic class Data
export async function register(data: Data<RegisterInput>): Promise<Data> { 
    // This is a STATIC method.
    let firstName = data.request.body.firstName // Code editor shows attributes of RegisterInput

    data.response = {
        statusCode: 200,
        body: "OK",
    };
    return data;
}
```

## Checking already registered user

First check if this user already exists.

```typescript
export async function register(data: Data<RegisterInput>): Promise<Data> {
    // Lookup this user by their email address.
    let instance = await rdk.getInstance({
        classId: "User",
        lookupKey: {
            name: "email", value: data.request.body.email
        }
    })

    if(instance.statusCode === 200) {
        // User already exists, return error
        data.response = { statusCode: 400, body: { message: "User with this email already exists" } }
        return data
    }

    data.response = {
        statusCode: 200,
        body: "OK",
    };
    return data;
}
```

## Creating a new User instance

When creating a new instance `init` method is called. Inside init method you can set your initial state.

```typescript
export async function init(data: Data<RegisterInput>): Promise<Data> {
    data.state.private = data.request.body
    data.response = {
        statusCode: 200,
        body: { userId: data.context.instanceId }
    }
    await rdk.setLookUpKey({ 
        key: { name: "email", value: data.request.body.email }
    })
    return data
}
```

Note that init method creates a new instance and returns it's instanceId as a new user id.

Another thing to note here is that rdk is being used to set a new lookup key for this instance. lookup key with name "email" is set to users email.

### Validation of `init` method request body

I change my template file, alter my init definition:

```yaml
init:
  handler: index.init ## Handler for init
  inputModel: RegisterInput ## Input model for initializing a new instance
getState: index.getState
methods:
  - method: register
    type: STATIC
    inputModel: RegisterInput
    handler: index.register

```

## Login method

Now that we have registered our new user, let's login to the new account. 

### Login input model

Create a login request model called LoginInput.json in models folder:

```json
{
  "type": "object",
  "required": ["email", "password"],
  "properties": {
    "email": {
      "description": "Email of user",
      "type": "string"
    },
    "password": {
      "description": "Password of user.",
      "type": "string"
    }
  }
}
```

Don't forget to generate rio files:

```
rio generate
```

### Login method in template file

My new template looks like this:

```yaml
init:
  handler: index.init
  inputModel: RegisterInput
getState: index.getState
methods:
  - method: register
    type: STATIC
    inputModel: RegisterInput
    handler: index.register
  - method: login
    type: STATIC
    inputModel: LoginInput
    handler: index.login
```

Login is also a STATIC method. In this method I will create a custom authentication token and send it to caller.

```typescript
import { RegisterInput, LoginInput } from "./rio"

export async function login(data: Data<LoginInput>): Promise<Data> {
    return data
}
```

### validating the password in User instance

Login is a static method. From it we need to find the correct user instance and call validatePassword method. ValidatePassword method is going to be a READ method. So let's define it in our template file.

```yaml
init:
  handler: index.init
  inputModel: RegisterInput
getState: index.getState
methods:

  - method: register
    type: STATIC
    inputModel: RegisterInput
    handler: index.register

  - method: login
    type: STATIC
    inputModel: LoginInput
    handler: index.login

  - method: validatePassword
    type: READ
    inputModel: LoginInput
    handler: index.validatePassword
```

validatePassword method code:

```typescript
export async function validatePassword(data: Data<LoginInput>): Promise<Data> {

    if (data.request.body.password !== data.state.private.password) {
        data.response = { statusCode: 401, body: { message: "Invalid password" } }
        return data
    }

    data.response = {
        statusCode: 200,
        body: {
            userId: data.context.instanceId,
        }
    }

    return data
}
```

Now that we have a method to validate the password on our instance, we can call it from static login method:

```typescript
export async function login(data: Data<LoginInput>): Promise<Data> {

    let result = await rdk.methodCall({
        classId: "User",
        lookupKey: {
            name: "email", value: data.request.body.email
        },
        methodName: "validatePassword",
        body: data.request.body
    })

    if(result.statusCode !== 200) {
        data.response = { statusCode: 401, body: { message: "Invalid email or password" } }
        return data
    }

    let tokenResult = await rdk.generateCustomToken({
        identity: "user",
        userId: result.body.userId
    })

    if(tokenResult.success !== true) {
        data.response = { statusCode: 500, body: { message: "Error generating token" } }
        return data
    }

    data.response = {
        statusCode: 200,
        body: tokenResult.data
    }

    return data
}
```

## Update profile method

Now that this user has an instance, let's create a new method for updating user profile. Our template looks like this:

```yml
init:
  handler: index.init
  inputModel: RegisterInput
getState: index.getState
methods:

  - method: register
    type: STATIC
    inputModel: RegisterInput
    handler: index.register

  - method: login
    type: STATIC
    inputModel: LoginInput
    handler: index.login

  - method: validatePassword
    type: READ
    inputModel: LoginInput
    handler: index.validatePassword

  - method: updateProfile
    type: WRITE
    inputModel: RegisterInput
    handler: index.updateProfile

```

Please note that the type for this method is WRITE instead of READ. Because this method will update the state of this instance. Code looks like:

```typescript

export async function updateProfile(data: Data<RegisterInput>): Promise<Data> {

    data.state.private = data.request.body

    data.response = {
        statusCode: 200,
        body: "OK"
    }

    return data
}

```

## Authorization for methods

We have implemented 4 different methods. 2 STATIC, 1 READ, 1 WRITE. We have authenticated a user and created a custom token for her. However We still didn't authorize which methods can be called by whom. So to do that let's assign a authorizer in our class template.

```yml
init:
  handler: index.init
  inputModel: RegisterInput
getState: index.getState
authorizer: index.authorizer # Our authorizer
methods:

  - method: register
    type: STATIC
    inputModel: RegisterInput
    handler: index.register

  - method: login
    type: STATIC
    inputModel: LoginInput
    handler: index.login

  - method: validatePassword
    type: READ
    inputModel: LoginInput
    handler: index.validatePassword

  - method: updateProfile
    type: WRITE
    inputModel: RegisterInput
    handler: index.updateProfile
```

### Authorizer

Inside the authorizer method I handle each methodName in a switch:

```typescript
export async function authorizer(data: Data): Promise<Response> {

    let {
        identity,
        methodName,
        userId,
        instanceId
    } = data.context

    if (identity === "developer") {
        // developer is a special identity that can do anything
        return { statusCode: 200 };
    }

    if (identity === "User" && userId === "STATIC") {
        // A STATIC method is calling another method here.
        if (methodName === "validatePassword" || methodName === "INIT")
            return {
                statusCode: 200
            }
        else 
            return {
                statusCode: 403,
            }
    }

    switch (methodName) {
        case "register":
        case "login": {
            if (identity === "anonymous" || identity === "none") {
                return { statusCode: 200 };
            } else {
                return { statusCode: 403 };
            }
        }
        case "updateProfile": {
            if (identity === "User" && instanceId === userId) {
                return { statusCode: 200 };
            } else {
                return { statusCode: 403 };
            }
        }
    }

    return { statusCode: 401 };
}
```

## Improvements

This is a very simple example of a user authentication with a single class. You should try to improve this example by adding:

- storing an encrypted version of the password on user instance
- storing a counter on the user instance to store how many password attempts have been made in a period of time

Thanks for reading.


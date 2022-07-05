---
title: Classes
description: Classes are basic building blocks in Rio.
---

Classes are basic building blocks in Rio.
Each instance of a class represent a data state and set of methods associated with it.
You define classes in a file called template.yml.
Below is an sample template file defining a Rio class:

```typescript
init: index.init
getState: index.getState
methods:
  - method: sayHello
    type: WRITE
    handler: index.sayHello
```

In object oriented approach usually there is a constructor method and other methods.
Here we have a init method and list of other methods defined in **methods** section.

Constructor method is defined in **index.init**.
It's purpose is to initialize the state of this instance when it is first created.
An example init method can be something like:

```typescript
export async function init(data: Data): Promise<Data> {
    data.state.private = { foo: "bar" }
    return data
}
```

This class has one method called **sayHello** and it is defined in **index.sayHello** file.

```typescript
export async function sayHello(data: Data): Promise<Data> {
    data.state.private.foo = "Hello World" // Set some field on state
    return data
}
```

---

## An Example Class

Let's think of a simple **User** class with an updateProfile method:

```typescript
init: index.init
getState: index.getState
methods:
  - method: updateProfile
    type: WRITE
    handler: index.updateProfile
```

We can have a separate instance of this class for every single user in our system.
There could be millions of instances.
Each instance's method can be called and handed it's own state data as it's input.
**updateProfile** method can be like:

```typescript
export async function updateProfile(data: Data): Promise<Data> {
    data.state.private.firstName = data.request.body.firstName 
    return data
}
```

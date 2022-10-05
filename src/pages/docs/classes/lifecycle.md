---
title: Lifecycle of an object
description: Classes can be instantiated to instances of objects. This page explains how to init a new object and which delegate methods are called while doing so.
---



## Lifecycle delegate methods

Classes define delegate methods in template.yml file. When creating a new instance of a class these delegate methods are called:

1) getInstanceId
2) authorizer
3) init
4) destroy

![Images](/lifecycle.png)

### getInstanceId

(OPTIONAL) if defined, getInstanceId is called first. It should return a string which will be the id of the new instance. If not defined a random string is generated.

### authorizer

(OPTIONAL) It should return a status code. If 200 a new instance can be created. Authorizer can be cached if correct headers are returned. At the cache period it is not called again. 

When creating a new instance, authorizer is called with data.context.methodName = 'INIT'.
When getting an instance, authorizer is called with data.context.methodName = 'GET'.

### init

It should initialize and make some configurations for the new instance. This method is called only once for the same instanceId. If you return same ID from getInstanceId then this method is not called the second time.

### destroy

Upon deletion of an instance "destroy" delegate method is called. You can do final cleanup here. This method can prevent instance deletion by returning a status code other than 200.
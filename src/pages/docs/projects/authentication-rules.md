---
title: Authentication Rules
description: Authentication Rules provide a way to extend your authentication system.
---

Authentication Rules are a feature in our website's authentication system that allow you to define custom rules to determine the identity and authorization of users. These rules are evaluated during the authentication process and can be used to set the identity, claims, and userId for a given request. By leveraging input data such as context, headers, and query string parameters, you can create flexible and dynamic authentication rules tailored to your specific requirements.

## Rule Structure

An authentication rule consists of two main components: a filter and an output.

### Filter

The filter defines the conditions that need to be met for the rule to be applied. It allows you to specify one or more properties from the input data and apply comparison operators to them. For example, you can evaluate the value of a context property, such as the source IP address, against a specific value using the "EQ" (equals) operator.

### Output

The output specifies the values to be set if the filter conditions are met. There are three available output properties:

- **Identity**: The identity property represents the authenticated user's identity. It can be set to a specific value, such as "admin" or "user123", based on the rule's logic.
- **Claims**: Claims provide additional information about the authenticated user. They can be used to store relevant user data or permissions. The claims property can be set to a JSON object containing key-value pairs.
- **UserId**: The userId property represents a unique identifier for the authenticated user. It is commonly used for linking user-specific data or performing further authorization checks.

## Usage Example 1

Here's an example of an authentication rule that sets the identity to "admin" when the source IP address is equal to "192.XXX.XXX.XXX":

```json
{
    "filter": {
        "$.context.sourceIP": {
            "EQ": "192.XXX.XXX.XXX" 
        },
    },
    "output": {
        "identity": "admin"
    }
}
```

In this example, the filter checks the value of the `sourceIP` property in the `context` object. If it matches the specified IP address, the output sets the identity to "admin". You can customize this rule by modifying the filter conditions, such as using different comparison operators or evaluating other properties in the input data.

## Usage Example 2

Here's an example of an authentication rule that sets the identity to "admin" when the API key in the header is equal to "apikey123":

```json
{
    "filter": {
        "$.header.APIKEY": {
            "EQ": "apikey123" 
        },
    },
    "output": {
        "identity": "admin",
    }
}
```

In this example, the filter checks the value of the `APIKEY` property in the `header` object. If it matches the specified API key, the output sets the identity to "admin". You can customize this rule by modifying the filter conditions, such as using different comparison operators or evaluating other properties in the input data.

## Usage Example 3

Here's an example of an authentication rule that sets the identity to "admin" when the API key in the query string parameters is equal to "apikey123":


```json
{
    "filter": {
        "$.queryStringParams.APIKEY": {
            "EQ": "apikey123" 
        },
    },
    "output": {
        "identity": "admin"
    }
}
```

In this example, the filter checks the value of the `APIKEY` property in the `queryStringParams` object. If it matches the specified API key, the output sets the identity to "admin". You can customize this rule by modifying the filter conditions, such as using different comparison operators or evaluating other properties in the input data.


## Usage Example 4

Here's an example of an authentication rule that sets the identity to "admin" and the userId to "SAP" when both the API key in the header and the API key in the query string parameters are equal to "apikey123":


```json
{
    "filter": {
        "$.header.APIKEY": {
            "EQ": "apikey123" 
        },
        "$.queryStringParams.APIKEY": {
            "EQ": "apikey123" 
        },
    },
    "output": {
        "identity": "admin",
        "userId": "SAP"
    }
}
```

In this example, the filter checks the value of the `APIKEY` property in both the `header` and `queryStringParams` objects. If both API keys match the specified value, the output sets the identity to "admin" and the userId to "SAP". You can customize this rule by modifying the filter conditions, such as using different comparison operators or evaluating other properties in the input data.

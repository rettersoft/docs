---
title: Environments
description: You can define environment variables as a JSON document.
---

You can define environment variables as a JSON document.
They will be available in your methods through your programming language's default environment support.

For example, in Node.js, you can access them via *process.env*.

---

## Secrets

There are three secret keys in Rio: access, refresh and custom secret keys.
Rio core uses these secret keys to generate access, refresh and custom tokens.
If you regenerate any of these keys, existing tokens will become invalid immediately.

## Core Environment Variables

| Parameter     | Type     | Required   | Default    | Description         |
| ------------- | -------- | ---------- | ---------- | ------------------- |
| RIO_API_TYPE | Enum('REST', 'HTTP') | false | HTTP | Sets the type of the API on AWS API Gateway |
| RIO_SUB_DOMAIN | String | true | - | Sets the API domain (api.{RIO_SUB_DOMAIN}.retter.io) |
| RIO_FIREBASE_CONFIG | String | true | - | Stringified Firebase configuration |
| RIO_REDIS_CONFIG | String | true | - | Stringified Redis configuration |
| RIO_STATIC_IP | Enum('on', 'off') | false | off | Flag for static IP support |
| ROOT_PROJECT_API_KEY | String | true | - | API Key for interacting with Root project API |
| RIO_TOKEN_VERIFY_MAX_AGE | String | false | 0 | Stringified integer in seconds to set the token verification age limit |
| RIO_MAX_REFRESH_TOKEN_COUNT | String | false | 3 | Stringified integer to limit refresh token count |
| RIO_INSTANCE_VERSION_COUNT | String | false | 0 | Stringified integer to limit max number of versions of each instance |
| RIO_AUTH_LOGS | Enum('on', 'off') | false | off | Flag to enable authentication logs |
| RIO_LOG_RETENTION_PERIOD | String | false | 180 | Stringified integer in days to set the max days to keep the logs |
| RIO_ACCESS_TOKEN_EXPIRE | String | false | 300 | Stringified integer in seconds to set the max seconds to keep an access token as valid |
| RIO_REFRESH_TOKEN_EXPIRE | String | false | 1296000 | Stringified integer in seconds to set the max seconds to keep a refresh token as valid |
| RIO_TASKS_CONCURRENCY_LIMIT | String | false | 20 | Stringified integer to limit the concurrency of task processing |
| RIO_FIREBASE_PROJECT_ID, | String | true | - | Firebase project id |
| RIO_FIREBASE_IOS_APP_ID, | String | true | - | iOS App ID from Firebase project |
| RIO_FIREBASE_ANDROID_APP_ID, | String | true | - | Android App ID from Firebase project |
| RIO_FIREBASE_WEB_APP_ID, | String | true | - | Web App ID from Firebase project |
| RIO_FIREBASE_GCM_SENDER_ID, | String | true | - | GCM sender id from Firebase project |
| RIO_FIREBASE_API_KEY, | String | true | - | Firebase api key |
| RIO_CUSTOM_US_CERTIFICATE_ARN, | String | false | - | SSL certificate in us-east-1 for the custom api domain |
| RIO_CUSTOM_LOCAL_CERTIFICATE_ARN, | String | false | - | SSL certificate in account region for the custom api domain |
| RIO_CUSTOM_API_DOMAIN, | String | false | - | Custom api domain |

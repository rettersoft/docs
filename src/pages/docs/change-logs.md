---
title: Change Logs
description: A summary explanation about content of each version
---

## v2.0.3

- Added support for environment variables in Destinations and Logs.
- Added support for VTL (Velocity Template Language) in Destinations and Logs.
- The HttpRequest operation now supports static methods as callbacks.
- Restricted WRITE method calls to the same instance with RDK.

## v2.0.2

- Introduced log masks for enhanced logging control.
- Improved error handling for better reliability.
- Removed the 4KB limit on environment variables.
- Disabled traffic to deactive projects.

## v2.0.1

- Introduced the new /TOKEN API for enhanced authentication.
- Optimized model usage with zero runtime latency.
- Introduced Project deployment instead of Class deployment.
- Enhanced security at the root project.
- Deprecated sorted sets.
- Improved cost efficiency measures.

## v2.0.0

- Removed `data.context.action` from the `data` object.
- Moved `data.context.pathParameters` to `data.request.pathParameters`.
- Removed `data.schedule` and `data.events` from the `data` object.
- Removed `InitResponse` and `StepResponse`. All delegates should return the `Data` type.
- Deprecated `architectures` and `tags` fields in the class template.
- Removed support for x86 architectures.
- Combined separate `package.json` files in the class folders into a single file located at the root path of the project. Class based `package.json` files are now redundant.
- If the `aws-sdk` npm package is used in a project, it must now be added to the `package.json` file.
- Replaced `none` identity with `anonymous_user` for consistency.
- New versions of `@retter/rdk` and `@retter/rio-cli` should be used.
- Cache-Control header in the `authorizer` is now redundant.

## v1.2.12

This version was released on November 10, 2022.

- Max 500 KB allowed for internal logs and max. 5 KB allowed for gray log adapter.
- AUTH structure moved to core from root project.
- Database operations' memory feature's cache writes optimized.
- If there is getInstanceId delegate method, instanceId added to authorizer context in INIT flow.
- Missing logs during shutdown fixed.
- Storage and write metrics added.

## v1.2.9

This version was released on October 27, 2022.

- Scan job status changes fixed and methods changed to QUEUED_WRITE.
- Project user's authentication moved from root project to core api.
- Prefix added to instance id list in RDK.
- listInstanceIds method's response model fixed in RDK.

> Some features require RDK v1.3.9 to be able to work properly.

## v1.2.6

This version was released on October 12, 2022.

- Authentication rules added.
- Custom domain support added for RIO API endpoint.
- Support for accessing lookup keys from multiple classes added.
- Some special characters (!,#,%) are not allowed in lookup keys anymore.
- Destination messages singularized against deduplication protection.

## v1.2.5

This version was released on October 3, 2022.

- Subscribing events from multiple classes support added.
- Validation errors improved in QUEUED_WRITE method response.
- **BUG FIX:** Session name length fixed in assumed roles for operations.
- **BUG FIX:** Overwriting private state before pushing to destinations fixed.

## v1.2.4

This version was released on September 29, 2022.

- VTL support added for destinations.
- Bulk import operation added via RDK.
- Various metadata (modifier details) added to instance documents.
- Custom JSON and YAML files accepted in source code.
- Remote deployment automation simplified by removing AWS SES dependency.
- Invitation / OTP conflict fixed.
- Garbage collector improved.
- **BUG FIX:** Instance flag removed from cache when a class deleted

> Some features require RDK v1.3.8 to be able to work properly.

## v1.2.3

This version was released on September 15, 2022.

- Obsolete layer versions will be removed during deployments.
- Delete instance operation added.
- If requests and/or responses are larger then 10 KB, they replaced with a simple warning text to prevent logging and 3rd party integration failures.
- Garbage collector improved.
- REST support added for API Gateway. It can be selected via an environment variable.
- Filters support added to destinations.
- Some special characters (!,#,%) are not allowed in instance id anymore.

> Some features require RDK v1.3.7 to be able to work properly.

## v1.2.2

This version was released on September 8, 2022.

- **BUG FIX:** Pushing empty states from static method calls to destinations fixed.

## v1.2.1

This version was released on September 7, 2022.

- Destination handlers' timeouts decreased to 5 seconds.
- Tasks started to accept retryConfig.
- Scan jobs shows up the reason if they fail.
- Throws a specific error with detailed explanation (CouldNotParseData) if response data's model is invalid.
- Default tags (projectid, classid) added to instance objects.
- Remove protection added for classes.
- Event subscription filters are not required anymore.
- Task manager pushes QUEUED_WRITE methods into their queues after provided amount of seconds instead of pushing them immediately.

> Some features require RDK v1.3.6 to be able to work properly.

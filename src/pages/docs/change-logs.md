---
title: Change Logs
description: Summary of updates and improvements in each version  
---

## v2.1.12 

- Added full feature Sequelize support with Static IP to RDK
- Added custom cidr support vpc

## v2.1.11  

- Added core ASYNC support for CORS handling  
- Improved method-listing page in the console  

## v2.1.10  

- Removed core S3 Object Tagging functionality  

## v2.1.9  

- Removed unsupported log operations in the console  
- Fixed root-level logging for status codes  

## v2.1.8  

- Applied security updates to CORE, ROOT, RDK, CLI, and JS-SDK  

## v2.1.7  

- Added a feature that blocks custom tokens after they are used

## v2.1.6

- Base64 response support added to static ip operation request

## v2.1.5

- Customizable request headers support added for CDN
- Expires At added to token responses
- Access token termination support added for each token refresh

## v2.1.4

- Routerless projects improved
- Axios config override support added to static ip operation request

## v2.1.3

- Custom token expire time became configurable
- CORS configuration support added to class template model
- RDK v2.0.13 released
- JS/TS SDK v0.7.2 released

## v2.1.1

- started using RS256 encryption algorithm for session tokens
- SecurityHeadersPolicy added to Cloudfront policies (optionally)

## v2.1.0

- Node.js version upgraded to 20.x

## v2.0.35

- Routerless 👑 project support added.
- Method call retry configuration fixed.
- TTL support added to increment database operation on RDK (v2.0.12 released)

## v2.0.34

- Asynchronous READ and STATIC method types added to support long running read only methods.
- Suffix added to requestId for queued write methods for resolving the conflict between log records.

## v2.0.33

- Accelerated state management fixed.

> **You must migrate to the new Rio Administrator Console to manage deployments from now on.**

## v2.0.32

- Custom prefix support added to project id on rio api.

## v2.0.31

- All related event rules deleted when a class deleted.
- Token expiration days became manageable via environment variables.
- Validation support added to models during deployment.

## v2.0.28

- Garbage collector added to the deployment farm for preventing the nodes from filling up all the storage.
- Deploying a single class deprecated.
- Captcha support added to developer console.

## v2.0.27

- Deployment farm added for faster deployments with caching supports for NPM and Docker.

## v2.0.26

- Infrequent access log group support added.
- Log retention enabled for all log groups.

## v2.0.25

- Lock ownership improved for queued write methods to explain the identity of current lock owner.
- AWS SDK version upgraded.

## v2.0.24

- Caching enabled for OPTIONS requests.

## v2.0.23

- Invitation to developer console fixed.
- AWS SDK versions upgraded.
- Logs moved to Firehose.

## v2.0.21

- Signed Url support added to File Storage operations.
- Size limit applied to payload for the log adapters: 1 MB.

## v2.0.20

- On purpose delay support added for initiating a new instance from a class.

## v2.0.18

- Lock mechanism improved for stable concurrency management.
- *x-srv-time* header added to all responses.
- An environment variable added to support logs on authentication api.
- An environment variable added to manage max age for token verification.

## v2.0.16

- Old Memory operations deprecated. Instead, use global memory or database operations with memory:true flag.
- Concurrency breach error fixed.
- Quota and usage presentations improved on developer console.

> **You must run OldMemoryToDatabaseMigration before switching to v2.0.7.**

## v2.0.14

- Batch processing support added to queue handlers.
- Obfuscation support added to deployment.
- Typescript support added to dependencies.

## v2.0.13

- Quota management and tracking support added.
- Removing a database partition operation added.
- Metadata support added to file storage operations.
- Logs simplified for core implementations.

## v2.0.11

- Versioning support added to the states.

## v2.0.10

- Migration tool added for version update: v1 -> v2.
- Dark mode support added for developer console.
- State update via developer console support added.
- Kinesis support added to log adapters.

## v2.0.8

- Default project template updated.
- Validation support added to the environment variables of the projects.
- Headers support added to filters on authentication rules.

## v2.0.7

- Support added for long running queued write methods.
- Authentication rules support added.
- Validation applied to all class templates during project deployment.

> **You must run LongRunningUpdater before switching to v2.0.7.**

## v2.0.6

- console logs separated by delegate methods.
- various improvements on console.

## v2.0.5

- Increment database operation added.
- Deleting itself prevented from a write method.
- ECR clean up added.
- Keyboard shortcuts added for saving and deploying on developer console.
- Current Rio version added to developer console.

## v2.0.4

- classId scope added to lookup keys.
- RDK response types improved with operation-specific models.
- Lookup key support added to task scheduling.
- Queued Write method response status change to 570 from 575.

## v2.0.3

- Prevented direct RDK write calls to the same instance.
- Static method support added to RDK.httpRequest callback handlers.
- Environment support added to destination and log configurations.

## v2.0.2

- CDK version upgraded in core stack.
- Error management improved to provide better explanation on errors.
- Masking applied to log records by a configuration template.

## v2.0.1

- **Sorted Set** operations deprecated. Use *Database* operations instead.
- Security improved on underlying root project.
- Token API separated from core.
- Model deployment improved for faster access in runtime.

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

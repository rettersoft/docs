---
title: Change Logs
description: A summary explanation about content of each version
---

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

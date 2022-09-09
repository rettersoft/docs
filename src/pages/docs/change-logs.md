---
title: Change Logs
description: A summary explanation about content of each version
---

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
- iam:CreateServiceLinkedRole permission excluded.
- Remove protection added for classes.
- Event subscription filters are not required anymore.
- Task manager pushes QUEUED_WRITE methods into their queues after provided amount of seconds instead of pushing them immediately.

> Some features require RDK v1.3.6 to be able to work properly.

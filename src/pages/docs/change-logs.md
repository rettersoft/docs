---
title: Change Logs
description: A summary explanation about content of each version
---

## v1.2.1

This version was released on September 7, 2022.

- Destination handlers' timeouts decreased to 5 seconds.
- Tasks started to accept retryConfig.
- Scan jobs shows up the reason if they fail.
- Throws a specific error with detailed explanation (CouldNotParseData) if response data's model is invalid.
- Default tags (projectid, classid) added to instance objects.
- iam:CreateServiceLinkedRole permission excluded.
- Remove protection added for classes.

> Some features require RDK v1.3.6 to be able to work properly.

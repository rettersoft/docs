---
title: Environments
description: You can define environment variables as a JSON document here.
---

You can define environment variables as a JSON document here.
They will be available in your methods through your programming language's default environment support.

For example, in nodejs, you can access them via *process.env*

---

## Secrets

There are three secret keys in Rio: access, refresh and custom secret keys.
Rio core uses these secret keys to generate access, refresh and custom tokens.
If you regenerate any of these keys, existing tokens will become invalid immediately.

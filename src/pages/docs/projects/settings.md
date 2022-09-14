---
title: Settings
description: All configuration available in project scope can be found under Settings tab.
---

All configuration available in project scope can be found under Settings tab.
You can change project's name in **Config** tab.
Additionally, you can deactive project by clicking the red button in **Danger Zone**.

---

## Secrets

There are three secret keys in Rio: access, refresh and custom secret keys.
Rio core uses these secret keys to generate access, refresh and custom tokens.
If you regenerate any of these keys, existing tokens will become invalid immediately.

## Environments

You can define environment variables as a JSON document here.
They will be available in your methods through your programming language's default environment support.
For example, in nodejs, you can access them via *process.env*

## Log Adapters

In Rio, you can access request and response logs through developer console in most cases, projects might require more sophisticated query options.
Rio has graylog support as a log adapter to send all logs to your graylog server.
All you have to do is that you add a log adapter by providing **endpoint**, **username** and **password**.



---
title: Scan Jobs
description: You can scan and send instances to your destinations any time you want.
---

You can scan and send instances to your destinations any time you want.
All you have to do is to add a new scan job by selecting the class and destinations that you want to send instances to.
Once the job started, it will be updated in realtime as long as it runs in background.

---

## API Reference

### Add Scan Job Input

| Parameter     | Type                | Required            | Description         |
| ------------- | ------------------- | ------------------- | ------------------- |
| classId       | string              | true                | Class ID to scan the instances |
| destinations  | string[]            | true                | Destinations to send the instances |

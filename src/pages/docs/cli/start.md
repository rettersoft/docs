---
title: Getting Started
description: Rio CLI is a nodejs program to help you create projects and deploy them.
---

Rio CLI is a nodejs program to help you create projects and deploy them.
You can install it by executing command below:

> npm install -g @retter/rio-cli

If you get "The operation was rejected by your operating system." error in this setup process, you can add sudo before each command.

---

## Setting Up Your Profile With CLI

After CLI setup is complete, we can set your profile up. You can visit "https://c.retter.io" and login.
Than open settings *Rbs Console* > *Right Top Dropdown Menu* > *Settings*.
You will see your *SECRET_ID* and *SECRET_KEY* in here.

Decide your *PROFILE_NAME* and run the following command with your own *PROFILE_NAME*, *SECRET_ID* and *SECRET_KEY*.

```shell
rio set-profile --profile-name <PROFILE_NAME> --secret-id <SECRET> --secret-key <SECRETKEY> --endpoint <DOMAIN>
```

### Arguments

* `--profile-name`: Name of this admin profile
* `--secret-id`: Secrect id fetched from console
* `--secret-key`: Secrect key fetched from console
* `--endpoint`: URL to target rio console

When your profile is initialized, you can run the following command.

> rio list-profiles

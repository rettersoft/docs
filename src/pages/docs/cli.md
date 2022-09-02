---
title: CLI
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

> rio set-profile --profile-name PROFILE_NAME --secret-id SECRET_ID --secret-key SECRET_KEY

When your profile is initialized, you can run the following command.

> rio list-profiles

## Project Initialization

If we had successfully logged in, we could initialize our project with decided PROJECT_ALIAS.

> rio init PROJECT_ALIAS

After this command you will have a working project in your system.
You can check it by revisiting Projects page at <https://c.retter.io>.
There you will see a project with your defined *PROJECT_ALIAS*.

## Generating Rio Helpers

Create the rio file for each of classes

> rio generate

Example:

```bash
rio init TEST
cd TEST
rio generate # optional
rio pre-deploy # optional
rio deploy
```

## Project Pre-Deployment

This step does not make any changes. It only detects changes.

> rio pre-deploy

## Project Deployment

> rio deploy

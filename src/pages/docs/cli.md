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

```shell
rio set-profile --profile-name <PROFILE_NAME> --secret-id <SECRET> --secret-key <SECRETKEY> --endpoint <DOMAIN>
```

When your profile is initialized, you can run the following command.

> rio list-profiles

## Project Initialization

If we had successfully setup our profile in, we could initialize our project with decided PROJECT_ALIAS.

> rio init PROJECT_ALIAS

After this command you will have a working project in your system.
You can check it by revisiting Projects page at <https://c.retter.io>.
There you will see a project with your defined *PROJECT_ALIAS*.

## Commands

### `rio --`
* `--help`: Show help.
* `--version`: Show version number.

### `rio set-profile [sp]`

Upsert admin profile in local storage.

```shell
rio set-profile --profile-name <PROFILE_NAME> --secret-id <SECRET> --secret-key <SECRETKEY> --endpoint <DOMAIN>
```

#### Arguments

* `--profile-name`: Name of this admin profile
* `--secret-id`: Secrect id fetched from console
* `--secret-key`: Secrect key fetched from console
* `--endpoint`: URL to target rio console

### `rio deploy [d]`

Save local changes to the rio cloud and deploy the project.

#### Arguments

* `--profile [p]`: Profile name for deployment (type: string)
* `--project-id [pid]`: Project id for deployment (type: string).
* `--classes [c]`: Filtered classes for deployment (type: array) (optional).
* `--ignore-approval [i]`: Ignore deployment manual approval (optional).
* `--force [f]`: Send deployment requests with force parameter to RIO (optional).
* `--skip-diff-check [s]`: Skip and don't perform difference checks while deploying (optional).

```shell
rio deploy --profile admin --project-id 77bb3924k --classes Order Product --force --skip-diff-check --ignore-approval
rio d --p admin --pid 77bb3924k --c Order Product --f --s --i
```

### `rio save [s]`

Save local changes to the rio cloud without deploying them

#### Arguments
* `--profile [p]`: Profile name for deployment (type: string)
* `--project-id [pid]`: Project id for deployment (type: string).
* `--classes [c]`: Filtered classes for deployment (type: array)(optional).
* `--ignore-approval [i]`: Ignore deployment manual approval (optional).
* `--skip-diff-check [s]`: Skip and don't perform difference checks while deploying (optional).

```shell
rio save --profile admin --project-id 77bb3924k --classes Order Product --skip-diff-check --ignore-approval
rio s --p admin --pid 77bb3924k --c Order Product --s --i
```

### `rio get-settings [gs]`
Fetches project data and generates a project configuration file on your local disk
#### Arguments
* `--profile [p]`: Profile name for target rio environment (type: string)
* `--project-id [pid]`: Project id for target project (type: string).

```shell
rio get-settings --profile <profile_name> --project-id <project_id>
rio gs --p <profile_name> --pid <project_id>
```
### `rio set-settings [ss]`

Synchronize your local project configuration with the remote project, enabling you to effortlessly create or update log adapters, state stream targets, and more.

#### Arguments
* `--profile [p]`: Profile name for target rio environment (type: string)
* `--project-id [pid]`: Project id for target project (type: string).

```shell
rio set-settings --profile <profile_name> --project-id <project_id>
rio ss --p <profile_name> --pid <project_id>
```

## Generating Rio Helpers

Create the rio file for each of classes

> rio generate

Example:

```bash
rio init TEST
cd TEST
rio generate
```
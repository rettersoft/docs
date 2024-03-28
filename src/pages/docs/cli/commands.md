---
title: Commands
description: You can run "rio -h" to see the list of all available commands.
---

You can run "rio -h" to see the list of all available commands.

* `--help`: Show help.
* `--version`: Show version number.

---

## Project Initialization

If we had successfully setup our profile in, we could initialize our project with decided PROJECT_ALIAS.

> rio init PROJECT_ALIAS

After this command you will have a working project in your system.
You can check it by revisiting Projects page at <https://c.retter.io>.
There you will see a project with your defined *PROJECT_ALIAS*.

### Saving Your Changes

> rio save
> rio s

Save local changes to the rio cloud without deploying them

### Arguments for Saving Your Changes

* `--profile [p]`: Profile name for deployment (type: string)
* `--project-id [pid]`: Project id for deployment (type: string).
* `--classes [c]`: Filtered classes for deployment (type: array)(optional).
* `--ignore-approval [i]`: Ignore deployment manual approval (optional).
* `--skip-diff-check [s]`: Skip and don't perform difference checks while deploying (optional).

```shell
rio save --profile admin --project-id 77bb3924k --classes Order Product --skip-diff-check --ignore-approval
rio s --p admin --pid 77bb3924k --c Order Product --s --i
```

## Deploying Your Project

Save local changes to the rio cloud and deploy the project.

> rio deploy
> rio d

### Arguments for Deploying Your Project

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

### Retrieving Settings

> rio get-settings
> rio gs

Fetches project data and generates a project configuration file on your local disk

#### Arguments for Retrieving Settings

* `--profile [p]`: Profile name for target rio environment (type: string)
* `--project-id [pid]`: Project id for target project (type: string).

```shell
rio get-settings --profile <profile_name> --project-id <project_id>
rio gs --p <profile_name> --pid <project_id>
```

### Updating Settings

> rio set-settings
> rio ss

Synchronize your local project configuration with the remote project, enabling you to effortlessly create or update log adapters, state stream targets, and more.

#### Arguments for Updating Settings

* `--profile [p]`: Profile name for target rio environment (type: string)
* `--project-id [pid]`: Project id for target project (type: string).

```shell
rio set-settings --profile <profile_name> --project-id <project_id>
rio ss --p <profile_name> --pid <project_id>
```

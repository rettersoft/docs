---
title: Dependencies
description: Dependencies provide a way to extend your default dependencies with your own custom codes.
---

Beside frameworks' dependencies (*npm*, *pypi*), there are also dependencies that are not part of the framework itself.
At this point, Rio supports custom build dependencies.
You can add your custom build dependencies to your class's template file in order to use across classes.

> For now, we only support custom build dependencies for NodeJS (Javascript) projects.

There are two types of dependencies:

- Local Dependencies (Bundled with your source code)
- Cloud Dependencies (Generated via RDK)

---

## Local

There are some common case when we need to use reusable components from our source code like error messages, utility functions or data.
Local dependencies are the solution here to those problems in seconds nanoseconds.
Dependencies will be mounted into your class even before state and help you get rid of some boilerplate code into them.

```typescript
// dependencies/mylib/index.js

function multiply(a, b) {
  return a * b
}

module.exports = {
  multiply
}
```

In order to use dependency, you need to import it in your class' template file.

```yaml
# classes/User/template.yml

authorizer: index.authorizer
init: index.init
getState: index.getState
getInstanceId: index.getInstanceId
dependencies:
  - mylib
methods:
  - method: login
    handler: index.login
```

## Cloud

In some cases, you may need to create a dependency on runtime via RDK (Retter Development Kit).
You can add dependency source code into a zip file and create dependency.

> Classes that use cloud dependencies need to be re-deployed to the cloud.

```typescript
classes/User/profile.ts

import RDK, {Data,StepResponse} from "@retter/rdk";
import AdmZip from "adm-zip";

const rdk = new RDK();

export async function generateCloudDependency(data: Data): Promise<StepResponse> {
    const customData = {
        userName: 'John Doe',
        isAwesome: true,
        reusable: true
    };

    const zip = new AdmZip();
    zip.addFile('nodejs/node_modules/myCloudLib/data.json', Buffer.from(JSON.stringify(customData)))

    await rdk.upsertDependency({
        dependencyName: 'myCloudLib',
        zipFile: zip.toBuffer(),
    })

    return data
}
```

You can use multi-dependency in your class

```yaml
classes/Order/template.yml

authorizer: index.authorizer
init: index.init
getState: index.getState
getInstanceId: index.getInstanceId
dependencies:
  - myCloudLib
  - otherLocalLib
methods:
  - method: deliver
    handler: operations.deliver
```

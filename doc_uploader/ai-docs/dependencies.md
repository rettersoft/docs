# Dependencies
Used for code or data sharing between multiple classes. This data or code can be dynamically generated or some static data. It only supports typescript for now.
## Local Deps
```typescript
// dependencies/mylib/index.js
function multiply(a, b) { return a * b }
module.exports = { multiply }
```
## Cloud Deps
Dynamic code sharing between classes. 
```typescript
import RDK, {Data} from "@retter/rdk";
import zip from "adm-zip";
const rdk = new RDK();
export async function generateCloudDependency(data: Data): Promise<Data> {
    const customData = { foo: 'bar' }
    const zip = new zip();
    zip.addFile('nodejs/node_modules/cloudLib/data.json', Buffer.from(JSON.stringify(customData)))
    await rdk.upsertDependency({ dependencyName: 'cloudLib', zipFile: zip.toBuffer() })
    // Now deploy the project to receive the dependency
    await rdk.deployProject()
    return data
}
```
Usage:
```yaml
# classes/Order/template.yml
dependencies:
- mylib
- cloudLib
```
```typescript
// classes/Order/index.ts
import { multiply } from 'mylib'
import data from 'cloudLib/data.json'
```
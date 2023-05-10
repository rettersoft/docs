# Below there is a sample template.yml and implementation where we use query strings.
When calling a method url:
For primitive types:
?foo=bar&a=5&b=6
For complex json:
?data={SOME_JSON_BASE64}&__isbase64=true
QueryString's are validated with JSONSchema. However Rio passes always string values to methods. You need to cast them to your desired type.
template.yml:
```yaml
init: 
    handler: index.init
methods:
  - method: helloWorld
    queryStringModel: HelloInput # defined in models folder as JSONSchema
    type: READ
    handler: index.helloWorld
```
## Use querystrings in your methods
```typescript
import { HelloInput } from './rio'
export async function helloWorld(data: Data): Promise<Data> {
    let params = data.request.queryStringParams as HelloInput
    data.response = { statusCode: 200, body: { message: `Hello ${params.name}!` } }
    return data
}
```
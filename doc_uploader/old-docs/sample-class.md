# A sample 'User' class with some features

## template.yml:
```yaml
# Delegate methods in order of execution
getInstanceId: index.getInstanceId
authorizer: index.authorizer
init: # called on new instance creation
    handler: index.init
    # inputModel:
    # outputModel:
    # errorModel:
    # queryStringModel:
# get: # called on getting existing instance
    # handler: index._get
    # inputModel:
    # outputModel:
    # errorModel:
    # queryStringModel:
methods:
  - method: update
    inputModel: UpdateProfileInput # Request body
    outputModel: UserProfile # Response body
    # errorModel: Model # Error response body
    # queryStringModel: Model
    type: WRITE # WRITE method runs immediately. It might result in statusCode 570 if there is another WRITE or QUEUED_WRITE method running on this instance.
    handler: index.update
  - method: sendEmailEverySunday
    type: QUEUED_WRITE # QUEUED_WRITE method always queues messages and runs them in order. Never errors out.
    handler: index.sendEmailEverySunday
    schedule: cron(0 0 * * SUN) # Every Sunday at 00:00
  - method: getProfile
    type: READ # READ method runs immediately. It never errors out. It cannot update state of the instance.
    outputModel: UserProfile
    handler: index.getProfile
```
## index.ts:
```typescript
import { Data, Response } from '@retter/rio'
// UpdateProfileInput and UserProfile are JSONSchema files defined in models folder.
// `rio g` cli command generates rio.ts in every class folder.
import { UpdateProfileInput, UserProfile } from './rio'
export async function getInstanceId(data: Data): Promise<string> {
    return data.request.body.email
}
// Can use these in authorizer
// data.context.identity: (caller class name) | (an arbitrary identity string in generated token)
// data.context.userId: User id of the caller
// data.context.methodName: Method that is being called
// data.context.sourceIp
// data.context.instanceId
export async function authorizer(data: Data): Promise<Response> { 
    if(data.context.methodName === 'INIT' && data.context.identity === 'EmailAuth') return { statusCode: 200 } // Only allow EmailAuth class to create user instances
    if(data.context.instanceId === data.context.userId) return { statusCode: 200 } // Allow user to access only his own instance
    return { statusCode: 401 } 
}
export async function init(data: Data): Promise<Data> {
    // Init instance state
    const email = data.request.body.email
    data.state.private = { email }
    // Optionally
    await rdk.setLookUpKey({ key: { name: "email", value: email } })
    return data
}
// when getting an existing instance - you can implement to return custom data
// export async function _get(data: Data): Promise<Data> {
//     return data
// }
// A method to update profile
export async function update(data: Data<UpdateProfileInput, UserProfile>): Promise<Data> {
    const { firstName, lastName } = data.request.body
    data.state.private.firstName = firstName
    data.state.private.lastName = lastName
    data.response = {
        statusCode: 200, body: {
            firstName,
            lastName,
            email: data.state.private.email
        }
    }
    return data
}
export async function sendEmailEverySunday(data: Data): Promise<Data> {
    // Send email to data.state.private.email
    return data
}
export async function getProfile(data: Data<any, UserProfile>): Promise<Data> {
    data.response = {
        statusCode: 200, 
        body: {
            firstName: data.state.private.firstName,
            lastName: data.state.private.lastName,
            email: data.state.private.email
        },
        headers: {
            'Cache-Control': 'max-age=3600' // This response will be cached for 1 hour in Cloudfront CDN
        }
    }
    return data
}
```
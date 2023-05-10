# AUTHENTICATION
## EmailAuth class
```typescript
import RDK from '@retter/rdk'
const rdk = new RDK()
export async function sendOtp(data: Data): Promise<StepResponse> {
    data.state.private.otp = Math.floor(100000 + Math.random() * 900000)
    // Send email with otp
    return {...data, response = { statusCode: 200, body: 'OK' }}
}
export async function init(data: Data): Promise<Data> {
    data.state.private = { otp: null, email: data.request.body.email }
    return { ...data, response = { statusCode: 200, body: 'OK' } }
}
export async function verifyOtp(data: Data): Promise<StepResponse> {    
    if(data.state.private.otp !== data.body.otp) return { ...data, response = { statusCode: 401, body: 'Invalid OTP' } }
    const user = await rdk.getInstance({ className: 'User', lookupKey: { name: 'email', value: data.state.public.email } })
    let id = null
    if(user.success) {
        id = user.instanceId // instance id of existing user
    } else {
        const newUser = await rdk.getInstance({ className: 'User' })
        id = newUser.instanceId
    }
    const customToken = await rdk.generateCustomToken({ identity: 'user', userId: id })
    return { ...data, response = { statusCode: 200, body: customToken } }
}
```
## User class
```typescript
export async function init(data: Data): Promise<Data> {
    // Init instance state
    const email = data.request.body.email
    data.state.public = { email }
    // Optionally
    await rdk.setLookUpKey({ key: { name: "email", value: email } })
    return data
}
```
# CLIENT SIDE
```swift
// After receiving the token from verifyOtp method:
let rio = Rio.init(config: RioConfig(projectId: "{PROJECT_ID}"))
rio.authenticateWithCustomToken(customToken)
```
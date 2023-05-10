# You can use data.tasks to trigger methods in the future.
```typescript
data.tasks = [
    {
        after: 5, // seconds
        method: "someMethod",
        classId: "OtherClass", // defaults to same class
        instanceId: "other-instance-id", // defaults to same instance
        payload: { foo: 'bar' } // optional payload
    }
]
```
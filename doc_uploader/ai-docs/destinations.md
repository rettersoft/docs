# Destinations
You can use destination adapters to subscribe every state change and send them to Elasticsearch or your own custom REST API.
For Elasticsearch, we support only elastic.co's cloud service for now.
If your destination adapter becomes unavailable, Rio retries to send the state change with an exponential backoff strategy.
To configure your retry behavior, you should provide delay and max count.
> Please make sure that your destination adapter id is unique in your project scope.
To use any of these destinations, you should add them into your class templates.
```yaml
destinations:
    - id: yourDestinationId
```
Below configuration is to be set in developer console:
id: string (required) - Destination's unique ID
type: string (required) - Destination's type
pfactor: number (optional) - Parallelization factor. If you set this, queue will be consumed by the number you provided in parallel
retryConfig.delay: number (optional) - delay after a failed execution
retryConfig.count: number (optional) - maximum retry count after a failed execution
## Concurrency
By default, destinations have instanceId based concurrency which means each instanceId has its own queue to push messages in order.
These messages will be delivered in parallel by number of active instanceIds.
If you want to manage concurrency you should provide a parallelization factor in your destination configuration.
When you set an integer greater than zero, core will limit concurrent threads to that value instead of number of active instanceIds.
## Elasticsearch Support
cloudId: string (required) - Elasti.co's cloud id
username: string (required) - Elasti.co's username
password: string (required) - Elasti.co's password
index: string (required) - Index name to push the data into
## Http Support
method: string (required) - Http method
url: string (required) - Request url
headers.<header_name>: string (optional) - Request header's name and value
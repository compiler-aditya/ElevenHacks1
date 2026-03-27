# Source: https://developers.cloudflare.com/durable-objects/reference/data-location/

[Skip to content](https://developers.cloudflare.com/durable-objects/reference/data-location/#_top)

Copy page

# Data location

## Restrict Durable Objects to a jurisdiction

Jurisdictions are used to create Durable Objects that only run and store data within a region to comply with local regulations such as the [GDPR ↗](https://gdpr-info.eu/) or [FedRAMP ↗](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers may still access Durable Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

Durable Objects can be restricted to a specific jurisdiction by creating a [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace/) restricted to a jurisdiction. All [Durable Object ID methods](https://developers.cloudflare.com/durable-objects/api/id/) are valid on IDs within a namespace restricted to a jurisdiction.

```
const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");

const euId = euSubnamespace.newUniqueId();
```

- It is possible to have the same name represent different IDs in different jurisdictions.



```
const euId1 = env.MY_DURABLE_OBJECT.idFromName("my-name");

const euId2 = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("my-name");

console.assert(!euId1.equal(euId2), "This should always be true");
```

- You will run into an error if the jurisdiction on your [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace/) and the jurisdiction on [`DurableObjectId`](https://developers.cloudflare.com/durable-objects/api/id) are different.

- You will not run into an error if the [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace/) is not associated with a jurisdiction.

- All [Durable Object ID methods](https://developers.cloudflare.com/durable-objects/api/id/) are valid on IDs within a namespace restricted to a jurisdiction.



```
const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");

const euId = euSubnamespace.idFromName(name);

const stub = env.MY_DURABLE_OBJECT.get(euId);
```


### Supported locations

| Parameter | Location |
| --- | --- |
| eu | The European Union |
| fedramp | FedRAMP-compliant data centers |

## Provide a location hint

Durable Objects, as with any stateful API, will often add response latency as requests must be forwarded to the data center where the Durable Object, or state, is located.

Durable Objects do not currently change locations after they are created1. By default, a Durable Object is instantiated in a data center close to where the initial `get()` request is made. This may not be in the same data center that the `get()` request is made from, but in most cases, it will be in close proximity.

Location hints are the mechanism provided to specify the location that a Durable Object should be located regardless of where the initial `get()` request comes from.

To manually create Durable Objects in another location, provide an optional `locationHint` parameter to `get()`. Only the first call to `get()` for a particular Object will respect the hint.

```
let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: "enam" });
```

### Supported locations

| Parameter | Location |
| --- | --- |
| wnam | Western North America |
| enam | Eastern North America |
| sam | South America 2 |
| weur | Western Europe |
| eeur | Eastern Europe |
| apac | Asia-Pacific |
| oc | Oceania |
| afr | Africa 2 |
| me | Middle East 2 |

1 Dynamic relocation of existing Durable Objects is planned for the future.

2 Durable Objects currently do not spawn in this location. Instead, the Durable Object will spawn in a nearby location which does support Durable Objects. For example, Durable Objects hinted to South America spawn in Eastern North America instead.

## Additional resources

- You can find our more about where Durable Objects are located using the website: [Where Durable Objects Live ↗](https://where.durableobjects.live/).

Back to top
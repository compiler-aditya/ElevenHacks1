# Source: https://developers.cloudflare.com/durable-objects/api/id/

[Skip to content](https://developers.cloudflare.com/durable-objects/api/id/#_top)

Copy page

# Durable Object ID

## Description

A Durable Object ID is a 64-digit hexadecimal number used to identify a Durable Object. Not all 64-digit hex numbers are valid IDs. Durable Object IDs are constructed indirectly via the [`DurableObjectNamespace`](https://developers.cloudflare.com/durable-objects/api/namespace) interface.

The `DurableObjectId` interface refers to a new or existing Durable Object. This interface is most frequently used by [`DurableObjectNamespace::get`](https://developers.cloudflare.com/durable-objects/api/namespace/#get) to obtain a [`DurableObjectStub`](https://developers.cloudflare.com/durable-objects/api/stub) for submitting requests to a Durable Object. Note that creating an ID for a Durable Object does not create the Durable Object. The Durable Object is created lazily after creating a stub from a `DurableObjectId`. This ensures that objects are not constructed until they are actually accessed.

## Methods

### `toString`

`toString` converts a `DurableObjectId` to a 64 digit hex string. This string is useful for logging purposes or storing the `DurableObjectId` elsewhere, for example, in a session cookie. This string can be used to reconstruct a `DurableObjectId` via `DurableObjectNamespace::idFromString`.

```
// Create a new unique ID

const id = env.MY_DURABLE_OBJECT.newUniqueId();

// Convert the ID to a string to be saved elsewhere, e.g. a session cookie

const session_id = id.toString();

...

// Recreate the ID from the string

const id = env.MY_DURABLE_OBJECT.idFromString(session_id);
```

#### Parameters

- None.

#### Return values

- A 64 digit hex string.

### `equals`

`equals` is used to compare equality between two instances of `DurableObjectId`.

- [JavaScript](https://developers.cloudflare.com/durable-objects/api/id/#tab-panel-4629)
- [Python](https://developers.cloudflare.com/durable-objects/api/id/#tab-panel-4630)

```
const id1 = env.MY_DURABLE_OBJECT.newUniqueId();

const id2 = env.MY_DURABLE_OBJECT.newUniqueId();

console.assert(!id1.equals(id2), "Different unique ids should never be equal.");
```

```
id1 = env.MY_DURABLE_OBJECT.newUniqueId()

id2 = env.MY_DURABLE_OBJECT.newUniqueId()

assert not id1.equals(id2), "Different unique ids should never be equal."
```

#### Parameters

- A required `DurableObjectId` to compare against.

#### Return values

- A boolean. True if equal and false otherwise.

## Properties

### `name`

`name` is an optional property of a `DurableObjectId`, which returns the name that was used to create the `DurableObjectId` via [`DurableObjectNamespace::idFromName`](https://developers.cloudflare.com/durable-objects/api/namespace/#idfromname). This value is undefined if the `DurableObjectId` was constructed using [`DurableObjectNamespace::newUniqueId`](https://developers.cloudflare.com/durable-objects/api/namespace/#newuniqueid).

The `name` property is available on `ctx.id` inside the Durable Object. Names longer than 1,024 bytes are not passed through and will be `undefined` on `ctx.id`.

- [JavaScript](https://developers.cloudflare.com/durable-objects/api/id/#tab-panel-4631)
- [Python](https://developers.cloudflare.com/durable-objects/api/id/#tab-panel-4632)

```
const uniqueId = env.MY_DURABLE_OBJECT.newUniqueId();

const fromNameId = env.MY_DURABLE_OBJECT.idFromName("foo");

console.assert(uniqueId.name === undefined, "unique ids have no name");

console.assert(

  fromNameId.name === "foo",

  "name matches parameter to idFromName",

);
```

```
unique_id = env.MY_DURABLE_OBJECT.newUniqueId()

from_name_id = env.MY_DURABLE_OBJECT.idFromName("foo")

assert unique_id.name is None, "unique ids have no name"

assert from_name_id.name == "foo", "name matches parameter to idFromName"
```

## Related resources

- [Durable Objects: Easy, Fast, Correct – Choose Three ↗](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/).

Back to top
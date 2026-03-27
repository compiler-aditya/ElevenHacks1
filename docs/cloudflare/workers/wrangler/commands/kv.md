# Source: https://developers.cloudflare.com/workers/wrangler/commands/kv/

[Skip to content](https://developers.cloudflare.com/workers/wrangler/commands/kv/#_top)

Copy page

# KV

Manage [Workers KV](https://developers.cloudflare.com/kv/) using Wrangler.

## `kv namespace`

Manage Workers KV namespaces.

### `kv namespace create`

Create a new namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9325)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9326)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9327)

```
npx wrangler kv namespace create [NAMESPACE]
```

```
pnpm wrangler kv namespace create [NAMESPACE]
```

```
yarn wrangler kv namespace create [NAMESPACE]
```

- `[NAMESPACE]`` string`required
The name of the new namespace

- `--preview`` boolean`
Interact with a preview namespace

- `--use-remote`` boolean`
Use a remote binding when adding the newly created resource to your config

- `--update-config`` boolean`
Automatically update your config file with the newly added resource

- `--binding`` string`
The binding name of this resource in your Worker


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv namespace list`

Output a list of all KV namespaces associated with your account id

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9328)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9329)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9330)

```
npx wrangler kv namespace list
```

```
pnpm wrangler kv namespace list
```

```
yarn wrangler kv namespace list
```

Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv namespace delete`

Delete a given namespace.

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9331)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9332)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9333)

```
npx wrangler kv namespace delete [NAMESPACE]
```

```
pnpm wrangler kv namespace delete [NAMESPACE]
```

```
yarn wrangler kv namespace delete [NAMESPACE]
```

- `[NAMESPACE]`` string`
The name of the namespace to delete

- `--binding`` string`
The binding name to the namespace to delete from

- `--namespace-id`` string`
The id of the namespace to delete

- `--preview`` boolean`
Interact with a preview namespace

- `--skip-confirmation`` boolean`alias: --ydefault: false
Skip confirmation


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv namespace rename`

Rename a KV namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9334)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9335)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9336)

```
npx wrangler kv namespace rename [OLD-NAME]
```

```
pnpm wrangler kv namespace rename [OLD-NAME]
```

```
yarn wrangler kv namespace rename [OLD-NAME]
```

- `[OLD-NAME]`` string`
The current name of the namespace to rename

- `--namespace-id`` string`
The id of the namespace to rename

- `--new-name`` string`required
The new name for the namespace


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


## `kv key`

Manage key-value pairs within a Workers KV namespace.

### `kv key put`

Write a single key/value pair to the given namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9337)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9338)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9339)

```
npx wrangler kv key put [KEY] [VALUE]
```

```
pnpm wrangler kv key put [KEY] [VALUE]
```

```
yarn wrangler kv key put [KEY] [VALUE]
```

- `[KEY]`` string`required
The key to write to

- `[VALUE]`` string`
The value to write

- `--path`` string`
Read value from the file at a given path

- `--binding`` string`
The binding name to the namespace to write to

- `--namespace-id`` string`
The id of the namespace to write to

- `--preview`` boolean`
Interact with a preview namespace

- `--ttl`` number`
Time for which the entries should be visible

- `--expiration`` number`
Time since the UNIX epoch after which the entry expires

- `--metadata`` string`
Arbitrary JSON that is associated with a key

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv key list`

Output a list of all keys in a given namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9340)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9341)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9342)

```
npx wrangler kv key list
```

```
pnpm wrangler kv key list
```

```
yarn wrangler kv key list
```

- `--binding`` string`
The binding name to the namespace to list

- `--namespace-id`` string`
The id of the namespace to list

- `--preview`` boolean`default: false
Interact with a preview namespace

- `--prefix`` string`
A prefix to filter listed keys

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv key get`

Read a single value by key from the given namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9343)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9344)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9345)

```
npx wrangler kv key get [KEY]
```

```
pnpm wrangler kv key get [KEY]
```

```
yarn wrangler kv key get [KEY]
```

- `[KEY]`` string`required
The key value to get.

- `--text`` boolean`default: false
Decode the returned value as a utf8 string

- `--binding`` string`
The binding name to the namespace to get from

- `--namespace-id`` string`
The id of the namespace to get from

- `--preview`` boolean`default: false
Interact with a preview namespace

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv key delete`

Remove a single key value pair from the given namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9346)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9347)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9348)

```
npx wrangler kv key delete [KEY]
```

```
pnpm wrangler kv key delete [KEY]
```

```
yarn wrangler kv key delete [KEY]
```

- `[KEY]`` string`required
The key value to delete.

- `--binding`` string`
The binding name to the namespace to delete from

- `--namespace-id`` string`
The id of the namespace to delete from

- `--preview`` boolean`
Interact with a preview namespace

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


## `kv bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

### `kv bulk get`

Gets multiple key-value pairs from a namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9349)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9350)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9351)

```
npx wrangler kv bulk get [FILENAME]
```

```
pnpm wrangler kv bulk get [FILENAME]
```

```
yarn wrangler kv bulk get [FILENAME]
```

- `[FILENAME]`` string`required
The file containing the keys to get

- `--binding`` string`
The binding name to the namespace to get from

- `--namespace-id`` string`
The id of the namespace to get from

- `--preview`` boolean`default: false
Interact with a preview namespace

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv bulk put`

Upload multiple key-value pairs to a namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9352)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9353)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9354)

```
npx wrangler kv bulk put [FILENAME]
```

```
pnpm wrangler kv bulk put [FILENAME]
```

```
yarn wrangler kv bulk put [FILENAME]
```

- `[FILENAME]`` string`required
The file containing the key/value pairs to write

- `--binding`` string`
The binding name to the namespace to write to

- `--namespace-id`` string`
The id of the namespace to write to

- `--preview`` boolean`
Interact with a preview namespace

- `--ttl`` number`
Time for which the entries should be visible

- `--expiration`` number`
Time since the UNIX epoch after which the entry expires

- `--metadata`` string`
Arbitrary JSON that is associated with a key

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


### `kv bulk delete`

Delete multiple key-value pairs from a namespace

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9355)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9356)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/kv/#tab-panel-9357)

```
npx wrangler kv bulk delete [FILENAME]
```

```
pnpm wrangler kv bulk delete [FILENAME]
```

```
yarn wrangler kv bulk delete [FILENAME]
```

- `[FILENAME]`` string`required
The file containing the keys to delete

- `--force`` boolean`alias: --f
Do not ask for confirmation before deleting

- `--binding`` string`
The binding name to the namespace to delete from

- `--namespace-id`` string`
The id of the namespace to delete from

- `--preview`` boolean`
Interact with a preview namespace

- `--local`` boolean`
Interact with local storage

- `--remote`` boolean`
Interact with remote storage

- `--persist-to`` string`
Directory for local persistence


Global flags

- `--v`` boolean`alias: --version
Show version number

- `--cwd`` string`
Run as if Wrangler was started in the specified directory instead of the current working directory

- `--config`` string`alias: --c
Path to Wrangler configuration file

- `--env`` string`alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files

- `--env-file`` string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files

- `--experimental-provision`` boolean`aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning

- `--experimental-auto-create`` boolean`alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources


Back to top
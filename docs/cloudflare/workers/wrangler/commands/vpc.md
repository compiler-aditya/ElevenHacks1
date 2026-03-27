# Source: https://developers.cloudflare.com/workers/wrangler/commands/vpc/

[Skip to content](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#_top)

Copy page

# VPC

Manage [Workers VPC](https://developers.cloudflare.com/workers-vpc/) services using Wrangler. VPC services allow your Workers to connect to private services on your network through Cloudflare Tunnels.

## `vpc service create`

Create a new VPC service

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9688)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9689)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9690)

```
npx wrangler vpc service create [NAME]
```

```
pnpm wrangler vpc service create [NAME]
```

```
yarn wrangler vpc service create [NAME]
```

- `[NAME]`` string`required
The name of the VPC service

- `--type`` string`required
The type of the VPC service

- `--http-port`` number`
HTTP port (default: 80)

- `--https-port`` number`
HTTPS port number (default: 443)

- `--ipv4`` string`
IPv4 address for the host \[conflicts with --ipv6\]

- `--ipv6`` string`
IPv6 address for the host \[conflicts with --ipv4\]

- `--hostname`` string`
Hostname for the host

- `--resolver-ips`` string`
Comma-separated list of resolver IPs

- `--tunnel-id`` string`required
UUID of the Cloudflare tunnel


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


## `vpc service delete`

Delete a VPC service

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9691)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9692)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9693)

```
npx wrangler vpc service delete [SERVICE-ID]
```

```
pnpm wrangler vpc service delete [SERVICE-ID]
```

```
yarn wrangler vpc service delete [SERVICE-ID]
```

- `[SERVICE-ID]`` string`required
The ID of the service to delete


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


## `vpc service get`

Get a VPC service

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9694)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9695)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9696)

```
npx wrangler vpc service get [SERVICE-ID]
```

```
pnpm wrangler vpc service get [SERVICE-ID]
```

```
yarn wrangler vpc service get [SERVICE-ID]
```

- `[SERVICE-ID]`` string`required
The ID of the VPC service


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


## `vpc service list`

List VPC services

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9697)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9698)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9699)

```
npx wrangler vpc service list
```

```
pnpm wrangler vpc service list
```

```
yarn wrangler vpc service list
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


## `vpc service update`

Update a VPC service

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9700)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9701)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/vpc/#tab-panel-9702)

```
npx wrangler vpc service update [SERVICE-ID]
```

```
pnpm wrangler vpc service update [SERVICE-ID]
```

```
yarn wrangler vpc service update [SERVICE-ID]
```

- `[SERVICE-ID]`` string`required
The ID of the VPC service to update

- `--name`` string`required
The name of the VPC service

- `--type`` string`required
The type of the VPC service

- `--http-port`` number`
HTTP port (default: 80)

- `--https-port`` number`
HTTPS port number (default: 443)

- `--ipv4`` string`
IPv4 address for the host \[conflicts with --ipv6\]

- `--ipv6`` string`
IPv6 address for the host \[conflicts with --ipv4\]

- `--hostname`` string`
Hostname for the host

- `--resolver-ips`` string`
Comma-separated list of resolver IPs

- `--tunnel-id`` string`required
UUID of the Cloudflare tunnel


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
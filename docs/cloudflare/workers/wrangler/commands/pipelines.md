# Source: https://developers.cloudflare.com/workers/wrangler/commands/pipelines/

[Skip to content](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#_top)

Copy page

# Pipelines

Manage your [Pipelines](https://developers.cloudflare.com/pipelines/) using Wrangler.

## `pipelines setup`

Interactive setup for a complete pipeline

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9400)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9401)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9402)

```
npx wrangler pipelines setup
```

```
pnpm wrangler pipelines setup
```

```
yarn wrangler pipelines setup
```

- `--name`` string`
Pipeline name


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


## `pipelines create`

Create a new pipeline

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9403)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9404)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9405)

```
npx wrangler pipelines create [PIPELINE]
```

```
pnpm wrangler pipelines create [PIPELINE]
```

```
yarn wrangler pipelines create [PIPELINE]
```

- `[PIPELINE]`` string`required
The name of the pipeline to create

- `--sql`` string`
Inline SQL query for the pipeline

- `--sql-file`` string`
Path to file containing SQL query for the pipeline


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


## `pipelines list`

List all pipelines

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9406)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9407)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9408)

```
npx wrangler pipelines list
```

```
pnpm wrangler pipelines list
```

```
yarn wrangler pipelines list
```

- `--page`` number`default: 1
Page number for pagination

- `--per-page`` number`default: 20
Number of pipelines per page

- `--json`` boolean`default: false
Output in JSON format


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


## `pipelines get`

Get details about a specific pipeline

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9409)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9410)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9411)

```
npx wrangler pipelines get [PIPELINE]
```

```
pnpm wrangler pipelines get [PIPELINE]
```

```
yarn wrangler pipelines get [PIPELINE]
```

- `[PIPELINE]`` string`required
The ID of the pipeline to retrieve

- `--json`` boolean`default: false
Output in JSON format


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


## `pipelines update`

Update a pipeline configuration (legacy pipelines only)

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9412)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9413)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9414)

```
npx wrangler pipelines update [PIPELINE]
```

```
pnpm wrangler pipelines update [PIPELINE]
```

```
yarn wrangler pipelines update [PIPELINE]
```

- `[PIPELINE]`` string`required
The name of the legacy pipeline to update

- `--source`` array`
Space separated list of allowed sources. Options are 'http' or 'worker'

- `--require-http-auth`` boolean`
Require Cloudflare API Token for HTTPS endpoint authentication

- `--cors-origins`` array`
CORS origin allowlist for HTTP endpoint (use \* for any origin). Defaults to an empty array

- `--batch-max-mb`` number`
Maximum batch size in megabytes before flushing. Defaults to 100 MB if unset. Minimum: 1, Maximum: 100

- `--batch-max-rows`` number`
Maximum number of rows per batch before flushing. Defaults to 10,000,000 if unset. Minimum: 100, Maximum: 10,000,000

- `--batch-max-seconds`` number`
Maximum age of batch in seconds before flushing. Defaults to 300 if unset. Minimum: 1, Maximum: 300

- `--r2-bucket`` string`
Destination R2 bucket name

- `--r2-access-key-id`` string`
R2 service Access Key ID for authentication. Leave empty for OAuth confirmation.

- `--r2-secret-access-key`` string`
R2 service Secret Access Key for authentication. Leave empty for OAuth confirmation.

- `--r2-prefix`` string`
Prefix for storing files in the destination bucket. Default is no prefix

- `--compression`` string`
Compression format for output files

- `--shard-count`` number`
Number of shards for the pipeline. More shards handle higher request volume; fewer shards produce larger output files. Defaults to 2 if unset. Minimum: 1, Maximum: 15


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


## `pipelines delete`

Delete a pipeline

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9415)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9416)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9417)

```
npx wrangler pipelines delete [PIPELINE]
```

```
pnpm wrangler pipelines delete [PIPELINE]
```

```
yarn wrangler pipelines delete [PIPELINE]
```

- `[PIPELINE]`` string`required
The ID or name of the pipeline to delete

- `--force`` boolean`alias: --ydefault: false
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


## `pipelines streams create`

Create a new stream

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9418)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9419)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9420)

```
npx wrangler pipelines streams create [STREAM]
```

```
pnpm wrangler pipelines streams create [STREAM]
```

```
yarn wrangler pipelines streams create [STREAM]
```

- `[STREAM]`` string`required
The name of the stream to create

- `--schema-file`` string`
Path to JSON file containing stream schema

- `--http-enabled`` boolean`default: true
Enable HTTP endpoint

- `--http-auth`` boolean`default: true
Require authentication for HTTP endpoint

- `--cors-origin`` string`
CORS origin


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


## `pipelines streams list`

List all streams

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9421)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9422)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9423)

```
npx wrangler pipelines streams list
```

```
pnpm wrangler pipelines streams list
```

```
yarn wrangler pipelines streams list
```

- `--page`` number`default: 1
Page number for pagination

- `--per-page`` number`default: 20
Number of streams per page

- `--pipeline-id`` string`
Filter streams by pipeline ID

- `--json`` boolean`default: false
Output in JSON format


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


## `pipelines streams get`

Get details about a specific stream

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9424)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9425)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9426)

```
npx wrangler pipelines streams get [STREAM]
```

```
pnpm wrangler pipelines streams get [STREAM]
```

```
yarn wrangler pipelines streams get [STREAM]
```

- `[STREAM]`` string`required
The ID of the stream to retrieve

- `--json`` boolean`default: false
Output in JSON format


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


## `pipelines streams delete`

Delete a stream

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9427)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9428)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9429)

```
npx wrangler pipelines streams delete [STREAM]
```

```
pnpm wrangler pipelines streams delete [STREAM]
```

```
yarn wrangler pipelines streams delete [STREAM]
```

- `[STREAM]`` string`required
The ID of the stream to delete

- `--force`` boolean`alias: --ydefault: false
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


## `pipelines sinks create`

Create a new sink

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9430)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9431)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9432)

```
npx wrangler pipelines sinks create [SINK]
```

```
pnpm wrangler pipelines sinks create [SINK]
```

```
yarn wrangler pipelines sinks create [SINK]
```

- `[SINK]`` string`required
The name of the sink to create

- `--type`` string`required
The type of sink to create

- `--bucket`` string`required
R2 bucket name

- `--format`` string`default: parquet
Output format

- `--compression`` string`default: zstd
Compression method (parquet only)

- `--target-row-group-size`` string`
Target row group size for parquet format

- `--path`` string`
The base prefix in your bucket where data will be written

- `--partitioning`` string`
Time partition pattern (r2 sinks only)

- `--roll-size`` number`
Roll file size in MB

- `--roll-interval`` number`default: 300
Roll file interval in seconds

- `--access-key-id`` string`
R2 access key ID (leave empty for R2 credentials to be automatically created)

- `--secret-access-key`` string`
R2 secret access key (leave empty for R2 credentials to be automatically created)

- `--namespace`` string`
Data catalog namespace (required for r2-data-catalog)

- `--table`` string`
Table name within namespace (required for r2-data-catalog)

- `--catalog-token`` string`
Authentication token for data catalog (required for r2-data-catalog)


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


## `pipelines sinks list`

List all sinks

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9433)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9434)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9435)

```
npx wrangler pipelines sinks list
```

```
pnpm wrangler pipelines sinks list
```

```
yarn wrangler pipelines sinks list
```

- `--page`` number`default: 1
Page number for pagination

- `--per-page`` number`default: 20
Number of sinks per page

- `--pipeline-id`` string`
Filter sinks by pipeline ID

- `--json`` boolean`default: false
Output in JSON format


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


## `pipelines sinks get`

Get details about a specific sink

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9436)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9437)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9438)

```
npx wrangler pipelines sinks get [SINK]
```

```
pnpm wrangler pipelines sinks get [SINK]
```

```
yarn wrangler pipelines sinks get [SINK]
```

- `[SINK]`` string`required
The ID of the sink to retrieve

- `--json`` boolean`default: false
Output in JSON format


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


## `pipelines sinks delete`

Delete a sink

- [npm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9439)
- [pnpm](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9440)
- [yarn](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#tab-panel-9441)

```
npx wrangler pipelines sinks delete [SINK]
```

```
pnpm wrangler pipelines sinks delete [SINK]
```

```
yarn wrangler pipelines sinks delete [SINK]
```

- `[SINK]`` string`required
The ID of the sink to delete

- `--force`` boolean`alias: --ydefault: false
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


Back to top
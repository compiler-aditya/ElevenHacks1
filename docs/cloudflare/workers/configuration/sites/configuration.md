# Source: https://developers.cloudflare.com/workers/configuration/sites/configuration/

[Skip to content](https://developers.cloudflare.com/workers/configuration/sites/configuration/#_top)

Copy page

# Workers Sites configuration

Workers Sites require the latest version of [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).

## Wrangler configuration file

There are a few specific configuration settings for Workers Sites in your Wrangler file:

- `bucket` required
  - The directory containing your static assets, path relative to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). Example: `bucket = "./public"`.
- `include` optional
  - A list of gitignore-style patterns for files or directories in `bucket` you exclusively want to upload. Example: `include = ["upload_dir"]`.
- `exclude` optional
  - A list of gitignore-style patterns for files or directories in `bucket` you want to exclude from uploads. Example: `exclude = ["ignore_dir"]`.

To learn more about the optional `include` and `exclude` fields, refer to [Ignoring subsets of static assets](https://developers.cloudflare.com/workers/configuration/sites/configuration/#ignoring-subsets-of-static-assets).

Example of a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

- [wrangler.jsonc](https://developers.cloudflare.com/workers/configuration/sites/configuration/#tab-panel-7856)
- [wrangler.toml](https://developers.cloudflare.com/workers/configuration/sites/configuration/#tab-panel-7857)

```
{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "docs-site-blah",

  "site": {

    "bucket": "./public"

  },

  "env": {

    "production": {

      "name": "docs-site",

      "route": "https://example.com/docs*"

    },

    "staging": {

      "name": "docs-site-staging",

      "route": "https://staging.example.com/docs*"

    }

  }

}
```

```
"$schema" = "./node_modules/wrangler/config-schema.json"

name = "docs-site-blah"

[site]

bucket = "./public"

[env.production]

name = "docs-site"

route = "https://example.com/docs*"

[env.staging]

name = "docs-site-staging"

route = "https://staging.example.com/docs*"
```

## Storage limits

For very exceptionally large pages, Workers Sites might not work for you. There is a 25 MiB limit per page or file.

## Ignoring subsets of static assets

Workers Sites require [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) \- make sure to use the [latest version](https://developers.cloudflare.com/workers/wrangler/install-and-update/#update-wrangler).

There are cases where users may not want to upload certain static assets to their Workers Sites.
In this case, Workers Sites can also be configured to ignore certain files or directories using logic
similar to [Cargo's optional include and exclude fields ↗](https://doc.rust-lang.org/cargo/reference/manifest.html#the-exclude-and-include-fields-optional).

This means that you should use gitignore semantics when declaring which directory entries to include or ignore in uploads.

### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, you can add an `include` field to your `[site]` section of your Wrangler file:

- [wrangler.jsonc](https://developers.cloudflare.com/workers/configuration/sites/configuration/#tab-panel-7852)
- [wrangler.toml](https://developers.cloudflare.com/workers/configuration/sites/configuration/#tab-panel-7853)

```
{

  "site": {

    "bucket": "./public",

    "include": [ // must be an array.\
\
      "included_dir"\
\
    ]

  }

}
```

```
[site]

bucket = "./public"

include = [ "included_dir" ]
```

Wrangler will only upload files or directories matching the patterns in the `include` array.

### Excluding files/directories

If you want to exclude files or directories in your `bucket`, you can add an `exclude` field to your `[site]` section of your Wrangler file:

- [wrangler.jsonc](https://developers.cloudflare.com/workers/configuration/sites/configuration/#tab-panel-7854)
- [wrangler.toml](https://developers.cloudflare.com/workers/configuration/sites/configuration/#tab-panel-7855)

```
{

  "site": {

    "bucket": "./public",

    "exclude": [ // must be an array.\
\
      "excluded_dir"\
\
    ]

  }

}
```

```
[site]

bucket = "./public"

exclude = [ "excluded_dir" ]
```

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

### Include > exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

#### More about include/exclude patterns

Learn more about the standard patterns used for include and exclude in the [gitignore documentation ↗](https://git-scm.com/docs/gitignore).

Back to top
# Source: https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/install-update/

[Skip to content](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/install-update/#_top)

Copy page

# Install / Update

## Install

### Install with `npm`

```
npm i @cloudflare/wrangler -g
```

### Install with `cargo`

Assuming you have Rust’s package manager, [Cargo ↗](https://github.com/rust-lang/cargo), installed, run:

```
cargo install wrangler
```

Otherwise, to install Cargo, you must first install rustup. On Linux and macOS systems, `rustup` can be installed as follows:

```
curl https://sh.rustup.rs -sSf | sh
```

Additional installation methods are available [on the Rust site ↗](https://forge.rust-lang.org/other-installation-methods.html).

Windows users will need to install Perl as a dependency for `openssl-sys` — [Strawberry Perl ↗](https://www.perl.org/get.html) is recommended.

After Cargo is installed, you may now install Wrangler:

```
cargo install wrangler
```

### Manual install

1. Download the binary tarball for your platform from the [releases page ↗](https://github.com/cloudflare/wrangler-legacy/releases). You do not need the `wranglerjs-*.tar.gz` download – Wrangler will install that for you.

2. Unpack the tarball and place the Wrangler binary somewhere on your `PATH`, preferably `/usr/local/bin` for Linux/macOS or `Program Files` for Windows.


## Update

To update [Wrangler ↗](https://github.com/cloudflare/wrangler-legacy), run one of the following:

### Update with `npm`

```
npm update -g @cloudflare/wrangler
```

### Update with `cargo`

```
cargo install wrangler --force
```

Back to top
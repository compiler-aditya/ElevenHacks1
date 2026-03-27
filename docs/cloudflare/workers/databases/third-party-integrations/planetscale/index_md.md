# Source: https://developers.cloudflare.com/workers/databases/third-party-integrations/planetscale/index.md

\-\-\-
title: PlanetScale
description: PlanetScale is a database platform that provides MySQL-compatible and PostgreSQL databases, making them more scalable, easier and safer to manage.
image: https://developers.cloudflare.com/dev-products-preview.png
\-\-\-

\[Skip to content\](#%5Ftop)

Was this helpful?

YesNo

\[ Edit page \](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/databases/third-party-integrations/planetscale.mdx) \[ Report issue \](https://github.com/cloudflare/cloudflare-docs/issues/new/choose)

Copy page

\# PlanetScale

\[PlanetScale ↗\](https://planetscale.com/) is a database platform that provides MySQL-compatible and PostgreSQL databases, making them more scalable, easier and safer to manage.

Note

You can connect to PlanetScale using \[Hyperdrive\](https://developers.cloudflare.com/hyperdrive) (recommended), or using the PlanetScale serverless driver, \`@planetscale/database\`. Both provide connection pooling and reduce the amount of round trips required to create a secure connection from Workers to your database.

Hyperdrive can provide lower latencies because it performs the database connection setup and connection pooling across Cloudflare's network. Hyperdrive supports native database drivers, libraries, and ORMs, and is included in all \[Workers plans\](https://developers.cloudflare.com/hyperdrive/platform/pricing/). Learn more about Hyperdrive in \[How Hyperdrive Works\](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).

\\* \[ Hyperdrive (recommended) \](#tab-panel-7916)
\\* \[ PlanetScale serverless driver \](#tab-panel-7917)

To connect to PlanetScale using \[Hyperdrive\](https://developers.cloudflare.com/hyperdrive), follow these steps:

\## 1\\. Allow Hyperdrive access

You can connect Hyperdrive to any existing PlanetScale MySQL-compatible database by creating a new user and fetching your database connection string.

\### PlanetScale Dashboard

1\. Go to the \[\*\*PlanetScale dashboard\*\* ↗\](https://app.planetscale.com/) and select the database you wish to connect to.
2\. Click \*\*Connect\*\*. Enter \`hyperdrive-user\` as the password name (or your preferred name) and configure the permissions as desired. Select \*\*Create password\*\*. Note the username and password as they will not be displayed again.
3\. Select \*\*Other\*\* as your language or framework. Note down the database host, database name, database username, and password. You will need these to create a database configuration in Hyperdrive.

With the host, database name, username and password, you can now create a Hyperdrive database configuration.

Note

To reduce latency, use a \[Placement Hint\](https://developers.cloudflare.com/workers/configuration/placement/#configure-explicit-placement-hints) to run your Worker close to your PlanetScale database. This is especially useful when a single request makes multiple queries.

wrangler.jsonc

\`\`\`

{

 "placement": {

 // Match to your PlanetScale region, for example "gcp:us-east4" or "aws:us-east-1"

 "region": "gcp:us-east4",

 },

}

\`\`\`

\## 2\\. Create a database configuration

To configure Hyperdrive, you will need:

\\* The IP address (or hostname) and port of your database.
\\* The database username (for example, \`hyperdrive-demo\`) you configured in a previous step.
\\* The password associated with that username.
\\* The name of the database you want Hyperdrive to connect to. For example, \`mysql\`.

Hyperdrive accepts the combination of these parameters in the common connection string format used by database drivers:

\`\`\`

mysql://USERNAME:PASSWORD@HOSTNAME\_OR\_IP\_ADDRESS:PORT/database\_name

\`\`\`

Most database providers will provide a connection string you can copy-and-paste directly into Hyperdrive.

To create a Hyperdrive configuration with the \[Wrangler CLI\](https://developers.cloudflare.com/workers/wrangler/install-and-update/), open your terminal and run the following command.

\\* Replace  with a name for your Hyperdrive configuration and paste the connection string provided from your database host, or,
\\* Replace \`user\`, \`password\`, \`HOSTNAME\_OR\_IP\_ADDRESS\`, \`port\`, and \`database\_name\` placeholders with those specific to your database:

Terminal window

\`\`\`

npx wrangler hyperdrive create  --connection-string="mysql://user:password@HOSTNAME\_OR\_IP\_ADDRESS:PORT/database\_name"

\`\`\`

Note

Hyperdrive will attempt to connect to your database with the provided credentials to verify they are correct before creating a configuration. If you encounter an error when attempting to connect, refer to Hyperdrive's \[troubleshooting documentation\](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug possible causes.

This command outputs a binding for the \[Wrangler configuration file\](https://developers.cloudflare.com/workers/wrangler/configuration/):

\\* \[ wrangler.jsonc \](#tab-panel-7909)
\\* \[ wrangler.toml \](#tab-panel-7910)

\`\`\`

{

 "$schema": "./node\_modules/wrangler/config-schema.json",

 "name": "hyperdrive-example",

 "main": "src/index.ts",

 // Set this to today's date

 "compatibility\_date": "2026-03-26",

 "compatibility\_flags": \[\
\
 "nodejs\_compat"\
\
 \],

 // Pasted from the output of \`wrangler hyperdrive create  --connection-string=\[...\]\` above.

 "hyperdrive": \[\
\
 {\
\
 "binding": "HYPERDRIVE",\
\
 "id": ""\
\
 }\
\
 \]

}

\`\`\`

\`\`\`

"$schema" = "./node\_modules/wrangler/config-schema.json"

name = "hyperdrive-example"

main = "src/index.ts"

\# Set this to today's date

compatibility\_date = "2026-03-26"

compatibility\_flags = \[ "nodejs\_compat" \]

\[\[hyperdrive\]\]

binding = "HYPERDRIVE"

id = ""

\`\`\`

\## 3\\. Use Hyperdrive from your Worker

Install the \[mysql2 ↗\](https://github.com/sidorares/node-mysql2) driver:

\\* \[ npm \](#tab-panel-7911)
\\* \[ yarn \](#tab-panel-7912)
\\* \[ pnpm \](#tab-panel-7913)

Terminal window

\`\`\`

npm i mysql2@>3.13.0

\`\`\`

Terminal window

\`\`\`

yarn add mysql2@>3.13.0

\`\`\`

Terminal window

\`\`\`

pnpm add mysql2@>3.13.0

\`\`\`

Note

\`mysql2\` v3.13.0 or later is required

Add the required Node.js compatibility flags and Hyperdrive binding to your \`wrangler.jsonc\` file:

\\* \[ wrangler.jsonc \](#tab-panel-7914)
\\* \[ wrangler.toml \](#tab-panel-7915)

\`\`\`

{

 // required for database drivers to function

 "compatibility\_flags": \[\
\
 "nodejs\_compat"\
\
 \],

 // Set this to today's date

 "compatibility\_date": "2026-03-26",

 "hyperdrive": \[\
\
 {\
\
 "binding": "HYPERDRIVE",\
\
 "id": ""\
\
 }\
\
 \]

}

\`\`\`

\`\`\`

compatibility\_flags = \[ "nodejs\_compat" \]

\# Set this to today's date

compatibility\_date = "2026-03-26"

\[\[hyperdrive\]\]

binding = "HYPERDRIVE"

id = ""

\`\`\`

Create a new \`connection\` instance and pass the Hyperdrive parameters:

TypeScript

\`\`\`

// mysql2 v3.13.0 or later is required

import { createConnection } from "mysql2/promise";

export default {

 async fetch(request, env, ctx): Promise {

 // Create a new connection on each request. Hyperdrive maintains the underlying

 // database connection pool, so creating a new connection is fast.

 const connection = await createConnection({

 host: env.HYPERDRIVE.host,

 user: env.HYPERDRIVE.user,

 password: env.HYPERDRIVE.password,

 database: env.HYPERDRIVE.database,

 port: env.HYPERDRIVE.port,

 // Required to enable mysql2 compatibility for Workers

 disableEval: true,

 });

 try {

 // Sample query

 const \[results, fields\] = await connection.query("SHOW tables;");

 // Return result rows as JSON

 return Response.json({ results, fields });

 } catch (e) {

 console.error(e);

 return Response.json(

 { error: e instanceof Error ? e.message : e },

 { status: 500 },

 );

 }

 },

} satisfies ExportedHandler;

\`\`\`

Note

The minimum version of \`mysql2\` required for Hyperdrive is \`3.13.0\`.

Note

When connecting to a PlanetScale database with Hyperdrive, you should use a driver like \[node-postgres (pg)\](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/node-postgres/) or \[Postgres.js\](https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres/postgres-drivers-and-libraries/postgres-js/) to connect directly to the underlying database instead of the \[PlanetScale serverless driver ↗\](https://planetscale.com/docs/tutorials/planetscale-serverless-driver). Hyperdrive is optimized for database access for Workers and will perform global connection pooling and fast query routing by connecting directly to your database.

\## Next steps

\\* Learn more about \[How Hyperdrive Works\](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/).
\\* Refer to the \[troubleshooting guide\](https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/) to debug common issues.
\\* Understand more about other \[storage options\](https://developers.cloudflare.com/workers/platform/storage-options/) available to Cloudflare Workers.

\## Set up an integration with PlanetScale

To set up an integration with PlanetScale:

1\. You need to have an existing PlanetScale database to connect to. \[Create a PlanetScale database ↗\](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#create-a-database) or \[import an existing database to PlanetScale ↗\](https://planetscale.com/docs/imports/database-imports#overview).
2\. From the \[PlanetScale web console ↗\](https://planetscale.com/docs/concepts/web-console#get-started), create a \`products\` table with the following query:
\`\`\`
CREATE TABLE products (
 id int NOT NULL AUTO\_INCREMENT PRIMARY KEY,
 name varchar(255) NOT NULL,
 image\_url varchar(255),
 category\_id INT,
 KEY category\_id\_idx (category\_id)
);
\`\`\`
3\. Insert some data in your newly created table. Run the following command to add a product and category to your table:
\`\`\`
INSERT INTO products (name, image\_url, category\_id)
VALUES ('Ballpoint pen', 'https://example.com/500x500', '1');
\`\`\`
4\. Configure the PlanetScale database credentials in your Worker:
You need to add your PlanetScale database credentials as secrets to your Worker. Get your connection details from the \[PlanetScale Dashboard ↗\](https://app.planetscale.com) by creating a connection string, then add them as secrets using Wrangler:
Terminal window
\`\`\`
\# Add the database host as a secret
npx wrangler secret put DATABASE\_HOST
\# When prompted, paste your PlanetScale host
\# Add the database username as a secret
npx wrangler secret put DATABASE\_USERNAME
\# When prompted, paste your PlanetScale username
\# Add the database password as a secret
npx wrangler secret put DATABASE\_PASSWORD
\# When prompted, paste your PlanetScale password
\`\`\`
5\. In your Worker, install the \`@planetscale/database\` driver to connect to your PlanetScale database and start manipulating data:
 \\* \[ npm \](#tab-panel-7906)
 \\* \[ yarn \](#tab-panel-7907)
 \\* \[ pnpm \](#tab-panel-7908)
Terminal window
\`\`\`
npm i @planetscale/database
\`\`\`
Terminal window
\`\`\`
yarn add @planetscale/database
\`\`\`
Terminal window
\`\`\`
pnpm add @planetscale/database
\`\`\`
6\. The following example shows how to make a query to your PlanetScale database in a Worker. The credentials needed to connect to PlanetScale have been added as secrets to your Worker.
JavaScript
\`\`\`
import { connect } from "@planetscale/database";
export default {
 async fetch(request, env) {
 const config = {
 host: env.DATABASE\_HOST,
 username: env.DATABASE\_USERNAME,
 password: env.DATABASE\_PASSWORD,
 // see https://github.com/cloudflare/workerd/issues/698
 fetch: (url, init) => {
 delete init\["cache"\];
 return fetch(url, init);
 },
 };
 const conn = connect(config);
 const data = await conn.execute("SELECT \* FROM products;");
 return new Response(JSON.stringify(data.rows), {
 status: 200,
 headers: {
 "Content-Type": "application/json",
 },
 });
 },
};
\`\`\`

To learn more about PlanetScale, refer to \[PlanetScale's official documentation ↗\](https://docs.planetscale.com/).

\`\`\`json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":\[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/databases/","name":"Databases"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/databases/third-party-integrations/","name":"3rd Party Integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/databases/third-party-integrations/planetscale/","name":"PlanetScale"}}\]}
\`\`\`
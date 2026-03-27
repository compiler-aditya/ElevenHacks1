# Source: https://developers.cloudflare.com/durable-objects/durable-objects-rest-api/

[Skip to content](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#_top)

[API Reference](https://developers.cloudflare.com/api)

[Durable Objects](https://developers.cloudflare.com/api/resources/durable_objects)

[Namespaces](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces)

Copy Markdown

Open in **Claude**

Open in **ChatGPT**

Open in **Cursor**

* * *

**Copy Markdown**

**View as Markdown**

# List Namespaces

GET/accounts/{account\_id}/workers/durable\_objects/namespaces

Returns the Durable Object namespaces owned by an account.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Workers Scripts Write``Workers Scripts Read`

##### Path ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema))

##### Query ParametersExpand Collapse

page: optional number

Current page.

minimum1

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema))

per\_page: optional number

Items per-page.

maximum1000

minimum1

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema))

##### ReturnsExpand Collapse

errors: array of object {code, message, documentation\_url, source}

code: number

minimum1000

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors%20%3E%20(items)%20%3E%20(property)%20code)

message: string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors%20%3E%20(items)%20%3E%20(property)%20message)

documentation\_url: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors%20%3E%20(items)%20%3E%20(property)%20documentation_url)

source: optional object {pointer}

pointer: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors%20%3E%20(items)%20%3E%20(property)%20source%20%3E%20(property)%20pointer)

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors%20%3E%20(items)%20%3E%20(property)%20source)

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors)

messages: array of object {code, message, documentation\_url, source}

code: number

minimum1000

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages%20%3E%20(items)%20%3E%20(property)%20code)

message: string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages%20%3E%20(items)%20%3E%20(property)%20message)

documentation\_url: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages%20%3E%20(items)%20%3E%20(property)%20documentation_url)

source: optional object {pointer}

pointer: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages%20%3E%20(items)%20%3E%20(property)%20source%20%3E%20(property)%20pointer)

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages%20%3E%20(items)%20%3E%20(property)%20source)

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages)

success: true

Whether the API call was successful.

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success)

result: optional array of [Namespace](https://developers.cloudflare.com/api/resources/durable_objects#(resource)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)) { id, class, name, 2 more }

id: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)%20%3E%20(property)%20id)

class: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)%20%3E%20(property)%20class)

name: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)%20%3E%20(property)%20name)

script: optional string

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)%20%3E%20(property)%20script)

use\_sqlite: optional boolean

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)%20%3E%20(property)%20use_sqlite)

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result)

result\_info: optional object {count, page, per\_page, 2 more}

count: optional number

Total number of results for the requested service.

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info%20%3E%20(property)%20count)

page: optional number

Current page within paginated list of results.

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info%20%3E%20(property)%20page)

per\_page: optional number

Number of results per page of results.

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info%20%3E%20(property)%20per_page)

total\_count: optional number

Total results available without any search parameters.

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info%20%3E%20(property)%20total_count)

total\_pages: optional number

The number of total pages in the entire result set.

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info%20%3E%20(property)%20total_pages)

[Link to this property](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list/#(resource)%20durable_objects.namespaces%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info)

### List Namespaces

HTTP

HTTP

HTTP

TypeScript

TypeScript

Python

Python

Go

Go

Terraform

Terraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/durable_objects/namespaces \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [\
    {\
      "code": 1000,\
      "message": "message",\
      "documentation_url": "documentation_url",\
      "source": {\
        "pointer": "pointer"\
      }\
    }\
  ],
  "messages": [\
    {\
      "code": 1000,\
      "message": "message",\
      "documentation_url": "documentation_url",\
      "source": {\
        "pointer": "pointer"\
      }\
    }\
  ],
  "success": true,
  "result": [\
    {\
      "id": "id",\
      "class": "class",\
      "name": "name",\
      "script": "script",\
      "use_sqlite": true\
    }\
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [\
    {\
      "code": 1000,\
      "message": "message",\
      "documentation_url": "documentation_url",\
      "source": {\
        "pointer": "pointer"\
      }\
    }\
  ],
  "messages": [\
    {\
      "code": 1000,\
      "message": "message",\
      "documentation_url": "documentation_url",\
      "source": {\
        "pointer": "pointer"\
      }\
    }\
  ],
  "success": true,
  "result": [\
    {\
      "id": "id",\
      "class": "class",\
      "name": "name",\
      "script": "script",\
      "use_sqlite": true\
    }\
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

- [API Reference](https://developers.cloudflare.com/api/api)
# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-agents

Get a list of agents depending on this knowledge base document

### Path parameters

documentation\_idstringRequired

The id of a document from the knowledge base. This is returned on document addition.

### Headers

xi-api-keystringOptional

### Query parameters

dependent\_typeenumOptional

Type of dependent agents to return.

Allowed values:directtransitiveall

page\_sizeintegerOptional`1-100`Defaults to `30`

How many documents to return at maximum. Can not exceed 100, defaults to 30.

cursorstringOptional

Used for fetching next page. Cursor is returned in the response.

### Response

Successful Response

agentslist of objects

Show 2 variants

has\_moreboolean

brancheslist of objects

Show 5 properties

next\_cursorstring

### Errors

422

Documents Get Agents Request Unprocessable Entity Error
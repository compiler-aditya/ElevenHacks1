# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/tools/get-dependent-agents

Get a list of agents depending on this tool

### Path parameters

tool\_idstringRequired

ID of the requested tool.

### Headers

xi-api-keystringOptional

### Query parameters

cursorstringOptional

Used for fetching next page. Cursor is returned in the response.

page\_sizeintegerOptional`1-100`Defaults to `30`

How many documents to return at maximum. Can not exceed 100, defaults to 30.

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

Tools Get Dependent Agents Request Unprocessable Entity Error
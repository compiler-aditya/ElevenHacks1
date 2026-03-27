# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/list

Get all batch calls for the current workspace.

### Headers

xi-api-keystringOptional

### Query parameters

limitintegerOptionalDefaults to `100`

last\_docstringOptional

### Response

Successful Response

batch\_callslist of objects

Show 21 properties

next\_docstring

The next document, used to paginate through the batch calls

has\_morebooleanDefaults to `false`

Whether there are more batch calls to paginate through

### Errors

422

Batch Calls List Request Unprocessable Entity Error
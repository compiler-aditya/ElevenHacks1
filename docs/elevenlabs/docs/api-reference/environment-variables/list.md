# Source: https://elevenlabs.io/docs/api-reference/environment-variables/list

List all environment variables for the workspace with optional filtering

### Headers

xi-api-keystringOptional

### Query parameters

cursorstringOptional

Pagination cursor from previous response

page\_sizeintegerOptional`1-100`Defaults to `100`

Number of items to return (1-100)

labelstringOptional

Filter by exact label match

environmentstringOptional

Filter to only return variables that have this environment. When specified, the values dict in the response will only contain this environment.

typeenumOptional

Filter by variable type

Allowed values:stringsecretauth\_connection

### Response

Successful Response

environment\_variableslist of objects

Show 8 properties

has\_moreboolean

next\_cursorstring

### Errors

400

Environment Variables List Request Bad Request Error

422

Environment Variables List Request Unprocessable Entity Error
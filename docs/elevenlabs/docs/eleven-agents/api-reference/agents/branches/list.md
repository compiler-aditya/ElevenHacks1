# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/list

Returns a list of branches an agent has

### Path parameters

agent\_idstringRequired

The id of an agent. This is returned on agent creation.

### Headers

xi-api-keystringOptional

### Query parameters

include\_archivedbooleanOptionalDefaults to `false`

Whether archived branches should be included

limitintegerOptional`<=100`Defaults to `100`

How many results at most should be returned

### Response

Successful Response

resultslist of objects

Show 11 properties

metaobject

Show 3 properties

### Errors

422

Branches List Request Unprocessable Entity Error
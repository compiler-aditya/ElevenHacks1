# Source: https://elevenlabs.io/docs/api-reference/agents/list

Returns a list of your agents and their metadata.

### Headers

xi-api-keystringOptional

### Query parameters

page\_sizeintegerOptional`1-100`Defaults to `30`

How many Agents to return at maximum. Can not exceed 100, defaults to 30.

searchstringOptional

Search by agents name.

archivedbooleanOptional

Filter agents by archived status

show\_only\_owned\_agentsbooleanOptionalDefaults to `false`Deprecated

If set to true, the endpoint will omit any agents that were shared with you by someone else and include only the ones you own. Deprecated: use created\_by\_user\_id instead.

created\_by\_user\_idstringOptional

Filter agents by creator user ID. When set, only agents created by this user are returned. Takes precedence over show\_only\_owned\_agents. Use ‘@me’ to refer to the authenticated user.

sort\_directionenumOptional

The direction to sort the results

Allowed values:ascdesc

sort\_byenumOptional

The field to sort the results by

Allowed values:namecreated\_atcall\_count\_7d

cursorstringOptional

Used for fetching next page. Cursor is returned in the response.

### Response

Successful Response

agentslist of objects

A list of agents and their metadata

Show 7 properties

has\_moreboolean

Whether there are more agents to paginate through

next\_cursorstring

The next cursor to paginate through the agents

### Errors

422

Agents List Request Unprocessable Entity Error
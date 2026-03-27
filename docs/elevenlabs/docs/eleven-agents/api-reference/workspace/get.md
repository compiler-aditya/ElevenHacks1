# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/get

Retrieve Convai settings for the workspace

### Headers

xi-api-keystringOptional

### Response

Successful Response

conversation\_initiation\_client\_data\_webhookobject

Show 2 properties

webhooksobject

Show 3 properties

can\_use\_mcp\_serversbooleanDefaults to `false`

Whether the workspace can use MCP servers

rag\_retention\_period\_daysinteger`<=30`Defaults to `10`

conversation\_embedding\_retention\_daysinteger`<=365`

Days to retain conversation embeddings. None means use the system default (30 days).

default\_livekit\_stackenumDefaults to `standard`

Allowed values:standardstatic

### Errors

422

Settings Get Request Unprocessable Entity Error
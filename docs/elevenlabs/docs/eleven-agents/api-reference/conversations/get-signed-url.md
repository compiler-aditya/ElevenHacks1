# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/get-signed-url

Get a signed url to start a conversation with an agent with an agent that requires authorization

### Headers

xi-api-keystringOptional

### Query parameters

agent\_idstringRequired

The id of the agent you're taking the action on.

include\_conversation\_idbooleanOptionalDefaults to `false`

Whether to include a conversation\_id with the response. If included, the conversation\_signature cannot be used again.

branch\_idstringOptional

The ID of the branch to use

environmentstringOptional

The environment to use for resolving environment variables (e.g. ‘production’, ‘staging’). Defaults to ‘production’.

### Response

Successful Response

signed\_urlstring

### Errors

422

Conversations Get Signed URL Request Unprocessable Entity Error
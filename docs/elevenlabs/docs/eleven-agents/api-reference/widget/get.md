# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/widget/get

Retrieve the widget configuration for an agent

### Path parameters

agent\_idstringRequired

The id of an agent. This is returned on agent creation.

### Headers

xi-api-keystringOptional

### Query parameters

conversation\_signaturestringOptional

An expiring token that enables a websocket conversation to start. These can be generated for an agent using the /v1/convai/conversation/get-signed-url endpoint

### Response

Successful Response

agent\_idstring

widget\_configobject

Show 51 properties

### Errors

422

Widget Get Request Unprocessable Entity Error
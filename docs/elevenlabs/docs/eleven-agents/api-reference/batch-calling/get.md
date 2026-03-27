# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/get

Get detailed information about a batch call including all recipients.

### Path parameters

batch\_idstringRequired

### Headers

xi-api-keystringOptional

### Response

Successful Response

idstring

namestring

agent\_idstring

created\_at\_unixinteger

scheduled\_time\_unixinteger

total\_calls\_dispatchedintegerDefaults to `0`

total\_calls\_scheduledintegerDefaults to `0`

total\_calls\_finishedintegerDefaults to `0`

last\_updated\_at\_unixinteger

statusenum

Allowed values:pendingin\_progresscompletedfailedcancelled

retry\_countintegerDefaults to `0`

telephony\_call\_configobject

Show 1 properties

agent\_namestring

recipientslist of objects

Show 8 properties

phone\_number\_idstring

phone\_providerenum

Allowed values:twiliosip\_trunk

whatsapp\_paramsobject

Show 3 properties

branch\_idstring

environmentstring

timezonestring

target\_concurrency\_limitinteger`>=1`

Maximum number of simultaneous calls for this batch. When set, dispatch is governed by this limit rather than workspace/agent capacity percentages.

branch\_namestring

### Errors

422

Batch Calls Get Request Unprocessable Entity Error
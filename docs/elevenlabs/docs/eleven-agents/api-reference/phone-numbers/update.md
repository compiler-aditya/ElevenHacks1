# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/phone-numbers/update

Update assigned agent of a phone number

### Path parameters

phone\_number\_idstringRequired

The id of an agent. This is returned on agent creation.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

agent\_idstringOptional

labelstringOptional

inbound\_trunk\_configobjectOptional

Show 5 properties

outbound\_trunk\_configobjectOptional

Show 5 properties

livekit\_stackenumOptionalDefaults to `standard`

Allowed values:standardstatic

### Response

Successful Response

twilioobject

Show 7 properties

OR

sip\_trunkobject

Show 11 properties

### Errors

422

Phone Numbers Update Request Unprocessable Entity Error
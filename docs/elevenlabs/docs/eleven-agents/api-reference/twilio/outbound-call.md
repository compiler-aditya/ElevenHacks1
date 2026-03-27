# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/twilio/outbound-call

Handle an outbound call via Twilio

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

agent\_idstringRequired

agent\_phone\_number\_idstringRequired

to\_numberstringRequired

conversation\_initiation\_client\_dataobjectOptional

Show 7 properties

call\_recording\_enabledbooleanOptional

Whether let Twilio record the call.

telephony\_call\_configobjectOptional

Show 1 properties

### Response

Successful Response

successboolean

messagestring

conversation\_idstring

callSidstring

### Errors

422

Twilio Outbound Call Request Unprocessable Entity Error
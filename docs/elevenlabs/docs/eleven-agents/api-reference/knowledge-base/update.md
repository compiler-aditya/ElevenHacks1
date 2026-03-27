# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/update

Update the name of a document

### Path parameters

documentation\_idstringRequired

The id of a document from the knowledge base. This is returned on document addition.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

namestringRequired`>=1 character`

A custom, human-readable name for the document.

### Response

Successful Response

urlobject

Show 11 properties

OR

fileobject

Show 10 properties

OR

textobject

Show 9 properties

OR

folderobject

Show 10 properties

### Errors

422

Documents Update Request Unprocessable Entity Error
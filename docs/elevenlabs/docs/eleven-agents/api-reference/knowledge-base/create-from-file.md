# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/create-from-file

Create a knowledge base document generated form the uploaded file.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects a multipart form containing a file.

filefileRequired

Documentation that the agent will have access to in order to interact with users.

namestringOptional`>=1 character`

A custom, human-readable name for the document.

parent\_folder\_idstringOptional

If set, the created document or folder will be placed inside the given folder.

### Response

Successful Response

idstring

namestring

folder\_pathlist of objects

The folder path segments leading to this entity, from root to parent folder.

Show 1 properties

### Errors

422

Documents Create from File Request Unprocessable Entity Error
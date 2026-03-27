# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/compute-rag-index

In case the document is not RAG indexed, it triggers rag indexing task, otherwise it just returns the current status.

### Path parameters

documentation\_idstringRequired

The id of a document from the knowledge base. This is returned on document addition.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

modelenumRequiredDefaults to `e5_mistral_7b_instruct`

Allowed values:e5\_mistral\_7b\_instructmultilingual\_e5\_large\_instruct

### Response

Successful Response

idstring

modelenumDefaults to `e5_mistral_7b_instruct`

Allowed values:e5\_mistral\_7b\_instructmultilingual\_e5\_large\_instruct

statusenum

Show 8 enum values

progress\_percentagedouble

document\_model\_index\_usageobject

Show 1 properties

### Errors

422

Document Compute Rag Index Request Unprocessable Entity Error
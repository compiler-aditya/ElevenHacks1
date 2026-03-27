# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/tools/create

Add a new tool to the available tools in the workspace.

### Headers

xi-api-keystringOptional

### Request

A tool that an agent can provide to LLM.

tool\_configobjectRequired

Configuration for the tool

Show 4 variants

response\_mockslist of objectsOptional

Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins.

Show 2 properties

### Response

Successful Response

idstring

tool\_configobject

The type of tool

Show 4 variants

access\_infoobject

Show 4 properties

usage\_statsobject

Show 2 properties

response\_mockslist of objects

Mock responses with optional parameter conditions. Evaluated top-to-bottom; first match wins.

Show 2 properties

### Errors

422

Tools Create Request Unprocessable Entity Error
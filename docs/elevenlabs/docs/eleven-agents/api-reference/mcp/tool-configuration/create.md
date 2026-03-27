# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/create

Create configuration overrides for a specific MCP tool.

### Path parameters

mcp\_server\_idstringRequired

ID of the MCP Server.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

tool\_namestringRequired

The name of the MCP tool

force\_pre\_tool\_speechbooleanOptional

If set, overrides the server’s force\_pre\_tool\_speech setting for this tool

disable\_interruptionsbooleanOptional

If set, overrides the server’s disable\_interruptions setting for this tool

tool\_call\_soundenumOptional

If set, overrides the server’s tool\_call\_sound setting for this tool

Allowed values:typingelevator1elevator2elevator3elevator4

tool\_call\_sound\_behaviorenumOptionalDefaults to `auto`

If set, overrides the server’s tool\_call\_sound\_behavior setting for this tool

Allowed values:autoalways

execution\_modeenumOptionalDefaults to `immediate`

If set, overrides the server’s execution\_mode setting for this tool

Allowed values:immediatepost\_tool\_speechasync

assignmentslist of objectsOptional

Dynamic variable assignments for this MCP tool

Show 4 properties

input\_overridesmap from strings to optional objectsOptional

Mapping of json path to input override configuration

Show 3 variants

### Response

Successful Response

idstring

configobject

Show 16 properties

metadataobject

The metadata of the MCP Server

Show 2 properties

access\_infoobject

The access information of the MCP Server

Show 4 properties

dependent\_agentslist of objects

List of agents that depend on this MCP Server.

Show 2 variants

### Errors

409

Tool Configs Create Request Conflict Error

422

Tool Configs Create Request Unprocessable Entity Error

[![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/663498a0b1b5ebb51d2a1b7b00c6cae85ac04642aa9bbb77300bb75ad3c9e0f2/assets/logo-light.svg)![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/719d1ba287dd515473e93bae4cdea32f23f0a7336f03dd9fd8abcfd951b012aa/assets/logo-dark.svg)](https://elevenlabs.io/docs/overview/intro)

[Login](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/create)

[Login](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/create)

[Community](https://discord.gg/elevenlabs) [Blog](https://elevenlabs.io/blog) [Help Center](https://help.elevenlabs.io/hc/en-us) [API Pricing](https://elevenlabs.io/pricing/api) [Sign up](https://elevenlabs.io/app/sign-up)
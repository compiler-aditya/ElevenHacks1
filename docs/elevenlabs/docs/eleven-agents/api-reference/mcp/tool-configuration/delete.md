# Source: https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/delete

Remove configuration overrides for a specific MCP tool.

### Path parameters

mcp\_server\_idstringRequired

ID of the MCP Server.

tool\_namestringRequired

Name of the MCP tool to remove config overrides for.

### Headers

xi-api-keystringOptional

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

422

Tool Configs Delete Request Unprocessable Entity Error

[![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/663498a0b1b5ebb51d2a1b7b00c6cae85ac04642aa9bbb77300bb75ad3c9e0f2/assets/logo-light.svg)![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/719d1ba287dd515473e93bae4cdea32f23f0a7336f03dd9fd8abcfd951b012aa/assets/logo-dark.svg)](https://elevenlabs.io/docs/overview/intro)

[Login](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/delete)

[Login](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/delete)

[Community](https://discord.gg/elevenlabs) [Blog](https://elevenlabs.io/blog) [Help Center](https://help.elevenlabs.io/hc/en-us) [API Pricing](https://elevenlabs.io/pricing/api) [Sign up](https://elevenlabs.io/app/sign-up)
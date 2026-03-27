# Source: https://elevenlabs.io/docs/api-reference/workspace/resources/get

Gets the metadata of a resource by ID.

### Path parameters

resource\_idstringRequired

The ID of the target resource.

### Headers

xi-api-keystringOptional

### Query parameters

resource\_typeenumRequired

Resource type of the target resource.

Show 36 enum values

### Response

Successful Response

resource\_idstring

The ID of the resource.

resource\_typeenum

The type of the resource.

Show 36 enum values

role\_to\_group\_idsmap from strings to lists of strings

A mapping of roles to group IDs. When the resource is shared with a user, the group id is the user's id.

share\_optionslist of objects

List of options for sharing the resource further in the workspace. These are users who don't have access to the resource yet.

Show 3 properties

resource\_namestring

The name of the resource, if available.

creator\_user\_idstring

The ID of the user who created the resource.

anonymous\_access\_level\_overrideenum

The access level for anonymous users. If None, the resource is not shared publicly.

Allowed values:admineditorcommenterviewer

### Errors

422

Resources Get Request Unprocessable Entity Error

[![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/663498a0b1b5ebb51d2a1b7b00c6cae85ac04642aa9bbb77300bb75ad3c9e0f2/assets/logo-light.svg)![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/719d1ba287dd515473e93bae4cdea32f23f0a7336f03dd9fd8abcfd951b012aa/assets/logo-dark.svg)](https://elevenlabs.io/docs/overview/intro)

[Login](https://elevenlabs.io/docs/api-reference/workspace/resources/get)

[Login](https://elevenlabs.io/docs/api-reference/workspace/resources/get)

[Community](https://discord.gg/elevenlabs) [Blog](https://elevenlabs.io/blog) [Help Center](https://help.elevenlabs.io/hc/en-us) [API Pricing](https://elevenlabs.io/pricing/api) [Sign up](https://elevenlabs.io/app/sign-up)
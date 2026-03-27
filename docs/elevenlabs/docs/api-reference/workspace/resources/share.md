# Source: https://elevenlabs.io/docs/api-reference/workspace/resources/share

Grants a role on a workspace resource to a user or a group. It overrides any existing role this user/service account/group/workspace api key has on the resource. To target a user or service account, pass only the user email. The user must be in your workspace. To target a group, pass only the group id. To target a workspace api key, pass the api key id. The resource will be shared with the service account associated with the api key. You must have admin access to the resource to share it.

### Path parameters

resource\_idstringRequired

The ID of the target resource.

### Headers

xi-api-keystringOptional

### Request

This endpoint expects an object.

roleenumRequired

Role to update the target principal with.

Allowed values:admineditorcommenterviewer

resource\_typeenumRequired

Resource type of the target resource.

Show 36 enum values

user\_emailstringOptional

The email of the user or service account.

group\_idstringOptional

The ID of the target group. To target the permissions principals have by default on this resource, use the value 'default'.

workspace\_api\_key\_idstringOptional

The ID of the target workspace API key. This isn't the same as the key itself that would you pass in the header for authentication. Workspace admins can find this in the workspace settings UI.

### Response

Successful Response

### Errors

422

Resources Share Request Unprocessable Entity Error

[![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/663498a0b1b5ebb51d2a1b7b00c6cae85ac04642aa9bbb77300bb75ad3c9e0f2/assets/logo-light.svg)![Logo](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/719d1ba287dd515473e93bae4cdea32f23f0a7336f03dd9fd8abcfd951b012aa/assets/logo-dark.svg)](https://elevenlabs.io/docs/overview/intro)

[Login](https://elevenlabs.io/docs/api-reference/workspace/resources/share)

[Login](https://elevenlabs.io/docs/api-reference/workspace/resources/share)

[Community](https://discord.gg/elevenlabs) [Blog](https://elevenlabs.io/blog) [Help Center](https://help.elevenlabs.io/hc/en-us) [API Pricing](https://elevenlabs.io/pricing/api) [Sign up](https://elevenlabs.io/app/sign-up)

Grants a role on a workspace resource to a user or a group. It overrides any existing role this user/service account/group/workspace api key has on the resource. To target a user or service account, pass only the user email. The user must be in your workspace. To target a group, pass only the group id. To target a workspace api key, pass the api key id. The resource will be shared with the service account associated with the api key. You must have admin access to the resource to share it.
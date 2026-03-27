# Source: https://elevenlabs.io/docs/api-reference/user/get

Gets information about the user

### Headers

xi-api-keystringOptional

### Response

Successful Response

user\_idstring

The unique identifier of the user.

subscriptionobject

Details of the user's subscription.

Show 20 properties

is\_onboarding\_completedboolean

Whether the user's onboarding is completed.

is\_onboarding\_checklist\_completedboolean

Whether the user's onboarding checklist is completed.

created\_atinteger

The unix timestamp of the user's creation. 0 if the user was created before the unix timestamp was added.

seat\_typeenum

The seat type of the user.

Allowed values:workspace\_adminworkspace\_memberworkspace\_lite\_member

is\_new\_userbooleanDeprecated

Whether the user is new. This field is deprecated and will be removed in the future. Use ‘created\_at’ instead.

can\_use\_delayed\_payment\_methodsbooleanDeprecated

This field is deprecated and will be removed in a future major version. Instead use subscription.trust\_on\_invoice\_creation.

xi\_api\_keystring

The API key of the user.

show\_compliance\_termsbooleanDefaults to `false`

Whether to show compliance terms (ToS, Privacy Policy, biometric consent) during onboarding. Set for users signing up from the marketing site.

first\_namestring

First name of the user.

is\_api\_key\_hashedbooleanDefaults to `false`

Whether the user's API key is hashed.

xi\_api\_key\_previewstring

The preview of the user's API key.

referral\_link\_codestring

The referral link code of the user.

partnerstack\_partner\_default\_linkstring

The Partnerstack partner default link of the user.

### Errors

422

User Get Request Unprocessable Entity Error
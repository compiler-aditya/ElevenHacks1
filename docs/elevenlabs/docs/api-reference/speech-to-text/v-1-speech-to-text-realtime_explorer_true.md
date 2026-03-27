# Source: https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime?explorer=true

Realtime speech-to-text transcription service. This WebSocket API enables streaming audio input and receiving transcription results.

## Event Flow

- Audio chunks are sent as `input_audio_chunk` messages
- Transcription results are streamed back in various formats (partial, committed, with timestamps)
- Supports manual commit or VAD-based automatic commit strategies

Authentication is done either by providing a valid API key in the `xi-api-key` header or by providing a valid token in the `token` query parameter. Tokens can be generated from the [single use token endpoint](https://elevenlabs.io/docs/api-reference/tokens/create). Use tokens if you want to transcribe audio from the client side.

## HandshakeTry it

WSS

wss://api.elevenlabs.io/v1/speech-to-text/realtime

### Headers

xi-api-keystringOptional

### Query parameters

model\_idstringRequired

ID of the model to use for transcription.

tokenstringOptional

Single use token for authentication. Only used when initiating a session from the client. If provided, `xi-api-key` is no longer required for authentication.

include\_timestampsbooleanOptionalDefaults to `false`

Whether to receive the `committed_transcript_with_timestamps` event, which includes word-level timestamps.

include\_language\_detectionbooleanOptionalDefaults to `false`

Whether to include the detected language code in the `committed_transcript_with_timestamps` event.

audio\_formatenumOptionalDefaults to `pcm_16000`

Audio encoding format for speech-to-text.

Show 7 enum values

language\_codestringOptional

Language code in ISO 639-1 or ISO 639-3 format.

commit\_strategyenumOptionalDefaults to `manual`

Strategy for committing transcriptions.

Allowed values:manualvad

vad\_silence\_threshold\_secsdoubleOptional`0.3-3`Defaults to `1.5`

Silence threshold in seconds for VAD.

vad\_thresholddoubleOptional`0.1-0.9`Defaults to `0.4`

Threshold for voice activity detection.

min\_speech\_duration\_msintegerOptional`50-2000`Defaults to `100`

Minimum speech duration in milliseconds.

min\_silence\_duration\_msintegerOptional`50-2000`Defaults to `100`

Minimum silence duration in milliseconds.

enable\_loggingbooleanOptionalDefaults to `true`

When enable\_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request. Zero retention mode may only be used by enterprise customers.

### Send

publishobjectRequired

Show 5 properties

### Receive

Session Started PayloadobjectRequired

Show 3 properties

OR

Partial Transcript PayloadobjectRequired

Show 2 properties

OR

Committed Transcript PayloadobjectRequired

Show 2 properties

OR

Committed Transcript with Timestamps PayloadobjectRequired

Show 4 properties

OR

Scribe Error PayloadobjectRequired

Show 2 properties

OR

Scribe Auth Error PayloadobjectRequired

Show 2 properties

OR

Scribe Quota Exceeded Error PayloadobjectRequired

Show 2 properties

OR

Scribe Throttled Error PayloadobjectRequired

Show 2 properties

OR

Scribe Unaccepted Terms Error PayloadobjectRequired

Show 2 properties

OR

Scribe Rate Limited Error PayloadobjectRequired

Show 2 properties

OR

Scribe Queue Overflow Error PayloadobjectRequired

Show 2 properties

OR

Scribe Resource Exhausted Error PayloadobjectRequired

Show 2 properties

OR

Scribe Session Time Limit Exceeded Error PayloadobjectRequired

Show 2 properties

OR

Scribe Input Error PayloadobjectRequired

Show 2 properties

OR

Scribe Chunk Size Exceeded Error PayloadobjectRequired

Show 2 properties

OR

Scribe Insufficient Audio Activity Error PayloadobjectRequired

Show 2 properties

OR

Scribe Transcriber Error PayloadobjectRequired

Show 2 properties

## API Explorer

Browse, explore, and try out API endpoints without leaving the documentation.

- API reference

  - [WSSAgent WebSockets](https://elevenlabs.io/docs/eleven-agents/api-reference/eleven-agents/websocket?explorer=true)
- API referenceAgents

  - [POSTCreate agent](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/create?explorer=true)
  - [GETGet agent](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/get?explorer=true)
  - [GETList agents](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/list?explorer=true)
  - [PATCHUpdate agent](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/update?explorer=true)
  - [DELDelete agent](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/delete?explorer=true)
  - [POSTDuplicate agent](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/duplicate?explorer=true)
  - [GETGet link](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/get-link?explorer=true)
  - [POSTSimulate conversation](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/simulate-conversation?explorer=true)
  - [POSTStream simulate conversation](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/simulate-conversation-stream?explorer=true)
  - [POSTCalculate expected LLM usage](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/calculate?explorer=true)
  - [GETGet agent summaries](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/get-summaries?explorer=true)
- API referenceAgentsBranches

  - [GETList agent branches](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/list?explorer=true)
  - [POSTCreate agent branch](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/create?explorer=true)
  - [GETGet agent branch](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/get?explorer=true)
  - [PATCHUpdate agent branch](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/update?explorer=true)
  - [DELDelete agent branch](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/delete?explorer=true)
  - [POSTMerge agent branch](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/branches/merge?explorer=true)
- API referenceAgentsDeployments

  - [POSTCreate deployment](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/deployments/create?explorer=true)
- API referenceAgentsDrafts

  - [POSTCreate draft](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/drafts/create?explorer=true)
  - [DELDelete draft](https://elevenlabs.io/docs/eleven-agents/api-reference/agents/drafts/delete?explorer=true)
- API referenceConversations

  - [GETList conversations](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/list?explorer=true)
  - [GETGet conversation details](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/get?explorer=true)
  - [DELDelete conversation](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/delete?explorer=true)
  - [GETGet conversation audio](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/get-audio?explorer=true)
  - [GETGet signed URL](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/get-signed-url?explorer=true)
  - [GETGet conversation token](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/get-webrtc-token?explorer=true)
  - [POSTSend conversation feedback](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/create?explorer=true)
  - [POSTUpload conversation file](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/upload-file?explorer=true)
  - [DELDelete conversation file](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/delete-file?explorer=true)
- API referenceConversationsMessages

  - [GETText search](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/messages/text-search?explorer=true)
  - [GETSmart search](https://elevenlabs.io/docs/eleven-agents/api-reference/conversations/messages/search?explorer=true)
- API referenceUsers

  - [GETList users](https://elevenlabs.io/docs/eleven-agents/api-reference/users/list?explorer=true)
- API referenceTools

  - [GETList tools](https://elevenlabs.io/docs/eleven-agents/api-reference/tools/list?explorer=true)
  - [GETGet tool](https://elevenlabs.io/docs/eleven-agents/api-reference/tools/get?explorer=true)
  - [POSTCreate tool](https://elevenlabs.io/docs/eleven-agents/api-reference/tools/create?explorer=true)
  - [PATCHUpdate tool](https://elevenlabs.io/docs/eleven-agents/api-reference/tools/update?explorer=true)
  - [DELDelete tool](https://elevenlabs.io/docs/eleven-agents/api-reference/tools/delete?explorer=true)
  - [GETGet dependent agents](https://elevenlabs.io/docs/eleven-agents/api-reference/tools/get-dependent-agents?explorer=true)
- API referenceKnowledge Base

  - [GETGet dependent agents](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-agents?explorer=true)
  - [GETGet knowledge base size](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/size?explorer=true)
  - [GETGet knowledge base summaries](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-summaries?explorer=true)
- API referenceKnowledge BaseDocuments

  - [GETList knowledge base documents](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/list?explorer=true)
  - [DELDelete knowledge base document](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/delete?explorer=true)
  - [GETGet knowledge base document](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-document?explorer=true)
  - [PATCHUpdate knowledge base document](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/update?explorer=true)
  - [POSTCreate knowledge base document from URL](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/create-from-url?explorer=true)
  - [POSTCreate knowledge base document from text](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/create-from-text?explorer=true)
  - [POSTCreate knowledge base document from file](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/create-from-file?explorer=true)
  - [GETGet document content](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-content?explorer=true)
  - [GETGet document chunk](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-chunk?explorer=true)
  - [GETGet source file URL](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-source-file-url?explorer=true)
  - [POSTRefresh knowledge base document](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/refresh?explorer=true)
- API referenceKnowledge BaseFolders

  - [POSTCreate folder](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/create-folder?explorer=true)
  - [POSTMove document](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/move-document?explorer=true)
  - [POSTBulk move documents](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/bulk-move?explorer=true)
- API referenceKnowledge BaseRAG

  - [POSTCompute RAG index](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/compute-rag-index?explorer=true)
  - [GETGet RAG index](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/get-rag-index?explorer=true)
  - [GETGet RAG index overview](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/rag-index-overview?explorer=true)
  - [POSTCompute RAG index in batch](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/compute-rag-index-batch?explorer=true)
  - [DELDelete RAG index](https://elevenlabs.io/docs/eleven-agents/api-reference/knowledge-base/delete-rag-index?explorer=true)
- API referenceTests

  - [GETList tests](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/list?explorer=true)
  - [GETGet test](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/get?explorer=true)
  - [POSTCreate test](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/create?explorer=true)
  - [PUTUpdate test](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/update?explorer=true)
  - [DELDelete test](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/delete?explorer=true)
  - [POSTGet test summaries](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/summaries?explorer=true)
  - [POSTRun tests on agent](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/run-tests?explorer=true)
- API referenceTestsTest Invocations

  - [GETGet test invocation](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/test-invocations/get?explorer=true)
  - [POSTResubmit test invocation](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/test-invocations/resubmit?explorer=true)
  - [GETList test invocations](https://elevenlabs.io/docs/eleven-agents/api-reference/tests/test-invocations/list?explorer=true)
- API referencePhone Numbers

  - [POSTImport phone number](https://elevenlabs.io/docs/eleven-agents/api-reference/phone-numbers/create?explorer=true)
  - [GETList phone numbers](https://elevenlabs.io/docs/eleven-agents/api-reference/phone-numbers/list?explorer=true)
  - [GETGet phone number](https://elevenlabs.io/docs/eleven-agents/api-reference/phone-numbers/get?explorer=true)
  - [PATCHUpdate phone number](https://elevenlabs.io/docs/eleven-agents/api-reference/phone-numbers/update?explorer=true)
  - [DELDelete phone number](https://elevenlabs.io/docs/eleven-agents/api-reference/phone-numbers/delete?explorer=true)
- API referenceWidget

  - [GETGet widget](https://elevenlabs.io/docs/eleven-agents/api-reference/widget/get?explorer=true)
  - [POSTCreate widget avatar](https://elevenlabs.io/docs/eleven-agents/api-reference/widget/create?explorer=true)
- API referenceWorkspaceSettings

  - [GETGet settings](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/get?explorer=true)
  - [PATCHUpdate settings](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/update?explorer=true)
- API referenceWorkspaceSecrets

  - [GETGet secrets](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/secrets/list?explorer=true)
  - [POSTCreate secret](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/secrets/create?explorer=true)
  - [PATCHUpdate secret](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/secrets/update?explorer=true)
  - [DELDelete secret](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/secrets/delete?explorer=true)
- API referenceWorkspaceDashboard

  - [GETGet dashboard settings](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/dashboard/get?explorer=true)
  - [PATCHUpdate Convai Dashboard Settings](https://elevenlabs.io/docs/eleven-agents/api-reference/workspace/dashboard/update?explorer=true)
- API referenceSIP Trunk

  - [POSTOutbound call via SIP trunk](https://elevenlabs.io/docs/eleven-agents/api-reference/sip-trunk/outbound-call?explorer=true)
- API referenceTwilio

  - [POSTOutbound call via twilio](https://elevenlabs.io/docs/eleven-agents/api-reference/twilio/outbound-call?explorer=true)
  - [POSTRegister call](https://elevenlabs.io/docs/eleven-agents/api-reference/twilio/register-call?explorer=true)
- API referenceWhatsApp

  - [POSTOutbound call via WhatsApp](https://elevenlabs.io/docs/eleven-agents/api-reference/whats-app/outbound-call?explorer=true)
  - [POSTOutbound message via WhatsApp](https://elevenlabs.io/docs/eleven-agents/api-reference/whats-app/outbound-message?explorer=true)
- API referenceWhatsAppAccounts

  - [GETList WhatsApp accounts](https://elevenlabs.io/docs/eleven-agents/api-reference/whats-app/accounts/list?explorer=true)
  - [GETGet WhatsApp account](https://elevenlabs.io/docs/eleven-agents/api-reference/whats-app/accounts/get?explorer=true)
  - [PATCHUpdate WhatsApp account](https://elevenlabs.io/docs/eleven-agents/api-reference/whats-app/accounts/update?explorer=true)
  - [DELDelete WhatsApp account](https://elevenlabs.io/docs/eleven-agents/api-reference/whats-app/accounts/delete?explorer=true)
- API referenceBatch Calling

  - [POSTSubmit batch calling job](https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/create?explorer=true)
  - [GETList workspace batch calling jobs](https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/list?explorer=true)
  - [GETGet batch call information](https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/get?explorer=true)
  - [POSTCancel batch calling job](https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/cancel?explorer=true)
  - [POSTRetry batch calling job](https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/retry?explorer=true)
  - [DELDelete batch calling job](https://elevenlabs.io/docs/eleven-agents/api-reference/batch-calling/delete?explorer=true)
- API referenceLLM

  - [GETList LLMs](https://elevenlabs.io/docs/eleven-agents/api-reference/llm/list?explorer=true)
  - [POSTCalculate expected LLM usage](https://elevenlabs.io/docs/eleven-agents/api-reference/llm/calculate?explorer=true)
- API referenceMCP

  - [POSTCreate MCP server](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/create?explorer=true)
  - [DELDelete MCP server](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/delete?explorer=true)
  - [GETList MCP servers](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/list?explorer=true)
  - [GETGet MCP server](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/get?explorer=true)
  - [GETList MCP server tools](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/list-tools?explorer=true)
  - [PATCHUpdate MCP server configuration](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/update?explorer=true)
- API referenceMCPApproval Policies

  - [PATCHUpdate MCP server approval policy](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/approval-policies/update?explorer=true)
  - [POSTCreate MCP server tool approval](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/approval-policies/create?explorer=true)
  - [DELDelete MCP server tool approval](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/approval-policies/delete?explorer=true)
- API referenceMCPTool Configuration

  - [POSTCreate configuration override](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/create?explorer=true)
  - [GETGet configuration override](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/get?explorer=true)
  - [PATCHUpdate configuration override](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/update?explorer=true)
  - [DELDelete configuration override](https://elevenlabs.io/docs/eleven-agents/api-reference/mcp/tool-configuration/delete?explorer=true)
- API referenceAnalytics

  - [GETGet live count](https://elevenlabs.io/docs/eleven-agents/api-reference/analytics/get?explorer=true)
- API referenceEnvironment Variables

  - [GETList environment variables](https://elevenlabs.io/docs/eleven-agents/api-reference/environment-variables/list?explorer=true)
  - [POSTCreate environment variable](https://elevenlabs.io/docs/eleven-agents/api-reference/environment-variables/create?explorer=true)
  - [GETGet environment variable](https://elevenlabs.io/docs/eleven-agents/api-reference/environment-variables/get?explorer=true)
  - [PATCHUpdate environment variable](https://elevenlabs.io/docs/eleven-agents/api-reference/environment-variables/update?explorer=true)
- ElevenAgentsAgents

  - [POSTCreate agent](https://elevenlabs.io/docs/api-reference/agents/create?explorer=true)
  - [GETGet agent](https://elevenlabs.io/docs/api-reference/agents/get?explorer=true)
  - [GETList agents](https://elevenlabs.io/docs/api-reference/agents/list?explorer=true)
  - [PATCHUpdate agent](https://elevenlabs.io/docs/api-reference/agents/update?explorer=true)
  - [DELDelete agent](https://elevenlabs.io/docs/api-reference/agents/delete?explorer=true)
  - [POSTDuplicate agent](https://elevenlabs.io/docs/api-reference/agents/duplicate?explorer=true)
  - [GETGet link](https://elevenlabs.io/docs/api-reference/agents/get-link?explorer=true)
  - [POSTSimulate conversation](https://elevenlabs.io/docs/api-reference/agents/simulate-conversation?explorer=true)
  - [POSTStream simulate conversation](https://elevenlabs.io/docs/api-reference/agents/simulate-conversation-stream?explorer=true)
  - [POSTCalculate expected LLM usage](https://elevenlabs.io/docs/api-reference/agents/calculate?explorer=true)
  - [GETGet agent summaries](https://elevenlabs.io/docs/api-reference/agents/get-summaries?explorer=true)
- ElevenAgentsAgentsBranches

  - [GETList agent branches](https://elevenlabs.io/docs/api-reference/agents/branches/list?explorer=true)
  - [POSTCreate agent branch](https://elevenlabs.io/docs/api-reference/agents/branches/create?explorer=true)
  - [GETGet agent branch](https://elevenlabs.io/docs/api-reference/agents/branches/get?explorer=true)
  - [PATCHUpdate agent branch](https://elevenlabs.io/docs/api-reference/agents/branches/update?explorer=true)
  - [DELDelete agent branch](https://elevenlabs.io/docs/api-reference/agents/branches/delete?explorer=true)
  - [POSTMerge agent branch](https://elevenlabs.io/docs/api-reference/agents/branches/merge?explorer=true)
- ElevenAgentsAgentsDeployments

  - [POSTCreate deployment](https://elevenlabs.io/docs/api-reference/agents/deployments/create?explorer=true)
- ElevenAgentsAgentsDrafts

  - [POSTCreate draft](https://elevenlabs.io/docs/api-reference/agents/drafts/create?explorer=true)
  - [DELDelete draft](https://elevenlabs.io/docs/api-reference/agents/drafts/delete?explorer=true)
- ElevenAgentsConversations

  - [GETList conversations](https://elevenlabs.io/docs/api-reference/conversations/list?explorer=true)
  - [GETGet conversation details](https://elevenlabs.io/docs/api-reference/conversations/get?explorer=true)
  - [DELDelete conversation](https://elevenlabs.io/docs/api-reference/conversations/delete?explorer=true)
  - [GETGet conversation audio](https://elevenlabs.io/docs/api-reference/conversations/get-audio?explorer=true)
  - [GETGet signed URL](https://elevenlabs.io/docs/api-reference/conversations/get-signed-url?explorer=true)
  - [GETGet conversation token](https://elevenlabs.io/docs/api-reference/conversations/get-webrtc-token?explorer=true)
  - [POSTSend conversation feedback](https://elevenlabs.io/docs/api-reference/conversations/create?explorer=true)
  - [POSTUpload conversation file](https://elevenlabs.io/docs/api-reference/conversations/upload-file?explorer=true)
  - [DELDelete conversation file](https://elevenlabs.io/docs/api-reference/conversations/delete-file?explorer=true)
- ElevenAgentsConversationsMessages

  - [GETText search](https://elevenlabs.io/docs/api-reference/conversations/messages/text-search?explorer=true)
  - [GETSmart search](https://elevenlabs.io/docs/api-reference/conversations/messages/search?explorer=true)
- ElevenAgentsUsers

  - [GETList users](https://elevenlabs.io/docs/api-reference/users/list?explorer=true)
- ElevenAgentsTools

  - [GETList tools](https://elevenlabs.io/docs/api-reference/tools/list?explorer=true)
  - [GETGet tool](https://elevenlabs.io/docs/api-reference/tools/get?explorer=true)
  - [POSTCreate tool](https://elevenlabs.io/docs/api-reference/tools/create?explorer=true)
  - [PATCHUpdate tool](https://elevenlabs.io/docs/api-reference/tools/update?explorer=true)
  - [DELDelete tool](https://elevenlabs.io/docs/api-reference/tools/delete?explorer=true)
  - [GETGet dependent agents](https://elevenlabs.io/docs/api-reference/tools/get-dependent-agents?explorer=true)
- ElevenAgentsKnowledge Base

  - [GETGet dependent agents](https://elevenlabs.io/docs/api-reference/knowledge-base/get-agents?explorer=true)
  - [GETGet knowledge base size](https://elevenlabs.io/docs/api-reference/knowledge-base/size?explorer=true)
  - [GETGet knowledge base summaries](https://elevenlabs.io/docs/api-reference/knowledge-base/get-summaries?explorer=true)
- ElevenAgentsKnowledge BaseDocuments

  - [GETList knowledge base documents](https://elevenlabs.io/docs/api-reference/knowledge-base/list?explorer=true)
  - [DELDelete knowledge base document](https://elevenlabs.io/docs/api-reference/knowledge-base/delete?explorer=true)
  - [GETGet knowledge base document](https://elevenlabs.io/docs/api-reference/knowledge-base/get-document?explorer=true)
  - [PATCHUpdate knowledge base document](https://elevenlabs.io/docs/api-reference/knowledge-base/update?explorer=true)
  - [POSTCreate knowledge base document from URL](https://elevenlabs.io/docs/api-reference/knowledge-base/create-from-url?explorer=true)
  - [POSTCreate knowledge base document from text](https://elevenlabs.io/docs/api-reference/knowledge-base/create-from-text?explorer=true)
  - [POSTCreate knowledge base document from file](https://elevenlabs.io/docs/api-reference/knowledge-base/create-from-file?explorer=true)
  - [GETGet document content](https://elevenlabs.io/docs/api-reference/knowledge-base/get-content?explorer=true)
  - [GETGet document chunk](https://elevenlabs.io/docs/api-reference/knowledge-base/get-chunk?explorer=true)
  - [GETGet source file URL](https://elevenlabs.io/docs/api-reference/knowledge-base/get-source-file-url?explorer=true)
  - [POSTRefresh knowledge base document](https://elevenlabs.io/docs/api-reference/knowledge-base/refresh?explorer=true)
- ElevenAgentsKnowledge BaseFolders

  - [POSTCreate folder](https://elevenlabs.io/docs/api-reference/knowledge-base/create-folder?explorer=true)
  - [POSTMove document](https://elevenlabs.io/docs/api-reference/knowledge-base/move-document?explorer=true)
  - [POSTBulk move documents](https://elevenlabs.io/docs/api-reference/knowledge-base/bulk-move?explorer=true)
- ElevenAgentsKnowledge BaseRAG

  - [POSTCompute RAG index](https://elevenlabs.io/docs/api-reference/knowledge-base/compute-rag-index?explorer=true)
  - [GETGet RAG index](https://elevenlabs.io/docs/api-reference/knowledge-base/get-rag-index?explorer=true)
  - [GETGet RAG index overview](https://elevenlabs.io/docs/api-reference/knowledge-base/rag-index-overview?explorer=true)
  - [POSTCompute RAG index in batch](https://elevenlabs.io/docs/api-reference/knowledge-base/compute-rag-index-batch?explorer=true)
  - [DELDelete RAG index](https://elevenlabs.io/docs/api-reference/knowledge-base/delete-rag-index?explorer=true)
- ElevenAgentsTests

  - [GETList tests](https://elevenlabs.io/docs/api-reference/tests/list?explorer=true)
  - [GETGet test](https://elevenlabs.io/docs/api-reference/tests/get?explorer=true)
  - [POSTCreate test](https://elevenlabs.io/docs/api-reference/tests/create?explorer=true)
  - [PUTUpdate test](https://elevenlabs.io/docs/api-reference/tests/update?explorer=true)
  - [DELDelete test](https://elevenlabs.io/docs/api-reference/tests/delete?explorer=true)
  - [POSTGet test summaries](https://elevenlabs.io/docs/api-reference/tests/summaries?explorer=true)
  - [POSTRun tests on agent](https://elevenlabs.io/docs/api-reference/tests/run-tests?explorer=true)
- ElevenAgentsTestsTest Invocations

  - [GETGet test invocation](https://elevenlabs.io/docs/api-reference/tests/test-invocations/get?explorer=true)
  - [POSTResubmit test invocation](https://elevenlabs.io/docs/api-reference/tests/test-invocations/resubmit?explorer=true)
  - [GETList test invocations](https://elevenlabs.io/docs/api-reference/tests/test-invocations/list?explorer=true)
- ElevenAgentsPhone Numbers

  - [POSTImport phone number](https://elevenlabs.io/docs/api-reference/phone-numbers/create?explorer=true)
  - [GETList phone numbers](https://elevenlabs.io/docs/api-reference/phone-numbers/list?explorer=true)
  - [GETGet phone number](https://elevenlabs.io/docs/api-reference/phone-numbers/get?explorer=true)
  - [PATCHUpdate phone number](https://elevenlabs.io/docs/api-reference/phone-numbers/update?explorer=true)
  - [DELDelete phone number](https://elevenlabs.io/docs/api-reference/phone-numbers/delete?explorer=true)
- ElevenAgentsWidget

  - [GETGet widget](https://elevenlabs.io/docs/api-reference/widget/get?explorer=true)
  - [POSTCreate widget avatar](https://elevenlabs.io/docs/api-reference/widget/create?explorer=true)
- ElevenAgentsWorkspaceSettings

  - [GETGet settings](https://elevenlabs.io/docs/api-reference/workspace/get?explorer=true)
  - [PATCHUpdate settings](https://elevenlabs.io/docs/api-reference/workspace/update?explorer=true)
- ElevenAgentsWorkspaceSecrets

  - [GETGet secrets](https://elevenlabs.io/docs/api-reference/workspace/secrets/list?explorer=true)
  - [POSTCreate secret](https://elevenlabs.io/docs/api-reference/workspace/secrets/create?explorer=true)
  - [PATCHUpdate secret](https://elevenlabs.io/docs/api-reference/workspace/secrets/update?explorer=true)
  - [DELDelete secret](https://elevenlabs.io/docs/api-reference/workspace/secrets/delete?explorer=true)
- ElevenAgentsWorkspaceDashboard

  - [GETGet dashboard settings](https://elevenlabs.io/docs/api-reference/workspace/dashboard/get?explorer=true)
  - [PATCHUpdate Convai Dashboard Settings](https://elevenlabs.io/docs/api-reference/workspace/dashboard/update?explorer=true)
- ElevenAgentsSIP Trunk

  - [POSTOutbound call via SIP trunk](https://elevenlabs.io/docs/api-reference/sip-trunk/outbound-call?explorer=true)
- ElevenAgentsTwilio

  - [POSTOutbound call via twilio](https://elevenlabs.io/docs/api-reference/twilio/outbound-call?explorer=true)
  - [POSTRegister call](https://elevenlabs.io/docs/api-reference/twilio/register-call?explorer=true)
- ElevenAgentsWhatsApp

  - [POSTOutbound call via WhatsApp](https://elevenlabs.io/docs/api-reference/whats-app/outbound-call?explorer=true)
  - [POSTOutbound message via WhatsApp](https://elevenlabs.io/docs/api-reference/whats-app/outbound-message?explorer=true)
- ElevenAgentsWhatsAppAccounts

  - [GETList WhatsApp accounts](https://elevenlabs.io/docs/api-reference/whats-app/accounts/list?explorer=true)
  - [GETGet WhatsApp account](https://elevenlabs.io/docs/api-reference/whats-app/accounts/get?explorer=true)
  - [PATCHUpdate WhatsApp account](https://elevenlabs.io/docs/api-reference/whats-app/accounts/update?explorer=true)
  - [DELDelete WhatsApp account](https://elevenlabs.io/docs/api-reference/whats-app/accounts/delete?explorer=true)
- ElevenAgentsBatch Calling

  - [POSTSubmit batch calling job](https://elevenlabs.io/docs/api-reference/batch-calling/create?explorer=true)
  - [GETList workspace batch calling jobs](https://elevenlabs.io/docs/api-reference/batch-calling/list?explorer=true)
  - [GETGet batch call information](https://elevenlabs.io/docs/api-reference/batch-calling/get?explorer=true)
  - [POSTCancel batch calling job](https://elevenlabs.io/docs/api-reference/batch-calling/cancel?explorer=true)
  - [POSTRetry batch calling job](https://elevenlabs.io/docs/api-reference/batch-calling/retry?explorer=true)
  - [DELDelete batch calling job](https://elevenlabs.io/docs/api-reference/batch-calling/delete?explorer=true)
- ElevenAgentsLLM

  - [GETList LLMs](https://elevenlabs.io/docs/api-reference/llm/list?explorer=true)
  - [POSTCalculate expected LLM usage](https://elevenlabs.io/docs/api-reference/llm/calculate?explorer=true)
- ElevenAgentsMCP

  - [POSTCreate MCP server](https://elevenlabs.io/docs/api-reference/mcp/create?explorer=true)
  - [DELDelete MCP server](https://elevenlabs.io/docs/api-reference/mcp/delete?explorer=true)
  - [GETList MCP servers](https://elevenlabs.io/docs/api-reference/mcp/list?explorer=true)
  - [GETGet MCP server](https://elevenlabs.io/docs/api-reference/mcp/get?explorer=true)
  - [GETList MCP server tools](https://elevenlabs.io/docs/api-reference/mcp/list-tools?explorer=true)
  - [PATCHUpdate MCP server configuration](https://elevenlabs.io/docs/api-reference/mcp/update?explorer=true)
- ElevenAgentsMCPApproval Policies

  - [PATCHUpdate MCP server approval policy](https://elevenlabs.io/docs/api-reference/mcp/approval-policies/update?explorer=true)
  - [POSTCreate MCP server tool approval](https://elevenlabs.io/docs/api-reference/mcp/approval-policies/create?explorer=true)
  - [DELDelete MCP server tool approval](https://elevenlabs.io/docs/api-reference/mcp/approval-policies/delete?explorer=true)
- ElevenAgentsMCPTool Configuration

  - [POSTCreate configuration override](https://elevenlabs.io/docs/api-reference/mcp/tool-configuration/create?explorer=true)
  - [GETGet configuration override](https://elevenlabs.io/docs/api-reference/mcp/tool-configuration/get?explorer=true)
  - [PATCHUpdate configuration override](https://elevenlabs.io/docs/api-reference/mcp/tool-configuration/update?explorer=true)
  - [DELDelete configuration override](https://elevenlabs.io/docs/api-reference/mcp/tool-configuration/delete?explorer=true)
- ElevenAgentsAnalytics

  - [GETGet live count](https://elevenlabs.io/docs/api-reference/analytics/get?explorer=true)
- ElevenAgentsEnvironment Variables

  - [GETList environment variables](https://elevenlabs.io/docs/api-reference/environment-variables/list?explorer=true)
  - [POSTCreate environment variable](https://elevenlabs.io/docs/api-reference/environment-variables/create?explorer=true)
  - [GETGet environment variable](https://elevenlabs.io/docs/api-reference/environment-variables/get?explorer=true)
  - [PATCHUpdate environment variable](https://elevenlabs.io/docs/api-reference/environment-variables/update?explorer=true)
- ElevenAPIText to Speech

  - [WSSWebSocket](https://elevenlabs.io/docs/api-reference/text-to-speech/v-1-text-to-speech-voice-id-stream-input?explorer=true)
  - [WSSMulti-Context WebSocket](https://elevenlabs.io/docs/api-reference/text-to-speech/v-1-text-to-speech-voice-id-multi-stream-input?explorer=true)
  - [POSTCreate speech](https://elevenlabs.io/docs/api-reference/text-to-speech/convert?explorer=true)
  - [POSTCreate speech with timing](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps?explorer=true)
  - [POSTStream speech](https://elevenlabs.io/docs/api-reference/text-to-speech/stream?explorer=true)
  - [STREAMStream speech with timing](https://elevenlabs.io/docs/api-reference/text-to-speech/stream-with-timestamps?explorer=true)
- ElevenAPISpeech to Text

  - [WSSRealtime](https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime?explorer=true)
  - [GETGet transcript](https://elevenlabs.io/docs/api-reference/speech-to-text/get?explorer=true)
  - [DELDelete transcript](https://elevenlabs.io/docs/api-reference/speech-to-text/delete?explorer=true)
  - [POSTCreate transcript](https://elevenlabs.io/docs/api-reference/speech-to-text/convert?explorer=true)
- ElevenAPIMusic

  - [POSTCompose music](https://elevenlabs.io/docs/api-reference/music/compose?explorer=true)
  - [POSTStream music](https://elevenlabs.io/docs/api-reference/music/stream?explorer=true)
  - [POSTCompose music with details](https://elevenlabs.io/docs/api-reference/music/compose-detailed?explorer=true)
  - [POSTCreate composition plan](https://elevenlabs.io/docs/api-reference/music/create-composition-plan?explorer=true)
  - [POSTVideo To Music](https://elevenlabs.io/docs/api-reference/music/video-to-music?explorer=true)
  - [POSTUpload Music](https://elevenlabs.io/docs/api-reference/music/upload?explorer=true)
  - [POSTStem Separation](https://elevenlabs.io/docs/api-reference/music/separate-stems?explorer=true)
- ElevenAPIVoices

  - [GETList voices](https://elevenlabs.io/docs/api-reference/voices/search?explorer=true)
  - [GETGet voice](https://elevenlabs.io/docs/api-reference/voices/get?explorer=true)
  - [DELDelete voice](https://elevenlabs.io/docs/api-reference/voices/delete?explorer=true)
  - [POSTEdit voice](https://elevenlabs.io/docs/api-reference/voices/update?explorer=true)
  - [POSTList similar voices](https://elevenlabs.io/docs/api-reference/voices/find-similar-voices?explorer=true)
- ElevenAPIVoicesVoice library

  - [GETList shared voices](https://elevenlabs.io/docs/api-reference/voices/voice-library/get-shared?explorer=true)
  - [POSTAdd shared voice](https://elevenlabs.io/docs/api-reference/voices/voice-library/share?explorer=true)
- ElevenAPIVoicesPVC

  - [POSTCreate PVC voice](https://elevenlabs.io/docs/api-reference/voices/pvc/create?explorer=true)
  - [POSTUpdate PVC voice](https://elevenlabs.io/docs/api-reference/voices/pvc/update?explorer=true)
  - [POSTTrain PVC voice](https://elevenlabs.io/docs/api-reference/voices/pvc/train?explorer=true)
  - [POSTAdd samples to PVC voice](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/create?explorer=true)
  - [POSTUpdate PVC voice sample](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/update?explorer=true)
  - [DELDelete PVC voice sample](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/delete?explorer=true)
  - [GETGet PVC voice sample audio](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/get-audio?explorer=true)
  - [GETGet PVC voice sample waveform](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/get-waveform?explorer=true)
  - [GETGet PVC speaker separation status](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/get-speaker-separation-status?explorer=true)
  - [POSTStart speaker separation](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/separate-speakers?explorer=true)
  - [GETGet separated speaker audio](https://elevenlabs.io/docs/api-reference/voices/pvc/samples/get-separated-speaker-audio?explorer=true)
  - [POSTRequest PVC manual verification](https://elevenlabs.io/docs/api-reference/voices/pvc/verification/request?explorer=true)
  - [GETGet PVC verification captcha](https://elevenlabs.io/docs/api-reference/voices/pvc/verification/captcha?explorer=true)
  - [POSTVerify PVC verification captcha](https://elevenlabs.io/docs/api-reference/voices/pvc/verification/captcha/verify?explorer=true)
- ElevenAPIVoicesIVC

  - [POSTCreate IVC voice](https://elevenlabs.io/docs/api-reference/voices/ivc/create?explorer=true)
- ElevenAPIVoicesSamples

  - [GETGet voice sample audio](https://elevenlabs.io/docs/api-reference/voices/samples/get?explorer=true)
  - [DELDelete voice sample](https://elevenlabs.io/docs/api-reference/voices/samples/delete?explorer=true)
- ElevenAPIVoicesSettings

  - [GETGet default voice settings](https://elevenlabs.io/docs/api-reference/voices/settings/get-default?explorer=true)
  - [GETGet voice settings](https://elevenlabs.io/docs/api-reference/voices/settings/get?explorer=true)
  - [POSTEdit voice settings](https://elevenlabs.io/docs/api-reference/voices/settings/update?explorer=true)
- ElevenAPIText to Dialogue

  - [POSTCreate dialogue](https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert?explorer=true)
  - [POSTStream dialogue](https://elevenlabs.io/docs/api-reference/text-to-dialogue/stream?explorer=true)
  - [POSTCreate dialogue with timestamps](https://elevenlabs.io/docs/api-reference/text-to-dialogue/convert-with-timestamps?explorer=true)
  - [STREAMStream dialogue with timestamps](https://elevenlabs.io/docs/api-reference/text-to-dialogue/stream-with-timestamps?explorer=true)
- ElevenAPIVoice Changer

  - [POSTVoice changer](https://elevenlabs.io/docs/api-reference/speech-to-speech/convert?explorer=true)
  - [POSTVoice changer stream](https://elevenlabs.io/docs/api-reference/speech-to-speech/stream?explorer=true)
- ElevenAPIVoice Design

  - [POSTDesign a voice](https://elevenlabs.io/docs/api-reference/text-to-voice/design?explorer=true)
  - [POSTCreate a voice](https://elevenlabs.io/docs/api-reference/text-to-voice/create?explorer=true)
  - [POSTRemix a voice](https://elevenlabs.io/docs/api-reference/text-to-voice/remix?explorer=true)
  - [GETStream voice preview](https://elevenlabs.io/docs/api-reference/text-to-voice/stream?explorer=true)
- ElevenAPISound Effects

  - [POSTCreate sound effect](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert?explorer=true)
- ElevenAPIAudio Isolation

  - [POSTAudio isolation](https://elevenlabs.io/docs/api-reference/audio-isolation/convert?explorer=true)
  - [POSTAudio isolation stream](https://elevenlabs.io/docs/api-reference/audio-isolation/stream?explorer=true)
- ElevenAPIDubbing

  - [GETList Dubs](https://elevenlabs.io/docs/api-reference/dubbing/list?explorer=true)
  - [POSTDub a video or audio file](https://elevenlabs.io/docs/api-reference/dubbing/create?explorer=true)
  - [GETGet dubbing](https://elevenlabs.io/docs/api-reference/dubbing/get?explorer=true)
  - [DELDelete dubbing](https://elevenlabs.io/docs/api-reference/dubbing/delete?explorer=true)
- ElevenAPIDubbingResources (Enterprise, Closed Beta)

  - [GETGet dubbing resource](https://elevenlabs.io/docs/api-reference/dubbing/resources/get-resource?explorer=true)
  - [POSTCreate segment](https://elevenlabs.io/docs/api-reference/dubbing/resources/create-segment?explorer=true)
  - [DELDelete a segment](https://elevenlabs.io/docs/api-reference/dubbing/resources/delete-segment?explorer=true)
  - [PATCHUpdate a segment](https://elevenlabs.io/docs/api-reference/dubbing/resources/update-segment?explorer=true)
  - [POSTTranscribe segment](https://elevenlabs.io/docs/api-reference/dubbing/resources/transcribe-segment?explorer=true)
  - [POSTTranslate segment](https://elevenlabs.io/docs/api-reference/dubbing/resources/translate-segment?explorer=true)
  - [POSTDub segment](https://elevenlabs.io/docs/api-reference/dubbing/resources/dub-segment?explorer=true)
  - [POSTRender project](https://elevenlabs.io/docs/api-reference/dubbing/resources/render-project?explorer=true)
  - [POSTAdd language to resource](https://elevenlabs.io/docs/api-reference/dubbing/resources/add-language?explorer=true)
  - [POSTCreate speaker](https://elevenlabs.io/docs/api-reference/dubbing/resources/create-speaker?explorer=true)
  - [PATCHUpdate speaker](https://elevenlabs.io/docs/api-reference/dubbing/resources/update-speaker?explorer=true)
  - [GETGet similar voices](https://elevenlabs.io/docs/api-reference/dubbing/resources/get-similar-voices?explorer=true)
  - [POSTMigrate segments](https://elevenlabs.io/docs/api-reference/dubbing/resources/migrate-segments?explorer=true)
- ElevenAPIDubbingAudio

  - [GETGet dubbed audio](https://elevenlabs.io/docs/api-reference/dubbing/audio/get?explorer=true)
- ElevenAPIDubbingTranscripts

  - [GETRetrieve A Transcript](https://elevenlabs.io/docs/api-reference/dubbing/transcripts/get?explorer=true)
- ElevenAPIForced Alignment

  - [POSTCreate Forced Alignment](https://elevenlabs.io/docs/api-reference/forced-alignment/create?explorer=true)
- ElevenAPIPronunciation Dictionaries

  - [POSTCreate a pronunciation dictionary from a file](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/create-from-file?explorer=true)
  - [POSTCreate a pronunciation dictionary from rules](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/create-from-rules?explorer=true)
  - [GETGet pronunciation dictionary](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/get?explorer=true)
  - [PATCHUpdate Pronunciation Dictionary](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/update?explorer=true)
  - [GETGet pronunciation dictionary by version](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/download?explorer=true)
  - [GETList pronunciation dictionaries](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/list?explorer=true)
- ElevenAPIPronunciation DictionariesRules

  - [POSTSet pronunciation dictionary rules](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/rules/set?explorer=true)
  - [POSTAdd pronunciation dictionary rules](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/rules/add?explorer=true)
  - [POSTRemove pronunciation dictionary rules](https://elevenlabs.io/docs/api-reference/pronunciation-dictionaries/rules/remove?explorer=true)
- ElevenAPIAudio Native

  - [POSTCreate audio native project](https://elevenlabs.io/docs/api-reference/audio-native/create?explorer=true)
  - [GETGet Audio Native Project Settings](https://elevenlabs.io/docs/api-reference/audio-native/get-settings?explorer=true)
  - [POSTUpdate audio native project](https://elevenlabs.io/docs/api-reference/audio-native/update?explorer=true)
  - [POSTUpdate Audio-Native Content From Url](https://elevenlabs.io/docs/api-reference/audio-native/update-content-from-url?explorer=true)
- ElevenCreativeStudio

  - [GETList Studio Projects](https://elevenlabs.io/docs/api-reference/studio/get-projects?explorer=true)
  - [POSTUpdate Studio Project](https://elevenlabs.io/docs/api-reference/studio/edit-project?explorer=true)
  - [GETGet Studio Project](https://elevenlabs.io/docs/api-reference/studio/get-project?explorer=true)
  - [POSTCreate Studio Project](https://elevenlabs.io/docs/api-reference/studio/add-project?explorer=true)
  - [DELDelete Studio Project](https://elevenlabs.io/docs/api-reference/studio/delete-project?explorer=true)
  - [POSTConvert Studio Project](https://elevenlabs.io/docs/api-reference/studio/convert-project?explorer=true)
  - [POSTUpdate Studio Project Content](https://elevenlabs.io/docs/api-reference/studio/update-content?explorer=true)
  - [GETList Studio Project Snapshots](https://elevenlabs.io/docs/api-reference/studio/get-snapshots?explorer=true)
  - [GETGet Project Muted Tracks](https://elevenlabs.io/docs/api-reference/studio/get-muted-tracks?explorer=true)
  - [POSTStream Studio Project Audio](https://elevenlabs.io/docs/api-reference/studio/stream-snapshot?explorer=true)
  - [POSTStream Archive With Studio Project Audio](https://elevenlabs.io/docs/api-reference/studio/archive-snapshot?explorer=true)
  - [GETList Chapters](https://elevenlabs.io/docs/api-reference/studio/get-chapters?explorer=true)
  - [GETGet Chapter](https://elevenlabs.io/docs/api-reference/studio/get-chapter?explorer=true)
  - [POSTCreate Chapter](https://elevenlabs.io/docs/api-reference/studio/add-chapter?explorer=true)
  - [POSTUpdate Chapter](https://elevenlabs.io/docs/api-reference/studio/update-chapter?explorer=true)
  - [DELDelete Chapter](https://elevenlabs.io/docs/api-reference/studio/delete-chapter?explorer=true)
  - [POSTConvert Chapter](https://elevenlabs.io/docs/api-reference/studio/convert-chapter?explorer=true)
  - [GETList Chapter Snapshots](https://elevenlabs.io/docs/api-reference/studio/get-chapter-snapshots?explorer=true)
  - [POSTStream Chapter Audio](https://elevenlabs.io/docs/api-reference/studio/stream-chapter-snapshot?explorer=true)
  - [POSTCreate Pronunciation Dictionaries](https://elevenlabs.io/docs/api-reference/studio/create-pronunciation-dictionaries?explorer=true)
  - [POSTCreate Podcast](https://elevenlabs.io/docs/api-reference/studio/create-podcast?explorer=true)
  - [GETGet Chapter Snapshot](https://elevenlabs.io/docs/api-reference/studio/get-chapter-snapshot?explorer=true)
  - [GETGet Project Snapshot](https://elevenlabs.io/docs/api-reference/studio/get-project-snapshot?explorer=true)
- Core ResourcesHistory

  - [GETGet generated items](https://elevenlabs.io/docs/api-reference/history/list?explorer=true)
  - [GETGet history item](https://elevenlabs.io/docs/api-reference/history/get?explorer=true)
  - [DELDelete history item](https://elevenlabs.io/docs/api-reference/history/delete?explorer=true)
  - [GETGet audio from history item](https://elevenlabs.io/docs/api-reference/history/get-audio?explorer=true)
  - [POSTDownload history items](https://elevenlabs.io/docs/api-reference/history/download?explorer=true)
- Core ResourcesModels

  - [GETList models](https://elevenlabs.io/docs/api-reference/models/list?explorer=true)
- Core ResourcesTokens

  - [POSTCreate Single Use Token](https://elevenlabs.io/docs/api-reference/tokens/create?explorer=true)
- WorkspaceUsage

  - [GETGet character usage metrics](https://elevenlabs.io/docs/api-reference/usage/get?explorer=true)
- WorkspaceUser

  - [GETGet user](https://elevenlabs.io/docs/api-reference/user/get?explorer=true)
- WorkspaceUserSubscription

  - [GETGet user subscription](https://elevenlabs.io/docs/api-reference/user/subscription/get?explorer=true)
- WorkspaceService Accounts

  - [GETGet service accounts](https://elevenlabs.io/docs/api-reference/service-accounts/list?explorer=true)
- WorkspaceService AccountsAPI Keys

  - [GETGet API keys](https://elevenlabs.io/docs/api-reference/service-accounts/api-keys/list?explorer=true)
  - [POSTCreate API key](https://elevenlabs.io/docs/api-reference/service-accounts/api-keys/create?explorer=true)
  - [DELDelete API key](https://elevenlabs.io/docs/api-reference/service-accounts/api-keys/delete?explorer=true)
  - [PATCHUpdate API key](https://elevenlabs.io/docs/api-reference/service-accounts/api-keys/update?explorer=true)
- WorkspaceWorkspaceAuth Connections

  - [GETGet Workspace Auth Connections](https://elevenlabs.io/docs/api-reference/workspace/auth-connections/list?explorer=true)
  - [POSTCreate Workspace Auth Connection](https://elevenlabs.io/docs/api-reference/workspace/auth-connections/create?explorer=true)
  - [DELDelete Workspace Auth Connection](https://elevenlabs.io/docs/api-reference/workspace/auth-connections/delete?explorer=true)
- WorkspaceWorkspaceGroups

  - [GETList workspace groups](https://elevenlabs.io/docs/api-reference/workspace/groups/list?explorer=true)
  - [GETSearch user group](https://elevenlabs.io/docs/api-reference/workspace/groups/search?explorer=true)
- WorkspaceWorkspaceGroupsMembers

  - [POSTRemove member from user group](https://elevenlabs.io/docs/api-reference/workspace/groups/members/remove?explorer=true)
  - [POSTAdd member to user group](https://elevenlabs.io/docs/api-reference/workspace/groups/members/add?explorer=true)
- WorkspaceWorkspaceInvites

  - [POSTInvite user](https://elevenlabs.io/docs/api-reference/workspace/invites/create?explorer=true)
  - [POSTInvite Multiple Users](https://elevenlabs.io/docs/api-reference/workspace/invites/create-batch?explorer=true)
  - [DELDelete invite](https://elevenlabs.io/docs/api-reference/workspace/invites/delete?explorer=true)
- WorkspaceWorkspaceMembers

  - [POSTUpdate member](https://elevenlabs.io/docs/api-reference/workspace/members/update?explorer=true)
- WorkspaceWorkspaceResources

  - [GETGet Resource](https://elevenlabs.io/docs/api-reference/workspace/resources/get?explorer=true)
  - [POSTShare Workspace Resource](https://elevenlabs.io/docs/api-reference/workspace/resources/share?explorer=true)
  - [POSTUnshare Workspace Resource](https://elevenlabs.io/docs/api-reference/workspace/resources/unshare?explorer=true)
- WorkspaceWebhooks

  - [GETList Workspace Webhooks](https://elevenlabs.io/docs/api-reference/webhooks/list?explorer=true)
  - [POSTCreate Workspace Webhook](https://elevenlabs.io/docs/api-reference/webhooks/create?explorer=true)
  - [DELDelete Workspace Webhook](https://elevenlabs.io/docs/api-reference/webhooks/delete?explorer=true)
  - [PATCHUpdate Workspace Webhook](https://elevenlabs.io/docs/api-reference/webhooks/update?explorer=true)
- LegacyVoices

  - [GETList voices](https://elevenlabs.io/docs/api-reference/legacy/voices/get-all?explorer=true)
  - [POSTVoice design](https://elevenlabs.io/docs/api-reference/legacy/voices/create-previews?explorer=true)
  - [POSTSave a voice preview](https://elevenlabs.io/docs/api-reference/legacy/voices/save-a-voice-preview?explorer=true)
- LegacyKnowledge Base

  - [POSTAdd To Knowledge Base](https://elevenlabs.io/docs/api-reference/legacy/knowledge-base/add-to-knowledge-base?explorer=true)
- LegacyDubbing

  - [GETGet dubbed transcript](https://elevenlabs.io/docs/api-reference/legacy/dubbing/get-transcript-for-dub?explorer=true)

[Built with](https://buildwithfern.com/?utm_campaign=buildWith&utm_medium=docs&utm_source=elevenlabs.io)

wss://api.elevenlabs.io/v1/speech-to-text/realtime?model\_id=

Connect

##### Headers

1 optional propertyxi-api-key

##### Query parameters

- model\_idstringRequired


11 more optional propertiestoken, include\_timestamps, include\_language\_detection, audio\_format, language\_code, commit\_strategy, vad\_silence\_threshold\_secs, vad\_threshold, min\_speech\_duration\_ms, min\_silence\_duration\_ms, enable\_logging

* * *

##### Publish

- message\_type"input\_audio\_chunk"Required



`input_audio_chunk`

- audio\_base\_64stringRequired

- commitbooleanRequired

- sample\_rateintegerRequired


1 more optional propertyprevious\_text

Send message

Messages

Not connected

#### No messages...
# Source: https://elevenlabs.io/docs/eleven-agents/guides/realtime-monitoring

Real-time monitoring enables live observation of agent conversations via WebSocket and remote control of active calls. This feature provides real-time visibility into conversation events and allows intervention through control commands.

This is an enterprise-only feature.

## Overview

Monitoring sessions stream conversation events in real-time, including transcripts, agent responses, and corrections. You can also send control commands to end calls, transfer to phone numbers, or enable human takeover during active chat conversations.

## WebSocket endpoint

Connect to a live conversation using the monitoring endpoint:

```
wss://api.elevenlabs.io/v1/convai/conversations/{conversation_id}/monitor
```

Replace `{conversation_id}` with the ID of the conversation you want to monitor.

## Authentication

Authentication requires:

- **API key permissions**: Your API key must have `ElevenLabs Agents Write` scope
- **Workspace access**: You must have `EDITOR` access to the agent’s workspace
- **Header format**: Include your API key via the `xi-api-key` header

### Example connection

JavaScriptPython

```
const ws = new WebSocket('wss://api.elevenlabs.io/v1/convai/conversations/conv_123/monitor', {
  headers: {
    'xi-api-key': 'your_api_key_here',
  },
});
```

## Configuration

Before monitoring conversations, enable the feature in your agent’s settings:

[1](https://elevenlabs.io/docs/eleven-agents/guides/realtime-monitoring#navigate-to-agent-settings)

### Navigate to agent settings

Open your agent’s configuration page in the dashboard.

[2](https://elevenlabs.io/docs/eleven-agents/guides/realtime-monitoring#enable-monitoring)

### Enable monitoring

In the Advanced settings panel, toggle the “Monitoring” option.

![Monitoring toggle in agent settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1a4b5507a39ddf6a517772b8c01ede5f7d12429175fdf89e04c8ba910f646f8e/assets/images/agents/realtime-monitoring-toggle.png)

[3](https://elevenlabs.io/docs/eleven-agents/guides/realtime-monitoring#select-events)

### Select events

Choose which events you want to monitor. See [Client Events](https://elevenlabs.io/docs/eleven-agents/customization/events/client-events) for a full list of available events.

The following events cannot be monitored: VAD scores, turn probability metrics, and pings.

The conversation must be active before you can connect to monitor it. You cannot monitor a
conversation before it begins.

## Control commands

Send JSON commands through the WebSocket to control the conversation:

###### End call

Terminate the active conversation immediately.

JavaScriptPython

```
// End the active conversation
ws.send(JSON.stringify({
  command_type: "end_call"
}));
```

###### Transfer to phone number

Transfer the call to a specified phone number.

JavaScriptPython

```
// Transfer to a phone number
ws.send(JSON.stringify({
  command_type: "transfer_to_number",
  parameters: {
    phone_number: "+1234567890"
  }
}));
```

The `transfer_to_number` system tool must already be configured in the agent.

###### Realtime contextual update

Inject context or instructions into the active conversation so the agent can use the new
information in its responses.

JavaScriptPython

```
// Send a contextual update to the agent
ws.send(JSON.stringify({
  command_type: "contextual_update",
  parameters: {
    contextual_update: "<your update text>"
  }
}));
```

###### Enable human takeover

Switch from AI agent to human operator mode for chat conversations.

JavaScriptPython

```
// Enable human takeover
ws.send(JSON.stringify({
  command_type: "enable_human_takeover"
}));
```

###### Send message as human

Send a message to the user as a human operator in chat conversations.

JavaScriptPython

```
// Send a message as a human operator
ws.send(JSON.stringify({
  command_type: "send_human_message",
  parameters: {
    text: "How can I help you?"
  }
}));
```

###### Disable human takeover

Return control from human operator back to the AI agent.

JavaScriptPython

```
// Disable human takeover and return to AI
ws.send(JSON.stringify({
  command_type: "disable_human_takeover"
}));
```

## Use cases

Real-time monitoring enables several operational scenarios:

Quality assurance

Monitor agent conversations in real-time to ensure quality standards and identify training
opportunities.

Human escalation

Detect conversations requiring human intervention and seamlessly take over from the AI agent.

Analytics dashboards

Build real-time monitoring dashboards that aggregate conversation metrics and performance
indicators.

Call center oversight

Supervise multiple agent conversations simultaneously and intervene when necessary.

Automated intervention

Implement automated systems that analyze conversation content and trigger actions based on
specific conditions.

Training and coaching

Use live conversations as training material and provide real-time feedback to improve agent
performance.

## Limitations

###### Audio data not available

The monitoring endpoint streams only text events and metadata. Raw audio data is not included in
monitoring events.

###### Historical event limit

Only approximately the last 100 events are cached and available when connecting to an active
conversation. Earlier events cannot be retrieved.

###### Event filtering restrictions

VAD scores, turn probability metrics, and ping events cannot be monitored when custom event
selection is enabled.

###### Connection timing

You must connect after the conversation has started. The monitoring endpoint cannot be used
before conversation initiation.

###### Permissions required

API keys must have `ElevenLabs Agents Write` scope, and you must have `EDITOR` workspace access
to monitor conversations.

## Related resources

[Post-call Webhooks\\
\\
Receive conversation data and analysis after calls complete.](https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks) [Agent Analysis\\
\\
Configure success evaluation and data collection for conversations.](https://elevenlabs.io/docs/eleven-agents/customization/agent-analysis) [Client Events\\
\\
Understand events received during conversational applications.](https://elevenlabs.io/docs/eleven-agents/customization/events/client-events) [WebSocket API\\
\\
Learn about the WebSocket API for real-time conversations.](https://elevenlabs.io/docs/eleven-agents/libraries/web-sockets)
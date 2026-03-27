# Source: https://developers.cloudflare.com/agents/api-reference/run-workflows/

[Skip to content](https://developers.cloudflare.com/agents/api-reference/run-workflows/#_top)

Copy page

# Run Workflows

Integrate [Cloudflare Workflows](https://developers.cloudflare.com/workflows/) with Agents for durable, multi-step background processing while Agents handle real-time communication.

## Quick start

### 1\. Define a Workflow

Extend `AgentWorkflow` for typed access to the originating Agent:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2807)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2808)

```
import { AgentWorkflow } from "agents/workflows";

export class ProcessingWorkflow extends AgentWorkflow {

  async run(event, step) {

    const params = event.payload;

    const result = await step.do("process-data", async () => {

      return processData(params.data);

    });

    // Non-durable: progress reporting (may repeat on retry)

    await this.reportProgress({

      step: "process",

      status: "complete",

      percent: 0.5,

    });

    // Broadcast to connected WebSocket clients

    this.broadcastToClients({ type: "update", taskId: params.taskId });

    await step.do("save-results", async () => {

      // Call Agent methods via RPC

      await this.agent.saveResult(params.taskId, result);

    });

    // Durable: idempotent, won't repeat on retry

    await step.reportComplete(result);

    return result;

  }

}
```

```
import { AgentWorkflow } from "agents/workflows";

import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

import type { MyAgent } from "./agent";

type TaskParams = { taskId: string; data: string };

export class ProcessingWorkflow extends AgentWorkflow<MyAgent, TaskParams> {

  async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {

    const params = event.payload;

    const result = await step.do("process-data", async () => {

      return processData(params.data);

    });

    // Non-durable: progress reporting (may repeat on retry)

    await this.reportProgress({

      step: "process",

      status: "complete",

      percent: 0.5,

    });

    // Broadcast to connected WebSocket clients

    this.broadcastToClients({ type: "update", taskId: params.taskId });

    await step.do("save-results", async () => {

      // Call Agent methods via RPC

      await this.agent.saveResult(params.taskId, result);

    });

    // Durable: idempotent, won't repeat on retry

    await step.reportComplete(result);

    return result;

  }

}
```

### 2\. Start a Workflow from an Agent

Use `runWorkflow()` to start and track workflows:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2809)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2810)

```
import { Agent } from "agents";

export class MyAgent extends Agent {

  async startTask(taskId, data) {

    const instanceId = await this.runWorkflow("PROCESSING_WORKFLOW", {

      taskId,

      data,

    });

    return { instanceId };

  }

  async onWorkflowProgress(workflowName, instanceId, progress) {

    this.broadcast(JSON.stringify({ type: "workflow-progress", progress }));

  }

  async onWorkflowComplete(workflowName, instanceId, result) {

    console.log(`Workflow completed:`, result);

  }

  async saveResult(taskId, result) {

    this

      .sql`INSERT INTO results (task_id, data) VALUES (${taskId}, ${JSON.stringify(result)})`;

  }

}
```

```
import { Agent } from "agents";

export class MyAgent extends Agent {

  async startTask(taskId: string, data: string) {

    const instanceId = await this.runWorkflow("PROCESSING_WORKFLOW", {

      taskId,

      data,

    });

    return { instanceId };

  }

  async onWorkflowProgress(

    workflowName: string,

    instanceId: string,

    progress: unknown,

  ) {

    this.broadcast(JSON.stringify({ type: "workflow-progress", progress }));

  }

  async onWorkflowComplete(

    workflowName: string,

    instanceId: string,

    result?: unknown,

  ) {

    console.log(`Workflow completed:`, result);

  }

  async saveResult(taskId: string, result: unknown) {

    this

      .sql`INSERT INTO results (task_id, data) VALUES (${taskId}, ${JSON.stringify(result)})`;

  }

}
```

### 3\. Configure Wrangler

- [wrangler.jsonc](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2779)
- [wrangler.toml](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2780)

```
{

  "name": "my-app",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-03-26",

  "durable_objects": {

    "bindings": [{ "name": "MY_AGENT", "class_name": "MyAgent" }],

  },

  "workflows": [\
\
    {\
\
      "name": "processing-workflow",\
\
      "binding": "PROCESSING_WORKFLOW",\
\
      "class_name": "ProcessingWorkflow",\
\
    },\
\
  ],

  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],

}
```

```
name = "my-app"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-03-26"

[[durable_objects.bindings]]

name = "MY_AGENT"

class_name = "MyAgent"

[[workflows]]

name = "processing-workflow"

binding = "PROCESSING_WORKFLOW"

class_name = "ProcessingWorkflow"

[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyAgent" ]
```

## AgentWorkflow class

Base class for Workflows that integrate with Agents.

### Type parameters

| Parameter | Description |
| --- | --- |
| `AgentType` | The Agent class type for typed RPC |
| `Params` | Parameters passed to the workflow |
| `ProgressType` | Type for progress reporting (defaults to `DefaultProgress`) |
| `Env` | Environment type (defaults to `Cloudflare.Env`) |

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `agent` | Stub | Typed stub for calling Agent methods |
| `instanceId` | string | The workflow instance ID |
| `workflowName` | string | The workflow binding name |
| `env` | Env | Environment bindings |

### Instance methods (non-durable)

These methods may repeat on retry. Use for lightweight, frequent updates.

#### reportProgress(progress)

Report progress to the Agent. Triggers `onWorkflowProgress` callback.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2783)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2784)

```
await this.reportProgress({

  step: "processing",

  status: "running",

  percent: 0.5,

});
```

```
await this.reportProgress({

  step: "processing",

  status: "running",

  percent: 0.5,

});
```

#### broadcastToClients(message)

Broadcast a message to all WebSocket clients connected to the Agent.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2781)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2782)

```
this.broadcastToClients({ type: "update", data: result });
```

```
this.broadcastToClients({ type: "update", data: result });
```

#### waitForApproval(step, options?)

Wait for an approval event. Throws `WorkflowRejectedError` if rejected.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2785)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2786)

```
const approval = await this.waitForApproval(step, {

  timeout: "7 days",

});
```

```
const approval = await this.waitForApproval<{ approvedBy: string }>(step, {

  timeout: "7 days",

});
```

### Step methods (durable)

These methods are idempotent and will not repeat on retry. Use for state changes that must persist.

| Method | Description |
| --- | --- |
| `step.reportComplete(result?)` | Report successful completion |
| `step.reportError(error)` | Report an error |
| `step.sendEvent(event)` | Send a custom event to the Agent |
| `step.updateAgentState(state)` | Replace Agent state (broadcasts to clients) |
| `step.mergeAgentState(partial)` | Merge into Agent state (broadcasts to clients) |
| `step.resetAgentState()` | Reset Agent state to initialState |

### DefaultProgress type

```
type DefaultProgress = {

  step?: string;

  status?: "pending" | "running" | "complete" | "error";

  message?: string;

  percent?: number;

  [key: string]: unknown;

};
```

## Agent workflow methods

Methods available on the `Agent` class for Workflow management.

### runWorkflow(workflowName, params, options?)

Start a workflow instance and track it in the Agent database.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `workflowName` | string | Workflow binding name from `env` |
| `params` | object | Parameters to pass to the workflow |
| `options.id` | string | Custom workflow ID (auto-generated if not provided) |
| `options.metadata` | object | Metadata stored for querying (not passed to workflow) |
| `options.agentBinding` | string | Agent binding name (auto-detected if not provided) |

**Returns:**`Promise<string>` \- Workflow instance ID

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2791)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2792)

```
const instanceId = await this.runWorkflow(

  "MY_WORKFLOW",

  { taskId: "123" },

  {

    metadata: { userId: "user-456", priority: "high" },

  },

);
```

```
const instanceId = await this.runWorkflow(

  "MY_WORKFLOW",

  { taskId: "123" },

  {

    metadata: { userId: "user-456", priority: "high" },

  },

);
```

### sendWorkflowEvent(workflowName, instanceId, event)

Send an event to a running workflow.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2787)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2788)

```
await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {

  type: "custom-event",

  payload: { action: "proceed" },

});
```

```
await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {

  type: "custom-event",

  payload: { action: "proceed" },

});
```

### getWorkflowStatus(workflowName, instanceId)

Get the status of a workflow and update the tracking record.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2789)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2790)

```
const status = await this.getWorkflowStatus("MY_WORKFLOW", instanceId);

// { status: 'running', output: null, error: null }
```

```
const status = await this.getWorkflowStatus("MY_WORKFLOW", instanceId);

// { status: 'running', output: null, error: null }
```

### getWorkflow(instanceId)

Get a tracked workflow by ID.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2793)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2794)

```
const workflow = this.getWorkflow(instanceId);

// { instanceId, workflowName, status, metadata, error, createdAt, ... }
```

```
const workflow = this.getWorkflow(instanceId);

// { instanceId, workflowName, status, metadata, error, createdAt, ... }
```

### getWorkflows(criteria?)

Query tracked workflows with cursor-based pagination. Returns a `WorkflowPage` with workflows, total count, and cursor for the next page.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2815)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2816)

```
// Get running workflows (default limit is 50, max is 100)

const { workflows, total } = this.getWorkflows({ status: "running" });

// Filter by metadata

const { workflows: userWorkflows } = this.getWorkflows({

  metadata: { userId: "user-456" },

});

// Pagination with cursor

const page1 = this.getWorkflows({

  status: ["complete", "errored"],

  limit: 20,

  orderBy: "desc",

});

console.log(`Showing ${page1.workflows.length} of ${page1.total} workflows`);

// Get next page using cursor

if (page1.nextCursor) {

  const page2 = this.getWorkflows({

    status: ["complete", "errored"],

    limit: 20,

    orderBy: "desc",

    cursor: page1.nextCursor,

  });

}
```

```
// Get running workflows (default limit is 50, max is 100)

const { workflows, total } = this.getWorkflows({ status: "running" });

// Filter by metadata

const { workflows: userWorkflows } = this.getWorkflows({

  metadata: { userId: "user-456" },

});

// Pagination with cursor

const page1 = this.getWorkflows({

  status: ["complete", "errored"],

  limit: 20,

  orderBy: "desc",

});

console.log(`Showing ${page1.workflows.length} of ${page1.total} workflows`);

// Get next page using cursor

if (page1.nextCursor) {

  const page2 = this.getWorkflows({

    status: ["complete", "errored"],

    limit: 20,

    orderBy: "desc",

    cursor: page1.nextCursor,

  });

}
```

The `WorkflowPage` type:

```
type WorkflowPage = {

  workflows: WorkflowInfo[];

  total: number; // Total matching workflows

  nextCursor: string | null; // null when no more pages

};
```

### deleteWorkflow(instanceId)

Delete a single workflow instance tracking record. Returns `true` if deleted, `false` if not found.

### deleteWorkflows(criteria?)

Delete workflow instance tracking records matching criteria.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2801)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2802)

```
// Delete completed workflow instances older than 7 days

this.deleteWorkflows({

  status: "complete",

  createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),

});

// Delete all errored and terminated workflows

this.deleteWorkflows({

  status: ["errored", "terminated"],

});
```

```
// Delete completed workflow instances older than 7 days

this.deleteWorkflows({

  status: "complete",

  createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),

});

// Delete all errored and terminated workflows

this.deleteWorkflows({

  status: ["errored", "terminated"],

});
```

### terminateWorkflow(instanceId)

Terminate a running workflow immediately. Sets status to `"terminated"`.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2795)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2796)

```
await this.terminateWorkflow(instanceId);
```

```
await this.terminateWorkflow(instanceId);
```

### pauseWorkflow(instanceId)

Pause a running workflow. The workflow can be resumed later with `resumeWorkflow()`.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2797)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2798)

```
await this.pauseWorkflow(instanceId);
```

```
await this.pauseWorkflow(instanceId);
```

### resumeWorkflow(instanceId)

Resume a paused workflow.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2799)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2800)

```
await this.resumeWorkflow(instanceId);
```

```
await this.resumeWorkflow(instanceId);
```

### restartWorkflow(instanceId, options?)

Restart a workflow instance from the beginning with the same ID.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2803)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2804)

```
// Reset tracking (default) - clears timestamps and error fields

await this.restartWorkflow(instanceId);

// Preserve original timestamps

await this.restartWorkflow(instanceId, { resetTracking: false });
```

```
// Reset tracking (default) - clears timestamps and error fields

await this.restartWorkflow(instanceId);

// Preserve original timestamps

await this.restartWorkflow(instanceId, { resetTracking: false });
```

### approveWorkflow(instanceId, options?)

Approve a waiting workflow. Use with `waitForApproval()` in the workflow.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2811)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2812)

```
await this.approveWorkflow(instanceId, {

  reason: "Approved by admin",

  metadata: { approvedBy: userId },

});
```

```
await this.approveWorkflow(instanceId, {

  reason: "Approved by admin",

  metadata: { approvedBy: userId },

});
```

### rejectWorkflow(instanceId, options?)

Reject a waiting workflow. Causes `waitForApproval()` to throw `WorkflowRejectedError`.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2805)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2806)

```
await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

```
await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

### migrateWorkflowBinding(oldName, newName)

Migrate tracked workflows after renaming a workflow binding.

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2813)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2814)

```
class MyAgent extends Agent {

  async onStart() {

    this.migrateWorkflowBinding("OLD_WORKFLOW", "NEW_WORKFLOW");

  }

}
```

```
class MyAgent extends Agent {

  async onStart() {

    this.migrateWorkflowBinding("OLD_WORKFLOW", "NEW_WORKFLOW");

  }

}
```

## Lifecycle callbacks

Override these methods in your Agent to handle workflow events:

| Callback | Parameters | Description |
| --- | --- | --- |
| `onWorkflowProgress` | `workflowName`, `instanceId`, `progress` | Called when workflow reports progress |
| `onWorkflowComplete` | `workflowName`, `instanceId`, `result?` | Called when workflow completes |
| `onWorkflowError` | `workflowName`, `instanceId`, `error` | Called when workflow errors |
| `onWorkflowEvent` | `workflowName`, `instanceId`, `event` | Called when workflow sends an event |
| `onWorkflowCallback` | `callback: WorkflowCallback` | Called for all callback types |

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2817)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2818)

```
class MyAgent extends Agent {

  async onWorkflowProgress(workflowName, instanceId, progress) {

    this.broadcast(

      JSON.stringify({ type: "progress", workflowName, instanceId, progress }),

    );

  }

  async onWorkflowComplete(workflowName, instanceId, result) {

    console.log(`${workflowName}/${instanceId} completed`);

  }

  async onWorkflowError(workflowName, instanceId, error) {

    console.error(`${workflowName}/${instanceId} failed:`, error);

  }

}
```

```
class MyAgent extends Agent {

  async onWorkflowProgress(

    workflowName: string,

    instanceId: string,

    progress: unknown,

  ) {

    this.broadcast(

      JSON.stringify({ type: "progress", workflowName, instanceId, progress }),

    );

  }

  async onWorkflowComplete(

    workflowName: string,

    instanceId: string,

    result?: unknown,

  ) {

    console.log(`${workflowName}/${instanceId} completed`);

  }

  async onWorkflowError(

    workflowName: string,

    instanceId: string,

    error: string,

  ) {

    console.error(`${workflowName}/${instanceId} failed:`, error);

  }

}
```

## Workflow tracking

Workflows started with `runWorkflow()` are automatically tracked in the Agent's internal database. You can query, filter, and manage workflows using the methods described above (`getWorkflow()`, `getWorkflows()`, `deleteWorkflow()`, etc.).

### Status values

| Status | Description |
| --- | --- |
| `queued` | Waiting to start |
| `running` | Currently executing |
| `paused` | Paused by user |
| `waiting` | Waiting for event |
| `complete` | Finished successfully |
| `errored` | Failed with error |
| `terminated` | Manually terminated |

Use the `metadata` option in `runWorkflow()` to store queryable information (like user IDs or task types) that you can filter on later with `getWorkflows()`.

## Examples

### Human-in-the-loop approval

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2829)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2830)

```
import { AgentWorkflow } from "agents/workflows";

export class ApprovalWorkflow extends AgentWorkflow {

  async run(event, step) {

    const request = await step.do("prepare", async () => {

      return { ...event.payload, preparedAt: Date.now() };

    });

    await this.reportProgress({

      step: "approval",

      status: "pending",

      message: "Awaiting approval",

    });

    // Throws WorkflowRejectedError if rejected

    const approval = await this.waitForApproval(step, {

      timeout: "7 days",

    });

    console.log("Approved by:", approval?.approvedBy);

    const result = await step.do("execute", async () => {

      return executeRequest(request);

    });

    await step.reportComplete(result);

    return result;

  }

}

class MyAgent extends Agent {

  async handleApproval(instanceId, userId) {

    await this.approveWorkflow(instanceId, {

      reason: "Approved by admin",

      metadata: { approvedBy: userId },

    });

  }

  async handleRejection(instanceId, reason) {

    await this.rejectWorkflow(instanceId, { reason });

  }

}
```

```
import { AgentWorkflow } from "agents/workflows";

import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

export class ApprovalWorkflow extends AgentWorkflow<MyAgent, RequestParams> {

  async run(event: AgentWorkflowEvent<RequestParams>, step: AgentWorkflowStep) {

    const request = await step.do("prepare", async () => {

      return { ...event.payload, preparedAt: Date.now() };

    });

    await this.reportProgress({

      step: "approval",

      status: "pending",

      message: "Awaiting approval",

    });

    // Throws WorkflowRejectedError if rejected

    const approval = await this.waitForApproval<{ approvedBy: string }>(step, {

      timeout: "7 days",

    });

    console.log("Approved by:", approval?.approvedBy);

    const result = await step.do("execute", async () => {

      return executeRequest(request);

    });

    await step.reportComplete(result);

    return result;

  }

}

class MyAgent extends Agent {

  async handleApproval(instanceId: string, userId: string) {

    await this.approveWorkflow(instanceId, {

      reason: "Approved by admin",

      metadata: { approvedBy: userId },

    });

  }

  async handleRejection(instanceId: string, reason: string) {

    await this.rejectWorkflow(instanceId, { reason });

  }

}
```

### Retry with backoff

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2823)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2824)

```
import { AgentWorkflow } from "agents/workflows";

export class ResilientWorkflow extends AgentWorkflow {

  async run(event, step) {

    const result = await step.do(

      "call-api",

      {

        retries: { limit: 5, delay: "10 seconds", backoff: "exponential" },

        timeout: "5 minutes",

      },

      async () => {

        const response = await fetch("https://api.example.com/process", {

          method: "POST",

          body: JSON.stringify(event.payload),

        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        return response.json();

      },

    );

    await step.reportComplete(result);

    return result;

  }

}
```

```
import { AgentWorkflow } from "agents/workflows";

import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

export class ResilientWorkflow extends AgentWorkflow<MyAgent, TaskParams> {

  async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {

    const result = await step.do(

      "call-api",

      {

        retries: { limit: 5, delay: "10 seconds", backoff: "exponential" },

        timeout: "5 minutes",

      },

      async () => {

        const response = await fetch("https://api.example.com/process", {

          method: "POST",

          body: JSON.stringify(event.payload),

        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);

        return response.json();

      },

    );

    await step.reportComplete(result);

    return result;

  }

}
```

### State synchronization

Workflows can update Agent state durably via `step`, which automatically broadcasts to all connected clients:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2827)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2828)

```
import { AgentWorkflow } from "agents/workflows";

export class StatefulWorkflow extends AgentWorkflow {

  async run(event, step) {

    // Replace entire state (durable, broadcasts to clients)

    await step.updateAgentState({

      currentTask: {

        id: event.payload.taskId,

        status: "processing",

        startedAt: Date.now(),

      },

    });

    const result = await step.do("process", async () =>

      processTask(event.payload),

    );

    // Merge partial state (durable, keeps existing fields)

    await step.mergeAgentState({

      currentTask: { status: "complete", result, completedAt: Date.now() },

    });

    await step.reportComplete(result);

    return result;

  }

}
```

```
import { AgentWorkflow } from "agents/workflows";

import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

export class StatefulWorkflow extends AgentWorkflow<MyAgent, TaskParams> {

  async run(event: AgentWorkflowEvent<TaskParams>, step: AgentWorkflowStep) {

    // Replace entire state (durable, broadcasts to clients)

    await step.updateAgentState({

      currentTask: {

        id: event.payload.taskId,

        status: "processing",

        startedAt: Date.now(),

      },

    });

    const result = await step.do("process", async () =>

      processTask(event.payload),

    );

    // Merge partial state (durable, keeps existing fields)

    await step.mergeAgentState({

      currentTask: { status: "complete", result, completedAt: Date.now() },

    });

    await step.reportComplete(result);

    return result;

  }

}
```

### Custom progress types

Define custom progress types for domain-specific reporting:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2831)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2832)

```
import { AgentWorkflow } from "agents/workflows";

// Custom progress type for data pipeline

// Workflow with custom progress type (3rd type parameter)

export class ETLWorkflow extends AgentWorkflow {

  async run(event, step) {

    await this.reportProgress({

      stage: "extract",

      recordsProcessed: 0,

      totalRecords: 1000,

      currentTable: "users",

    });

    // ... processing

  }

}

// Agent receives typed progress

class MyAgent extends Agent {

  async onWorkflowProgress(workflowName, instanceId, progress) {

    const p = progress;

    console.log(`Stage: ${p.stage}, ${p.recordsProcessed}/${p.totalRecords}`);

  }

}
```

```
import { AgentWorkflow } from "agents/workflows";

import type { AgentWorkflowEvent, AgentWorkflowStep } from "agents/workflows";

// Custom progress type for data pipeline

type PipelineProgress = {

  stage: "extract" | "transform" | "load";

  recordsProcessed: number;

  totalRecords: number;

  currentTable?: string;

};

// Workflow with custom progress type (3rd type parameter)

export class ETLWorkflow extends AgentWorkflow<

  MyAgent,

  ETLParams,

  PipelineProgress

> {

  async run(event: AgentWorkflowEvent<ETLParams>, step: AgentWorkflowStep) {

    await this.reportProgress({

      stage: "extract",

      recordsProcessed: 0,

      totalRecords: 1000,

      currentTable: "users",

    });

    // ... processing

  }

}

// Agent receives typed progress

class MyAgent extends Agent {

  async onWorkflowProgress(

    workflowName: string,

    instanceId: string,

    progress: unknown,

  ) {

    const p = progress as PipelineProgress;

    console.log(`Stage: ${p.stage}, ${p.recordsProcessed}/${p.totalRecords}`);

  }

}
```

### Cleanup strategy

The internal `cf_agents_workflows` table can grow unbounded, so implement a retention policy:

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2825)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2826)

```
class MyAgent extends Agent {

  // Option 1: Delete on completion

  async onWorkflowComplete(workflowName, instanceId, result) {

    // Process result first, then delete

    this.deleteWorkflow(instanceId);

  }

  // Option 2: Scheduled cleanup (keep recent history)

  async cleanupOldWorkflows() {

    this.deleteWorkflows({

      status: ["complete", "errored"],

      createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),

    });

  }

  // Option 3: Keep all history for compliance/auditing

  // Don't call deleteWorkflows() - query historical data as needed

}
```

```
class MyAgent extends Agent {

  // Option 1: Delete on completion

  async onWorkflowComplete(

    workflowName: string,

    instanceId: string,

    result?: unknown,

  ) {

    // Process result first, then delete

    this.deleteWorkflow(instanceId);

  }

  // Option 2: Scheduled cleanup (keep recent history)

  async cleanupOldWorkflows() {

    this.deleteWorkflows({

      status: ["complete", "errored"],

      createdBefore: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),

    });

  }

  // Option 3: Keep all history for compliance/auditing

  // Don't call deleteWorkflows() - query historical data as needed

}
```

## Bidirectional communication

### Workflow to Agent

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2821)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2822)

```
// Direct RPC call (typed)

await this.agent.updateTaskStatus(taskId, "processing");

const data = await this.agent.getData(taskId);

// Non-durable callbacks (may repeat on retry, use for frequent updates)

await this.reportProgress({ step: "process", percent: 0.5 });

this.broadcastToClients({ type: "update", data });

// Durable callbacks via step (idempotent, won't repeat on retry)

await step.reportComplete(result);

await step.reportError("Something went wrong");

await step.sendEvent({ type: "custom", data: {} });

// Durable state synchronization via step (broadcasts to clients)

await step.updateAgentState({ status: "processing" });

await step.mergeAgentState({ progress: 0.5 });
```

```
// Direct RPC call (typed)

await this.agent.updateTaskStatus(taskId, "processing");

const data = await this.agent.getData(taskId);

// Non-durable callbacks (may repeat on retry, use for frequent updates)

await this.reportProgress({ step: "process", percent: 0.5 });

this.broadcastToClients({ type: "update", data });

// Durable callbacks via step (idempotent, won't repeat on retry)

await step.reportComplete(result);

await step.reportError("Something went wrong");

await step.sendEvent({ type: "custom", data: {} });

// Durable state synchronization via step (broadcasts to clients)

await step.updateAgentState({ status: "processing" });

await step.mergeAgentState({ progress: 0.5 });
```

### Agent to Workflow

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2819)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/run-workflows/#tab-panel-2820)

```
// Send event to waiting workflow

await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {

  type: "custom-event",

  payload: { action: "proceed" },

});

// Approve/reject workflows using convenience methods

await this.approveWorkflow(instanceId, {

  reason: "Approved by admin",

  metadata: { approvedBy: userId },

});

await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

```
// Send event to waiting workflow

await this.sendWorkflowEvent("MY_WORKFLOW", instanceId, {

  type: "custom-event",

  payload: { action: "proceed" },

});

// Approve/reject workflows using convenience methods

await this.approveWorkflow(instanceId, {

  reason: "Approved by admin",

  metadata: { approvedBy: userId },

});

await this.rejectWorkflow(instanceId, { reason: "Request denied" });
```

## Best practices

1. **Keep workflows focused** — One workflow per logical task
2. **Use meaningful step names** — Helps with debugging and observability
3. **Report progress regularly** — Keeps users informed
4. **Handle errors gracefully** — Use `reportError()` before throwing
5. **Clean up completed workflows** — Implement a retention policy for the tracking table
6. **Handle workflow binding renames** — Use `migrateWorkflowBinding()` when renaming workflow bindings in `wrangler.jsonc`

## Limitations

| Constraint | Limit |
| --- | --- |
| Maximum steps | 10,000 per workflow (default) / configurable up to 25,000 |
| State size | 10 MB per workflow |
| Event wait time | 1 year maximum |
| Step execution time | 30 minutes per step |

Workflows cannot open WebSocket connections directly. Use `broadcastToClients()` to communicate with connected clients through the Agent.

## Related resources

[Workflows documentation](https://developers.cloudflare.com/workflows/) Learn about Cloudflare Workflows fundamentals.

[Store and sync state](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) Persist and synchronize agent state.

[Schedule tasks](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) Time-based task execution.

[Human-in-the-loop](https://developers.cloudflare.com/agents/concepts/human-in-the-loop/) Approval flows and manual intervention patterns.

Back to top
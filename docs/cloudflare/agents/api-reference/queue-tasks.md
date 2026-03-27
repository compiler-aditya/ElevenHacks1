# Source: https://developers.cloudflare.com/agents/api-reference/queue-tasks/

[Skip to content](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#_top)

Copy page

# Queue tasks

The Agents SDK provides a built-in queue system that allows you to schedule tasks for asynchronous execution. This is useful for background processing, delayed operations, and managing workloads that do not need immediate execution.

## Overview

The queue system is built into the base `Agent` class. Tasks are stored in a SQLite table and processed automatically in FIFO (First In, First Out) order.

## `QueueItem` type

```
type QueueItem<T> = {

  id: string; // Unique identifier for the queued task

  payload: T; // Data to pass to the callback function

  callback: keyof Agent; // Name of the method to call

  created_at: number; // Timestamp when the task was created

};
```

## Core methods

### `queue()`

Adds a task to the queue for future execution.

```
async queue<T>(callback: keyof this, payload: T): Promise<string>
```

**Parameters:**

- `callback` \- The name of the method to call when processing the task
- `payload` \- Data to pass to the callback method

**Returns:** The unique ID of the queued task

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2643)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2644)

```
class MyAgent extends Agent {

  async processEmail(data) {

    // Process the email

    console.log(`Processing email: ${data.subject}`);

  }

  async onMessage(message) {

    // Queue an email processing task

    const taskId = await this.queue("processEmail", {

      email: "user@example.com",

      subject: "Welcome!",

    });

    console.log(`Queued task with ID: ${taskId}`);

  }

}
```

```
class MyAgent extends Agent {

  async processEmail(data: { email: string; subject: string }) {

    // Process the email

    console.log(`Processing email: ${data.subject}`);

  }

  async onMessage(message: string) {

    // Queue an email processing task

    const taskId = await this.queue("processEmail", {

      email: "user@example.com",

      subject: "Welcome!",

    });

    console.log(`Queued task with ID: ${taskId}`);

  }

}
```

### `dequeue()`

Removes a specific task from the queue by ID. This method is synchronous.

```
dequeue(id: string): void
```

**Parameters:**

- `id` \- The ID of the task to remove

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2633)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2634)

```
// Remove a specific task

agent.dequeue("abc123def");
```

```
// Remove a specific task

agent.dequeue("abc123def");
```

### `dequeueAll()`

Removes all tasks from the queue. This method is synchronous.

```
dequeueAll(): void
```

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2635)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2636)

```
// Clear the entire queue

agent.dequeueAll();
```

```
// Clear the entire queue

agent.dequeueAll();
```

### `dequeueAllByCallback()`

Removes all tasks that match a specific callback method. This method is synchronous.

```
dequeueAllByCallback(callback: string): void
```

**Parameters:**

- `callback` \- Name of the callback method

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2637)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2638)

```
// Remove all email processing tasks

agent.dequeueAllByCallback("processEmail");
```

```
// Remove all email processing tasks

agent.dequeueAllByCallback("processEmail");
```

### `getQueue()`

Retrieves a specific queued task by ID. This method is synchronous.

```
getQueue<T>(id: string): QueueItem<T> | undefined
```

**Parameters:**

- `id` \- The ID of the task to retrieve

**Returns:** The `QueueItem` with parsed payload or `undefined` if not found

The payload is automatically parsed from JSON before being returned.

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2641)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2642)

```
const task = agent.getQueue("abc123def");

if (task) {

  console.log(`Task callback: ${task.callback}`);

  console.log(`Task payload:`, task.payload);

}
```

```
const task = agent.getQueue("abc123def");

if (task) {

  console.log(`Task callback: ${task.callback}`);

  console.log(`Task payload:`, task.payload);

}
```

### `getQueues()`

Retrieves all queued tasks that match a specific key-value pair in their payload. This method is synchronous.

```
getQueues<T>(key: string, value: string): QueueItem<T>[]
```

**Parameters:**

- `key` \- The key to filter by in the payload
- `value` \- The value to match

**Returns:** Array of matching `QueueItem` objects

This method fetches all queue items and filters them in memory by parsing each payload and checking if the specified key matches the value.

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2639)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2640)

```
// Find all tasks for a specific user

const userTasks = agent.getQueues("userId", "12345");
```

```
// Find all tasks for a specific user

const userTasks = agent.getQueues("userId", "12345");
```

## How queue processing works

1. **Validation**: When calling `queue()`, the method validates that the callback exists as a function on the agent.
2. **Automatic processing**: After queuing, the system automatically attempts to flush the queue.
3. **FIFO order**: Tasks are processed in the order they were created (`created_at` timestamp).
4. **Context preservation**: Each queued task runs with the same agent context (connection, request, email).
5. **Automatic dequeue**: Successfully executed tasks are automatically removed from the queue.
6. **Error handling**: If a callback method does not exist at execution time, an error is logged and the task is skipped.
7. **Persistence**: Tasks are stored in the `cf_agents_queues` SQL table and survive agent restarts.

## Queue callback methods

When defining callback methods for queued tasks, they must follow this signature:

```
async callbackMethod(payload: unknown, queueItem: QueueItem): Promise<void>
```

**Example:**

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2647)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2648)

```
class MyAgent extends Agent {

  async sendNotification(payload, queueItem) {

    console.log(`Processing task ${queueItem.id}`);

    console.log(

      `Sending notification to user ${payload.userId}: ${payload.message}`,

    );

    // Your notification logic here

    await this.notificationService.send(payload.userId, payload.message);

  }

  async onUserSignup(userData) {

    // Queue a welcome notification

    await this.queue("sendNotification", {

      userId: userData.id,

      message: "Welcome to our platform!",

    });

  }

}
```

```
class MyAgent extends Agent {

  async sendNotification(

    payload: { userId: string; message: string },

    queueItem: QueueItem<{ userId: string; message: string }>,

  ) {

    console.log(`Processing task ${queueItem.id}`);

    console.log(

      `Sending notification to user ${payload.userId}: ${payload.message}`,

    );

    // Your notification logic here

    await this.notificationService.send(payload.userId, payload.message);

  }

  async onUserSignup(userData: any) {

    // Queue a welcome notification

    await this.queue("sendNotification", {

      userId: userData.id,

      message: "Welcome to our platform!",

    });

  }

}
```

## Use cases

### Background processing

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2645)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2646)

```
class DataProcessor extends Agent {

  async processLargeDataset(data) {

    const results = await this.heavyComputation(data.datasetId);

    await this.notifyUser(data.userId, results);

  }

  async onDataUpload(uploadData) {

    // Queue the processing instead of doing it synchronously

    await this.queue("processLargeDataset", {

      datasetId: uploadData.id,

      userId: uploadData.userId,

    });

    return { message: "Data upload received, processing started" };

  }

}
```

```
class DataProcessor extends Agent {

  async processLargeDataset(data: { datasetId: string; userId: string }) {

    const results = await this.heavyComputation(data.datasetId);

    await this.notifyUser(data.userId, results);

  }

  async onDataUpload(uploadData: any) {

    // Queue the processing instead of doing it synchronously

    await this.queue("processLargeDataset", {

      datasetId: uploadData.id,

      userId: uploadData.userId,

    });

    return { message: "Data upload received, processing started" };

  }

}
```

### Batch operations

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2651)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2652)

```
class BatchProcessor extends Agent {

  async processBatch(data) {

    for (const item of data.items) {

      await this.processItem(item);

    }

    console.log(`Completed batch ${data.batchId}`);

  }

  async onLargeRequest(items) {

    // Split large requests into smaller batches

    const batchSize = 10;

    for (let i = 0; i < items.length; i += batchSize) {

      const batch = items.slice(i, i + batchSize);

      await this.queue("processBatch", {

        items: batch,

        batchId: `batch-${i / batchSize + 1}`,

      });

    }

  }

}
```

```
class BatchProcessor extends Agent {

  async processBatch(data: { items: any[]; batchId: string }) {

    for (const item of data.items) {

      await this.processItem(item);

    }

    console.log(`Completed batch ${data.batchId}`);

  }

  async onLargeRequest(items: any[]) {

    // Split large requests into smaller batches

    const batchSize = 10;

    for (let i = 0; i < items.length; i += batchSize) {

      const batch = items.slice(i, i + batchSize);

      await this.queue("processBatch", {

        items: batch,

        batchId: `batch-${i / batchSize + 1}`,

      });

    }

  }

}
```

## Error handling

- [JavaScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2649)
- [TypeScript](https://developers.cloudflare.com/agents/api-reference/queue-tasks/#tab-panel-2650)

```
class RobustAgent extends Agent {

  async reliableTask(payload, queueItem) {

    try {

      await this.doSomethingRisky(payload);

    } catch (error) {

      console.error(`Task ${queueItem.id} failed:`, error);

      // Optionally re-queue with retry logic

      if (payload.retryCount < 3) {

        await this.queue("reliableTask", {

          ...payload,

          retryCount: (payload.retryCount || 0) + 1,

        });

      }

    }

  }

}
```

```
class RobustAgent extends Agent {

  async reliableTask(payload: any, queueItem: QueueItem) {

    try {

      await this.doSomethingRisky(payload);

    } catch (error) {

      console.error(`Task ${queueItem.id} failed:`, error);

      // Optionally re-queue with retry logic

      if (payload.retryCount < 3) {

        await this.queue("reliableTask", {

          ...payload,

          retryCount: (payload.retryCount || 0) + 1,

        });

      }

    }

  }

}
```

## Best practices

1. **Keep payloads small**: Payloads are JSON-serialized and stored in the database.
2. **Idempotent operations**: Design callback methods to be safe to retry.
3. **Error handling**: Include proper error handling in callback methods.
4. **Monitoring**: Use logging to track queue processing.
5. **Cleanup**: Regularly clean up completed or failed tasks if needed.

## Integration with other features

The queue system works with other Agent SDK features:

- **State management**: Access agent state within queued callbacks.
- **Scheduling**: Combine with [`schedule()`](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) for time-based queue processing.
- **Context**: Queued tasks maintain the original request context.
- **Database**: Uses the same database as other agent data.

## Limitations

- Tasks are processed sequentially, not in parallel.
- No priority system (FIFO only).
- Queue processing happens during agent execution, not as separate background jobs.

## Queue vs Schedule

Use **queue** when you want tasks to execute as soon as possible in order. Use [**schedule**](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) when you need tasks to run at specific times or on a recurring basis.

| Feature | Queue | Schedule |
| --- | --- | --- |
| Execution timing | Immediate (FIFO) | Specific time or cron |
| Use case | Background processing | Delayed or recurring tasks |
| Storage | `cf_agents_queues` table | `cf_agents_schedules` table |

## Next steps

[Agents API](https://developers.cloudflare.com/agents/api-reference/agents-api/) Complete API reference for the Agents SDK.

[Schedule tasks](https://developers.cloudflare.com/agents/api-reference/schedule-tasks/) Time-based execution with cron and delays.

[Run Workflows](https://developers.cloudflare.com/agents/api-reference/run-workflows/) Durable multi-step background processing.

Back to top
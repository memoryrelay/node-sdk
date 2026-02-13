# MemoryRelay Node.js SDK

> Official Node.js/TypeScript SDK for MemoryRelay - semantic memory storage for AI agents

[![npm version](https://badge.fury.io/js/@memoryrelay%2Fsdk.svg)](https://www.npmjs.com/package/@memoryrelay/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Full TypeScript support** with complete type definitions
- 🔄 **Automatic retries** with exponential backoff
- 🚀 **Batch operations** for efficient bulk inserts
- 🔍 **Semantic search** powered by vector embeddings
- ⚡ **Promise-based API** (async/await)
- 🛡️ **Comprehensive error handling**
- 📝 **100% test coverage**

## Installation

```bash
npm install @memoryrelay/sdk
```

or with yarn:

```bash
yarn add @memoryrelay/sdk
```

## Quick Start

```typescript
import { MemoryRelay } from '@memoryrelay/sdk';

// Initialize client
const client = new MemoryRelay({
  apiKey: 'mem_your_api_key_here',
});

// Create a memory
const memory = await client.memories.create({
  content: 'User prefers dark mode',
  agent_id: 'my-agent',
  metadata: { source: 'settings' },
});

// Search memories
const results = await client.memories.search({
  query: 'user preferences',
  limit: 5,
});

console.log(results);
```

## Configuration

```typescript
const client = new MemoryRelay({
  apiKey: 'mem_your_api_key_here',
  baseURL: 'https://api.memoryrelay.net', // optional
  timeout: 30000,                          // optional (ms)
  maxRetries: 3,                           // optional
});
```

## API Reference

### Memories

#### Create Memory

```typescript
const memory = await client.memories.create({
  content: 'Memory content',
  agent_id: 'agent-id',
  metadata: { key: 'value' },  // optional
  user_id: 'user-123',          // optional
});
```

#### Get Memory

```typescript
const memory = await client.memories.get('memory-id');
```

#### Update Memory

```typescript
const memory = await client.memories.update('memory-id', {
  content: 'Updated content',
  metadata: { updated: true },
});
```

#### Delete Memory

```typescript
await client.memories.delete('memory-id');
```

#### Search Memories

```typescript
const results = await client.memories.search({
  query: 'search query',
  agent_id: 'agent-id',  // optional
  limit: 10,              // optional
  threshold: 0.7,         // optional
});
```

#### List Memories

```typescript
const memories = await client.memories.list({
  agent_id: 'agent-id',  // optional
  limit: 20,              // optional
  offset: 0,              // optional
});
```

#### Batch Create

```typescript
const response = await client.memories.createBatch([
  { content: 'Memory 1', agent_id: 'agent-1' },
  { content: 'Memory 2', agent_id: 'agent-1' },
  { content: 'Memory 3', agent_id: 'agent-2' },
]);

console.log(`Created ${response.succeeded}/${response.total} memories`);
console.log(`Total time: ${response.timing.total_ms}ms`);
```

### Entities

```typescript
// Create entity
const entity = await client.entities.create({
  name: 'John Doe',
  type: 'person',
  metadata: { role: 'user' },
});

// Get entity
const entity = await client.entities.get('entity-id');

// List entities
const entities = await client.entities.list({ limit: 10 });
```

### Agents

```typescript
// Create agent
const agent = await client.agents.create({
  id: 'my-agent',
  name: 'My Agent',
  description: 'Agent description',
});

// Get agent
const agent = await client.agents.get('agent-id');

// List agents
const agents = await client.agents.list();

// Get agent stats
const stats = await client.agents.stats('agent-id');
console.log(`Memories: ${stats.memory_count}`);
```

### Health Check

```typescript
const health = await client.health();
console.log(health.status); // "healthy"
```

## Error Handling

```typescript
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
  NetworkError,
  APIError,
} from '@memoryrelay/sdk';

try {
  const memory = await client.memories.create({
    content: 'Test',
    agent_id: 'agent-1',
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Invalid input:', error.message);
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.error('Resource not found');
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited, retry after:', error.retryAfter);
  } else if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
  } else if (error instanceof APIError) {
    console.error('API error:', error.statusCode, error.message);
  }
}
```

## TypeScript Support

The SDK is written in TypeScript and provides complete type definitions:

```typescript
import type {
  Memory,
  MemorySearchResult,
  BatchMemoryResponse,
  Entity,
  Agent,
  HealthStatus,
} from '@memoryrelay/sdk';

const memory: Memory = await client.memories.create({
  content: 'Test',
  agent_id: 'agent-1',
});
```

## Examples

### Basic Usage

```typescript
import { MemoryRelay } from '@memoryrelay/sdk';

const client = new MemoryRelay({ apiKey: process.env.MEMORYRELAY_API_KEY! });

// Store user preference
await client.memories.create({
  content: 'User prefers emails in the morning',
  agent_id: 'email-assistant',
  metadata: { category: 'preference', priority: 'high' },
});

// Retrieve relevant context
const context = await client.memories.search({
  query: 'when should I send emails',
  agent_id: 'email-assistant',
  limit: 3,
});

context.forEach((memory) => {
  console.log(`${memory.content} (score: ${memory.score})`);
});
```

### Batch Processing

```typescript
const newMemories = [
  { content: 'User clicked on product A', agent_id: 'analytics' },
  { content: 'User added item to cart', agent_id: 'analytics' },
  { content: 'User completed purchase', agent_id: 'analytics' },
];

const result = await client.memories.createBatch(newMemories);

console.log(`
  Success: ${result.succeeded}
  Failed: ${result.failed}
  Time: ${result.timing.total_ms}ms
  Avg: ${result.timing.avg_per_item_ms}ms/item
`);
```

### Error Handling with Retries

The SDK automatically retries failed requests with exponential backoff:

```typescript
const client = new MemoryRelay({
  apiKey: process.env.MEMORYRELAY_API_KEY!,
  maxRetries: 5,  // Retry up to 5 times
  timeout: 60000, // 60 second timeout
});

try {
  const memory = await client.memories.create({
    content: 'Important memory',
    agent_id: 'critical-agent',
  });
} catch (error) {
  // Only throws after all retries exhausted
  console.error('Failed after retries:', error);
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# Test with coverage
npm run test:coverage

# Lint
npm run lint

# Format
npm run format
```

## Requirements

- Node.js >= 16.0.0
- TypeScript >= 5.0.0 (for TypeScript users)

## Links

- **Documentation**: https://docs.memoryrelay.ai
- **API Reference**: https://api.memoryrelay.net/docs
- **GitHub**: https://github.com/memoryrelay/node-sdk
- **npm**: https://www.npmjs.com/package/@memoryrelay/sdk
- **Website**: https://memoryrelay.ai

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

- 📧 Email: support@memoryrelay.ai
- 💬 Discord: https://discord.gg/memoryrelay
- 🐛 Issues: https://github.com/memoryrelay/node-sdk/issues

---

Made with ❤️ by the MemoryRelay team

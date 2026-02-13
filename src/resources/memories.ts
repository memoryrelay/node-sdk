import type {
  Memory,
  MemorySearchResult,
  BatchMemoryInput,
  BatchMemoryResponse,
  CreateMemoryParams,
  UpdateMemoryParams,
  SearchMemoriesParams,
  ListMemoriesParams,
} from '../types';
import { ValidationError } from '../errors';
import type { MemoryRelay } from '../client';

export class MemoriesResource {
  constructor(private client: MemoryRelay) {}

  /**
   * Create a new memory
   */
  async create(params: CreateMemoryParams): Promise<Memory> {
    const { content, agent_id, metadata, user_id } = params;

    // Validation
    if (!content || content.trim().length === 0) {
      throw new ValidationError('content cannot be empty');
    }
    if (content.length > 10000) {
      throw new ValidationError('content cannot exceed 10000 characters');
    }
    if (!agent_id || agent_id.trim().length === 0) {
      throw new ValidationError('agent_id cannot be empty');
    }

    return this.client.request<Memory>('POST', '/v1/memories', {
      content,
      agent_id,
      metadata,
      user_id,
    });
  }

  /**
   * Get a memory by ID
   */
  async get(memoryId: string): Promise<Memory> {
    return this.client.request<Memory>('GET', `/v1/memories/${memoryId}`);
  }

  /**
   * Update a memory
   */
  async update(memoryId: string, params: UpdateMemoryParams): Promise<Memory> {
    const { content, metadata } = params;

    // Validation
    if (content !== undefined) {
      if (!content || content.trim().length === 0) {
        throw new ValidationError('content cannot be empty');
      }
      if (content.length > 10000) {
        throw new ValidationError('content cannot exceed 10000 characters');
      }
    }

    return this.client.request<Memory>('PUT', `/v1/memories/${memoryId}`, {
      content,
      metadata,
    });
  }

  /**
   * Delete a memory
   */
  async delete(memoryId: string): Promise<void> {
    await this.client.request<void>('DELETE', `/v1/memories/${memoryId}`);
  }

  /**
   * Search memories by semantic similarity
   */
  async search(params: SearchMemoriesParams): Promise<MemorySearchResult[]> {
    const { query, agent_id, limit = 10, threshold } = params;

    if (!query || query.trim().length === 0) {
      throw new ValidationError('query cannot be empty');
    }

    const response = await this.client.request<{ data: MemorySearchResult[] }>(
      'POST',
      '/v1/memories/search',
      { query, agent_id, limit, threshold }
    );

    return response.data;
  }

  /**
   * List memories
   */
  async list(params?: ListMemoriesParams): Promise<Memory[]> {
    const response = await this.client.request<{ data: Memory[] }>(
      'GET',
      '/v1/memories',
      undefined,
      params as Record<string, unknown>
    );

    return response.data;
  }

  /**
   * Create multiple memories in batch
   */
  async createBatch(memories: BatchMemoryInput[]): Promise<BatchMemoryResponse> {
    if (!Array.isArray(memories) || memories.length === 0) {
      throw new ValidationError('memories must be a non-empty array');
    }

    // Validate each memory
    memories.forEach((memory, index) => {
      if (!memory.content || memory.content.trim().length === 0) {
        throw new ValidationError(`Memory at index ${index}: content cannot be empty`);
      }
      if (memory.content.length > 10000) {
        throw new ValidationError(
          `Memory at index ${index}: content cannot exceed 10000 characters`
        );
      }
      if (!memory.agent_id || memory.agent_id.trim().length === 0) {
        throw new ValidationError(`Memory at index ${index}: agent_id cannot be empty`);
      }
    });

    return this.client.request<BatchMemoryResponse>('POST', '/v1/memories/batch', { memories });
  }
}

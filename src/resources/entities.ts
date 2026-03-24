import type { Entity } from '../types';
import type { MemoryRelay } from '../client';

export class EntitiesResource {
  constructor(private client: MemoryRelay) {}

  /**
   * Create a new entity
   */
  async create(params: {
    name: string;
    entity_type: string;
    metadata?: Record<string, unknown>;
  }): Promise<Entity> {
    return this.client.request<Entity>('POST', '/v1/entities', params);
  }

  /**
   * Get an entity by ID
   */
  async get(entityId: string): Promise<Entity> {
    return this.client.request<Entity>('GET', `/v1/entities/${entityId}`);
  }

  /**
   * List all entities
   */
  async list(params?: { limit?: number; offset?: number }): Promise<Entity[]> {
    const response = await this.client.request<{ data: Entity[] }>(
      'GET',
      '/v1/entities',
      undefined,
      params as Record<string, unknown>
    );
    return response.data;
  }

  /**
   * Update an entity
   */
  async update(
    entityId: string,
    params: { name?: string; entity_type?: string; metadata?: Record<string, unknown> }
  ): Promise<Entity> {
    return this.client.request<Entity>('PUT', `/v1/entities/${entityId}`, params);
  }

  /**
   * Delete an entity
   */
  async delete(entityId: string): Promise<void> {
    await this.client.request<void>('DELETE', `/v1/entities/${entityId}`);
  }

  /**
   * Link an entity to a memory
   */
  async link(params: { entity_id: string; memory_id: string; relationship?: string }): Promise<{
    entity_id: string;
    memory_id: string;
    relevance_score: number;
    created_at: string;
  }> {
    return this.client.request('POST', '/v1/entities/links', params);
  }
}

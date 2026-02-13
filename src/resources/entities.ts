import type { Entity } from '../types';
import type { MemoryRelay } from '../client';

export class EntitiesResource {
  constructor(private client: MemoryRelay) {}

  /**
   * Create a new entity
   */
  async create(params: {
    name: string;
    type: string;
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
}

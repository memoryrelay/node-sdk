import type { Agent } from '../types';
import type { MemoryRelay } from '../client';

export class AgentsResource {
  constructor(private client: MemoryRelay) {}

  /**
   * Create a new agent
   */
  async create(params: {
    id: string;
    name: string;
    description?: string;
    metadata?: Record<string, unknown>;
  }): Promise<Agent> {
    return this.client.request<Agent>('POST', '/v1/agents', params);
  }

  /**
   * Get an agent by ID
   */
  async get(agentId: string): Promise<Agent> {
    return this.client.request<Agent>('GET', `/v1/agents/${agentId}`);
  }

  /**
   * List all agents
   */
  async list(params?: { limit?: number; offset?: number }): Promise<Agent[]> {
    const response = await this.client.request<{ data: Agent[] }>(
      'GET',
      '/v1/agents',
      undefined,
      params as Record<string, unknown>
    );
    return response.data;
  }

  /**
   * Get agent statistics
   */
  async stats(agentId: string): Promise<{ memory_count: number; entity_count: number }> {
    return this.client.request<{ memory_count: number; entity_count: number }>(
      'GET',
      `/v1/agents/${agentId}/stats`
    );
  }
}

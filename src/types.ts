/**
 * Type definitions for MemoryRelay API
 */

export interface HealthStatus {
  status: string;
  version: string;
  services: {
    database: string;
    redis: string;
    embeddings: string;
  };
}

export interface Memory {
  id: string;
  content: string;
  agent_id: string;
  metadata?: Record<string, unknown>;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface MemorySearchResult {
  id: string;
  content: string;
  agent_id: string;
  metadata?: Record<string, unknown>;
  user_id?: string;
  score: number;
  created_at: string;
  updated_at: string;
}

export interface BatchMemoryInput {
  content: string;
  agent_id: string;
  metadata?: Record<string, unknown>;
  user_id?: string;
}

export interface BatchMemoryResult {
  success: boolean;
  memory_id?: string;
  error?: string;
  index: number;
}

export interface BatchMemoryResponse {
  results: BatchMemoryResult[];
  succeeded: number;
  failed: number;
  total: number;
  timing: {
    total_ms: number;
    avg_per_item_ms: number;
  };
}

export interface Entity {
  id: string;
  name: string;
  type: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MemoryRelayConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
}

export interface CreateMemoryParams {
  content: string;
  agent_id: string;
  metadata?: Record<string, unknown>;
  user_id?: string;
}

export interface UpdateMemoryParams {
  content?: string;
  metadata?: Record<string, unknown>;
}

export interface SearchMemoriesParams {
  query: string;
  agent_id?: string;
  limit?: number;
  threshold?: number;
}

export interface ListMemoriesParams {
  agent_id?: string;
  limit?: number;
  offset?: number;
}

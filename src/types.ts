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

/** An extracted entity embedded in a memory response. */
export interface EntityInfo {
  type: string;
  value: string;
  confidence: number;
}

export interface Memory {
  id: string;
  object?: string;
  content: string;
  agent_id: string;
  user_id?: string | null;
  metadata?: Record<string, unknown>;
  entities?: EntityInfo[];
  memory_type?: string | null;
  extraction_model?: string | null;
  extraction_method?: string | null;
  extraction_status?: string | null;
  visibility?: string | null;
  salience_score?: number | null;
  importance?: number | null;
  tier?: string | null;
  is_duplicate?: boolean;
  session_id?: string | null;
  project_id?: string | null;
  archived_at?: number | null;
  created_at: number;
  updated_at: number;
}

export interface MemorySearchResult {
  memory: Memory;
  score: number;
}

export interface BatchMemoryInput {
  content: string;
  agent_id: string;
  metadata?: Record<string, unknown>;
  user_id?: string;
}

export interface BatchMemoryResult {
  index: number;
  status: string;
  memory_id?: string;
  error?: string;
  error_code?: string;
  content_preview?: string;
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
  entity_type: string;
  metadata?: Record<string, unknown>;
  memory_count?: number;
  relationship_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  name: string;
  description?: string;
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  memory_count?: number;
  session_count?: number;
  project_count?: number;
  last_active_at?: string | null;
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
  visibility?: 'private' | 'confidential';
  memory_type?: string;
  importance?: number;
  tier?: string;
  session_id?: string;
  project?: string;
  deduplicate?: boolean;
  dedup_threshold?: number;
  auto_extract_entities?: boolean;
}

export interface UpdateMemoryParams {
  content?: string;
  metadata?: Record<string, unknown>;
}

export interface SearchMemoriesParams {
  query: string;
  agent_id?: string;
  limit?: number;
  min_score?: number;
}

export interface ListMemoriesParams {
  agent_id?: string;
  limit?: number;
  offset?: number;
}

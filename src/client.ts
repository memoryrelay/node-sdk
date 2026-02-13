import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import {
  APIError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  NetworkError,
  TimeoutError,
} from './errors';
import type { MemoryRelayConfig, HealthStatus } from './types';
import { MemoriesResource } from './resources/memories';
import { EntitiesResource } from './resources/entities';
import { AgentsResource } from './resources/agents';

const DEFAULT_BASE_URL = 'https://api.memoryrelay.net';
const DEFAULT_TIMEOUT = 30000;
const DEFAULT_MAX_RETRIES = 3;

export class MemoryRelay {
  private httpClient: AxiosInstance;
  private maxRetries: number;
  
  public readonly memories: MemoriesResource;
  public readonly entities: EntitiesResource;
  public readonly agents: AgentsResource;

  constructor(config: MemoryRelayConfig) {
    const { apiKey, baseURL = DEFAULT_BASE_URL, timeout = DEFAULT_TIMEOUT, maxRetries = DEFAULT_MAX_RETRIES } = config;

    if (!apiKey) {
      throw new ValidationError('API key is required');
    }

    this.maxRetries = maxRetries;

    this.httpClient = axios.create({
      baseURL,
      timeout,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'memoryrelay-node-sdk/0.1.0',
      },
    });

    // Initialize resources
    this.memories = new MemoriesResource(this);
    this.entities = new EntitiesResource(this);
    this.agents = new AgentsResource(this);
  }

  /**
   * Check API health status
   */
  async health(): Promise<HealthStatus> {
    const response = await this.request<HealthStatus>('GET', '/v1/health');
    return response;
  }

  /**
   * Make an HTTP request with retry logic
   */
  async request<T>(
    method: string,
    path: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response: AxiosResponse<T> = await this.httpClient.request({
          method,
          url: path,
          data,
          params,
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          // Network errors
          if (!axiosError.response) {
            lastError = new NetworkError(`Network error: ${axiosError.message}`);
            
            if (attempt < this.maxRetries - 1) {
              await this.sleep(2 ** attempt * 1000);
              continue;
            }
            throw lastError;
          }

          // HTTP errors
          const { status, data } = axiosError.response;

          // Don't retry client errors (except 429)
          if (status >= 400 && status < 500 && status !== 429) {
            this.handleErrorResponse(axiosError);
          }

          // Rate limiting
          if (status === 429) {
            const retryAfter = axiosError.response.headers['retry-after'];
            const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 2 ** attempt * 1000;
            
            if (attempt < this.maxRetries - 1) {
              await this.sleep(waitTime);
              continue;
            }
            
            throw new RateLimitError(
              (data as any)?.error || 'Rate limit exceeded',
              retryAfter ? parseInt(retryAfter, 10) : undefined
            );
          }

          // Server errors (5xx) - retry
          if (status >= 500) {
            lastError = new APIError(
              (data as any)?.error || 'Server error',
              status,
              data
            );
            
            if (attempt < this.maxRetries - 1) {
              await this.sleep(2 ** attempt * 1000);
              continue;
            }
            throw lastError;
          }

          // Other errors
          throw new APIError(
            (data as any)?.error || 'API error',
            status,
            data
          );
        }

        // Timeout errors
        if (error instanceof Error && error.message.includes('timeout')) {
          lastError = new TimeoutError('Request timeout');
          
          if (attempt < this.maxRetries - 1) {
            await this.sleep(2 ** attempt * 1000);
            continue;
          }
          throw lastError;
        }

        // Unknown errors
        throw error;
      }
    }

    // Should never reach here, but TypeScript needs it
    throw lastError || new APIError('Request failed after all retries', 500);
  }

  /**
   * Handle error responses
   */
  private handleErrorResponse(error: AxiosError): never {
    const { status, data } = error.response!;
    const message = (data as any)?.error || error.message;

    switch (status) {
      case 400:
        throw new ValidationError(message);
      case 401:
        throw new AuthenticationError(message);
      case 404:
        throw new NotFoundError(message);
      case 429:
        throw new RateLimitError(message);
      default:
        throw new APIError(message, status, data);
    }
  }

  /**
   * Sleep for a given number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

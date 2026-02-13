/**
 * Custom error classes for MemoryRelay API
 */

export class MemoryRelayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MemoryRelayError';
  }
}

export class APIError extends MemoryRelayError {
  constructor(
    message: string,
    public statusCode: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends APIError {
  constructor(
    message: string,
    public retryAfter?: number
  ) {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

export class NetworkError extends MemoryRelayError {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends MemoryRelayError {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

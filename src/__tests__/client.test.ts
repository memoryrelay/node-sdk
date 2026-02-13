import { MemoryRelay } from '../client';
import { ValidationError } from '../errors';
import nock from 'nock';

const BASE_URL = 'https://api.memoryrelay.net';
const API_KEY = 'test_key_123';

describe('MemoryRelay Client', () => {
  let client: MemoryRelay;

  beforeEach(() => {
    client = new MemoryRelay({ apiKey: API_KEY, baseURL: BASE_URL });
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('constructor', () => {
    it('should create client with required config', () => {
      expect(client).toBeInstanceOf(MemoryRelay);
      expect(client.memories).toBeDefined();
      expect(client.entities).toBeDefined();
      expect(client.agents).toBeDefined();
    });

    it('should throw error if API key is missing', () => {
      expect(() => new MemoryRelay({ apiKey: '' })).toThrow(ValidationError);
    });

    it('should use custom base URL', () => {
      const customClient = new MemoryRelay({
        apiKey: API_KEY,
        baseURL: 'https://custom.example.com',
      });
      expect(customClient).toBeInstanceOf(MemoryRelay);
    });
  });

  describe('health', () => {
    it('should check API health', async () => {
      const healthResponse = {
        status: 'healthy',
        version: '1.0.0',
        services: {
          database: 'up',
          redis: 'up',
          embeddings: 'up',
        },
      };

      nock(BASE_URL).get('/v1/health').reply(200, healthResponse);

      const health = await client.health();
      expect(health.status).toBe('healthy');
      expect(health.version).toBe('1.0.0');
    });
  });

  describe('retry logic', () => {
    it('should retry on network error', async () => {
      nock(BASE_URL)
        .get('/v1/health')
        .replyWithError('Network error')
        .get('/v1/health')
        .reply(200, { status: 'healthy', version: '1.0.0', services: {} });

      const health = await client.health();
      expect(health.status).toBe('healthy');
    });

    it('should retry on 5xx error', async () => {
      nock(BASE_URL)
        .get('/v1/health')
        .reply(500, { error: 'Server error' })
        .get('/v1/health')
        .reply(200, { status: 'healthy', version: '1.0.0', services: {} });

      const health = await client.health();
      expect(health.status).toBe('healthy');
    });

    it('should respect Retry-After header on 429', async () => {
      nock(BASE_URL)
        .get('/v1/health')
        .reply(429, { error: 'Rate limited' }, { 'retry-after': '1' })
        .get('/v1/health')
        .reply(200, { status: 'healthy', version: '1.0.0', services: {} });

      const health = await client.health();
      expect(health.status).toBe('healthy');
    });
  });
});

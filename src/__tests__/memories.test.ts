import { MemoryRelay } from '../client';
import { ValidationError, NotFoundError } from '../errors';
import nock from 'nock';

const BASE_URL = 'https://api.memoryrelay.net';
const API_KEY = 'test_key_123';

describe('MemoriesResource', () => {
  let client: MemoryRelay;

  beforeEach(() => {
    client = new MemoryRelay({ apiKey: API_KEY, baseURL: BASE_URL });
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('create', () => {
    it('should create a memory', async () => {
      const mockMemory = {
        id: 'mem_123',
        content: 'Test memory',
        agent_id: 'agent_1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      nock(BASE_URL).post('/v1/memories').reply(200, mockMemory);

      const memory = await client.memories.create({
        content: 'Test memory',
        agent_id: 'agent_1',
      });

      expect(memory.id).toBe('mem_123');
      expect(memory.content).toBe('Test memory');
    });

    it('should throw ValidationError for empty content', async () => {
      await expect(
        client.memories.create({
          content: '',
          agent_id: 'agent_1',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for empty agent_id', async () => {
      await expect(
        client.memories.create({
          content: 'Test',
          agent_id: '',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for content too long', async () => {
      await expect(
        client.memories.create({
          content: 'a'.repeat(10001),
          agent_id: 'agent_1',
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('get', () => {
    it('should get a memory by ID', async () => {
      const mockMemory = {
        id: 'mem_123',
        content: 'Test memory',
        agent_id: 'agent_1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      nock(BASE_URL).get('/v1/memories/mem_123').reply(200, mockMemory);

      const memory = await client.memories.get('mem_123');
      expect(memory.id).toBe('mem_123');
    });

    it('should throw NotFoundError for non-existent memory', async () => {
      nock(BASE_URL).get('/v1/memories/invalid').reply(404, { error: 'Memory not found' });

      await expect(client.memories.get('invalid')).rejects.toThrow(NotFoundError);
    });
  });

  describe('search', () => {
    it('should search memories', async () => {
      const mockResults = {
        data: [
          {
            id: 'mem_123',
            content: 'Test memory',
            agent_id: 'agent_1',
            score: 0.95,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      };

      nock(BASE_URL).post('/v1/memories/search').reply(200, mockResults);

      const results = await client.memories.search({
        query: 'test query',
        limit: 5,
      });

      expect(results).toHaveLength(1);
      expect(results[0].score).toBe(0.95);
    });

    it('should throw ValidationError for empty query', async () => {
      await expect(client.memories.search({ query: '' })).rejects.toThrow(ValidationError);
    });
  });

  describe('createBatch', () => {
    it('should create multiple memories', async () => {
      const mockResponse = {
        results: [
          { success: true, memory_id: 'mem_1', index: 0 },
          { success: true, memory_id: 'mem_2', index: 1 },
        ],
        succeeded: 2,
        failed: 0,
        total: 2,
        timing: { total_ms: 100, avg_per_item_ms: 50 },
      };

      nock(BASE_URL).post('/v1/memories/batch').reply(200, mockResponse);

      const response = await client.memories.createBatch([
        { content: 'Memory 1', agent_id: 'agent_1' },
        { content: 'Memory 2', agent_id: 'agent_1' },
      ]);

      expect(response.succeeded).toBe(2);
      expect(response.results).toHaveLength(2);
    });

    it('should throw ValidationError for empty array', async () => {
      await expect(client.memories.createBatch([])).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for invalid memory in batch', async () => {
      await expect(
        client.memories.createBatch([
          { content: '', agent_id: 'agent_1' }, // Empty content
        ])
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('update', () => {
    it('should update a memory', async () => {
      const mockMemory = {
        id: 'mem_123',
        content: 'Updated content',
        agent_id: 'agent_1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      nock(BASE_URL).put('/v1/memories/mem_123').reply(200, mockMemory);

      const memory = await client.memories.update('mem_123', {
        content: 'Updated content',
      });

      expect(memory.content).toBe('Updated content');
    });
  });

  describe('delete', () => {
    it('should delete a memory', async () => {
      nock(BASE_URL).delete('/v1/memories/mem_123').reply(204);

      await expect(client.memories.delete('mem_123')).resolves.toBeUndefined();
    });
  });

  describe('list', () => {
    it('should list memories', async () => {
      const mockMemories = {
        data: [
          {
            id: 'mem_1',
            content: 'Memory 1',
            agent_id: 'agent_1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
      };

      nock(BASE_URL).get('/v1/memories').reply(200, mockMemories);

      const memories = await client.memories.list();
      expect(memories).toHaveLength(1);
    });
  });
});

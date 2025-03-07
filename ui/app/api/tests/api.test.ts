// app/api/tests/api.test.ts
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import path from 'path';
import { createServer } from 'http';
import { parse } from 'url';
import { NextApiHandler } from 'next';
import prisma from '@/lib/prisma';

// Mock handler for testing (simplified)
const handler: NextApiHandler = async (req, res) => {
  res.status(200).json({ message: 'Mock endpoint' });
};

// Create a test server
const createTestServer = () => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname } = parsedUrl;

    // Map routes to handlers (simplified)
    const routes: Record<string, NextApiHandler> = {
      '/app/api/players': require('@/app/api/players/route').default,
      '/app/api/players/[player]': require('@/app/api/players/[player]/route').default,
      '/app/api/tasks': require('@/app/api/tasks/route').default,
      '/app/api/tasks/[task]': require('@/app/api/tasks/[task]/route').default,
    };

    const routeHandler = routes[pathname!] || handler;
    routeHandler(req, res);
  });
  return server;
};

describe('API Endpoints', () => {
  let server: any;
  let testPlayerAddress = '0x1234567890abcdef1234567890abcdef12345678';
  let testTaskId: number;

  beforeAll(async () => {
    server = createTestServer().listen(3000);
    // Clean up test data
    await prisma.player.deleteMany({ where: { address: testPlayerAddress } });
    await prisma.task.deleteMany({ where: { id: { gte: 1 } } });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.player.deleteMany({ where: { address: testPlayerAddress } });
    await prisma.task.deleteMany({ where: { id: testTaskId } });
    server.close();
  });

  // Players Endpoints (same tests as before, adjusted for new server)
  describe('Players API', () => {
    describe('GET /app/api/players', () => {
      it('should fetch all players', async () => {
        const response = await request(server).get('/app/api/players');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('POST /app/api/players', () => {
      it('should create a new player', async () => {
        const response = await request(server)
          .post('/app/api/players')
          .send({ address: testPlayerAddress, referredBy: null });
        expect(response.status).toBe(201);
        expect(response.body.address).toBe(testPlayerAddress);
        expect(typeof response.body.id === 'string' && response.body.id.length === 8).toBe(true);
      });
    });

    describe('GET /app/api/players/[player]', () => {
      it('should fetch a specific player', async () => {
        const response = await request(server).get(`/app/api/players/${testPlayerAddress}`);
        expect(response.status).toBe(200);
        expect(response.body.address).toBe(testPlayerAddress);
      });
    });

    describe('PUT /app/api/players/[player]', () => {
      it('should update a player', async () => {
        const response = await request(server)
          .put(`/app/api/players/${testPlayerAddress}`)
          .send({ points: 100 });
        expect(response.status).toBe(200);
        expect(response.body.points).toBe(100);
      });
    });

    describe('DELETE /app/api/players/[player]', () => {
      it('should delete a player', async () => {
        const response = await request(server).delete(`/app/api/players/${testPlayerAddress}`);
        expect(response.status).toBe(200);
        const checkResponse = await request(server).get(`/app/api/players/${testPlayerAddress}`);
        expect(checkResponse.status).toBe(404);
      });
    });
  });

  // Tasks Endpoints (same tests as before)
  describe('Tasks API', () => {
    describe('GET /app/api/tasks', () => {
      it('should fetch all tasks', async () => {
        const response = await request(server).get('/app/api/tasks');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('POST /app/api/tasks', () => {
      it('should create a new task', async () => {
        const response = await request(server)
          .post('/app/api/tasks')
          .send({
            playerAddress: testPlayerAddress,
            title: 'Test Task',
            description: 'A test task',
            type: 'DAILY',
            points: 10,
          });
        testTaskId = response.body.id;
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Task');
      });
    });

    describe('GET /app/api/tasks/[task]', () => {
      it('should fetch a specific task', async () => {
        const response = await request(server).get(`/app/api/tasks/${testTaskId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testTaskId);
      });
    });

    describe('PUT /app/api/tasks/[task]', () => {
      it('should update a task (mark as completed)', async () => {
        const response = await request(server)
          .put(`/app/api/tasks/${testTaskId}`)
          .send({ completed: true });
        expect(response.status).toBe(200);
        expect(response.body.completed).toBe(true);
      });
    });

    describe('DELETE /app/api/tasks/[task]', () => {
      it('should delete a task', async () => {
        const response = await request(server).delete(`/app/api/tasks/${testTaskId}`);
        expect(response.status).toBe(200);
        const checkResponse = await request(server).get(`/app/api/tasks/${testTaskId}`);
        expect(checkResponse.status).toBe(404);
      });
    });
  });
});
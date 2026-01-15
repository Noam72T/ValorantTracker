const request = require('supertest');
const app = require('../../app');

describe('Health Check - Tests Fonctionnels', () => {
  test('GET /health devrait retourner le statut OK', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toContain('Valorant Tracker API');
  });
});

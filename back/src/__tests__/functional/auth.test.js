const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../config/database');
const User = require('../../models/User');

describe('Auth API - Tests Fonctionnels', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  describe('POST /api/auth/register', () => {
    test('devrait créer un nouvel utilisateur avec succès', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          username: 'newuser'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.email).toBe('newuser@example.com');
      expect(response.body.data.user.password).toBeUndefined();
    });

    test('devrait rejeter un email déjà utilisé', async () => {
      await User.create({
        email: 'existing@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('déjà utilisé');
    });

    test('devrait rejeter une requête sans email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('devrait rejeter une requête sans mot de passe', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        email: 'login@example.com',
        password: 'password123',
        username: 'loginuser'
      });
    });

    test('devrait connecter un utilisateur avec des identifiants valides', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.email).toBe('login@example.com');
    });

    test('devrait rejeter un email incorrect', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    test('devrait rejeter un mot de passe incorrect', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/profile', () => {
    let token;
    let userId;

    beforeEach(async () => {
      const user = await User.create({
        email: 'profile@example.com',
        password: 'password123',
        username: 'profileuser'
      });
      userId = user.id;

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'profile@example.com',
          password: 'password123'
        });
      
      token = loginResponse.body.data.token;
    });

    test('devrait récupérer le profil avec un token valide', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('profile@example.com');
    });

    test('devrait rejeter une requête sans token', async () => {
      const response = await request(app)
        .get('/api/auth/profile');

      expect(response.status).toBe(401);
    });

    test('devrait rejeter une requête avec un token invalide', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/auth/profile', () => {
    let token;

    beforeEach(async () => {
      await User.create({
        email: 'update@example.com',
        password: 'password123',
        username: 'updateuser'
      });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'update@example.com',
          password: 'password123'
        });
      
      token = loginResponse.body.data.token;
    });

    test('devrait mettre à jour le profil utilisateur', async () => {
      const response = await request(app)
        .put('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'newusername',
          riotId: 'Player#1234'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.username).toBe('newusername');
      expect(response.body.data.user.riotId).toBe('Player#1234');
    });
  });

  describe('PUT /api/auth/password', () => {
    let token;

    beforeEach(async () => {
      await User.create({
        email: 'password@example.com',
        password: 'oldpassword123'
      });

      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'password@example.com',
          password: 'oldpassword123'
        });
      
      token = loginResponse.body.data.token;
    });

    test('devrait changer le mot de passe avec succès', async () => {
      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'oldpassword123',
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('devrait rejeter un mot de passe actuel incorrect', async () => {
      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    test('devrait rejeter un nouveau mot de passe trop court', async () => {
      const response = await request(app)
        .put('/api/auth/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: 'oldpassword123',
          newPassword: '123'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});

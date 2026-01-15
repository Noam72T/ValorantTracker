const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../config/database');
const { User, Favorite, Skin } = require('../../models');

describe('Favorites API - Tests Fonctionnels', () => {
  let token;
  let userId;
  let testSkin;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true, cascade: true });
    await Skin.destroy({ where: {}, truncate: true, cascade: true });
    await Favorite.destroy({ where: {}, truncate: true, cascade: true });

    const user = await User.create({
      email: 'favorites@example.com',
      password: 'password123'
    });
    userId = user.id;

    testSkin = await Skin.create({
      uuid: 'test-skin-uuid-123',
      displayName: 'Test Skin',
      displayIcon: 'https://example.com/icon.png',
      contentTierUuid: 'tier-uuid',
      price: 1775
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'favorites@example.com',
        password: 'password123'
      });
    
    token = loginResponse.body.data.token;
  });

  describe('GET /api/favorites', () => {
    test('devrait récupérer la liste des favoris vide', async () => {
      const response = await request(app)
        .get('/api/favorites')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    test('devrait récupérer la liste des favoris avec des éléments', async () => {
      await Favorite.create({
        userId,
        skinId: testSkin.id,
        notificationEnabled: true
      });

      const response = await request(app)
        .get('/api/favorites')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
    });
  });

  describe('POST /api/favorites', () => {
    test('devrait ajouter un skin aux favoris', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({
          skinId: testSkin.id,
          notificationEnabled: true
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('ajouté aux favoris');
    });

    test('devrait rejeter un skinId manquant', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({
          notificationEnabled: true
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('devrait rejeter un skin inexistant', async () => {
      const response = await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({
          skinId: '00000000-0000-0000-0000-000000000000'
        });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    test('devrait rejeter un doublon', async () => {
      await Favorite.create({
        userId,
        skinId: testSkin.id
      });

      const response = await request(app)
        .post('/api/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({
          skinId: testSkin.id
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('déjà dans vos favoris');
    });
  });

  describe('DELETE /api/favorites/:id', () => {
    let favoriteId;

    beforeEach(async () => {
      const favorite = await Favorite.create({
        userId,
        skinId: testSkin.id
      });
      favoriteId = favorite.id;
    });

    test('devrait supprimer un favori', async () => {
      const response = await request(app)
        .delete(`/api/favorites/${favoriteId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('retiré des favoris');
    });

    test('devrait rejeter un favori inexistant', async () => {
      const response = await request(app)
        .delete('/api/favorites/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/favorites/:id', () => {
    let favoriteId;

    beforeEach(async () => {
      const favorite = await Favorite.create({
        userId,
        skinId: testSkin.id,
        notificationEnabled: true
      });
      favoriteId = favorite.id;
    });

    test('devrait mettre à jour les notifications', async () => {
      const response = await request(app)
        .put(`/api/favorites/${favoriteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          notificationEnabled: false
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.notificationEnabled).toBe(false);
    });
  });
});

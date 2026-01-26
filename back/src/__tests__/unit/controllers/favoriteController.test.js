const { getFavorites, addFavorite, removeFavorite, updateFavorite } = require('../../../controllers/favoriteController');
const { Favorite, Skin } = require('../../../models');

jest.mock('../../../models');

describe('FavoriteController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 'user-123' },
      params: {},
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('devrait retourner tous les favoris de l\'utilisateur', async () => {
      const mockFavorites = [
        { id: 'fav-1', skinId: 'skin-1', userId: 'user-123', skin: { displayName: 'Skin 1' } },
        { id: 'fav-2', skinId: 'skin-2', userId: 'user-123', skin: { displayName: 'Skin 2' } }
      ];

      Favorite.findAll.mockResolvedValue(mockFavorites);

      await getFavorites(req, res, next);

      expect(Favorite.findAll).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        include: [{ model: Skin, as: 'skin' }],
        order: [['createdAt', 'DESC']]
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockFavorites
      });
    });

    it('devrait gérer les erreurs', async () => {
      const error = new Error('Database error');
      Favorite.findAll.mockRejectedValue(error);

      await getFavorites(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('addFavorite', () => {
    it('devrait ajouter un skin aux favoris', async () => {
      req.body = { skinId: 'skin-123', notificationEnabled: true };
      const mockSkin = { id: 'skin-123', displayName: 'Test Skin' };
      const mockFavorite = { id: 'fav-123', skinId: 'skin-123', userId: 'user-123' };
      const mockFavoriteWithSkin = { ...mockFavorite, skin: mockSkin };

      Skin.findByPk.mockResolvedValue(mockSkin);
      Favorite.findOrCreate.mockResolvedValue([mockFavorite, true]);
      Favorite.findByPk.mockResolvedValue(mockFavoriteWithSkin);

      await addFavorite(req, res, next);

      expect(Skin.findByPk).toHaveBeenCalledWith('skin-123');
      expect(Favorite.findOrCreate).toHaveBeenCalledWith({
        where: { userId: 'user-123', skinId: 'skin-123' },
        defaults: { userId: 'user-123', skinId: 'skin-123', notificationEnabled: true }
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Skin ajouté aux favoris',
        data: mockFavoriteWithSkin
      });
    });

    it('devrait retourner 400 si skinId manquant', async () => {
      req.body = {};

      await addFavorite(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'skinId est requis'
      });
    });

    it('devrait retourner 404 si skin non trouvé', async () => {
      req.body = { skinId: 'non-existent' };
      Skin.findByPk.mockResolvedValue(null);

      await addFavorite(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Skin non trouvé'
      });
    });

    it('devrait retourner 400 si skin déjà en favoris', async () => {
      req.body = { skinId: 'skin-123' };
      const mockSkin = { id: 'skin-123' };
      const mockFavorite = { id: 'fav-123' };

      Skin.findByPk.mockResolvedValue(mockSkin);
      Favorite.findOrCreate.mockResolvedValue([mockFavorite, false]);

      await addFavorite(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Ce skin est déjà dans vos favoris'
      });
    });
  });

  describe('removeFavorite', () => {
    it('devrait retirer un favori', async () => {
      req.params.id = 'fav-123';
      const mockFavorite = {
        id: 'fav-123',
        userId: 'user-123',
        destroy: jest.fn().mockResolvedValue()
      };

      Favorite.findOne.mockResolvedValue(mockFavorite);

      await removeFavorite(req, res, next);

      expect(Favorite.findOne).toHaveBeenCalledWith({
        where: { id: 'fav-123', userId: 'user-123' }
      });
      expect(mockFavorite.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Skin retiré des favoris'
      });
    });

    it('devrait retourner 404 si favori non trouvé', async () => {
      req.params.id = 'non-existent';
      Favorite.findOne.mockResolvedValue(null);

      await removeFavorite(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Favori non trouvé'
      });
    });
  });

  describe('updateFavorite', () => {
    it('devrait mettre à jour un favori', async () => {
      req.params.id = 'fav-123';
      req.body = { notificationEnabled: false };
      const mockFavorite = {
        id: 'fav-123',
        userId: 'user-123',
        notificationEnabled: true,
        save: jest.fn().mockResolvedValue()
      };
      const mockUpdatedFavorite = { ...mockFavorite, notificationEnabled: false };

      Favorite.findOne.mockResolvedValue(mockFavorite);
      Favorite.findByPk.mockResolvedValue(mockUpdatedFavorite);

      await updateFavorite(req, res, next);

      expect(mockFavorite.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Favori mis à jour',
        data: mockUpdatedFavorite
      });
    });

    it('devrait retourner 404 si favori non trouvé', async () => {
      req.params.id = 'non-existent';
      req.body = { notificationEnabled: false };
      Favorite.findOne.mockResolvedValue(null);

      await updateFavorite(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Favori non trouvé'
      });
    });
  });
});

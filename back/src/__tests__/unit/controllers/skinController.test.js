const { getAllSkins, getSkinById, createSkin } = require('../../../controllers/skinController');
const { Skin } = require('../../../models');

jest.mock('../../../models');

describe('SkinController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      params: {},
      body: {},
      user: { id: 'user-123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getAllSkins', () => {
    it('devrait retourner tous les skins avec pagination par défaut', async () => {
      const mockSkins = [
        { id: '1', displayName: 'Skin 1', rarity: 'Premium' },
        { id: '2', displayName: 'Skin 2', rarity: 'Ultra' }
      ];

      Skin.findAll.mockResolvedValue(mockSkins);
      Skin.count.mockResolvedValue(2);

      await getAllSkins(req, res, next);

      expect(Skin.findAll).toHaveBeenCalledWith({
        where: {},
        order: [['displayName', 'ASC']],
        limit: 50,
        offset: 0
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          skins: mockSkins,
          total: 2,
          limit: 50,
          offset: 0
        }
      });
    });

    it('devrait filtrer par rarity', async () => {
      req.query.rarity = 'Premium';
      Skin.findAll.mockResolvedValue([]);
      Skin.count.mockResolvedValue(0);

      await getAllSkins(req, res, next);

      expect(Skin.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { rarity: 'Premium' }
        })
      );
    });

    it('devrait filtrer par weaponType', async () => {
      req.query.weaponType = 'Vandal';
      Skin.findAll.mockResolvedValue([]);
      Skin.count.mockResolvedValue(0);

      await getAllSkins(req, res, next);

      expect(Skin.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { weaponType: 'Vandal' }
        })
      );
    });

    it('devrait rechercher par nom avec search', async () => {
      req.query.search = 'Prime';
      Skin.findAll.mockResolvedValue([]);
      Skin.count.mockResolvedValue(0);

      await getAllSkins(req, res, next);

      expect(Skin.findAll).toHaveBeenCalled();
    });

    it('devrait gérer les erreurs', async () => {
      const error = new Error('Database error');
      Skin.findAll.mockRejectedValue(error);

      await getAllSkins(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getSkinById', () => {
    it('devrait retourner un skin par ID', async () => {
      const mockSkin = { id: 'skin-123', displayName: 'Test Skin' };
      req.params.id = 'skin-123';
      Skin.findByPk.mockResolvedValue(mockSkin);

      await getSkinById(req, res, next);

      expect(Skin.findByPk).toHaveBeenCalledWith('skin-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockSkin
      });
    });

    it('devrait retourner 404 si skin non trouvé', async () => {
      req.params.id = 'non-existent';
      Skin.findByPk.mockResolvedValue(null);

      await getSkinById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Skin non trouvé'
      });
    });

    it('devrait gérer les erreurs', async () => {
      const error = new Error('Database error');
      req.params.id = 'skin-123';
      Skin.findByPk.mockRejectedValue(error);

      await getSkinById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createSkin', () => {
    it('devrait créer un nouveau skin', async () => {
      const skinData = {
        skinId: 'skin-123',
        name: 'Test Skin',
        displayName: 'Test Skin Display',
        rarity: 'Premium',
        price: 1775
      };
      req.body = skinData;

      const mockSkin = { ...skinData, id: 'uuid-123' };
      Skin.findOrCreate.mockResolvedValue([mockSkin, true]);

      await createSkin(req, res, next);

      expect(Skin.findOrCreate).toHaveBeenCalledWith({
        where: { skinId: 'skin-123' },
        defaults: expect.objectContaining(skinData)
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Skin créé',
        data: mockSkin
      });
    });

    it('devrait retourner le skin existant si déjà créé', async () => {
      const skinData = {
        skinId: 'skin-123',
        name: 'Test Skin',
        displayName: 'Test Skin Display'
      };
      req.body = skinData;

      const mockSkin = { ...skinData, id: 'uuid-123' };
      Skin.findOrCreate.mockResolvedValue([mockSkin, false]);

      await createSkin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Skin déjà existant',
        data: mockSkin
      });
    });

    it('devrait retourner 400 si skinId manquant', async () => {
      req.body = { name: 'Test', displayName: 'Test' };

      await createSkin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'skinId, name et displayName sont requis'
      });
    });

    it('devrait gérer les erreurs', async () => {
      const error = new Error('Database error');
      req.body = {
        skinId: 'skin-123',
        name: 'Test',
        displayName: 'Test'
      };
      Skin.findOrCreate.mockRejectedValue(error);

      await createSkin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

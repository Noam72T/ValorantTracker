const { getCurrentShop, getShopHistory } = require('../../../controllers/shopController');
const { Shop, Skin } = require('../../../models');

jest.mock('../../../models');

describe('ShopController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {},
      user: { id: 'user-123' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getCurrentShop', () => {
    it('devrait retourner la boutique actuelle', async () => {
      const mockShop = {
        id: 'shop-123',
        date: new Date(),
        skins: [
          { id: 'skin-1', displayName: 'Skin 1' },
          { id: 'skin-2', displayName: 'Skin 2' }
        ]
      };

      Shop.findOne.mockResolvedValue(mockShop);

      await getCurrentShop(req, res, next);

      expect(Shop.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockShop
      });
    });

    it('devrait retourner 404 si aucune boutique disponible', async () => {
      Shop.findOne.mockResolvedValue(null);

      await getCurrentShop(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Aucune boutique disponible'
      });
    });

    it('devrait gérer les erreurs', async () => {
      const error = new Error('Database error');
      Shop.findOne.mockRejectedValue(error);

      await getCurrentShop(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getShopHistory', () => {
    it('devrait retourner l\'historique de la boutique avec pagination', async () => {
      const mockShops = [
        { id: 'shop-1', date: new Date('2024-01-01') },
        { id: 'shop-2', date: new Date('2024-01-02') }
      ];

      Shop.findAll.mockResolvedValue(mockShops);
      Shop.count.mockResolvedValue(2);

      await getShopHistory(req, res, next);

      expect(Shop.findAll).toHaveBeenCalledWith({
        order: [['date', 'DESC']],
        limit: 30,
        offset: 0,
        include: expect.any(Array)
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          shops: mockShops,
          total: 2,
          limit: 30,
          offset: 0
        }
      });
    });

    it('devrait respecter les paramètres de pagination', async () => {
      req.query = { limit: '10', offset: '20' };
      Shop.findAll.mockResolvedValue([]);
      Shop.count.mockResolvedValue(0);

      await getShopHistory(req, res, next);

      expect(Shop.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 10,
          offset: 20
        })
      );
    });
  });
});

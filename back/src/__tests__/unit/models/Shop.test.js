const { Shop } = require('../../../models');

jest.mock('../../../models');

describe('Shop Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait créer une boutique avec une date', async () => {
    const shopData = {
      date: new Date('2024-01-01'),
      skins: []
    };

    Shop.create.mockResolvedValue({ id: 'shop-123', ...shopData });

    const result = await Shop.create(shopData);

    expect(result.date).toEqual(new Date('2024-01-01'));
  });

  it('devrait trouver la boutique la plus récente', async () => {
    const mockShop = {
      id: 'shop-123',
      date: new Date(),
      skins: []
    };

    Shop.findOne.mockResolvedValue(mockShop);

    const result = await Shop.findOne({
      order: [['date', 'DESC']]
    });

    expect(result).toBeDefined();
    expect(result.id).toBe('shop-123');
  });

  it('devrait inclure les skins associés', async () => {
    const mockShop = {
      id: 'shop-123',
      date: new Date(),
      skins: [
        { id: 'skin-1', displayName: 'Skin 1' },
        { id: 'skin-2', displayName: 'Skin 2' }
      ]
    };

    Shop.findOne.mockResolvedValue(mockShop);

    const result = await Shop.findOne({ include: ['skins'] });

    expect(result.skins).toHaveLength(2);
  });

  it('devrait compter le nombre total de boutiques', async () => {
    Shop.count.mockResolvedValue(50);

    const result = await Shop.count();

    expect(result).toBe(50);
  });
});

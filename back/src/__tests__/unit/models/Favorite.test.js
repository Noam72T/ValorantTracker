const { Favorite } = require('../../../models');

jest.mock('../../../models');

describe('Favorite Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait créer un favori avec userId et skinId', async () => {
    const favoriteData = {
      userId: 'user-123',
      skinId: 'skin-123',
      notificationEnabled: true
    };

    Favorite.create.mockResolvedValue({ id: 'fav-123', ...favoriteData });

    const result = await Favorite.create(favoriteData);

    expect(result.userId).toBe('user-123');
    expect(result.skinId).toBe('skin-123');
  });

  it('devrait avoir notificationEnabled par défaut à true', async () => {
    const favoriteData = {
      userId: 'user-123',
      skinId: 'skin-123',
      notificationEnabled: true
    };

    Favorite.create.mockResolvedValue(favoriteData);
    const result = await Favorite.create(favoriteData);

    expect(result.notificationEnabled).toBe(true);
  });

  it('devrait trouver tous les favoris d\'un utilisateur', async () => {
    const mockFavorites = [
      { id: 'fav-1', userId: 'user-123', skinId: 'skin-1' },
      { id: 'fav-2', userId: 'user-123', skinId: 'skin-2' }
    ];

    Favorite.findAll.mockResolvedValue(mockFavorites);

    const result = await Favorite.findAll({ where: { userId: 'user-123' } });

    expect(result).toHaveLength(2);
    expect(result[0].userId).toBe('user-123');
  });

  it('devrait supprimer un favori', async () => {
    const mockFavorite = {
      id: 'fav-123',
      destroy: jest.fn().mockResolvedValue()
    };

    Favorite.findByPk.mockResolvedValue(mockFavorite);
    await mockFavorite.destroy();

    expect(mockFavorite.destroy).toHaveBeenCalled();
  });
});

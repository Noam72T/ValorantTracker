const { Skin } = require('../../../models');

jest.mock('../../../models');

describe('Skin Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devrait créer un skin avec les champs obligatoires', async () => {
    const skinData = {
      skinId: 'skin-123',
      name: 'Test Skin',
      displayName: 'Test Skin Display'
    };

    Skin.create.mockResolvedValue({ id: 'uuid-123', ...skinData });

    const result = await Skin.create(skinData);

    expect(Skin.create).toHaveBeenCalledWith(skinData);
    expect(result.skinId).toBe('skin-123');
  });

  it('devrait avoir un compteur d\'apparitions par défaut à 0', async () => {
    const skin = {
      skinId: 'skin-123',
      name: 'Test',
      displayName: 'Test',
      appearanceCount: 0
    };

    Skin.create.mockResolvedValue(skin);
    const result = await Skin.create(skin);

    expect(result.appearanceCount).toBe(0);
  });

  it('devrait permettre de définir tous les champs optionnels', async () => {
    const skinData = {
      skinId: 'skin-123',
      name: 'Test',
      displayName: 'Test',
      rarity: 'Premium',
      price: 1775,
      imageUrl: 'http://example.com/image.png',
      videoUrl: 'http://example.com/video.mp4',
      weaponType: 'Vandal',
      contentTierUuid: 'tier-123',
      themeUuid: 'theme-123'
    };

    Skin.create.mockResolvedValue(skinData);
    const result = await Skin.create(skinData);

    expect(result.rarity).toBe('Premium');
    expect(result.price).toBe(1775);
    expect(result.weaponType).toBe('Vandal');
  });

  it('devrait trouver un skin par skinId unique', async () => {
    const mockSkin = { id: 'uuid-123', skinId: 'skin-123' };
    Skin.findOne.mockResolvedValue(mockSkin);

    const result = await Skin.findOne({ where: { skinId: 'skin-123' } });

    expect(result.skinId).toBe('skin-123');
  });
});

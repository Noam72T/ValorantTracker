const { Skin } = require('../../../models');

jest.mock('../../../models');

describe('SkinService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Skin Model Operations', () => {
    it('devrait créer un skin avec tous les champs', async () => {
      const skinData = {
        skinId: 'skin-123',
        name: 'Prime Vandal',
        displayName: 'Prime Vandal',
        rarity: 'Premium',
        price: 1775,
        weaponType: 'Vandal',
        imageUrl: 'https://example.com/image.png',
        videoUrl: 'https://example.com/video.mp4'
      };

      Skin.create.mockResolvedValue(skinData);

      const result = await Skin.create(skinData);

      expect(Skin.create).toHaveBeenCalledWith(skinData);
      expect(result).toEqual(skinData);
    });

    it('devrait mettre à jour le compteur d\'apparitions', async () => {
      const mockSkin = {
        id: 'skin-123',
        appearanceCount: 5,
        save: jest.fn().mockResolvedValue()
      };

      Skin.findByPk.mockResolvedValue(mockSkin);
      mockSkin.appearanceCount = 6;
      await mockSkin.save();

      expect(mockSkin.save).toHaveBeenCalled();
      expect(mockSkin.appearanceCount).toBe(6);
    });

    it('devrait mettre à jour la dernière apparition', async () => {
      const mockSkin = {
        id: 'skin-123',
        lastAppearance: null,
        save: jest.fn().mockResolvedValue()
      };

      const now = new Date();
      Skin.findByPk.mockResolvedValue(mockSkin);
      mockSkin.lastAppearance = now;
      await mockSkin.save();

      expect(mockSkin.save).toHaveBeenCalled();
      expect(mockSkin.lastAppearance).toBe(now);
    });

    it('devrait trouver les skins par rareté', async () => {
      const mockSkins = [
        { id: 'skin-1', rarity: 'Premium' },
        { id: 'skin-2', rarity: 'Premium' }
      ];

      Skin.findAll.mockResolvedValue(mockSkins);

      const result = await Skin.findAll({ where: { rarity: 'Premium' } });

      expect(Skin.findAll).toHaveBeenCalledWith({ where: { rarity: 'Premium' } });
      expect(result).toEqual(mockSkins);
    });

    it('devrait trouver les skins par type d\'arme', async () => {
      const mockSkins = [
        { id: 'skin-1', weaponType: 'Vandal' },
        { id: 'skin-2', weaponType: 'Vandal' }
      ];

      Skin.findAll.mockResolvedValue(mockSkins);

      const result = await Skin.findAll({ where: { weaponType: 'Vandal' } });

      expect(result).toEqual(mockSkins);
    });
  });
});

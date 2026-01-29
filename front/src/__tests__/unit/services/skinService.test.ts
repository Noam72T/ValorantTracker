import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as skinService from '../../../services/skinService';
import api from '../../../services/api';

vi.mock('../../../services/api');

describe('SkinService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllSkins', () => {
    it('devrait récupérer tous les skins', async () => {
      const mockSkins = {
        data: {
          skins: [
            { id: '1', displayName: 'Skin 1' },
            { id: '2', displayName: 'Skin 2' }
          ],
          total: 2
        }
      };

      vi.mocked(api.get).mockResolvedValue(mockSkins);

      const result = await skinService.getAllSkins();

      expect(api.get).toHaveBeenCalledWith('/skins');
      expect(result.data.skins).toHaveLength(2);
    });

    it('devrait accepter les paramètres de pagination', async () => {
      const mockResponse = { data: { skins: [], total: 0 } };
      vi.mocked(api.get).mockResolvedValue(mockResponse);

      await skinService.getAllSkins({ limit: 10, offset: 20 });

      expect(api.get).toHaveBeenCalledWith('/skins', {
        params: { limit: 10, offset: 20 }
      });
    });

    it('devrait filtrer par rarity', async () => {
      const mockResponse = { data: { skins: [], total: 0 } };
      vi.mocked(api.get).mockResolvedValue(mockResponse);

      await skinService.getAllSkins({ rarity: 'Premium' });

      expect(api.get).toHaveBeenCalledWith('/skins', {
        params: { rarity: 'Premium' }
      });
    });
  });

  describe('getSkinById', () => {
    it('devrait récupérer un skin par ID', async () => {
      const mockSkin = {
        data: { id: 'skin-123', displayName: 'Test Skin' }
      };

      vi.mocked(api.get).mockResolvedValue(mockSkin);

      const result = await skinService.getSkinById('skin-123');

      expect(api.get).toHaveBeenCalledWith('/skins/skin-123');
      expect(result.data.id).toBe('skin-123');
    });

    it('devrait gérer les erreurs', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Not found'));

      await expect(skinService.getSkinById('invalid')).rejects.toThrow();
    });
  });
});

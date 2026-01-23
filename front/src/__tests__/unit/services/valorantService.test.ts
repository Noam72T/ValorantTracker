import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as valorantService from '../../../services/valorantService';
import api from '../../../services/api';

vi.mock('../../../services/api');

describe('ValorantService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getValorantShop', () => {
    it('devrait récupérer la boutique Valorant', async () => {
      const mockShop = {
        data: {
          skins: [
            { uuid: 'skin-1', displayName: 'Skin 1' },
            { uuid: 'skin-2', displayName: 'Skin 2' }
          ]
        }
      };

      vi.mocked(api.get).mockResolvedValue(mockShop);

      const result = await valorantService.getValorantShop();

      expect(api.get).toHaveBeenCalledWith('/valorant/shop');
      expect(result.data.skins).toHaveLength(2);
    });

    it('devrait gérer les erreurs d\'authentification', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Unauthorized'));

      await expect(valorantService.getValorantShop()).rejects.toThrow();
    });
  });

  describe('syncSkins', () => {
    it('devrait synchroniser les skins', async () => {
      const mockResponse = {
        data: { message: 'Skins synchronized', count: 50 }
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);

      const result = await valorantService.syncSkins();

      expect(api.post).toHaveBeenCalledWith('/valorant/sync');
      expect(result.data.count).toBe(50);
    });
  });
});

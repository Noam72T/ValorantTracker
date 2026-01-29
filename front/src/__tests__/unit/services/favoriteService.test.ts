import { describe, it, expect, beforeEach, vi } from 'vitest';
import { favoriteService } from '@/services/favoriteService';
import api from '@/services/api';

vi.mock('@/services/api');

describe('FavoriteService - Tests Unitaires', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('devrait récupérer la liste des favoris', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            { id: '1', skinId: 'skin-1', notificationEnabled: true },
            { id: '2', skinId: 'skin-2', notificationEnabled: false }
          ]
        }
      };

      vi.mocked(api.get).mockResolvedValue(mockResponse);

      const result = await favoriteService.getFavorites();

      expect(api.get).toHaveBeenCalledWith('/favorites');
      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
    });
  });

  describe('addFavorite', () => {
    it('devrait ajouter un skin aux favoris', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Skin ajouté aux favoris',
          data: { id: '1', skinId: 'skin-123', notificationEnabled: true }
        }
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);

      const result = await favoriteService.addFavorite('skin-123');

      expect(api.post).toHaveBeenCalledWith('/favorites', {
        skinId: 'skin-123',
        notificationEnabled: true
      });
      expect(result.id).toBe('1');
      expect(result.skinId).toBe('skin-123');
    });
  });

  describe('removeFavorite', () => {
    it('devrait supprimer un favori', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Skin retiré des favoris'
        }
      };

      vi.mocked(api.delete).mockResolvedValue(mockResponse);

      await favoriteService.removeFavorite('favorite-123');

      expect(api.delete).toHaveBeenCalledWith('/favorites/favorite-123');
    });
  });

  describe('updateFavorite', () => {
    it('devrait mettre à jour les notifications d\'un favori', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: { id: '1', notificationEnabled: false }
        }
      };

      vi.mocked(api.put).mockResolvedValue(mockResponse);

      const result = await favoriteService.updateFavorite('favorite-123', false);

      expect(api.put).toHaveBeenCalledWith('/favorites/favorite-123', {
        notificationEnabled: false
      });
      expect(result.notificationEnabled).toBe(false);
    });
  });
});

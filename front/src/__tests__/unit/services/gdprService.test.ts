import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as gdprService from '../../../services/gdprService';
import api from '../../../services/api';

vi.mock('../../../services/api');

describe('GDPRService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('exportUserData', () => {
    it('devrait exporter les données utilisateur', async () => {
      const mockData = {
        data: {
          user: { id: 'user-123', email: 'test@example.com' },
          favorites: [],
          shops: []
        }
      };

      vi.mocked(api.get).mockResolvedValue(mockData);

      const result = await gdprService.exportUserData();

      expect(api.get).toHaveBeenCalledWith('/gdpr/export');
      expect(result.data.user.id).toBe('user-123');
    });
  });

  describe('deleteUserData', () => {
    it('devrait supprimer les données utilisateur', async () => {
      const mockResponse = {
        data: { message: 'Data deleted successfully' }
      };

      vi.mocked(api.delete).mockResolvedValue(mockResponse);

      const result = await gdprService.deleteUserData();

      expect(api.delete).toHaveBeenCalledWith('/gdpr/delete');
      expect(result.data.message).toBe('Data deleted successfully');
    });

    it('devrait nécessiter une confirmation', async () => {
      vi.mocked(api.delete).mockRejectedValue(new Error('Confirmation required'));

      await expect(gdprService.deleteUserData()).rejects.toThrow();
    });
  });

  describe('getPrivacySettings', () => {
    it('devrait récupérer les paramètres de confidentialité', async () => {
      const mockSettings = {
        data: {
          dataSharing: false,
          analytics: true,
          notifications: true
        }
      };

      vi.mocked(api.get).mockResolvedValue(mockSettings);

      const result = await gdprService.getPrivacySettings();

      expect(api.get).toHaveBeenCalledWith('/gdpr/settings');
      expect(result.data.dataSharing).toBe(false);
    });
  });
});

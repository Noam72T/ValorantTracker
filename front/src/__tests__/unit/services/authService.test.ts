import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '@/services/authService';
import api from '@/services/api';

vi.mock('@/services/api');

describe('AuthService - Tests Unitaires', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('register', () => {
    it('devrait enregistrer un utilisateur et stocker le token', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Compte créé avec succès',
          data: {
            token: 'test-token-123',
            user: {
              id: 'user-id-123',
              email: 'test@example.com',
              username: 'testuser'
            }
          }
        }
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);

      const result = await authService.register('test@example.com', 'password123', 'testuser');

      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      });
      expect(result.success).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token-123');
    });
  });

  describe('login', () => {
    it('devrait connecter un utilisateur et stocker le token', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Connexion réussie',
          data: {
            token: 'login-token-456',
            user: {
              id: 'user-id-456',
              email: 'login@example.com'
            }
          }
        }
      };

      vi.mocked(api.post).mockResolvedValue(mockResponse);

      const result = await authService.login('login@example.com', 'password123');

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'login@example.com',
        password: 'password123'
      });
      expect(result.success).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'login-token-456');
    });
  });

  describe('getProfile', () => {
    it('devrait récupérer le profil utilisateur', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: 'user-id-789',
              email: 'profile@example.com',
              username: 'profileuser'
            }
          }
        }
      };

      vi.mocked(api.get).mockResolvedValue(mockResponse);

      const result = await authService.getProfile();

      expect(api.get).toHaveBeenCalledWith('/auth/profile');
      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('profile@example.com');
    });
  });

  describe('updateProfile', () => {
    it('devrait mettre à jour le profil utilisateur', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: 'user-id-789',
              email: 'updated@example.com',
              username: 'updateduser',
              riotId: 'Player#1234'
            }
          }
        }
      };

      vi.mocked(api.put).mockResolvedValue(mockResponse);

      const result = await authService.updateProfile({
        username: 'updateduser',
        riotId: 'Player#1234'
      });

      expect(api.put).toHaveBeenCalledWith('/auth/profile', {
        username: 'updateduser',
        riotId: 'Player#1234'
      });
      expect(result.success).toBe(true);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('updatePassword', () => {
    it('devrait mettre à jour le mot de passe', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Mot de passe mis à jour avec succès'
        }
      };

      vi.mocked(api.put).mockResolvedValue(mockResponse);

      const result = await authService.updatePassword('oldpass123', 'newpass123');

      expect(api.put).toHaveBeenCalledWith('/auth/password', {
        currentPassword: 'oldpass123',
        newPassword: 'newpass123'
      });
      expect(result.success).toBe(true);
    });
  });

  describe('logout', () => {
    it('devrait supprimer le token et les données utilisateur', () => {
      authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });

  describe('getToken', () => {
    it('devrait récupérer le token depuis localStorage', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('stored-token');

      const token = authService.getToken();

      expect(localStorage.getItem).toHaveBeenCalledWith('token');
      expect(token).toBe('stored-token');
    });
  });

  describe('getUser', () => {
    it('devrait récupérer et parser l\'utilisateur depuis localStorage', () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(mockUser));

      const user = authService.getUser();

      expect(localStorage.getItem).toHaveBeenCalledWith('user');
      expect(user).toEqual(mockUser);
    });

    it('devrait retourner null si aucun utilisateur stocké', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);

      const user = authService.getUser();

      expect(user).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('devrait retourner true si un token existe', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('token-exists');

      const isAuth = authService.isAuthenticated();

      expect(isAuth).toBe(true);
    });

    it('devrait retourner false si aucun token', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);

      const isAuth = authService.isAuthenticated();

      expect(isAuth).toBe(false);
    });
  });
});

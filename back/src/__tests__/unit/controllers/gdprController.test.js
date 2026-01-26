const { updateConsent, exportUserData, requestDeletion, cancelDeletion, deleteAccount, getConsentStatus } = require('../../../controllers/gdprController');
const User = require('../../../models/User');
const { Favorite, Match, Shop, StatsCollection, UserStats } = require('../../../models');

jest.mock('../../../models/User');
jest.mock('../../../models');

describe('GDPR Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { id: 'test-user-id' },
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateConsent', () => {
    it('should update user consent successfully', async () => {
      const mockUser = {
        id: 'test-user-id',
        consentGiven: false,
        dataProcessingConsent: false,
        marketingConsent: false,
        save: jest.fn()
      };

      User.findByPk.mockResolvedValue(mockUser);

      req.body = {
        consentGiven: true,
        dataProcessingConsent: true,
        marketingConsent: false
      };

      await updateConsent(req, res, next);

      expect(mockUser.consentGiven).toBe(true);
      expect(mockUser.dataProcessingConsent).toBe(true);
      expect(mockUser.marketingConsent).toBe(false);
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Préférences de consentement mises à jour'
        })
      );
    });

    it('should return 404 if user not found', async () => {
      User.findByPk.mockResolvedValue(null);

      await updateConsent(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    });
  });

  describe('exportUserData', () => {
    it('should export all user data successfully', async () => {
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        toJSON: jest.fn().mockReturnValue({ id: 'test-user-id', email: 'test@example.com' })
      };

      User.findByPk.mockResolvedValue(mockUser);
      Favorite.findAll = jest.fn().mockResolvedValue([]);
      Match.findAll = jest.fn().mockResolvedValue([]);
      Shop.findAll = jest.fn().mockResolvedValue([]);
      UserStats.findAll = jest.fn().mockResolvedValue([]);
      StatsCollection.findAll = jest.fn().mockResolvedValue([]);

      await exportUserData(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Données exportées avec succès',
          data: expect.objectContaining({
            user: expect.any(Object),
            favorites: expect.any(Array),
            matches: expect.any(Array),
            exportDate: expect.any(String)
          })
        })
      );
    });
  });

  describe('requestDeletion', () => {
    it('should request account deletion successfully', async () => {
      const mockUser = {
        id: 'test-user-id',
        deletionRequestedAt: null,
        save: jest.fn()
      };

      User.findByPk.mockResolvedValue(mockUser);

      await requestDeletion(req, res, next);

      expect(mockUser.deletionRequestedAt).toBeTruthy();
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.stringContaining('30 jours')
        })
      );
    });
  });

  describe('cancelDeletion', () => {
    it('should cancel deletion request successfully', async () => {
      const mockUser = {
        id: 'test-user-id',
        deletionRequestedAt: new Date(),
        save: jest.fn()
      };

      User.findByPk.mockResolvedValue(mockUser);

      await cancelDeletion(req, res, next);

      expect(mockUser.deletionRequestedAt).toBeNull();
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should return error if no deletion request exists', async () => {
      const mockUser = {
        id: 'test-user-id',
        deletionRequestedAt: null
      };

      User.findByPk.mockResolvedValue(mockUser);

      await cancelDeletion(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Aucune demande de suppression en cours'
      });
    });
  });

  describe('deleteAccount', () => {
    it('should delete account with correct password', async () => {
      const mockUser = {
        id: 'test-user-id',
        comparePassword: jest.fn().mockResolvedValue(true),
        destroy: jest.fn()
      };

      User.findByPk.mockResolvedValue(mockUser);
      Favorite.destroy = jest.fn();
      Match.destroy = jest.fn();
      Shop.destroy = jest.fn();
      UserStats.destroy = jest.fn();
      StatsCollection.destroy = jest.fn();

      req.body.password = 'correct-password';

      await deleteAccount(req, res, next);

      expect(mockUser.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Compte et données supprimés définitivement'
      });
    });

    it('should return error with incorrect password', async () => {
      const mockUser = {
        id: 'test-user-id',
        comparePassword: jest.fn().mockResolvedValue(false)
      };

      User.findByPk.mockResolvedValue(mockUser);
      req.body.password = 'wrong-password';

      await deleteAccount(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Mot de passe incorrect'
      });
    });
  });

  describe('getConsentStatus', () => {
    it('should return consent status successfully', async () => {
      const mockUser = {
        consentGiven: true,
        consentDate: new Date(),
        dataProcessingConsent: true,
        marketingConsent: false,
        deletionRequestedAt: null
      };

      User.findByPk.mockResolvedValue(mockUser);

      await getConsentStatus(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: expect.objectContaining({
            consentGiven: true,
            dataProcessingConsent: true,
            marketingConsent: false
          })
        })
      );
    });
  });
});

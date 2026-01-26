const { register, login, getMe } = require('../../../controllers/authController');
const { User } = require('../../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../../models');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthController', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('devrait créer un nouvel utilisateur', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!'
      };

      const hashedPassword = 'hashed_password';
      const mockUser = {
        id: 'user-123',
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(hashedPassword);
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('mock_token');

      await register(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 10);
      expect(User.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('devrait retourner 400 si email déjà utilisé', async () => {
      req.body = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'Password123!'
      };

      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('login', () => {
    it('devrait connecter un utilisateur avec des identifiants valides', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'Password123!'
      };

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed_password',
        username: 'testuser'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mock_token');

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' }
      });
      expect(bcrypt.compare).toHaveBeenCalledWith('Password123!', 'hashed_password');
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('devrait retourner 401 si email invalide', async () => {
      req.body = {
        email: 'wrong@example.com',
        password: 'Password123!'
      };

      User.findOne.mockResolvedValue(null);

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('devrait retourner 401 si mot de passe invalide', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'WrongPassword'
      };

      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        password: 'hashed_password'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  describe('getMe', () => {
    it('devrait retourner les informations de l\'utilisateur connecté', async () => {
      req.user = { id: 'user-123' };
      const mockUser = {
        id: 'user-123',
        username: 'testuser',
        email: 'test@example.com'
      };

      User.findByPk.mockResolvedValue(mockUser);

      await getMe(req, res, next);

      expect(User.findByPk).toHaveBeenCalledWith('user-123', {
        attributes: { exclude: ['password'] }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUser
      });
    });
  });
});

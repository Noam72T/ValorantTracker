const { verifyToken } = require('../../../utils/jwt');
const auth = require('../../../middlerware/auth');

jest.mock('../../../utils/jwt');

describe('Auth Middleware - Tests Unitaires', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  test('devrait rejeter une requête sans token', () => {
    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: expect.any(String)
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('devrait rejeter un token invalide', () => {
    req.headers.authorization = 'Bearer invalid-token';
    verifyToken.mockReturnValue(null);

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('devrait accepter un token valide', () => {
    req.headers.authorization = 'Bearer valid-token';
    verifyToken.mockReturnValue({ id: 'user-123' });

    auth(req, res, next);

    expect(req.user).toEqual({ id: 'user-123' });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('devrait extraire le token du format Bearer', () => {
    req.headers.authorization = 'Bearer test-token-456';
    verifyToken.mockReturnValue({ id: 'user-456' });

    auth(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith('test-token-456');
    expect(req.user).toEqual({ id: 'user-456' });
  });
});

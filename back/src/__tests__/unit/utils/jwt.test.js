const { generateToken, verifyToken } = require('../../../utils/jwt');
const jwt = require('jsonwebtoken');

describe('JWT Utils - Tests Unitaires', () => {
  const testUserId = 'test-user-id-123';

  describe('generateToken', () => {
    test('devrait générer un token JWT valide', () => {
      const token = generateToken(testUserId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    test('le token devrait contenir l\'userId', () => {
      const token = generateToken(testUserId);
      const decoded = jwt.decode(token);
      
      expect(decoded.userId).toBe(testUserId);
    });

    test('le token devrait avoir une date d\'expiration', () => {
      const token = generateToken(testUserId);
      const decoded = jwt.decode(token);
      
      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Date.now() / 1000);
    });
  });

  describe('verifyToken', () => {
    test('devrait vérifier un token valide', () => {
      const token = generateToken(testUserId);
      const decoded = verifyToken(token);
      
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(testUserId);
    });

    test('devrait rejeter un token invalide', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => verifyToken(invalidToken)).toThrow();
    });

    test('devrait rejeter un token expiré', () => {
      const expiredToken = jwt.sign(
        { userId: testUserId },
        process.env.JWT_SECRET,
        { expiresIn: '-1h' }
      );
      
      expect(() => verifyToken(expiredToken)).toThrow();
    });
  });
});

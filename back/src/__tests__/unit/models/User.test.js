const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

describe('User Model - Tests Unitaires', () => {
  describe('Validation des champs', () => {
    test('devrait créer un utilisateur avec des données valides', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      };

      const user = User.build(userData);
      expect(user.email).toBe('test@example.com');
      expect(user.username).toBe('testuser');
    });

    test('devrait normaliser l\'email en minuscules', () => {
      const user = User.build({
        email: 'TEST@EXAMPLE.COM',
        password: 'password123'
      });

      expect(user.email).toBe('test@example.com');
    });

    test('devrait rejeter un email invalide', async () => {
      const user = User.build({
        email: 'invalid-email',
        password: 'password123'
      });

      await expect(user.validate()).rejects.toThrow();
    });

    test('devrait rejeter un mot de passe trop court', async () => {
      const user = User.build({
        email: 'test@example.com',
        password: '123'
      });

      await expect(user.validate()).rejects.toThrow();
    });
  });

  describe('Méthode comparePassword', () => {
    test('devrait retourner true pour un mot de passe correct', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = User.build({
        email: 'test@example.com',
        password: hashedPassword
      });

      const isValid = await user.comparePassword(password);
      expect(isValid).toBe(true);
    });

    test('devrait retourner false pour un mot de passe incorrect', async () => {
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = User.build({
        email: 'test@example.com',
        password: hashedPassword
      });

      const isValid = await user.comparePassword('wrongpassword');
      expect(isValid).toBe(false);
    });
  });

  describe('Méthode toJSON', () => {
    test('ne devrait pas exposer le mot de passe', () => {
      const user = User.build({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      });

      const json = user.toJSON();
      expect(json.password).toBeUndefined();
      expect(json.email).toBe('test@example.com');
      expect(json.username).toBe('testuser');
    });
  });
});

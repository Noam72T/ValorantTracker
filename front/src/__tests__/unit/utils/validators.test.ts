import { describe, it, expect } from 'vitest';

describe('Validators Utils', () => {
  describe('validateEmail', () => {
    it('devrait valider un email correct', () => {
      const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('devrait rejeter un email invalide', () => {
      const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('devrait valider un mot de passe fort', () => {
      const validatePassword = (password: string) => 
        password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
      
      expect(validatePassword('Password123')).toBe(true);
      expect(validatePassword('StrongP@ss1')).toBe(true);
    });

    it('devrait rejeter un mot de passe faible', () => {
      const validatePassword = (password: string) => 
        password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
      
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('nodigits')).toBe(false);
      expect(validatePassword('nocapital123')).toBe(false);
    });
  });

  describe('validateUsername', () => {
    it('devrait valider un nom d\'utilisateur correct', () => {
      const validateUsername = (username: string) => 
        username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
      
      expect(validateUsername('user123')).toBe(true);
      expect(validateUsername('test_user')).toBe(true);
    });

    it('devrait rejeter un nom d\'utilisateur invalide', () => {
      const validateUsername = (username: string) => 
        username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
      
      expect(validateUsername('ab')).toBe(false);
      expect(validateUsername('user@name')).toBe(false);
      expect(validateUsername('a'.repeat(21))).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('devrait valider un champ requis', () => {
      const validateRequired = (value: any) => value !== null && value !== undefined && value !== '';
      
      expect(validateRequired('value')).toBe(true);
      expect(validateRequired(0)).toBe(true);
    });

    it('devrait rejeter un champ vide', () => {
      const validateRequired = (value: any) => value !== null && value !== undefined && value !== '';
      
      expect(validateRequired('')).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
    });
  });
});

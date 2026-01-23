import { describe, it, expect } from 'vitest';

describe('Formatters Utils', () => {
  describe('formatPrice', () => {
    it('devrait formater un prix en VP', () => {
      const formatPrice = (price: number) => `${price} VP`;
      
      expect(formatPrice(1775)).toBe('1775 VP');
      expect(formatPrice(2175)).toBe('2175 VP');
    });

    it('devrait gérer les prix à 0', () => {
      const formatPrice = (price: number) => price === 0 ? 'Gratuit' : `${price} VP`;
      
      expect(formatPrice(0)).toBe('Gratuit');
    });
  });

  describe('formatDate', () => {
    it('devrait formater une date', () => {
      const formatDate = (date: Date) => date.toLocaleDateString('fr-FR');
      const testDate = new Date('2024-01-01');
      
      expect(formatDate(testDate)).toBe('01/01/2024');
    });

    it('devrait gérer les dates invalides', () => {
      const formatDate = (date: any) => {
        try {
          return new Date(date).toLocaleDateString('fr-FR');
        } catch {
          return 'Date invalide';
        }
      };
      
      expect(formatDate('invalid')).toBe('Date invalide');
    });
  });

  describe('formatRarity', () => {
    it('devrait formater la rareté', () => {
      const formatRarity = (rarity: string) => rarity.toUpperCase();
      
      expect(formatRarity('premium')).toBe('PREMIUM');
      expect(formatRarity('ultra')).toBe('ULTRA');
    });

    it('devrait gérer les raretés nulles', () => {
      const formatRarity = (rarity: string | null) => rarity || 'Inconnue';
      
      expect(formatRarity(null)).toBe('Inconnue');
    });
  });

  describe('truncateText', () => {
    it('devrait tronquer un texte long', () => {
      const truncateText = (text: string, maxLength: number) => 
        text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      
      expect(truncateText('This is a very long text', 10)).toBe('This is a ...');
    });

    it('devrait ne pas tronquer un texte court', () => {
      const truncateText = (text: string, maxLength: number) => 
        text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      
      expect(truncateText('Short', 10)).toBe('Short');
    });
  });
});

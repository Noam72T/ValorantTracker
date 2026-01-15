import { describe, it, expect } from 'vitest';
import { getRankIcon } from '../../../utils/rankIcons';

describe('RankIcons Utils - Tests Unitaires', () => {
  it('devrait retourner l\'icône pour Iron', () => {
    const icon = getRankIcon('Iron');
    expect(icon).toBeDefined();
    expect(typeof icon).toBe('string');
  });

  it('devrait retourner l\'icône pour Bronze', () => {
    const icon = getRankIcon('Bronze');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Silver', () => {
    const icon = getRankIcon('Silver');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Gold', () => {
    const icon = getRankIcon('Gold');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Platinum', () => {
    const icon = getRankIcon('Platinum');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Diamond', () => {
    const icon = getRankIcon('Diamond');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Ascendant', () => {
    const icon = getRankIcon('Ascendant');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Immortal', () => {
    const icon = getRankIcon('Immortal');
    expect(icon).toBeDefined();
  });

  it('devrait retourner l\'icône pour Radiant', () => {
    const icon = getRankIcon('Radiant');
    expect(icon).toBeDefined();
  });

  it('devrait gérer les rangs inconnus', () => {
    const icon = getRankIcon('UnknownRank');
    expect(icon).toBeDefined();
  });
});

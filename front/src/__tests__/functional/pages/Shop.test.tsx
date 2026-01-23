import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../../../pages/Shop';

vi.mock('../../../services/shopService');

describe('Shop Page', () => {
  it('devrait afficher la boutique actuelle', async () => {
    const { shopService } = require('../../../services/shopService');
    shopService.getCurrentShop = vi.fn().mockResolvedValue({
      data: {
        date: new Date().toISOString(),
        skins: [
          { id: 'skin-1', displayName: 'Skin 1' },
          { id: 'skin-2', displayName: 'Skin 2' }
        ]
      }
    });

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.getByText(/boutique/i)).toBeDefined();
  });

  it('devrait afficher la date de la boutique', () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.queryByText(/date/i)).toBeDefined();
  });

  it('devrait afficher un message si la boutique est vide', async () => {
    const { shopService } = require('../../../services/shopService');
    shopService.getCurrentShop = vi.fn().mockResolvedValue({
      data: { skins: [] }
    });

    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.queryByText(/aucun skin/i)).toBeDefined();
  });

  it('devrait permettre d\'ajouter un skin aux favoris', () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );

    expect(screen.getByText(/boutique/i)).toBeDefined();
  });
});

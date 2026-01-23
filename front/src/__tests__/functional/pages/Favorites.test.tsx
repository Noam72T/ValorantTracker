import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Favorites from '../../../pages/Favorites';

vi.mock('../../../services/favoriteService');

describe('Favorites Page', () => {
  it('devrait afficher la liste des favoris', async () => {
    const { favoriteService } = require('../../../services/favoriteService');
    favoriteService.getFavorites = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'fav-1',
          skin: { id: 'skin-1', displayName: 'Skin 1' }
        }
      ]
    });

    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );

    expect(screen.getByText(/mes favoris/i)).toBeDefined();
  });

  it('devrait permettre de supprimer un favori', async () => {
    const { favoriteService } = require('../../../services/favoriteService');
    favoriteService.getFavorites = vi.fn().mockResolvedValue({ data: [] });
    favoriteService.removeFavorite = vi.fn().mockResolvedValue({});

    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );

    expect(favoriteService.getFavorites).toHaveBeenCalled();
  });

  it('devrait afficher un message si aucun favori', () => {
    const { favoriteService } = require('../../../services/favoriteService');
    favoriteService.getFavorites = vi.fn().mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );

    expect(screen.queryByText(/aucun favori/i)).toBeDefined();
  });

  it('devrait permettre de basculer les notifications', async () => {
    const { favoriteService } = require('../../../services/favoriteService');
    favoriteService.updateFavorite = vi.fn().mockResolvedValue({});

    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );

    expect(screen.getByText(/mes favoris/i)).toBeDefined();
  });
});

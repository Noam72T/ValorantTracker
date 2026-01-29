import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteCard from '../../../components/Cards/FavoriteCard';

describe('FavoriteCard', () => {
  const mockFavorite = {
    id: 'fav-123',
    skinId: 'skin-123',
    notificationEnabled: true,
    skin: {
      id: 'skin-123',
      displayName: 'Prime Vandal',
      rarity: 'Premium',
      imageUrl: 'https://example.com/image.png'
    }
  };

  it('devrait afficher les informations du favori', () => {
    render(<FavoriteCard favorite={mockFavorite} />);

    expect(screen.getByText('Prime Vandal')).toBeDefined();
    expect(screen.getByText('Premium')).toBeDefined();
  });

  it('devrait appeler onRemove quand le bouton supprimer est cliqué', () => {
    const onRemove = vi.fn();
    render(<FavoriteCard favorite={mockFavorite} onRemove={onRemove} />);

    const removeButton = screen.getByText(/supprimer/i);
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith(mockFavorite.id);
  });

  it('devrait afficher l\'état des notifications', () => {
    render(<FavoriteCard favorite={mockFavorite} />);

    expect(screen.getByText(/notifications activées/i)).toBeDefined();
  });

  it('devrait permettre de basculer les notifications', () => {
    const onToggleNotification = vi.fn();
    render(
      <FavoriteCard 
        favorite={mockFavorite} 
        onToggleNotification={onToggleNotification} 
      />
    );

    const toggleButton = screen.getByRole('switch');
    fireEvent.click(toggleButton);

    expect(onToggleNotification).toHaveBeenCalledWith(mockFavorite.id, false);
  });
});

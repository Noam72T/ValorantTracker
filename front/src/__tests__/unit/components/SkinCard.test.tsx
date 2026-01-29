// import { describe, it, expect, vi } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import SkinCard from '../../../components/Cards/SkinCard';

// describe('SkinCard', () => {
//   const mockSkin = {
//     id: 'skin-123',
//     displayName: 'Prime Vandal',
//     rarity: 'Premium',
//     price: 1775,
//     imageUrl: 'https://example.com/image.png',
//     weaponType: 'Vandal'
//   };

//   it('devrait afficher les informations du skin', () => {
//     render(<SkinCard skin={mockSkin} />);

//     expect(screen.getByText('Prime Vandal')).toBeDefined();
//     expect(screen.getByText('Premium')).toBeDefined();
//   });

//   it('devrait afficher le prix si disponible', () => {
//     render(<SkinCard skin={mockSkin} />);

//     expect(screen.getByText(/1775/)).toBeDefined();
//   });

//   it('devrait appeler onFavorite quand le bouton est cliqué', () => {
//     const onFavorite = vi.fn();
//     render(<SkinCard skin={mockSkin} onFavorite={onFavorite} />);

//     const favoriteButton = screen.getByRole('button');
//     fireEvent.click(favoriteButton);

//     expect(onFavorite).toHaveBeenCalledWith(mockSkin.id);
//   });

//   it('devrait afficher l\'image du skin', () => {
//     render(<SkinCard skin={mockSkin} />);

//     const image = screen.getByRole('img');
//     expect(image.getAttribute('src')).toBe(mockSkin.imageUrl);
//   });
// });

// import { describe, it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Dashboard from '@/pages/Dashboard';

// vi.mock('../../../services/shopService');
// vi.mock('../../../services/favoriteService');

// describe('Dashboard Page', () => {
//   it('devrait afficher le titre du dashboard', () => {
//     render(
//       <BrowserRouter>
//         <Dashboard />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/tableau de bord/i)).toBeDefined();
//   });

//   it('devrait afficher la boutique actuelle', async () => {
//     const { shopService } = require('../../../services/shopService');
//     shopService.getCurrentShop = vi.fn().mockResolvedValue({
//       data: { skins: [] }
//     });

//     render(
//       <BrowserRouter>
//         <Dashboard />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/boutique/i)).toBeDefined();
//   });

//   it('devrait afficher les favoris de l\'utilisateur', async () => {
//     const { favoriteService } = require('../../../services/favoriteService');
//     favoriteService.getFavorites = vi.fn().mockResolvedValue({
//       data: []
//     });

//     render(
//       <BrowserRouter>
//         <Dashboard />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/favoris/i)).toBeDefined();
//   });

//   it('devrait afficher un loader pendant le chargement', () => {
//     render(
//       <BrowserRouter>
//         <Dashboard />
//       </BrowserRouter>
//     );

//     expect(screen.queryByText(/chargement/i)).toBeDefined();
//   });
// });

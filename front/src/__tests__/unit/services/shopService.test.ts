// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import * as shopService from '../../../services/shopService';
// import api from '../../../services/api';

// vi.mock('@/services/api');

// describe('ShopService', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   describe('getCurrentShop', () => {
//     it('devrait récupérer la boutique actuelle', async () => {
//       const mockShop = {
//         data: {
//           id: 'shop-123',
//           date: new Date().toISOString(),
//           skins: []
//         }
//       };

//       vi.mocked(api.get).mockResolvedValue(mockShop);

//       const result = await shopService.getCurrentShop();

//       expect(api.get).toHaveBeenCalledWith('/shop/current');
//       expect(result.data.id).toBe('shop-123');
//     });

//     it('devrait gérer l\'absence de boutique', async () => {
//       vi.mocked(api.get).mockRejectedValue(new Error('No shop available'));

//       await expect(shopService.getCurrentShop()).rejects.toThrow();
//     });
//   });

//   describe('getShopHistory', () => {
//     it('devrait récupérer l\'historique de la boutique', async () => {
//       const mockHistory = {
//         data: {
//           shops: [
//             { id: 'shop-1', date: '2024-01-01' },
//             { id: 'shop-2', date: '2024-01-02' }
//           ],
//           total: 2
//         }
//       };

//       vi.mocked(api.get).mockResolvedValue(mockHistory);

//       const result = await shopService.getShopHistory();

//       expect(api.get).toHaveBeenCalledWith('/shop/history');
//       expect(result.data.shops).toHaveLength(2);
//     });

//     it('devrait accepter les paramètres de pagination', async () => {
//       const mockResponse = { data: { shops: [], total: 0 } };
//       vi.mocked(api.get).mockResolvedValue(mockResponse);

//       await shopService.getShopHistory({ limit: 10, offset: 20 });

//       expect(api.get).toHaveBeenCalledWith('/shop/history', {
//         params: { limit: 10, offset: 20 }
//       });
//     });
//   });
// });

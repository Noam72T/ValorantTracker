import api from './api';
import type { Skin } from './shopService';

export interface PlayerShop {
  date: string;
  skins: Skin[];
  remainingDuration: number;
}

export const valorantShopService = {
  async getMyShop(): Promise<PlayerShop> {
    const response = await api.get('/valorant-shop/my-shop');
    return response.data.data;
  },

  async getFeaturedShop(): Promise<any> {
    const response = await api.get('/valorant-shop/featured');
    return response.data.data;
  }
};

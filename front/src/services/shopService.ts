import api from './api';

export interface Skin {
  id: string;
  skinId: string;
  name: string;
  displayName: string;
  rarity?: string;
  price?: number;
  imageUrl?: string;
  videoUrl?: string;
  weaponType?: string;
  appearanceCount: number;
  lastAppearance?: string;
}

export interface ShopEntry {
  id: string;
  userId: string;
  date: string;
  skinId: string;
  price?: number;
  skin: Skin;
}

export const shopService = {
  async getUserShop(date?: string): Promise<{ date: string; shops: ShopEntry[] }> {
    const response = await api.get('/shop', {
      params: date ? { date } : {}
    });
    return response.data.data;
  },

  async addShopEntry(skinId: string, price?: number, date?: string): Promise<ShopEntry> {
    const response = await api.post('/shop', { skinId, price, date });
    return response.data.data;
  },

  async getShopHistory(limit = 30, offset = 0): Promise<{ shops: ShopEntry[]; total: number }> {
    const response = await api.get('/shop/history', {
      params: { limit, offset }
    });
    return response.data.data;
  },

  async getShopStats(): Promise<{ totalShops: number; uniqueSkins: number; favoritesInShop: number }> {
    const response = await api.get('/shop/stats');
    return response.data.data;
  }
};

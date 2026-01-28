import api from './api';
import type { Skin } from './shopService';

export interface Favorite {
  id: string;
  userId: string;
  skinId: string;
  notificationEnabled: boolean;
  skin: Skin;
  probability?: {
    skinId: string;
    skinName: string;
    probabilityScore: number;
    daysSinceLastAppearance: number;
    totalAppearances: number;
    rarity: string;
    estimatedNextAppearance: string;
  };
}

export const favoriteService = {
  async getFavorites() {
    const response = await api.get('/favorites');
    return response.data.data;
  },

  async addFavorite(skinId: string) {
    const response = await api.post('/favorites', { skinId, notificationEnabled: true });
    return response.data.data;
  },

  async removeFavorite(id: string) {
    await api.delete(`/favorites/${id}`);
  },

  async updateFavorite(id: string, notificationEnabled: boolean) {
    const response = await api.put(`/favorites/${id}`, { notificationEnabled });
    return response.data.data;
  }
};

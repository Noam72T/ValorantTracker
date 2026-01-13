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
  async getFavorites(): Promise<Favorite[]> {
    const response = await api.get('/favorites');
    return response.data.data;
  },

  async addFavorite(skinId: string, notificationEnabled = true): Promise<Favorite> {
    const response = await api.post('/favorites', { skinId, notificationEnabled });
    return response.data.data;
  },

  async removeFavorite(id: string): Promise<void> {
    await api.delete(`/favorites/${id}`);
  },

  async updateFavorite(id: string, notificationEnabled: boolean): Promise<Favorite> {
    const response = await api.put(`/favorites/${id}`, { notificationEnabled });
    return response.data.data;
  }
};

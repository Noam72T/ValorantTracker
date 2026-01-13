import api from './api';
import type { Skin } from './shopService';

export interface Probability {
  skinId: string;
  skinName: string;
  probabilityScore: number;
  daysSinceLastAppearance: number;
  totalAppearances: number;
  rarity: string;
  estimatedNextAppearance: string;
}

export const skinService = {
  async getAllSkins(params?: {
    limit?: number;
    offset?: number;
    rarity?: string;
    weaponType?: string;
    search?: string;
  }): Promise<{ skins: Skin[]; total: number }> {
    const response = await api.get('/skins', { params });
    return response.data.data;
  },

  async getSkinById(id: string): Promise<Skin> {
    const response = await api.get(`/skins/${id}`);
    return response.data.data;
  },

  async getProbabilities(limit = 10): Promise<Probability[]> {
    const response = await api.get('/skins/probabilities', {
      params: { limit }
    });
    return response.data.data;
  },

  async getSkinProbability(id: string): Promise<Probability> {
    const response = await api.get(`/skins/${id}/probability`);
    return response.data.data;
  },

  async createSkin(skinData: Partial<Skin>): Promise<Skin> {
    const response = await api.post('/skins', skinData);
    return response.data.data;
  }
};

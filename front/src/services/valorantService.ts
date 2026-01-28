import api from './api';

export interface PlayerStats {
  account: any;
  mmr: any;
}

export interface Match {
  matchId: string;
  gameMode: string;
  map: string;
  agent: string;
  kills: number;
  deaths: number;
  assists: number;
  score: number;
  won: boolean;
  roundsWon: number;
  roundsLost: number;
  matchDate: string;
  rankBefore?: string;
  rankAfter?: string;
  rrChange?: number;
  metadata?: any;
}

export const valorantService = {
  async getPlayerStats(): Promise<PlayerStats> {
    const response = await api.get('/valorant/stats');
    return response.data.data;
  },

  async getMatchHistory(mode = 'competitive', size = 10): Promise<any> {
    const response = await api.get('/valorant/matches', {
      params: { mode, size }
    });
    return response.data.data;
  },

  async getStoredMatches(limit = 10, offset = 0): Promise<{ matches: Match[]; total: number }> {
    const response = await api.get('/valorant/matches/stored', {
      params: { limit, offset }
    });
    return response.data.data;
  }
};

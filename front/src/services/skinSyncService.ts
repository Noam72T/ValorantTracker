import api from './api';

export interface SyncStatus {
  totalSkins: number;
  lastSync: string | null;
}

export interface SyncResult {
  created: number;
  updated: number;
  total: number;
}

export const skinSyncService = {
  async syncAllSkins(): Promise<SyncResult> {
    const response = await api.post('/skin-sync/sync');
    return response.data.data;
  },

  async getSyncStatus(): Promise<SyncStatus> {
    const response = await api.get('/skin-sync/status');
    return response.data.data;
  }
};

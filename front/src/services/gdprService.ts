import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ConsentData {
  consentGiven: boolean;
  consentDate: string | null;
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
  deletionRequestedAt: string | null;
}

export const gdprService = {
  getConsent: async (token: string) => {
    const response = await axios.get(`${API_URL}/gdpr/consent`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  updateConsent: async (token: string, data: any) => {
    const response = await axios.put(`${API_URL}/gdpr/consent`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  exportData: async (token: string) => {
    const response = await axios.get(`${API_URL}/gdpr/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  requestDelete: async (token: string) => {
    const response = await axios.post(`${API_URL}/gdpr/request-deletion`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
  },

  cancelDelete: async (token: string) => {
    await axios.post(`${API_URL}/gdpr/cancel-deletion`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  deleteNow: async (token: string, password: string) => {
    await axios.delete(`${API_URL}/gdpr/delete-account`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { password }
    });
  }
};

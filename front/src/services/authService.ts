import api from './api';

export interface User {
  id: string;
  email: string;
  username?: string;
  riotId?: string;
  favoritesSkins?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ProfileResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export const authService = {
  async register(email: string, password: string, username?: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', {
      email,
      password,
      username,
    });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  async getProfile(): Promise<ProfileResponse> {
    const response = await api.get<ProfileResponse>('/auth/profile');
    return response.data;
  },

  async updateProfile(data: { username?: string; riotId?: string; email?: string }): Promise<ProfileResponse> {
    const response = await api.put<ProfileResponse>('/auth/profile', data);
    
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const response = await api.put('/auth/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

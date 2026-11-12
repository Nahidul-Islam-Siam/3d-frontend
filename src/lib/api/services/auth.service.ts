import apiClient from '../client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'editor' | 'admin' | 'super_admin';
  avatar?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  avatar?: {
    url: string;
    publicId?: string;
  };
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}

interface RawUser {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  phone?: string;
  role: AuthUser['role'];
  avatar?: string | { url?: string };
}

function normalizeUser(raw: RawUser): AuthUser {
  const avatarUrl =
    typeof raw.avatar === 'string' ? raw.avatar : raw.avatar?.url;
  return {
    id: raw._id || raw.id || '',
    email: raw.email,
    name: raw.name,
    phone: raw.phone,
    role: raw.role || 'user',
    avatar: avatarUrl,
  };
}

function persistSession(auth: AuthResponse) {
  if (auth.token) localStorage.setItem('lab_access_token', auth.token);
  if (auth.refreshToken) localStorage.setItem('lab_refresh_token', auth.refreshToken);
  if (auth.user) localStorage.setItem('lab_user', JSON.stringify(auth.user));
}

function clearSessionStorage() {
  localStorage.removeItem('lab_access_token');
  localStorage.removeItem('lab_refresh_token');
  localStorage.removeItem('lab_user');
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    const payload = response.data?.data ?? response.data;
    const auth: AuthResponse = {
      user: normalizeUser(payload.user),
      token: payload.accessToken || payload.token || '',
      refreshToken: payload.refreshToken || '',
    };
    persistSession(auth);
    return auth;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    const payload = response.data?.data ?? response.data;
    const rawUser = payload.user ?? payload;
    const auth: AuthResponse = {
      user: normalizeUser(rawUser),
      token: payload.accessToken || payload.token || '',
      refreshToken: payload.refreshToken || '',
    };
    if (auth.token) persistSession(auth);
    return auth;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      clearSessionStorage();
    }
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken });
    const payload = response.data?.data ?? response.data;
    const existingRaw = localStorage.getItem('lab_user');
    const existingUser = existingRaw ? (JSON.parse(existingRaw) as AuthUser) : ({} as AuthUser);
    const auth: AuthResponse = {
      user: payload.user ? normalizeUser(payload.user) : existingUser,
      token: payload.accessToken || payload.token || '',
      refreshToken: payload.refreshToken || refreshToken,
    };
    persistSession(auth);
    return auth;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, newPassword: password });
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post('/auth/change-password', { oldPassword, newPassword });
  },

  getProfile: async (): Promise<AuthUser> => {
    const response = await apiClient.get('/user/me');
    const payload = response.data?.data ?? response.data;
    const user = normalizeUser(payload);
    localStorage.setItem('lab_user', JSON.stringify(user));
    return user;
  },

  updateProfile: async (data: UpdateProfilePayload): Promise<AuthUser> => {
    const response = await apiClient.patch('/user/me', data);
    const payload = response.data?.data ?? response.data;
    const user = normalizeUser(payload);
    localStorage.setItem('lab_user', JSON.stringify(user));
    return user;
  },
};

export default authService;

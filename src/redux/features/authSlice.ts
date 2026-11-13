import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'editor' | 'admin' | 'super_admin';
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
}

export function normalizeAuthUser(raw: {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  phone?: string;
  role?: AuthUser['role'];
  avatar?: string | { url?: string } | null;
}): AuthUser {
  const avatarUrl =
    typeof raw.avatar === 'string'
      ? raw.avatar
      : raw.avatar && typeof raw.avatar === 'object'
        ? raw.avatar.url
        : undefined;

  return {
    id: raw._id || raw.id || '',
    email: raw.email,
    name: raw.name,
    phone: raw.phone,
    role: raw.role || 'user',
    avatar: avatarUrl,
  };
}

function readStoredAuth(): Pick<AuthState, 'user' | 'token' | 'refreshToken' | 'isAuthenticated'> {
  if (typeof window === 'undefined') {
    return { user: null, token: null, refreshToken: null, isAuthenticated: false };
  }
  try {
    const token = window.localStorage.getItem('lab_access_token');
    const refreshToken = window.localStorage.getItem('lab_refresh_token');
    const rawUser = window.localStorage.getItem('lab_user');
    const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
    if (token && user) {
      return { user, token, refreshToken, isAuthenticated: true };
    }
  } catch {
    // Ignore invalid storage JSON
  }
  return { user: null, token: null, refreshToken: null, isAuthenticated: false };
}

function syncStorage(token: string | null, refreshToken: string | null, user: AuthUser | null) {
  if (typeof window === 'undefined') return;
  try {
    if (token) window.localStorage.setItem('lab_access_token', token);
    if (refreshToken) window.localStorage.setItem('lab_refresh_token', refreshToken);
    if (user) window.localStorage.setItem('lab_user', JSON.stringify(user));
  } catch {
    // Ignore storage write errors
  }
}

function clearStorage() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('lab_access_token');
    window.localStorage.removeItem('lab_refresh_token');
    window.localStorage.removeItem('lab_user');
    window.localStorage.removeItem('persist:root');
  } catch {
    // Ignore storage removal errors
  }
}

const stored = readStoredAuth();

const initialState: AuthState = {
  ...stored,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken?: string | null;
        user: AuthUser;
      }>,
    ) => {
      const { token, refreshToken, user } = action.payload;
      state.token = token;
      if (refreshToken !== undefined) {
        state.refreshToken = refreshToken;
      }
      state.user = user;
      state.isAuthenticated = Boolean(token);
      state.initialized = true;
      syncStorage(token, state.refreshToken, user);
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      } else if (action.payload.id && action.payload.email && action.payload.name) {
        state.user = action.payload as AuthUser;
      }
      if (state.user) {
        syncStorage(state.token, state.refreshToken, state.user);
      }
      if (state.token && state.user) {
        state.isAuthenticated = true;
        state.initialized = true;
      }
    },
    setInitialized: (state, action: PayloadAction<boolean | undefined>) => {
      state.initialized = action.payload ?? true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.initialized = false;
      clearStorage();
    },
  },
});

export const { setCredentials, updateUser, setInitialized, logout } = authSlice.actions;
export const clearSession = logout;
export default authSlice.reducer;


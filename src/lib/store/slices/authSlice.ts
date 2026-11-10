import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register, logout, refreshToken, getProfile, updateProfile } from '../thunks/auth.thunks';
import type { AuthResponse, AuthUser } from '@/lib/api/services/auth.service';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

function readStoredAuth(): Pick<AuthState, 'user' | 'token' | 'refreshToken' | 'isAuthenticated'> {
  try {
    const token = localStorage.getItem('lab_access_token');
    const refreshToken = localStorage.getItem('lab_refresh_token');
    const rawUser = localStorage.getItem('lab_user');
    const user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
    if (token && user) {
      return { user, token, refreshToken, isAuthenticated: true };
    }
  } catch {
    // Ignore invalid storage JSON
  }
  return { user: null, token: null, refreshToken: null, isAuthenticated: false };
}

const stored = typeof window !== 'undefined'
  ? readStoredAuth()
  : { user: null, token: null, refreshToken: null, isAuthenticated: false };

const initialState: AuthState = {
  ...stored,
  loading: false,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
    clearSession: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Login failed';
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || null;
        state.refreshToken = action.payload.refreshToken || null;
        state.isAuthenticated = Boolean(action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Registration failed';
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })

      .addCase(getProfile.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })

      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.user = action.payload;
      });
  },
});

export const { clearError, setInitialized, clearSession } = authSlice.actions;
export default authSlice.reducer;

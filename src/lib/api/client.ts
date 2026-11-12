import axios from 'axios';
import { store } from '../store';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token || localStorage.getItem('lab_access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData && config.headers) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !String(originalRequest.url || '').includes('/auth/login') &&
      !String(originalRequest.url || '').includes('/auth/refresh-token')
    ) {
      originalRequest._retry = true;

      try {
        const storedRefresh =
          store.getState().auth.refreshToken ||
          localStorage.getItem('lab_refresh_token');

        const refreshRes = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          storedRefresh ? { refreshToken: storedRefresh } : {},
          { withCredentials: true }
        );

        const newToken =
          refreshRes.data?.data?.accessToken || refreshRes.data?.accessToken;

        if (newToken) {
          localStorage.setItem('lab_access_token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('lab_access_token');
        localStorage.removeItem('lab_refresh_token');
        localStorage.removeItem('lab_user');
        store.dispatch({ type: 'auth/clearSession' });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logout, setCredentials, type AuthUser } from '../features/authSlice';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

interface AuthStateSlice {
  token?: string | null;
  refreshToken?: string | null;
  user?: AuthUser | null;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth?: AuthStateSlice };
    const storedToken =
      typeof window !== 'undefined' ? window.localStorage.getItem('lab_access_token') : null;
    const token = state?.auth?.token || storedToken;

    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

let refreshInFlight: Promise<string | null> | null = null;

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const url = typeof args === 'string' ? args : args.url;
  const isAuthBypassEndpoint =
    typeof url === 'string' &&
    (url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh-token'));

  if (result.error?.status === 401 && !isAuthBypassEndpoint) {
    const state = api.getState() as { auth?: AuthStateSlice };
    const storedRefresh =
      typeof window !== 'undefined' ? window.localStorage.getItem('lab_refresh_token') : null;
    const refreshToken = state?.auth?.refreshToken || storedRefresh;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    if (!refreshInFlight) {
      refreshInFlight = (async () => {
        try {
          const refreshResult = await rawBaseQuery(
            {
              url: '/auth/refresh-token',
              method: 'POST',
              body: { refreshToken },
            },
            api,
            extraOptions,
          );

          const payload = refreshResult.data as
            | { data?: { accessToken?: string; token?: string; refreshToken?: string }; accessToken?: string }
            | undefined;
          const newToken =
            payload?.data?.accessToken || payload?.data?.token || payload?.accessToken;

          if (!newToken) {
            return null;
          }

          const currentUser =
            state?.auth?.user ||
            (() => {
              try {
                const raw = window.localStorage.getItem('lab_user');
                return raw ? (JSON.parse(raw) as AuthUser) : null;
              } catch {
                return null;
              }
            })();

          if (currentUser) {
            api.dispatch(
              setCredentials({
                token: newToken,
                refreshToken: payload?.data?.refreshToken || refreshToken,
                user: currentUser,
              }),
            );
          } else if (typeof window !== 'undefined') {
            window.localStorage.setItem('lab_access_token', newToken);
          }

          return newToken;
        } catch {
          return null;
        } finally {
          refreshInFlight = null;
        }
      })();
    }

    const refreshedToken = await refreshInFlight;
    if (refreshedToken) {
      return rawBaseQuery(args, api, extraOptions);
    }

    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'User',
    'Videos',
    'Events',
    'EventRsvps',
    'Volunteers',
    'Auditions',
    'Sponsors',
    'Inquiries',
    'Overview',
    'Notifications',
    'Settings',
  ],
  endpoints: () => ({}),
});


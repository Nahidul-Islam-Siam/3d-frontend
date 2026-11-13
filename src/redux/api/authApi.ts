import { baseApi } from './baseApi';
import {
  logout,
  normalizeAuthUser,
  setCredentials,
  updateUser,
  type AuthUser,
} from '../features/authSlice';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  phone?: string;
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
  role?: AuthUser['role'];
  avatar?: string | { url?: string } | null;
}

interface RawAuthEnvelope {
  data?: {
    user?: RawUser;
    accessToken?: string;
    token?: string;
    refreshToken?: string;
  } & RawUser;
  user?: RawUser;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}

function parseAuthResponse(raw: RawAuthEnvelope): AuthResponse {
  const payload = raw?.data ?? raw;
  const rawUser = payload?.user ?? (payload as RawUser);
  return {
    user: normalizeAuthUser(rawUser),
    token: payload?.accessToken || payload?.token || '',
    refreshToken: payload?.refreshToken || '',
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (raw: RawAuthEnvelope) => parseAuthResponse(raw),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setCredentials(data));
      },
    }),

    register: builder.mutation<AuthResponse, RegisterData>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      transformResponse: (raw: RawAuthEnvelope) => parseAuthResponse(raw),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data.token) {
          dispatch(setCredentials(data));
        }
      },
    }),

    logoutSession: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),

    forgotPassword: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<void, { token: string; password: string }>({
      query: ({ token, password }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, newPassword: password },
      }),
    }),

    changePassword: builder.mutation<void, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: '/auth/change-password',
        method: 'POST',
        body,
      }),
    }),

    getProfile: builder.query<AuthUser, void>({
      query: () => '/user/me',
      transformResponse: (raw: { data?: RawUser } & RawUser) =>
        normalizeAuthUser(raw?.data ?? raw),
      providesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateUser(data));
      },
    }),

    updateProfile: builder.mutation<AuthUser, UpdateProfilePayload>({
      query: (body) => ({
        url: '/user/me',
        method: 'PATCH',
        body,
      }),
      transformResponse: (raw: { data?: RawUser } & RawUser) =>
        normalizeAuthUser(raw?.data ?? raw),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(updateUser(data));
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutSessionMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;


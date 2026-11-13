import { baseApi } from '@/redux/api/baseApi';
import type { PublicSettingPage } from './types';

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettingPage: builder.query<PublicSettingPage, string>({
      query: (slug) => `/settings/${slug}`,
      transformResponse: (raw: { data?: PublicSettingPage } & PublicSettingPage) =>
        raw?.data ?? raw,
      providesTags: (_res, _err, slug) => [{ type: 'Settings', id: slug }],
    }),

    updateSettingPage: builder.mutation<
      PublicSettingPage,
      {
        slug: string;
        body: { title?: string; htmlContent?: string; isPublished?: boolean };
      }
    >({
      query: ({ slug, body }) => ({
        url: `/settings/${slug}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (raw: { data?: PublicSettingPage } & PublicSettingPage) =>
        raw?.data ?? raw,
      invalidatesTags: (_res, _err, { slug }) => [{ type: 'Settings', id: slug }],
    }),
  }),
});

export const { useGetSettingPageQuery, useUpdateSettingPageMutation } = settingsApi;


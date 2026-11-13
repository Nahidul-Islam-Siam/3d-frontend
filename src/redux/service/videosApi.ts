import { baseApi } from '@/redux/api/baseApi';
import type { VideoSlot } from '@/pages/admin/types';
import { normalizeDoc, normalizeDocList } from './types';

export const videosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query<VideoSlot[], void>({
      query: () => '/videos',
      transformResponse: (raw: { data?: VideoSlot[] } | VideoSlot[]) => normalizeDocList(raw),
      providesTags: ['Videos'],
    }),

    createVideo: builder.mutation<VideoSlot, Partial<VideoSlot>>({
      query: (body) => ({
        url: '/videos',
        method: 'POST',
        body,
      }),
      transformResponse: (raw: { data?: VideoSlot } & VideoSlot) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: ['Videos', 'Overview'],
    }),

    updateVideo: builder.mutation<VideoSlot, { id: string; body: Partial<VideoSlot> }>({
      query: ({ id, body }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (raw: { data?: VideoSlot } & VideoSlot) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: ['Videos', 'Overview'],
    }),

    deleteVideo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/videos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Videos', 'Overview'],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApi;


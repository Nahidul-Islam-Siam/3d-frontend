import { baseApi } from '@/redux/api/baseApi';
import type { VolunteerApplication } from '@/pages/admin/types';
import { normalizeDoc, normalizeDocList, type VolunteerApplyPayload } from './types';

export const volunteersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyVolunteer: builder.mutation<unknown, VolunteerApplyPayload>({
      query: (body) => ({
        url: '/volunteers/apply',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Volunteers', 'Overview', 'Notifications'],
    }),

    getVolunteers: builder.query<VolunteerApplication[], void>({
      query: () => '/volunteers',
      transformResponse: (
        raw:
          | { data?: Array<VolunteerApplication & { _id?: string; createdAt?: string }> }
          | Array<VolunteerApplication & { _id?: string; createdAt?: string }>,
      ) =>
        normalizeDocList(raw).map((item) => ({
          ...item,
          interests: Array.isArray(item.interests) ? item.interests : [],
          applied_date: item.applied_date || item.createdAt || '',
          bio: item.bio || '',
        })),
      providesTags: ['Volunteers'],
    }),

    updateVolunteerStatus: builder.mutation<
      VolunteerApplication,
      { id: string; status: VolunteerApplication['status']; admin_notes?: string }
    >({
      query: ({ id, status, admin_notes }) => ({
        url: `/volunteers/${id}/status`,
        method: 'PATCH',
        body: { status, admin_notes },
      }),
      transformResponse: (raw: { data?: VolunteerApplication } & VolunteerApplication) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: ['Volunteers', 'Overview'],
    }),

    deleteVolunteer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/volunteers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Volunteers', 'Overview'],
    }),
  }),
});

export const {
  useApplyVolunteerMutation,
  useGetVolunteersQuery,
  useUpdateVolunteerStatusMutation,
  useDeleteVolunteerMutation,
} = volunteersApi;


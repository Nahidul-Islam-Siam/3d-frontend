import { baseApi } from '@/redux/api/baseApi';
import type {
  AuditionItem,
  InquiryItem,
  SponsorItem,
  SubmissionSubTab,
} from '@/pages/admin/views/SubmissionsView';
import {
  normalizeDoc,
  normalizeDocList,
  type AuditionApplyPayload,
  type InquiryCreatePayload,
  type SponsorApplyPayload,
} from './types';

export const submissionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyAudition: builder.mutation<unknown, AuditionApplyPayload>({
      query: (body) => ({
        url: '/auditions/apply',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auditions', 'Overview', 'Notifications'],
    }),

    applySponsor: builder.mutation<unknown, SponsorApplyPayload>({
      query: (body) => ({
        url: '/sponsors/apply',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sponsors', 'Overview', 'Notifications'],
    }),

    submitInquiry: builder.mutation<unknown, InquiryCreatePayload>({
      query: (body) => ({
        url: '/inquiries',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Inquiries', 'Overview', 'Notifications'],
    }),

    getAuditions: builder.query<AuditionItem[], void>({
      query: () => '/auditions',
      transformResponse: (raw: { data?: AuditionItem[] } | AuditionItem[]) =>
        normalizeDocList(raw),
      providesTags: ['Auditions'],
    }),

    getSponsors: builder.query<SponsorItem[], void>({
      query: () => '/sponsors',
      transformResponse: (raw: { data?: SponsorItem[] } | SponsorItem[]) =>
        normalizeDocList(raw),
      providesTags: ['Sponsors'],
    }),

    getInquiries: builder.query<InquiryItem[], void>({
      query: () => '/inquiries',
      transformResponse: (raw: { data?: InquiryItem[] } | InquiryItem[]) =>
        normalizeDocList(raw),
      providesTags: ['Inquiries'],
    }),

    updateSubmissionStatus: builder.mutation<
      unknown,
      {
        endpoint: SubmissionSubTab;
        id: string;
        status: string;
        admin_notes?: string;
      }
    >({
      query: ({ endpoint, id, status, admin_notes }) => ({
        url: `/${endpoint}/${id}/status`,
        method: 'PATCH',
        body: admin_notes !== undefined ? { status, admin_notes } : { status },
      }),
      transformResponse: (raw: { data?: { _id?: string; id?: string } } & { _id?: string; id?: string }) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: (_res, _err, { endpoint }) => {
        const map = {
          auditions: 'Auditions',
          sponsors: 'Sponsors',
          inquiries: 'Inquiries',
        } as const;
        return [map[endpoint], 'Overview'];
      },
    }),

    deleteSubmission: builder.mutation<void, { endpoint: SubmissionSubTab; id: string }>({
      query: ({ endpoint, id }) => ({
        url: `/${endpoint}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, { endpoint }) => {
        const map = {
          auditions: 'Auditions',
          sponsors: 'Sponsors',
          inquiries: 'Inquiries',
        } as const;
        return [map[endpoint], 'Overview'];
      },
    }),
  }),
});

export const {
  useApplyAuditionMutation,
  useApplySponsorMutation,
  useSubmitInquiryMutation,
  useGetAuditionsQuery,
  useGetSponsorsQuery,
  useGetInquiriesQuery,
  useUpdateSubmissionStatusMutation,
  useDeleteSubmissionMutation,
} = submissionsApi;


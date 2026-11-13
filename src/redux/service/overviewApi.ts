import { baseApi } from '@/redux/api/baseApi';
import {
  normalizeDoc,
  type AdminNotificationItem,
  type AdminOverviewData,
} from './types';

interface RawOverviewEnvelope {
  data?: AdminOverviewData;
}

interface RawNotificationsEnvelope {
  data?: Array<AdminNotificationItem & { _id?: string }>;
  meta?: { unreadCount?: number; total?: number };
}

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query<AdminOverviewData, void>({
      query: () => '/admin/overview',
      transformResponse: (raw: RawOverviewEnvelope & Partial<AdminOverviewData>) => {
        const payload = raw?.data ?? raw;
        return {
          metrics: payload?.metrics ?? {
            totalVolunteers: 0,
            pendingVolunteers: 0,
            pendingAuditions: 0,
            pendingSponsors: 0,
            openInquiries: 0,
            upcomingEvents: 0,
            activeVideos: 0,
            totalRsvps: 0,
            totalCapacity: 0,
          },
          recentVolunteers: Array.isArray(payload?.recentVolunteers)
            ? payload.recentVolunteers.map((v) => ({
                ...normalizeDoc(v),
                applied_date: v.applied_date ? String(v.applied_date) : '',
              }))
            : [],
          upcomingEventsList: Array.isArray(payload?.upcomingEventsList)
            ? payload.upcomingEventsList.map(normalizeDoc)
            : [],
        };
      },
      providesTags: ['Overview'],
    }),

    getNotifications: builder.query<
      { items: AdminNotificationItem[]; unreadCount: number; total: number },
      { unreadOnly?: boolean; limit?: number } | void
    >({
      query: (params) => ({
        url: '/notifications',
        params: params || undefined,
      }),
      transformResponse: (raw: RawNotificationsEnvelope) => {
        const list = raw?.data ?? [];
        const meta = raw?.meta ?? {};
        return {
          items: Array.isArray(list) ? list.map(normalizeDoc) : [],
          unreadCount: typeof meta.unreadCount === 'number' ? meta.unreadCount : 0,
          total: typeof meta.total === 'number' ? meta.total : 0,
        };
      },
      providesTags: ['Notifications'],
    }),

    getUnreadNotificationCount: builder.query<number, void>({
      query: () => '/notifications/unread-count',
      transformResponse: (raw: { data?: { unreadCount?: number }; unreadCount?: number }) => {
        const payload = raw?.data ?? raw;
        return typeof payload?.unreadCount === 'number' ? payload.unreadCount : 0;
      },
      providesTags: ['Notifications'],
    }),

    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),

    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({
        url: '/notifications/mark-all-read',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetAdminOverviewQuery,
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = overviewApi;


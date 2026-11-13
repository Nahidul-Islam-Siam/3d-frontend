import { baseApi } from '@/redux/api/baseApi';
import type { EventItem } from '@/pages/admin/types';
import {
  normalizeDoc,
  normalizeDocList,
  type EventRsvpItem,
  type RsvpPayload,
} from './types';

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventItem[], void>({
      query: () => '/events',
      transformResponse: (raw: { data?: EventItem[] } | EventItem[]) => normalizeDocList(raw),
      providesTags: ['Events'],
    }),

    createEvent: builder.mutation<EventItem, Partial<EventItem>>({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),
      transformResponse: (raw: { data?: EventItem } & EventItem) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: ['Events', 'Overview'],
    }),

    updateEvent: builder.mutation<EventItem, { id: string; body: Partial<EventItem> }>({
      query: ({ id, body }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (raw: { data?: EventItem } & EventItem) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: ['Events', 'Overview'],
    }),

    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events', 'Overview'],
    }),

    getEventRsvps: builder.query<EventRsvpItem[], string>({
      query: (eventId) => `/events/${eventId}/rsvps`,
      transformResponse: (raw: { data?: EventRsvpItem[] } | EventRsvpItem[]) =>
        normalizeDocList(raw),
      providesTags: (_res, _err, eventId) => [{ type: 'EventRsvps', id: eventId }],
    }),

    submitEventRsvp: builder.mutation<EventRsvpItem, { eventId: string; body: RsvpPayload }>({
      query: ({ eventId, body }) => ({
        url: `/events/${eventId}/rsvp`,
        method: 'POST',
        body,
      }),
      transformResponse: (raw: { data?: EventRsvpItem } & EventRsvpItem) =>
        normalizeDoc(raw?.data ?? raw),
      invalidatesTags: (_res, _err, { eventId }) => [
        'Events',
        'Overview',
        { type: 'EventRsvps', id: eventId },
      ],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetEventRsvpsQuery,
  useSubmitEventRsvpMutation,
} = eventsApi;


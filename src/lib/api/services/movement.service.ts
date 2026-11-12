import apiClient from '../client';
import type {
  VideoSlot,
  EventItem,
  VolunteerApplication,
} from '@/pages/admin/types';

export interface VolunteerApplyPayload {
  full_name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  bio?: string;
}

export interface AuditionApplyPayload {
  name: string;
  email: string;
  phone: string;
  ageGroup?: string;
  talentType: 'acting' | 'singing' | 'dance' | 'spoken-word' | 'instrumental';
  mediaLink?: string;
  experience?: string;
  confirmRehearsals?: boolean;
}

export interface SponsorApplyPayload {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  tier: 'presenting' | 'platinum' | 'gold' | 'community' | 'custom';
  program?: string;
  notes?: string;
}

export interface InquiryCreatePayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  subject?: string;
  category?:
    | 'general'
    | 'housing-partnership'
    | 'mental-health-partner'
    | 'community-partner';
  message: string;
}

export interface RsvpPayload {
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  tickets?: number;
  notes?: string;
}

export interface EventRsvpItem {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  tickets: number;
  rsvp_date?: string;
  notes?: string;
}

export interface AdminOverviewMetrics {
  totalVolunteers: number;
  pendingVolunteers: number;
  pendingAuditions: number;
  pendingSponsors: number;
  openInquiries: number;
  upcomingEvents: number;
  activeVideos: number;
  totalRsvps: number;
  totalCapacity: number;
}

export interface AdminOverviewData {
  metrics: AdminOverviewMetrics;
  recentVolunteers: Array<{
    id: string;
    full_name: string;
    email: string;
    phone: string;
    interests: string[];
    applied_date: string;
    status: VolunteerApplication['status'];
  }>;
  upcomingEventsList: Array<{
    id: string;
    title: string;
    category: string;
    event_date: string;
    start_time: string;
    end_time: string;
    location: string;
    capacity: number;
    rsvps_count: number;
    status: EventItem['status'];
  }>;
}

export interface AdminNotificationItem {
  id: string;
  type: 'volunteer_application' | 'event_rsvp' | 'capacity_alert' | 'system_alert';
  title: string;
  message: string;
  priority: 'info' | 'warning' | 'critical';
  actionHref?: string;
  isRead: boolean;
  readAt?: string | null;
  createdAt?: string;
}

function normalizeDoc<T extends { _id?: string; id?: string }>(doc: T): T & { id: string } {
  return {
    ...doc,
    id: doc.id || doc._id || '',
  };
}

const movementService = {
  // Public Submission Forms
  applyVolunteer: async (payload: VolunteerApplyPayload) => {
    const res = await apiClient.post('/volunteers/apply', payload);
    return res.data?.data ?? res.data;
  },

  applyAudition: async (payload: AuditionApplyPayload) => {
    const res = await apiClient.post('/auditions/apply', payload);
    return res.data?.data ?? res.data;
  },

  applySponsor: async (payload: SponsorApplyPayload) => {
    const res = await apiClient.post('/sponsors/apply', payload);
    return res.data?.data ?? res.data;
  },

  submitInquiry: async (payload: InquiryCreatePayload) => {
    const res = await apiClient.post('/inquiries', payload);
    return res.data?.data ?? res.data;
  },

  rsvpEvent: async (eventId: string, payload: RsvpPayload) => {
    const res = await apiClient.post(`/events/${eventId}/rsvp`, payload);
    return res.data?.data ?? res.data;
  },

  // CMS Videos
  getVideos: async (): Promise<VideoSlot[]> => {
    const res = await apiClient.get('/videos');
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  createVideo: async (payload: Partial<VideoSlot>): Promise<VideoSlot> => {
    const res = await apiClient.post('/videos', payload);
    return normalizeDoc(res.data?.data ?? res.data);
  },

  updateVideo: async (id: string, payload: Partial<VideoSlot>): Promise<VideoSlot> => {
    const res = await apiClient.patch(`/videos/${id}`, payload);
    return normalizeDoc(res.data?.data ?? res.data);
  },

  deleteVideo: async (id: string): Promise<void> => {
    await apiClient.delete(`/videos/${id}`);
  },

  // Community Events
  getEvents: async (): Promise<EventItem[]> => {
    const res = await apiClient.get('/events');
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  createEvent: async (payload: Partial<EventItem>): Promise<EventItem> => {
    const res = await apiClient.post('/events', payload);
    return normalizeDoc(res.data?.data ?? res.data);
  },

  updateEvent: async (id: string, payload: Partial<EventItem>): Promise<EventItem> => {
    const res = await apiClient.patch(`/events/${id}`, payload);
    return normalizeDoc(res.data?.data ?? res.data);
  },

  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },

  getEventRsvps: async (eventId: string): Promise<EventRsvpItem[]> => {
    const res = await apiClient.get(`/events/${eventId}/rsvps`);
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  submitEventRsvp: async (
    eventId: string,
    payload: {
      guest_name: string;
      guest_email: string;
      guest_phone?: string;
      tickets: number;
      notes?: string;
    }
  ): Promise<EventRsvpItem> => {
    const res = await apiClient.post(`/events/${eventId}/rsvp`, payload);
    return normalizeDoc(res.data?.data ?? res.data);
  },

  // Admin Overview & Notifications
  getAdminOverview: async (): Promise<AdminOverviewData> => {
    const res = await apiClient.get('/admin/overview');
    const payload = res.data?.data ?? res.data;
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
        ? payload.recentVolunteers.map((v: { _id?: string; id?: string; applied_date?: string }) => ({
            ...normalizeDoc(v),
            applied_date: v.applied_date ? String(v.applied_date) : '',
          }))
        : [],
      upcomingEventsList: Array.isArray(payload?.upcomingEventsList)
        ? payload.upcomingEventsList.map(normalizeDoc)
        : [],
    };
  },

  getNotifications: async (params?: {
    unreadOnly?: boolean;
    limit?: number;
  }): Promise<{ items: AdminNotificationItem[]; unreadCount: number; total: number }> => {
    const res = await apiClient.get('/notifications', { params });
    const list = res.data?.data ?? [];
    const meta = res.data?.meta ?? {};
    return {
      items: Array.isArray(list) ? list.map(normalizeDoc) : [],
      unreadCount: typeof meta.unreadCount === 'number' ? meta.unreadCount : 0,
      total: typeof meta.total === 'number' ? meta.total : 0,
    };
  },

  getUnreadNotificationCount: async (): Promise<number> => {
    const res = await apiClient.get('/notifications/unread-count');
    const payload = res.data?.data ?? res.data;
    return typeof payload?.unreadCount === 'number' ? payload.unreadCount : 0;
  },

  markNotificationRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`);
  },

  markAllNotificationsRead: async (): Promise<void> => {
    await apiClient.patch('/notifications/mark-all-read');
  },

  // Volunteer Admin Operations
  getVolunteers: async (): Promise<VolunteerApplication[]> => {
    const res = await apiClient.get('/volunteers');
    const list = res.data?.data ?? res.data ?? [];
    if (!Array.isArray(list)) return [];
    return list.map((item) => {
      const normalized = normalizeDoc(item as VolunteerApplication & { _id?: string; createdAt?: string });
      return {
        ...normalized,
        interests: Array.isArray(normalized.interests) ? normalized.interests : [],
        applied_date: normalized.applied_date || normalized.createdAt || '',
        bio: normalized.bio || '',
      };
    });
  },

  updateVolunteerStatus: async (
    id: string,
    status: VolunteerApplication['status'],
    admin_notes?: string
  ): Promise<VolunteerApplication> => {
    const res = await apiClient.patch(`/volunteers/${id}/status`, { status, admin_notes });
    return normalizeDoc(res.data?.data ?? res.data);
  },

  deleteVolunteer: async (id: string): Promise<void> => {
    await apiClient.delete(`/volunteers/${id}`);
  },

  // Static Setting Pages
  getSettingPage: async (slug: string) => {
    const res = await apiClient.get(`/settings/${slug}`);
    return res.data?.data ?? res.data;
  },

  updateSettingPage: async (
    slug: string,
    payload: { title?: string; htmlContent?: string; isPublished?: boolean }
  ) => {
    const res = await apiClient.patch(`/settings/${slug}`, payload);
    return res.data?.data ?? res.data;
  },

  // Cloudinary Upload
  uploadMedia: async (
    files: File[],
    onProgress?: (percent: number) => void
  ): Promise<Array<{ url: string; publicId: string }>> => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    const res = await apiClient.post('/upload', formData, {
      timeout: 180000,
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          const pct = Math.min(99, Math.round((evt.loaded * 100) / evt.total));
          onProgress(pct);
        }
      },
    });
    if (onProgress) onProgress(100);
    const data = res.data?.data ?? res.data;
    return Array.isArray(data) ? data : [data];
  },

  // Auditions / Sponsors / Inquiries Admin Listings & Triage
  getAuditions: async () => {
    const res = await apiClient.get('/auditions');
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  getSponsors: async () => {
    const res = await apiClient.get('/sponsors');
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  getInquiries: async () => {
    const res = await apiClient.get('/inquiries');
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  updateSubmissionStatus: async (
    endpoint: 'auditions' | 'sponsors' | 'inquiries',
    id: string,
    status: string,
    admin_notes?: string
  ) => {
    const payload =
      admin_notes !== undefined ? { status, admin_notes } : { status };
    const res = await apiClient.patch(`/${endpoint}/${id}/status`, payload);
    return normalizeDoc(res.data?.data ?? res.data);
  },

  deleteSubmission: async (
    endpoint: 'auditions' | 'sponsors' | 'inquiries',
    id: string
  ): Promise<void> => {
    await apiClient.delete(`/${endpoint}/${id}`);
  },
};

export default movementService;


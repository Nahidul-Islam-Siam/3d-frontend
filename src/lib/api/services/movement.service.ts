import apiClient from '../client';
import type {
  VideoSlot,
  EventItem,
  VolunteerApplication,
} from '@/pages/admin/mockData';

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

  // Volunteer Admin Operations
  getVolunteers: async (): Promise<VolunteerApplication[]> => {
    const res = await apiClient.get('/volunteers');
    const list = res.data?.data ?? res.data ?? [];
    return Array.isArray(list) ? list.map(normalizeDoc) : [];
  },

  updateVolunteerStatus: async (
    id: string,
    status: VolunteerApplication['status'],
    admin_notes?: string
  ): Promise<VolunteerApplication> => {
    const res = await apiClient.patch(`/volunteers/${id}/status`, { status, admin_notes });
    return normalizeDoc(res.data?.data ?? res.data);
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
    const res = await apiClient.put(`/settings/${slug}`, payload);
    return res.data?.data ?? res.data;
  },

  // Cloudinary Upload
  uploadMedia: async (files: File[]): Promise<Array<{ url: string; publicId: string }>> => {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    const res = await apiClient.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const data = res.data?.data ?? res.data;
    return Array.isArray(data) ? data : [data];
  },

  // Auditions / Sponsors / Inquiries Admin Listings
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
};

export default movementService;


import type { EventItem, VolunteerApplication } from '@/pages/admin/types';

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

export interface PublicSettingPage {
  _id?: string;
  slug: string;
  title: string;
  htmlContent: string;
  isPublished?: boolean;
  updatedAt?: string;
}

export function normalizeDoc<T extends { _id?: string; id?: string }>(
  doc: T,
): T & { id: string } {
  return {
    ...doc,
    id: doc.id || doc._id || '',
  };
}

export function normalizeDocList<T extends { _id?: string; id?: string }>(
  raw: { data?: T[] } | T[] | undefined,
): Array<T & { id: string }> {
  const list = Array.isArray(raw) ? raw : raw?.data ?? [];
  return Array.isArray(list) ? list.map(normalizeDoc) : [];
}


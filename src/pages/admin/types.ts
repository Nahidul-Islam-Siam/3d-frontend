export interface VideoSlot {
  id: string;
  slot_label: string;
  page_location: string;
  section_anchor?: string;
  title: string;
  description: string;
  duration: string;
  status: 'Live' | 'Draft' | 'Empty';
  video_url?: string;
  thumbnail?: string;
  video_type?: 'MP4 Video' | 'YouTube Embed' | 'Vimeo';
  category?:
    | 'General'
    | 'Community Meals'
    | 'Suicide Awareness'
    | 'Youth Mentorship'
    | 'Veterans Support'
    | 'Living Movement';
  featured?: boolean;
  views_count?: number;
  sort_order: number;
  updated_at: string;
  created_at?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category?:
    | 'Community Meals & Dinners'
    | 'Suicide Awareness Showdown'
    | 'Youth Mentorship & LEADS'
    | 'Veterans Fellowship'
    | 'Fundraiser Gala'
    | 'Other';
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number;
  rsvps_count: number;
  status: 'Upcoming' | 'Happening now' | 'Past' | 'Cancelled';
  description: string;
  image_url?: string;
  ticket_type?: 'Free RSVP' | 'Paid Ticket' | 'Suggested Donation';
  price?: number;
  registration_url?: string;
  featured?: boolean;
  host_lead?: string;
  dress_code?: string;
}

export interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string;
  applied_date: string;
  status: 'Pending' | 'Approved' | 'Declined';
  bio: string;
}


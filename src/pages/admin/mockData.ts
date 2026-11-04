export interface Donation {
  id: string;
  donor_name: string;
  donor_email: string;
  program: string;  
  frequency: 'One-time' | 'Monthly recurring';
  method: 'Card (Stripe)' | 'Bank transfer (ACH)' | 'Check' | 'Cash';
  donation_date: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  amount: number;
  notes?: string;
}

export interface VideoSlot {
  id: string;
  slot_label: string;
  page_location: string;
  title: string;
  description: string;
  duration: string;
  status: 'Live' | 'Draft' | 'Empty';
  video_url?: string;
  thumbnail?: string;
  sort_order: number;
  updated_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number;
  rsvps_count: number;
  status: 'Upcoming' | 'Happening now' | 'Past' | 'Cancelled';
  description: string;
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

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: 'Super admin' | 'Finance — donations only' | 'Editor — videos and events' | 'Moderator — volunteers';
  status: 'Active' | 'Invited';
  last_active: string;
}

export interface SystemSettings {
  stripe_enabled: boolean;
  ach_enabled: boolean;
  apple_pay_enabled: boolean;
  offline_gifts_enabled: boolean;
  large_gift_alert: boolean;
  large_gift_threshold: number;
  daily_digest: boolean;
  volunteer_alert: boolean;
  auto_tax_receipts: boolean;
  org_name: string;
  tax_id: string;
}

export const INITIAL_PROGRAMS = [
  'Community Meals',
  'LEADS Youth Development',
  'Suicide Awareness Showdown',
  'Veterans Support',
  'General Fund',
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'don-101',
    donor_name: 'Eleanor Wright',
    donor_email: 'eleanor.wright@heritage.org',
    program: 'Community Meals',
    frequency: 'Monthly recurring',
    method: 'Card (Stripe)',
    donation_date: '2026-11-03',
    status: 'Paid',
    amount: 500,
    notes: 'Monthly sustainment for neighborhood hot meals pantry.',
  },
  {
    id: 'don-102',
    donor_name: 'Marcus Sterling',
    donor_email: 'm.sterling@sterlingholdings.com',
    program: 'Suicide Awareness Showdown',
    frequency: 'One-time',
    method: 'Bank transfer (ACH)',
    donation_date: '2026-11-02',
    status: 'Paid',
    amount: 5000,
    notes: 'Presenting sponsor for the annual Awareness Showdown.',
  },
  {
    id: 'don-103',
    donor_name: 'Dr. Raymond Chen',
    donor_email: 'raymond.chen@metrohealth.edu',
    program: 'LEADS Youth Development',
    frequency: 'One-time',
    method: 'Card (Stripe)',
    donation_date: '2026-11-02',
    status: 'Paid',
    amount: 1250,
    notes: 'After-school tutoring supplies and scholarships.',
  },
  {
    id: 'don-104',
    donor_name: 'Grace Montgomery',
    donor_email: 'gmontgomery@gmail.com',
    program: 'Community Meals',
    frequency: 'Monthly recurring',
    method: 'Card (Stripe)',
    donation_date: '2026-11-01',
    status: 'Paid',
    amount: 150,
    notes: 'Weekly fresh produce box pledge.',
  },
  {
    id: 'don-105',
    donor_name: 'Vanguard Community Fellowship',
    donor_email: 'office@vanguardfellowship.org',
    program: 'General Fund',
    frequency: 'One-time',
    method: 'Check',
    donation_date: '2026-10-31',
    status: 'Pending',
    amount: 3200,
    notes: 'Check #4829 deposited; clearing with regional credit union.',
  },
  {
    id: 'don-106',
    donor_name: 'Carlos & Sofia Mendez',
    donor_email: 'mendez.family@outlook.com',
    program: 'Veterans Support',
    frequency: 'Monthly recurring',
    method: 'Card (Stripe)',
    donation_date: '2026-10-30',
    status: 'Paid',
    amount: 250,
    notes: 'In loving memory of Sgt. Hector Mendez.',
  },
  {
    id: 'don-107',
    donor_name: 'Anonymous Donor',
    donor_email: 'giving@donoradvisory.com',
    program: 'General Fund',
    frequency: 'One-time',
    method: 'Card (Stripe)',
    donation_date: '2026-10-29',
    status: 'Paid',
    amount: 10000,
    notes: 'Annual unrestricted general operational endowment.',
  },
  {
    id: 'don-108',
    donor_name: 'Hannah Abbott',
    donor_email: 'hannah.abbott@yahoo.com',
    program: 'LEADS Youth Development',
    frequency: 'Monthly recurring',
    method: 'Card (Stripe)',
    donation_date: '2026-10-28',
    status: 'Failed',
    amount: 100,
    notes: 'Card expired. Automated retry scheduled by Stripe.',
  },
  {
    id: 'don-109',
    donor_name: 'David K. Morrison',
    donor_email: 'dmorrison@northstarlogistics.com',
    program: 'Community Meals',
    frequency: 'One-time',
    method: 'Cash',
    donation_date: '2026-10-28',
    status: 'Paid',
    amount: 750,
    notes: 'Handed in at the Sunday fellowship supper.',
  },
  {
    id: 'don-110',
    donor_name: 'Beatrice Lawson',
    donor_email: 'blawson@lawsonlegal.com',
    program: 'Suicide Awareness Showdown',
    frequency: 'One-time',
    method: 'Card (Stripe)',
    donation_date: '2026-10-27',
    status: 'Paid',
    amount: 1500,
    notes: 'Youth mental health helpline resource printings.',
  },
  {
    id: 'don-111',
    donor_name: 'Keith Patterson',
    donor_email: 'kpatterson@fastmail.fm',
    program: 'Community Meals',
    frequency: 'One-time',
    method: 'Card (Stripe)',
    donation_date: '2026-10-25',
    status: 'Refunded',
    amount: 300,
    notes: 'Donor accidentally charged twice; second charge refunded.',
  },
  {
    id: 'don-112',
    donor_name: 'Sarah Mitchell',
    donor_email: 'sarah.m@liveachievebelieve.org',
    program: 'General Fund',
    frequency: 'Monthly recurring',
    method: 'Bank transfer (ACH)',
    donation_date: '2026-10-24',
    status: 'Paid',
    amount: 400,
    notes: 'Executive leadership internal tithe.',
  },
];

export const INITIAL_VIDEOS: VideoSlot[] = [
  {
    id: 'vid-1',
    slot_label: 'Welcome Hero',
    page_location: '/ (Homepage)',
    title: 'Theatrical Welcome & Cinematic Reveal',
    description: 'First video experienced by visitors entering through the golden shutter door.',
    duration: '0:22',
    status: 'Live',
    video_url: 'src/assets/video/welcome.mp4',
    sort_order: 1,
    updated_at: '2026-11-01',
  },
  {
    id: 'vid-2',
    slot_label: 'Experience the Story',
    page_location: '/experience-the-story',
    title: 'The Story Behind the Living Table',
    description: 'Immersive narrative tracing 8,000 community members over 8 years of relentless care.',
    duration: '1:45',
    status: 'Live',
    video_url: 'src/assets/experienc-story/experience-story.mp4',
    sort_order: 2,
    updated_at: '2026-10-29',
  },
  {
    id: 'vid-3',
    slot_label: 'Who We Are',
    page_location: '/who-we-are',
    title: 'Strong Foundations: Faith, Dignity, Tomorrow',
    description: 'Documentary profile showcasing the frontline mentors and pantry organizers.',
    duration: '1:30',
    status: 'Live',
    video_url: 'src/assets/join-movement/join-the-movement-2.mp4',
    sort_order: 3,
    updated_at: '2026-10-25',
  },
  {
    id: 'vid-4',
    slot_label: 'How We Serve',
    page_location: '/how-we-serve',
    title: 'A Warm Seat: Community Feasts in Action',
    description: 'Behind the scenes at weekly community dinners and kitchen prep lines.',
    duration: '2:10',
    status: 'Draft',
    video_url: 'src/assets/experienc-story/experience-story-2.mp4',
    sort_order: 4,
    updated_at: '2026-11-02',
  },
  {
    id: 'vid-5',
    slot_label: 'Join the Movement',
    page_location: '/join-the-movement',
    title: 'Living Movement: Real Change Needs Real Hands',
    description: 'Call to action driving donations, volunteering, and recurring sponsorship.',
    duration: '1:55',
    status: 'Live',
    video_url: 'src/assets/join-movement/join-movement.mp4',
    sort_order: 5,
    updated_at: '2026-10-28',
  },
  {
    id: 'vid-6',
    slot_label: 'Meet Us',
    page_location: '/meet-us',
    title: 'Leadership Spotlight & Sarah Mitchell Story',
    description: 'Cinematic portrait of leadership and personal stories that save lives.',
    duration: '2:05',
    status: 'Empty',
    sort_order: 6,
    updated_at: '2026-10-20',
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Suicide Awareness Community Showcase & Dinner',
    event_date: '2026-11-18',
    start_time: '18:00',
    end_time: '21:00',
    location: 'Community Grand Hall, 420 Hope Way',
    capacity: 150,
    rsvps_count: 138,
    status: 'Upcoming',
    description: 'An evening of courage, music, and honest conversations breaking the silence around mental health and youth suicide.',
  },
  {
    id: 'evt-2',
    title: 'Winter LEADS Youth Leadership Summit',
    event_date: '2026-12-05',
    start_time: '10:00',
    end_time: '15:30',
    location: 'Downtown Innovation Hub, 88 Pine St',
    capacity: 100,
    rsvps_count: 84,
    status: 'Upcoming',
    description: 'Day-long intensive workshop with civic leaders, scholarship coaches, and entrepreneurial mentors for teens.',
  },
  {
    id: 'evt-3',
    title: 'Thanksgiving Community Harvest Feast',
    event_date: '2026-11-26',
    start_time: '12:00',
    end_time: '16:00',
    location: 'Parkview Community Dining Center',
    capacity: 300,
    rsvps_count: 285,
    status: 'Upcoming',
    description: 'Our annual open-door banquet where 1,200+ plates of warm, homemade turkey and fixings are served family style.',
  },
  {
    id: 'evt-4',
    title: 'Veterans Outreach & Fellowship Breakfast',
    event_date: '2026-10-28',
    start_time: '08:00',
    end_time: '10:30',
    location: 'VFW Memorial Hall, Room B',
    capacity: 80,
    rsvps_count: 80,
    status: 'Past',
    description: 'Connecting returning service members with counseling, housing vouchers, and brotherhood over coffee and pancakes.',
  },
];

export const INITIAL_VOLUNTEERS: VolunteerApplication[] = [
  {
    id: 'vol-1',
    full_name: 'Amara Okafor',
    email: 'amara.okafor@gmail.com',
    phone: '(555) 234-8901',
    interests: ['Community Meals', 'Event Logistics'],
    availability: 'Weekends (Saturday & Sunday mornings)',
    applied_date: '2026-11-03',
    status: 'Pending',
    bio: 'Certified commercial food handler. Looking to help in kitchen prep and meal packaging for weekend distributions.',
  },
  {
    id: 'vol-2',
    full_name: 'Jordan Lee',
    email: 'jordan.lee@pacificu.edu',
    phone: '(555) 412-9988',
    interests: ['LEADS Youth Development'],
    availability: 'Weekday Evenings (Tue & Thu)',
    applied_date: '2026-11-02',
    status: 'Pending',
    bio: 'College senior majoring in adolescent psychology. Excited to mentor high school students in STEM and college prep.',
  },
  {
    id: 'vol-3',
    full_name: 'Chloe Henderson',
    email: 'chloe.henderson@designstudio.io',
    phone: '(555) 876-1234',
    interests: ['Event Logistics', 'Media & Photography'],
    availability: 'Flexible / On-call',
    applied_date: '2026-11-01',
    status: 'Approved',
    bio: 'Professional event photographer. Volunteering to capture showcase dinners and documentary portraits.',
  },
  {
    id: 'vol-4',
    full_name: 'Carlos Mendez',
    email: 'carlos.mendez@translogistic.com',
    phone: '(555) 345-6789',
    interests: ['Driver / Delivery', 'Food Pantry Sorting'],
    availability: 'Fridays all day',
    applied_date: '2026-10-31',
    status: 'Approved',
    bio: 'Clean commercial driver license and cargo van. Able to pick up grocery pallets and deliver to elderly neighbors.',
  },
  {
    id: 'vol-5',
    full_name: 'DeAndre Washington',
    email: 'deandre.wash@gmail.com',
    phone: '(555) 678-4321',
    interests: ['LEADS Youth Development', 'Suicide Awareness Showdown'],
    availability: 'Saturday afternoons',
    applied_date: '2026-10-30',
    status: 'Approved',
    bio: 'Youth basketball coach passionate about mental resilience and suicide prevention amongst young men.',
  },
  {
    id: 'vol-6',
    full_name: 'Hannah Abbott',
    email: 'hannah.abbott@yahoo.com',
    phone: '(555) 901-2345',
    interests: ['Community Meals'],
    availability: 'Weekday mornings',
    applied_date: '2026-10-28',
    status: 'Declined',
    bio: 'Requested placement outside of program service radius.',
  },
];

export const INITIAL_ADMIN_MEMBERS: AdminMember[] = [
  {
    id: 'adm-1',
    name: 'Sarah Mitchell',
    email: 'sarah.m@liveachievebelieve.org',
    role: 'Super admin',
    status: 'Active',
    last_active: 'Just now',
  },
  {
    id: 'adm-2',
    name: 'Marcus Vance',
    email: 'marcus.v@liveachievebelieve.org',
    role: 'Finance — donations only',
    status: 'Active',
    last_active: '2 hours ago',
  },
  {
    id: 'adm-3',
    name: 'David Kim',
    email: 'david.k@liveachievebelieve.org',
    role: 'Editor — videos and events',
    status: 'Active',
    last_active: 'Yesterday',
  },
  {
    id: 'adm-4',
    name: 'Elena Rostova',
    email: 'elena.r@liveachievebelieve.org',
    role: 'Moderator — volunteers',
    status: 'Active',
    last_active: '3 days ago',
  },
];

export const INITIAL_SETTINGS: SystemSettings = {
  stripe_enabled: true,
  ach_enabled: true,
  apple_pay_enabled: true,
  offline_gifts_enabled: true,
  large_gift_alert: true,
  large_gift_threshold: 500,
  daily_digest: true,
  volunteer_alert: true,
  auto_tax_receipts: true,
  org_name: 'Live Achieve Believe 501(c)(3)',
  tax_id: 'XX-XXXXXXX',
};

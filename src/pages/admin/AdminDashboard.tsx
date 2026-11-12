import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Badge,
  Space,
  ConfigProvider,
  Breadcrumb,
  Drawer,
  Popover,
  Spin,
  message,
  theme,
} from 'antd';
import {
  DashboardOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  TeamOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  BellOutlined,
  GlobalOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';

import logoIconWhite from '@/assets/logo/logo-icon-white.png';
import movementService, {
  type AdminOverviewData,
  type AdminNotificationItem,
} from '@/lib/api/services/movement.service';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { logout } from '@/lib/store/thunks/auth.thunks';
import { invalidatePublicVideosCache } from '@/lib/hooks/usePublicCms';

import type {
  VideoSlot,
  EventItem,
  VolunteerApplication,
} from './types';

// Import Views
import OverviewView from './views/OverviewView';
import VideosView from './views/VideosView';
import EventsView from './views/EventsView';
import VolunteersView from './views/VolunteersView';
import SettingsView from './views/SettingsView';
import SubmissionsView, {
  type AuditionItem,
  type SponsorItem,
  type InquiryItem,
  type SubmissionSubTab,
} from './views/SubmissionsView';

const { Header, Sider, Content } = Layout;

type AdminResource = 'overview' | 'videos' | 'events' | 'volunteers' | 'auditions' | 'sponsors' | 'inquiries';

const TAB_RESOURCE_MAP: Record<string, AdminResource[]> = {
  overview: ['overview'],
  videos: ['videos'],
  events: ['events'],
  volunteers: ['volunteers'],
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);

  const getTabFromPath = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    const sub = parts[1];
    if (sub === 'settings') {
      const sub2 = parts[2];
      if (sub2 && ['profile', 'password', 'about', 'privacy', 'terms'].includes(sub2)) {
        return `settings-${sub2}`;
      }
      return 'settings-profile';
    }
    if (sub && ['videos', 'events', 'volunteers', 'submissions'].includes(sub)) {
      return sub;
    }
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<string>(getTabFromPath());
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Detect screen size for responsive drawer
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Central Application State synced with Backend APIs
  const [overviewData, setOverviewData] = useState<AdminOverviewData | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  const [videos, setVideos] = useState<VideoSlot[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState<string | null>(null);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [volunteersLoading, setVolunteersLoading] = useState(false);
  const [volunteersError, setVolunteersError] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<AdminNotificationItem[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.removeItem('lab_admin_volunteers');
      localStorage.removeItem('lab_admin_videos');
      localStorage.removeItem('lab_admin_events');
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const [auditions, setAuditions] = useState<AuditionItem[]>([]);
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [submissionSubTab, setSubmissionSubTab] = useState<SubmissionSubTab>('auditions');
  const [submissionLoadingTab, setSubmissionLoadingTab] = useState<SubmissionSubTab | null>(null);
  const [loadedSubmissionTabs, setLoadedSubmissionTabs] = useState<Record<SubmissionSubTab, boolean>>({
    auditions: false,
    sponsors: false,
    inquiries: false,
  });

  const loadedResourcesRef = useRef<Set<AdminResource>>(new Set());
  const inFlightResourcesRef = useRef<Partial<Record<AdminResource, Promise<void>>>>({});
  const prevAuthedRef = useRef<boolean>(Boolean(token && isAuthenticated));

  useEffect(() => {
    const authed = Boolean(token && isAuthenticated);
    if (authed && !prevAuthedRef.current) {
      loadedResourcesRef.current.delete('overview');
      loadedResourcesRef.current.delete('volunteers');
      loadedResourcesRef.current.delete('auditions');
      loadedResourcesRef.current.delete('sponsors');
      loadedResourcesRef.current.delete('inquiries');
      setLoadedSubmissionTabs({ auditions: false, sponsors: false, inquiries: false });
    }
    prevAuthedRef.current = authed;
  }, [token, isAuthenticated]);

  const fetchNotifications = useCallback(async () => {
    if (!token || !isAuthenticated) {
      setNotifications([]);
      setUnreadNotificationsCount(0);
      return;
    }
    setNotificationsLoading(true);
    setNotificationsError(null);
    try {
      const feed = await movementService.getNotifications({ limit: 15 });
      setNotifications(feed.items);
      setUnreadNotificationsCount(feed.unreadCount);
    } catch {
      setNotificationsError('Could not load notifications.');
    } finally {
      setNotificationsLoading(false);
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setUnreadNotificationsCount(0);
      setNotifications([]);
      return;
    }
    movementService
      .getUnreadNotificationCount()
      .then((count) => setUnreadNotificationsCount(count))
      .catch(() => {});
  }, [token, isAuthenticated]);

  const fetchResource = useCallback(
    async (resource: AdminResource, force = false): Promise<void> => {
      if (!force && loadedResourcesRef.current.has(resource)) {
        return;
      }

      const existingRequest = inFlightResourcesRef.current[resource];
      if (!force && existingRequest) {
        return existingRequest;
      }

      const task = (async () => {
        try {
          if (resource === 'overview') {
            if (!token || !isAuthenticated) {
              setOverviewData(null);
              return;
            }
            setOverviewLoading(true);
            setOverviewError(null);
            try {
              const liveOverview = await movementService.getAdminOverview();
              setOverviewData(liveOverview);
              loadedResourcesRef.current.add('overview');
            } catch {
              setOverviewError('Could not load dashboard overview metrics from server.');
            } finally {
              setOverviewLoading(false);
            }
          } else if (resource === 'videos') {
            setVideosLoading(true);
            setVideosError(null);
            try {
              const liveVideos = await movementService.getVideos();
              setVideos(liveVideos);
              loadedResourcesRef.current.add('videos');
            } catch {
              setVideosError('Could not load video slots from server.');
            } finally {
              setVideosLoading(false);
            }
          } else if (resource === 'events') {
            setEventsLoading(true);
            setEventsError(null);
            try {
              const liveEvents = await movementService.getEvents();
              setEvents(liveEvents);
              loadedResourcesRef.current.add('events');
            } catch {
              setEventsError('Could not load community events from server.');
            } finally {
              setEventsLoading(false);
            }
          } else if (resource === 'volunteers') {
            if (!token || !isAuthenticated) {
              setVolunteers([]);
              return;
            }
            setVolunteersLoading(true);
            setVolunteersError(null);
            try {
              const liveVols = await movementService.getVolunteers();
              setVolunteers(liveVols);
              loadedResourcesRef.current.add('volunteers');
            } catch {
              setVolunteersError('Could not load volunteer applications from server.');
            } finally {
              setVolunteersLoading(false);
            }
          } else if (resource === 'auditions' || resource === 'sponsors' || resource === 'inquiries') {
            if (!token || !isAuthenticated) return;
            setSubmissionLoadingTab(resource);
            try {
              if (resource === 'auditions') {
                const liveAuds = await movementService.getAuditions();
                setAuditions(liveAuds);
              } else if (resource === 'sponsors') {
                const liveSpons = await movementService.getSponsors();
                setSponsors(liveSpons);
              } else {
                const liveInqs = await movementService.getInquiries();
                setInquiries(liveInqs);
              }
              loadedResourcesRef.current.add(resource);
              setLoadedSubmissionTabs((prev) => ({ ...prev, [resource]: true }));
            } finally {
              setSubmissionLoadingTab((current) => (current === resource ? null : current));
            }
          }
        } catch {
          // Handled per resource
        } finally {
          delete inFlightResourcesRef.current[resource];
        }
      })();

      inFlightResourcesRef.current[resource] = task;
      return task;
    },
    [token, isAuthenticated]
  );

  useEffect(() => {
    const resources =
      activeTab === 'submissions' ? [submissionSubTab] : TAB_RESOURCE_MAP[activeTab];
    if (!resources || resources.length === 0) return;
    void Promise.all(resources.map((resource) => fetchResource(resource)));
  }, [activeTab, submissionSubTab, fetchResource]);

  // State Updaters (live API sync)

  const handleUpdateVideo = (updated: VideoSlot) => {
    setVideos((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
    invalidatePublicVideosCache();
    if (!token) return;
    movementService
      .updateVideo(updated.id, updated)
      .then((saved) => {
        setVideos((prev) => prev.map((v) => (v.id === updated.id ? saved : v)));
        invalidatePublicVideosCache();
        loadedResourcesRef.current.delete('overview');
      })
      .catch(() => {
        message.error('Failed to update video slot on server.');
        void fetchResource('videos', true);
      });
  };

  const handleAddVideoSlot = (newSlot: VideoSlot) => {
    setVideos((prev) => [...prev, newSlot]);
    invalidatePublicVideosCache();
    if (!token) return;
    const { id: tempId, ...payload } = newSlot;
    movementService
      .createVideo(payload)
      .then((created) => {
        setVideos((prev) => prev.map((v) => (v.id === tempId ? created : v)));
        invalidatePublicVideosCache();
        loadedResourcesRef.current.delete('overview');
      })
      .catch(() => {
        message.error('Failed to save new video slot on server.');
        void fetchResource('videos', true);
      });
  };

  const handleDeleteVideoSlot = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    invalidatePublicVideosCache();
    if (!token) return;
    movementService
      .deleteVideo(id)
      .then(() => {
        invalidatePublicVideosCache();
        loadedResourcesRef.current.delete('overview');
      })
      .catch(() => {
        message.error('Failed to delete video slot on server.');
        void fetchResource('videos', true);
      });
  };

  const handleAddEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
    if (!token) return;
    const { id: tempId, ...payload } = newEvent;
    movementService
      .createEvent(payload)
      .then((created) => {
        setEvents((prev) => prev.map((e) => (e.id === tempId ? created : e)));
        loadedResourcesRef.current.delete('overview');
      })
      .catch(() => {
        message.error('Failed to create event on server.');
        void fetchResource('events', true);
      });
  };

  const handleUpdateEvent = (updated: EventItem) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    if (!token) return;
    movementService
      .updateEvent(updated.id, updated)
      .then((saved) => {
        setEvents((prev) => prev.map((e) => (e.id === updated.id ? saved : e)));
        loadedResourcesRef.current.delete('overview');
      })
      .catch(() => {
        message.error('Failed to update event on server.');
        void fetchResource('events', true);
      });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    if (!token) return;
    movementService
      .deleteEvent(id)
      .then(() => {
        loadedResourcesRef.current.delete('overview');
      })
      .catch(() => {
        message.error('Failed to delete event on server.');
        void fetchResource('events', true);
      });
  };

  const handleUpdateVolunteerStatus = async (
    id: string,
    status: VolunteerApplication['status']
  ): Promise<boolean> => {
    if (!token) return false;
    try {
      const updated = await movementService.updateVolunteerStatus(id, status);
      setVolunteers((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: updated?.status || status } : v))
      );
      loadedResourcesRef.current.delete('overview');
      return true;
    } catch {
      return false;
    }
  };

  const handleDeleteVolunteer = async (id: string): Promise<boolean> => {
    if (!token) return false;
    try {
      await movementService.deleteVolunteer(id);
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
      loadedResourcesRef.current.delete('overview');
      return true;
    } catch {
      return false;
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
    const base = location.pathname.startsWith('/admin') ? '/admin' : '/dashboard';
    if (key === 'overview') {
      window.history.pushState(null, '', base);
    } else if (key === 'settings' || key === 'settings-profile') {
      window.history.pushState(null, '', `${base}/settings/profile`);
    } else if (key.startsWith('settings-')) {
      const sub = key.replace('settings-', '');
      window.history.pushState(null, '', `${base}/settings/${sub}`);
    } else {
      window.history.pushState(null, '', `${base}/${key}`);
    }
  };

  const pendingVolunteersCount =
    loadedResourcesRef.current.has('volunteers')
      ? volunteers.filter((v) => v.status === 'Pending').length
      : (overviewData?.metrics.pendingVolunteers ?? 0);

  // Menu items for Ant Design Sider
  const menuItems = [
    {
      key: 'overview',
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      label: 'Overview',
    },
    {
      key: 'videos',
      icon: <VideoCameraOutlined style={{ fontSize: 16 }} />,
      label: 'Cinematic Videos',
    },
    {
      key: 'events',
      icon: <CalendarOutlined style={{ fontSize: 16 }} />,
      label: 'Community Events',
    },
    {
      key: 'volunteers',
      icon: <TeamOutlined style={{ fontSize: 16 }} />,
      label: (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Volunteers</span>
          {pendingVolunteersCount > 0 && (
            <Badge
              count={pendingVolunteersCount}
              style={{ backgroundColor: '#F97316', boxShadow: 'none' }}
            />
          )}
        </span>
      ),
    },
    {
      key: 'submissions',
      icon: <FormOutlined style={{ fontSize: 16 }} />,
      label: 'Auditions & Sponsors',
    },
    {
      key: 'settings',
      icon: <SettingOutlined style={{ fontSize: 16 }} />,
      label: 'Settings',
      children: [
        {
          key: 'settings-profile',
          icon: <UserOutlined style={{ fontSize: 14 }} />,
          label: 'Personal information',
        },
        {
          key: 'settings-password',
          icon: <LockOutlined style={{ fontSize: 14 }} />,
          label: 'Change password',
        },
        {
          key: 'settings-about',
          icon: <QuestionCircleOutlined style={{ fontSize: 14 }} />,
          label: 'About us',
        },
        {
          key: 'settings-privacy',
          icon: <SafetyCertificateOutlined style={{ fontSize: 14 }} />,
          label: 'Privacy policy',
        },
        {
          key: 'settings-terms',
          icon: <InfoCircleOutlined style={{ fontSize: 14 }} />,
          label: 'Terms and condition',
        },
      ],
    },
  ];

  // User Dropdown Menu
  const userMenuItems = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: user ? `Signed in as ${user.name}` : 'Preview Mode (Not signed in)',
      },
      {
        key: 'site',
        icon: <GlobalOutlined />,
        label: 'View Live Website',
        onClick: () => navigate('/'),
      },
      {
        type: 'divider' as const,
      },
      isAuthenticated
        ? {
            key: 'logout',
            icon: <LogoutOutlined />,
            danger: true,
            label: 'Sign Out',
            onClick: () => {
              dispatch(logout());
              navigate('/login');
            },
          }
        : {
            key: 'login',
            icon: <UserOutlined />,
            label: 'Sign In for Live Sync',
            onClick: () => navigate('/login'),
          },
    ],
  };

  const activeTitleMap: Record<string, string> = {
    overview: 'Mission Overview',
    videos: 'Cinematic Story Reel',
    events: 'Events & Dinners',
    volunteers: 'Volunteer Family',
    submissions: 'Auditions, Sponsors & Inquiries',
    settings: 'Personal Information',
    'settings-profile': 'Personal Information',
    'settings-password': 'Change Password',
    'settings-about': 'About Us',
    'settings-privacy': 'Privacy Policy',
    'settings-terms': 'Terms and Condition',
  };

  // Reusable Sider Content
  const isSiderCompact = collapsed && !isMobile;

  const renderSiderContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <button
        type="button"
        className="admin-brand-trigger"
        onClick={() => handleTabChange('overview')}
        aria-label="Live Achieve Believe Admin Overview"
        style={{
          justifyContent: isSiderCompact ? 'center' : 'flex-start',
          padding: isSiderCompact ? '14px 10px' : '14px 18px',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 6px 16px rgba(234, 88, 12, 0.34)',
          }}
        >
          <img
            src={logoIconWhite}
            alt="Live Achieve Believe logo"
            style={{ width: 24, height: 24, objectFit: 'contain', display: 'block' }}
          />
        </div>
        {!isSiderCompact && (
          <div style={{ lineHeight: 1.25, overflow: 'hidden' }}>
            <div
              style={{
                color: '#FAF4E6',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: 15,
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
            >
              Live Achieve Believe
            </div>
            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, marginTop: 1 }}>
              Admin Operations Hub
            </div>
          </div>
        )}
      </button>

      {/* Navigation Menu */}
      <nav aria-label="Admin navigation" style={{ flex: 1, padding: '14px 10px', overflowY: 'auto' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab.startsWith('settings-') ? activeTab : activeTab === 'settings' ? 'settings-profile' : activeTab]}
          defaultOpenKeys={['settings']}
          items={menuItems}
          onClick={({ key }) => handleTabChange(key)}
          style={{ background: 'transparent', borderRight: 0 }}
        />
      </nav>

      {/* Quick Return to Website */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          type="button"
          className="admin-sider-footer-btn"
          onClick={() => navigate('/')}
          aria-label="Open Live Website"
          style={{ justifyContent: isSiderCompact ? 'center' : 'flex-start' }}
        >
          <GlobalOutlined style={{ fontSize: 15 }} />
          {!isSiderCompact && <span>View Public Site</span>}
        </button>
      </div>
    </div>
  );

  const navigateFromNotification = async (item: AdminNotificationItem) => {
    setNotificationOpen(false);
    if (!item.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
      );
      setUnreadNotificationsCount((c) => Math.max(0, c - 1));
      movementService.markNotificationRead(item.id).catch(() => {});
    }

    const href = item.actionHref || '';
    if (href.includes('volunteer')) handleTabChange('volunteers');
    else if (href.includes('event')) handleTabChange('events');
    else if (href.includes('video')) handleTabChange('videos');
    else if (href.includes('audition')) {
      setSubmissionSubTab('auditions');
      handleTabChange('submissions');
    } else if (href.includes('sponsor')) {
      setSubmissionSubTab('sponsors');
      handleTabChange('submissions');
    } else if (href.includes('inquir') || href.includes('submission')) {
      setSubmissionSubTab('inquiries');
      handleTabChange('submissions');
    } else {
      handleTabChange('overview');
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadNotificationsCount(0);
    movementService.markAllNotificationsRead().catch(() => {
      message.error('Could not mark notifications as read.');
      void fetchNotifications();
    });
  };

  // Notification Popover Content (Synced with GET /notifications)
  const notificationContent = (
    <div style={{ width: 340 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>
          Notifications ({unreadNotificationsCount} unread)
        </span>
        {unreadNotificationsCount > 0 && (
          <button
            type="button"
            className="admin-notif-footer-btn"
            onClick={handleMarkAllRead}
          >
            Mark all read
          </button>
        )}
      </div>
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {notificationsLoading ? (
          <div style={{ padding: '28px 16px', textAlign: 'center' }}>
            <Spin size="small" />
          </div>
        ) : notificationsError ? (
          <div style={{ padding: '18px 16px', textAlign: 'center', fontSize: 12.5, color: '#DC2626' }}>
            {notificationsError}
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: 12.5, color: '#64748B' }}>
            No notifications yet.
          </div>
        ) : (
          notifications.map((item) => {
            const dotColor =
              item.priority === 'critical'
                ? '#EF4444'
                : item.priority === 'warning'
                  ? '#F59E0B'
                  : item.isRead
                    ? '#94A3B8'
                    : '#F97316';
            return (
              <button
                key={item.id}
                type="button"
                className="admin-notif-item"
                style={{
                  backgroundColor: item.isRead ? '#FFFFFF' : '#FFFBF5',
                }}
                onClick={() => void navigateFromNotification(item)}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: item.isRead ? 500 : 700, color: '#0F172A' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#475569', marginTop: 2 }}>
                    {item.message}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid #F1F5F9',
          textAlign: 'center',
          backgroundColor: '#FAFAFA',
        }}
      >
        <button
          type="button"
          className="admin-notif-footer-btn"
          onClick={() => {
            setNotificationOpen(false);
            handleTabChange('overview');
          }}
        >
          View Overview Summary →
        </button>
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#F97316',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          colorInfo: '#3B82F6',
          borderRadius: 10,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          colorBgContainer: '#ffffff',
          colorBgLayout: '#F8FAFC',
        },
        components: {
          Layout: {
            siderBg: '#0F172A',
            headerBg: '#ffffff',
          },
          Menu: {
            darkItemBg: 'transparent',
            darkSubMenuItemBg: 'transparent',
            darkItemSelectedBg: 'rgba(249, 115, 22, 0.2)',
            darkItemSelectedColor: '#F97316',
            darkItemHoverBg: 'rgba(255, 255, 255, 0.05)',
            darkItemColor: '#94A3B8',
            itemBorderRadius: 8,
            itemMarginBlock: 4,
          },
          Button: {
            colorPrimary: '#F97316',
            colorPrimaryHover: '#EA580C',
            colorPrimaryActive: '#C2410C',
            borderRadius: 8,
            controlHeight: 38,
            controlHeightSM: 32,
            fontWeight: 600,
            primaryShadow: '0 2px 8px rgba(249, 115, 22, 0.25)',
            defaultBorderColor: '#CBD5E1',
            defaultColor: '#1E293B',
            defaultBg: '#FFFFFF',
            defaultHoverBg: '#F8FAFC',
            defaultHoverBorderColor: '#F97316',
            defaultHoverColor: '#F97316',
            dangerColor: '#EF4444',
          },
          Radio: {
            colorPrimary: '#F97316',
            buttonSolidCheckedBg: '#F97316',
            buttonSolidCheckedHoverBg: '#EA580C',
            buttonSolidCheckedActiveBg: '#C2410C',
            buttonSolidCheckedColor: '#FFFFFF',
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 12,
            boxShadowSecondary: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          },
          Table: {
            borderRadius: 16,
            headerBg: '#FFFFFF',
            headerColor: '#64748B',
            headerSplitColor: 'transparent',
            borderColor: '#F1F5F9',
            rowHoverBg: '#FFFDF9',
            cellPaddingBlock: 16,
            cellPaddingInline: 18,
            fontSize: 13,
          },
          Pagination: {
            colorPrimary: '#F97316',
            colorPrimaryHover: '#EA580C',
            itemActiveBg: '#F97316',
            borderRadius: 8,
            colorText: '#64748B',
            fontSize: 13,
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
        
        {/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Desktop Sider (Hidden on Mobile) ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */}
        {!isMobile && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            width={248}
            collapsedWidth={76}
            style={{
              backgroundColor: '#0F172A',
              boxShadow: '2px 0 14px rgba(15,23,42,0.16)',
              zIndex: 20,
              height: '100vh',
              position: 'sticky',
              top: 0,
              left: 0,
            }}
          >
            {renderSiderContent()}
          </Sider>
        )}

        {/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Mobile Sliding Drawer Menu ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */}
        {isMobile && (
          <Drawer
            placement="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            width={264}
            closeIcon={<span style={{ color: '#E2E8F0', fontSize: 16 }}>✕</span>}
            styles={{
              header: {
                backgroundColor: '#0F172A',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              },
              body: { padding: 0, backgroundColor: '#0F172A' },
            }}
          >
            {renderSiderContent()}
          </Drawer>
        )}

        {/* ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ Main Content Layout ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ÃƒÂ¢Ã¢â‚¬ÂÃ¢â€šÂ¬ */}
        <Layout style={{ backgroundColor: '#F8FAFC' }}>
          {/* Top Sticky Header */}
          <Header
            style={{
              padding: isMobile ? '0 16px' : '0 28px',
              height: 68,
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <Space size="middle">
              {/* Mobile Drawer Trigger or Desktop Collapse Button */}
              {isMobile ? (
                <Button
                  type="text"
                  icon={<MenuOutlined style={{ fontSize: 18 }} />}
                  onClick={() => setMobileDrawerOpen(true)}
                  aria-label="Open navigation menu"
                  style={{ fontSize: 18, width: 40, height: 40 }}
                />
              ) : (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  style={{ fontSize: 16, width: 40, height: 40 }}
                />
              )}

              {/* Breadcrumb Navigation */}
              <Breadcrumb
                items={[
                  { title: <Link to="/" style={{ color: '#475569' }}>Website</Link> },
                  {
                    title: (
                      <button
                        type="button"
                        className="admin-breadcrumb-btn"
                        onClick={() => handleTabChange('overview')}
                      >
                        Admin
                      </button>
                    ),
                  },
                  { title: <span style={{ fontWeight: 600, color: '#0F172A' }}>{activeTitleMap[activeTab] || 'Overview'}</span> },
                ]}
              />
            </Space>

            <Space size={isMobile ? 'small' : 'middle'}>
              {!isMobile && (
                <Button
                  type="default"
                  icon={<GlobalOutlined />}
                  onClick={() => navigate('/')}
                  style={{ borderRadius: 8, borderColor: '#CBD5E1', color: '#0F172A' }}
                >
                  Live Website
                </Button>
              )}

              <Popover
                content={notificationContent}
                trigger="click"
                open={notificationOpen}
                onOpenChange={(open) => {
                  setNotificationOpen(open);
                  if (open) void fetchNotifications();
                }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                overlayInnerStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
              >
                <Badge count={unreadNotificationsCount} offset={[-2, 4]}>
                  <Button
                    type="text"
                    icon={<BellOutlined style={{ fontSize: 18, color: '#334155' }} />}
                    aria-label={`Notifications (${unreadNotificationsCount} unread)`}
                    style={{ width: 40, height: 40, borderRadius: 8 }}
                  />
                </Badge>
              </Popover>

              <Dropdown menu={userMenuItems} placement="bottomRight" arrow>
                <button
                  type="button"
                  className="admin-profile-trigger"
                  aria-label="Account menu"
                >
                  <Avatar
                    src={user?.avatar || undefined}
                    style={{ backgroundColor: '#EA580C', fontWeight: 600 }}
                    size={34}
                  >
                    {(user?.name || 'Admin')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </Avatar>
                  {!isMobile && (
                    <div style={{ lineHeight: 1.2 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>
                        {user?.name || 'Guest Preview'}
                      </div>
                      <div style={{ fontSize: 11, color: '#475569' }}>
                        {user?.role || 'Sign in to sync'}
                      </div>
                    </div>
                  )}
                </button>
              </Dropdown>
            </Space>
          </Header>

          {/* Body Content Area */}
          <Content
            style={{
              padding: isMobile ? '16px 12px' : '24px 28px',
              minHeight: 'calc(100vh - 68px)',
              overflowX: 'hidden',
            }}
          >
            <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%' }}>
              {activeTab === 'overview' && (
                <OverviewView
                  overviewData={overviewData}
                  loading={overviewLoading}
                  error={overviewError}
                  onRefresh={() => void fetchResource('overview', true)}
                  onNavigateTab={handleTabChange}
                  onOpenSubmissionsTab={(sub) => {
                    setSubmissionSubTab(sub);
                    handleTabChange('submissions');
                  }}
                />
              )}

              {activeTab === 'videos' && (
                <VideosView
                  videos={videos}
                  loading={videosLoading}
                  error={videosError}
                  onRefresh={() => void fetchResource('videos', true)}
                  onUpdateVideo={handleUpdateVideo}
                  onAddSlot={handleAddVideoSlot}
                  onDeleteSlot={handleDeleteVideoSlot}
                />
              )}

              {activeTab === 'events' && (
                <EventsView
                  events={events}
                  loading={eventsLoading}
                  error={eventsError}
                  onRefresh={() => void fetchResource('events', true)}
                  onAddEvent={handleAddEvent}
                  onUpdateEvent={handleUpdateEvent}
                  onDeleteEvent={handleDeleteEvent}
                />
              )}

              {activeTab === 'volunteers' && (
                <VolunteersView
                  volunteers={volunteers}
                  loading={volunteersLoading}
                  error={volunteersError}
                  onRefresh={() => void fetchResource('volunteers', true)}
                  onUpdateStatus={handleUpdateVolunteerStatus}
                  onDelete={handleDeleteVolunteer}
                />
              )}

              {activeTab === 'submissions' && (
                <SubmissionsView
                  activeTab={submissionSubTab}
                  onTabChange={setSubmissionSubTab}
                  loadingTab={submissionLoadingTab}
                  loadedTabs={loadedSubmissionTabs}
                  auditions={auditions}
                  sponsors={sponsors}
                  inquiries={inquiries}
                  isAuthenticated={Boolean(isAuthenticated && token)}
                  onRefresh={(tab) => void fetchResource(tab, true)}
                />
              )}

              {(activeTab === 'settings' || activeTab.startsWith('settings-')) && (
                <SettingsView
                  currentSubTab={activeTab === 'settings' ? 'settings-profile' : activeTab}
                  onNavigateSubTab={(sub) => handleTabChange(sub)}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

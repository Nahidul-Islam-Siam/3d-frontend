import { useState, useEffect } from 'react';
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
import { useLogoutSessionMutation } from '@/redux/api/authApi';
import { useAppSelector } from '@/redux/hooks';
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetEventsQuery,
  useUpdateEventMutation,
} from '@/redux/service/eventsApi';
import {
  useGetAdminOverviewQuery,
  useGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from '@/redux/service/overviewApi';
import {
  useGetAuditionsQuery,
  useGetInquiriesQuery,
  useGetSponsorsQuery,
} from '@/redux/service/submissionsApi';
import { type AdminNotificationItem } from '@/redux/service/types';
import {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  useGetVideosQuery,
  useUpdateVideoMutation,
} from '@/redux/service/videosApi';
import {
  useDeleteVolunteerMutation,
  useGetVolunteersQuery,
  useUpdateVolunteerStatusMutation,
} from '@/redux/service/volunteersApi';

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
  type SubmissionSubTab,
} from './views/SubmissionsView';

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
  const isAuthed = Boolean(token && isAuthenticated);

  const [logoutSession] = useLogoutSessionMutation();

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
  const [submissionSubTab, setSubmissionSubTab] = useState<SubmissionSubTab>('auditions');

  // Detect screen size for responsive drawer
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    try {
      localStorage.removeItem('lab_admin_volunteers');
      localStorage.removeItem('lab_admin_videos');
      localStorage.removeItem('lab_admin_events');
    } catch {
      // Ignore storage access errors
    }
  }, []);

  // Declarative RTK Query subscriptions (auto-deduped & tag-invalidated)
  const {
    data: overviewData = null,
    isLoading: overviewIsLoading,
    isFetching: overviewFetching,
    isError: isOverviewError,
    refetch: refetchOverview,
  } = useGetAdminOverviewQuery(undefined, {
    skip: !isAuthed || activeTab !== 'overview',
  });
  const overviewLoading = overviewIsLoading || overviewFetching;
  const overviewError = isOverviewError
    ? 'Could not load dashboard overview metrics from server.'
    : null;

  const {
    data: videos = [],
    isLoading: videosIsLoading,
    isFetching: videosFetching,
    isError: isVideosError,
    refetch: refetchVideos,
  } = useGetVideosQuery(undefined, {
    skip: activeTab !== 'videos',
  });
  const videosLoading = videosIsLoading || videosFetching;
  const videosError = isVideosError ? 'Could not load video slots from server.' : null;

  const {
    data: events = [],
    isLoading: eventsIsLoading,
    isFetching: eventsFetching,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useGetEventsQuery(undefined, {
    skip: activeTab !== 'events',
  });
  const eventsLoading = eventsIsLoading || eventsFetching;
  const eventsError = isEventsError ? 'Could not load community events from server.' : null;

  const {
    data: volunteers = [],
    isLoading: volunteersIsLoading,
    isFetching: volunteersFetching,
    isError: isVolunteersError,
    refetch: refetchVolunteers,
  } = useGetVolunteersQuery(undefined, {
    skip: !isAuthed || activeTab !== 'volunteers',
  });
  const volunteersLoading = volunteersIsLoading || volunteersFetching;
  const volunteersError = isVolunteersError
    ? 'Could not load volunteer applications from server.'
    : null;

  const {
    data: auditions = [],
    isLoading: auditionsLoading,
    isFetching: auditionsFetching,
    isSuccess: auditionsSuccess,
    refetch: refetchAuditions,
  } = useGetAuditionsQuery(undefined, {
    skip: !isAuthed || activeTab !== 'submissions' || submissionSubTab !== 'auditions',
  });

  const {
    data: sponsors = [],
    isLoading: sponsorsLoading,
    isFetching: sponsorsFetching,
    isSuccess: sponsorsSuccess,
    refetch: refetchSponsors,
  } = useGetSponsorsQuery(undefined, {
    skip: !isAuthed || activeTab !== 'submissions' || submissionSubTab !== 'sponsors',
  });

  const {
    data: inquiries = [],
    isLoading: inquiriesLoading,
    isFetching: inquiriesFetching,
    isSuccess: inquiriesSuccess,
    refetch: refetchInquiries,
  } = useGetInquiriesQuery(undefined, {
    skip: !isAuthed || activeTab !== 'submissions' || submissionSubTab !== 'inquiries',
  });

  const submissionLoadingTab: SubmissionSubTab | null =
    auditionsLoading || auditionsFetching
      ? 'auditions'
      : sponsorsLoading || sponsorsFetching
        ? 'sponsors'
        : inquiriesLoading || inquiriesFetching
          ? 'inquiries'
          : null;

  const loadedSubmissionTabs: Record<SubmissionSubTab, boolean> = {
    auditions: auditionsSuccess,
    sponsors: sponsorsSuccess,
    inquiries: inquiriesSuccess,
  };

  const { data: unreadCountData = 0 } = useGetUnreadNotificationCountQuery(undefined, {
    skip: !isAuthed,
  });

  const {
    data: notificationsFeed,
    isLoading: notificationsLoading,
    isError: isNotificationsError,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery(
    { limit: 15 },
    { skip: !isAuthed || !notificationOpen },
  );

  const notifications = notificationsFeed?.items ?? [];
  const unreadNotificationsCount = notificationsFeed?.unreadCount ?? unreadCountData;
  const notificationsError = isNotificationsError ? 'Could not load notifications.' : null;

  // RTK Query Mutations
  const [updateVideoMutation] = useUpdateVideoMutation();
  const [createVideoMutation] = useCreateVideoMutation();
  const [deleteVideoMutation] = useDeleteVideoMutation();
  const [createEventMutation] = useCreateEventMutation();
  const [updateEventMutation] = useUpdateEventMutation();
  const [deleteEventMutation] = useDeleteEventMutation();
  const [updateVolunteerStatusMutation] = useUpdateVolunteerStatusMutation();
  const [deleteVolunteerMutation] = useDeleteVolunteerMutation();
  const [markNotificationReadMutation] = useMarkNotificationReadMutation();
  const [markAllNotificationsReadMutation] = useMarkAllNotificationsReadMutation();

  // State Updaters (live API sync via RTK Query tag invalidation)
  const handleUpdateVideo = (updated: VideoSlot) => {
    if (!token) return;
    void updateVideoMutation({ id: updated.id, body: updated })
      .unwrap()
      .catch(() => {
        message.error('Failed to update video slot on server.');
      });
  };

  const handleAddVideoSlot = (newSlot: VideoSlot) => {
    if (!token) return;
    const payload: Partial<VideoSlot> = { ...newSlot };
    delete payload.id;
    void createVideoMutation(payload)
      .unwrap()
      .catch(() => {
        message.error('Failed to save new video slot on server.');
      });
  };

  const handleDeleteVideoSlot = (id: string) => {
    if (!token) return;
    void deleteVideoMutation(id)
      .unwrap()
      .catch(() => {
        message.error('Failed to delete video slot on server.');
      });
  };

  const handleAddEvent = (newEvent: EventItem) => {
    if (!token) return;
    const payload: Partial<EventItem> = { ...newEvent };
    delete payload.id;
    void createEventMutation(payload)
      .unwrap()
      .catch(() => {
        message.error('Failed to create event on server.');
      });
  };

  const handleUpdateEvent = (updated: EventItem) => {
    if (!token) return;
    void updateEventMutation({ id: updated.id, body: updated })
      .unwrap()
      .catch(() => {
        message.error('Failed to update event on server.');
      });
  };

  const handleDeleteEvent = (id: string) => {
    if (!token) return;
    void deleteEventMutation(id)
      .unwrap()
      .catch(() => {
        message.error('Failed to delete event on server.');
      });
  };

  const handleUpdateVolunteerStatus = async (
    id: string,
    status: VolunteerApplication['status'],
  ): Promise<boolean> => {
    if (!token) return false;
    try {
      await updateVolunteerStatusMutation({ id, status }).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const handleDeleteVolunteer = async (id: string): Promise<boolean> => {
    if (!token) return false;
    try {
      await deleteVolunteerMutation(id).unwrap();
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
    volunteers.length > 0
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
              void logoutSession().finally(() => navigate('/login'));
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
      void markNotificationReadMutation(item.id);
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
    void markAllNotificationsReadMutation()
      .unwrap()
      .catch(() => {
        message.error('Could not mark notifications as read.');
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
                  if (open && isAuthed) void refetchNotifications();
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
                  onRefresh={() => void refetchOverview()}
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
                  onRefresh={() => void refetchVideos()}
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
                  onRefresh={() => void refetchEvents()}
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
                  onRefresh={() => void refetchVolunteers()}
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
                  onRefresh={(tab) => {
                    if (tab === 'auditions') void refetchAuditions();
                    else if (tab === 'sponsors') void refetchSponsors();
                    else void refetchInquiries();
                  }}
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

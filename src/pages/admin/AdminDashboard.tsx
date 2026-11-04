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
  theme,
} from 'antd';
import {
  DashboardOutlined,
  DollarOutlined,
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
  HeartFilled,
  LockOutlined,
  QuestionCircleOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

// Import Mock Data
import {
  INITIAL_DONATIONS,
  INITIAL_VIDEOS,
  INITIAL_EVENTS,
  INITIAL_VOLUNTEERS,
  type Donation,
  type VideoSlot,
  type EventItem,
  type VolunteerApplication,
} from './mockData';

// Import Views
import OverviewView from './views/OverviewView';
import DonationsView from './views/DonationsView';
import VideosView from './views/VideosView';
import EventsView from './views/EventsView';
import VolunteersView from './views/VolunteersView';
import SettingsView from './views/SettingsView';

const { Header, Sider, Content } = Layout;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

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
    if (sub && ['donations', 'videos', 'events', 'volunteers'].includes(sub)) {
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

  // Central Application State with LocalStorage Persistence
  const [donations, setDonations] = useState<Donation[]>(() => {
    try {
      const saved = localStorage.getItem('lab_admin_donations');
      return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    } catch {
      return INITIAL_DONATIONS;
    }
  });

  const [videos, setVideos] = useState<VideoSlot[]>(() => {
    try {
      const saved = localStorage.getItem('lab_admin_videos');
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('lab_admin_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = localStorage.getItem('lab_admin_volunteers');
      return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
    } catch {
      return INITIAL_VOLUNTEERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lab_admin_donations', JSON.stringify(donations));
    } catch {}
  }, [donations]);

  useEffect(() => {
    try {
      localStorage.setItem('lab_admin_videos', JSON.stringify(videos));
    } catch {}
  }, [videos]);

  useEffect(() => {   
    try {
      localStorage.setItem('lab_admin_events', JSON.stringify(events));
    } catch {}
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('lab_admin_volunteers', JSON.stringify(volunteers));
    } catch {}
  }, [volunteers]);

  // State Updaters
  const handleAddDonation = (newDonation: Donation) => {
    setDonations((prev) => [newDonation, ...prev]);
  };

  const handleUpdateDonationStatus = (id: string, status: Donation['status']) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  const handleUpdateVideo = (updated: VideoSlot) => {
    setVideos((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  };

  const handleAddVideoSlot = (newSlot: VideoSlot) => {
    setVideos((prev) => [...prev, newSlot]);
  };

  const handleDeleteVideoSlot = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const handleAddEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleUpdateEvent = (updated: EventItem) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleUpdateVolunteerStatus = (id: string, status: VolunteerApplication['status']) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
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

  const pendingVolunteersCount = volunteers.filter((v) => v.status === 'Pending').length;

  // Menu items for Ant Design Sider
  const menuItems = [
    {
      key: 'overview',
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      label: 'Overview',
    },
    {
      key: 'donations',
      icon: <DollarOutlined style={{ fontSize: 16 }} />,
      label: 'Donations',
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
        label: 'Signed in as Sarah Mitchell',
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
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        danger: true,
        label: 'Sign Out',
        onClick: () => navigate('/login'),
      },
    ],
  };

  const activeTitleMap: Record<string, string> = {
    overview: 'Mission Overview',
    donations: 'Donations & Giving',
    videos: 'Cinematic Story Reel',
    events: 'Events & Dinners',
    volunteers: 'Volunteer Family',
    settings: 'Personal Information',
    'settings-profile': 'Personal Information',
    'settings-password': 'Change Password',
    'settings-about': 'About Us',
    'settings-privacy': 'Privacy Policy',
    'settings-terms': 'Terms and Condition',
  };

  // Reusable Sider Content
  const renderSiderContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <div
        style={{
          height: 68,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer',
        }}
        onClick={() => handleTabChange('overview')}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(249,115,22,0.3)',
          }}
        >
          <HeartFilled style={{ fontSize: 18 }} />
        </div>
        {(!collapsed || isMobile) && (
          <div style={{ lineHeight: 1.25, overflow: 'hidden' }}>
            <div style={{ color: '#FAF4E6', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', letterSpacing: '-0.2px' }}>
              Live Achieve Believe
            </div>
            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500 }}>
              Admin Operations Hub
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeTab.startsWith('settings-') ? activeTab : activeTab === 'settings' ? 'settings-profile' : activeTab]}
          defaultOpenKeys={['settings']}
          items={menuItems}
          onClick={({ key }) => handleTabChange(key)}
          style={{ background: 'transparent', borderRight: 0 }}
        />
      </div>
    </div>
  );

  // Notification Popover Content
  const notificationContent = (
    <div style={{ width: 330 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13.5, color: '#1E293B' }}>
          Notifications
        </span>
        <span
          style={{ fontSize: 11.5, color: '#F97316', cursor: 'pointer', fontWeight: 600 }}
          onClick={() => {}}
        >
          Mark all read
        </span>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #F8FAFC',
            cursor: 'pointer',
            display: 'flex',
            gap: 12,
          }}
          onClick={() => {
            setNotificationOpen(false);
            handleTabChange('volunteers');
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#F97316',
              marginTop: 6,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1E293B' }}>
              4 Pending Volunteer Applications
            </div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
              Amara Okafor & 3 others awaiting approval.
            </div>
            <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 4 }}>
              1 hour ago
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #F8FAFC',
            cursor: 'pointer',
            display: 'flex',
            gap: 12,
          }}
          onClick={() => {
            setNotificationOpen(false);
            handleTabChange('donations');
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              marginTop: 6,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1E293B' }}>
              Major Gift: $5,000 Received
            </div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
              Marcus Sterling contributed to Suicide Awareness.
            </div>
            <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 4 }}>
              2 hours ago
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #F8FAFC',
            cursor: 'pointer',
            display: 'flex',
            gap: 12,
          }}
          onClick={() => {
            setNotificationOpen(false);
            handleTabChange('events');
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#3B82F6',
              marginTop: 6,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1E293B' }}>
              Suicide Awareness Dinner: 92% Full
            </div>
            <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
              138 out of 150 RSVPs confirmed.
            </div>
            <div style={{ fontSize: 10.5, color: '#94A3B8', marginTop: 4 }}>
              Yesterday
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid #F1F5F9',
          textAlign: 'center',
          backgroundColor: '#FAFAFA',
        }}
      >
        <span
          style={{ fontSize: 11.5, color: '#1677FF', cursor: 'pointer', fontWeight: 500 }}
          onClick={() => {
            setNotificationOpen(false);
            handleTabChange('overview');
          }}
        >
          View Overview Summary →
        </span>
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
            width={240}
            collapsedWidth={74}
            style={{
              backgroundColor: '#0F172A',
              boxShadow: '2px 0 12px rgba(15,23,42,0.15)',
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
            width={260}
            styles={{ body: { padding: 0, backgroundColor: '#0F172A' } }}
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
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
                  style={{ fontSize: 18, width: 40, height: 40 }}
                />
              ) : (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: 16, width: 40, height: 40 }}
                />
              )}

              {/* Breadcrumb Navigation */}
              <Breadcrumb
                items={[
                  { title: <Link to="/" style={{ color: '#64748B' }}>Website</Link> },
                  { title: <span onClick={() => handleTabChange('overview')} style={{ cursor: 'pointer', color: '#64748B' }}>Admin</span> },
                  { title: <span style={{ fontWeight: 600, color: '#1E293B' }}>{activeTitleMap[activeTab] || 'Overview'}</span> },
                ]}
              />
            </Space>

            <Space size={isMobile ? 'small' : 'middle'}>
              {!isMobile && (
                <Button
                  type="default"
                  icon={<GlobalOutlined />}
                  onClick={() => navigate('/')}
                  style={{ borderRadius: 8, borderColor: '#CBD5E1' }}
                >
                  Live Website
                </Button>
              )}

              <Popover
                content={notificationContent}
                trigger="click"
                open={notificationOpen}
                onOpenChange={setNotificationOpen}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                overlayInnerStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
              >
                <Badge count={pendingVolunteersCount} offset={[-2, 4]}>
                  <Button
                    type="text"
                    icon={<BellOutlined style={{ fontSize: 18, color: '#475569' }} />}
                    style={{ width: 40, height: 40, borderRadius: 8 }}
                  />
                </Badge>
              </Popover>

              <Dropdown menu={userMenuItems} placement="bottomRight" arrow>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8 }}>
                  <Avatar style={{ backgroundColor: '#F97316', fontWeight: 600 }} size={34}>
                    SM
                  </Avatar>
                  {!isMobile && (
                    <div style={{ lineHeight: 1.2 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                        Sarah Mitchell
                      </div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>
                        Executive Director
                      </div>
                    </div>
                  )}
                </div>
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
                  donations={donations}
                  videos={videos}
                  events={events}
                  volunteers={volunteers}
                  onNavigateTab={handleTabChange}
                />
              )}

              {activeTab === 'donations' && (
                <DonationsView
                  donations={donations}
                  onAddDonation={handleAddDonation}
                  onUpdateStatus={handleUpdateDonationStatus}
                />
              )}

              {activeTab === 'videos' && (
                <VideosView
                  videos={videos}
                  onUpdateVideo={handleUpdateVideo}
                  onAddSlot={handleAddVideoSlot}
                  onDeleteSlot={handleDeleteVideoSlot}
                />
              )}

              {activeTab === 'events' && (
                <EventsView
                  events={events}
                  onAddEvent={handleAddEvent}
                  onUpdateEvent={handleUpdateEvent}
                />
              )}

              {activeTab === 'volunteers' && (
                <VolunteersView
                  volunteers={volunteers}
                  onUpdateStatus={handleUpdateVolunteerStatus}
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

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
  theme,
  Tag,
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
} from '@ant-design/icons';

// Import Mock Data
import {
  INITIAL_DONATIONS,
  INITIAL_VIDEOS,
  INITIAL_EVENTS,
  INITIAL_VOLUNTEERS,
  INITIAL_ADMIN_MEMBERS,
  INITIAL_SETTINGS,
  type Donation,
  type VideoSlot,
  type EventItem,
  type VolunteerApplication,
  type AdminMember,
  type SystemSettings,
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
    if (sub && ['donations', 'videos', 'events', 'volunteers', 'settings'].includes(sub)) {
      return sub;
    }
    return 'overview';
  };

  const [activeTab, setActiveTab] = useState<string>(getTabFromPath());
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive drawer
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Central Application State
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [videos, setVideos] = useState<VideoSlot[]>(INITIAL_VIDEOS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(INITIAL_VOLUNTEERS);
  const [adminMembers, setAdminMembers] = useState<AdminMember[]>(INITIAL_ADMIN_MEMBERS);
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);

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

  const handleUpdateMemberRole = (id: string, role: AdminMember['role']) => {
    setAdminMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m))
    );
  };

  const handleRemoveMember = (id: string) => {
    setAdminMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMember = (member: AdminMember) => {
    setAdminMembers((prev) => [...prev, member]);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
    const base = location.pathname.startsWith('/admin') ? '/admin' : '/dashboard';
    window.history.pushState(null, '', key === 'overview' ? base : `${base}/${key}`);
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
      label: 'Admin Settings',
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
    settings: 'Admin Settings',
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
          selectedKeys={[activeTab]}
          items={menuItems}
          onClick={({ key }) => handleTabChange(key)}
          style={{ background: 'transparent', borderRight: 0 }}
        />
      </div>

      {/* Profile & Live Site CTA */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.15)',
        }}
      >
        {(!collapsed || isMobile) ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Avatar
                size={38}
                style={{ backgroundColor: '#F97316', fontWeight: 600 }}
              >
                SM
              </Avatar>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Sarah Mitchell
                </div>
                <Tag color="orange" style={{ fontSize: 10, padding: '0 6px', margin: '2px 0 0 0', borderRadius: 4 }}>
                  Super Admin
                </Tag>
              </div>
            </div>
            <Button
              block
              type="text"
              icon={<GlobalOutlined />}
              style={{
                color: '#CBD5E1',
                textAlign: 'left',
                padding: '0 10px',
                height: 36,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
              }}
              onClick={() => navigate('/')}
            >
              ← Back to Website
            </Button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Avatar style={{ backgroundColor: '#F97316' }}>SM</Avatar>
          </div>
        )}
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
        
        {/* ─── Desktop Sider (Hidden on Mobile) ─── */}
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

        {/* ─── Mobile Sliding Drawer Menu ─── */}
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

        {/* ─── Main Content Layout ─── */}
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

              <Badge count={pendingVolunteersCount} offset={[-2, 4]}>
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: 18, color: '#475569' }} />}
                  style={{ width: 40, height: 40, borderRadius: 8 }}
                  onClick={() => handleTabChange('volunteers')}
                />
              </Badge>

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

              {activeTab === 'settings' && (
                <SettingsView
                  members={adminMembers}
                  settings={settings}
                  onUpdateMemberRole={handleUpdateMemberRole}
                  onRemoveMember={handleRemoveMember}
                  onAddMember={handleAddMember}
                  onUpdateSettings={setSettings}
                />
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

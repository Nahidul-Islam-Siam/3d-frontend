import { Card, Row, Col, Progress, Table, Tag, Button, Avatar, Space, Typography } from 'antd';
import {
  TeamOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import type { VideoSlot, EventItem, VolunteerApplication } from '../mockData';

const { Title, Text, Paragraph } = Typography;

interface OverviewViewProps {
  videos: VideoSlot[];
  events: EventItem[];
  volunteers: VolunteerApplication[];
  onNavigateTab: (tabKey: string) => void;
}

export default function OverviewView({
  videos,
  events,
  volunteers,
  onNavigateTab,
}: OverviewViewProps) {
  const activeVolunteersCount = volunteers.filter((v) => v.status === 'Approved').length;
  const pendingVolunteers = volunteers.filter((v) => v.status === 'Pending');
  const emptyVideoSlots = videos.filter((v) => v.status === 'Empty' || v.status === 'Draft');
  const activeVideosCount = videos.filter((v) => v.status === 'Live').length || videos.length;
  const upcomingEvents = events.filter((e) => e.status === 'Upcoming');
  const totalRsvps = events.reduce((sum, e) => sum + (e.rsvps_count || 0), 0);

  // Recent 5 volunteer applicants
  const recentVolunteers = [...volunteers]
    .sort((a, b) => new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime())
    .slice(0, 5);

  const volunteerColumns = [
    {
      title: 'Volunteer',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (name: string, record: VolunteerApplication) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13 }}>{name}</div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Interests',
      dataIndex: 'interests',
      key: 'interests',
      render: (interests: string[]) => (
        <Space size={[0, 4]} wrap>
          {interests.slice(0, 2).map((item) => (
            <Tag key={item} color="orange" style={{ borderRadius: 6, margin: 0, fontSize: 11 }}>
              {item}
            </Tag>
          ))}
          {interests.length > 2 && (
            <span style={{ fontSize: 11, color: '#94A3B8' }}>+{interests.length - 2}</span>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: VolunteerApplication['status']) => {
        if (status === 'Approved') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
              }}
            >
              Approved
            </span>
          );
        }
        if (status === 'Pending') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: '#FFF7ED',
                color: '#C2410C',
                border: '1px solid #FFEDD5',
              }}
            >
              Pending
            </span>
          );
        }
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '3px 10px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              border: '1px solid #CBD5E1',
            }}
          >
            Declined
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 90,
      render: () => (
        <Button
          type="link"
          size="small"
          onClick={() => onNavigateTab('volunteers')}
          style={{ padding: 0, color: '#F97316', fontWeight: 600 }}
        >
          Review
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ─── Page Title Header ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
            Mission Operations & Control
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            Manage community volunteers, website film stories, and fellowship events.
          </Paragraph>
        </div>
        <Space wrap>
          <Button
            type="default"
            icon={<ExportOutlined />}
            href="https://squareup.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderRadius: 8, borderColor: '#CBD5E1' }}
          >
            Square Merchant Portal ↗
          </Button>
          <Button
            type="primary"
            onClick={() => onNavigateTab('volunteers')}
            style={{ borderRadius: 8, background: '#F97316' }}
          >
            Review Volunteers
          </Button>
        </Space>
      </div>

      {/* ─── 4 Top Stat Cards ─── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.02)',
              border: '1px solid #F1F5F9',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Active Volunteers</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {activeVolunteersCount || volunteers.length}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <TeamOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="success" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                <CheckCircleOutlined /> Active
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>Ready for service</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.02)',
              border: '1px solid #F1F5F9',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Pending Influx</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {pendingVolunteers.length}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#FFF7ED',
                  color: '#F97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <ClockCircleOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="orange" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                Needs Intake
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>Awaiting background check</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.02)',
              border: '1px solid #F1F5F9',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Live Film Slots</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {activeVideosCount}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <VideoCameraOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="blue" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                {emptyVideoSlots.length === 0 ? 'Full Roster' : `${emptyVideoSlots.length} Draft`}
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>Homepage reels</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.02)',
              border: '1px solid #F1F5F9',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Community RSVPs</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {totalRsvps}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#F5F3FF',
                  color: '#8B5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <CalendarOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="purple" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                {upcomingEvents.length} Dinners
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>Scheduled events</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Row 2: Recent Volunteers & Upcoming Dinners ─── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={15}>
          <Card
            title={<span style={{ fontWeight: 600, color: '#1E293B', fontSize: 15 }}>Recent Volunteer Applications</span>}
            extra={
              <Button type="link" onClick={() => onNavigateTab('volunteers')} style={{ padding: 0, color: '#F97316', fontWeight: 600 }}>
                View all applicants <ArrowRightOutlined />
              </Button>
            }
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}
          >
            <Table
              className="admin-saas-table"
              dataSource={recentVolunteers}
              columns={volunteerColumns}
              rowKey="id"
              pagination={false}
              size="middle"
              scroll={{ x: 550 }}
            />
          </Card>
        </Col>

        <Col xs={24} xl={9}>
          <Card
            title={<span style={{ fontWeight: 600, color: '#1E293B', fontSize: 15 }}>Upcoming Community Dinners</span>}
            extra={
              <Button type="link" onClick={() => onNavigateTab('events')} style={{ padding: 0, color: '#F97316', fontWeight: 600 }}>
                Manage <ArrowRightOutlined />
              </Button>
            }
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {events.slice(0, 4).map((evt) => {
                const pct = evt.capacity > 0 ? Math.min(100, Math.round((evt.rsvps_count / evt.capacity) * 100)) : 0;
                return (
                  <div key={evt.id} style={{ padding: '10px 12px', borderRadius: 10, backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <div>
                        <Text strong style={{ fontSize: 13, color: '#0F172A' }}>{evt.title}</Text>
                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                          {evt.event_date} · {evt.location}
                        </div>
                      </div>
                      <Tag color={evt.status === 'Upcoming' ? 'orange' : 'default'} style={{ margin: 0, borderRadius: 6, fontSize: 11 }}>
                        {evt.status}
                      </Tag>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 4 }}>
                        <span>Capacity</span>
                        <span>{evt.rsvps_count} / {evt.capacity} RSVPs ({pct}%)</span>
                      </div>
                      <Progress
                        percent={pct}
                        showInfo={false}
                        strokeColor={pct >= 90 ? '#EF4444' : '#F97316'}
                        trailColor="#E2E8F0"
                        size={['100%', 6]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Row 3: Operational Quick Action Cards ─── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            actions={[
              <Button type="link" onClick={() => onNavigateTab('volunteers')} key="vol" style={{ color: '#F97316', fontWeight: 600 }}>
                Review Applications ({pendingVolunteers.length}) →
              </Button>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#FFF7ED', color: '#F97316' }} icon={<TeamOutlined />} size={42} />}
              title={<span style={{ fontWeight: 600 }}>Volunteer Influx</span>}
              description={
                pendingVolunteers.length > 0
                  ? `${pendingVolunteers.length} pending applications waiting for background intake.`
                  : 'All volunteer applications reviewed and welcomed.'
              }
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            actions={[
              <Button type="link" onClick={() => onNavigateTab('videos')} key="vid" style={{ color: '#F97316', fontWeight: 600 }}>
                Review Film Slots ({emptyVideoSlots.length} open) →
              </Button>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }} icon={<VideoCameraOutlined />} size={42} />}
              title={<span style={{ fontWeight: 600 }}>Cinematic Stories</span>}
              description={
                emptyVideoSlots.length > 0
                  ? `${emptyVideoSlots.length} slot(s) currently empty or saved in draft.`
                  : 'All website film positions active with live video links.'
              }
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            actions={[
              <Button type="link" onClick={() => onNavigateTab('events')} key="evt" style={{ color: '#F97316', fontWeight: 600 }}>
                Manage Guest RSVPs →
              </Button>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#ECFDF5', color: '#10B981' }} icon={<CalendarOutlined />} size={42} />}
              title={<span style={{ fontWeight: 600 }}>Community Gatherings</span>}
              description={
                upcomingEvents.length > 0
                  ? `${upcomingEvents[0].title} on ${upcomingEvents[0].event_date}.`
                  : 'No upcoming events scheduled.'
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

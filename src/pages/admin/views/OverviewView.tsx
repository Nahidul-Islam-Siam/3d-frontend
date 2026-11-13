import { Alert, Card, Row, Col, Progress, Table, Tag, Button, Avatar, Space, Typography } from 'antd';
import {
  TeamOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExportOutlined,
  ReloadOutlined,
  FormOutlined,
} from '@ant-design/icons';
import type { AdminOverviewData } from '@/redux/service/types';
import type { VolunteerApplication } from '../types';
import type { SubmissionSubTab } from './SubmissionsView';

const { Title, Text, Paragraph } = Typography;

interface OverviewViewProps {
  overviewData: AdminOverviewData | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onNavigateTab: (tabKey: string) => void;
  onOpenSubmissionsTab: (subTab: SubmissionSubTab) => void;
}

type OverviewVolunteerRow = AdminOverviewData['recentVolunteers'][number];

export default function OverviewView({
  overviewData,
  loading,
  error,
  onRefresh,
  onNavigateTab,
  onOpenSubmissionsTab,
}: OverviewViewProps) {
  const metrics = overviewData?.metrics ?? {
    totalVolunteers: 0,
    pendingVolunteers: 0,
    pendingAuditions: 0,
    pendingSponsors: 0,
    openInquiries: 0,
    upcomingEvents: 0,
    activeVideos: 0,
    totalRsvps: 0,
    totalCapacity: 0,
  };
  const recentVolunteers = overviewData?.recentVolunteers ?? [];
  const upcomingEvents = overviewData?.upcomingEventsList ?? [];

  const volunteerColumns = [
    {
      title: 'Volunteer',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (name: string, record: OverviewVolunteerRow) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13 }}>{name}</div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>{record.email}</div>
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
      {error && (
        <Alert
          type="error"
          showIcon
          message={error}
          action={
            <Button size="small" onClick={onRefresh}>
              Retry
            </Button>
          }
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
            Mission Operations & Control
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            Live metrics across community volunteers, submissions, films, and fellowship events.
          </Paragraph>
        </div>
        <Space wrap>
          <Button
            type="default"
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={onRefresh}
            style={{ borderRadius: 8, borderColor: '#CBD5E1' }}
          >
            Refresh
          </Button>
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
            loading={loading && !overviewData}
            className="admin-saas-card admin-stat-card"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>Active Volunteers</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {metrics.totalVolunteers}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#ECFDF5',
                  color: '#047857',
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
            loading={loading && !overviewData}
            className="admin-saas-card admin-stat-card"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>Pending Volunteers</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {metrics.pendingVolunteers}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#FFF7ED',
                  color: '#C2410C',
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
              <Text type="secondary" style={{ fontSize: 12 }}>Awaiting coordinator review</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            loading={loading && !overviewData}
            className="admin-saas-card admin-stat-card"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>Live Film Slots</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {metrics.activeVideos}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#EFF6FF',
                  color: '#1D4ED8',
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
                Published
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>Website reels</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            loading={loading && !overviewData}
            className="admin-saas-card admin-stat-card"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#475569', fontSize: 13, fontWeight: 600 }}>Community RSVPs</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {metrics.totalRsvps}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#F5F3FF',
                  color: '#6D28D9',
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
                {metrics.upcomingEvents} Upcoming
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {metrics.totalCapacity > 0 ? `of ${metrics.totalCapacity} capacity` : 'Scheduled events'}
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Row 2: Recent Volunteers & Upcoming Dinners ─── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={15}>
          <Card
            title={<span style={{ fontWeight: 600, color: '#0F172A', fontSize: 15 }}>Recent Volunteer Applications</span>}
            extra={
              <Button type="link" onClick={() => onNavigateTab('volunteers')} style={{ padding: 0, color: '#C2410C', fontWeight: 600 }}>
                View all applicants <ArrowRightOutlined />
              </Button>
            }
            bordered={false}
            className="admin-saas-card"
            style={{ height: '100%' }}
          >
            <Table
              className="admin-saas-table"
              dataSource={recentVolunteers}
              columns={volunteerColumns}
              rowKey="id"
              loading={loading}
              pagination={false}
              size="middle"
              locale={{ emptyText: 'No volunteer applications received yet.' }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>

        <Col xs={24} xl={9}>
          <Card
            title={<span style={{ fontWeight: 600, color: '#0F172A', fontSize: 15 }}>Upcoming Community Dinners</span>}
            extra={
              <Button type="link" onClick={() => onNavigateTab('events')} style={{ padding: 0, color: '#C2410C', fontWeight: 600 }}>
                Manage <ArrowRightOutlined />
              </Button>
            }
            bordered={false}
            loading={loading && !overviewData}
            className="admin-saas-card"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upcomingEvents.length === 0 ? (
                <div style={{ padding: '28px 16px', textAlign: 'center', color: '#64748B', fontSize: 13 }}>
                  No upcoming events scheduled yet.
                </div>
              ) : (
                upcomingEvents.slice(0, 4).map((evt) => {
                  const pct = evt.capacity > 0 ? Math.min(100, Math.round((evt.rsvps_count / evt.capacity) * 100)) : 0;
                  return (
                    <div key={evt.id} style={{ padding: '12px 14px', borderRadius: 12, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, gap: 8 }}>
                        <div>
                          <Text strong style={{ fontSize: 13, color: '#0F172A' }}>{evt.title}</Text>
                          <div style={{ fontSize: 11.5, color: '#475569', marginTop: 2 }}>
                            {evt.event_date} · {evt.location}
                          </div>
                        </div>
                        <Tag color={evt.status === 'Upcoming' ? 'orange' : 'default'} style={{ margin: 0, borderRadius: 6, fontSize: 11 }}>
                          {evt.status}
                        </Tag>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#475569', marginBottom: 4 }}>
                          <span>Capacity</span>
                          <span>{evt.rsvps_count} / {evt.capacity} RSVPs ({pct}%)</span>
                        </div>
                        <Progress
                          percent={pct}
                          showInfo={false}
                          strokeColor={pct >= 90 ? '#EF4444' : '#EA580C'}
                          trailColor="#E2E8F0"
                          size={['100%', 6]}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Row 3: Live Submissions Queue & Operations Quick Cards ─── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            className="admin-saas-card"
            actions={[
              <Button type="link" onClick={() => onOpenSubmissionsTab('auditions')} key="aud" style={{ color: '#C2410C', fontWeight: 600 }}>
                Review Auditions ({metrics.pendingAuditions} pending) →
              </Button>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#FFF7ED', color: '#C2410C' }} icon={<FormOutlined />} size={42} />}
              title={<span style={{ fontWeight: 600, color: '#0F172A' }}>Showdown Auditions</span>}
              description={
                metrics.pendingAuditions > 0
                  ? `${metrics.pendingAuditions} audition submission${metrics.pendingAuditions === 1 ? '' : 's'} awaiting review.`
                  : 'No pending audition submissions right now.'
              }
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            className="admin-saas-card"
            actions={[
              <Button type="link" onClick={() => onOpenSubmissionsTab('sponsors')} key="spon" style={{ color: '#C2410C', fontWeight: 600 }}>
                Review Sponsors ({metrics.pendingSponsors} pending) →
              </Button>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }} icon={<TeamOutlined />} size={42} />}
              title={<span style={{ fontWeight: 600, color: '#0F172A' }}>Sponsor Inquiries</span>}
              description={
                metrics.pendingSponsors > 0
                  ? `${metrics.pendingSponsors} sponsorship lead${metrics.pendingSponsors === 1 ? '' : 's'} awaiting follow-up.`
                  : 'All sponsor inquiries followed up.'
              }
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            className="admin-saas-card"
            actions={[
              <Button type="link" onClick={() => onOpenSubmissionsTab('inquiries')} key="inq" style={{ color: '#C2410C', fontWeight: 600 }}>
                Open Inquiries ({metrics.openInquiries} new) →
              </Button>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#ECFDF5', color: '#047857' }} icon={<CalendarOutlined />} size={42} />}
              title={<span style={{ fontWeight: 600, color: '#0F172A' }}>Contact & Housing</span>}
              description={
                metrics.openInquiries > 0
                  ? `${metrics.openInquiries} new community or housing message${metrics.openInquiries === 1 ? '' : 's'}.`
                  : 'No new contact or housing inquiries.'
              }
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

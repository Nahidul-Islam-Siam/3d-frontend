import { Card, Row, Col, Progress, Table, Tag, Button, Avatar, Space, Typography } from 'antd';
import {
  DollarOutlined,
  HeartOutlined,
  UsergroupAddOutlined,
  AlertOutlined,
  ArrowRightOutlined,
  RiseOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import type { Donation, VideoSlot, EventItem, VolunteerApplication } from '../mockData';

const { Title, Text, Paragraph } = Typography;

interface OverviewViewProps {
  donations: Donation[];
  videos: VideoSlot[];
  events: EventItem[];
  volunteers: VolunteerApplication[];
  onNavigateTab: (tabKey: string) => void;
}

export default function OverviewView({
  donations,
  videos,
  events,
  volunteers,
  onNavigateTab,
}: OverviewViewProps) {
  // Calculations
  const paidDonations = donations.filter((d) => d.status === 'Paid');
  const totalRaised30 = paidDonations.reduce((sum, d) => sum + d.amount, 0);
  const donationCount30 = paidDonations.length;
  const avgGift30 = donationCount30 > 0 ? Math.round(totalRaised30 / donationCount30) : 0;

  const monthlyGivers = donations.filter((d) => d.frequency === 'Monthly recurring' && d.status === 'Paid');
  const monthlyTotal = monthlyGivers.reduce((sum, d) => sum + d.amount, 0);

  const pendingDonations = donations.filter((d) => d.status === 'Pending');
  const failedDonations = donations.filter((d) => d.status === 'Failed');
  const needsReviewCount = pendingDonations.length + failedDonations.length;

  const pendingVolunteers = volunteers.filter((v) => v.status === 'Pending');
  const emptyVideoSlots = videos.filter((v) => v.status === 'Empty' || v.status === 'Draft');
  const upcomingEvent = events.find((e) => e.status === 'Upcoming');

  // Giving by program breakdown
  const programMap: Record<string, number> = {};
  paidDonations.forEach((d) => {
    programMap[d.program] = (programMap[d.program] || 0) + d.amount;
  });
  const programBreakdown = Object.entries(programMap)
    .map(([program, amount]) => ({
      program,
      amount,
      pct: totalRaised30 > 0 ? Math.round((amount / totalRaised30) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Recent 5 donations
  const recentDonations = [...donations]
    .sort((a, b) => new Date(b.donation_date).getTime() - new Date(a.donation_date).getTime())
    .slice(0, 5);

  const donationColumns = [
    {
      title: 'ID',
      key: 'id',
      width: 110,
      render: (_: unknown, __: Donation, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>
              #{shortNum}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 10.5, marginTop: 1 }}>
              LAB-2026
            </div>
          </div>
        );
      },
    },
    {
      title: 'Donor',
      dataIndex: 'donor_name',
      key: 'donor_name',
      width: 180,
      render: (name: string, record: Donation) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13 }}>{name}</div>
          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{record.donor_email}</div>
        </div>
      ),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
      width: 170,
      render: (prog: string) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1E293B', fontSize: 12.5 }}>{prog}</div>
          <div style={{ marginTop: 2 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '1px 7px',
                borderRadius: 9999,
                fontSize: 10.5,
                fontWeight: 500,
                backgroundColor: '#FFF7ED',
                color: '#EA580C',
                border: '1px solid #FFEDD5',
              }}
            >
              Partner
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        if (status === 'Paid') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 9999,
                fontSize: 11.5,
                fontWeight: 600,
                backgroundColor: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
              }}
            >
              Paid
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
                fontSize: 11.5,
                fontWeight: 600,
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
              }}
            >
              Scheduled
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
              fontSize: 11.5,
              fontWeight: 600,
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              border: '1px solid #CBD5E1',
            }}
          >
            {status}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 110,
      render: (amt: number) => (
        <div>
          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13.5 }}>
            ${amt.toLocaleString()}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em' }}>
            USD
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ─── Page Title Header ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
            Mission Operations & Impact
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            Real-time telemetry across donor giving, volunteers, film features, and upcoming dinners.
          </Paragraph>
        </div>
        <Space wrap>
          <Button type="default" onClick={() => onNavigateTab('donations')} style={{ borderRadius: 8 }}>
            View All Donations
          </Button>
          <Button type="primary" onClick={() => onNavigateTab('events')} style={{ borderRadius: 8, background: '#F97316' }}>
            Manage Events
          </Button>
        </Space>
      </div>

      {/* ─── 4 Top Stat Cards (Polished Executive Theme) ─── */}
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
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Total Raised (30 Days)</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  ${totalRaised30.toLocaleString()}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <DollarOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="success" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                <RiseOutlined /> +14.2%
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>{donationCount30} gifts received</Text>
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
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Average Gift Size</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  ${avgGift30}
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
                <HeartOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="orange" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                Steady
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>From online & church suppers</Text>
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
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Monthly Sustaining Givers</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: '#0F172A', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {monthlyGivers.length}
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
                <UsergroupAddOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Tag color="purple" style={{ borderRadius: 6, margin: 0, fontWeight: 600 }}>
                MRR
              </Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>${monthlyTotal.toLocaleString()}/mo recurring</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 10px 15px -3px rgba(0,0,0,0.02)',
              border: needsReviewCount > 0 ? '1px solid #FDE68A' : '1px solid #F1F5F9',
              background: needsReviewCount > 0 ? '#FFFBEB' : '#ffffff',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ color: '#64748B', fontSize: 13, fontWeight: 600 }}>Needs Attention</span>
                <div style={{ fontWeight: 800, fontSize: 28, color: needsReviewCount > 0 ? '#D97706' : '#10B981', marginTop: 4, letterSpacing: '-0.5px' }}>
                  {needsReviewCount}
                </div>
              </div>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: needsReviewCount > 0 ? '#FEF3C7' : '#ECFDF5',
                  color: needsReviewCount > 0 ? '#D97706' : '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                <AlertOutlined />
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {pendingDonations.length} pending · {failedDonations.length} failed payments
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* ─── Row 2: Recent Donations (Responsive Table) & Giving by Program ─── */}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={15}>
          <Card
            title={<span style={{ fontWeight: 600, color: '#1E293B', fontSize: 15 }}>Recent Community Gifts</span>}
            extra={
              <Button type="link" onClick={() => onNavigateTab('donations')} style={{ padding: 0, color: '#F97316', fontWeight: 600 }}>
                View all gifts <ArrowRightOutlined />
              </Button>
            }
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}
          >
            <Table
              className="admin-saas-table"
              dataSource={recentDonations}
              columns={donationColumns}
              rowKey="id"
              pagination={false}
              size="middle"
              scroll={{ x: 650 }}
            />
          </Card>
        </Col>

        <Col xs={24} xl={9}>
          <Card
            title={<span style={{ fontWeight: 600, color: '#1E293B', fontSize: 15 }}>Giving by Mission Pillar</span>}
            bordered={false}
            style={{ borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {programBreakdown.map((item) => (
                <div key={item.program}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text strong style={{ fontSize: 13, color: '#1E293B' }}>{item.program}</Text>
                    <Text style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
                      ${item.amount.toLocaleString()} <Text type="secondary">({item.pct}%)</Text>
                    </Text>
                  </div>
                  <Progress
                    percent={item.pct}
                    showInfo={false}
                    strokeColor={{
                      '0%': '#F97316',
                      '100%': '#EA580C',
                    }}
                    trailColor="#F1F5F9"
                    size={['100%', 8]}
                  />
                </div>
              ))}
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
              title={<span style={{ fontWeight: 600 }}>Next Community Gathering</span>}
              description={
                upcomingEvent
                  ? `${upcomingEvent.title} on ${upcomingEvent.event_date} (${upcomingEvent.rsvps_count}/${upcomingEvent.capacity} RSVPs).`
                  : 'No upcoming events scheduled.'
              }
            />
          </Card>
        </Col>
      </Row>

    </div>
  );
}

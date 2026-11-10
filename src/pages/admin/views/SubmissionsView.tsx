import { Card, Tabs, Table, Tag, Space, Button, Typography } from 'antd';
import { Mic, Award, Mail } from 'lucide-react';
import apiClient from '@/lib/api/client';

const { Title, Text } = Typography;

export interface AuditionItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  talentType: string;
  mediaLink?: string;
  experience?: string;
  status: 'Pending' | 'Shortlisted' | 'Selected' | 'Declined';
  createdAt?: string;
}

export interface SponsorItem {
  id: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  tier: string;
  program?: string;
  notes?: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Declined';
  createdAt?: string;
}

export interface InquiryItem {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  category: string;
  subject?: string;
  message: string;
  status: 'New' | 'In Review' | 'Resolved';
  createdAt?: string;
}

interface SubmissionsViewProps {
  auditions: AuditionItem[];
  sponsors: SponsorItem[];
  inquiries: InquiryItem[];
  isAuthenticated: boolean;
  onRefresh: () => void;
}

export default function SubmissionsView({
  auditions,
  sponsors,
  inquiries,
  isAuthenticated,
  onRefresh,
}: SubmissionsViewProps) {
  const updateStatus = async (endpoint: string, id: string, status: string) => {
    try {
      await apiClient.patch(`/${endpoint}/${id}/status`, { status });
      onRefresh();
    } catch {
      // Errors handled silently or via interceptor
    }
  };

  const auditionColumns = [
    {
      title: 'Performer',
      key: 'name',
      render: (_: unknown, r: AuditionItem) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{r.email} · {r.phone}</div>
        </div>
      ),
    },
    {
      title: 'Talent',
      dataIndex: 'talentType',
      key: 'talentType',
      render: (t: string) => <Tag color="purple">{t}</Tag>,
    },
    {
      title: 'Media / Link',
      dataIndex: 'mediaLink',
      key: 'mediaLink',
      render: (url: string) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#F97316' }}>
            View Reel
          </a>
        ) : (
          <Text type="secondary">None</Text>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'Selected' ? 'green' : s === 'Shortlisted' ? 'blue' : s === 'Declined' ? 'red' : 'orange'}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, r: AuditionItem) => (
        <Space size="small">
          <Button size="small" onClick={() => updateStatus('auditions', r.id, 'Shortlisted')}>
            Shortlist
          </Button>
          <Button size="small" type="primary" onClick={() => updateStatus('auditions', r.id, 'Selected')}>
            Select
          </Button>
        </Space>
      ),
    },
  ];

  const sponsorColumns = [
    {
      title: 'Organization & Contact',
      key: 'org',
      render: (_: unknown, r: SponsorItem) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.organizationName}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{r.contactName} · {r.email}</div>
        </div>
      ),
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
      key: 'tier',
      render: (t: string) => <Tag color="gold">{t.toUpperCase()}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'Confirmed' ? 'green' : s === 'Contacted' ? 'blue' : s === 'Declined' ? 'red' : 'orange'}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, r: SponsorItem) => (
        <Space size="small">
          <Button size="small" onClick={() => updateStatus('sponsors', r.id, 'Contacted')}>
            Contacted
          </Button>
          <Button size="small" type="primary" onClick={() => updateStatus('sponsors', r.id, 'Confirmed')}>
            Confirm
          </Button>
        </Space>
      ),
    },
  ];

  const inquiryColumns = [
    {
      title: 'Sender',
      key: 'sender',
      render: (_: unknown, r: InquiryItem) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.firstName} {r.lastName}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{r.email}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (c: string) => <Tag color="cyan">{c}</Tag>,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'Resolved' ? 'green' : s === 'In Review' ? 'blue' : 'orange'}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, r: InquiryItem) => (
        <Space size="small">
          <Button size="small" onClick={() => updateStatus('inquiries', r.id, 'In Review')}>
            Review
          </Button>
          <Button size="small" type="primary" onClick={() => updateStatus('inquiries', r.id, 'Resolved')}>
            Resolve
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Showdown, Sponsor & Community Inquiries</Title>
          <Text type="secondary">
            {isAuthenticated
              ? 'Synced live with MongoDB backend endpoints (/auditions, /sponsors, /inquiries).'
              : 'Sign in with an Admin account to load and triage live form submissions.'}
          </Text>
        </div>
        {isAuthenticated && (
          <Button onClick={onRefresh}>Refresh Live Data</Button>
        )}
      </div>

      <Card style={{ borderRadius: 16 }}>
        <Tabs
          items={[
            {
              key: 'auditions',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Mic size={14} /> Auditions ({auditions.length})
                </span>
              ),
              children: <Table rowKey="id" dataSource={auditions} columns={auditionColumns} pagination={{ pageSize: 8 }} />,
            },
            {
              key: 'sponsors',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Award size={14} /> Sponsors ({sponsors.length})
                </span>
              ),
              children: <Table rowKey="id" dataSource={sponsors} columns={sponsorColumns} pagination={{ pageSize: 8 }} />,
            },
            {
              key: 'inquiries',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={14} /> Contact & Housing ({inquiries.length})
                </span>
              ),
              children: <Table rowKey="id" dataSource={inquiries} columns={inquiryColumns} pagination={{ pageSize: 8 }} />,
            },
          ]}
        />
      </Card>
    </div>
  );
}


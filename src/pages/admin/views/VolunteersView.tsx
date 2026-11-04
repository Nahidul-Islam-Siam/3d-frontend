import { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Drawer,
  Typography,
  Descriptions,
  Popconfirm,
  message,
  Dropdown,
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  MoreOutlined,
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { VolunteerApplication } from '../mockData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface VolunteersViewProps {
  volunteers: VolunteerApplication[];
  onUpdateStatus: (id: string, status: VolunteerApplication['status']) => void;
}

export default function VolunteersView({
  volunteers,
  onUpdateStatus,
}: VolunteersViewProps) {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Declined'>('All');
  const [searchText, setSearchText] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerApplication | null>(null);

  const pendingCount = volunteers.filter((v) => v.status === 'Pending').length;
  const approvedCount = volunteers.filter((v) => v.status === 'Approved').length;
  const declinedCount = volunteers.filter((v) => v.status === 'Declined').length;

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((v) => {
      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      const matchesSearch =
        v.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
        v.email.toLowerCase().includes(searchText.toLowerCase()) ||
        v.interests.some((i) => i.toLowerCase().includes(searchText.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [volunteers, statusFilter, searchText]);

  const handleApprove = (volunteer: VolunteerApplication) => {
    onUpdateStatus(volunteer.id, 'Approved');
    message.success(`Approved ${volunteer.full_name}. Welcome email dispatched.`);
    if (selectedVolunteer && selectedVolunteer.id === volunteer.id) {
      setSelectedVolunteer({ ...volunteer, status: 'Approved' });
    }
  };

  const handleDecline = (volunteer: VolunteerApplication) => {
    onUpdateStatus(volunteer.id, 'Declined');
    message.info(`Declined application for ${volunteer.full_name}.`);
    if (selectedVolunteer && selectedVolunteer.id === volunteer.id) {
      setSelectedVolunteer({ ...volunteer, status: 'Declined' });
    }
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 130,
      render: (_: unknown, __: VolunteerApplication, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        const codeNum = (3200 + index * 115).toString();
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13.5, letterSpacing: '-0.2px' }}>
              #{shortNum}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
              VOL-2026-{codeNum}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Volunteer',
      dataIndex: 'full_name',
      key: 'full_name',
      width: 220,
      sorter: (a: VolunteerApplication, b: VolunteerApplication) => a.full_name.localeCompare(b.full_name),
      render: (name: string, record: VolunteerApplication) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>
            {name}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11.5, marginTop: 2 }}>
            {record.email}
          </div>
        </div>
      ),
    },
    {
      title: 'Service Interests',
      dataIndex: 'interests',
      key: 'interests',
      width: 220,
      render: (interests: string[]) => {
        const primary = interests[0] || 'Community Service';
        return (
          <div>
            <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>
              {primary}
            </div>
            <div style={{ marginTop: 4 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 500,
                  backgroundColor: '#FFF7ED',
                  color: '#EA580C',
                  border: '1px solid #FFEDD5',
                }}
              >
                <span>🤝</span>
                <span>{interests.length > 1 ? `+${interests.length - 1} more fields` : 'Primary Track'}</span>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Contact & Region',
      key: 'contact_region',
      width: 170,
      render: (_: unknown, record: VolunteerApplication) => (
        <div>
          <div style={{ fontWeight: 500, color: '#334155', fontSize: 13 }}>
            {record.phone}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
            Tampa Bay, FL
          </div>
        </div>
      ),
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      width: 170,
      render: (avail: string) => (
        <div>
          <div style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>
            {avail}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
            Immediate Start
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: VolunteerApplication['status']) => {
        if (status === 'Approved') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 14px',
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
                justifyContent: 'center',
                padding: '4px 14px',
                borderRadius: 9999,
                fontSize: 12,
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
              justifyContent: 'center',
              padding: '4px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: '#FFF1F2',
              color: '#E11D48',
              border: '1px solid #FECDD3',
            }}
          >
            Declined
          </span>
        );
      },
    },
    {
      title: 'Screening',
      dataIndex: 'status',
      key: 'screening',
      width: 140,
      render: (status: VolunteerApplication['status']) => {
        if (status === 'Approved') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 10px',
                borderRadius: 9999,
                fontSize: 11.5,
                fontWeight: 500,
                backgroundColor: '#F0FDF4',
                color: '#16A34A',
                border: '1px solid #BBF7D0',
              }}
            >
              Cleared
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
                fontWeight: 500,
                backgroundColor: '#FFFBEB',
                color: '#D97706',
                border: '1px solid #FDE68A',
              }}
            >
              In Review
            </span>
          );
        }
        return (
          <span style={{ fontSize: 12, color: '#94A3B8' }}>
            Not applicable
          </span>
        );
      },
    },
    {
      title: 'Applied Date',
      dataIndex: 'applied_date',
      key: 'applied_date',
      width: 130,
      render: (date: string) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13 }}>
            {date}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 1 }}>
            09:30 AM
          </div>
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 90,
      fixed: 'right' as const,
      render: (_: unknown, record: VolunteerApplication) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {/* Circular Bio / View Button */}
          <button
            type="button"
            onClick={() => setSelectedVolunteer(record)}
            title="View Bio Profile"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#94A3B8',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F97316';
              e.currentTarget.style.borderColor = '#FED7AA';
              e.currentTarget.style.backgroundColor = '#FFF7ED';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <EyeOutlined style={{ fontSize: 14 }} />
          </button>

          {/* Circular More Menu */}
          <Dropdown
            menu={{
              items: [
                {
                  key: 'bio',
                  icon: <UserOutlined />,
                  label: 'View Full Bio & Form',
                  onClick: () => setSelectedVolunteer(record),
                },
                {
                  key: 'email',
                  icon: <MailOutlined />,
                  label: 'Email Applicant',
                  onClick: () => {
                    navigator.clipboard.writeText(record.email);
                    message.success(`Copied email for ${record.full_name}`);
                  },
                },
                ...(record.status === 'Pending'
                  ? [
                      {
                        type: 'divider' as const,
                      },
                      {
                        key: 'approve',
                        icon: <CheckOutlined />,
                        label: 'Approve Application',
                        onClick: () => handleApprove(record),
                      },
                      {
                        key: 'decline',
                        danger: true,
                        icon: <CloseOutlined />,
                        label: 'Decline Application',
                        onClick: () => handleDecline(record),
                      },
                    ]
                  : []),
              ],
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <button
              type="button"
              title="More Actions"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0F172A';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.backgroundColor = '#F8FAFC';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <MoreOutlined style={{ fontSize: 15 }} />
            </button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ─── Unified SaaS Table Card ─── */}
      <div className="admin-saas-card">
        {/* Top Header Row of Card */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          {/* Left: Icon & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: '#FFF7ED',
                border: '1px solid #FED7AA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EA580C',
                fontSize: 20,
              }}
            >
              <TeamOutlined />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
                Volunteer Family Registry
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                Community servant applicants, vetting checks, and placement coordination
              </div>
            </div>
          </div>

          {/* Right Status Summary Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
              }}
            >
              {pendingCount} Pending Review
            </span>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
              }}
            >
              {approvedCount} Active Servants
            </span>
          </div>
        </div>

        {/* Toolbar & Filters Row */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#FAFAFA',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <Input
            placeholder="Search volunteer, email, interest..."
            prefix={<SearchOutlined style={{ color: '#94A3B8' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 280, borderRadius: 8, borderColor: '#E2E8F0', height: 36 }}
            allowClear
          />

          <Select
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as 'All' | 'Pending' | 'Approved' | 'Declined')}
            style={{ width: 170, height: 36 }}
          >
            <Option value="All">All Applicants ({volunteers.length})</Option>
            <Option value="Pending">Scheduled ({pendingCount})</Option>
            <Option value="Approved">Approved ({approvedCount})</Option>
            <Option value="Declined">Declined ({declinedCount})</Option>
          </Select>

          {(searchText || statusFilter !== 'All') && (
            <Button
              type="link"
              onClick={() => {
                setSearchText('');
                setStatusFilter('All');
              }}
              style={{ color: '#F97316', fontWeight: 500, padding: 0 }}
            >
              Clear filters
            </Button>
          )}

          <div style={{ marginLeft: 'auto', color: '#64748B', fontSize: 13, fontWeight: 500 }}>
            Filtered: <strong style={{ color: '#0F172A' }}>{filteredVolunteers.length}</strong> of {volunteers.length}
          </div>
        </div>

        {/* ─── Modern SaaS Table ─── */}
        <Table
          className="admin-saas-table"
          dataSource={filteredVolunteers}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total, range) => (
              <span style={{ color: '#64748B', fontSize: 13 }}>
                Showing <strong style={{ color: '#0F172A' }}>{range[0]} to {range[1]}</strong> of{' '}
                <strong style={{ color: '#0F172A' }}>{total}</strong> entries
              </span>
            ),
          }}
          scroll={{ x: 1220 }}
        />
      </div>

      {/* ─── Drawer: Volunteer Details ─── */}
      <Drawer
        title="Volunteer Application Profile"
        placement="right"
        size="large"
        open={!!selectedVolunteer}
        onClose={() => setSelectedVolunteer(null)}
      >
        {selectedVolunteer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 14,
                  backgroundColor: '#FFF7ED',
                  color: '#EA580C',
                  border: '1px solid #FED7AA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                <UserOutlined />
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{selectedVolunteer.full_name}</Title>
                <Text type="secondary">{selectedVolunteer.email} · {selectedVolunteer.phone}</Text>
              </div>
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Application Status">
                <span
                  style={{
                    padding: '3px 12px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: selectedVolunteer.status === 'Approved' ? '#ECFDF5' : '#EFF6FF',
                    color: selectedVolunteer.status === 'Approved' ? '#059669' : '#2563EB',
                    border: `1px solid ${selectedVolunteer.status === 'Approved' ? '#A7F3D0' : '#BFDBFE'}`,
                  }}
                >
                  {selectedVolunteer.status}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Date Submitted">{selectedVolunteer.applied_date}</Descriptions.Item>
              <Descriptions.Item label="Preferred Availability">{selectedVolunteer.availability}</Descriptions.Item>
              <Descriptions.Item label="Service Interests">
                <Space wrap>
                  {selectedVolunteer.interests.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '2px 10px',
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 600,
                        backgroundColor: '#FFF7ED',
                        color: '#C2410C',
                        border: '1px solid #FED7AA',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Personal Statement / Background">
                <Paragraph style={{ margin: 0, lineHeight: 1.6 }}>{selectedVolunteer.bio}</Paragraph>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
              {selectedVolunteer.status === 'Pending' && (
                <>
                  <Popconfirm
                    title="Decline application?"
                    onConfirm={() => handleDecline(selectedVolunteer)}
                    okText="Yes, decline"
                    cancelText="Cancel"
                  >
                    <Button danger>Decline</Button>
                  </Popconfirm>
                  <Button
                    type="primary"
                    style={{ backgroundColor: '#F97316' }}
                    onClick={() => handleApprove(selectedVolunteer)}
                  >
                    Approve Volunteer
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

import { useState, useMemo, type CSSProperties } from 'react';
import {
  Alert,
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
  Empty,
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  ReloadOutlined,
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { VolunteerApplication } from '../types';
import { confirmDelete } from '@/utils/confirmDelete';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface VolunteersViewProps {
  volunteers: VolunteerApplication[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onUpdateStatus: (id: string, status: VolunteerApplication['status']) => Promise<boolean> | boolean;
  onDelete?: (id: string) => Promise<boolean> | boolean;
}

const STATUS_BADGE_MAP: Record<VolunteerApplication['status'], { bg: string; color: string; border: string; label: string }> = {
  Approved: {
    bg: '#ECFDF5',
    color: '#059669',
    border: '#A7F3D0',
    label: 'Approved',
  },
  Pending: {
    bg: '#FFFBEB',
    color: '#D97706',
    border: '#FDE68A',
    label: 'Pending',
  },
  Declined: {
    bg: '#FFF1F2',
    color: '#E11D48',
    border: '#FECDD3',
    label: 'Declined',
  },
};

function renderStatusBadge(status: VolunteerApplication['status']) {
  const token = STATUS_BADGE_MAP[status] || STATUS_BADGE_MAP.Pending;
  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 14px',
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: token.bg,
    color: token.color,
    border: `1px solid ${token.border}`,
  };
  return <span style={style}>{token.label}</span>;
}

function formatAppliedDate(raw: string): { dateLabel: string; timeLabel: string | null } {
  if (!raw) return { dateLabel: '—', timeLabel: null };
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return { dateLabel: raw, timeLabel: null };
  }
  const hasClock = raw.includes('T') || raw.includes(':');
  return {
    dateLabel: parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    timeLabel: hasClock
      ? parsed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      : null,
  };
}

export default function VolunteersView({
  volunteers,
  loading = false,
  error = null,
  onRefresh,
  onUpdateStatus,
  onDelete,
}: VolunteersViewProps) {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Declined'>('All');
  const [searchText, setSearchText] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerApplication | null>(null);

  const pendingCount = volunteers.filter((v) => v.status === 'Pending').length;
  const approvedCount = volunteers.filter((v) => v.status === 'Approved').length;
  const declinedCount = volunteers.filter((v) => v.status === 'Declined').length;

  const filteredVolunteers = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return volunteers.filter((v) => {
      const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
      const matchesSearch =
        !query ||
        v.full_name.toLowerCase().includes(query) ||
        v.email.toLowerCase().includes(query) ||
        v.interests.some((i) => i.toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [volunteers, statusFilter, searchText]);

  const handleStatusChange = async (
    volunteer: VolunteerApplication,
    nextStatus: VolunteerApplication['status'],
    successMsg: string
  ) => {
    const ok = await onUpdateStatus(volunteer.id, nextStatus);
    if (!ok) {
      message.error(`Could not update status for ${volunteer.full_name}.`);
      return;
    }
    message.success(successMsg);
    if (selectedVolunteer && selectedVolunteer.id === volunteer.id) {
      setSelectedVolunteer({ ...volunteer, status: nextStatus });
    }
  };

  const handleDelete = async (volunteer: VolunteerApplication) => {
    if (!onDelete) return;
    const confirmed = await confirmDelete({
      title: 'Delete volunteer application?',
      itemName: volunteer.full_name,
      text: 'This permanently removes the volunteer application record.',
    });
    if (!confirmed) return;

    const ok = await onDelete(volunteer.id);
    if (!ok) {
      message.error(`Could not delete ${volunteer.full_name}.`);
      return;
    }
    message.success(`Removed application for ${volunteer.full_name}.`);
    if (selectedVolunteer && selectedVolunteer.id === volunteer.id) {
      setSelectedVolunteer(null);
    }
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 130,
      render: (_: unknown, record: VolunteerApplication, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        const shortRef = record.id ? record.id.slice(-6).toUpperCase() : shortNum;
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13.5, letterSpacing: '-0.2px' }}>
              #{shortNum}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
              REF-{shortRef}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Volunteer',
      dataIndex: 'full_name',
      key: 'full_name',
      width: 230,
      sorter: (a: VolunteerApplication, b: VolunteerApplication) => a.full_name.localeCompare(b.full_name),
      render: (name: string, record: VolunteerApplication) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>
            {name}
          </div>
          <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>
            {record.email}
          </div>
        </div>
      ),
    },
    {
      title: 'Service Interests',
      dataIndex: 'interests',
      key: 'interests',
      width: 230,
      render: (interests: string[]) => {
        const primary = interests[0] || 'General Volunteer';
        return (
          <div>
            <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>
              {primary}
            </div>
            {interests.length > 1 && (
              <div style={{ marginTop: 4 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    fontSize: 11,
                    fontWeight: 500,
                    backgroundColor: '#FFF7ED',
                    color: '#EA580C',
                    border: '1px solid #FFEDD5',
                  }}
                >
                  +{interests.length - 1} more
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: 'Phone',
      key: 'phone',
      width: 165,
      render: (_: unknown, record: VolunteerApplication) => (
        <div style={{ fontWeight: 500, color: '#334155', fontSize: 13 }}>
          {record.phone || '—'}
        </div>
      ),
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      width: 190,
      render: (avail: string) => (
        <div style={{ fontWeight: 500, color: '#334155', fontSize: 13 }}>
          {avail || 'Not specified'}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: VolunteerApplication['status']) => renderStatusBadge(status),
    },
    {
      title: 'Applied Date',
      dataIndex: 'applied_date',
      key: 'applied_date',
      width: 145,
      render: (date: string) => {
        const { dateLabel, timeLabel } = formatAppliedDate(date);
        return (
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13 }}>
              {dateLabel}
            </div>
            {timeLabel && (
              <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 1 }}>
                {timeLabel}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: '',
      key: 'actions',
      width: 90,
      fixed: 'right' as const,
      render: (_: unknown, record: VolunteerApplication) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <button
            type="button"
            onClick={() => setSelectedVolunteer(record)}
            title="View Profile"
            aria-label={`View profile for ${record.full_name}`}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#C2410C';
              e.currentTarget.style.borderColor = '#FED7AA';
              e.currentTarget.style.backgroundColor = '#FFF7ED';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#475569';
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <EyeOutlined style={{ fontSize: 14 }} />
          </button>

          <Dropdown
            menu={{
              items: [
                {
                  key: 'bio',
                  icon: <UserOutlined />,
                  label: 'View Full Profile',
                  onClick: () => setSelectedVolunteer(record),
                },
                {
                  key: 'email',
                  icon: <MailOutlined />,
                  label: 'Copy Email',
                  onClick: () => {
                    navigator.clipboard.writeText(record.email);
                    message.success(`Copied ${record.email}`);
                  },
                },
                ...(record.status !== 'Approved'
                  ? [
                      {
                        key: 'approve',
                        icon: <CheckOutlined />,
                        label: 'Approve Application',
                        onClick: () => void handleStatusChange(record, 'Approved', `Approved ${volunteerLabel(record)}.`),
                      },
                    ]
                  : []),
                ...(record.status !== 'Declined'
                  ? [
                      {
                        key: 'decline',
                        danger: true,
                        icon: <CloseOutlined />,
                        label: 'Decline Application',
                        onClick: () => void handleStatusChange(record, 'Declined', `Declined application for ${volunteerLabel(record)}.`),
                      },
                    ]
                  : []),
                ...(onDelete
                  ? [
                      { type: 'divider' as const },
                      {
                        key: 'delete',
                        danger: true,
                        icon: <DeleteOutlined />,
                        label: 'Delete Application',
                        onClick: () => void handleDelete(record),
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

  const selectedDate = selectedVolunteer ? formatAppliedDate(selectedVolunteer.applied_date) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {error && (
        <Alert
          type="error"
          showIcon
          message={error}
          action={
            onRefresh && (
              <Button size="small" onClick={onRefresh}>
                Retry
              </Button>
            )
          }
        />
      )}

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
                Live volunteer applications submitted through the LAB website
              </div>
            </div>
          </div>

          {/* Right Status Summary Pills & Refresh */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                padding: '4px 12px',
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                backgroundColor: '#FFFBEB',
                color: '#D97706',
                border: '1px solid #FDE68A',
              }}
            >
              {pendingCount} Pending
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
              {approvedCount} Approved
            </span>
            {onRefresh && (
              <Button
                icon={<ReloadOutlined />}
                onClick={onRefresh}
                loading={loading}
                style={{ borderRadius: 8 }}
              >
                Refresh
              </Button>
            )}
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
            <Option value="Pending">Pending ({pendingCount})</Option>
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
            Showing: <strong style={{ color: '#0F172A' }}>{filteredVolunteers.length}</strong> of {volunteers.length}
          </div>
        </div>

        {/* ─── Modern SaaS Table ─── */}
        <Table
          className="admin-saas-table"
          dataSource={filteredVolunteers}
          columns={columns}
          loading={loading}
          rowKey="id"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No volunteer applications submitted yet"
              />
            ),
          }}
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
          scroll={{ x: 1120 }}
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
                {renderStatusBadge(selectedVolunteer.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Date Submitted">
                {selectedDate
                  ? `${selectedDate.dateLabel}${selectedDate.timeLabel ? ` at ${selectedDate.timeLabel}` : ''}`
                  : '—'}
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Availability">
                {selectedVolunteer.availability || 'Not specified'}
              </Descriptions.Item>
              <Descriptions.Item label="Service Interests">
                {selectedVolunteer.interests.length > 0 ? (
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
                ) : (
                  <Text type="secondary">None specified</Text>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Personal Statement / Background">
                <Paragraph style={{ margin: 0, lineHeight: 1.6 }}>
                  {selectedVolunteer.bio || 'No personal bio provided.'}
                </Paragraph>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
              {onDelete && (
                <Button danger icon={<DeleteOutlined />} onClick={() => void handleDelete(selectedVolunteer)}>
                  Delete
                </Button>
              )}
              {selectedVolunteer.status !== 'Declined' && (
                <Popconfirm
                  title="Decline application?"
                  onConfirm={() =>
                    void handleStatusChange(
                      selectedVolunteer,
                      'Declined',
                      `Declined application for ${selectedVolunteer.full_name}.`
                    )
                  }
                  okText="Yes, decline"
                  cancelText="Cancel"
                >
                  <Button danger>Decline</Button>
                </Popconfirm>
              )}
              {selectedVolunteer.status !== 'Approved' && (
                <Button
                  type="primary"
                  style={{ backgroundColor: '#F97316' }}
                  onClick={() =>
                    void handleStatusChange(
                      selectedVolunteer,
                      'Approved',
                      `Approved ${selectedVolunteer.full_name}.`
                    )
                  }
                >
                  Approve Volunteer
                </Button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function volunteerLabel(volunteer: VolunteerApplication) {
  return volunteer.full_name || 'applicant';
}

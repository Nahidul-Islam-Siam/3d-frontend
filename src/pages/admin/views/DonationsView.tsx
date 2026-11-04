import { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Drawer,
  Form,
  InputNumber,
  Descriptions,
  Popconfirm,
  message,
  Typography,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
  EyeOutlined,
  MoreOutlined,
  DollarOutlined,
  RollbackOutlined,
  CopyOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { Donation } from '../mockData';
import { INITIAL_PROGRAMS } from '../mockData';

const { Title, Text } = Typography;
const { Option } = Select;

interface DonationsViewProps {
  donations: Donation[];
  onAddDonation: (newDonation: Donation) => void;
  onUpdateStatus: (id: string, status: Donation['status']) => void;
}

export default function DonationsView({
  donations,
  onAddDonation,
  onUpdateStatus,
}: DonationsViewProps) {
  const [searchText, setSearchText] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [frequencyFilter, setFrequencyFilter] = useState('All');

  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Filtered donations
  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const matchesSearch =
        d.donor_name.toLowerCase().includes(searchText.toLowerCase()) ||
        d.donor_email.toLowerCase().includes(searchText.toLowerCase()) ||
        (d.notes && d.notes.toLowerCase().includes(searchText.toLowerCase()));

      const matchesProgram = programFilter === 'All' || d.program === programFilter;
      const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
      const matchesFrequency = frequencyFilter === 'All' || d.frequency === frequencyFilter;

      return matchesSearch && matchesProgram && matchesStatus && matchesFrequency;
    });
  }, [donations, searchText, programFilter, statusFilter, frequencyFilter]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Donor Name', 'Email', 'Program', 'Frequency', 'Method', 'Date', 'Status', 'Amount ($)', 'Notes'];
    const rows = filteredDonations.map((d) => [
      d.id,
      `"${d.donor_name.replace(/"/g, '""')}"`,
      d.donor_email,
      `"${d.program.replace(/"/g, '""')}"`,
      d.frequency,
      d.method,
      d.donation_date,
      d.status,
      d.amount,
      `"${(d.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `live_achieve_believe_donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success(`Exported ${filteredDonations.length} donation records to CSV`);
  };

  // Submit new donation form
  const handleAddSubmit = (values: {
    donor_name: string;
    donor_email: string;
    program: string;
    frequency: 'One-time' | 'Monthly recurring';
    method: 'Card (Stripe)' | 'Bank transfer (ACH)' | 'Check' | 'Cash';
    amount: number;
    notes?: string;
  }) => {
    const newRecord: Donation = {
      id: `don-${Date.now().toString().slice(-4)}`,
      donor_name: values.donor_name,
      donor_email: values.donor_email,
      program: values.program,
      frequency: values.frequency,
      method: values.method,
      donation_date: new Date().toISOString().slice(0, 10),
      status: 'Paid',
      amount: values.amount,
      notes: values.notes || 'Recorded via Admin Dashboard',
    };

    onAddDonation(newRecord);
    message.success(`Recorded $${values.amount} gift from ${values.donor_name}`);
    setIsAddModalOpen(false);
    form.resetFields();
  };

  const handleRefund = (donation: Donation) => {
    onUpdateStatus(donation.id, 'Refunded');
    message.warning(`Issued refund for donation ${donation.id}`);
    if (selectedDonation && selectedDonation.id === donation.id) {
      setSelectedDonation({ ...donation, status: 'Refunded' });
    }
  };

  // Program Pill Config
  const programPillConfig: Record<string, { label: string; icon: string; bg: string; text: string; border: string }> = {
    'Community Meals': { label: 'Hunger Relief', icon: '🍲', bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
    'LEADS Youth Development': { label: 'Youth Mentorship', icon: '🎓', bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
    'Suicide Awareness Showdown': { label: 'Mental Health', icon: '💙', bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' },
    'Veterans Support': { label: 'Veterans First', icon: '🎖️', bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
    'General Fund': { label: 'Greatest Need', icon: '✨', bg: '#FAF5FF', text: '#7E22CE', border: '#E9D5FF' },
  };

  // Table Columns Matching Reference Image
  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 140,
      render: (_: unknown, __: Donation, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        const codeNum = (6800 + index * 142).toString();
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13.5, letterSpacing: '-0.2px' }}>
              #{shortNum}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
              LAB-2026-{codeNum}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Donor',
      dataIndex: 'donor_name',
      key: 'donor_name',
      width: 210,
      sorter: (a: Donation, b: Donation) => a.donor_name.localeCompare(b.donor_name),
      render: (name: string, record: Donation) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>
            {name}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11.5, marginTop: 2 }}>
            {record.donor_email}
          </div>
        </div>
      ),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
      width: 200,
      render: (prog: string) => {
        const pill = programPillConfig[prog] || {
          label: prog,
          icon: '🏷️',
          bg: '#F8FAFC',
          text: '#475569',
          border: '#E2E8F0',
        };
        return (
          <div>
            <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>
              {prog}
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
                  backgroundColor: pill.bg,
                  color: pill.text,
                  border: `1px solid ${pill.border}`,
                }}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Giving & Method',
      key: 'frequency_method',
      width: 190,
      render: (_: unknown, record: Donation) => (
        <div>
          <div style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>
            {record.frequency === 'Monthly recurring' ? 'Monthly Partner' : 'One-Time Gift'}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11.5, marginTop: 2 }}>
            {record.method}
          </div>
        </div>
      ),
    },
    {
      title: 'Channel',
      key: 'channel',
      width: 170,
      render: (_: unknown, record: Donation) => (
        <div>
          <div style={{ fontWeight: 500, color: '#334155', fontSize: 13 }}>
            {record.amount >= 1000 ? 'Major Gifts Team' : 'Online Portal'}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
            {record.amount >= 1000 ? 'Sarah Mitchell' : 'Automated Gate'}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: Donation['status']) => {
        if (status === 'Paid') {
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
        if (status === 'Failed') {
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
              Cancelled
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
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              border: '1px solid #CBD5E1',
            }}
          >
            Refunded
          </span>
        );
      },
    },
    {
      title: 'Receipt Sync',
      dataIndex: 'status',
      key: 'receipt_sync',
      width: 140,
      render: (status: Donation['status']) => {
        if (status === 'Paid') {
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
              Synced
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
              Sync Pending
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 130,
      sorter: (a: Donation, b: Donation) => a.amount - b.amount,
      render: (amt: number) => (
        <div>
          <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14.5 }}>
            ${amt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', marginTop: 1 }}>
            USD
          </div>
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 90,
      fixed: 'right' as const,
      render: (_: unknown, record: Donation) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {/* Circular View Button */}
          <button
            type="button"
            onClick={() => setSelectedDonation(record)}
            title="View Details"
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

          {/* Circular More Menu Button */}
          <Dropdown
            menu={{
              items: [
                {
                  key: 'details',
                  icon: <EyeOutlined />,
                  label: 'View Donation Details',
                  onClick: () => setSelectedDonation(record),
                },
                {
                  key: 'receipt',
                  icon: <FileTextOutlined />,
                  label: 'Generate 501(c)(3) Receipt',
                  onClick: () => message.success(`Tax receipt ready for ${record.donor_name}`),
                },
                {
                  key: 'copy',
                  icon: <CopyOutlined />,
                  label: 'Copy Donor Email',
                  onClick: () => {
                    navigator.clipboard.writeText(record.donor_email);
                    message.success('Copied donor email');
                  },
                },
                ...(record.status === 'Paid'
                  ? [
                      {
                        type: 'divider' as const,
                      },
                      {
                        key: 'refund',
                        danger: true,
                        icon: <RollbackOutlined />,
                        label: 'Issue Refund',
                        onClick: () => handleRefund(record),
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
      {/* ─── Unified SaaS Table Card (1:1 Reference Layout) ─── */}
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
              <DollarOutlined />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
                Donations & Giving
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                Live Achieve Believe Donor Registry · 501(c)(3) Compliant
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <Space wrap size="middle">
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExportCSV}
              style={{
                borderRadius: 8,
                borderColor: '#E2E8F0',
                color: '#334155',
                fontWeight: 500,
                height: 38,
              }}
            >
              Export CSV
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
              style={{
                borderRadius: 8,
                backgroundColor: '#F97316',
                fontWeight: 600,
                height: 38,
                boxShadow: '0 2px 8px rgba(249,115,22,0.3)',
              }}
            >
              Record Donation
            </Button>
          </Space>
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
            placeholder="Search donor name, email..."
            prefix={<SearchOutlined style={{ color: '#94A3B8' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 260, borderRadius: 8, borderColor: '#E2E8F0', height: 36 }}
            allowClear
          />

          <Select
            value={programFilter}
            onChange={setProgramFilter}
            style={{ width: 200, height: 36 }}
          >
            <Option value="All">All Programs</Option>
            {INITIAL_PROGRAMS.map((p) => (
              <Option key={p} value={p}>
                {p}
              </Option>
            ))}
          </Select>

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 140, height: 36 }}
          >
            <Option value="All">All Statuses</Option>
            <Option value="Paid">Paid</Option>
            <Option value="Pending">Scheduled</Option>
            <Option value="Failed">Cancelled</Option>
            <Option value="Refunded">Refunded</Option>
          </Select>

          <Select
            value={frequencyFilter}
            onChange={setFrequencyFilter}
            style={{ width: 160, height: 36 }}
          >
            <Option value="All">All Frequencies</Option>
            <Option value="One-time">One-time</Option>
            <Option value="Monthly recurring">Monthly recurring</Option>
          </Select>

          {(searchText || programFilter !== 'All' || statusFilter !== 'All' || frequencyFilter !== 'All') && (
            <Button
              type="link"
              onClick={() => {
                setSearchText('');
                setProgramFilter('All');
                setStatusFilter('All');
                setFrequencyFilter('All');
              }}
              style={{ color: '#F97316', fontWeight: 500, padding: 0 }}
            >
              Clear filters
            </Button>
          )}

          <div style={{ marginLeft: 'auto', color: '#64748B', fontSize: 13, fontWeight: 500 }}>
            Filtered: <strong style={{ color: '#0F172A' }}>{filteredDonations.length}</strong> of {donations.length}
          </div>
        </div>

        {/* ─── Modern SaaS Table ─── */}
        <Table
          className="admin-saas-table"
          dataSource={filteredDonations}
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
          scroll={{ x: 1280 }}
        />
      </div>

      {/* ─── Drawer: View Donation Detail ─── */}
      <Drawer
        title="Donation Record Details"
        placement="right"
        size="large"
        onClose={() => setSelectedDonation(null)}
        open={!!selectedDonation}
      >
        {selectedDonation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>TRANSACTION ID</Text>
                <Title level={4} style={{ margin: '2px 0 0 0' }}>{selectedDonation.id}</Title>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>GIFT AMOUNT</Text>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#F97316' }}>
                  ${selectedDonation.amount.toLocaleString()}
                </div>
              </div>
            </div>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Donor Name">{selectedDonation.donor_name}</Descriptions.Item>
              <Descriptions.Item label="Donor Email">{selectedDonation.donor_email}</Descriptions.Item>
              <Descriptions.Item label="Allocated Program">
                <span
                  style={{
                    backgroundColor: '#FFF7ED',
                    color: '#C2410C',
                    padding: '2px 10px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    border: '1px solid #FED7AA',
                  }}
                >
                  {selectedDonation.program}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Giving Frequency">{selectedDonation.frequency}</Descriptions.Item>
              <Descriptions.Item label="Payment Method">{selectedDonation.method}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <span
                  style={{
                    padding: '3px 12px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: selectedDonation.status === 'Paid' ? '#ECFDF5' : '#EFF6FF',
                    color: selectedDonation.status === 'Paid' ? '#059669' : '#2563EB',
                    border: `1px solid ${selectedDonation.status === 'Paid' ? '#A7F3D0' : '#BFDBFE'}`,
                  }}
                >
                  {selectedDonation.status}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Donation Date">{selectedDonation.donation_date}</Descriptions.Item>
              <Descriptions.Item label="Notes / Dedication">{selectedDonation.notes || 'None provided'}</Descriptions.Item>
              <Descriptions.Item label="Tax Receipt Status">
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: 9999,
                    fontSize: 11.5,
                    fontWeight: 500,
                    backgroundColor: '#F0FDF4',
                    color: '#16A34A',
                    border: '1px solid #BBF7D0',
                  }}
                >
                  Issued · 501(c)(3) Eligible
                </span>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
              {selectedDonation.status === 'Paid' && (
                <Popconfirm
                  title="Issue full refund?"
                  description="This will mark the gift as refunded in the records."
                  onConfirm={() => handleRefund(selectedDonation)}
                  okText="Yes, refund"
                  cancelText="Cancel"
                >
                  <Button danger icon={<RollbackOutlined />}>
                    Issue Refund
                  </Button>
                </Popconfirm>
              )}
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                style={{ backgroundColor: '#F97316' }}
                onClick={() => message.success(`Receipt downloaded for ${selectedDonation.id}`)}
              >
                Download Receipt PDF
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* ─── Modal: Record Offline / Direct Donation ─── */}
      <Modal
        title="Record New Donation"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubmit} style={{ marginTop: 16 }}>
          <Form.Item
            name="donor_name"
            label="Donor Full Name"
            rules={[{ required: true, message: 'Please enter donor name' }]}
          >
            <Input placeholder="e.g. John Doe" />
          </Form.Item>

          <Form.Item
            name="donor_email"
            label="Donor Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="e.g. donor@example.com" />
          </Form.Item>

          <Form.Item
            name="program"
            label="Designated Program"
            rules={[{ required: true, message: 'Select a program' }]}
          >
            <Select placeholder="Select program">
              {INITIAL_PROGRAMS.map((p) => (
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            label="Gift Amount ($ USD)"
            rules={[{ required: true, message: 'Enter gift amount' }]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              prefix="$"
              placeholder="100.00"
            />
          </Form.Item>

          <Form.Item
            name="frequency"
            label="Giving Frequency"
            initialValue="One-time"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="One-time">One-time Gift</Option>
              <Option value="Monthly recurring">Monthly recurring</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="method"
            label="Payment Channel / Method"
            initialValue="Check"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Check">Physical Check</Option>
              <Option value="Cash">Cash at event</Option>
              <Option value="Bank transfer (ACH)">Bank transfer (ACH)</Option>
              <Option value="Card (Stripe)">Card (Stripe offline entry)</Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Notes / Dedication (Optional)">
            <Input.TextArea rows={3} placeholder="e.g. Handed at community dinner..." />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#F97316' }}>
              Save Record
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Switch,
  Select,
  Modal,
  Form,
  Input,
  InputNumber,
  Typography,
  Divider,
  Space,
  message,
  Popconfirm,
} from 'antd';
import {
  UserAddOutlined,
  CreditCardOutlined,
  BellOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { AdminMember, SystemSettings } from '../mockData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface SettingsViewProps {
  members: AdminMember[];
  settings: SystemSettings;
  onUpdateMemberRole: (id: string, role: AdminMember['role']) => void;
  onRemoveMember: (id: string) => void;
  onAddMember: (member: AdminMember) => void;
  onUpdateSettings: (settings: SystemSettings) => void;
}

export default function SettingsView({
  members,
  settings,
  onUpdateMemberRole,
  onRemoveMember,
  onAddMember,
  onUpdateSettings,
}: SettingsViewProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleInviteSubmit = (values: { name: string; email: string; role: AdminMember['role'] }) => {
    const newMember: AdminMember = {
      id: `adm-${Date.now().toString().slice(-4)}`,
      name: values.name,
      email: values.email,
      role: values.role,
      status: 'Invited',
      last_active: 'Invited just now',
    };
    onAddMember(newMember);
    message.success(`Invitation email sent to ${values.email}`);
    setIsInviteModalOpen(false);
    form.resetFields();
  };

  const handleToggleSetting = (key: keyof SystemSettings, value: boolean | number) => {
    const updated = { ...settings, [key]: value };
    onUpdateSettings(updated);
    message.success('Setting updated');
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 120,
      render: (_: unknown, __: AdminMember, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13 }}>
              #{shortNum}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 10.5, marginTop: 1 }}>
              ADM-2026
            </div>
          </div>
        );
      },
    },
    {
      title: 'Admin Member',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      render: (name: string, record: AdminMember) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>{name}</div>
          <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 1 }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Assigned Role',
      dataIndex: 'role',
      key: 'role',
      width: 240,
      render: (role: AdminMember['role'], record: AdminMember) => (
        <Select
          value={role}
          onChange={(newRole) => {
            onUpdateMemberRole(record.id, newRole);
            message.success(`Updated role for ${record.name} to ${newRole}`);
          }}
          style={{ width: '100%', borderRadius: 8 }}
        >
          <Option value="Super admin">Super admin</Option>
          <Option value="Finance — donations only">Finance — donations only</Option>
          <Option value="Editor — videos and events">Editor — videos and events</Option>
          <Option value="Moderator — volunteers">Moderator — volunteers</Option>
        </Select>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        if (status === 'Active') {
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
              Active
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
              backgroundColor: '#FFFBEB',
              color: '#D97706',
              border: '1px solid #FDE68A',
            }}
          >
            Invited
          </span>
        );
      },
    },
    {
      title: 'Last Active',
      dataIndex: 'last_active',
      key: 'last_active',
      width: 150,
      render: (text: string) => (
        <div>
          <div style={{ fontWeight: 500, color: '#334155', fontSize: 13 }}>{text}</div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 1 }}>Authenticated</div>
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 80,
      fixed: 'right' as const,
      render: (_: unknown, record: AdminMember) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Popconfirm
            title="Revoke access?"
            description={`Remove admin rights for ${record.name}?`}
            onConfirm={() => {
              onRemoveMember(record.id);
              message.info(`Removed access for ${record.name}`);
            }}
            okText="Yes, revoke"
            cancelText="No"
          >
            <button
              type="button"
              title="Revoke Access"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                border: '1px solid #FECDD3',
                color: '#E11D48',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFF1F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <DeleteOutlined style={{ fontSize: 14 }} />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ─── Header ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
            Admin settings
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            Who can get in, how donations arrive, and which emails go out.
          </Paragraph>
        </div>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsInviteModalOpen(true)}>
          Invite Admin
        </Button>
      </div>

      {/* ─── Card 1: Admin Team ─── */}
      <Card
        title={
          <div>
            <span style={{ fontWeight: 600 }}>Admin Team</span>
            <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>
              Roles keep finance in the numbers and editors in the media.
            </div>
          </div>
        }
        bordered={false}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderRadius: 12 }}
      >
        <Table
          className="admin-saas-table"
          dataSource={members}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: 750 }}
          size="middle"
        />
      </Card>

      {/* ─── Card 2: Payments Configuration ─── */}
      <Card
        title={
          <Space>
            <CreditCardOutlined style={{ color: '#1677ff' }} />
            <div>
              <span style={{ fontWeight: 600 }}>Payments</span>
              <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>
                What donors can use on the website.
              </div>
            </div>
          </Space>
        }
        bordered={false}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>Credit & Debit Cards (Stripe)</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Visa, Mastercard, American Express via instant Stripe checkout.</div>
            </div>
            <Switch
              checked={settings.stripe_enabled}
              onChange={(val) => handleToggleSetting('stripe_enabled', val)}
            />
          </div>
          <Divider style={{ margin: 0 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>ACH Direct Bank Transfers</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Low-fee direct bank debit for larger gifts over $1,000.</div>
            </div>
            <Switch
              checked={settings.ach_enabled}
              onChange={(val) => handleToggleSetting('ach_enabled', val)}
            />
          </div>
          <Divider style={{ margin: 0 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>Apple Pay & Google Pay</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>One-tap frictionless giving from mobile browsers.</div>
            </div>
            <Switch
              checked={settings.apple_pay_enabled}
              onChange={(val) => handleToggleSetting('apple_pay_enabled', val)}
            />
          </div>
          <Divider style={{ margin: 0 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>Offline Giving Recording (Checks & Cash)</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Allows administrators to manually record checks and banquet cash collections.</div>
            </div>
            <Switch
              checked={settings.offline_gifts_enabled}
              onChange={(val) => handleToggleSetting('offline_gifts_enabled', val)}
            />
          </div>
        </div>
      </Card>

      {/* ─── Card 3: Notifications and Receipts ─── */}
      <Card
        title={
          <Space>
            <BellOutlined style={{ color: '#fa8c16' }} />
            <div>
              <span style={{ fontWeight: 600 }}>Notifications and receipts</span>
              <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>
                Who hears about what, and when.
              </div>
            </div>
          </Space>
        }
        bordered={false}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>Major Gift Email Alerts</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                Instant notification to executive team when a single donation exceeds threshold.
              </div>
            </div>
            <Space>
              <InputNumber
                prefix="$"
                value={settings.large_gift_threshold}
                onChange={(val) => val && handleToggleSetting('large_gift_threshold', val)}
                style={{ width: 100 }}
              />
              <Switch
                checked={settings.large_gift_alert}
                onChange={(val) => handleToggleSetting('large_gift_alert', val)}
              />
            </Space>
          </div>
          <Divider style={{ margin: 0 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>Daily Finance Digest</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Summary email sent at 08:00 AM with yesterday's donation reconciliation.</div>
            </div>
            <Switch
              checked={settings.daily_digest}
              onChange={(val) => handleToggleSetting('daily_digest', val)}
            />
          </div>
          <Divider style={{ margin: 0 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text strong style={{ fontSize: 14 }}>Automated 501(c)(3) Tax Receipts</Text>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Send branded PDF tax receipts to donors upon successful payment.</div>
            </div>
            <Switch
              checked={settings.auto_tax_receipts}
              onChange={(val) => handleToggleSetting('auto_tax_receipts', val)}
            />
          </div>
        </div>
      </Card>

      {/* ─── Modal: Invite Admin ─── */}
      <Modal
        title="Invite New Administrator"
        open={isInviteModalOpen}
        onCancel={() => setIsInviteModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleInviteSubmit} initialValues={{ role: 'Editor — videos and events' }}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter name' }]}>
            <Input placeholder="e.g. David Martinez" />
          </Form.Item>

          <Form.Item name="email" label="Official Email Address" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
            <Input placeholder="e.g. d.martinez@liveachievebelieve.org" />
          </Form.Item>

          <Form.Item name="role" label="Access Role" rules={[{ required: true }]}>
            <Select>
              <Option value="Super admin">Super admin (Full access to all panels)</Option>
              <Option value="Finance — donations only">Finance — donations only (Gifts, receipts, payouts)</Option>
              <Option value="Editor — videos and events">Editor — videos and events (Media, gatherings, RSVPs)</Option>
              <Option value="Moderator — volunteers">Moderator — volunteers (Applicant reviews and placement)</Option>
            </Select>
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
            <Button onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Send Invitation</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

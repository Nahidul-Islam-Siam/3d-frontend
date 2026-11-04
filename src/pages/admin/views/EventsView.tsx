import { useState } from 'react';
import {
  Table,
  Button,
  Progress,
  Space,
  Modal,
  Drawer,
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Segmented,
  message,
  Dropdown,
} from 'antd';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  UserOutlined,
  DownloadOutlined,
  EyeOutlined,
  MoreOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { EventItem } from '../mockData';

interface EventsViewProps {
  events: EventItem[];
  onAddEvent: (newEvent: EventItem) => void;
  onUpdateEvent: (updated: EventItem) => void;
}

export default function EventsView({
  events,
  onAddEvent,
  onUpdateEvent,
}: EventsViewProps) {
  const [viewMode, setViewMode] = useState<string>('list');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Mock RSVP guests for the selected event drawer
  const mockRsvps = [
    { name: 'Dr. Raymond Chen', email: 'raymond.chen@metrohealth.edu', tickets: 2, date: '2026-11-01' },
    { name: 'Marcus Sterling', email: 'm.sterling@sterlingholdings.com', tickets: 4, date: '2026-10-31' },
    { name: 'Eleanor Wright', email: 'eleanor.wright@heritage.org', tickets: 2, date: '2026-10-30' },
    { name: 'Sarah Jenkins', email: 'sjenkins@communitycare.net', tickets: 1, date: '2026-10-29' },
    { name: 'Carlos Mendez', email: 'mendez.family@outlook.com', tickets: 3, date: '2026-10-28' },
    { name: 'Pastor Thomas Cole', email: 'tcole@gracelutheran.org', tickets: 6, date: '2026-10-27' },
  ];

  const handleAddSubmit = (values: {
    title: string;
    event_date: { format: (fmt: string) => string };
    start_time: { format: (fmt: string) => string };
    end_time: { format: (fmt: string) => string };
    location: string;
    capacity: number;
    description: string;
  }) => {
    const newEvt: EventItem = {
      id: `evt-${Date.now().toString().slice(-4)}`,
      title: values.title,
      event_date: values.event_date.format('YYYY-MM-DD'),
      start_time: values.start_time.format('HH:mm'),
      end_time: values.end_time.format('HH:mm'),
      location: values.location,
      capacity: values.capacity,
      rsvps_count: 0,
      status: 'Upcoming',
      description: values.description,
    };
    onAddEvent(newEvt);
    message.success(`Created event: ${values.title}`);
    setIsAddModalOpen(false);
    form.resetFields();
  };

  const handleCancelEvent = (event: EventItem) => {
    onUpdateEvent({ ...event, status: 'Cancelled' });
    message.warning(`Cancelled ${event.title}`);
  };

  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 130,
      render: (_: unknown, __: EventItem, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        const codeNum = (1040 + index * 83).toString();
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13.5, letterSpacing: '-0.2px' }}>
              #{shortNum}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 500, marginTop: 2 }}>
              EVT-2026-{codeNum}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Event & Venue',
      dataIndex: 'title',
      key: 'title',
      width: 250,
      render: (title: string, record: EventItem) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: 13.5 }}>
            {title}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11.5, marginTop: 2 }}>
            {record.location}
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Schedule',
      key: 'datetime',
      width: 200,
      render: (_: unknown, record: EventItem) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>
            {record.event_date}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11.5, marginTop: 2 }}>
            {record.start_time} – {record.end_time} EST
          </div>
        </div>
      ),
    },
    {
      title: 'Capacity & RSVPs',
      key: 'capacity',
      width: 210,
      render: (_: unknown, record: EventItem) => {
        const pct = Math.min(100, Math.round((record.rsvps_count / record.capacity) * 100));
        return (
          <div style={{ paddingRight: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>{record.rsvps_count} RSVPs</span>
              <span style={{ color: '#94A3B8' }}>Cap: {record.capacity}</span>
            </div>
            <Progress
              percent={pct}
              size="small"
              showInfo={false}
              strokeColor={pct >= 90 ? '#EA580C' : '#F97316'}
              railColor="#F1F5F9"
            />
          </div>
        );
      },
    },
    {
      title: 'Host & Lead',
      key: 'host_lead',
      width: 170,
      render: () => (
        <div>
          <div style={{ fontWeight: 500, color: '#334155', fontSize: 13 }}>
            Community Outreach
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
            Sarah Mitchell
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: EventItem['status']) => {
        if (status === 'Upcoming') {
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
        if (status === 'Happening now') {
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
              Live Now
            </span>
          );
        }
        if (status === 'Past') {
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
              Completed
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
            Cancelled
          </span>
        );
      },
    },
    {
      title: 'Admission',
      dataIndex: 'status',
      key: 'admission',
      width: 140,
      render: () => (
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
          Free Pass
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 90,
      fixed: 'right' as const,
      render: (_: unknown, record: EventItem) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {/* Circular Guest List Button */}
          <button
            type="button"
            onClick={() => setSelectedEvent(record)}
            title="View Guest List"
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
                  key: 'guests',
                  icon: <UserOutlined />,
                  label: `View Guest List (${record.rsvps_count})`,
                  onClick: () => setSelectedEvent(record),
                },
                {
                  key: 'export',
                  icon: <DownloadOutlined />,
                  label: 'Export RSVP Roster',
                  onClick: () => message.success(`Exporting roster for ${record.title}`),
                },
                ...(record.status === 'Upcoming'
                  ? [
                      {
                        type: 'divider' as const,
                      },
                      {
                        key: 'cancel',
                        danger: true,
                        icon: <CloseOutlined />,
                        label: 'Cancel Event',
                        onClick: () => handleCancelEvent(record),
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
              <CalendarOutlined />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
                Community Events & Dinners
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                Hospitality suppers, awareness showcases, and seating allocations
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <Space wrap size="middle">
            <Segmented
              value={viewMode}
              onChange={(val) => setViewMode(val as string)}
              options={[
                { label: 'List View', value: 'list', icon: <UnorderedListOutlined /> },
                { label: 'Cards', value: 'cards', icon: <CalendarOutlined /> },
              ]}
              style={{ backgroundColor: '#F1F5F9' }}
            />
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
              New Event
            </Button>
          </Space>
        </div>

        {/* ─── Main Content: List or Cards ─── */}
        {viewMode === 'list' ? (
          <Table
            className="admin-saas-table"
            dataSource={events}
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
            scroll={{ x: 1240 }}
          />
        ) : (
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {events.map((evt) => {
              const pct = Math.min(100, Math.round((evt.rsvps_count / evt.capacity) * 100));
              return (
                <div
                  key={evt.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F1F5F9',
                    borderRadius: 14,
                    padding: 20,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#0F172A' }}>{evt.title}</div>
                      <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>{evt.location}</div>
                    </div>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: 9999,
                        fontSize: 11.5,
                        fontWeight: 600,
                        backgroundColor: evt.status === 'Upcoming' ? '#EFF6FF' : '#F8FAFC',
                        color: evt.status === 'Upcoming' ? '#2563EB' : '#64748B',
                        border: `1px solid ${evt.status === 'Upcoming' ? '#BFDBFE' : '#E2E8F0'}`,
                      }}
                    >
                      {evt.status}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, color: '#475569', marginBottom: 12 }}>
                    📅 {evt.event_date} ({evt.start_time} – {evt.end_time})
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{evt.rsvps_count} RSVPs</span>
                      <span style={{ color: '#94A3B8' }}>Cap: {evt.capacity}</span>
                    </div>
                    <Progress percent={pct} strokeColor="#F97316" showInfo={false} size="small" />
                  </div>

                  <Button
                    block
                    onClick={() => setSelectedEvent(evt)}
                    style={{ borderRadius: 8, borderColor: '#E2E8F0' }}
                  >
                    View Guest List
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Drawer: Guest List & Details ─── */}
      <Drawer
        title={`Guest Roster: ${selectedEvent?.title || ''}`}
        placement="right"
        size="large"
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#FFF7ED',
                borderRadius: 12,
                border: '1px solid #FFEDD5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: '#C2410C', fontWeight: 600 }}>SEATING OCCUPANCY</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
                  {selectedEvent.rsvps_count} of {selectedEvent.capacity} Seats Reserved
                </div>
              </div>
              <Button
                icon={<DownloadOutlined />}
                style={{ borderRadius: 8, backgroundColor: '#FFFFFF', borderColor: '#FED7AA', color: '#C2410C' }}
                onClick={() => message.success('Exporting full attendee CSV list...')}
              >
                Export Guest List
              </Button>
            </div>

            <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
              Confirmed RSVPs ({mockRsvps.length} party leads)
            </div>

            <Table
              className="admin-saas-table"
              dataSource={mockRsvps}
              rowKey="email"
              pagination={false}
              size="small"
              columns={[
                {
                  title: 'Guest Name',
                  dataIndex: 'name',
                  key: 'name',
                  render: (name: string, record) => (
                    <div>
                      <div style={{ fontWeight: 600, color: '#0F172A' }}>{name}</div>
                      <div style={{ fontSize: 11.5, color: '#94A3B8' }}>{record.email}</div>
                    </div>
                  ),
                },
                {
                  title: 'Passes',
                  dataIndex: 'tickets',
                  key: 'tickets',
                  render: (t: number) => (
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 9999,
                        fontSize: 11.5,
                        fontWeight: 600,
                        backgroundColor: '#FFF7ED',
                        color: '#EA580C',
                        border: '1px solid #FFEDD5',
                      }}
                    >
                      {t} {t === 1 ? 'Seat' : 'Seats'}
                    </span>
                  ),
                },
                {
                  title: 'RSVP Date',
                  dataIndex: 'date',
                  key: 'date',
                  render: (d: string) => <span style={{ color: '#64748B', fontSize: 12 }}>{d}</span>,
                },
              ]}
            />
          </div>
        )}
      </Drawer>

      {/* ─── Modal: Create Event ─── */}
      <Modal
        title="Schedule New Gathering / Dinner"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubmit} style={{ marginTop: 16 }}>
          <Form.Item name="title" label="Event Title" rules={[{ required: true, message: 'Enter title' }]}>
            <Input placeholder="e.g. Hope Community Dinner #4" />
          </Form.Item>

          <Form.Item name="event_date" label="Date" rules={[{ required: true, message: 'Select date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Form.Item name="start_time" label="Start Time" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="end_time" label="End Time" rules={[{ required: true }]}>
              <TimePicker format="HH:mm" style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item name="location" label="Venue / Address" rules={[{ required: true }]}>
            <Input placeholder="e.g. First Baptist Church Hall, Tampa" />
          </Form.Item>

          <Form.Item name="capacity" label="Seat Capacity" initialValue={50} rules={[{ required: true }]}>
            <InputNumber min={5} max={1000} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="description" label="Event Notes / Description">
            <Input.TextArea rows={3} placeholder="Dinner schedule, volunteer check-in instructions..." />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#F97316' }}>
              Create Event
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

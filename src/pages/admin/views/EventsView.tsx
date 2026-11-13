import { useState } from 'react';
import {
  Alert,
  Table,
  Button,
  Progress,
  Space,
  Drawer,
  Empty,
  Form,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
  Segmented,
  Spin,
  message,
  Dropdown,
  Select,
  Radio,
  Switch,
  Upload,
  Tag,
  Row,
  Col,
} from 'antd';
import {
  CalendarOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MoreOutlined,
  CloseOutlined,
  PictureOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  CheckOutlined,
  LinkOutlined,
  InboxOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetEventRsvpsQuery } from '@/redux/service/eventsApi';
import { useUploadMediaMutation } from '@/redux/service/mediaApi';
import type { EventRsvpItem } from '@/redux/service/types';
import { formatBytes, optimizeImageForUpload } from '@/utils/mediaOptimizer';
import type { EventItem } from '../types';
import RichTextEditor from '@/components/common/RichTextEditor';

const { Option } = Select;
const { Dragger } = Upload;

interface EventsViewProps {
  events: EventItem[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onAddEvent: (newEvent: EventItem) => void;
  onUpdateEvent: (updated: EventItem) => void;
  onDeleteEvent?: (id: string) => void;
}

import { confirmDelete } from '@/utils/confirmDelete';

export default function EventsView({
  events,
  loading = false,
  error = null,
  onRefresh,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}: EventsViewProps) {
  // Page View Modes: 'list' | 'cards' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'cards' | 'create' | 'edit'>('list');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Filters & Search
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Form states
  const [form] = Form.useForm();
  const watchedStatus = Form.useWatch('status', form) as EventItem['status'] | undefined;
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [bannerUploadProgress, setBannerUploadProgress] = useState(0);
  const [eventDescription, setEventDescription] = useState<string>('');
  const [selectedTicketType, setSelectedTicketType] = useState<'Free RSVP' | 'Paid Ticket' | 'Suggested Donation'>('Free RSVP');

  const [uploadMedia] = useUploadMediaMutation();
  const {
    data: eventRsvps = [],
    isLoading: rsvpsLoading,
    isFetching: rsvpsFetching,
    isError: isRsvpsError,
    refetch: refetchEventRsvps,
  } = useGetEventRsvpsQuery(selectedEvent?.id ?? '', {
    skip: !selectedEvent?.id,
  });
  const rsvpsError = isRsvpsError ? 'Could not load confirmed RSVP list from server.' : null;

  const handleExportRsvps = () => {
    if (!selectedEvent || eventRsvps.length === 0) return;
    const escapeCell = (val: string | number | undefined) =>
      `"${String(val ?? '').replace(/"/g, '""')}"`;
    const headers = ['Guest Name', 'Email', 'Phone', 'Seats', 'RSVP Date', 'Notes'];
    const rows = eventRsvps.map((r) => [
      escapeCell(r.guest_name),
      escapeCell(r.guest_email),
      escapeCell(r.guest_phone || ''),
      escapeCell(r.tickets),
      escapeCell(r.rsvp_date ? dayjs(r.rsvp_date).format('YYYY-MM-DD HH:mm') : ''),
      escapeCell(r.notes || ''),
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedEvent.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-rsvps.csv`;
    link.click();
    URL.revokeObjectURL(url);
    message.success('Guest list CSV downloaded.');
  };

  // ─── Filter Events ───
  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchText.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchText.toLowerCase()) ||
      (evt.host_lead && evt.host_lead.toLowerCase().includes(searchText.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' || evt.status === statusFilter;

    const matchesCategory =
      categoryFilter === 'All' || evt.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // ─── Handlers for Switching View Modes ───
  const handleStartCreate = () => {
    setEditingEvent(null);
    setAttachedImage(null);
    setImageUrlInput('');
    setEventDescription('');
    setSelectedTicketType('Free RSVP');
    form.resetFields();
    form.setFieldsValue({
      category: 'Community Meals & Dinners',
      capacity: 50,
      ticket_type: 'Free RSVP',
      status: 'Draft',
      featured: false,
    });
    setViewMode('create');
  };

  const handleStartEdit = (event: EventItem) => {
    setEditingEvent(event);
    setAttachedImage(event.image_url || null);
    setImageUrlInput(event.image_url || '');
    setEventDescription(event.description || '');
    setSelectedTicketType(event.ticket_type || 'Free RSVP');

    form.resetFields();
    form.setFieldsValue({
      title: event.title,
      category: event.category || 'Community Meals & Dinners',
      event_date: event.event_date ? dayjs(event.event_date) : undefined,
      start_time: event.start_time ? dayjs(event.start_time, 'HH:mm') : undefined,
      end_time: event.end_time ? dayjs(event.end_time, 'HH:mm') : undefined,
      location: event.location,
      capacity: event.capacity,
      ticket_type: event.ticket_type || 'Free RSVP',
      price: event.price || 0,
      registration_url: event.registration_url || '',
      host_lead: event.host_lead || '',
      dress_code: event.dress_code || '',
      status: event.status || 'Draft',
      featured: !!event.featured,
    });
    setViewMode('edit');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setEditingEvent(null);
    setAttachedImage(null);
    setImageUrlInput('');
    setEventDescription('');
    form.resetFields();
  };

  // ─── Image Upload Helpers ───
  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, WEBP, AVIF).');
      return false;
    }
    if (file.size > 15 * 1024 * 1024) {
      message.error('Source image file must be under 15MB.');
      return false;
    }

    setUploadingBanner(true);
    setBannerUploadProgress(0);
    try {
      const optimized = await optimizeImageForUpload(file, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 0.85,
      });
      const uploaded = await uploadMedia({
        files: [optimized.file],
        onProgress: (pct) => setBannerUploadProgress(pct),
      }).unwrap();
      const url = uploaded[0]?.url;
      if (!url) {
        throw new Error('Upload completed without a media URL.');
      }
      setAttachedImage(url);
      setImageUrlInput(url);
      if (optimized.wasCompressed) {
        message.success(
          `Optimized (${formatBytes(optimized.originalBytes)} -> ${formatBytes(optimized.optimizedBytes)}) & uploaded to CDN!`,
        );
      } else {
        message.success('Cover image uploaded & CDN-optimized!');
      }
    } catch {
      message.error('Failed to upload cover image. Please try again.');
    } finally {
      setUploadingBanner(false);
    }
    return false; // prevent automatic antd POST
  };

  const handleApplyImageUrl = () => {
    if (!imageUrlInput.trim()) {
      message.warning('Please enter an image URL.');
      return;
    }
    setAttachedImage(imageUrlInput.trim());
    message.success('Applied image URL preview!');
  };

  const handleRemoveBanner = () => {
    setAttachedImage(null);
    setImageUrlInput('');
    message.info('Event banner removed. Click Save to persist changes.');
  };

  // ─── Form Submission ───
  const handleFormFinish = (values: {
    title: string;
    category?: EventItem['category'];
    event_date: { format: (fmt: string) => string };
    start_time: { format: (fmt: string) => string };
    end_time: { format: (fmt: string) => string };
    location: string;
    capacity: number;
    ticket_type?: EventItem['ticket_type'];
    price?: number;
    registration_url?: string;
    host_lead?: string;
    dress_code?: string;
    status: EventItem['status'];
    featured?: boolean;
  }) => {
    const eventPayload: EventItem = {
      id: editingEvent ? editingEvent.id : `evt-${Date.now().toString().slice(-4)}`,
      title: values.title,
      category: values.category || 'Community Meals & Dinners',
      event_date: values.event_date.format('YYYY-MM-DD'),
      start_time: values.start_time.format('HH:mm'),
      end_time: values.end_time.format('HH:mm'),
      location: values.location,
      capacity: values.capacity,
      rsvps_count: editingEvent ? editingEvent.rsvps_count : 0,
      status: values.status || 'Draft',
      description: eventDescription || '<p>No details provided.</p>',
      image_url: attachedImage ?? '',
      ticket_type: values.ticket_type || 'Free RSVP',
      price: values.ticket_type === 'Paid Ticket' ? values.price : undefined,
      registration_url: values.registration_url || undefined,
      host_lead: values.host_lead || undefined,
      dress_code: values.dress_code || undefined,
      featured: !!values.featured,
    };

    if (viewMode === 'edit' && editingEvent) {
      onUpdateEvent(eventPayload);
      message.success(`Updated event: "${eventPayload.title}"`);
    } else {
      onAddEvent(eventPayload);
      if (eventPayload.status === 'Draft') {
        message.info(`Saved "${eventPayload.title}" to dashboard as Draft (Not Published).`);
      } else {
        message.success(`Published new event: "${eventPayload.title}"`);
      }
    }

    handleBackToList();
  };

  const handleTogglePublishEvent = (event: EventItem) => {
    const isLive = event.status === 'Upcoming' || event.status === 'Happening now';
    const nextStatus: EventItem['status'] = isLive ? 'Draft' : 'Upcoming';
    onUpdateEvent({ ...event, status: nextStatus });
    if (nextStatus === 'Draft') {
      message.info(`Unpublished "${event.title}" (moved to Draft).`);
    } else {
      message.success(`Published "${event.title}" to public schedule!`);
    }
  };

  const handleCancelEvent = (event: EventItem) => {
    onUpdateEvent({ ...event, status: 'Cancelled' });
    message.warning(`Cancelled ${event.title}`);
  };

  const handleDelete = (event: EventItem) => {
    void confirmDelete({
      title: 'Delete this event?',
      itemName: event.title,
      text: 'This removes the event from schedules and RSVP registrations.',
      onConfirm: () => {
        if (onDeleteEvent) {
          onDeleteEvent(event.id);
          message.success(`Deleted ${event.title}`);
        } else {
          onUpdateEvent({ ...event, status: 'Cancelled' });
          message.info('Event archived');
        }
      },
    });
  };

  // ─── Table Columns ───
  const columns = [
    {
      title: 'ID',
      key: 'id',
      width: 110,
      render: (_: unknown, __: EventItem, index: number) => {
        const shortNum = (index + 1).toString().padStart(4, '0');
        const codeNum = (1040 + index * 83).toString();
        return (
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 13, letterSpacing: '-0.2px' }}>
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
      width: 320,
      render: (title: string, record: EventItem) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {record.image_url ? (
            <img
              src={record.image_url}
              alt={title}
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                objectFit: 'cover',
                border: '1px solid #E2E8F0',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: '#FFF7ED',
                border: '1px solid #FED7AA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EA580C',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              <CalendarOutlined />
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <div
                style={{
                  fontWeight: 600,
                  color: '#0F172A',
                  fontSize: 13.5,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 210,
                }}
              >
                {title}
              </div>
              {record.featured && (
                <Tag color="gold" style={{ fontSize: 10, padding: '0 4px', lineHeight: '18px', margin: 0 }}>
                  ★ Featured
                </Tag>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
              {record.category && (
                <Tag color="orange" style={{ fontSize: 10.5, margin: 0, borderRadius: 4 }}>
                  {record.category}
                </Tag>
              )}
              <span
                style={{
                  color: '#64748B',
                  fontSize: 11.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 140,
                }}
              >
                <EnvironmentOutlined style={{ fontSize: 10.5 }} /> {record.location}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      width: 190,
      render: (_: unknown, record: EventItem) => (
        <div>
          <div style={{ fontWeight: 600, color: '#1E293B', fontSize: 13 }}>
            📅 {record.event_date}
          </div>
          <div style={{ color: '#64748B', fontSize: 11.5, marginTop: 2 }}>
            {record.start_time} - {record.end_time} EST
          </div>
        </div>
      ),
    },
    {
      title: 'Capacity & RSVPs',
      key: 'capacity',
      width: 200,
      render: (_: unknown, record: EventItem) => {
        const pct = Math.min(100, Math.round((record.rsvps_count / record.capacity) * 100));
        return (
          <div style={{ paddingRight: 12 }}>
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
      title: 'Lead Organizer',
      key: 'host_lead',
      width: 170,
      render: (_: unknown, record: EventItem) => (
        <div>
          <div style={{ fontWeight: 500, color: '#334155', fontSize: 12.5 }}>
            {record.host_lead || 'Community Outreach'}
          </div>
          <div style={{ color: '#94A3B8', fontSize: 11, marginTop: 2 }}>
            {record.ticket_type || 'Free RSVP'}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: EventItem['status']) => {
        if (status === 'Draft') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 12px',
                borderRadius: 9999,
                fontSize: 11.5,
                fontWeight: 600,
                backgroundColor: '#FFFBEB',
                color: '#B45309',
                border: '1px solid #FDE68A',
              }}
            >
              Not Published
            </span>
          );
        }
        if (status === 'Upcoming') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 12px',
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
        if (status === 'Happening now') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px 12px',
                borderRadius: 9999,
                fontSize: 11.5,
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
                padding: '3px 12px',
                borderRadius: 9999,
                fontSize: 11.5,
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
              padding: '3px 12px',
              borderRadius: 9999,
              fontSize: 11.5,
              fontWeight: 600,
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FECACA',
            }}
          >
            Cancelled
          </span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      fixed: 'right' as const,
      render: (_: unknown, record: EventItem) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                icon: <EyeOutlined />,
                label: 'View Guest List',
                onClick: () => setSelectedEvent(record),
              },
              {
                key: 'edit',
                icon: <EditOutlined />,
                label: 'Edit Event',
                onClick: () => handleStartEdit(record),
              },
              {
                key: 'toggle-publish',
                icon:
                  record.status === 'Upcoming' || record.status === 'Happening now' ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <CheckOutlined />
                  ),
                label:
                  record.status === 'Upcoming' || record.status === 'Happening now'
                    ? 'Unpublish (Move to Draft)'
                    : 'Publish Event',
                onClick: () => handleTogglePublishEvent(record),
              },
              ...(record.registration_url
                ? [
                    {
                      key: 'ticketing',
                      icon: <LinkOutlined />,
                      label: 'Open Ticketing Page',
                      onClick: () => window.open(record.registration_url, '_blank'),
                    },
                  ]
                : []),
              ...(record.status !== 'Cancelled'
                ? [
                    {
                      key: 'cancel',
                      icon: <CloseOutlined />,
                      label: 'Cancel Event',
                      danger: true,
                      onClick: () => handleCancelEvent(record),
                    },
                  ]
                : []),
              {
                type: 'divider',
              },
              {
                key: 'delete',
                danger: true,
                icon: <DeleteOutlined />,
                label: 'Delete Event',
                onClick: () => handleDelete(record),
              },
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
              color: '#64748B',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <MoreOutlined style={{ fontSize: 16 }} />
          </button>
        </Dropdown>
      ),
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // MODE 1 & 2: DEDICATED FULL-PAGE CREATE / EDIT SCREEN
  // ═══════════════════════════════════════════════════════════════════════
  if (viewMode === 'create' || viewMode === 'edit') {
    const isEdit = viewMode === 'edit';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #F1F5F9',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={handleBackToList}
              title="Back to Events"
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F172A',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 15 }} />
            </button>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
                {isEdit ? `Edit Event: ${editingEvent?.title || ''}` : 'Schedule New Event / Gathering'}
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                {isEdit
                  ? 'Update venue, schedule itinerary, guest cap, and rich event description'
                  : 'Configure mission pillar, seating allocation, date, and external ticketing'}
              </div>
            </div>
          </div>

          <Space>
            <Button
              onClick={handleBackToList}
              style={{
                borderRadius: 8,
                height: 38,
                padding: '0 18px',
                borderColor: '#CBD5E1',
                color: '#475569',
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              disabled={uploadingBanner}
              onClick={() => form.submit()}
              style={{
                borderRadius: 8,
                height: 38,
                padding: '0 20px',
                backgroundColor: '#F97316',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(249,115,22,0.3)',
              }}
            >
              {isEdit
                ? watchedStatus === 'Draft'
                  ? 'Save as Draft'
                  : 'Save Changes'
                : watchedStatus === 'Draft' || !watchedStatus
                ? 'Save to Dashboard (Draft)'
                : 'Save & Publish'}
            </Button>
          </Space>
        </div>

        {/* 2-Column Dedicated Form Layout */}
        <Form form={form} layout="vertical" onFinish={handleFormFinish}>
          <Row gutter={[20, 20]}>
            {/* ─── LEFT COLUMN (Core Details & Rich Text Editor) ─── */}
            <Col xs={24} lg={15}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Basic Information Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #F1F5F9',
                    padding: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 18 }}>
                    Event Information & Logistics
                  </div>

                  <Form.Item
                    name="title"
                    label={<span style={{ fontWeight: 600 }}>Event Title</span>}
                    rules={[{ required: true, message: 'Please enter event title' }]}
                  >
                    <Input placeholder="e.g. Suicide Awareness Community Showcase & Dinner" size="large" />
                  </Form.Item>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="category"
                        label={<span style={{ fontWeight: 600 }}>Mission Pillar / Category</span>}
                        rules={[{ required: true }]}
                      >
                        <Select size="large">
                          <Option value="Community Meals & Dinners">🍲 Community Meals & Dinners</Option>
                          <Option value="Suicide Awareness Showdown">🎗️ Suicide Awareness Showdown</Option>
                          <Option value="Youth Mentorship & LEADS">🎓 Youth Mentorship & LEADS</Option>
                          <Option value="Veterans Fellowship">🎖️ Veterans Fellowship</Option>
                          <Option value="Fundraiser Gala">🥂 Fundraiser Gala</Option>
                          <Option value="Other">🌟 Other</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="host_lead"
                        label={<span style={{ fontWeight: 600 }}>Lead Host / Organizer</span>}
                      >
                        <Input placeholder="e.g. Dr. Raymond Chen & Sarah Mitchell" size="large" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={8}>
                      <Form.Item
                        name="event_date"
                        label={<span style={{ fontWeight: 600 }}>Date</span>}
                        rules={[{ required: true, message: 'Select date' }]}
                      >
                        <DatePicker style={{ width: '100%' }} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Form.Item
                        name="start_time"
                        label={<span style={{ fontWeight: 600 }}>Start Time</span>}
                        rules={[{ required: true, message: 'Start time' }]}
                      >
                        <TimePicker format="HH:mm" style={{ width: '100%' }} size="large" />
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={8}>
                      <Form.Item
                        name="end_time"
                        label={<span style={{ fontWeight: 600 }}>End Time</span>}
                        rules={[{ required: true, message: 'End time' }]}
                      >
                        <TimePicker format="HH:mm" style={{ width: '100%' }} size="large" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="location"
                    label={<span style={{ fontWeight: 600 }}>Venue & Physical Address</span>}
                    rules={[{ required: true, message: 'Please enter venue or address' }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined style={{ color: '#94A3B8' }} />}
                      placeholder="e.g. Community Grand Hall, 420 Hope Way, Tampa FL"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="dress_code"
                    label={<span style={{ fontWeight: 600 }}>Dress Code / Guest Guidelines</span>}
                  >
                    <Input placeholder="e.g. Smart Casual / Family Friendly" size="large" />
                  </Form.Item>
                </div>

                {/* Rich Text Editor for Description & Schedule */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #F1F5F9',
                    padding: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                        Event Narrative, Schedule & Guest Notes
                      </div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                        WYSIWYG formatting for program itinerary, dinner courses, parking instructions, and speaker biographies.
                      </div>
                    </div>
                  </div>

                  <RichTextEditor
                    value={eventDescription}
                    onChange={(val) => setEventDescription(val)}
                    placeholder="Provide event overview, schedule breakdown (e.g. 6:00 PM Reception, 7:00 PM Keynote), and volunteer parking guidelines..."
                    minHeight={220}
                  />
                </div>
              </div>
            </Col>

            {/* ─── RIGHT COLUMN (Poster Uploader, Ticketing, Status) ─── */}
            <Col xs={24} lg={9}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Event Banner / Poster Uploader */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #F1F5F9',
                    padding: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                    Event Cover Banner
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
                    High-resolution poster displayed on event cards, hero highlights, and RSVPs.
                  </div>

                  {attachedImage ? (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 180,
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: '1px solid #FED7AA',
                        backgroundColor: '#FFF7ED',
                      }}
                    >
                      <img
                        src={attachedImage}
                        alt="Event Banner Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          display: 'flex',
                          gap: 6,
                        }}
                      >
                        <Button
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={handleRemoveBanner}
                          style={{
                            borderRadius: 6,
                            backgroundColor: 'rgba(239, 68, 68, 0.95)',
                            color: '#FFFFFF',
                            border: 'none',
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 8,
                          left: 10,
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          color: '#FFFFFF',
                          fontSize: 11,
                          padding: '2px 8px',
                          borderRadius: 4,
                        }}
                      >
                        Active Banner
                      </div>
                    </div>
                  ) : (
                    <Dragger
                      name="file"
                      accept="image/png,image/jpeg,image/webp,image/avif"
                      multiple={false}
                      disabled={uploadingBanner}
                      beforeUpload={handleImageFile}
                      showUploadList={false}
                      style={{
                        padding: '16px 8px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: 12,
                        border: '2px dashed #CBD5E1',
                      }}
                    >
                      <p className="ant-upload-drag-icon" style={{ marginBottom: 6 }}>
                        <InboxOutlined style={{ color: '#F97316', fontSize: 32 }} />
                      </p>
                      <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: '0 0 2px' }}>
                        {uploadingBanner ? 'Optimizing & uploading poster...' : 'Click to upload or drag & drop poster'}
                      </p>
                      <p style={{ color: '#64748B', fontSize: 11, margin: 0 }}>
                        PNG, JPG, WEBP, AVIF · Auto-compressed WebP & CDN
                      </p>
                      {uploadingBanner && (
                        <div style={{ marginTop: 10, paddingInline: 12 }}>
                          <Progress percent={bannerUploadProgress} size="small" strokeColor="#F97316" />
                        </div>
                      )}
                    </Dragger>
                  )}

                  {/* URL Paste Option */}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                      Or paste direct image URL
                    </div>
                    <Space.Compact style={{ width: '100%' }}>
                      <Input
                        placeholder="https://images.unsplash.com/..."
                        value={imageUrlInput}
                        allowClear
                        onChange={(e) => {
                          const next = e.target.value;
                          setImageUrlInput(next);
                          if (!next.trim() && e.type === 'click') {
                            setAttachedImage(null);
                          }
                        }}
                        onPressEnter={handleApplyImageUrl}
                      />
                      <Button onClick={handleApplyImageUrl}>Preview</Button>
                    </Space.Compact>
                  </div>
                </div>

                {/* Seating & Ticketing Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #F1F5F9',
                    padding: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>
                    Ticketing & Seating Capacity
                  </div>

                  <Form.Item
                    name="ticket_type"
                    label={<span style={{ fontWeight: 600 }}>Ticketing Type</span>}
                    rules={[{ required: true }]}
                  >
                    <Radio.Group
                      onChange={(e) => setSelectedTicketType(e.target.value)}
                      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                    >
                      <Radio value="Free RSVP">Free RSVP (Open Community Admission)</Radio>
                      <Radio value="Paid Ticket">Paid Admission Ticket</Radio>
                      <Radio value="Suggested Donation">Suggested Donation Tier</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {selectedTicketType !== 'Free RSVP' && (
                    <Form.Item
                      name="price"
                      label={<span style={{ fontWeight: 600 }}>Ticket Price ($ USD)</span>}
                      rules={[{ required: true, message: 'Please enter price' }]}
                    >
                      <InputNumber min={1} max={5000} prefix="$" style={{ width: '100%' }} size="large" />
                    </Form.Item>
                  )}

                  <Form.Item
                    name="capacity"
                    label={<span style={{ fontWeight: 600 }}>Seating Capacity (Max RSVPs)</span>}
                    rules={[{ required: true, message: 'Specify seat count' }]}
                  >
                    <InputNumber min={5} max={10000} style={{ width: '100%' }} size="large" />
                  </Form.Item>

                  <Form.Item
                    name="registration_url"
                    label={<span style={{ fontWeight: 600 }}>External Ticketing / Registration URL</span>}
                    tooltip="Optional link to Zeffy, Square, or Eventbrite. If left blank, RSVP is managed through this portal."
                  >
                    <Input
                      prefix={<LinkOutlined style={{ color: '#94A3B8' }} />}
                      placeholder="https://zeffy.com/ticketing/your-event"
                    />
                  </Form.Item>
                </div>

                {/* Status & Featured Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #F1F5F9',
                    padding: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>
                    Visibility & Publication
                  </div>

                  <Form.Item
                    name="status"
                    label={<span style={{ fontWeight: 600 }}>Event Status</span>}
                    rules={[{ required: true }]}
                  >
                    <Select size="large">
                      <Option value="Draft">📝 Not Published (Draft — Dashboard Only)</Option>
                      <Option value="Upcoming">🌐 Published — Upcoming (Scheduled)</Option>
                      <Option value="Happening now">🔴 Published — Live Now (In Progress)</Option>
                      <Option value="Past">✅ Past (Completed)</Option>
                      <Option value="Cancelled">❌ Cancelled</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="featured"
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        backgroundColor: '#FFFBEB',
                        borderRadius: 10,
                        border: '1px solid #FEF3C7',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#92400E', fontSize: 13 }}>
                          ⭐ Feature on Homepage
                        </div>
                        <div style={{ color: '#B45309', fontSize: 11, marginTop: 2 }}>
                          Pin to primary awareness banner and homepage carousel.
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MODE 3: MAIN LIST / CARDS VIEW
  // ═══════════════════════════════════════════════════════════════════════
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

      {/* ─── Header & Primary Controls ─── */}
      <div
        className="admin-saas-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #F1F5F9',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F8FAFC',
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
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: '#FFF7ED',
                border: '1px solid #FED7AA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EA580C',
                fontSize: 22,
              }}
            >
              <CalendarOutlined />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
                Community Events & Gatherings
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                Hospitality suppers, awareness showcases, and seating allocations
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <Space wrap size="middle">
            {onRefresh && (
              <Button
                icon={<ReloadOutlined />}
                loading={loading}
                onClick={onRefresh}
                style={{ borderRadius: 8, height: 38, borderColor: '#CBD5E1' }}
              >
                Refresh
              </Button>
            )}
            <Segmented
              value={viewMode}
              onChange={(val) => setViewMode(val as 'list' | 'cards')}
              options={[
                { label: 'List View', value: 'list', icon: <UnorderedListOutlined /> },
                { label: 'Cards View', value: 'cards', icon: <CalendarOutlined /> },
              ]}
              style={{ backgroundColor: '#F1F5F9' }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleStartCreate}
              style={{
                borderRadius: 8,
                backgroundColor: '#F97316',
                fontWeight: 600,
                height: 38,
                padding: '0 20px',
                boxShadow: '0 2px 8px rgba(249,115,22,0.3)',
              }}
            >
              New Event
            </Button>
          </Space>
        </div>

        {/* ─── Filter & Search Bar ─── */}
        <div
          style={{
            padding: '14px 24px',
            backgroundColor: '#FAFAFA',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <Space wrap size="middle" style={{ flex: 1 }}>
            <Input
              prefix={<SearchOutlined style={{ color: '#94A3B8' }} />}
              placeholder="Search by event title, venue, or host..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ width: 280, borderRadius: 8 }}
            />

            <Select
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              style={{ width: 170 }}
            >
              <Option value="All">All Statuses</Option>
              <Option value="Draft">Not Published (Draft)</Option>
              <Option value="Upcoming">Scheduled</Option>
              <Option value="Happening now">Live Now</Option>
              <Option value="Past">Completed</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>

            <Select
              value={categoryFilter}
              onChange={(val) => setCategoryFilter(val)}
              style={{ width: 220 }}
            >
              <Option value="All">All Mission Pillars</Option>
              <Option value="Community Meals & Dinners">Community Meals</Option>
              <Option value="Suicide Awareness Showdown">Awareness Showdown</Option>
              <Option value="Youth Mentorship & LEADS">Youth Mentorship</Option>
              <Option value="Veterans Fellowship">Veterans Fellowship</Option>
              <Option value="Fundraiser Gala">Fundraiser Gala</Option>
            </Select>
          </Space>

          <div style={{ color: '#64748B', fontSize: 12 }}>
            Showing <strong>{filteredEvents.length}</strong> of <strong>{events.length}</strong> events
          </div>
        </div>

        {/* ─── Table or Cards ─── */}
        {viewMode === 'list' ? (
          <Table
            className="admin-saas-table"
            loading={loading}
            dataSource={filteredEvents}
            columns={columns}
            rowKey="id"
            locale={{
              emptyText:
                events.length === 0
                  ? 'No community events scheduled yet.'
                  : 'No events match your search or filters.',
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
            scroll={{ x: 1200 }}
          />
        ) : loading && events.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <Empty
              description={
                events.length === 0
                  ? 'No community events scheduled yet.'
                  : 'No events match your current filters.'
              }
            >
              <Button type="primary" onClick={handleStartCreate} style={{ backgroundColor: '#F97316' }}>
                Schedule New Event
              </Button>
            </Empty>
          </div>
        ) : (
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 18 }}>
            {filteredEvents.map((evt) => {
              const pct = evt.capacity > 0 ? Math.min(100, Math.round((evt.rsvps_count / evt.capacity) * 100)) : 0;
              return (
                <div
                  key={evt.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F1F5F9',
                    borderRadius: 14,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Poster Thumbnail */}
                  <div style={{ position: 'relative', width: '100%', height: 160, overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
                    {evt.image_url ? (
                      <img
                        src={evt.image_url}
                        alt={evt.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#CBD5E1',
                          fontSize: 36,
                        }}
                      >
                        <PictureOutlined />
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
                      {evt.featured && (
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 700,
                            backgroundColor: '#FEF3C7',
                            color: '#92400E',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                          }}
                        >
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 600,
                          backgroundColor:
                            evt.status === 'Draft'
                              ? '#FFFBEB'
                              : evt.status === 'Upcoming'
                              ? '#EFF6FF'
                              : evt.status === 'Happening now'
                              ? '#ECFDF5'
                              : '#F8FAFC',
                          color:
                            evt.status === 'Draft'
                              ? '#B45309'
                              : evt.status === 'Upcoming'
                              ? '#2563EB'
                              : evt.status === 'Happening now'
                              ? '#059669'
                              : '#64748B',
                          border: `1px solid ${
                            evt.status === 'Draft'
                              ? '#FDE68A'
                              : evt.status === 'Upcoming'
                              ? '#BFDBFE'
                              : '#E2E8F0'
                          }`,
                        }}
                      >
                        {evt.status === 'Draft' ? 'Not Published' : evt.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {evt.category && (
                      <div style={{ marginBottom: 6 }}>
                        <Tag color="orange" style={{ fontSize: 10.5, borderRadius: 4 }}>
                          {evt.category}
                        </Tag>
                      </div>
                    )}

                    <div style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', lineHeight: 1.3, marginBottom: 4 }}>
                      {evt.title}
                    </div>

                    <div style={{ color: '#64748B', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                      <EnvironmentOutlined /> {evt.location}
                    </div>

                    <div style={{ fontSize: 12.5, color: '#334155', marginBottom: 16 }}>
                      📅 <strong>{evt.event_date}</strong> ({evt.start_time} - {evt.end_time} EST)
                    </div>

                    <div style={{ marginBottom: 16, marginTop: 'auto' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>{evt.rsvps_count} RSVPs</span>
                        <span style={{ color: '#94A3B8' }}>Cap: {evt.capacity}</span>
                      </div>
                      <Progress percent={pct} strokeColor="#F97316" showInfo={false} size="small" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <Button
                        icon={
                          evt.status === 'Upcoming' || evt.status === 'Happening now' ? (
                            <EyeInvisibleOutlined />
                          ) : (
                            <CheckOutlined />
                          )
                        }
                        onClick={() => handleTogglePublishEvent(evt)}
                        style={{
                          borderRadius: 8,
                          fontSize: 12.5,
                          fontWeight: 600,
                          borderColor:
                            evt.status === 'Upcoming' || evt.status === 'Happening now'
                              ? '#FDE68A'
                              : '#A7F3D0',
                          color:
                            evt.status === 'Upcoming' || evt.status === 'Happening now'
                              ? '#B45309'
                              : '#047857',
                          backgroundColor:
                            evt.status === 'Upcoming' || evt.status === 'Happening now'
                              ? '#FFFBEB'
                              : '#ECFDF5',
                        }}
                      >
                        {evt.status === 'Upcoming' || evt.status === 'Happening now'
                          ? 'Unpublish'
                          : 'Publish'}
                      </Button>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleStartEdit(evt)}
                        style={{
                          borderRadius: 8,
                          backgroundColor: '#F97316',
                          fontSize: 12.5,
                        }}
                      >
                        Edit Event
                      </Button>
                      <Button
                        onClick={() => setSelectedEvent(evt)}
                        style={{ borderRadius: 8, borderColor: '#CBD5E1', fontSize: 12.5 }}
                      >
                        Guest Roster
                      </Button>
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(evt)}
                        style={{ borderRadius: 8, fontSize: 12.5 }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Drawer: Guest List & Roster ─── */}
      <Drawer
        title={`Guest Roster: ${selectedEvent?.title || ''}`}
        placement="right"
        size="large"
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {selectedEvent.image_url && (
              <div
                style={{
                  width: '100%',
                  height: 160,
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid #E2E8F0',
                }}
              >
                <img
                  src={selectedEvent.image_url}
                  alt={selectedEvent.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <div
              style={{
                padding: '16px 20px',
                backgroundColor: '#FFF7ED',
                borderRadius: 12,
                border: '1px solid #FFEDD5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
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
                disabled={eventRsvps.length === 0}
                style={{ borderRadius: 8, backgroundColor: '#FFFFFF', borderColor: '#FED7AA', color: '#C2410C' }}
                onClick={handleExportRsvps}
              >
                Export Guest List
              </Button>
            </div>

            {rsvpsError && (
              <Alert
                type="error"
                showIcon
                message={rsvpsError}
                action={
                  <Button size="small" onClick={() => void refetchEventRsvps()}>
                    Retry
                  </Button>
                }
              />
            )}

            <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>
              Confirmed RSVPs ({eventRsvps.length} party lead{eventRsvps.length === 1 ? '' : 's'})
            </div>

            <Table
              className="admin-saas-table"
              loading={rsvpsLoading || rsvpsFetching}
              dataSource={eventRsvps}
              rowKey="id"
              pagination={false}
              size="small"
              locale={{ emptyText: 'No confirmed RSVPs for this event yet.' }}
              columns={[
                {
                  title: 'Guest Name',
                  dataIndex: 'guest_name',
                  key: 'guest_name',
                  render: (name: string, record: EventRsvpItem) => (
                    <div>
                      <div style={{ fontWeight: 600, color: '#0F172A' }}>{name}</div>
                      <div style={{ fontSize: 11.5, color: '#64748B' }}>{record.guest_email}</div>
                      {record.guest_phone && (
                        <div style={{ fontSize: 11, color: '#94A3B8' }}>{record.guest_phone}</div>
                      )}
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
                        color: '#C2410C',
                        border: '1px solid #FFEDD5',
                      }}
                    >
                      {t} {t === 1 ? 'Seat' : 'Seats'}
                    </span>
                  ),
                },
                {
                  title: 'RSVP Date',
                  dataIndex: 'rsvp_date',
                  key: 'rsvp_date',
                  render: (d: string) => (
                    <span style={{ color: '#475569', fontSize: 12 }}>
                      {d ? dayjs(d).format('MMM D, YYYY') : '—'}
                    </span>
                  ),
                },
              ]}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}

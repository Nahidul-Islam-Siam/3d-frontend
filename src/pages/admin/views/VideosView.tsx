import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Tag,
  Button,
  Radio,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  message,
  Space,
  Popconfirm,
  Pagination,
} from 'antd';
import {
  VideoCameraOutlined,
  PlusOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { VideoSlot } from '../mockData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface VideosViewProps {
  videos: VideoSlot[];
  onUpdateVideo: (updated: VideoSlot) => void;
  onAddSlot: (newSlot: VideoSlot) => void;
  onDeleteSlot: (id: string) => void;
}
   
export default function VideosView({
  videos,
  onUpdateVideo,
  onAddSlot,
  onDeleteSlot,
}: VideosViewProps) {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Live' | 'Draft' | 'Empty'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [selectedVideo, setSelectedVideo] = useState<VideoSlot | null>(null);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const [replaceForm] = Form.useForm();
  const [addForm] = Form.useForm();

  const filteredVideos = videos.filter((v) => {
    if (statusFilter === 'All') return true;
    return v.status === statusFilter;
  });

  const totalVideos = filteredVideos.length;
  const paginatedVideos = filteredVideos.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleStatusFilterChange = (val: 'All' | 'Live' | 'Draft' | 'Empty') => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleTogglePublish = (slot: VideoSlot) => {
    const nextStatus = slot.status === 'Live' ? 'Draft' : 'Live';
    const updated: VideoSlot = { ...slot, status: nextStatus, updated_at: new Date().toISOString().slice(0, 10) };
    onUpdateVideo(updated);
    message.success(`${slot.slot_label} is now ${nextStatus === 'Live' ? 'LIVE on the website' : 'saved as Draft'}`);
  };

  const handleReplaceSubmit = (values: { title: string; description: string; duration: string; video_url?: string }) => {
    if (!selectedVideo) return;
    const updated: VideoSlot = {
      ...selectedVideo,
      title: values.title,
      description: values.description,
      duration: values.duration,
      video_url: values.video_url || selectedVideo.video_url || 'src/assets/video/welcome.mp4',
      status: 'Live',
      updated_at: new Date().toISOString().slice(0, 10),
    };
    onUpdateVideo(updated);
    message.success(`Replaced film for ${selectedVideo.slot_label}`);
    setIsReplaceModalOpen(false);
    setSelectedVideo(null);
  };

  const handleAddSubmit = (values: { slot_label: string; page_location: string; title: string; description: string; duration: string }) => {
    const newSlot: VideoSlot = {
      id: `vid-${Date.now().toString().slice(-4)}`,
      slot_label: values.slot_label,
      page_location: values.page_location,
      title: values.title,
      description: values.description,
      duration: values.duration || '1:30',
      status: 'Draft',
      sort_order: videos.length + 1,
      updated_at: new Date().toISOString().slice(0, 10),
      video_url: 'src/assets/video/welcome.mp4',
    };
    onAddSlot(newSlot);
    message.success(`Added new video slot: ${values.slot_label}`);
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* â”€â”€â”€ Header â”€â”€â”€ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
            Videos
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            One slot for every film on the website. Replace a video and it goes live in place.
          </Paragraph>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#F97316',
            borderColor: '#F97316',
            borderRadius: 8,
            height: 40,
            fontWeight: 600,
            padding: '0 18px',
            color: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.28)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          Add Video Slot
        </Button>
      </div>

      {/* ─── Filter Pills ─── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <Radio.Group
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="All">All ({videos.length})</Radio.Button>
          <Radio.Button value="Live">
            Live ({videos.filter((v) => v.status === 'Live').length})
          </Radio.Button>
          <Radio.Button value="Draft">
            Draft ({videos.filter((v) => v.status === 'Draft').length})
          </Radio.Button>
          <Radio.Button value="Empty">
            Needs Film ({videos.filter((v) => v.status === 'Empty').length})
          </Radio.Button>
        </Radio.Group>
      </div>

      {/* ─── Video Slot Cards Grid ─── */}
      <Row gutter={[16, 16]}>
        {paginatedVideos.map((slot) => (
          <Col xs={24} md={12} xl={8} key={slot.id}>
            <Card
              bordered={false}
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                borderRadius: 12,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column' } }}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <VideoCameraOutlined style={{ color: '#F97316' }} />
                    <Text strong style={{ fontSize: 14 }}>{slot.slot_label}</Text>
                  </Space>
                  <Tag
                    color={
                      slot.status === 'Live' ? 'success' : slot.status === 'Draft' ? 'warning' : 'default'
                    }
                    icon={
                      slot.status === 'Live' ? (
                        <CheckCircleOutlined />
                      ) : slot.status === 'Draft' ? (
                        <ClockCircleOutlined />
                      ) : undefined
                    }
                    style={{ borderRadius: 6 }}
                  >
                    {slot.status}
                  </Tag>
                </div>
              }
            >
              {/* Media Preview Box */}
              <div
                style={{
                  height: 160,
                  borderRadius: 8,
                  backgroundColor: '#1f1f1f',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: slot.status !== 'Empty' ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (slot.status !== 'Empty') {
                    setSelectedVideo(slot);
                    setIsPreviewModalOpen(true);
                  }
                }}
              >
                {slot.status !== 'Empty' ? (
                  <>
                    <div style={{ textAlign: 'center', color: '#fff' }}>
                      <PlayCircleOutlined style={{ fontSize: 44, color: '#fa8c16', opacity: 0.9 }} />
                      <div style={{ fontSize: 12, marginTop: 6, color: '#d9d9d9' }}>
                        Click to preview ({slot.duration})
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        color: '#fff',
                      }}
                    >
                      {slot.duration}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: '#8c8c8c' }}>
                    <VideoCameraOutlined style={{ fontSize: 32, marginBottom: 4 }} />
                    <div style={{ fontSize: 12 }}>No video uploaded yet</div>
                  </div>
                )}
              </div>

              {/* Slot Details */}
              <div style={{ flex: 1 }}>
                <Text strong style={{ fontSize: 15, display: 'block' }}>
                  {slot.title}
                </Text>
                <Paragraph type="secondary" style={{ fontSize: 12.5, marginTop: 4, minHeight: 36 }}>
                  {slot.description}
                </Paragraph>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8c8c8c', marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                  <span>Target: <Text code>{slot.page_location}</Text></span>
                  <span>Updated: {slot.updated_at}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 8 }}>
                <Button
                  size="small"
                  icon={<UploadOutlined />}
                  style={{
                    borderRadius: 8,
                    borderColor: '#E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#334155',
                    fontWeight: 600,
                    fontSize: 12,
                    height: 32,
                    padding: '0 12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                  onClick={() => {
                    setSelectedVideo(slot);
                    replaceForm.setFieldsValue({
                      title: slot.title,
                      description: slot.description,
                      duration: slot.duration,
                      video_url: slot.video_url,
                    });
                    setIsReplaceModalOpen(true);
                  }}
                >
                  Replace Video
                </Button>

                <Space size="small">
                  {slot.status !== 'Empty' && (
                    <Button
                      size="small"
                      style={
                        slot.status === 'Live'
                          ? {
                              borderRadius: 8,
                              backgroundColor: '#FEF3C7',
                              borderColor: '#FDE68A',
                              color: '#D97706',
                              fontWeight: 600,
                              fontSize: 12,
                              height: 32,
                              padding: '0 12px',
                            }
                          : {
                              borderRadius: 8,
                              backgroundColor: '#F97316',
                              borderColor: '#F97316',
                              color: '#FFFFFF',
                              fontWeight: 600,
                              fontSize: 12,
                              height: 32,
                              padding: '0 12px',
                              boxShadow: '0 2px 6px rgba(249,115,22,0.25)',
                            }
                      }
                      onClick={() => handleTogglePublish(slot)}
                    >
                      {slot.status === 'Live' ? 'Unpublish' : 'Go Live'}
                    </Button>
                  )}

                  <Popconfirm
                    title="Delete video slot?"
                    description="This removes the slot from the admin manager."
                    onConfirm={() => onDeleteSlot(slot.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      style={{
                        borderRadius: 8,
                        backgroundColor: '#FEF2F2',
                        borderColor: '#FEE2E2',
                        color: '#EF4444',
                        height: 32,
                        width: 32,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                  </Popconfirm>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ─── Pagination Footer ─── */}
      <div
        className="admin-saas-card"
        style={{
          padding: '16px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          border: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ color: '#64748B', fontSize: 13, fontWeight: 500 }}>
          Showing{' '}
          <strong style={{ color: '#0F172A' }}>
            {totalVideos === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, totalVideos)}
          </strong>{' '}
          of <strong style={{ color: '#0F172A' }}>{totalVideos}</strong> video slots
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalVideos}
          showSizeChanger
          pageSizeOptions={['6', '12', '24']}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          itemRender={(page, type, originalElement) => {
            if (type === 'page') {
              const isActive = page === currentPage;
              return (
                <span
                  style={{
                    color: isActive ? '#ffffff' : '#475569',
                    fontWeight: isActive ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {page}
                </span>
              );
            }
            return originalElement;
          }}
        />
      </div>

      {/* â”€â”€â”€ Modal: Replace / Upload Video â”€â”€â”€ */}
      <Modal
        title={`Replace Film for ${selectedVideo?.slot_label}`}
        open={isReplaceModalOpen}
        onCancel={() => {
          setIsReplaceModalOpen(false);
          setSelectedVideo(null);
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={replaceForm} layout="vertical" onFinish={handleReplaceSubmit}>
          <Form.Item name="title" label="Film Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Short Synopsis" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="duration" label="Duration (e.g. 1:45)" rules={[{ required: true }]}>
            <Input placeholder="2:10" />
          </Form.Item>
          <Form.Item name="video_url" label="Asset Path / Video URL">
            <Input placeholder="src/assets/video/welcome.mp4 or CDN URL" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <Button
              onClick={() => setIsReplaceModalOpen(false)}
              style={{
                borderRadius: 8,
                height: 38,
                borderColor: '#CBD5E1',
                color: '#475569',
                fontWeight: 500,
                padding: '0 18px',
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#F97316',
                borderColor: '#F97316',
                borderRadius: 8,
                height: 38,
                fontWeight: 600,
                color: '#FFFFFF',
                padding: '0 20px',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.28)',
              }}
            >
              Save & Publish
            </Button>
          </div>
        </Form>
      </Modal>

      {/* â”€â”€â”€ Modal: Preview Video â”€â”€â”€ */}
      <Modal
        title={selectedVideo?.title}
        open={isPreviewModalOpen}
        onCancel={() => {
          setIsPreviewModalOpen(false);
          setSelectedVideo(null);
        }}
        footer={null}
        width={720}
      >
        {selectedVideo && (
          <div>
            <div style={{ width: '100%', height: 380, backgroundColor: '#000', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                src={selectedVideo.video_url || 'src/assets/video/welcome.mp4'}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <Tag color="blue">{selectedVideo.slot_label}</Tag>
              <Tag color="cyan">Page: {selectedVideo.page_location}</Tag>
              <Paragraph style={{ marginTop: 8 }}>{selectedVideo.description}</Paragraph>
            </div>
          </div>
        )}
      </Modal>

      {/* â”€â”€â”€ Modal: Add Video Slot â”€â”€â”€ */}
      <Modal
        title="Add New Video Slot"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item name="slot_label" label="Slot Identifier" rules={[{ required: true, message: 'e.g. Testimonial Cinema' }]}>
            <Input placeholder="e.g. Stories That Save Lives" />
          </Form.Item>
          <Form.Item name="page_location" label="Page Location" rules={[{ required: true }]}>
            <Select placeholder="Select target route">
              <Option value="/ (Homepage)">/ (Homepage)</Option>
              <Option value="/experience-the-story">/experience-the-story</Option>
              <Option value="/who-we-are">/who-we-are</Option>
              <Option value="/how-we-serve">/how-we-serve</Option>
              <Option value="/join-the-movement">/join-the-movement</Option>
              <Option value="/meet-us">/meet-us</Option>
            </Select>
          </Form.Item>
          <Form.Item name="title" label="Initial Title" rules={[{ required: true }]}>
            <Input placeholder="e.g. Living Proof: Stories of Community Hope" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={2} placeholder="Brief summary of what this film conveys to visitors." />
          </Form.Item>
          <Form.Item name="duration" label="Duration" initialValue="1:30">
            <Input placeholder="1:30" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <Button
              onClick={() => setIsAddModalOpen(false)}
              style={{
                borderRadius: 8,
                height: 38,
                borderColor: '#CBD5E1',
                color: '#475569',
                fontWeight: 500,
                padding: '0 18px',
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#F97316',
                borderColor: '#F97316',
                borderRadius: 8,
                height: 38,
                fontWeight: 600,
                color: '#FFFFFF',
                padding: '0 20px',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.28)',
              }}
            >
              Create Slot
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

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
  Upload,
  Tabs,
} from 'antd';
import {
  VideoCameraOutlined,
  PlusOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExportOutlined,
  LinkOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { VideoSlot } from '../mockData';
import {
  resolveVideoUrl,
  parseEmbedUrl,
  DEFAULT_POSTERS,
} from '@/utils/videoRegistry';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

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
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [selectedVideo, setSelectedVideo] = useState<VideoSlot | null>(null);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Upload state for replacement modal
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [replaceSourceType, setReplaceSourceType] = useState<'upload' | 'url'>('upload');

  const [replaceForm] = Form.useForm();
  const [addForm] = Form.useForm();

  // Filtered and searched videos
  const filteredVideos = videos.filter((v) => {
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      !searchText ||
      v.title.toLowerCase().includes(searchLower) ||
      v.slot_label.toLowerCase().includes(searchLower) ||
      v.page_location.toLowerCase().includes(searchLower) ||
      v.description.toLowerCase().includes(searchLower);

    return matchesStatus && matchesSearch;
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

  const handleOpenReplace = (slot: VideoSlot) => {
    setSelectedVideo(slot);
    setUploadedVideoUrl(slot.video_url || '');
    setUploadedFileName('');
    setReplaceSourceType('upload');
    replaceForm.setFieldsValue({
      title: slot.title,
      description: slot.description,
      duration: slot.duration,
      video_url: slot.video_url,
    });
    setIsReplaceModalOpen(true);
  };

  const handleReplaceSubmit = (values: { title: string; description: string; duration: string; video_url?: string }) => {
    if (!selectedVideo) return;

    const finalVideoUrl = uploadedVideoUrl || values.video_url || selectedVideo.video_url || 'welcome';
    const updated: VideoSlot = {
      ...selectedVideo,
      title: values.title,
      description: values.description,
      duration: values.duration,
      video_url: finalVideoUrl,
      status: 'Live',
      updated_at: new Date().toISOString().slice(0, 10),
    };
    onUpdateVideo(updated);
    message.success(`Updated and published film for ${selectedVideo.slot_label}`);
    setIsReplaceModalOpen(false);
    setSelectedVideo(null);
  };

  const handleAddSubmit = (values: { slot_label: string; page_location: string; title: string; description: string; duration: string; video_url?: string }) => {
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
      video_url: values.video_url || 'welcome',
    };
    onAddSlot(newSlot);
    message.success(`Added new video slot: ${values.slot_label}`);
    setIsAddModalOpen(false);
    addForm.resetFields();
  };

  // Helper to get clean route for "View on Website"
  const getCleanRoute = (pageLocation: string) => {
    if (pageLocation.startsWith('/ (Homepage)')) return '/';
    return pageLocation.split(' ')[0] || '/';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ─── Header ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
            Cinematic Videos & Story CMS
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            Direct control over all website films, hero videos, and testimonial reels. Live sync with public pages.
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

      {/* ─── Filter Pills & Search ─── */}
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

        <Input
          placeholder="Search by title, route, or synopsis..."
          prefix={<SearchOutlined style={{ color: '#94A3B8' }} />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          allowClear
          style={{ width: 320, height: 38, borderRadius: 8 }}
        />
      </div>

      {/* ─── Video Slot Cards Grid ─── */}
      <Row gutter={[16, 16]}>
        {paginatedVideos.map((slot) => {
          const poster = slot.thumbnail || DEFAULT_POSTERS[slot.id] || DEFAULT_POSTERS.default;
          const targetRoute = getCleanRoute(slot.page_location);

          return (
            <Col xs={24} md={12} xl={8} key={slot.id}>
              <Card
                bordered={false}
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.02)',
                  border: '1px solid #F1F5F9',
                  borderRadius: 14,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
                styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' } }}
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
                      style={{ borderRadius: 6, fontWeight: 600 }}
                    >
                      {slot.status}
                    </Tag>
                  </div>
                }
              >
                {/* Media Preview Box with Poster Image */}
                <div
                  style={{
                    height: 175,
                    borderRadius: 10,
                    backgroundColor: '#0F172A',
                    backgroundImage: slot.status !== 'Empty' ? `url(${poster})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginBottom: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: slot.status !== 'Empty' ? 'pointer' : 'default',
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                  }}
                  onClick={() => {
                    if (slot.status !== 'Empty') {
                      setSelectedVideo(slot);
                      setIsPreviewModalOpen(true);
                    }
                  }}
                >
                  {/* Subtle darkening tint */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: slot.status !== 'Empty' ? 'rgba(15, 23, 42, 0.45)' : 'transparent',
                      transition: 'background-color 0.2s',
                    }}
                  />

                  {slot.status !== 'Empty' ? (
                    <>
                      <div
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          textAlign: 'center',
                          color: '#fff',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(249, 115, 22, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(249, 115, 22, 0.4)',
                            transition: 'transform 0.2s',
                          }}
                        >
                          <PlayCircleOutlined style={{ fontSize: 28, color: '#FFFFFF', marginLeft: 2 }} />
                        </div>
                        <div style={{ fontSize: 11.5, marginTop: 8, color: '#F1F5F9', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                          Click to preview film
                        </div>
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(4px)',
                          padding: '3px 9px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#FFFFFF',
                          zIndex: 2,
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        {slot.duration}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#94A3B8', position: 'relative', zIndex: 2 }}>
                      <VideoCameraOutlined style={{ fontSize: 32, marginBottom: 6, color: '#64748B' }} />
                      <div style={{ fontSize: 12.5, fontWeight: 500 }}>No film connected yet</div>
                    </div>
                  )}
                </div>

                {/* Slot Details */}
                <div style={{ flex: 1 }}>
                  <Text strong style={{ fontSize: 15, display: 'block', color: '#0F172A', lineHeight: 1.3 }}>
                    {slot.title}
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12.5, marginTop: 4, minHeight: 38, marginBottom: 8 }}>
                    {slot.description}
                  </Paragraph>

                  {/* Target route with View on Site link */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 12,
                      color: '#64748B',
                      marginTop: 8,
                      padding: '8px 10px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: 8,
                      border: '1px solid #F1F5F9',
                    }}
                  >
                    <span>
                      Route: <Text code style={{ fontSize: 11 }}>{slot.page_location}</Text>
                    </span>
                    <a
                      href={targetRoute}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        color: '#F97316',
                        fontWeight: 600,
                        fontSize: 11.5,
                      }}
                    >
                      View on site <ExportOutlined style={{ fontSize: 10 }} />
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, gap: 8 }}>
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
                    onClick={() => handleOpenReplace(slot)}
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
          );
        })}
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
        />
      </div>

      {/* ─── Modal: Replace / Upload Video ─── */}
      <Modal
        title={`Replace Film for ${selectedVideo?.slot_label}`}
        open={isReplaceModalOpen}
        onCancel={() => {
          setIsReplaceModalOpen(false);
          setSelectedVideo(null);
        }}
        footer={null}
        width={680}
        destroyOnClose
      >
        <Form form={replaceForm} layout="vertical" onFinish={handleReplaceSubmit} style={{ marginTop: 12 }}>
          <Tabs
            activeKey={replaceSourceType}
            onChange={(key) => setReplaceSourceType(key as 'upload' | 'url')}
            items={[
              {
                key: 'upload',
                label: (
                  <span>
                    <UploadOutlined /> Select Local Video File
                  </span>
                ),
                children: (
                  <div style={{ marginBottom: 16 }}>
                    <Dragger
                      accept="video/*"
                      maxCount={1}
                      beforeUpload={(file) => {
                        const blobUrl = URL.createObjectURL(file);
                        setUploadedVideoUrl(blobUrl);
                        setUploadedFileName(file.name);
                        replaceForm.setFieldsValue({ video_url: blobUrl });
                        message.success(`Loaded video: ${file.name}`);
                        return false; // prevent default upload POST
                      }}
                      showUploadList={false}
                      style={{ padding: '24px 16px', background: '#F8FAFC', borderRadius: 10, borderColor: '#CBD5E1' }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{ color: '#F97316', fontSize: 44 }} />
                      </p>
                      <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 14 }}>
                        Click or drag MP4, WebM, or MOV file here
                      </p>
                      <p style={{ color: '#64748B', fontSize: 12 }}>
                        Seamlessly load new reel for this website slot
                      </p>
                      {uploadedFileName && (
                        <Tag color="success" style={{ marginTop: 8, padding: '4px 10px', fontSize: 12 }}>
                          Ready: {uploadedFileName}
                        </Tag>
                      )}
                    </Dragger>
                  </div>
                ),
              },
              {
                key: 'url',
                label: (
                  <span>
                    <LinkOutlined /> Video Link / YouTube / CDN
                  </span>
                ),
                children: (
                  <div style={{ marginBottom: 16 }}>
                    <Form.Item
                      name="video_url"
                      label="Direct MP4 URL or YouTube / Vimeo link"
                      help="Supports direct MP4 links (https://...), YouTube (https://youtu.be/...), or Vimeo"
                    >
                      <Input
                        placeholder="e.g. https://www.youtube.com/watch?v=... or https://cdn.../video.mp4"
                        onChange={(e) => setUploadedVideoUrl(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                ),
              },
            ]}
          />

          <Form.Item name="title" label="Film Title" rules={[{ required: true }]}>
            <Input placeholder="Enter film title" />
          </Form.Item>

          <Form.Item name="description" label="Short Synopsis" rules={[{ required: true }]}>
            <Input.TextArea rows={2} placeholder="Brief description of this video feature" />
          </Form.Item>

          <Form.Item name="duration" label="Duration (e.g. 1:45)" rules={[{ required: true }]}>
            <Input placeholder="1:45" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
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
              Save & Go Live
            </Button>
          </div>
        </Form>
      </Modal>

      {/* ─── Modal: Live Interactive Video Preview ─── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <VideoCameraOutlined style={{ color: '#F97316' }} />
            <span>{selectedVideo?.title}</span>
          </div>
        }
        open={isPreviewModalOpen}
        onCancel={() => {
          setIsPreviewModalOpen(false);
          setSelectedVideo(null);
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <a
              href={selectedVideo ? getCleanRoute(selectedVideo.page_location) : '/'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#F97316', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              Open public page <ExportOutlined style={{ fontSize: 11 }} />
            </a>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => {
                setIsPreviewModalOpen(false);
                if (selectedVideo) handleOpenReplace(selectedVideo);
              }}
              style={{ backgroundColor: '#F97316', borderColor: '#F97316', borderRadius: 8, fontWeight: 600 }}
            >
              Replace This Film
            </Button>
          </div>
        }
        width={780}
        destroyOnClose
      >
        {selectedVideo && (
          <div>
            <div
              style={{
                width: '100%',
                height: 420,
                backgroundColor: '#000',
                borderRadius: 10,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {(() => {
                const embed = parseEmbedUrl(selectedVideo.video_url);
                if (embed.isEmbed && embed.embedUrl) {
                  return (
                    <iframe
                      title={selectedVideo.title}
                      src={embed.embedUrl}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }

                return (
                  <video
                    controls
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    src={resolveVideoUrl(selectedVideo.video_url)}
                  />
                );
              })()}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <Tag color="orange" style={{ fontWeight: 600, borderRadius: 6 }}>
                  {selectedVideo.slot_label}
                </Tag>
                <Tag color="blue" style={{ borderRadius: 6 }}>
                  Target: {selectedVideo.page_location}
                </Tag>
                <Tag color={selectedVideo.status === 'Live' ? 'success' : 'default'} style={{ borderRadius: 6 }}>
                  Status: {selectedVideo.status}
                </Tag>
                <span style={{ fontSize: 12, color: '#64748B', marginLeft: 'auto' }}>
                  Duration: <strong>{selectedVideo.duration}</strong> · Updated: {selectedVideo.updated_at}
                </span>
              </div>
              <Paragraph style={{ marginTop: 12, fontSize: 13.5, color: '#334155', lineHeight: 1.6 }}>
                {selectedVideo.description}
              </Paragraph>
            </div>
          </div>
        )}
      </Modal>

      {/* ─── Modal: Add Video Slot ─── */}
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
          <Form.Item name="video_url" label="Initial Video (Optional)">
            <Input placeholder="welcome or YouTube URL" />
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

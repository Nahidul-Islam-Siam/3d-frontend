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
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExportOutlined,
  LinkOutlined,
  InboxOutlined,
  PictureOutlined,
  CloudUploadOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { VideoSlot } from '../mockData';
import {
  resolveVideoUrl,
  parseEmbedUrl,
  DEFAULT_POSTERS,
} from '@/utils/videoRegistry';
import RichTextEditor from '@/components/common/RichTextEditor';

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
  // Page View Modes: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');

  const [statusFilter, setStatusFilter] = useState<'All' | 'Live' | 'Draft' | 'Empty'>('All');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const [selectedVideo, setSelectedVideo] = useState<VideoSlot | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Form states
  const [form] = Form.useForm();
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');
  const [uploadedVideoFileName, setUploadedVideoFileName] = useState<string>('');
  const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState<string>('');
  const [uploadedThumbnailFileName, setUploadedThumbnailFileName] = useState<string>('');
  const [sourceType, setSourceType] = useState<'upload' | 'url'>('upload');
  const [editorHtml, setEditorHtml] = useState<string>('');

  // Filtered and searched videos for grid
  const filteredVideos = videos.filter((v) => {
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    const searchLower = searchText.toLowerCase();
    const matchesSearch =
      !searchText ||
      v.title.toLowerCase().includes(searchLower) ||
      v.slot_label.toLowerCase().includes(searchLower) ||
      v.page_location.toLowerCase().includes(searchLower) ||
      v.description.toLowerCase().includes(searchLower) ||
      (v.category && v.category.toLowerCase().includes(searchLower));

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

  // Navigate to Dedicated Create Page
  const handleOpenCreatePage = () => {
    setSelectedVideo(null);
    setUploadedVideoUrl('');
    setUploadedVideoFileName('');
    setUploadedThumbnailUrl('');
    setUploadedThumbnailFileName('');
    setSourceType('upload');
    setEditorHtml('');
    form.resetFields();
    form.setFieldsValue({
      status: 'Live',
      category: 'General',
      video_type: 'MP4 Video',
      duration: '1:30',
    });
    setViewMode('create');
  };

  // Navigate to Dedicated Edit Page
  const handleOpenEditPage = (slot: VideoSlot) => {
    setSelectedVideo(slot);
    setUploadedVideoUrl(slot.video_url || '');
    setUploadedVideoFileName('');
    setUploadedThumbnailUrl(slot.thumbnail || '');
    setUploadedThumbnailFileName('');
    setSourceType('upload');
    setEditorHtml(slot.description || '');

    form.setFieldsValue({
      slot_label: slot.slot_label,
      page_location: slot.page_location,
      section_anchor: slot.section_anchor || '',
      title: slot.title,
      description: slot.description,
      category: slot.category || 'General',
      video_type: slot.video_type || 'MP4 Video',
      duration: slot.duration,
      status: slot.status,
      thumbnail: slot.thumbnail || '',
      video_url: slot.video_url,
    });
    setViewMode('edit');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedVideo(null);
  };

  // Form Submit for both Create and Edit dedicated pages
  const handleFormSubmit = (values: {
    slot_label: string;
    page_location: string;
    section_anchor?: string;
    title: string;
    category?: VideoSlot['category'];
    video_type?: VideoSlot['video_type'];
    duration: string;
    status: VideoSlot['status'];
    thumbnail?: string;
    video_url?: string;
  }) => {
    const finalVideoUrl = uploadedVideoUrl || values.video_url || 'welcome';
    const finalThumbnail = uploadedThumbnailUrl || values.thumbnail || '';
    const finalDescription = editorHtml || values.title;

    if (viewMode === 'create') {
      const newSlot: VideoSlot = {
        id: `vid-${Date.now().toString().slice(-4)}`,
        slot_label: values.slot_label,
        page_location: values.page_location,
        section_anchor: values.section_anchor || '',
        category: values.category || 'General',
        video_type: values.video_type || 'MP4 Video',
        title: values.title,
        description: finalDescription,
        duration: values.duration || '1:30',
        thumbnail: finalThumbnail,
        views_count: 0,
        featured: false,
        status: values.status || 'Live',
        sort_order: videos.length + 1,
        updated_at: new Date().toISOString().slice(0, 10),
        video_url: finalVideoUrl,
      };
      onAddSlot(newSlot);
      message.success(`Created & Published new video slot: ${values.slot_label}`);
    } else if (viewMode === 'edit' && selectedVideo) {
      const updated: VideoSlot = {
        ...selectedVideo,
        slot_label: values.slot_label,
        page_location: values.page_location,
        section_anchor: values.section_anchor || selectedVideo.section_anchor,
        title: values.title,
        description: finalDescription,
        duration: values.duration,
        category: values.category || selectedVideo.category || 'General',
        video_type: values.video_type || selectedVideo.video_type || 'MP4 Video',
        status: values.status || selectedVideo.status,
        thumbnail: finalThumbnail || selectedVideo.thumbnail,
        video_url: finalVideoUrl,
        updated_at: new Date().toISOString().slice(0, 10),
      };
      onUpdateVideo(updated);
      message.success(`Saved changes for ${selectedVideo.slot_label}`);
    }

    setViewMode('list');
    setSelectedVideo(null);
  };

  // Helper to get clean route for "View on Website"
  const getCleanRoute = (pageLocation: string) => {
    if (pageLocation.startsWith('/ (Homepage)')) return '/';
    return pageLocation.split(' ')[0] || '/';
  };

  // ═════════════════════════════════════════════════════════════════
  // ─── DEDICATED FULL-PAGE VIEW: CREATE OR EDIT VIDEO ───────────────
  // ═════════════════════════════════════════════════════════════════
  if (viewMode === 'create' || viewMode === 'edit') {
    const isEdit = viewMode === 'edit';
    const pageHeading = isEdit
      ? `Edit Film: ${selectedVideo?.slot_label}`
      : 'Upload New Cinematic Film';
    const pageSubheading = isEdit
      ? 'Update video media, narrative description, and frontend target anchors.'
      : 'Create a new website video slot with media uploads and rich description.';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto' }}>
        {/* Top Header Bar with Back Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={handleBackToList}
              title="Back to video list"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 16 }} />
            </button>
            <div>
              <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
                {pageHeading}
              </Title>
              <Paragraph type="secondary" style={{ margin: '3px 0 0 0', fontSize: 13.5 }}>
                {pageSubheading}
              </Paragraph>
            </div>
          </div>

          <Space size="middle">
            <Button
              onClick={handleBackToList}
              style={{ borderRadius: 8, height: 40, borderColor: '#CBD5E1', color: '#475569', fontWeight: 500, padding: '0 18px' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => form.submit()}
              style={{
                backgroundColor: '#F97316',
                borderColor: '#F97316',
                borderRadius: 8,
                height: 40,
                fontWeight: 600,
                color: '#FFFFFF',
                padding: '0 24px',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.28)',
              }}
            >
              {isEdit ? 'Save Changes' : 'Publish Film'}
            </Button>
          </Space>
        </div>

        {/* Main Editor Form in 2-Column Responsive Layout */}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={[24, 24]}>
            {/* ─── LEFT COLUMN: Text, Narrative, & Rich Editor (60%) ─── */}
            <Col xs={24} lg={15}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: 14 }}>
                  <Text strong style={{ fontSize: 16, color: '#0F172A' }}>
                    Film Information & Story Narrative
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 13, margin: '2px 0 0 0' }}>
                    General identification, titles, and public synopsis shown across website reels.
                  </Paragraph>
                </div>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="slot_label"
                      label="Slot Identifier"
                      rules={[{ required: true, message: 'e.g. Welcome Hero' }]}
                      help="Internal reference label (e.g. Welcome Hero, Founder Story)"
                    >
                      <Input placeholder="e.g. Welcome Hero" style={{ height: 40, borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="page_location"
                      label="Website Page Route"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select route" style={{ height: 40 }}>
                        <Option value="/ (Homepage)">/ (Homepage)</Option>
                        <Option value="/experience-the-story">/experience-the-story</Option>
                        <Option value="/who-we-are">/who-we-are</Option>
                        <Option value="/how-we-serve">/how-we-serve</Option>
                        <Option value="/join-the-movement">/join-the-movement</Option>
                        <Option value="/meet-us">/meet-us</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="title"
                  label="Film Title (Public)"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="e.g. The Story Behind the Living Table" style={{ height: 40, borderRadius: 8 }} />
                </Form.Item>

                {/* ─── RICH TEXT EDITOR FOR DESCRIPTION / SYNOPSIS ─── */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>
                      Detailed Story Synopsis & Director Notes
                    </label>
                    <span style={{ fontSize: 11.5, color: '#94A3B8' }}>Rich Text Enabled</span>
                  </div>
                  <RichTextEditor
                    value={editorHtml}
                    onChange={setEditorHtml}
                    placeholder="Describe this film's emotional narrative, background story, and message to the community..."
                    minHeight={220}
                  />
                </div>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="category" label="Mission Pillar / Category">
                      <Select placeholder="Select pillar" style={{ height: 40 }}>
                        <Option value="General">General Mission</Option>
                        <Option value="Community Meals">Community Meals (Food Relief)</Option>
                        <Option value="LEADS Youth Development">LEADS Youth Development</Option>
                        <Option value="Suicide Awareness Showdown">Suicide Awareness Showdown</Option>
                        <Option value="Veterans Support">Veterans Support</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="section_anchor" label="Target Section Anchor (Optional)">
                      <Input placeholder="e.g. #hero-cinema or #documentary" style={{ height: 40, borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="duration" label="Duration (e.g. 1:45)" rules={[{ required: true }]}>
                      <Input placeholder="1:45" style={{ height: 40, borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="video_type" label="Media Provider Type">
                      <Select placeholder="Select media format" style={{ height: 40 }}>
                        <Option value="MP4 Video">MP4 Video File</Option>
                        <Option value="YouTube">YouTube Embed</Option>
                        <Option value="Vimeo">Vimeo Embed</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* ─── RIGHT COLUMN: Video & Poster Uploaders + Status (40%) ─── */}
            <Col xs={24} lg={9}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* 1. Video File Upload Box */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 4, color: '#0F172A' }}>
                    <VideoCameraOutlined style={{ color: '#F97316', marginRight: 6 }} /> Video Media Upload
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12.5, marginBottom: 14 }}>
                    Select MP4/MOV file or paste direct YouTube/Vimeo embed URL.
                  </Paragraph>

                  <Tabs
                    activeKey={sourceType}
                    onChange={(k) => setSourceType(k as 'upload' | 'url')}
                    items={[
                      {
                        key: 'upload',
                        label: <span><UploadOutlined /> File Upload</span>,
                        children: (
                          <div>
                            <Dragger
                              accept="video/mp4,video/webm,video/quicktime"
                              maxCount={1}
                              beforeUpload={(file) => {
                                const blobUrl = URL.createObjectURL(file);
                                setUploadedVideoUrl(blobUrl);
                                setUploadedVideoFileName(file.name);
                                form.setFieldsValue({ video_url: blobUrl });
                                message.success(`Video selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
                                return false;
                              }}
                              showUploadList={false}
                              style={{ padding: '22px 14px', background: '#F8FAFC', borderRadius: 10, borderColor: '#CBD5E1' }}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ color: '#F97316', fontSize: 36 }} />
                              </p>
                              <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0 }}>
                                Drop video file here or click to browse
                              </p>
                              <p style={{ color: '#64748B', fontSize: 11.5, marginTop: 4 }}>
                                MP4, WebM, MOV supported
                              </p>
                              {uploadedVideoFileName && (
                                <Tag color="success" style={{ marginTop: 8, padding: '4px 10px', fontSize: 12 }}>
                                  ✓ Ready: {uploadedVideoFileName}
                                </Tag>
                              )}
                            </Dragger>

                            {/* Mini Video Player Preview */}
                            {uploadedVideoUrl && (
                              <div style={{ marginTop: 14, borderRadius: 10, overflow: 'hidden', height: 160, backgroundColor: '#000' }}>
                                <video
                                  controls
                                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                  src={resolveVideoUrl(uploadedVideoUrl)}
                                />
                              </div>
                            )}
                          </div>
                        ),
                      },
                      {
                        key: 'url',
                        label: <span><LinkOutlined /> Video Link</span>,
                        children: (
                          <Form.Item
                            name="video_url"
                            label="Paste Video Link / Embed"
                            help="Supports YouTube, Vimeo, or CDN URL"
                            style={{ margin: 0 }}
                          >
                            <Input
                              placeholder="e.g. https://www.youtube.com/watch?v=..."
                              onChange={(e) => setUploadedVideoUrl(e.target.value)}
                              style={{ height: 38, borderRadius: 8 }}
                            />
                          </Form.Item>
                        ),
                      },
                    ]}
                  />
                </div>

                {/* 2. Poster / Thumbnail Image Upload Box */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 4, color: '#0F172A' }}>
                    <PictureOutlined style={{ color: '#F97316', marginRight: 6 }} /> Poster & Thumbnail Image
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12.5, marginBottom: 14 }}>
                    Cover photo shown before film starts playing.
                  </Paragraph>

                  <Dragger
                    accept="image/png,image/jpeg,image/webp"
                    maxCount={1}
                    beforeUpload={(file) => {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const res = e.target?.result as string;
                        setUploadedThumbnailUrl(res);
                        setUploadedThumbnailFileName(file.name);
                        form.setFieldsValue({ thumbnail: res });
                        message.success(`Poster image loaded: ${file.name}`);
                      };
                      reader.readAsDataURL(file);
                      return false;
                    }}
                    showUploadList={false}
                    style={{ padding: '16px 12px', background: '#F8FAFC', borderRadius: 10, borderColor: '#CBD5E1' }}
                  >
                    <PictureOutlined style={{ fontSize: 28, color: '#F97316', marginBottom: 4 }} />
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Click or drag thumbnail image</div>
                    <div style={{ fontSize: 11.5, color: '#64748B' }}>PNG, JPG, or WebP</div>
                    {uploadedThumbnailFileName && (
                      <Tag color="orange" style={{ marginTop: 6 }}>
                        ✓ {uploadedThumbnailFileName}
                      </Tag>
                    )}
                  </Dragger>

                  {/* Thumbnail Preview Box */}
                  <div
                    style={{
                      marginTop: 12,
                      height: 120,
                      borderRadius: 10,
                      border: '1px dashed #CBD5E1',
                      backgroundColor: '#F8FAFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundImage: uploadedThumbnailUrl
                        ? `url(${uploadedThumbnailUrl})`
                        : selectedVideo?.thumbnail
                        ? `url(${selectedVideo.thumbnail})`
                        : 'none',
                    }}
                  >
                    {!uploadedThumbnailUrl && !selectedVideo?.thumbnail && (
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>Live Poster Preview</span>
                    )}
                  </div>

                  <Form.Item name="thumbnail" label="Or Poster Image URL" style={{ marginTop: 12, marginBottom: 0 }}>
                    <Input
                      placeholder="https://.../poster.jpg"
                      onChange={(e) => setUploadedThumbnailUrl(e.target.value)}
                      style={{ height: 36, borderRadius: 8 }}
                    />
                  </Form.Item>
                </div>

                {/* 3. Publication Status Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 12, color: '#0F172A' }}>
                    Publishing Status
                  </Text>
                  <Form.Item name="status" initialValue="Live" style={{ margin: 0 }}>
                    <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                      <Radio.Button value="Live" style={{ width: '50%', textAlign: 'center' }}>
                        Live on Site
                      </Radio.Button>
                      <Radio.Button value="Draft" style={{ width: '50%', textAlign: 'center' }}>
                        Draft Slot
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // ─── MAIN LIST VIEW: CARDS ROSTER (GRID) ─────────────────────────
  // ═════════════════════════════════════════════════════════════════
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ─── Header ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
            Cinematic Videos & Reels CMS
          </Title>
          <Paragraph type="secondary" style={{ margin: '4px 0 0 0', fontSize: 14 }}>
            Manage video films, upload media, edit story narratives, and review engagement telemetry.
          </Paragraph>
        </div>
        <Button
          type="primary"
          icon={<CloudUploadOutlined />}
          onClick={handleOpenCreatePage}
          style={{
            backgroundColor: '#F97316',
            borderColor: '#F97316',
            borderRadius: 8,
            height: 40,
            fontWeight: 600,
            padding: '0 20px',
            color: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.28)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          Upload New Video
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
          placeholder="Search by title, pillar, route, or synopsis..."
          prefix={<SearchOutlined style={{ color: '#94A3B8' }} />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          allowClear
          style={{ width: 340, height: 38, borderRadius: 8 }}
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
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: slot.status !== 'Empty' ? 'rgba(15, 23, 42, 0.45)' : 'transparent',
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
                      <VideoCameraOutlined style={{ fontSize: 34, marginBottom: 6, color: '#64748B' }} />
                      <div style={{ fontSize: 12.5, fontWeight: 500 }}>No video uploaded yet</div>
                      <Button
                        size="small"
                        type="primary"
                        icon={<UploadOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditPage(slot);
                        }}
                        style={{ marginTop: 8, backgroundColor: '#F97316', borderColor: '#F97316', borderRadius: 6, fontSize: 12 }}
                      >
                        Upload Video
                      </Button>
                    </div>
                  )}
                </div>

                {/* Slot Details */}
                <div style={{ flex: 1 }}>
                  {/* Category, Provider & Views Tags */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                    {slot.category && (
                      <Tag color="orange" style={{ margin: 0, borderRadius: 6, fontSize: 11, fontWeight: 500 }}>
                        {slot.category}
                      </Tag>
                    )}
                    {slot.video_type && (
                      <Tag color="blue" style={{ margin: 0, borderRadius: 6, fontSize: 11 }}>
                        {slot.video_type}
                      </Tag>
                    )}
                    {slot.views_count !== undefined && slot.views_count > 0 && (
                      <span style={{ fontSize: 11, color: '#64748B', marginLeft: 'auto' }}>
                        👁️ {slot.views_count.toLocaleString()} views
                      </span>
                    )}
                  </div>

                  <Text strong style={{ fontSize: 15, display: 'block', color: '#0F172A', lineHeight: 1.3 }}>
                    {slot.title}
                  </Text>
                  
                  {/* Render clean description text */}
                  <div
                    style={{
                      fontSize: 12.5,
                      color: '#64748B',
                      marginTop: 4,
                      minHeight: 38,
                      marginBottom: 8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                    dangerouslySetInnerHTML={{ __html: slot.description }}
                  />

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
                    <div>
                      <span>Route: <Text code style={{ fontSize: 11 }}>{slot.page_location}</Text></span>
                      {slot.section_anchor && (
                        <span style={{ marginLeft: 6, color: '#94A3B8', fontSize: 11 }}>{slot.section_anchor}</span>
                      )}
                    </div>
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
                    icon={<EditOutlined />}
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
                    onClick={() => handleOpenEditPage(slot)}
                  >
                    Edit & Replace
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
              icon={<EditOutlined />}
              onClick={() => {
                setIsPreviewModalOpen(false);
                if (selectedVideo) handleOpenEditPage(selectedVideo);
              }}
              style={{ backgroundColor: '#F97316', borderColor: '#F97316', borderRadius: 8, fontWeight: 600 }}
            >
              Edit This Film Page
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
              <div
                style={{ marginTop: 12, fontSize: 13.5, color: '#334155', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: selectedVideo.description }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

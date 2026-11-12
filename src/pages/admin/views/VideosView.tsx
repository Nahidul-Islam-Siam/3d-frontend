import { useState } from 'react';
import {
  Alert,
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
  Pagination,
  Upload,
  Tabs,
  Empty,
  Spin,
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
  ReloadOutlined,
} from '@ant-design/icons';
import type { VideoSlot } from '../types';
import {
  resolveVideoUrl,
  parseEmbedUrl,
  DEFAULT_POSTERS,
} from '@/utils/videoRegistry';
import RichTextEditor from '@/components/common/RichTextEditor';
import SafeHtmlContent from '@/components/common/SafeHtmlContent';
import movementService from '@/lib/api/services/movement.service';
import { formatBytes, optimizeImageForUpload } from '@/utils/mediaOptimizer';
import { confirmDelete } from '@/utils/confirmDelete';
import { Progress } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { Option, OptGroup } = Select;
const { Dragger } = Upload;

interface VideoRouteGroup {
  group: string;
  routes: ReadonlyArray<{
    value: string;
    label: string;
    anchors: string;
  }>;
}

const VIDEO_ROUTE_GROUPS: ReadonlyArray<VideoRouteGroup> = [
  {
    group: 'Core Pages',
    routes: [
      { value: '/ (Homepage)', label: '/ (Homepage) — Welcome Stage', anchors: '#rm-chapter-05' },
      { value: '/experience-the-story', label: '/experience-the-story — Experience the Story', anchors: '#story-hero-stage, #documentary-video' },
      { value: '/who-we-are', label: '/who-we-are — Who We Are', anchors: '#who-we-are-video' },
      { value: '/how-we-serve', label: '/how-we-serve — The Hallway Overview', anchors: '#how-we-serve-overview' },
      { value: '/join-the-movement', label: '/join-the-movement — Join the Movement', anchors: '#movement-hero, #movement-second-video, #movement-third-video' },
      { value: '/meet-us', label: '/meet-us — Stewards & Leadership', anchors: '#leadership-spotlight' },
    ],
  },
  {
    group: 'How We Serve — Sub-Routes (Doors)',
    routes: [
      { value: '/how-we-serve/a-place-at-the-table', label: '/how-we-serve/a-place-at-the-table — Door 1: A Place at the Table', anchors: '#table-hero' },
      { value: '/how-we-serve/you-matter', label: '/how-we-serve/you-matter — Door 2: Strong Foundations (You Matter)', anchors: '#you-matter-video-stage, #classroom-moment' },
      { value: '/how-we-serve/stories-that-save-lives', label: '/how-we-serve/stories-that-save-lives — Door 3: Stories That Save Lives', anchors: '#stories-video-stage, #documentary-interlude' },
      { value: '/how-we-serve/welcome-home', label: '/how-we-serve/welcome-home — Door 4: Welcome Home (Veterans)', anchors: '#welcome-home-video-hero, #what-veterans-feel' },
    ],
  },
  {
    group: 'Productions & Action Pages',
    routes: [
      { value: '/suicide-awareness-showdown', label: '/suicide-awareness-showdown — Suicide Awareness Showdown', anchors: '#what-coming-up-next' },
      { value: '/contact', label: '/contact — Connect With Us', anchors: '' },
      { value: '/donate', label: '/donate — Give Hope', anchors: '' },
    ],
  },
];

interface VideosViewProps {
  videos: VideoSlot[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onUpdateVideo: (updated: VideoSlot) => void;
  onAddSlot: (newSlot: VideoSlot) => void;
  onDeleteSlot: (id: string) => void;
}

export default function VideosView({
  videos,
  loading = false,
  error = null,
  onRefresh,
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
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const handleVideoFileUpload = async (file: File) => {
    const allowed = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v'];
    if (!allowed.includes(file.type)) {
      message.error('Unsupported video format. Please upload MP4, WebM, or MOV.');
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      message.error('Video must be under 100MB before Cloudinary optimization.');
      return false;
    }

    setUploadingVideo(true);
    setVideoUploadProgress(0);
    try {
      const uploaded = await movementService.uploadMedia([file], (pct) => {
        setVideoUploadProgress(pct);
      });
      const url = uploaded[0]?.url;
      if (!url) throw new Error('Missing video URL');
      setUploadedVideoUrl(url);
      setUploadedVideoFileName(file.name);
      form.setFieldsValue({ video_url: url });
      message.success(
        `Uploaded & optimized (${formatBytes(file.size)}): ${file.name}`,
      );
    } catch {
      message.error('Video upload failed. Please try again or paste a direct URL.');
    } finally {
      setUploadingVideo(false);
    }
    return false;
  };

  const handleThumbnailFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('Please upload an image file (PNG, JPG, WebP, AVIF).');
      return false;
    }
    if (file.size > 15 * 1024 * 1024) {
      message.error('Source image must be under 15MB.');
      return false;
    }

    setUploadingThumbnail(true);
    try {
      const optimized = await optimizeImageForUpload(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.85,
      });
      const uploaded = await movementService.uploadMedia([optimized.file]);
      const url = uploaded[0]?.url;
      if (!url) throw new Error('Missing thumbnail URL');
      setUploadedThumbnailUrl(url);
      setUploadedThumbnailFileName(optimized.file.name);
      form.setFieldsValue({ thumbnail: url });
      if (optimized.wasCompressed) {
        message.success(
          `Poster optimized (${formatBytes(optimized.originalBytes)} -> ${formatBytes(optimized.optimizedBytes)}) & uploaded!`,
        );
      } else {
        message.success(`Poster uploaded & CDN-optimized: ${optimized.file.name}`);
      }
    } catch {
      message.error('Poster image upload failed. Please try again.');
    } finally {
      setUploadingThumbnail(false);
    }
    return false;
  };
  const [editorHtml, setEditorHtml] = useState<string>('');

  const handleRemoveUploadedVideo = () => {
    setUploadedVideoUrl('');
    setUploadedVideoFileName('');
    form.setFieldsValue({ video_url: '' });
    message.info('Video removed. Upload a new video or paste a link.');
  };

  const handleRemoveThumbnail = () => {
    setUploadedThumbnailUrl('');
    setUploadedThumbnailFileName('');
    form.setFieldsValue({ thumbnail: '' });
    message.info('Thumbnail removed.');
  };

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
    if (selectedVideo?.id === slot.id) {
      setSelectedVideo(updated);
    }
    message.success(
      nextStatus === 'Live'
        ? `${slot.slot_label} published on the website`
        : `${slot.slot_label} unpublished (saved as Draft)`
    );
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
      status: 'Draft',
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
    const finalVideoUrl = (uploadedVideoUrl || values.video_url || '').trim();
    if (!finalVideoUrl) {
      message.error('Please upload a video file or provide a video URL.');
      return;
    }

    const finalThumbnail = (uploadedThumbnailUrl || values.thumbnail || '').trim();
    const finalDescription = editorHtml || values.title;

    if (viewMode === 'create') {
      const initialStatus: VideoSlot['status'] = values.status || 'Draft';
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
        status: initialStatus,
        sort_order: videos.length + 1,
        updated_at: new Date().toISOString().slice(0, 10),
        video_url: finalVideoUrl,
      };
      onAddSlot(newSlot);
      message.success(
        initialStatus === 'Live'
          ? `Created & published video slot: ${values.slot_label}`
          : `Saved "${values.slot_label}" to dashboard (Not Published)`
      );
    } else if (viewMode === 'edit' && selectedVideo) {
      const updated: VideoSlot = {
        ...selectedVideo,
        slot_label: values.slot_label,
        page_location: values.page_location,
        section_anchor: values.section_anchor?.trim() || '',
        title: values.title,
        description: finalDescription,
        duration: values.duration,
        category: values.category || selectedVideo.category || 'General',
        video_type: values.video_type || selectedVideo.video_type || 'MP4 Video',
        status: values.status || selectedVideo.status,
        thumbnail: finalThumbnail,
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
  const getCleanRoute = (pageLocation: string, sectionAnchor?: string) => {
    const raw = (pageLocation || '').trim();
    let base = '/';
    if (!raw.startsWith('/ (Homepage)')) {
      base = raw.split(' ')[0] || '/';
      if (base === '/about' || base === '/experience-story') base = '/experience-the-story';
      if (base === '/movement') base = '/join-the-movement';
    }
    const cleanAnchor = (sectionAnchor || '').trim();
    if (!cleanAnchor) return base;
    const hash = cleanAnchor.startsWith('#') ? cleanAnchor : `#${cleanAnchor}`;
    return `${base}${hash}`;
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
            <Form.Item noStyle shouldUpdate={(prev, cur) => prev.status !== cur.status}>
              {({ getFieldValue }) => {
                const selectedStatus = getFieldValue('status');
                const submitLabel = isEdit
                  ? 'Save Changes'
                  : selectedStatus === 'Live'
                    ? 'Save & Publish'
                    : 'Save to Dashboard';
                return (
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    disabled={uploadingVideo || uploadingThumbnail}
                    loading={uploadingVideo || uploadingThumbnail}
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
                    {submitLabel}
                  </Button>
                );
              }}
            </Form.Item>
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
                      <Select
                        showSearch
                        optionFilterProp="children"
                        placeholder="Select public route or sub-route"
                        style={{ height: 40 }}
                      >
                        {VIDEO_ROUTE_GROUPS.map((grp) => (
                          <OptGroup key={grp.group} label={grp.group}>
                            {grp.routes.map((rt) => (
                              <Option key={rt.value} value={rt.value}>
                                {rt.label}
                              </Option>
                            ))}
                          </OptGroup>
                        ))}
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
                        <Option value="Youth Mentorship">Youth Mentorship (LEADS)</Option>
                        <Option value="Suicide Awareness">Suicide Awareness Showdown</Option>
                        <Option value="Veterans Support">Veterans Support</Option>
                        <Option value="Living Movement">Living Movement</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item noStyle shouldUpdate={(prev, cur) => prev.page_location !== cur.page_location}>
                      {({ getFieldValue }) => {
                        const selectedRoute = getFieldValue('page_location');
                        const matchedRoute = VIDEO_ROUTE_GROUPS.flatMap((g) => g.routes).find(
                          (r) => r.value === selectedRoute
                        );
                        return (
                          <Form.Item
                            name="section_anchor"
                            label="Target Section Anchor (Optional)"
                            help={
                              matchedRoute?.anchors
                                ? `Suggested anchors: ${matchedRoute.anchors}`
                                : 'e.g. #hero-cinema or #documentary'
                            }
                          >
                            <Input placeholder="e.g. #classroom-moment" style={{ height: 40, borderRadius: 8 }} />
                          </Form.Item>
                        );
                      }}
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
                        <Option value="YouTube Embed">YouTube Embed</Option>
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
                              disabled={uploadingVideo}
                              beforeUpload={handleVideoFileUpload}
                              showUploadList={false}
                              style={{ padding: '22px 14px', background: '#F8FAFC', borderRadius: 10, borderColor: '#CBD5E1' }}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{ color: '#F97316', fontSize: 36 }} />
                              </p>
                              <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0 }}>
                                {uploadingVideo ? 'Uploading & optimizing video...' : 'Drop video file here or click to browse'}
                              </p>
                              <p style={{ color: '#64748B', fontSize: 11.5, marginTop: 4 }}>
                                MP4, WebM, MOV up to 100MB · CDN auto-optimized
                              </p>
                              {uploadingVideo && (
                                <div style={{ marginTop: 10, paddingInline: 12 }}>
                                  <Progress percent={videoUploadProgress} size="small" strokeColor="#F97316" />
                                </div>
                              )}
                              {!uploadingVideo && uploadedVideoFileName && (
                                <Tag color="success" style={{ marginTop: 8, padding: '4px 10px', fontSize: 12 }}>
                                  ✓ Uploaded: {uploadedVideoFileName}
                                </Tag>
                              )}
                            </Dragger>

                            {/* Mini Video Player Preview */}
                            {uploadedVideoUrl && (
                              <div style={{ marginTop: 14 }}>
                                <div style={{ borderRadius: 10, overflow: 'hidden', height: 160, backgroundColor: '#000' }}>
                                  <video
                                    controls
                                    preload="none"
                                    poster={uploadedThumbnailUrl || undefined}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    src={resolveVideoUrl(uploadedVideoUrl)}
                                  />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 8 }}>
                                  <Text type="secondary" ellipsis style={{ fontSize: 11.5, maxWidth: '65%' }}>
                                    {uploadedVideoFileName || uploadedVideoUrl}
                                  </Text>
                                  <Button
                                    size="small"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={handleRemoveUploadedVideo}
                                  >
                                    Remove Video
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ),
                      },
                      {
                        key: 'url',
                        label: <span><LinkOutlined /> Video Link</span>,
                        children: (
                          <div>
                            <Form.Item
                              name="video_url"
                              label="Paste Video Link / Embed"
                              help="Supports YouTube, Vimeo, or CDN URL"
                              style={{ margin: 0 }}
                            >
                              <Input
                                allowClear
                                placeholder="e.g. https://www.youtube.com/watch?v=..."
                                onChange={(e) => setUploadedVideoUrl(e.target.value)}
                                style={{ height: 38, borderRadius: 8 }}
                              />
                            </Form.Item>
                            {uploadedVideoUrl && (
                              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                                <Button
                                  size="small"
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={handleRemoveUploadedVideo}
                                >
                                  Remove Video
                                </Button>
                              </div>
                            )}
                          </div>
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
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    maxCount={1}
                    disabled={uploadingThumbnail}
                    beforeUpload={handleThumbnailFileUpload}
                    showUploadList={false}
                    style={{ padding: '16px 12px', background: '#F8FAFC', borderRadius: 10, borderColor: '#CBD5E1' }}
                  >
                    <PictureOutlined style={{ fontSize: 28, color: '#F97316', marginBottom: 4 }} />
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {uploadingThumbnail ? 'Optimizing & uploading poster...' : 'Click or drag thumbnail image'}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748B' }}>PNG, JPG, WebP, AVIF · Auto WebP</div>
                    {!uploadingThumbnail && uploadedThumbnailFileName && (
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
                      position: 'relative',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundImage: uploadedThumbnailUrl
                        ? `url(${uploadedThumbnailUrl})`
                        : 'none',
                    }}
                  >
                    {!uploadedThumbnailUrl && (
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>Live Poster Preview</span>
                    )}
                  </div>

                  {uploadedThumbnailUrl && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, gap: 8 }}>
                      <Text type="secondary" ellipsis style={{ fontSize: 11.5, maxWidth: '60%' }}>
                        {uploadedThumbnailFileName || uploadedThumbnailUrl}
                      </Text>
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={handleRemoveThumbnail}
                      >
                        Remove Thumbnail
                      </Button>
                    </div>
                  )}

                  <Form.Item name="thumbnail" label="Or Poster Image URL" style={{ marginTop: 12, marginBottom: 0 }}>
                    <Input
                      allowClear
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
                  <Text strong style={{ fontSize: 15, display: 'block', marginBottom: 6, color: '#0F172A' }}>
                    Publishing Status
                  </Text>
                  <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 12 }}>
                    Keep as Not Published to preview in dashboard first, or publish live immediately.
                  </Paragraph>
                  <Form.Item name="status" initialValue="Draft" style={{ margin: 0 }}>
                    <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                      <Radio.Button value="Draft" style={{ width: '50%', textAlign: 'center' }}>
                        Not Published
                      </Radio.Button>
                      <Radio.Button value="Live" style={{ width: '50%', textAlign: 'center' }}>
                        Published
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
        <Space>
          {onRefresh && (
            <Button
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={onRefresh}
              style={{ borderRadius: 8, height: 40, borderColor: '#CBD5E1' }}
            >
              Refresh
            </Button>
          )}
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
        </Space>
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
            Published ({videos.filter((v) => v.status === 'Live').length})
          </Radio.Button>
          <Radio.Button value="Draft">
            Not Published ({videos.filter((v) => v.status === 'Draft').length})
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
      {loading && videos.length === 0 ? (
        <div className="admin-saas-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      ) : paginatedVideos.length === 0 ? (
        <div className="admin-saas-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <Empty
            description={
              videos.length === 0
                ? 'No video slots saved in the database yet.'
                : 'No video slots match your current filter.'
            }
          >
            <Button type="primary" onClick={handleOpenCreatePage} style={{ backgroundColor: '#F97316' }}>
              Upload First Video
            </Button>
          </Empty>
        </div>
      ) : (
      <Row gutter={[16, 16]}>
        {paginatedVideos.map((slot) => {
          const poster = slot.thumbnail || DEFAULT_POSTERS[slot.id] || DEFAULT_POSTERS.default;
          const targetRoute = getCleanRoute(slot.page_location, slot.section_anchor);

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
                      {slot.status === 'Live'
                        ? 'Published'
                        : slot.status === 'Draft'
                          ? 'Not Published'
                          : slot.status}
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
                  >
                    <SafeHtmlContent html={slot.description} />
                  </div>

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
                        {slot.status === 'Live' ? 'Unpublish' : 'Publish'}
                      </Button>
                    )}

                    <Button
                      size="small"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      aria-label={`Delete ${slot.slot_label}`}
                      onClick={() =>
                        void confirmDelete({
                          title: 'Delete video slot?',
                          itemName: slot.slot_label,
                          text: 'This removes the video slot from the admin manager.',
                          onConfirm: () => {
                            onDeleteSlot(slot.id);
                            message.success(`Deleted ${slot.slot_label}`);
                          },
                        })
                      }
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
                  </Space>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      )}

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
              href={
                selectedVideo
                  ? getCleanRoute(selectedVideo.page_location, selectedVideo.section_anchor)
                  : '/'
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#F97316', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              Open public page <ExportOutlined style={{ fontSize: 11 }} />
            </a>
            <Space>
              {selectedVideo && selectedVideo.status !== 'Empty' && (
                <Button
                  onClick={() => handleTogglePublish(selectedVideo)}
                  style={
                    selectedVideo.status === 'Live'
                      ? {
                          borderRadius: 8,
                          backgroundColor: '#FEF3C7',
                          borderColor: '#FDE68A',
                          color: '#D97706',
                          fontWeight: 600,
                        }
                      : {
                          borderRadius: 8,
                          backgroundColor: '#ECFDF5',
                          borderColor: '#A7F3D0',
                          color: '#059669',
                          fontWeight: 600,
                        }
                  }
                >
                  {selectedVideo.status === 'Live' ? 'Unpublish' : 'Publish'}
                </Button>
              )}
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
            </Space>
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
                    poster={selectedVideo.thumbnail || undefined}
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
                <Tag color={selectedVideo.status === 'Live' ? 'success' : 'warning'} style={{ borderRadius: 6 }}>
                  Status: {selectedVideo.status === 'Live' ? 'Published' : selectedVideo.status === 'Draft' ? 'Not Published' : selectedVideo.status}
                </Tag>
                <span style={{ fontSize: 12, color: '#64748B', marginLeft: 'auto' }}>
                  Duration: <strong>{selectedVideo.duration}</strong> · Updated: {selectedVideo.updated_at}
                </span>
              </div>
              <div style={{ marginTop: 12, fontSize: 13.5, color: '#334155', lineHeight: 1.6 }}>
                <SafeHtmlContent html={selectedVideo.description} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

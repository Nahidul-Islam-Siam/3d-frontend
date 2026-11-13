import { useState, useEffect, useRef, useCallback, type ChangeEvent, type FormEvent } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Col,
  Input,
  Row,
  Select,
  Skeleton,
  Space,
  Typography,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  CameraOutlined,
  EditOutlined,
  ReloadOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import RichTextEditor from '@/components/common/RichTextEditor';
import SafeHtmlContent from '@/components/common/SafeHtmlContent';
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/api/authApi';
import { useAppSelector } from '@/redux/hooks';
import { useUploadMediaMutation } from '@/redux/service/mediaApi';
import {
  useGetSettingPageQuery,
  useUpdateSettingPageMutation,
} from '@/redux/service/settingsApi';
import { extractApiErrorMessage } from '@/utils/apiError';

const { Title, Text } = Typography;
const { Option } = Select;

export type SettingsSubTab =
  | 'settings-profile'
  | 'settings-password'
  | 'settings-about'
  | 'settings-privacy'
  | 'settings-terms';

interface SettingsViewProps {
  currentSubTab?: string;
  onNavigateSubTab: (sub: string) => void;
}

type CmsSubTab = 'settings-about' | 'settings-privacy' | 'settings-terms';

interface CmsPageConfig {
  slug: string;
  title: string;
  editTitle: string;
  placeholder: string;
  saveLabel: string;
}

const CMS_PAGE_CONFIG: Record<CmsSubTab, CmsPageConfig> = {
  'settings-about': {
    slug: 'about-us',
    title: 'About us',
    editTitle: 'Edit about us',
    placeholder: 'Write organization background, core pillars, and community impact...',
    saveLabel: 'About us',
  },
  'settings-privacy': {
    slug: 'privacy-policy',
    title: 'Privacy policy',
    editTitle: 'Edit privacy policy',
    placeholder: 'Write privacy policy details, data handling, and donor protections...',
    saveLabel: 'Privacy policy',
  },
  'settings-terms': {
    slug: 'terms-and-conditions',
    title: 'Terms and condition',
    editTitle: 'Edit terms and condition',
    placeholder: 'Write terms and conditions, conduct guidelines, and participation rules...',
    saveLabel: 'Terms and conditions',
  },
};

const ALLOWED_AVATAR_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const E164_PHONE_REGEX = /^\+[1-9]\d{6,14}$/;

const COUNTRY_OPTIONS = [
  { value: 'US United States', dialCode: '+1', codeOption: 'US +1' },
  { value: 'CA Canada', dialCode: '+1', codeOption: 'CA +1' },
  { value: 'GB United Kingdom', dialCode: '+44', codeOption: 'GB +44' },
  { value: 'BD Bangladesh', dialCode: '+880', codeOption: 'BD +880' },
] as const;

function getDialCode(countryCodeOption: string): string {
  const match = countryCodeOption.match(/(\+\d+)/);
  return match ? match[1] : '+1';
}

function parseUserPhone(rawPhone?: string): {
  country: string;
  countryCode: string;
  localPhone: string;
} {
  const cleaned = (rawPhone || '').replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('+880')) {
    return { country: 'BD Bangladesh', countryCode: 'BD +880', localPhone: cleaned.slice(4) };
  }
  if (cleaned.startsWith('+44')) {
    return { country: 'GB United Kingdom', countryCode: 'GB +44', localPhone: cleaned.slice(3) };
  }
  if (cleaned.startsWith('+1')) {
    return { country: 'US United States', countryCode: 'US +1', localPhone: cleaned.slice(2) };
  }
  return { country: 'US United States', countryCode: 'US +1', localPhone: rawPhone || '' };
}

function getInitials(name?: string): string {
  const parts = (name || 'Admin').trim().split(/\s+/).filter(Boolean);
  return parts
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getApiErrorMessage(err: unknown, fallback: string): string {
  return extractApiErrorMessage(err, fallback);
}

function extractPlainTextLength(html: string): number {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  return (parsed.body.textContent || '').trim().length;
}

interface CmsSettingSectionProps {
  config: CmsPageConfig;
  isAuthenticated: boolean;
  onBack: () => void;
}

function CmsSettingSection({ config, isAuthenticated, onBack }: CmsSettingSectionProps) {
  const {
    data: pageData,
    isLoading,
    isFetching,
    isError,
    error: queryError,
    refetch,
  } = useGetSettingPageQuery(config.slug);
  const [updateSettingPage, { isLoading: saving }] = useUpdateSettingPageMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [savedHtml, setSavedHtml] = useState('');
  const [draftHtml, setDraftHtml] = useState('');

  const loading = isLoading || isFetching;
  const loadError = isError
    ? getApiErrorMessage(queryError, `Failed to load ${config.title.toLowerCase()}.`)
    : null;

  useEffect(() => {
    setIsEditing(false);
    setSavedHtml('');
    setDraftHtml('');
  }, [config.slug]);

  useEffect(() => {
    if (pageData) {
      const html = pageData.htmlContent || '';
      setSavedHtml(html);
      setDraftHtml(html);
    }
  }, [pageData]);

  const handleStartEdit = () => {
    setDraftHtml(savedHtml);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setDraftHtml(savedHtml);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      message.warning('Please sign in with an administrator account to save page content.');
      return;
    }

    const trimmedHtml = draftHtml.trim();
    if (trimmedHtml.length < 10 || extractPlainTextLength(trimmedHtml) === 0) {
      message.error('Content must contain at least 10 characters before saving.');
      return;
    }

    try {
      const updated = await updateSettingPage({
        slug: config.slug,
        body: { htmlContent: trimmedHtml },
      }).unwrap();
      const nextHtml = updated?.htmlContent ?? trimmedHtml;
      setSavedHtml(nextHtml);
      setDraftHtml(nextHtml);
      setIsEditing(false);
      message.success(`${config.saveLabel} updated successfully`);
    } catch (err) {
      message.error(getApiErrorMessage(err, `Failed to update ${config.title.toLowerCase()}.`));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            type="button"
            onClick={() => {
              if (isEditing) handleCancelEdit();
              else onBack();
            }}
            aria-label={isEditing ? 'Cancel editing' : 'Back to profile'}
            title="Back"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
              cursor: 'pointer',
            }}
          >
            <ArrowLeftOutlined style={{ fontSize: 16 }} />
          </button>
          <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
            {isEditing ? config.editTitle : config.title}
          </Title>
        </div>

        {!isEditing ? (
          <Button
            icon={<EditOutlined />}
            onClick={handleStartEdit}
            disabled={loading}
            style={{
              borderRadius: 10,
              height: 38,
              borderColor: '#E2E8F0',
              color: '#334155',
              fontWeight: 500,
            }}
          >
            Edit
          </Button>
        ) : (
          <Space>
            <Button
              type="primary"
              loading={saving}
              onClick={() => void handleSave()}
              style={{
                backgroundColor: '#0EA5E9',
                borderRadius: 10,
                height: 38,
                fontWeight: 600,
              }}
            >
              Save changes
            </Button>
            <Button
              onClick={handleCancelEdit}
              disabled={saving}
              style={{
                borderRadius: 10,
                height: 38,
                borderColor: '#E2E8F0',
              }}
            >
              Cancel
            </Button>
          </Space>
        )}
      </div>

      {!isAuthenticated && (
        <Alert
          type="info"
          showIcon
          title="Sign in with an admin account to publish CMS page updates to the live website."
        />
      )}

      {loadError && (
        <Alert
          type="error"
          showIcon
          title={loadError}
          action={
            <Button size="small" icon={<ReloadOutlined />} onClick={() => void refetch()}>
              Retry
            </Button>
          }
        />
      )}

      <div
        className="admin-saas-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          border: '1px solid #F1F5F9',
          overflow: 'hidden',
          padding: '28px 32px',
        }}
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : isEditing ? (
          <RichTextEditor
            value={draftHtml}
            onChange={setDraftHtml}
            placeholder={config.placeholder}
            minHeight={340}
            ariaLabel={config.editTitle}
          />
        ) : savedHtml.trim() ? (
          <SafeHtmlContent html={savedHtml} className="rich-text-content" />
        ) : (
          <Text type="secondary">No content published yet. Click Edit to add page copy.</Text>
        )}
      </div>
    </div>
  );
}

export default function SettingsView({
  currentSubTab = 'settings-profile',
  onNavigateSubTab,
}: SettingsViewProps) {
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth);
  const canPersist = Boolean(isAuthenticated && token);

  useGetProfileQuery(undefined, { skip: !canPersist });
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [changePasswordMutation] = useChangePasswordMutation();
  const [uploadMedia] = useUploadMediaMutation();

  const activeTab: SettingsSubTab =
    currentSubTab === 'settings' || currentSubTab === 'settings-profile'
      ? 'settings-profile'
      : (currentSubTab as SettingsSubTab);

  // ─── 1. Profile / Personal Information & Avatar State ───
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    country: 'US United States',
    countryCode: 'US +1',
    phone: '',
  });
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>('');
  const [pendingAvatar, setPendingAvatar] = useState<{ url: string; publicId?: string } | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const revokePreviewObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  useEffect(() => revokePreviewObjectUrl, [revokePreviewObjectUrl]);

  useEffect(() => {
    if (!user) return;
    const parsedPhone = parseUserPhone(user.phone);
    setProfile({
      name: user.name || '',
      email: user.email || '',
      country: parsedPhone.country,
      countryCode: parsedPhone.countryCode,
      phone: parsedPhone.localPhone,
    });
  }, [user]);

  const handleAvatarFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!canPersist) {
      message.warning('Please sign in to upload and save your profile avatar.');
      e.target.value = '';
      return;
    }

    if (!ALLOWED_AVATAR_TYPES.has(file.type)) {
      message.error('Please upload a PNG, JPG, or WebP image file.');
      e.target.value = '';
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      message.error('Avatar image must be 5MB or smaller.');
      e.target.value = '';
      return;
    }

    revokePreviewObjectUrl();
    const localPreview = URL.createObjectURL(file);
    objectUrlRef.current = localPreview;
    setAvatarPreviewUrl(localPreview);
    setUploadingAvatar(true);

    try {
      const uploaded = await uploadMedia({ files: [file] }).unwrap();
      const media = uploaded[0];
      if (!media?.url) {
        throw new Error('Upload succeeded without returning an image URL.');
      }

      const avatarPayload = {
        url: media.url,
        ...(media.publicId ? { publicId: media.publicId } : {}),
      };
      setPendingAvatar(avatarPayload);

      await updateProfileMutation({ avatar: avatarPayload }).unwrap();
      revokePreviewObjectUrl();
      setAvatarPreviewUrl('');
      setPendingAvatar(null);
      message.success('Profile avatar updated successfully');
    } catch (err) {
      revokePreviewObjectUrl();
      setAvatarPreviewUrl('');
      setPendingAvatar(null);
      message.error(getApiErrorMessage(err, 'Failed to upload profile avatar.'));
    } finally {
      setUploadingAvatar(false);
      e.target.value = '';
    }
  };

  const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canPersist) {
      message.warning('Please sign in to save profile changes.');
      return;
    }

    const trimmedName = profile.name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      message.error('Name must be between 2 and 50 characters.');
      return;
    }

    const rawPhone = profile.phone.trim();
    let formattedPhone = '';
    if (rawPhone) {
      if (rawPhone.startsWith('+')) {
        formattedPhone = rawPhone.replace(/[\s\-()]/g, '');
      } else {
        const digits = rawPhone.replace(/\D/g, '');
        formattedPhone = `${getDialCode(profile.countryCode)}${digits}`;
      }

      if (!E164_PHONE_REGEX.test(formattedPhone)) {
        message.error('Please enter a valid phone number with country code.');
        return;
      }
    }

    setSavingProfile(true);
    try {
      await updateProfileMutation({
        name: trimmedName,
        phone: formattedPhone,
        ...(pendingAvatar ? { avatar: pendingAvatar } : {}),
      }).unwrap();
      setPendingAvatar(null);
      message.success('Personal information updated successfully');
    } catch (err) {
      message.error(getApiErrorMessage(err, 'Failed to update personal information.'));
    } finally {
      setSavingProfile(false);
    }
  };

  // ─── 2. Change Password State ───
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPassword, setSavingPassword] = useState(false);

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canPersist) {
      message.warning('Please sign in to update your password.');
      return;
    }

    if (passwordForm.currentPassword.length < 8) {
      message.error('Current password must be at least 8 characters.');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      message.error('New password must be at least 8 characters.');
      return;
    }
    if (passwordForm.newPassword === passwordForm.currentPassword) {
      message.error('New password cannot be the same as your current password.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      message.error('Passwords do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      await changePasswordMutation({
        oldPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      message.success('Password updated successfully');
    } catch (err) {
      message.error(getApiErrorMessage(err, 'Failed to update password.'));
    } finally {
      setSavingPassword(false);
    }
  };

  const displayedAvatar = avatarPreviewUrl || pendingAvatar?.url || user?.avatar || '';
  const activeCmsConfig =
    activeTab === 'settings-about' ||
    activeTab === 'settings-privacy' ||
    activeTab === 'settings-terms'
      ? CMS_PAGE_CONFIG[activeTab]
      : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100 }}>
      {/* ─── TAB 1: Personal Information (Profile & Avatar Upload) ─── */}
      {activeTab === 'settings-profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={() => onNavigateSubTab('overview')}
              aria-label="Back to overview"
              title="Back"
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 16 }} />
            </button>
            <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
              Profile
            </Title>
          </div>

          {!canPersist && (
            <Alert
              type="info"
              showIcon
              title="Sign in with an administrator account to load and save live profile and avatar updates."
            />
          )}

          <div
            className="admin-saas-card"
            style={{
              padding: '36px',
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              boxShadow: '0 4px 25px -4px rgba(15, 23, 42, 0.04)',
            }}
          >
            <Row gutter={[40, 28]} align="top">
              {/* Left Column: Avatar Uploader */}
              <Col xs={24} md={7}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    {displayedAvatar ? (
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '3px solid #F1F5F9',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                          backgroundColor: '#F8FAFC',
                        }}
                      >
                        <img
                          src={displayedAvatar}
                          alt={`${profile.name || 'User'} avatar`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <Avatar
                        size={120}
                        style={{
                          backgroundColor: '#F97316',
                          fontSize: 34,
                          fontWeight: 700,
                          border: '3px solid #F1F5F9',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                        }}
                      >
                        {getInitials(profile.name)}
                      </Avatar>
                    )}

                    <Button
                      type="primary"
                      shape="circle"
                      size="small"
                      icon={<CameraOutlined />}
                      loading={uploadingAvatar}
                      onClick={() => avatarInputRef.current?.click()}
                      aria-label="Upload profile avatar"
                      style={{
                        position: 'absolute',
                        right: 4,
                        bottom: 4,
                        backgroundColor: '#0EA5E9',
                        borderColor: '#FFFFFF',
                        borderWidth: 2,
                        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.18)',
                      }}
                    />
                  </div>

                  <input
                    ref={avatarInputRef}
                    id="admin-avatar-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    tabIndex={-1}
                    className="visually-hidden"
                    aria-describedby="avatar-upload-hint"
                    onChange={(e) => void handleAvatarFileChange(e)}
                  />

                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>
                      {user?.role ? user.role.replace('_', ' ') : 'Profile'}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginTop: 2 }}>
                      {profile.name || 'Administrator'}
                    </div>
                  </div>

                  <Button
                    icon={<UploadOutlined />}
                    loading={uploadingAvatar}
                    onClick={() => avatarInputRef.current?.click()}
                    style={{
                      marginTop: 14,
                      borderRadius: 10,
                      borderColor: '#E2E8F0',
                      color: '#334155',
                      fontWeight: 500,
                    }}
                  >
                    {uploadingAvatar
                      ? 'Uploading...'
                      : displayedAvatar
                        ? 'Change Photo'
                        : 'Upload Photo'}
                  </Button>
                  <Text
                    id="avatar-upload-hint"
                    type="secondary"
                    style={{ fontSize: 11.5, marginTop: 6 }}
                  >
                    PNG, JPG, or WebP (max 5MB)
                  </Text>
                </div>
              </Col>

              {/* Right Column: Profile Form Fields */}
              <Col xs={24} md={17}>
                <form
                  onSubmit={(e) => void handleSaveProfile(e)}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  <div>
                    <label
                      htmlFor="profile-name"
                      style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                    >
                      Name
                    </label>
                    <Input
                      id="profile-name"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={50}
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Enter your full name"
                      style={{
                        height: 48,
                        borderRadius: 12,
                        borderColor: '#E2E8F0',
                        fontSize: 14,
                        color: '#0F172A',
                        padding: '0 16px',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-email"
                      style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                    >
                      Email
                    </label>
                    <Input
                      id="profile-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={profile.email}
                      readOnly
                      disabled
                      aria-describedby="profile-email-note"
                      style={{
                        height: 48,
                        borderRadius: 12,
                        borderColor: '#E2E8F0',
                        fontSize: 14,
                        padding: '0 16px',
                      }}
                    />
                    <Text id="profile-email-note" type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 6 }}>
                      Email address is managed by authentication and cannot be edited here.
                    </Text>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-country"
                      style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                    >
                      Country
                    </label>
                    <Select
                      id="profile-country"
                      value={profile.country}
                      onChange={(val) => {
                        const matched = COUNTRY_OPTIONS.find((item) => item.value === val);
                        setProfile({
                          ...profile,
                          country: val,
                          countryCode: matched ? matched.codeOption : profile.countryCode,
                        });
                      }}
                      style={{ width: '100%', height: 48 }}
                      classNames={{ popup: { root: 'rounded-xl' } }}
                    >
                      {COUNTRY_OPTIONS.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.value}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-phone"
                      style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                    >
                      Phone No.
                    </label>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Select
                        aria-label="Country calling code"
                        value={profile.countryCode}
                        onChange={(val) => setProfile({ ...profile, countryCode: val })}
                        style={{ width: 140, height: 48 }}
                      >
                        <Option value="BD +880">BD +880</Option>
                        <Option value="US +1">US +1</Option>
                        <Option value="CA +1">CA +1</Option>
                        <Option value="GB +44">GB +44</Option>
                      </Select>
                      <Input
                        id="profile-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel-national"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="555 382 9012"
                        style={{
                          flex: 1,
                          height: 48,
                          borderRadius: 12,
                          borderColor: '#E2E8F0',
                          fontSize: 14,
                          color: '#0F172A',
                          padding: '0 16px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={savingProfile}
                      style={{
                        backgroundColor: '#F97316',
                        borderRadius: 10,
                        height: 44,
                        padding: '0 28px',
                        fontWeight: 600,
                        boxShadow: '0 2px 10px rgba(249,115,22,0.3)',
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Change Password ─── */}
      {activeTab === 'settings-password' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={() => onNavigateSubTab('settings-profile')}
              aria-label="Back to profile"
              title="Back"
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                cursor: 'pointer',
              }}
            >
              <ArrowLeftOutlined style={{ fontSize: 16 }} />
            </button>
            <Title level={3} style={{ margin: 0, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.3px' }}>
              Change password
            </Title>
          </div>

          {!canPersist && (
            <Alert
              type="info"
              showIcon
              title="Please sign in before changing your account password."
            />
          )}

          <div
            className="admin-saas-card"
            style={{
              padding: '36px',
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              maxWidth: 600,
            }}
          >
            <form
              onSubmit={(e) => void handleUpdatePassword(e)}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div>
                <label
                  htmlFor="current-password"
                  style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                >
                  Current Password
                </label>
                <Input.Password
                  id="current-password"
                  name="currentPassword"
                  autoComplete="current-password"
                  required
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  style={{ height: 48, borderRadius: 12, borderColor: '#E2E8F0' }}
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                >
                  New Password
                </label>
                <Input.Password
                  id="new-password"
                  name="newPassword"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  aria-describedby="new-password-hint"
                  placeholder="Enter at least 8 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  style={{ height: 48, borderRadius: 12, borderColor: '#E2E8F0' }}
                />
                <Text id="new-password-hint" type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 6 }}>
                  Minimum 8 characters and different from your current password.
                </Text>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}
                >
                  Confirm New Password
                </label>
                <Input.Password
                  id="confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  style={{ height: 48, borderRadius: 12, borderColor: '#E2E8F0' }}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={savingPassword}
                  style={{
                    backgroundColor: '#F97316',
                    borderRadius: 10,
                    height: 44,
                    padding: '0 28px',
                    fontWeight: 600,
                    boxShadow: '0 2px 10px rgba(249,115,22,0.3)',
                  }}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── TABS 3–5: About Us, Privacy Policy & Terms and Conditions ─── */}
      {activeCmsConfig && (
        <CmsSettingSection
          config={activeCmsConfig}
          isAuthenticated={canPersist}
          onBack={() => onNavigateSubTab('settings-profile')}
        />
      )}
    </div>
  );
}

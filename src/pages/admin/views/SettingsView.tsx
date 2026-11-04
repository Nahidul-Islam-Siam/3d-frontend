import { useState } from 'react';
import {
  Button,
  Input,
  Select,
  Space,
  Typography,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import defaultAvatar from '../../../assets/meet-us/sarah-mitchell.png';

const { Title } = Typography;
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

export default function SettingsView({
  currentSubTab = 'settings-profile',
  onNavigateSubTab,
}: SettingsViewProps) {
  // Normalize sub-tab
  const activeTab: SettingsSubTab =
    currentSubTab === 'settings' || currentSubTab === 'settings-profile'
      ? 'settings-profile'
      : (currentSubTab as SettingsSubTab);

  // ─── 1. Profile / Personal Information State ───
  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin@gmail.com',
    country: 'GB United Kingdom',
    countryCode: 'BD +880',
    phone: '1772593924',
    avatar: defaultAvatar,
  });

  const handleSaveProfile = () => {
    message.success('Personal information updated successfully');
  };

  // ─── 2. Change Password State ───
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleUpdatePassword = () => {
    if (!passwordForm.currentPassword) {
      message.error('Please enter current password');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      message.error('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    message.success('Password updated successfully');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // ─── 3. About Us State (View & Edit Modes) ───
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutContent, setAboutContent] = useState(`About Live Achieve Believe

Live Achieve Believe, Inc. (LAB) is a faith-rooted, Tampa Bay-based 501(c)(3) nonprofit dedicated to strengthening lives and building a community where everyone feels seen, heard, valued, and supported. We unite volunteers, culinary masters, civic partners, and donors around a singular conviction: dignity is non-negotiable.

Our Core Pillars & Capabilities

Multi-Tier Community Feast Initiative: Certified commercial kitchen partnerships serving nutrient-dense, chef-prepared hot dinners to families experiencing food insecurity, veterans in transition, and displaced neighbors with table-side hospitality.
LEADS Youth Mentorship: After-school tutoring, executive life skills training, character-building athletic leagues, and collegiate access assistance for under-resourced youth.
Suicide Awareness Showdown: Annual inter-community creative showcase bringing performing arts, clinical mental health counseling, and destigmatizing dialogues directly to youth and families.
Veterans Dignity & Housing Bridge: Direct emergency relocation assistance, military transition peer groups, and essential home furnishing provisions.

Our Commitment to Transparency & Stewardship

At Live Achieve Believe, 100% of public individual contributions are allocated directly to program execution and community dinner provisions. We operate under rigorous 501(c)(3) federal oversight with open-book financial reporting.`);

  // ─── 4. Privacy Policy State (View & Edit Modes) ───
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);
  const [privacyContent, setPrivacyContent] = useState(`Privacy Policy for Live Achieve Believe

Last updated: November 2026

Live Achieve Believe ("we", "us", or "our") respects your privacy and is committed to protecting the personal information you share with us.

1. Information We Collect
We collect personal information when you register as a donor, apply as a volunteer, RSVP for community dinners, or subscribe to our newsletter. This includes your name, email, phone number, mailing address, and payment information processed through secure PCI-compliant processors (Stripe).

2. Donor Data Protection & Non-Commercial Guarantee
We will never sell, rent, trade, or share your personal donor information with any outside commercial entities or marketing brokers. All donor data is used solely for tax receipt issuance, stewardship updates, and mission transparency.

3. Security Measures
We employ industry-standard encryption protocols (TLS 1.3), secure cloud vaults, and multi-factor authentication across all administrative systems to safeguard personal data.`);

  // ─── 5. Terms and Conditions State (View & Edit Modes) ───
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [termsContent, setTermsContent] = useState(`Terms and Conditions

Last updated: November 2026

By accessing the Live Achieve Believe website, participating in our community suppers, or donating to our initiatives, you agree to comply with and be bound by the following terms.

1. Tax-Deductible Contributions
Live Achieve Believe is recognized by the IRS as a tax-exempt charitable organization under Section 501(c)(3) of the Internal Revenue Code. All financial donations made through our platforms are tax-deductible to the fullest extent permitted by law.

2. Community Event & Dinner Conduct
Our banquets and gatherings are safe, dignified spaces dedicated to community fellowship. We uphold a zero-tolerance policy against discrimination, harassment, substance misuse, or disruptive conduct at all physical events.

3. Volunteer Participation & Clearances
Volunteers working with vulnerable populations or minors agree to standard background screenings and must follow the volunteer code of conduct.`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100 }}>
      {/* ─── TAB 1: Personal Information (Profile) ─── */}
      {activeTab === 'settings-profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={() => onNavigateSubTab('overview')}
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

          {/* Profile Card (1:1 with Image 2) */}
          <div
            className="admin-saas-card"
            style={{
              padding: '36px 36px',
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              boxShadow: '0 4px 25px -4px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 200px) 1fr',
                gap: 40,
                alignItems: 'flex-start',
              }}
            >
              {/* Left Column: Avatar & Profile Title */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #F1F5F9',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    backgroundColor: '#F8FAFC',
                    position: 'relative',
                  }}
                >
                  <img
                    src={profile.avatar}
                    alt="Profile Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Profile</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginTop: 2 }}>
                    {profile.name.toLowerCase()}
                  </div>
                </div>
              </div>

              {/* Right Column: Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                    Name
                  </label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
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

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                    Email
                  </label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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

                {/* Country */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                    Country
                  </label>
                  <Select
                    value={profile.country}
                    onChange={(val) => setProfile({ ...profile, country: val })}
                    style={{
                      width: '100%',
                      height: 48,
                    }}
                    popupClassName="rounded-xl"
                  >
                    <Option value="GB United Kingdom">GB United Kingdom</Option>
                    <Option value="US United States">US United States</Option>
                    <Option value="CA Canada">CA Canada</Option>
                    <Option value="BD Bangladesh">BD Bangladesh</Option>
                  </Select>
                </div>

                {/* Phone No. */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                    Phone No.
                  </label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Select
                      value={profile.countryCode}
                      onChange={(val) => setProfile({ ...profile, countryCode: val })}
                      style={{ width: 140, height: 48 }}
                    >
                      <Option value="BD +880">BD +880</Option>
                      <Option value="US +1">US +1</Option>
                      <Option value="GB +44">GB +44</Option>
                    </Select>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
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

                {/* Submit Button */}
                <div style={{ marginTop: 10 }}>
                  <Button
                    type="primary"
                    onClick={handleSaveProfile}
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Change Password ─── */}
      {activeTab === 'settings-password' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              type="button"
              onClick={() => onNavigateSubTab('settings-profile')}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                  Current Password
                </label>
                <Input.Password
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  style={{ height: 48, borderRadius: 12, borderColor: '#E2E8F0' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                  New Password
                </label>
                <Input.Password
                  placeholder="Enter at least 6 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  style={{ height: 48, borderRadius: 12, borderColor: '#E2E8F0' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 8 }}>
                  Confirm New Password
                </label>
                <Input.Password
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  style={{ height: 48, borderRadius: 12, borderColor: '#E2E8F0' }}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <Button
                  type="primary"
                  onClick={handleUpdatePassword}
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
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: About Us (View & Edit matching Images 3 & 4) ─── */}
      {activeTab === 'settings-about' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                type="button"
                onClick={() => {
                  if (isEditingAbout) setIsEditingAbout(false);
                  else onNavigateSubTab('settings-profile');
                }}
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
                {isEditingAbout ? 'Edit about us' : 'About us'}
              </Title>
            </div>

            {/* Right Buttons */}
            {!isEditingAbout ? (
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditingAbout(true)}
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
                  onClick={() => {
                    setIsEditingAbout(false);
                    message.success('About us content saved successfully');
                  }}
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
                  onClick={() => setIsEditingAbout(false)}
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

          {/* Content Card (View or Edit Toolbar) */}
          <div
            className="admin-saas-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              overflow: 'hidden',
            }}
          >
            {isEditingAbout && (
              /* Rich Text Editor Toolbar (Matching Image 4) */
              <div
                style={{
                  backgroundColor: '#0EA5E9',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                  color: '#FFFFFF',
                }}
              >
                <UndoOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <RedoOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>H1</span>
                <span style={{ fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>H2</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <BoldOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <ItalicOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <UnderlineOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <StrikethroughOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <span style={{ opacity: 0.3 }}>|</span>
                <AlignLeftOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <AlignCenterOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <AlignRightOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <span style={{ opacity: 0.3 }}>|</span>
                <UnorderedListOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <OrderedListOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <LinkOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
              </div>
            )}

            <div style={{ padding: '32px' }}>
              {!isEditingAbout ? (
                <div style={{ lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-wrap', fontSize: 14 }}>
                  {aboutContent}
                </div>
              ) : (
                <Input.TextArea
                  rows={14}
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  style={{
                    border: 'none',
                    boxShadow: 'none',
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: '#1E293B',
                    padding: 0,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: Privacy Policy ─── */}
      {activeTab === 'settings-privacy' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                type="button"
                onClick={() => {
                  if (isEditingPrivacy) setIsEditingPrivacy(false);
                  else onNavigateSubTab('settings-profile');
                }}
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
                {isEditingPrivacy ? 'Edit privacy policy' : 'Privacy policy'}
              </Title>
            </div>

            {!isEditingPrivacy ? (
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditingPrivacy(true)}
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
                  onClick={() => {
                    setIsEditingPrivacy(false);
                    message.success('Privacy policy saved successfully');
                  }}
                  style={{
                    backgroundColor: '#0EA5E9',
                    borderRadius: 10,
                    height: 38,
                    fontWeight: 600,
                  }}
                >
                  Save changes
                </Button>
                <Button onClick={() => setIsEditingPrivacy(false)} style={{ borderRadius: 10, height: 38 }}>
                  Cancel
                </Button>
              </Space>
            )}
          </div>

          <div
            className="admin-saas-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              overflow: 'hidden',
            }}
          >
            {isEditingPrivacy && (
              <div
                style={{
                  backgroundColor: '#0EA5E9',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#FFFFFF',
                }}
              >
                <UndoOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <RedoOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <span style={{ opacity: 0.3 }}>|</span>
                <BoldOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <ItalicOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <UnderlineOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
              </div>
            )}

            <div style={{ padding: '32px' }}>
              {!isEditingPrivacy ? (
                <div style={{ lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-wrap', fontSize: 14 }}>
                  {privacyContent}
                </div>
              ) : (
                <Input.TextArea
                  rows={12}
                  value={privacyContent}
                  onChange={(e) => setPrivacyContent(e.target.value)}
                  style={{ border: 'none', boxShadow: 'none', fontSize: 14, lineHeight: 1.8, padding: 0 }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 5: Terms and Condition ─── */}
      {activeTab === 'settings-terms' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                type="button"
                onClick={() => {
                  if (isEditingTerms) setIsEditingTerms(false);
                  else onNavigateSubTab('settings-profile');
                }}
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
                {isEditingTerms ? 'Edit terms and condition' : 'Terms and condition'}
              </Title>
            </div>

            {!isEditingTerms ? (
              <Button
                icon={<EditOutlined />}
                onClick={() => setIsEditingTerms(true)}
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
                  onClick={() => {
                    setIsEditingTerms(false);
                    message.success('Terms and conditions saved successfully');
                  }}
                  style={{
                    backgroundColor: '#0EA5E9',
                    borderRadius: 10,
                    height: 38,
                    fontWeight: 600,
                  }}
                >
                  Save changes
                </Button>
                <Button onClick={() => setIsEditingTerms(false)} style={{ borderRadius: 10, height: 38 }}>
                  Cancel
                </Button>
              </Space>
            )}
          </div>

          <div
            className="admin-saas-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              border: '1px solid #F1F5F9',
              overflow: 'hidden',
            }}
          >
            {isEditingTerms && (
              <div
                style={{
                  backgroundColor: '#0EA5E9',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#FFFFFF',
                }}
              >
                <UndoOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <RedoOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <span style={{ opacity: 0.3 }}>|</span>
                <BoldOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <ItalicOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
                <UnderlineOutlined style={{ fontSize: 15, cursor: 'pointer' }} />
              </div>
            )}

            <div style={{ padding: '32px' }}>
              {!isEditingTerms ? (
                <div style={{ lineHeight: 1.8, color: '#334155', whiteSpace: 'pre-wrap', fontSize: 14 }}>
                  {termsContent}
                </div>
              ) : (
                <Input.TextArea
                  rows={12}
                  value={termsContent}
                  onChange={(e) => setTermsContent(e.target.value)}
                  style={{ border: 'none', boxShadow: 'none', fontSize: 14, lineHeight: 1.8, padding: 0 }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

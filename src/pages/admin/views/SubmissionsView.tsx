import { useState, useMemo } from 'react';
import {
  Card,
  Tabs,
  Table,
  Tag,
  Space,
  Button,
  Typography,
  Input,
  Select,
  Drawer,
  Descriptions,
  message,
} from 'antd';
import { Mic, Award, Mail, Eye, Trash2, Search } from 'lucide-react';
import movementService from '@/lib/api/services/movement.service';
import { confirmDelete } from '@/utils/confirmDelete';

const { Title, Text, Paragraph } = Typography;

export interface AuditionItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  talentType: string;
  mediaLink?: string;
  experience?: string;
  admin_notes?: string;
  status: 'Pending' | 'Shortlisted' | 'Selected' | 'Declined';
  createdAt?: string;
}

export interface SponsorItem {
  id: string;
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  tier: string;
  program?: string;
  notes?: string;
  admin_notes?: string;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Declined';
  createdAt?: string;
}

export interface InquiryItem {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  category: string;
  subject?: string;
  message: string;
  admin_notes?: string;
  status: 'New' | 'In Review' | 'Resolved';
  createdAt?: string;
}

export type SubmissionSubTab = 'auditions' | 'sponsors' | 'inquiries';

interface SubmissionsViewProps {
  activeTab: SubmissionSubTab;
  onTabChange: (tab: SubmissionSubTab) => void;
  loadingTab: SubmissionSubTab | null;
  loadedTabs: Record<SubmissionSubTab, boolean>;
  auditions: AuditionItem[];
  sponsors: SponsorItem[];
  inquiries: InquiryItem[];
  isAuthenticated: boolean;
  onRefresh: (tab: SubmissionSubTab) => void;
}

type SelectedSubmission =
  | { kind: 'auditions'; item: AuditionItem }
  | { kind: 'sponsors'; item: SponsorItem }
  | { kind: 'inquiries'; item: InquiryItem }
  | null;

const TAB_STATUS_OPTIONS: Record<SubmissionSubTab, string[]> = {
  auditions: ['Pending', 'Shortlisted', 'Selected', 'Declined'],
  sponsors: ['Pending', 'Contacted', 'Confirmed', 'Declined'],
  inquiries: ['New', 'In Review', 'Resolved'],
};

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'N/A';
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? dateStr : parsed.toLocaleString();
}

export default function SubmissionsView({
  activeTab,
  onTabChange,
  loadingTab,
  loadedTabs,
  auditions,
  sponsors,
  inquiries,
  isAuthenticated,
  onRefresh,
}: SubmissionsViewProps) {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [selected, setSelected] = useState<SelectedSubmission>(null);
  const [drawerNotes, setDrawerNotes] = useState('');

  const openDetails = (entry: NonNullable<SelectedSubmission>) => {
    setSelected(entry);
    setDrawerNotes(entry.item.admin_notes || '');
  };

  const updateStatus = async (
    endpoint: SubmissionSubTab,
    id: string,
    status: string,
    notes?: string,
  ) => {
    setBusyId(id);
    try {
      await movementService.updateSubmissionStatus(endpoint, id, status, notes);
      message.success(`Submission marked as ${status}.`);
      if (selected && selected.kind === endpoint && selected.item.id === id) {
        setSelected({
          kind: endpoint,
          item: {
            ...selected.item,
            status,
            ...(notes !== undefined ? { admin_notes: notes } : {}),
          },
        } as NonNullable<SelectedSubmission>);
      }
      onRefresh(endpoint);
    } catch {
      message.error('Failed to update submission status.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (
    endpoint: SubmissionSubTab,
    id: string,
    title: string,
    itemName?: string
  ) => {
    const confirmed = await confirmDelete({
      title,
      itemName,
      text: 'This permanently deletes the submission record.',
    });
    if (!confirmed) return;

    setBusyId(id);
    try {
      await movementService.deleteSubmission(endpoint, id);
      message.success('Submission removed.');
      if (selected && selected.item.id === id) {
        setSelected(null);
      }
      onRefresh(endpoint);
    } catch {
      message.error('Failed to delete submission.');
    } finally {
      setBusyId(null);
    }
  };

  const filteredAuditions = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return auditions.filter((a) => {
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.talentType.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [auditions, searchText, statusFilter]);

  const filteredSponsors = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return sponsors.filter((s) => {
      const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchesSearch =
        !q ||
        s.organizationName.toLowerCase().includes(q) ||
        s.contactName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.tier.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [sponsors, searchText, statusFilter]);

  const filteredInquiries = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
      const fullName = `${inq.firstName} ${inq.lastName || ''}`.toLowerCase();
      const matchesSearch =
        !q ||
        fullName.includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.category.toLowerCase().includes(q) ||
        (inq.subject || '').toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, searchText, statusFilter]);

  const auditionColumns = [
    {
      title: 'Performer',
      key: 'name',
      render: (_: unknown, r: AuditionItem) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{r.email} · {r.phone}</div>
        </div>
      ),
    },
    {
      title: 'Talent',
      dataIndex: 'talentType',
      key: 'talentType',
      render: (t: string) => <Tag color="purple">{t}</Tag>,
    },
    {
      title: 'Media / Link',
      dataIndex: 'mediaLink',
      key: 'mediaLink',
      render: (url: string) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#C2410C', fontWeight: 500 }}>
            View Reel
          </a>
        ) : (
          <Text type="secondary">None</Text>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'Selected' ? 'green' : s === 'Shortlisted' ? 'blue' : s === 'Declined' ? 'red' : 'orange'}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, r: AuditionItem) => (
        <Space size="small" wrap>
          <Button
            size="small"
            icon={<Eye size={13} aria-hidden="true" />}
            aria-label={`View details for ${r.name}`}
            onClick={() => openDetails({ kind: 'auditions', item: r })}
          >
            Details
          </Button>
          <Button
            size="small"
            loading={busyId === r.id}
            disabled={r.status === 'Shortlisted'}
            onClick={() => updateStatus('auditions', r.id, 'Shortlisted')}
          >
            Shortlist
          </Button>
          <Button
            size="small"
            type="primary"
            loading={busyId === r.id}
            disabled={r.status === 'Selected'}
            onClick={() => updateStatus('auditions', r.id, 'Selected')}
          >
            Select
          </Button>
          <Button
            size="small"
            danger
            loading={busyId === r.id}
            disabled={r.status === 'Declined'}
            onClick={() => updateStatus('auditions', r.id, 'Declined')}
          >
            Decline
          </Button>
          <Button
            size="small"
            danger
            type="text"
            loading={busyId === r.id}
            icon={<Trash2 size={14} aria-hidden="true" />}
            aria-label={`Delete audition from ${r.name}`}
            onClick={() => void handleDelete('auditions', r.id, 'Delete audition application?', r.name)}
          />
        </Space>
      ),
    },
  ];

  const sponsorColumns = [
    {
      title: 'Organization & Contact',
      key: 'org',
      render: (_: unknown, r: SponsorItem) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.organizationName}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{r.contactName} · {r.email}</div>
        </div>
      ),
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
      key: 'tier',
      render: (t: string) => <Tag color="gold">{t.toUpperCase()}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'Confirmed' ? 'green' : s === 'Contacted' ? 'blue' : s === 'Declined' ? 'red' : 'orange'}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, r: SponsorItem) => (
        <Space size="small" wrap>
          <Button
            size="small"
            icon={<Eye size={13} aria-hidden="true" />}
            aria-label={`View details for ${r.organizationName}`}
            onClick={() => openDetails({ kind: 'sponsors', item: r })}
          >
            Details
          </Button>
          <Button
            size="small"
            loading={busyId === r.id}
            disabled={r.status === 'Contacted'}
            onClick={() => updateStatus('sponsors', r.id, 'Contacted')}
          >
            Contacted
          </Button>
          <Button
            size="small"
            type="primary"
            loading={busyId === r.id}
            disabled={r.status === 'Confirmed'}
            onClick={() => updateStatus('sponsors', r.id, 'Confirmed')}
          >
            Confirm
          </Button>
          <Button
            size="small"
            danger
            loading={busyId === r.id}
            disabled={r.status === 'Declined'}
            onClick={() => updateStatus('sponsors', r.id, 'Declined')}
          >
            Decline
          </Button>
          <Button
            size="small"
            danger
            type="text"
            loading={busyId === r.id}
            icon={<Trash2 size={14} aria-hidden="true" />}
            aria-label={`Delete sponsor ${r.organizationName}`}
            onClick={() =>
              void handleDelete('sponsors', r.id, 'Delete sponsor record?', r.organizationName)
            }
          />
        </Space>
      ),
    },
  ];

  const inquiryColumns = [
    {
      title: 'Sender',
      key: 'sender',
      render: (_: unknown, r: InquiryItem) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.firstName} {r.lastName}</div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{r.email}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (c: string) => <Tag color="cyan">{c}</Tag>,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={s === 'Resolved' ? 'green' : s === 'In Review' ? 'blue' : 'orange'}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, r: InquiryItem) => (
        <Space size="small" wrap>
          <Button
            size="small"
            icon={<Eye size={13} aria-hidden="true" />}
            aria-label={`View inquiry from ${r.firstName} ${r.lastName || ''}`.trim()}
            onClick={() => openDetails({ kind: 'inquiries', item: r })}
          >
            Details
          </Button>
          <Button
            size="small"
            loading={busyId === r.id}
            disabled={r.status === 'In Review'}
            onClick={() => updateStatus('inquiries', r.id, 'In Review')}
          >
            Review
          </Button>
          <Button
            size="small"
            type="primary"
            loading={busyId === r.id}
            disabled={r.status === 'Resolved'}
            onClick={() => updateStatus('inquiries', r.id, 'Resolved')}
          >
            Resolve
          </Button>
          <Button
            size="small"
            danger
            type="text"
            loading={busyId === r.id}
            icon={<Trash2 size={14} aria-hidden="true" />}
            aria-label={`Delete inquiry from ${r.firstName}`}
            onClick={() =>
              void handleDelete(
                'inquiries',
                r.id,
                'Delete contact inquiry?',
                `${r.firstName} ${r.lastName || ''}`.trim()
              )
            }
          />
        </Space>
      ),
    },
  ];

  const handleTabSwitch = (key: string) => {
    setStatusFilter('All');
    setSearchText('');
    onTabChange(key as SubmissionSubTab);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Showdown, Sponsor & Community Inquiries</Title>
          <Text type="secondary">
            {isAuthenticated
              ? 'Synced live with MongoDB backend endpoints (/auditions, /sponsors, /inquiries).'
              : 'Sign in with an Admin account to load and triage live form submissions.'}
          </Text>
        </div>
        {isAuthenticated && (
          <Button loading={loadingTab === activeTab} onClick={() => onRefresh(activeTab)}>
            Refresh Live Data
          </Button>
        )}
      </div>

      <Card bordered={false} className="admin-saas-card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <Input
            allowClear
            prefix={<Search size={14} color="#64748B" aria-hidden="true" />}
            placeholder={`Search ${activeTab} by name, email, category...`}
            aria-label={`Search ${activeTab}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 280 }}
          />
          <Space>
            <label htmlFor="submission-status-filter" style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>
              Status:
            </label>
            <Select
              id="submission-status-filter"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 160 }}
              options={[
                { value: 'All', label: 'All Statuses' },
                ...TAB_STATUS_OPTIONS[activeTab].map((s) => ({ value: s, label: s })),
              ]}
            />
          </Space>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={handleTabSwitch}
          items={[
            {
              key: 'auditions',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Mic size={14} aria-hidden="true" /> Auditions{loadedTabs.auditions ? ` (${auditions.length})` : ''}
                </span>
              ),
              children: (
                <Table
                  className="admin-saas-table"
                  rowKey="id"
                  loading={loadingTab === 'auditions'}
                  dataSource={filteredAuditions}
                  columns={auditionColumns}
                  pagination={{ pageSize: 8 }}
                  scroll={{ x: 'max-content' }}
                  locale={{ emptyText: 'No audition submissions found.' }}
                />
              ),
            },
            {
              key: 'sponsors',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Award size={14} aria-hidden="true" /> Sponsors{loadedTabs.sponsors ? ` (${sponsors.length})` : ''}
                </span>
              ),
              children: (
                <Table
                  className="admin-saas-table"
                  rowKey="id"
                  loading={loadingTab === 'sponsors'}
                  dataSource={filteredSponsors}
                  columns={sponsorColumns}
                  pagination={{ pageSize: 8 }}
                  scroll={{ x: 'max-content' }}
                  locale={{ emptyText: 'No sponsor submissions found.' }}
                />
              ),
            },
            {
              key: 'inquiries',
              label: (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={14} aria-hidden="true" /> Contact & Housing{loadedTabs.inquiries ? ` (${inquiries.length})` : ''}
                </span>
              ),
              children: (
                <Table
                  className="admin-saas-table"
                  rowKey="id"
                  loading={loadingTab === 'inquiries'}
                  dataSource={filteredInquiries}
                  columns={inquiryColumns}
                  pagination={{ pageSize: 8 }}
                  scroll={{ x: 'max-content' }}
                  locale={{ emptyText: 'No contact or housing inquiries found.' }}
                />
              ),
            },
          ]}
        />
      </Card>

      <Drawer
        title={
          selected
            ? selected.kind === 'auditions'
              ? `Audition: ${selected.item.name}`
              : selected.kind === 'sponsors'
                ? `Sponsor: ${selected.item.organizationName}`
                : `Inquiry: ${selected.item.firstName} ${selected.item.lastName || ''}`.trim()
            : 'Submission Details'
        }
        placement="right"
        width={480}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Descriptions column={1} bordered size="small">
              {selected.kind === 'auditions' && (
                <>
                  <Descriptions.Item label="Performer">{selected.item.name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{selected.item.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{selected.item.phone}</Descriptions.Item>
                  <Descriptions.Item label="Talent Type">{selected.item.talentType}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag>{selected.item.status}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Media Link">
                    {selected.item.mediaLink ? (
                      <a
                        href={selected.item.mediaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#C2410C', fontWeight: 500 }}
                      >
                        {selected.item.mediaLink}
                      </a>
                    ) : (
                      'None'
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Submitted">{formatDate(selected.item.createdAt)}</Descriptions.Item>
                </>
              )}
              {selected.kind === 'sponsors' && (
                <>
                  <Descriptions.Item label="Organization">{selected.item.organizationName}</Descriptions.Item>
                  <Descriptions.Item label="Contact Person">{selected.item.contactName}</Descriptions.Item>
                  <Descriptions.Item label="Email">{selected.item.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{selected.item.phone}</Descriptions.Item>
                  <Descriptions.Item label="Tier">{selected.item.tier.toUpperCase()}</Descriptions.Item>
                  <Descriptions.Item label="Program">{selected.item.program || 'General'}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag>{selected.item.status}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Submitted">{formatDate(selected.item.createdAt)}</Descriptions.Item>
                </>
              )}
              {selected.kind === 'inquiries' && (
                <>
                  <Descriptions.Item label="Sender">
                    {selected.item.firstName} {selected.item.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">{selected.item.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{selected.item.phone || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Category">{selected.item.category}</Descriptions.Item>
                  <Descriptions.Item label="Subject">{selected.item.subject || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag>{selected.item.status}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Submitted">{formatDate(selected.item.createdAt)}</Descriptions.Item>
                </>
              )}
            </Descriptions>

            {(selected.kind === 'auditions' && selected.item.experience) ||
            (selected.kind === 'sponsors' && selected.item.notes) ||
            selected.kind === 'inquiries' ? (
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#0F172A' }}>
                  {selected.kind === 'auditions'
                    ? 'Experience & Bio'
                    : selected.kind === 'sponsors'
                      ? 'Sponsor Notes'
                      : 'Full Message'}
                </div>
                <Paragraph
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: 12,
                    borderRadius: 8,
                    border: '1px solid #E2E8F0',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {selected.kind === 'auditions'
                    ? selected.item.experience
                    : selected.kind === 'sponsors'
                      ? selected.item.notes
                      : selected.item.message}
                </Paragraph>
              </div>
            ) : null}

            <div>
              <label
                htmlFor="submission-admin-notes"
                style={{ display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#0F172A' }}
              >
                Internal Admin Notes
              </label>
              <Input.TextArea
                id="submission-admin-notes"
                rows={3}
                value={drawerNotes}
                onChange={(e) => setDrawerNotes(e.target.value)}
                placeholder="Add follow-up notes or review comments..."
              />
            </div>

            <Space wrap>
              <Button
                loading={busyId === selected.item.id}
                onClick={() =>
                  updateStatus(selected.kind, selected.item.id, selected.item.status, drawerNotes)
                }
              >
                Save Notes
              </Button>
              {TAB_STATUS_OPTIONS[selected.kind].map((st) => (
                <Button
                  key={st}
                  type={selected.item.status === st ? 'primary' : 'default'}
                  danger={st === 'Declined'}
                  loading={busyId === selected.item.id}
                  onClick={() => updateStatus(selected.kind, selected.item.id, st, drawerNotes)}
                >
                  Mark {st}
                </Button>
              ))}
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
}


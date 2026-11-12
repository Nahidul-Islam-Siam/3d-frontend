import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, HeartHandshake, RefreshCw, ShieldCheck } from 'lucide-react';
import Seo from '@/components/Seo';
import SafeHtmlContent from '@/components/common/SafeHtmlContent';
import { usePublicSettingPage } from '@/lib/hooks/usePublicCms';

export type SettingSlug = 'privacy-policy' | 'terms-and-conditions' | 'about-us';

export interface CmsSettingPublicPageProps {
  slug: SettingSlug;
  defaultTitle: string;
  description: string;
  fallbackHtml?: string;
}

const SLUG_META: Record<
  SettingSlug,
  { badge: string; Icon: typeof ShieldCheck }
> = {
  'privacy-policy': {
    badge: 'Trust & Privacy',
    Icon: ShieldCheck,
  },
  'terms-and-conditions': {
    badge: 'Community Guidelines',
    Icon: FileText,
  },
  'about-us': {
    badge: 'Our Mission',
    Icon: HeartHandshake,
  },
};

function formatUpdatedDate(iso?: string): string | null {
  if (!iso) return null;
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function CmsSettingPublicPage({
  slug,
  defaultTitle,
  description,
  fallbackHtml,
}: CmsSettingPublicPageProps) {
  const { page, loading, error, refresh } = usePublicSettingPage(slug, {
    title: defaultTitle,
    htmlContent: fallbackHtml || '',
  });

  const { badge, Icon } = SLUG_META[slug];
  const resolvedTitle = page?.title?.trim() || defaultTitle;
  const resolvedHtml = page?.htmlContent?.trim() || fallbackHtml || '';
  const updatedLabel = formatUpdatedDate(page?.updatedAt);

  return (
    <>
      <Seo title={`${resolvedTitle} — Live Achieve Believe`} description={description} />

      <div className="min-h-screen bg-[#FAF4E6] text-[#2C261E] pt-24 sm:pt-28 pb-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#EA580C] text-xs font-semibold uppercase tracking-widest">
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {badge}
            </span>

            <h1
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-5xl font-bold text-[#18181B] tracking-tight"
            >
              {resolvedTitle}
            </h1>

            {updatedLabel && (
              <p className="text-xs sm:text-sm text-[#6E6259]">
                Last updated {updatedLabel}
              </p>
            )}
          </div>

          <article className="bg-white rounded-3xl p-7 sm:p-12 shadow-xl border border-[#e7d8bc]">
            {loading && !resolvedHtml ? (
              <div className="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading page content">
                <div className="h-5 w-2/5 rounded bg-stone-200" />
                <div className="h-4 w-full rounded bg-stone-100" />
                <div className="h-4 w-11/12 rounded bg-stone-100" />
                <div className="h-4 w-4/5 rounded bg-stone-100" />
                <div className="h-4 w-full rounded bg-stone-100" />
              </div>
            ) : error && !resolvedHtml ? (
              <div className="py-8 text-center space-y-4">
                <p className="text-sm text-stone-600">{error}</p>
                <button
                  type="button"
                  onClick={() => void refresh()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  Retry
                </button>
              </div>
            ) : (
              <SafeHtmlContent
                html={resolvedHtml}
                className="rich-text-content text-[15px] sm:text-base leading-relaxed text-[#433A31]"
              />
            )}
          </article>

          <nav
            aria-label="Policy and mission links"
            className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs sm:text-sm text-[#5A4F44]"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-medium hover:text-[#F97316] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Home
            </Link>

            <div className="flex flex-wrap items-center gap-5">
              {slug !== 'about-us' && (
                <Link to="/about-us" className="hover:text-[#F97316] transition-colors">
                  About Us
                </Link>
              )}
              {slug !== 'privacy-policy' && (
                <Link to="/privacy" className="hover:text-[#F97316] transition-colors">
                  Privacy Policy
                </Link>
              )}
              {slug !== 'terms-and-conditions' && (
                <Link to="/terms" className="hover:text-[#F97316] transition-colors">
                  Terms and Condition
                </Link>
              )}
              <Link to="/contact" className="hover:text-[#F97316] transition-colors">
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}


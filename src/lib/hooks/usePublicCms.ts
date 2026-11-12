import { useState, useEffect, useCallback, useRef } from 'react';
import movementService from '@/lib/api/services/movement.service';
import type { VideoSlot, EventItem } from '@/pages/admin/types';
import { resolveVideoUrl, parseEmbedUrl } from '@/utils/videoRegistry';

const CACHE_TTL_MS = 60_000;

let cachedVideos: VideoSlot[] | null = null;
let cachedVideosAt = 0;
let videosInFlight: Promise<VideoSlot[]> | null = null;

let cachedEvents: EventItem[] | null = null;
let cachedEventsAt = 0;
let eventsInFlight: Promise<EventItem[]> | null = null;

export interface PublicSettingPage {
  _id?: string;
  slug: string;
  title: string;
  htmlContent: string;
  isPublished?: boolean;
  updatedAt?: string;
}

const settingCache = new Map<string, { data: PublicSettingPage; cachedAt: number }>();
const settingInFlight = new Map<string, Promise<PublicSettingPage>>();

export function invalidatePublicSettingCache(slug?: string): void {
  if (slug) {
    settingCache.delete(slug);
  } else {
    settingCache.clear();
  }
}

export function invalidatePublicVideosCache(): void {
  cachedVideos = null;
  cachedVideosAt = 0;
}

export function invalidatePublicEventsCache(): void {
  cachedEvents = null;
  cachedEventsAt = 0;
}

function normalizePagePath(path?: string): string {
  const raw = (path || '').trim().toLowerCase();
  if (!raw) return '';
  if (raw.startsWith('/ (')) return '/';

  const clean = raw.split(' ')[0].split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
  if (clean === '/' || clean === '/welcome') return '/';
  if (clean === '/about' || clean === '/experience-story') return '/experience-the-story';
  if (clean === '/movement') return '/join-the-movement';
  if (clean === '/a-place-at-the-table') return '/how-we-serve/a-place-at-the-table';
  if (clean === '/you-matter') return '/how-we-serve/you-matter';
  if (clean === '/stories-that-save-lives') return '/how-we-serve/stories-that-save-lives';
  if (clean === '/welcome-home') return '/how-we-serve/welcome-home';
  if (clean === '/showdown') return '/suicide-awareness-showdown';
  if (clean === '/give-hope') return '/donate';
  return clean;
}

async function fetchPublicVideos(force = false): Promise<VideoSlot[]> {
  const fresh = !force && cachedVideos && Date.now() - cachedVideosAt < CACHE_TTL_MS;
  if (fresh && cachedVideos) return cachedVideos;
  if (!force && videosInFlight) return videosInFlight;

  videosInFlight = movementService
    .getVideos()
    .then((list) => {
      cachedVideos = list;
      cachedVideosAt = Date.now();
      return list;
    })
    .catch(() => cachedVideos ?? [])
    .finally(() => {
      videosInFlight = null;
    });

  return videosInFlight;
}

async function fetchPublicEvents(force = false): Promise<EventItem[]> {
  const fresh = !force && cachedEvents && Date.now() - cachedEventsAt < CACHE_TTL_MS;
  if (fresh && cachedEvents) return cachedEvents;
  if (!force && eventsInFlight) return eventsInFlight;

  eventsInFlight = movementService
    .getEvents()
    .then((list) => {
      cachedEvents = list;
      cachedEventsAt = Date.now();
      return list;
    })
    .catch(() => cachedEvents ?? [])
    .finally(() => {
      eventsInFlight = null;
    });

  return eventsInFlight;
}

export interface PublicVideoSlotOptions {
  pagePaths: string[];
  slotMatchers?: string[];
  slotIndex?: number;
  fallbackUrl: string;
  fallbackPoster?: string;
}

export function usePublicVideoSlot({
  pagePaths,
  slotMatchers = [],
  slotIndex = 0,
  fallbackUrl,
  fallbackPoster,
}: PublicVideoSlotOptions) {
  const [matchedSlot, setMatchedSlot] = useState<VideoSlot | null>(null);

  const pageKey = pagePaths.join('|');
  const matcherKey = slotMatchers.join('|');

  useEffect(() => {
    let active = true;
    const targetPaths = pageKey
      .split('|')
      .filter(Boolean)
      .map(normalizePagePath);
    const matchers = matcherKey
      .split('|')
      .filter(Boolean)
      .map((m) => m.toLowerCase());

    void fetchPublicVideos().then((allVideos) => {
      if (!active) return;

      const liveVideos = allVideos
        .filter((v) => v.status === 'Live' && Boolean(v.video_url?.trim()))
        .sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99));

      const pageMatches = liveVideos.filter((v) =>
        targetPaths.includes(normalizePagePath(v.page_location))
      );

      let chosen: VideoSlot | undefined;
      if (matchers.length > 0) {
        chosen = pageMatches.find((v) => {
          const hay = `${v.slot_label || ''} ${v.section_anchor || ''} ${v.title || ''}`.toLowerCase();
          return matchers.some((m) => hay.includes(m));
        });
      }

      if (!chosen && pageMatches[slotIndex]) {
        chosen = pageMatches[slotIndex];
      }

      setMatchedSlot(chosen ?? null);
    });

    return () => {
      active = false;
    };
  }, [pageKey, matcherKey, slotIndex]);

  const rawUrl = matchedSlot?.video_url;
  const embed = parseEmbedUrl(rawUrl);

  return {
    videoUrl: rawUrl && !embed.isEmbed ? resolveVideoUrl(rawUrl) : fallbackUrl,
    posterUrl: matchedSlot?.thumbnail || fallbackPoster,
    embedUrl: embed.isEmbed ? embed.embedUrl : undefined,
    slot: matchedSlot,
  };
}

export function usePublicEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (force = true) => {
    setLoading(true);
    try {
      const list = await fetchPublicEvents(force);
      const visible = list
        .filter((evt) => evt.status === 'Upcoming' || evt.status === 'Happening now')
        .sort((a, b) => (a.event_date || '').localeCompare(b.event_date || ''));
      setEvents(visible);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh(false);
  }, [refresh]);

  return { events, loading, refresh };
}

async function fetchPublicSettingPage(slug: string, force = false): Promise<PublicSettingPage> {
  const cached = settingCache.get(slug);
  if (!force && cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return cached.data;
  }

  const pending = !force ? settingInFlight.get(slug) : undefined;
  if (pending) return pending;

  const request = movementService
    .getSettingPage(slug)
    .then((data) => {
      const normalized: PublicSettingPage = {
        _id: data?._id,
        slug: data?.slug || slug,
        title: data?.title || '',
        htmlContent: data?.htmlContent || '',
        isPublished: data?.isPublished,
        updatedAt: data?.updatedAt,
      };
      settingCache.set(slug, { data: normalized, cachedAt: Date.now() });
      return normalized;
    })
    .finally(() => {
      settingInFlight.delete(slug);
    });

  settingInFlight.set(slug, request);
  return request;
}

export function usePublicSettingPage(
  slug: string,
  fallback?: { title: string; htmlContent: string }
) {
  const cached = settingCache.get(slug)?.data ?? null;
  const [page, setPage] = useState<PublicSettingPage | null>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  const fallbackTitle = fallback?.title ?? '';
  const fallbackHtml = fallback?.htmlContent ?? '';
  const latestSlugRef = useRef(slug);
  latestSlugRef.current = slug;

  const refresh = useCallback(
    async (force = true) => {
      const requestedSlug = slug;
      const nextCached = settingCache.get(requestedSlug)?.data ?? null;
      if (!force) {
        setPage(nextCached);
      }
      setLoading(!nextCached || force);
      setError(null);
      try {
        const data = await fetchPublicSettingPage(requestedSlug, force);
        if (latestSlugRef.current !== requestedSlug) return;
        setPage(data);
      } catch {
        if (latestSlugRef.current !== requestedSlug) return;
        setError('Unable to load page content right now. Please try again.');
        setPage((prev) =>
          prev?.slug === requestedSlug
            ? prev
            : fallbackHtml
              ? { slug: requestedSlug, title: fallbackTitle, htmlContent: fallbackHtml }
              : null
        );
      } finally {
        if (latestSlugRef.current === requestedSlug) {
          setLoading(false);
        }
      }
    },
    [slug, fallbackTitle, fallbackHtml]
  );

  useEffect(() => {
    void refresh(false);
  }, [refresh]);

  return { page, loading, error, refresh };
}

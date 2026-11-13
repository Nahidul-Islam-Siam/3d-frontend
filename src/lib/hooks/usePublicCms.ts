import { useCallback, useMemo } from 'react';
import type { EventItem, VideoSlot } from '@/pages/admin/types';
import { baseApi } from '@/redux/api/baseApi';
import { store } from '@/redux/store';
import { useGetVideosQuery } from '@/redux/service/videosApi';
import { useGetEventsQuery } from '@/redux/service/eventsApi';
import { useGetSettingPageQuery } from '@/redux/service/settingsApi';
import type { PublicSettingPage } from '@/redux/service/types';
import { parseEmbedUrl, resolveVideoUrl } from '@/utils/videoRegistry';

export type { PublicSettingPage };

export function invalidatePublicSettingCache(slug?: string): void {
  store.dispatch(
    baseApi.util.invalidateTags(
      slug ? [{ type: 'Settings', id: slug }] : ['Settings'],
    ),
  );
}

export function invalidatePublicVideosCache(): void {
  store.dispatch(baseApi.util.invalidateTags(['Videos']));
}

export function invalidatePublicEventsCache(): void {
  store.dispatch(baseApi.util.invalidateTags(['Events']));
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
  const { data: allVideos = [] } = useGetVideosQuery();
  const pageKey = pagePaths.join('|');
  const matcherKey = slotMatchers.join('|');

  const matchedSlot = useMemo<VideoSlot | null>(() => {
    const targetPaths = pageKey
      .split('|')
      .filter(Boolean)
      .map(normalizePagePath);
    const matchers = matcherKey
      .split('|')
      .filter(Boolean)
      .map((m) => m.toLowerCase());

    const liveVideos = allVideos
      .filter((v) => v.status === 'Live' && Boolean(v.video_url?.trim()))
      .sort((a, b) => (a.sort_order ?? 99) - (b.sort_order ?? 99));

    const pageMatches = liveVideos.filter((v) =>
      targetPaths.includes(normalizePagePath(v.page_location)),
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

    return chosen ?? null;
  }, [allVideos, pageKey, matcherKey, slotIndex]);

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
  const { data: allEvents = [], isLoading, isFetching, refetch } = useGetEventsQuery();

  const events = useMemo<EventItem[]>(() => {
    return allEvents
      .filter((evt) => evt.status === 'Upcoming' || evt.status === 'Happening now')
      .sort((a, b) => (a.event_date || '').localeCompare(b.event_date || ''));
  }, [allEvents]);

  const refresh = useCallback(
    async (force = true) => {
      if (force) {
        await refetch();
        return;
      }
      await refetch();
    },
    [refetch],
  );

  return { events, loading: isLoading || isFetching, refresh };
}

export function usePublicSettingPage(
  slug: string,
  fallback?: { title: string; htmlContent: string },
) {
  const { data, isLoading, isFetching, isError, refetch } = useGetSettingPageQuery(slug, {
    skip: !slug,
  });

  const fallbackTitle = fallback?.title ?? '';
  const fallbackHtml = fallback?.htmlContent ?? '';

  const page = useMemo<PublicSettingPage | null>(() => {
    if (data) return data;
    if (isError && fallbackHtml) {
      return {
        slug,
        title: fallbackTitle,
        htmlContent: fallbackHtml,
      };
    }
    return null;
  }, [data, isError, slug, fallbackTitle, fallbackHtml]);

  const refresh = useCallback(
    async (force = true) => {
      if (force) {
        await refetch();
        return;
      }
      await refetch();
    },
    [refetch],
  );

  return {
    page,
    loading: isLoading || isFetching,
    error: isError ? 'Unable to load page content right now. Please try again.' : null,
    refresh,
  };
}

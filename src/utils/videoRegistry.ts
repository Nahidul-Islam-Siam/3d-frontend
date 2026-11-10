// Central Video Registry & Resolver
// Provides Vite asset bundling resolution, thumbnail fallbacks, embed parser, and live CMS sync

import welcomeMp4 from '@/assets/video/welcome.mp4';
import expStoryMp4 from '@/assets/experience-story/experience-story.mp4';
import expStory2Mp4 from '@/assets/experience-story/experience-story-2.mp4';
import joinMp4 from '@/assets/join-movement/join-movement.mp4';
import join2Mp4 from '@/assets/join-movement/join-the-movement-2.mp4';
import join3Mp4 from '@/assets/join-movement/join-the-movement-3.mp4';

// Thumbnails / Posters
import auditionBanner from '@/assets/welcome/audition_banner.png';
import showdownPoster from '@/assets/welcome/showdown-poster.png';
import expStoryThumb from '@/assets/experience-story/experience-story-2nd-section.jpg';
import joinMovementThumb from '@/assets/join-movement/join-movement.jpg';
import meetUsThumb from '@/assets/meet-us/Meet Us.png';
import sarahMitchellThumb from '@/assets/meet-us/sarah-mitchell.png';

export const BUNDLED_VIDEOS: Record<string, string> = {
  welcome: welcomeMp4,
  'welcome.mp4': welcomeMp4,
  'src/assets/video/welcome.mp4': welcomeMp4,

  'experience-story': expStoryMp4,
  'experience-story.mp4': expStoryMp4,
  'src/assets/experience-story/experience-story.mp4': expStoryMp4,

  'experience-story-2': expStory2Mp4,
  'experience-story-2.mp4': expStory2Mp4,
  'src/assets/experience-story/experience-story-2.mp4': expStory2Mp4,

  'join-movement': joinMp4,
  'join-movement.mp4': joinMp4,
  'src/assets/join-movement/join-movement.mp4': joinMp4,

  'join-the-movement-2': join2Mp4,
  'join-the-movement-2.mp4': join2Mp4,
  'src/assets/join-movement/join-the-movement-2.mp4': join2Mp4,

  'join-the-movement-3': join3Mp4,
  'join-the-movement-3.mp4': join3Mp4,
  'src/assets/join-movement/join-the-movement-3.mp4': join3Mp4,
};

export const DEFAULT_POSTERS: Record<string, string> = {
  'vid-1': auditionBanner,
  'vid-2': expStoryThumb,
  'vid-3': joinMovementThumb,
  'vid-4': showdownPoster,
  'vid-5': joinMovementThumb,
  'vid-6': meetUsThumb,
  'vid-7': sarahMitchellThumb,
  'vid-8': showdownPoster,
  'vid-9': expStoryThumb,
  'vid-10': auditionBanner,
  default: auditionBanner,
};

/**
 * Resolves a video URL string into a playable URL.
 * Handles Vite bundled imports, custom blob / object URLs, external CDNs, and fallback.
 */
export function resolveVideoUrl(rawUrl?: string): string {
  if (!rawUrl) return welcomeMp4;

  const trimmed = rawUrl.trim();

  // If it's already an active web URL, blob URL, or data URI
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  // Lookup in bundled table
  if (BUNDLED_VIDEOS[trimmed]) {
    return BUNDLED_VIDEOS[trimmed];
  }

  // Match by key substrings
  if (trimmed.includes('welcome')) return welcomeMp4;
  if (trimmed.includes('experience-story-2')) return expStory2Mp4;
  if (trimmed.includes('experience-story')) return expStoryMp4;
  if (trimmed.includes('join-the-movement-3')) return join3Mp4;
  if (trimmed.includes('join-the-movement-2')) return join2Mp4;
  if (trimmed.includes('join-movement')) return joinMp4;

  return welcomeMp4;
}

/**
 * Detects if a URL is a YouTube or Vimeo link and returns the iframe embed URL.
 */
export function parseEmbedUrl(url?: string): { isEmbed: boolean; embedUrl?: string; type?: 'youtube' | 'vimeo' } {
  if (!url) return { isEmbed: false };
  const trimmed = url.trim();

  // YouTube detection
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      isEmbed: true,
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
      type: 'youtube',
    };
  }

  // Vimeo detection
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+))/i);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      isEmbed: true,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
      type: 'vimeo',
    };
  }

  return { isEmbed: false };
}

/**
 * Returns the configured live video URL for a public website component,
 * synchronized directly with the admin dashboard's localStorage CMS.
 */
export function getPublicPageVideo(slotIdOrLabel: string, defaultFallback: string): string {
  try {
    const saved = localStorage.getItem('lab_admin_videos');
    if (!saved) return defaultFallback;

    const list = JSON.parse(saved);
    if (!Array.isArray(list)) return defaultFallback;

    const match = list.find(
      (item: { id?: string; slot_label?: string; status?: string; video_url?: string }) =>
        (item.id === slotIdOrLabel || item.slot_label?.toLowerCase() === slotIdOrLabel.toLowerCase()) &&
        item.status === 'Live'
    );

    if (match && match.video_url) {
      return resolveVideoUrl(match.video_url);
    }
  } catch {
    // fallback gracefully
  }

  return defaultFallback;
}


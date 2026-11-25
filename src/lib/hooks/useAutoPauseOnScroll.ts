import React, { useEffect } from 'react';

interface AutoPauseOptions {
  threshold?: number;
  autoResumeMuted?: boolean;
}

/**
 * Automatically pauses and mutes video when scrolled out of view into the next section,
 * ensuring background audio never bleeds into adjacent sections.
 */
export function useAutoPauseOnScroll(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  setIsPlaying?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsMuted?: React.Dispatch<React.SetStateAction<boolean>>,
  options: AutoPauseOptions = {}
) {
  const { threshold = 0.2, autoResumeMuted = false } = options;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Scrolled out of view / entered next section: pause & mute immediately
            video.pause();
            video.muted = true;
            if (setIsPlaying) setIsPlaying(false);
            if (setIsMuted) setIsMuted(true);
          } else if (autoResumeMuted) {
            // Re-entered view: resume muted autoplay if enabled
            video.muted = true;
            if (setIsMuted) setIsMuted(true);
            video
              .play()
              .then(() => {
                if (setIsPlaying) setIsPlaying(true);
              })
              .catch(() => {});
          }
        });
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, setIsPlaying, setIsMuted, threshold, autoResumeMuted]);
}

export default useAutoPauseOnScroll;

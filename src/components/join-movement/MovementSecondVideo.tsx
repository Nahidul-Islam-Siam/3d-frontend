import { useState, useRef, useEffect } from 'react';
import storyVideo2 from '@/assets/join-movement/join-the-movement-2.mp4';

export interface MovementSecondVideoProps {
  id?: string;
  className?: string;
  isEmbedded?: boolean;
  isActive?: boolean;
}

export default function MovementSecondVideo({ 
  id = 'movement-video-2', 
  className = '',
  isEmbedded = false,
  isActive = true,
}: MovementSecondVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [, setIsPlaying] = useState<boolean>(true);

  // Toggle play/pause on click with sound always enabled
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Synchronize audio and playback based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = false;
      video.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback if browser policy requires user gesture
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      video.muted = true;
    }
  }, [isActive]);

  // Pause when scrolled past, resume when scrolling back
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isActive) {
              video.muted = false;
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isActive]);

  const cardContent = (
    <div 
      onClick={togglePlay}
      className="relative w-full aspect-video rounded-[20px] sm:rounded-[32px] lg:rounded-[38px] overflow-hidden bg-black flex items-center justify-center group cursor-pointer select-none shadow-[0_25px_80px_rgba(0,0,0,0.35)] border border-stone-800/30"
    >
      <video
        ref={videoRef}
        src={storyVideo2}
        autoPlay
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Ambient Subtle Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />

      {/* ─── Bottom-Right 4-Point Star Sparkle Watermark ─── */}
      <div className="absolute bottom-6 right-8 sm:bottom-10 sm:right-14 lg:bottom-14 lg:right-20 z-10 pointer-events-none select-none">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white/40 hover:text-white/60 transition-colors"
        >
          <path
            d="M40 0C40 22.0914 47.9086 40 70 40C47.9086 40 40 57.9086 40 80C40 57.9086 32.0914 40 10 40C32.0914 40 40 22.0914 40 0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );

  if (isEmbedded) {
    return (
      <div id={id} className={`w-full ${className}`}>
        {cardContent}
      </div>
    );
  }

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-8 pb-10 sm:pb-16 px-3 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-center ${className}`}
    >
      <div className="w-full max-w-[1720px]">
        {cardContent}
      </div>
    </section>
  );
}

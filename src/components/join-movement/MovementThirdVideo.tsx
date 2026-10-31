import { useState, useRef, useEffect } from 'react';
import storyVideo3 from '@/assets/join-movement/join-the-movement-3.mp4';

export interface MovementThirdVideoProps {
  id?: string;
  className?: string;
}

export default function MovementThirdVideo({ 
  id = 'movement-video-3', 
  className = '' 
}: MovementThirdVideoProps) {
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

  // Automatically pause when passed by scroll, resume with sound when scrolling back
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enable sound
    video.muted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Came back into view -> resume with sound
            video.muted = false;
            video.play().then(() => setIsPlaying(true)).catch(() => {
              video.muted = true;
              video.play().catch(() => {});
            });
          } else {
            // Passed by scroll -> stop/pause
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-8 sm:pt-12 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-center ${className}`}
    >
      {/* ─── Rounded 16:9 Video Card (Exact Figma Design) ─── */}
      <div 
        onClick={togglePlay}
        className="relative w-full max-w-[1720px] aspect-video rounded-[18px] sm:rounded-[30px] lg:rounded-[36px] overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-stone-800/15 flex items-center justify-center group cursor-pointer select-none"
      >
        <video
          ref={videoRef}
          src={storyVideo3}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
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
    </section>
  );
}

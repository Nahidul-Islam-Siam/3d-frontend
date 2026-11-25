import { useState, useRef, useEffect } from 'react';
import storyVideo3 from '@/assets/join-movement/join-the-movement-3.mp4';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

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
  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/join-the-movement', '/movement'],
    slotMatchers: ['movement 3', 'third', 'showcase 3', 'together'],
    slotIndex: 2,
    fallbackUrl: storyVideo3,
  });

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
          src={liveVideo.videoUrl}
          poster={liveVideo.posterUrl}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />


      </div>
    </section>
  );
}

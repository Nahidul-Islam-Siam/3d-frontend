import { useRef } from 'react';
import docVideo from '@/assets/experience-story/experience-story-2.mp4';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

export interface DocumentaryVideoSectionProps {
  id?: string;
  className?: string;
}

export default function DocumentaryVideoSection({ 
  id = "documentary-video", 
  className = "" 
}: DocumentaryVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/experience-the-story', '/experience-story', '/about'],
    slotMatchers: ['documentary', 'story-2', 'second'],
    slotIndex: 1,
    fallbackUrl: docVideo,
  });

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] flex items-center justify-center overflow-hidden select-none ${className} py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8`}
    >
      {/* ─── Inset Rounded Video Card (Exact Figma Image 4 Layout) ─── */}
      <div className="relative w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8.5] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-black flex items-center justify-center group">
          <video
            ref={videoRef}
            src={liveVideo.videoUrl}
            poster={liveVideo.posterUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onClick={togglePlay}
          />

          {/* Ambient Subtle Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.3)_100%)]" />
        </div>
      </div>
    </section>
  );
}

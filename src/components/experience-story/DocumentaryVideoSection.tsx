import { useRef } from 'react';
import docVideo from '@/assets/experience-story/experience-story-2.mp4';

export interface DocumentaryVideoSectionProps {
  id?: string;
  className?: string;
}

export default function DocumentaryVideoSection({ 
  id = "documentary-video", 
  className = "" 
}: DocumentaryVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      className={`relative w-full bg-[#FAF4E6] flex items-center justify-center overflow-hidden select-none ${className} py-16`}
    >
      {/* ─── 16:9 Full-Width Video Frame (Exact Figma Layout) ─── */}
      <div className="relative w-full max-w-[1920px] aspect-video overflow-hidden bg-black flex items-center justify-center group">
        <video
          ref={videoRef}
          src={docVideo}
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
    </section>
  );
}

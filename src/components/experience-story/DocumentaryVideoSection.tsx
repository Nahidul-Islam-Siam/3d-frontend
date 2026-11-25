import { useState, useRef } from 'react';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';
import { Volume2, VolumeX } from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto pause & mute when scrolling past this section
  useAutoPauseOnScroll(videoRef, undefined, setIsMuted, { autoResumeMuted: true });

  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/experience-the-story', '/experience-story', '/about'],
    slotMatchers: ['documentary', 'story-2', 'second'],
    slotIndex: 1,
    fallbackUrl: docVideo,
  });

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

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
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
          />

          {/* Floating Sound Toggle Button (Top Right) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-sans font-semibold tracking-wide uppercase transition-all backdrop-blur-md shadow-xl cursor-pointer ${
                isMuted
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-105 animate-pulse'
                  : 'bg-black/70 hover:bg-black/90 text-white border border-white/30'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>

          {/* Ambient Subtle Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.3)_100%)]" />
        </div>
      </div>
    </section>
  );
}

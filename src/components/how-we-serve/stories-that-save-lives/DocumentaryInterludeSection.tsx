import { useState, useRef } from 'react';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';
import { Volume2, VolumeX } from 'lucide-react';
import heroVideo from '@/assets/how-we-serve/stories-that-save-lives/Untitled design (3).mp4.mp4';
import heroPoster from '@/assets/how-we-serve/stories-that-save-lives/image copy.png';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

export default function DocumentaryInterludeSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto pause & mute when scrolling past this section
  useAutoPauseOnScroll(videoRef, undefined, setIsMuted, { autoResumeMuted: true });

  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/stories-that-save-lives', '/stories-that-save-lives'],
    slotMatchers: ['interlude', 'documentary', 'second'],
    slotIndex: 1,
    fallbackUrl: heroVideo,
    fallbackPoster: heroPoster,
  });

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section 
      id="documentary-interlude"
      className="relative w-full h-[65vh] sm:h-[80vh] lg:h-screen min-h-[500px] bg-[#FAF4E6] text-[#2C261E] select-none overflow-hidden group"
    >
      {/* ─── Full-Bleed Edge-to-Edge Documentary Video ─── */}
      <div className="relative w-full h-full overflow-hidden bg-[#FAF4E6]">
        <video
          ref={videoRef}
          src={liveVideo.videoUrl}
          poster={liveVideo.posterUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-[1.01] cursor-pointer"
          onClick={toggleMute}
        />

        {/* Floating Sound Toggle Button (Top Right) */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-12 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
            className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide uppercase transition-all backdrop-blur-md shadow-2xl cursor-pointer ${
              isMuted
                ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:scale-105 animate-pulse'
                : 'bg-black/70 hover:bg-black/90 text-white border border-white/30'
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-white" />
                <span>Tap for Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#F97316]" />
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Cinematic Vignette Overlay blending with creamy theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4E6] via-transparent to-[#FAF4E6] pointer-events-none" />
      </div>
    </section>
  );
}


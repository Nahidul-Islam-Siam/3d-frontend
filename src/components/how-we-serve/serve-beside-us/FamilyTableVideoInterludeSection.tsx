import { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, ArrowDown } from 'lucide-react';
import interludeVideo from '@/assets/how-we-serve/serve-beside-us/Untitled design (2).mp4.mp4';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

interface FamilyTableVideoInterludeSectionProps {
  onScrollClick?: () => void;
}

export default function FamilyTableVideoInterludeSection({ onScrollClick }: FamilyTableVideoInterludeSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/serve-beside-us', '/serve-beside-us'],
    slotMatchers: ['interlude', 'table', 'family'],
    slotIndex: 1,
    fallbackUrl: interludeVideo,
  });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleScrollDown = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }
    const el = document.getElementById('serve-finale');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="serve-video-interlude"
      className="relative w-full min-h-[75vh] lg:min-h-screen bg-[#FAF4E6] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ─── Full-Bleed Video Background ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={liveVideo.videoUrl}
          poster={liveVideo.posterUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Cinematic Vignette Overlay (fades into creamy background) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4E6] via-black/30 to-[#FAF4E6] pointer-events-none" />
      </div>

      {/* Top Bar: Controls */}
      <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-16 sm:pt-20 flex justify-end items-center">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="h-10 px-4 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 transition-all cursor-pointer hover:scale-105 text-xs font-sans uppercase tracking-wider"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 ml-0.5" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="h-10 px-4 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 transition-all cursor-pointer hover:scale-105 text-xs font-sans uppercase tracking-wider"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Mute</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Center Space */}
      <div className="flex-1" />

      {/* Bottom Bar: Scroll Indicator */}
      <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pb-10 sm:pb-12 flex justify-center">
        <button
          type="button"
          onClick={handleScrollDown}
          className="inline-flex items-center gap-2.5 text-white/90 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="w-7 h-7 rounded-full border border-white/70 group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[13px] uppercase tracking-[0.22em] text-white font-medium"
          >
            SCROLL TO CONTINUE
          </span>
        </button>
      </div>
    </section>
  );
}

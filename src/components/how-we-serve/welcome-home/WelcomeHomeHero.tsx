import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import welcomeHomeVideo from '@/assets/how-we-serve/welcome-home/gemini_generated_video_b330336e.mp4.mp4';

interface WelcomeHomeHeroProps {
  onScrollClick?: () => void;
}

export default function WelcomeHomeHero({ onScrollClick }: WelcomeHomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section 
      id="welcome-home-video-hero"
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ─── Edge-to-Edge Fullscreen Video ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={welcomeHomeVideo}
          playsInline
          autoPlay
          loop
          muted={isMuted}
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
        {/* Subtle Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* ─── Top-Right Video Controls ─── */}
      <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 sm:pt-28 flex justify-end gap-3 pointer-events-auto">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="h-9 px-3.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="h-9 px-3.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>

      {/* ─── Bottom Center "SCROLL TO CONTINUE" Pill (Exact Screenshot Match) ─── */}
      <div className="relative z-20 pb-8 flex justify-center w-full">
        <button
          type="button"
          onClick={onScrollClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/25 text-white/90 hover:text-white transition-all cursor-pointer text-[11px] font-serif tracking-[0.2em] uppercase shadow-lg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="7" />
            <line x1="12" y1="6" x2="12" y2="10" />
          </svg>
          <span>Scroll to continue</span>
        </button>
      </div>
    </section>
  );
}


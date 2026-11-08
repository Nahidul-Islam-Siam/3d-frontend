import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowDown } from 'lucide-react';
import youthVideo from '@/assets/how-we-serve/you-matter/Bright_hopeful_youth_communit.mp4.mp4';

interface YouMatterHeroProps {
  onScrollClick?: () => void;
}

export default function YouMatterHero({ onScrollClick }: YouMatterHeroProps) {
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

  const handleScrollToTitle = () => {
    const titleEl = document.getElementById('you-matter-title-stage');
    if (titleEl) {
      titleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          FRAME 1: 100% FULL-PAGE THEATRICAL VIDEO HERO (Figma Frame 1)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section 
        id="you-matter-video-stage"
        className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Full-bleed Edge-to-Edge Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src={youthVideo}
            playsInline
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle Film Grain Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Top Control Bar (Pill Controls) */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 sm:pt-28 flex justify-end gap-3">
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

        {/* Empty Center for Clear Video View */}
        <div className="flex-1" />

        {/* Bottom Right: Scroll to Title */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pb-10 sm:pb-12 flex justify-end items-end">
          <button
            type="button"
            onClick={handleScrollToTitle}
            className="inline-flex items-center gap-2.5 text-white/80 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="w-6 h-6 rounded-full border border-white/70 group-hover:border-white flex items-center justify-center transition-colors">
              <ArrowDown className="w-3 h-3 text-white group-hover:translate-y-0.5 transition-transform" />
            </span>
            <span 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[12px] uppercase tracking-[0.22em] text-white font-medium"
            >
              SCROLL
            </span>
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FRAME 2: 100% FULL-PAGE CINEMATIC TITLE CARD (Warm Ivory Theme)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="you-matter-title-stage"
        className="relative w-full min-h-screen bg-[#FAF4E6] text-[#2C261E] flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Ambient Warm Golden Halo Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 75%)',
            filter: 'blur(90px)',
          }}
          aria-hidden="true"
        />

        <div className="pt-24 sm:pt-28" />

        {/* Center Title: YOU MATTER */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28 flex flex-col items-center justify-center text-center my-auto">
          <motion.h1
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[128px] xl:text-[144px] font-bold text-[#F97316] tracking-tight leading-none uppercase drop-shadow-[0_8px_30px_rgba(249,115,22,0.2)]"
          >
            YOU MATTER
          </motion.h1>
        </div>

        {/* Bottom Right: Scroll to Section 3 */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pb-10 sm:pb-12 flex justify-end">
          <button
            type="button"
            onClick={onScrollClick}
            className="inline-flex items-center gap-2.5 text-[#746343] hover:text-[#F97316] transition-colors cursor-pointer group"
          >
            <span className="w-6 h-6 rounded-full border border-[#746343]/50 group-hover:border-[#F97316] flex items-center justify-center transition-colors">
              <ArrowDown className="w-3 h-3 text-[#746343] group-hover:text-[#F97316] group-hover:translate-y-0.5 transition-transform" />
            </span>
            <span 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[12px] uppercase tracking-[0.22em] text-[#746343] group-hover:text-[#F97316] font-medium"
            >
              SCROLL
            </span>
          </button>
        </div>
      </section>
    </>
  );
}

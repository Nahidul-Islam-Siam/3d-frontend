import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowDown } from 'lucide-react';
import heroVideo from '@/assets/how-we-serve/stories-that-save-lives/Untitled design (3).mp4.mp4';
import heroPoster from '@/assets/how-we-serve/stories-that-save-lives/image copy.png';
import VideoEndedVerbiageOverlay from '@/components/common/VideoEndedVerbiageOverlay';
import { officialPillars } from '@/data/officialVerbiage';

interface StoriesHeroSectionProps {
  onScrollClick?: () => void;
}

export default function StoriesHeroSection({ onScrollClick }: StoriesHeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const content = officialPillars.storiesThatSaveLives;

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
      setIsEnded(false);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setIsEnded(false);
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleScrollToTitle = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }
    const titleEl = document.getElementById('stories-title-stage');
    if (titleEl) {
      titleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          FRAME 1: 100% FULL-VIEWPORT CINEMATIC VIDEO HERO (Figma Frame 1)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section 
        id="stories-video-stage"
        className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Full-bleed Edge-to-Edge Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A090D]">
          <video
            ref={videoRef}
            src={heroVideo}
            poster={heroPoster}
            playsInline
            autoPlay
            muted={isMuted}
            onEnded={() => {
              setIsEnded(true);
              setIsPlaying(false);
            }}
            className={`w-full h-full object-cover object-center scale-[1.01] transition-opacity duration-1000 ${
              isEnded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Subtle Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
        </div>

        <VideoEndedVerbiageOverlay
          visible={isEnded}
          eyebrow={`Door 3: ${content.title}`}
          title={content.title}
          lead={content.lead}
          body={`${content.intro} ${content.whatWeDo}`}
          tagline={content.tagline}
          ctaLabel="Suicide Awareness Showdown"
          ctaHref="/suicide-awareness-showdown"
          onReplay={handleReplay}
          onScrollDown={handleScrollToTitle}
        />

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

        {/* Center Space for Clean Visual Focus */}
        <div className="flex-1" />

        {/* Bottom Bar: Scroll to Continue + 4-Point Star Sparkle */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pb-10 sm:pb-12 flex justify-between items-end">
          <div className="flex-1" />

          {/* Centered Scroll Prompt */}
          <button
            type="button"
            onClick={handleScrollToTitle}
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

          {/* Right: 4-Point Star Sparkle (Figma 1:1) */}
          <div className="flex-1 flex justify-end">
            <svg
              className="w-6 h-6 text-white/70"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FRAME 2: THEATRICAL TITLE CARD (Figma Frame 2)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="stories-title-stage"
        className="relative w-full min-h-[70vh] sm:min-h-[85vh] lg:min-h-screen bg-[#08070B] text-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden select-none py-20"
      >
        {/* Soft Amber Ambient Glow at bottom */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(249,115,22,0.18) 0%, rgba(234,88,12,0.06) 45%, transparent 75%)',
            filter: 'blur(70px)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
          >
            STORIES THAT SAVE LIVES
          </motion.h1>

          {/* Double Dotted Line Divider (Figma 1:1) */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl my-4 space-y-1"
          >
            <div className="w-full border-t border-dashed border-white/20" />
            <div className="w-full border-t border-dashed border-white/20" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-300 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg mt-2"
          >
            Sometimes hope begins with one conversation.
          </motion.p>
        </div>
      </section>
    </>
  );
}


import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquareHeart, 
  Award, 
  ShieldCheck, 
  Sun, 
  Home, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  ArrowDown
} from 'lucide-react';
import veteranVideo from '@/assets/how-we-serve/welcome-home/gemini_generated_video_382e9620.mp4.mp4';

export interface WhatVeteransFeelSectionProps {
  id?: string;
  className?: string;
  onScrollClick?: () => void;
}

const covenants = [
  {
    id: 'appreciated',
    title: 'APPRECIATED',
    icon: MessageSquareHeart,
    desc: 'Your service mattered. Not just as a memory, but as an honored foundation of our community.',
    row: 1,
  },
  {
    id: 'honored',
    title: 'HONORED',
    icon: Award,
    desc: 'Your sacrifice is respected. Recognized with dignity, never reduced to pity or charity.',
    row: 1,
  },
  {
    id: 'safe',
    title: 'SAFE',
    icon: ShieldCheck,
    desc: 'A place to Solid walls, a secure threshold, and nights without fear or instability.',
    row: 1,
  },
  {
    id: 'hopeful',
    title: 'HOPEFUL',
    icon: Sun,
    desc: 'A new chapter can begin. The past acknowledged, but the future wide open with opportunity.',
    row: 2,
  },
  {
    id: 'home',
    title: 'HOME',
    icon: Home,
    desc: 'A place where your heart can rest. Your own space, your own key, your own sovereign sanctuary.',
    row: 2,
  },
];

export default function WhatVeteransFeelSection({
  id = 'what-veterans-feel',
  className = '',
  onScrollClick,
}: WhatVeteransFeelSectionProps) {
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

  const row1Cards = covenants.filter((c) => c.row === 1);
  const row2Cards = covenants.filter((c) => c.row === 2);

  return (
    <section
      id={id}
      className={`relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 ${className}`}
    >
      {/* ─── Edge-to-Edge Fullscreen Video ─── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          src={veteranVideo}
          playsInline
          autoPlay
          loop
          muted={isMuted}
          className="w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Subtle Warm Vignette Overlay to ensure text readability while preserving video lighting */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ─── Top Header Section: Title (Left) & Covenant Statement (Right) ─── */}
      <div className="relative z-20 w-full flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-10 sm:pb-14">
        {/* Top-Left Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-normal leading-[1.12] text-white tracking-tight"
          >
            What We Hope Every<br />Veteran Feels
          </h2>
        </motion.div>

        {/* Top-Right Covenant Manifesto + Video Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-start lg:items-end gap-3 max-w-md lg:text-right"
        >
          {/* Subtle Video Controls */}
          <div className="flex items-center gap-2 mb-1">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white/80 hover:text-white transition-all backdrop-blur-sm"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white/80 hover:text-white transition-all backdrop-blur-sm"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className="text-stone-300 font-serif text-xs sm:text-[13px] lg:text-sm leading-relaxed">
            Not institutional placement. Not temporary shelter.<br className="hidden sm:inline" />
            These are the five unwavering covenants we build into every doorway.
          </p>
        </motion.div>
      </div>

      {/* ─── Center Cards: 5 Floating Frosted Covenants (Staggered Layout) ─── */}
      <div className="relative z-20 w-full my-auto py-4 space-y-4 sm:space-y-6">
        {/* Row 1: APPRECIATED, HONORED, SAFE */}
        <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-6 justify-center lg:justify-start lg:pl-10 xl:pl-16">
          {row1Cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="w-full sm:w-[220px] lg:w-[225px] xl:w-[245px] bg-[#1a1410]/70 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col justify-between hover:border-amber-500/40 hover:bg-[#1a1410]/80 transition-all duration-300"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#E5853B] mb-4">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-[#E5853B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 font-sans">
                    {card.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Row 2: HOPEFUL, HOME (Staggered Indented to showcase the person in the video) */}
        <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-6 justify-center lg:justify-start lg:pl-32 xl:pl-44">
          {row2Cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.36 + index * 0.12 }}
                className="w-full sm:w-[220px] lg:w-[225px] xl:w-[245px] bg-[#1a1410]/70 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl flex flex-col justify-between hover:border-amber-500/40 hover:bg-[#1a1410]/80 transition-all duration-300"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#E5853B] mb-4">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <h3 className="text-[#E5853B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 font-sans">
                    {card.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── Bottom Footer: Scroll Indicator + Star Sparkle Graphic ─── */}
      <div className="relative z-20 w-full pt-8 flex items-center justify-center">
        {/* Center Pill Button */}
        <button
          type="button"
          onClick={onScrollClick}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-stone-200 text-xs font-serif uppercase tracking-widest hover:border-white/50 hover:bg-black/60 transition-all cursor-pointer group"
        >
          <span className="w-4 h-4 rounded-full border border-stone-300 flex items-center justify-center text-[10px] group-hover:translate-y-0.5 transition-transform">
            <ArrowDown className="w-2.5 h-2.5 stroke-[2.5]" />
          </span>
          <span>SCROLL TO CONTINUE</span>
        </button>

        {/* Bottom-Right Diamond 4-Point Star Graphic */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-85">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-stone-200 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}


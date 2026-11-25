import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';
import heroVideo from '@/assets/how-we-serve/serve-beside-us/gemini_generated_video_a68cdf4e.mp4.mp4';
import VideoEndedVerbiageOverlay from '@/components/common/VideoEndedVerbiageOverlay';
import { officialPillars } from '@/data/officialVerbiage';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

interface ServeBesideUsHeroSectionProps {
  onScrollClick?: () => void;
}

export default function ServeBesideUsHeroSection({ onScrollClick }: ServeBesideUsHeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const content = officialPillars.serveBesideUs || {
    title: 'Serve Beside Us',
    lead: 'Sometimes purpose begins with saying yes.',
    intro: "You don't have to be extraordinary to make an extraordinary difference.",
    whatWeDo: 'You simply have to be willing.',
    tagline: 'People Matter. Always.',
  };

  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/serve-beside-us', '/serve-beside-us'],
    slotMatchers: ['hero', 'serve-beside-us', 'volunteer'],
    slotIndex: 0,
    fallbackUrl: heroVideo,
  });

  // Auto pause & mute when scrolling past this hero section
  useAutoPauseOnScroll(videoRef, setIsPlaying, setIsMuted, { autoResumeMuted: true });

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
    const el = document.getElementById('serve-intro-stage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fourPills = [
    { label: 'Show up.', id: 'show-up' },
    { label: 'Serve.', id: 'serve' },
    { label: 'Listen.', id: 'listen' },
    { label: 'Care.', id: 'care' },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          FRAME 1: 100% FULL-VIEWPORT CINEMATIC VIDEO HERO (Figma Frame 1)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section 
        id="serve-video-stage"
        className="relative w-full min-h-screen bg-[#0A0706] text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Full-bleed Edge-to-Edge Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0706]">
          <video
            ref={videoRef}
            src={liveVideo.videoUrl}
            poster={liveVideo.posterUrl}
            playsInline
            autoPlay
            loop={!isEnded}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0706] via-transparent to-black/50 pointer-events-none" />
        </div>

        <VideoEndedVerbiageOverlay
          visible={isEnded}
          eyebrow="Door 6: Serve Beside Us"
          title={content.title}
          lead={content.lead}
          body={`${content.intro} ${content.whatWeDo}`}
          tagline={content.tagline}
          ctaLabel="Join As Volunteer"
          ctaHref="/movement"
          onReplay={handleReplay}
          onScrollDown={handleScrollToTitle}
        />

        {/* Top Bar: Eyebrow + Pill Controls */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 sm:pt-28 flex justify-end items-center">
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

        {/* Center Space for Clean Visual Focus */}
        <div className="flex-1" />


      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FRAME 2: "SERVE BESIDE US" INTRO STAGE (Figma Frame 2)
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="serve-intro-stage"
        className="relative w-full min-h-[85vh] lg:min-h-screen bg-[#FAF4E6] text-[#2C261E] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 py-24 sm:py-32 overflow-hidden select-none"
      >
        {/* Soft Warm Radial Glow */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, rgba(249,115,22,0.12) 0%, rgba(234,88,12,0.04) 45%, transparent 75%)',
          }}
        />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Manifesto Narrative */}
          <div className="lg:col-span-8 flex flex-col justify-center max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-[#1C140D] mb-6 uppercase"
            >
              SERVE BESIDE US
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-[#554637] text-sm sm:text-base leading-relaxed font-light"
            >
              <p className="text-[#8F6629] font-serif font-medium italic text-base sm:text-lg">
                Sometimes purpose begins with saying yes.
              </p>
              <p>
                You don&apos;t have to be extraordinary to make an extraordinary difference. You simply have to be willing.
              </p>
              <p className="pt-2 text-[#6F5E4E]">
                Our volunteers come from every walk of life. Students, parents, veterans, teachers, business owners, retirees, artists, churches, and neighbors serve together with one shared purpose: helping people experience dignity, compassion, and hope.
              </p>
            </motion.div>
          </div>

          {/* Right Column: 4 Glowing Action Capsule Pills (Figma 1:1) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-3.5 sm:gap-4 w-full max-w-xs"
            >
              {fourPills.map((pill) => (
                <div
                  key={pill.id}
                  className="px-6 py-3 rounded-full bg-[#F4EBD9] border border-[#DBCAB0] shadow-sm flex items-center justify-center text-center transition-all duration-300 hover:border-[#F97316] hover:bg-[#FAF4E6] hover:scale-105"
                >
                  <span 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-[#F97316] text-sm sm:text-[15px] font-semibold tracking-wide"
                  >
                    {pill.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}

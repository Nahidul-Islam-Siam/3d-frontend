import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowDown } from 'lucide-react';
import heroVideo from '@/assets/join-movement/join-movement.mp4';
import VideoEndedVerbiageOverlay from '@/components/common/VideoEndedVerbiageOverlay';
import { serveBesideUs } from '@/data/officialVerbiage';

export interface MovementHeroBannerProps {
  id?: string;
  className?: string;
}

export default function MovementHeroBanner({
  id = 'movement-hero-banner',
  className = '',
}: MovementHeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsEnded(false);
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // ─── Play / Pause Toggle ───
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayPulse(true);
    setTimeout(() => setShowPlayPulse(false), 550);
  };

  // ─── Audio Mute Toggle ───
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // ─── Autoplay on Mount with Gesture Fallback ───
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.play().then(() => {
      setIsMuted(false);
      setIsPlaying(true);
    }).catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });

    const handleFirstUserInteraction = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsMuted(false);
      }
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, []);

  // ─── Scroll to Second Video ───
  const handleScrollDown = () => {
    const secondVideo = document.getElementById('movement-video-2');
    if (secondVideo) {
      secondVideo.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* ─── Hero Video Cinema Card (Matches Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => togglePlay()}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[360px] sm:min-h-[480px] lg:min-h-[640px] max-h-[86vh] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden bg-black shadow-[0_20px_60px_rgba(44,36,29,0.12)] cursor-pointer group select-none"
        >
          {/* Video (Fades smoothly on completion to reveal verbiage) */}
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={() => {
              setIsEnded(true);
              setIsPlaying(false);
            }}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isEnded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <VideoEndedVerbiageOverlay
            visible={isEnded}
            eyebrow={serveBesideUs.title}
            title={serveBesideUs.lead}
            body={`${serveBesideUs.intro} ${serveBesideUs.whatWeDo}`}
            tagline={serveBesideUs.tagline}
            ctaLabel="Showdown & Forms"
            ctaHref="/suicide-awareness-showdown"
            onReplay={handleReplay}
            onScrollDown={handleScrollDown}
          />

          {/* Ambient Subtle Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(18,12,8,0.45)_100%)]" 
            aria-hidden="true"
          />

          {/* ─── Center Bottom: SCROLL TO ENTER THE STORY (Figma 1:1) ─── */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleScrollDown();
            }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all cursor-pointer shadow-lg select-none group/scroll"
          >
            <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
              <ArrowDown className="w-3 h-3 text-[#F97316] group-hover/scroll:translate-y-0.5 transition-transform" />
            </span>
            <span 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[10px] sm:text-[11.5px] tracking-[0.2em] uppercase font-medium"
            >
              SCROLL TO ENTER THE STORY
            </span>
          </div>

          {/* ─── Bottom-Right: 4-Point Star Sparkle Watermark (Figma 1:1) ─── */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12 z-20 pointer-events-none select-none">
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white/55 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] animate-[spin_28s_linear_infinite]"
            >
              <path
                d="M40 0C40 22.0914 47.9086 40 70 40C47.9086 40 40 57.9086 40 80C40 57.9086 32.0914 40 10 40C32.0914 40 40 22.0914 40 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* ─── Floating Controls (Top Left) ─── */}
          <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-30 flex items-center gap-2.5 pointer-events-auto">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleMute}
              type="button"
              className="group/btn flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-sans font-medium transition-all duration-200 shadow-xl"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/80 group-hover/btn:text-white transition-colors" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#F97316] animate-pulse" />
                  <span className="text-white">Sound Active</span>
                </>
              )}
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              type="button"
              className="p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white/80 hover:text-white transition-all shadow-xl"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* ─── Central Play/Pause Pulse Feedback ─── */}
          <AnimatePresence>
            {showPlayPulse && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white pointer-events-none z-30 shadow-2xl"
              >
                {isPlaying ? (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                ) : (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

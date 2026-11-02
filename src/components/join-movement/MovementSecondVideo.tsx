import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import storyVideo2 from '@/assets/join-movement/join-the-movement-2.mp4';

export interface MovementSecondVideoProps {
  id?: string;
  className?: string;
  isEmbedded?: boolean;
  isActive?: boolean;
}

export default function MovementSecondVideo({ 
  id = 'movement-video-2', 
  className = '',
  isEmbedded = false,
  isActive = true,
}: MovementSecondVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);

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

  // Pause when scrolled out of view, resume when back in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (isActive) {
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isActive]);

  const cardContent = (
    <div 
      onClick={() => togglePlay()}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[360px] sm:min-h-[480px] lg:min-h-[640px] max-h-[86vh] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden bg-black flex items-center justify-center group cursor-pointer select-none shadow-[0_20px_60px_rgba(44,36,29,0.12)] border border-stone-800/30"
    >
      <video
        ref={videoRef}
        src={storyVideo2}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />

      {/* Ambient Subtle Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(18,12,8,0.45)_100%)]" 
        aria-hidden="true"
      />

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
    </div>
  );

  if (isEmbedded) {
    return (
      <div id={id} className={`w-full ${className}`}>
        {cardContent}
      </div>
    );
  }

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-2 sm:pt-4 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {cardContent}
      </div>
    </section>
  );
}

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';
import VideoEndedVerbiageOverlay from '@/components/common/VideoEndedVerbiageOverlay';
import { howWeServeManifesto } from '@/data/officialVerbiage';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';
import defaultTableVideo from '@/assets/video/gemini_generated_video_fd16485a.mp4.mp4';

export interface HowWeServeHeroProps {
  id?: string;
  className?: string;
  videoSrc?: string;
  posterSrc?: string;
  loop?: boolean;
}

export default function HowWeServeHero({
  id = 'how-we-serve-hero',
  className = '',
  videoSrc = defaultTableVideo,
  posterSrc,
  loop = true,
}: HowWeServeHeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);
  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/a-place-at-the-table', '/how-we-serve'],
    slotMatchers: ['table', 'serve', 'hero'],
    fallbackUrl: videoSrc,
  });

  const effectiveVideoUrl = videoSrc || liveVideo.videoUrl || defaultTableVideo;

  // Auto pause & mute when scrolling past this hero section
  useAutoPauseOnScroll(videoRef, setIsPlaying, setIsMuted, { autoResumeMuted: loop });

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

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none ${className}`}
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
          {/* Video (Fades out smoothly on completion to reveal verbiage) */}
          <video
            ref={videoRef}
            src={effectiveVideoUrl}
            poster={posterSrc || liveVideo.posterUrl}
            autoPlay
            loop={loop}
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={() => {
              if (!loop) {
                setIsEnded(true);
                setIsPlaying(false);
              }
            }}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              isEnded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <VideoEndedVerbiageOverlay
            visible={isEnded}
            eyebrow={howWeServeManifesto.title}
            title={howWeServeManifesto.quote}
            lead={howWeServeManifesto.lead}
            body={howWeServeManifesto.body}
            ctaLabel="Explore Showdown"
            ctaHref="/suicide-awareness-showdown"
            onReplay={handleReplay}
            onScrollDown={handleScrollDown}
          />

          {/* Ambient Subtle Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(18,12,8,0.45)_100%)]" 
            aria-hidden="true"
          />





          {/* ─── Floating Audio Toggle Button (Top Right, Consistent & Highly Visible) ─── */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-30 pointer-events-auto">
            <button
              onClick={toggleMute}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-sans font-semibold tracking-wide uppercase transition-all duration-200 shadow-2xl cursor-pointer backdrop-blur-md ${
                isMuted
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:scale-105 animate-pulse'
                  : 'bg-black/70 hover:bg-black/90 text-white border border-white/30'
              }`}
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
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

          {/* ─── Floating Play/Pause Button (Top Left) ─── */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-30 pointer-events-auto">
            <button
              onClick={togglePlay}
              type="button"
              className="p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/25 text-white/90 hover:text-white transition-all shadow-xl cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5 text-[#F97316]" />
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


import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';
import interludeVideo from '@/assets/how-we-serve/serve-beside-us/Untitled design (2).mp4.mp4';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

export interface FamilyTableVideoInterludeSectionProps {
  id?: string;
  className?: string;
  onScrollClick?: () => void;
}

export default function FamilyTableVideoInterludeSection({
  id = 'serve-video-interlude',
  className = '',
}: FamilyTableVideoInterludeSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto pause & mute when scrolling past this section
  useAutoPauseOnScroll(videoRef, setIsPlaying, setIsMuted, { autoResumeMuted: true });

  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/serve-beside-us', '/serve-beside-us'],
    slotMatchers: ['interlude', 'table', 'family'],
    slotIndex: 1,
    fallbackUrl: interludeVideo,
  });

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
  };

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

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-10 sm:py-14 lg:py-18 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => togglePlay()}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[360px] sm:min-h-[480px] lg:min-h-[640px] max-h-[86vh] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-black shadow-[0_20px_60px_rgba(44,36,29,0.12)] cursor-pointer group select-none"
        >
          <video
            ref={videoRef}
            src={liveVideo.videoUrl}
            poster={liveVideo.posterUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />

          {/* Ambient Subtle Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_65%,rgba(18,12,8,0.3)_100%)]" 
            aria-hidden="true"
          />

          {/* Floating Controls */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-30 flex items-center gap-2.5 pointer-events-auto">
            <button
              onClick={togglePlay}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-sans font-medium transition-all duration-200 shadow-xl"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
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
              onClick={toggleMute}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-sans font-medium transition-all duration-200 shadow-xl"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/80" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#F97316] animate-pulse" />
                  <span className="text-white">Sound Active</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

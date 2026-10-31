import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export interface WhoWeAreVideoSectionProps {
  id?: string;
  className?: string;
}

export default function WhoWeAreVideoSection({
  id = 'who-we-are-video',
  className = '',
}: WhoWeAreVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showPlayIconSplash, setShowPlayIconSplash] = useState<boolean>(false);

  // ─── 3D Tilt Physics via Framer Motion ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ─── Play / Pause Toggle ───
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setShowPlayIconSplash(true);
    setTimeout(() => setShowPlayIconSplash(false), 600);

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // ─── Audio Mute Toggle ───
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // ─── Viewport Intersection Observer ───
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setIsPlaying(true)).catch(() => {
              // Browser policy fallback
              video.muted = true;
              setIsMuted(true);
              video.play().catch(() => {});
            });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-8 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-8 lg:px-16 xl:px-20 overflow-hidden select-none flex justify-center items-center ${className}`}
    >
      {/* ─── Ambient 3D Depth Glow Behind Video ─── */}
      <div 
        className="absolute w-[80%] max-w-[1200px] h-[60%] rounded-full bg-gradient-to-r from-[#F97316]/10 via-[#FAF4E6]/5 to-[#8A5A36]/15 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1600px] relative z-10" style={{ perspective: 1400 }}>
        
        {/* ─── 3D Tilting Cinematic Frame ─── */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={togglePlay}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-video sm:aspect-[16/9] lg:aspect-[2.1/1] xl:aspect-[2.2/1] rounded-[24px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-[#1E1610] cursor-pointer shadow-[0_25px_80px_rgba(30,20,12,0.28)] border border-[#4A3828]/25 group"
        >
          {/* Main Video Stream */}
          <video
            ref={videoRef}
            src="/who/who-story-video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />

          {/* Cinematic Radial Vignette & Tone Grade */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(18,12,8,0.45)_100%)]" 
            aria-hidden="true"
          />

          {/* 3D Interactive Surface Glare Reflection */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(circle 600px at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 70%)`
              ),
            }}
            aria-hidden="true"
          />

          {/* ─── Play / Pause Splash Indicator Animation ─── */}
          {showPlayIconSplash && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl">
                {isPlaying ? (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
                ) : (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
                )}
              </div>
            </motion.div>
          )}

          {/* ─── Bottom-Right Animated 4-Point Star Sparkle Watermark ─── */}
          <motion.div 
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 lg:bottom-14 lg:right-16 z-20 pointer-events-none select-none"
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 text-white/50 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              <path
                d="M40 0C40 22.0914 47.9086 40 70 40C47.9086 40 40 57.9086 40 80C40 57.9086 32.0914 40 10 40C32.0914 40 40 22.0914 40 0Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>

          {/* ─── Bottom-Left Floating Audio & Play Pill Control ─── */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-12 z-20 flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleMute}
              type="button"
              className="group/btn flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-[13px] font-sans font-medium transition-all duration-200 shadow-lg"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white/80 group-hover/btn:text-white transition-colors" />
                  <span className="hidden sm:inline">Unmute Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#F97316] animate-pulse" />
                  <span className="hidden sm:inline text-white">Sound Active</span>
                </>
              )}
            </button>

            {/* Play/Pause Minimal Badge */}
            <div className="p-2 sm:p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-white transition-colors">
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
              )}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

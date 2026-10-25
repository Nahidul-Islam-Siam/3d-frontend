import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowDown,
  RotateCcw
} from 'lucide-react';
import welcomeVideo from '@/assets/video/welcome.mp4';
import SpotlightCanvas from './SpotlightCanvas';

interface WelcomeExperienceProps {
  onEnterStory?: () => void;
}

export default function WelcomeExperience({ onEnterStory }: WelcomeExperienceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // States
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(26);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlayingNormal, setIsPlayingNormal] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  // Target and current time for RAF lerping
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isScrubbingRef = useRef<boolean>(true);

  // Calculate duration once video metadata loads
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration || 26;
      setDuration(dur);
      setIsVideoLoaded(true);
      videoRef.current.currentTime = 0;
    }
  };

  // Scroll listener that binds scroll position to video progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isPlayingNormal) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Calculate how far we've scrolled inside this container
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetTimeRef.current = progress * duration;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [duration, isPlayingNormal]);

  // Smooth RAF loop to lerp video.currentTime without browser decoding lag
  useEffect(() => {
    let rafId: number;

    const lerpLoop = () => {
      if (videoRef.current && isVideoLoaded && !isPlayingNormal) {
        // Smoothly interpolate current time towards target time
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.02) {
          currentTimeRef.current += diff * 0.18;
          // Apply to HTML5 video element
          try {
            videoRef.current.currentTime = currentTimeRef.current;
          } catch {
            // Ignore minor abort errors during rapid scrubbing
          }
        }
      }
      rafId = requestAnimationFrame(lerpLoop);
    };

    rafId = requestAnimationFrame(lerpLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isVideoLoaded, isPlayingNormal]);

  // Toggle Mute / Unmute
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Toggle Standard Play / Pause Mode
  const togglePlayMode = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlayingNormal) {
      videoRef.current.pause();
      setIsPlayingNormal(false);
      isScrubbingRef.current = true;
    } else {
      videoRef.current.muted = isMuted;
      videoRef.current.play().then(() => {
        setIsPlayingNormal(true);
        isScrubbingRef.current = false;
      }).catch(() => {
        // Fallback to muted if browser autoplay policy blocks unmuted
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
          setIsPlayingNormal(true);
          isScrubbingRef.current = false;
        }
      });
    }
  };

  // Replay from start
  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    targetTimeRef.current = 0;
    currentTimeRef.current = 0;
    videoRef.current.currentTime = 0;
    if (isPlayingNormal) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Smoothly scroll down past the video track to enter the story
  const scrollToContent = () => {
    if (onEnterStory) {
      onEnterStory();
      return;
    }
    const target = document.getElementById('story-start');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      const scrollYTarget = window.innerHeight * 2.2;
      window.scrollTo({ top: scrollYTarget, behavior: 'smooth' });
    }
  };

  // Docking transformation as scroll reaches the end of the video track
  // Progress 0.0 -> 0.70: Fullscreen immersion
  // Progress 0.70 -> 1.0: Scales smoothly into rounded cinema card and fades in next section
  const scale = 1 - Math.max(0, (scrollProgress - 0.7) / 0.3) * 0.08;
  const borderRadius = Math.min(36, Math.max(0, (scrollProgress - 0.7) / 0.3) * 36);

  return (
    // Tall scroll trigger container (240vh provides ample smooth scrubbing room)
    <div 
      ref={containerRef} 
      className="relative w-full h-[240vh] bg-black select-none"
    >
      {/* Sticky Fullscreen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Subtle Ambient 3D Dust Motes */}
        <SpotlightCanvas />

        {/* Video Card with Dynamic Scroll Scale & Rounded Corners */}
        <div 
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            transition: 'transform 0.1s linear, border-radius 0.15s ease-out',
          }}
          className="relative w-full h-full max-w-[1920px] overflow-hidden bg-black shadow-2xl flex items-center justify-center"
        >
          {/* Main Video */}
          <video
            ref={videoRef}
            src={welcomeVideo}
            playsInline
            preload="auto"
            muted={isMuted}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlayingNormal(false)}
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />

          {/* ─── HUD TOP CONTROLS ─── */}
          <div className="absolute top-6 left-6 right-6 md:top-8 md:left-10 md:right-10 z-30 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              {/* Play/Pause Mode Badge */}
              <button
                onClick={togglePlayMode}
                aria-label={isPlayingNormal ? "Pause autoplay" : "Play continuously"}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-stone-200 text-xs font-serif tracking-wider uppercase transition-all hover:scale-105 shadow-xl"
              >
                {isPlayingNormal ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Auto-Play Video</span>
                  </>
                )}
              </button>

              {/* Reset / Replay Button */}
              <button
                onClick={handleReplay}
                aria-label="Replay from start"
                title="Replay from beginning"
                className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-stone-300 hover:text-white transition-all hover:scale-105 shadow-xl"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sound Toggle Pill */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase transition-all backdrop-blur-md shadow-2xl ${
                isMuted
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_25px_rgba(249,115,22,0.5)] animate-pulse hover:scale-105'
                  : 'bg-black/60 hover:bg-black/80 text-stone-200 border border-white/20'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-white" />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>

          {/* ─── CENTERED "SCROLL TO ENTER THE STORY" INDICATOR (FIGMA 844:103) ─── */}
          <AnimatePresence>
            {scrollProgress < 0.25 && !isPlayingNormal && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
              >
                <button
                  onClick={scrollToContent}
                  aria-label="Scroll to enter the story"
                  className="group flex flex-col items-center gap-3 cursor-pointer text-white transition-transform hover:scale-105"
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/55 hover:bg-black/80 border border-white/40 backdrop-blur-md text-[#FAF4E6] shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                    <div className="w-6 h-6 rounded-full border border-white/80 flex items-center justify-center">
                      <ArrowDown className="w-3.5 h-3.5 text-[#F97316] animate-bounce" />
                    </div>
                    <span 
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap"
                    >
                      SCROLL TO ENTER THE STORY
                    </span>
                  </div>

                  <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400/90 drop-shadow">
                    Scroll down to play
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── BOTTOM SCRUBBER PROGRESS LINE ─── */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 pointer-events-none">
            <div 
              style={{ width: `${scrollProgress * 100}%` }}
              className="h-full bg-gradient-to-r from-[#F97316] to-[#f59e0b] shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-75"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

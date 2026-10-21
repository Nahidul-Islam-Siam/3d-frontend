import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ArrowDown
} from 'lucide-react';
import welcomeVideo from '@/assets/video/welcome.mp4';
import SpotlightCanvas from './SpotlightCanvas';
import ScrollIndicator3D from './ScrollIndicator3D';

interface WelcomeExperienceProps {
  onEnterHallway?: () => void;
}

export default function WelcomeExperience({ onEnterHallway }: WelcomeExperienceProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Starts as unrevealed cinema on every load/refresh
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(26);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);

  // Sync video start with preloader wipe: Never play in the background before preloader is done
  useEffect(() => {
    const isDone = typeof window !== 'undefined' && (window as unknown as { __preloaderDone?: boolean }).__preloaderDone;
    if (isDone) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    // Freeze video at 0.00 while preloader is on screen
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }

    const handlePreloaderComplete = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    window.addEventListener('preloader-complete', handlePreloaderComplete);
    return () => window.removeEventListener('preloader-complete', handlePreloaderComplete);
  }, []);

  // Trigger the grand reveal sequence (navbar glides in, video docks into card, footer unlocks)
  const triggerReveal = useCallback(() => {
    setIsRevealed(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('reveal-navbar'));
      document.body.style.overflow = '';
    }
  }, []);
  

  // Lock body scroll during full cinema intro, but detect scroll intent to trigger reveal
  useEffect(() => {
    if (!isRevealed) {
      document.body.style.overflow = 'hidden';

      // Wheel listener: Scrolling down reveals the page immediately
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY > 15) {
          triggerReveal();
        }
      };

      // Touch listener: Swiping up reveals the page
      let startY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        startY = e.touches[0].clientY;
      };
      const handleTouchMove = (e: TouchEvent) => {
        const currentY = e.touches[0].clientY;
        if (startY - currentY > 25) {
          triggerReveal();
        }
      };

      // Key listener: Arrow down or space reveals
      const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
          triggerReveal();
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isRevealed, triggerReveal]);

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Time update listener - automatically reveals page at 21.5s when host says "Welcome home"
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Auto-reveal when host welcomes visitor home and golden doors illuminate
    if (!isRevealed && time >= 21.5) {
      triggerReveal();
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 26);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (!isRevealed) {
      triggerReveal();
    }
  };

  // Toggle Play / Pause
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowPlayPulse(true);
    setTimeout(() => setShowPlayPulse(false), 600);
  };

  // Toggle Mute / Unmute
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted === false && !isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Click on screen during cinema mode: if muted -> unmute; otherwise toggle play
  const handleScreenClick = () => {
    if (isMuted) {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        if (!isPlaying) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
    } else {
      togglePlay();
    }
  };

  // Replay video from start
  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  // Fullscreen toggle
  const toggleFullscreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Scrubber seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Smooth scroll past the video into story
  const scrollToStory = () => {
    if (onEnterHallway) {
      onEnterHallway();
      return;
    }
    const target = document.getElementById('story-start');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full transition-colors duration-1000 ${isRevealed ? 'bg-[#FAF4E6] py-3 md:py-6 px-4 sm:px-6 lg:px-8' : 'bg-black p-0'}`}>
      <div className={`w-full ${isRevealed ? 'max-w-[1856px] mx-auto' : ''}`}>
        
        {/* SINGLE CONTINUOUS CINEMA CONTAINER */}
        <div
          ref={containerRef}
          onClick={!isRevealed ? handleScreenClick : undefined}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className={
            isRevealed
              ? "relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-black shadow-2xl aspect-[16/9] md:aspect-[21/10] lg:h-[870px] max-h-[88vh] flex items-center justify-center select-none group transition-all duration-1000 ease-out"
              : "fixed inset-0 z-40 w-screen h-screen rounded-none bg-black overflow-hidden flex items-center justify-center select-none cursor-pointer transition-all duration-1000 ease-out"
          }
        >
          {/* Subtle 3D Dust Particles (Clean, no wireframe sphere) */}
          {!isRevealed && <SpotlightCanvas />}

          {/* THE SINGLE CONTINUOUS HTML5 VIDEO */}
          <video
            ref={videoRef}
            src={welcomeVideo}
            playsInline
            preload="auto"
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className={`w-full h-full object-cover ${isRevealed ? 'cursor-pointer' : 'pointer-events-none'}`}
            onClick={isRevealed ? () => togglePlay() : undefined}
          />

          {/* ──────────────────────────────────────────────────────────
              CINEMA HUD (ONLY VISIBLE DURING !isRevealed CINEMA MODE)
              Clean theater: Only Sound Toggle + 3D Scroll Indicator
              ────────────────────────────────────────────────────────── */}
          {!isRevealed && (
            <>
              {/* Subtle Screen Ambient Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />

              {/* Sound Toggle Pill (Top Right) */}
              <div className="absolute top-6 right-6 md:right-12 z-50 pointer-events-auto">
                <button
                  onClick={(e) => toggleMute(e)}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase transition-all backdrop-blur-md shadow-2xl ${
                    isMuted 
                      ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-pulse hover:scale-105' 
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

              {/* Central Play/Pause Pulse indicator */}
              <AnimatePresence>
                {showPlayPulse && (
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute pointer-events-none w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl"
                  >
                    {isPlaying ? <Play className="w-8 h-8 ml-1 text-[#F97316]" /> : <Pause className="w-8 h-8 text-white" />}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Minimal 3D Scroll Indicator (Centered) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
                <ScrollIndicator3D onClick={triggerReveal} />
              </div>
            </>
          )}

          {/* ──────────────────────────────────────────────────────────
              DOCKED CARD CONTROLS (ONLY VISIBLE ONCE isRevealed)
              ────────────────────────────────────────────────────────── */}
          {isRevealed && (
            <>
              {/* Floating Sound Toggle Pill (Top Right) */}
              <div className="absolute top-5 right-5 md:top-8 md:right-8 z-30">
                <button
                  onClick={(e) => toggleMute(e)}
                  aria-label={isMuted ? "Unmute Welcome Video" : "Mute Welcome Video"}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase transition-all backdrop-blur-md shadow-xl ${
                    isMuted
                      ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white hover:scale-105 shadow-[0_0_25px_rgba(249,115,22,0.5)]'
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

              {/* Central Play/Replay Button when Paused or Ended */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.button
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => togglePlay(e)}
                    aria-label="Play video"
                    className="absolute z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 hover:bg-black/80 border border-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                  >
                    <Play className="w-7 h-7 md:w-9 md:h-9 translate-x-0.5 text-[#F97316]" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Centered Figma 844:103 "SCROLL TO ENTER THE STORY" Indicator */}
              <motion.button
                onClick={scrollToStory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                aria-label="Scroll to enter the story"
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/45 hover:bg-black/70 border border-[#F5F1E8]/60 backdrop-blur-md text-[#F5F1E8] transition-all hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer group/btn"
              >
                <div className="w-6 h-6 rounded-full border border-[#F5F1E8] flex items-center justify-center">
                  <ArrowDown className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                </div>
                <span className="font-serif font-bold text-xs md:text-sm tracking-wider uppercase whitespace-nowrap">
                  SCROLL TO ENTER THE STORY
                </span>
              </motion.button>

              {/* On-Hover Video Controls Bar */}
              <div
                className={`absolute inset-x-0 bottom-0 z-20 pt-16 pb-4 px-6 md:px-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Timeline Progress Bar */}
                <div className="relative w-full flex items-center mb-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#F97316] hover:h-2 transition-all"
                    style={{
                      background: `linear-gradient(to right, #F97316 0%, #F97316 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>

                {/* Controls Buttons */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-300">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => togglePlay(e)}
                      aria-label={isPlaying ? "Pause" : "Play"}
                      className="p-1.5 hover:text-white transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => handleReplay(e)}
                      aria-label="Replay from start"
                      className="p-1.5 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => toggleMute(e)}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="p-1.5 hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-orange-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="font-mono text-[11px] text-stone-400">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleFullscreen(e)}
                      aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      className="p-1.5 hover:text-white transition-colors"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

      {/* Target anchor for smooth scroll past the video */}
      {isRevealed && <div id="story-start" className="w-full pt-8" />}
    </div>
  );
}

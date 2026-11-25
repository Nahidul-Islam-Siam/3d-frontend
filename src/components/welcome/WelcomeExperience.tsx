import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize
} from 'lucide-react';
import welcomeVideo from '@/assets/video/welcome.mp4';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';
import SpotlightCanvas from './SpotlightCanvas';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';

interface WelcomeExperienceProps {
  onEnterHallway?: () => void;
}

export default function WelcomeExperience({ onEnterHallway: _onEnterHallway }: WelcomeExperienceProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Docked cinema card matches Figma design 1:1 with navbar visible immediately
  const [isRevealed, setIsRevealed] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(26);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);

  // Auto pause & mute when scrolling past this welcome video
  useAutoPauseOnScroll(videoRef, setIsPlaying, setIsMuted);

  const liveWelcomeVideo = usePublicVideoSlot({
    pagePaths: ['/', '/ (Homepage)'],
    slotMatchers: ['welcome', 'hero'],
    fallbackUrl: welcomeVideo,
  });

  // Start video immediately on load without waiting for countdown or preloader
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('reveal-navbar'));
      document.body.style.overflow = '';
    }

    // Gesture listener to unmute if browser policy initially required user interaction
    const handleFirstGesture = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    const startPlaybackWithSound = () => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);

      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Fallback to muted if browser blocks unmuted autoplay without prior interaction
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        });
    };

    startPlaybackWithSound();

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  // Trigger the grand reveal sequence (navbar glides in, video docks into card, footer unlocks)
  const triggerReveal = useCallback(() => {
    setIsRevealed(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('reveal-navbar'));
      document.body.style.overflow = '';
    }
  }, []);

  // Sync navbar if already revealed in current session
  useEffect(() => {
    if (isRevealed && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('reveal-navbar'));
      document.body.style.overflow = '';
    }
  }, [isRevealed]);
  

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

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full transition-colors duration-1000 ${isRevealed ? 'bg-[#FAF4E6] pt-[84px] pb-4 md:pb-8 px-4 sm:px-6 lg:px-8' : 'bg-black p-0'}`}>
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
            src={liveWelcomeVideo.videoUrl}
            poster={liveWelcomeVideo.posterUrl}
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
              PERMANENT FLOATING SOUND TOGGLE (ALWAYS VISIBLE, Z-50)
              ────────────────────────────────────────────────────────── */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 pointer-events-auto">
            <button
              onClick={(e) => toggleMute(e)}
              type="button"
              aria-label={isMuted ? "Unmute Welcome Video" : "Mute Welcome Video"}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-sans font-semibold tracking-wide uppercase transition-all backdrop-blur-md shadow-2xl cursor-pointer ${
                isMuted
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:scale-105 animate-pulse'
                  : 'bg-black/70 hover:bg-black/90 text-white border border-white/30 hover:border-white/60'
              }`}
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

          {/* ──────────────────────────────────────────────────────────
              CINEMA HUD (ONLY VISIBLE DURING !isRevealed CINEMA MODE)
              ────────────────────────────────────────────────────────── */}
          {!isRevealed && (
            <>
              {/* Subtle Screen Ambient Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.65)_100%)]" />

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


            </>
          )}

          {/* ──────────────────────────────────────────────────────────
              DOCKED CARD CONTROLS (ONLY VISIBLE ONCE isRevealed)
              ────────────────────────────────────────────────────────── */}
          {isRevealed && (
            <>
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

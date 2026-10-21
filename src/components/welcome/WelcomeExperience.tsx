import { useState, useRef, useEffect } from 'react';
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

interface WelcomeExperienceProps {
  onEnterHallway?: () => void;
}

export default function WelcomeExperience({ onEnterHallway }: WelcomeExperienceProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(26);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Trigger navbar reveal after video begins (at 1.4s when spotlight hits "WELCOME")
  useEffect(() => {
    const navTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('reveal-navbar'));
    }, 1400);

    return () => clearTimeout(navTimer);
  }, []);

  // Sync fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Unmute and ensure playing when tapping sound prompt
  const enableSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    if (!isPlaying) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Replay video from start
  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 26);
    }
  };

  // Video ended
  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Scrubber change
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Smooth scroll past the video into the story
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

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="w-full bg-[#FAF4E6] py-3 md:py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      {/* Outer Hero Container Matching Figma 844:9 Frame */}
      <div className="w-full max-w-[1856px] mx-auto">
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-black shadow-2xl aspect-[16/9] md:aspect-[21/10] lg:h-[870px] max-h-[88vh] flex items-center justify-center select-none group"
        >
          {/* Native HTML5 Video Element */}
          <video
            ref={videoRef}
            src={welcomeVideo}
            playsInline
            autoPlay
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
          />

          {/* Floating Sound Toggle Badge (Top Right) */}
          <div className="absolute top-5 right-5 md:top-8 md:right-8 z-30">
            <button
              onClick={enableSound}
              aria-label={isMuted ? "Unmute Welcome Video" : "Mute Welcome Video"}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase transition-all backdrop-blur-md shadow-xl ${
                isMuted
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white hover:scale-105 shadow-[0_0_25px_rgba(249,115,22,0.5)] animate-pulse'
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

          {/* Floating Replay Button if Paused / Ended */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 hover:bg-black/80 border border-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
              >
                <Play className="w-7 h-7 md:w-9 md:h-9 translate-x-0.5 text-[#F97316]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Centered "SCROLL TO ENTER THE STORY" Indicator matching Figma 844:103 */}
          <motion.button
            onClick={scrollToStory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
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

          {/* Bottom Video Controls Overlay (Fade in on hover or when controls shown) */}
          <div
            className={`absolute inset-x-0 bottom-0 z-20 pt-16 pb-4 px-6 md:px-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Timeline Progress Bar */}
            <div className="relative w-full flex items-center mb-3 group/timeline">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#F97316] hover:h-2.5 transition-all"
                style={{
                  background: `linear-gradient(to right, #F97316 0%, #F97316 ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            {/* Bottom Bar Buttons */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-300">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="p-1.5 hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleReplay}
                  aria-label="Replay from start"
                  className="p-1.5 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="p-1.5 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-orange-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-stone-400">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="p-1.5 hover:text-white transition-colors"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target anchor for smooth scroll navigation */}
      <div id="story-start" className="w-full pt-8" />
    </section>
  );
}

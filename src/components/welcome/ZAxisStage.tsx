import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  ArrowRight,
  ExternalLink,
  X,
  Maximize2,
  Mail,
  Phone,
  Globe,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Assets
import welcomeVideo from '@/assets/video/welcome.mp4';
import doorsSectionImg from '@/assets/welcome/doors-section.png';
import seenImg from '@/assets/welcome/seen.png';
import heardImg from '@/assets/welcome/heard.png';
import hopeImg from '@/assets/welcome/hope.png';
import auditionBanner from '../../assets/welcome/audition_banner.png';
import showdownPoster from '@/assets/welcome/showdown-poster.png';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';
import mealsIcon from '@/assets/icons/utensils4.png';
import mentorIcon from '@/assets/icons/utensils3.png';
import storiesIcon from '@/assets/icons/utensils2.png';
import partnersIcon from '@/assets/icons/utensils.png';
import FigmaButton from '@/components/common/FigmaButton';
import Footer from '@/components/partials/footer';
import SpotlightCanvas from './SpotlightCanvas';


const stats = [
  { value: "12,400+", label: "Meals Shared", icon: mealsIcon },
  { value: "1,200", label: "Mentor Matches", icon: mentorIcon },
  { value: "380", label: "Stories Told", icon: storiesIcon },
  { value: "64", label: "Community Partners", icon: partnersIcon },
];

const doors = [
  { id: 'story', title: 'Experience the Story', subtitle: 'watch & feel it', path: '/about', tag: 'Documentary', left: '10%', width: '19%' },
  { id: 'serve', title: 'How We Serve', subtitle: 'step into our work', path: '/how-we-serve', tag: 'Pathways', left: '30%', width: '19%' },
  { id: 'movement', title: 'Join the Movement', subtitle: 'be part of it', path: '/movement', tag: 'Community', left: '51%', width: '19%' },
  { id: 'meet', title: 'Meet Us', subtitle: 'the people here', path: '/meet-us', tag: 'Stewards', left: '71%', width: '19%' },
];

const pillars = [
  { title: 'SEEN', subtitle: 'People deserve to be seen', image: seenImg },
  { title: 'HEARD', subtitle: 'Every story deserves a voice.', image: heardImg },
  { title: 'HOPE', subtitle: 'Every person deserves hope.', image: hopeImg },
];

interface ChapterTransform {
  transform: string;
  opacity: number;
  pointerEvents: 'auto' | 'none';
  visibility: 'visible' | 'hidden';
  zIndex: number;
}

// 3D fly-through transformation with deep camera dolly tunnel (Edolus vibes)
function getChapterTransform(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
  isLastChapter: boolean = false
): ChapterTransform {
  // Before arrival: waiting deep back in 3D tunnel
  if (progress < enterStart) {
    return {
      transform: 'translateZ(-750px) scale(0.68) translateY(55px) rotateX(4deg)',
      opacity: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      zIndex: 5,
    };
  }

  // Incoming 3D Dolly Entrance: flying towards camera from deep Z space
  if (progress >= enterStart && progress < enterEnd) {
    const rawRatio = (progress - enterStart) / (enterEnd - enterStart);
    // Smooth cubic deceleration as it locks into the focal plane
    const easeOutCubic = 1 - Math.pow(1 - rawRatio, 3);
    const translateZ = -750 * (1 - easeOutCubic);
    const scale = 0.68 + 0.32 * easeOutCubic;
    const translateY = 55 * (1 - easeOutCubic);
    const rotateX = 4 * (1 - easeOutCubic);
    const opacity = Math.min(1, Math.pow(rawRatio, 0.75));

    return {
      transform: `translateZ(${translateZ}px) scale(${scale}) translateY(${translateY}px) rotateX(${rotateX}deg)`,
      opacity,
      pointerEvents: rawRatio > 0.5 ? 'auto' : 'none',
      visibility: 'visible',
      zIndex: 20,
    };
  }

  // Active reading plateau: subtle continuous cinematic float through space
  if (progress >= enterEnd && (isLastChapter || progress <= exitStart)) {
    const span = Math.max(0.001, exitStart - enterEnd);
    const rawRatio = Math.min(1, Math.max(0, (progress - enterEnd) / span));
    // Gentle forward dolly drift (Edolus floating camera feel)
    const microZ = 35 * rawRatio;
    const microScale = 1.0 + 0.025 * rawRatio;
    return {
      transform: `translateZ(${microZ}px) scale(${microScale}) translateY(0px) rotateX(0deg)`,
      opacity: 1,
      pointerEvents: 'auto',
      visibility: 'visible',
      zIndex: 25,
    };
  }

  // Outgoing 3D Fly-Through Exit: flying PAST the camera into positive Z space (Edolus fly-through)
  if (!isLastChapter && progress > exitStart && progress <= exitEnd) {
    const rawRatio = (progress - exitStart) / (exitEnd - exitStart);
    // Accelerating curve as camera punches through the section
    const easeInCubic = Math.pow(rawRatio, 2.2);
    const translateZ = 35 + 680 * easeInCubic;
    const scale = 1.025 + 0.35 * easeInCubic;
    const translateY = -45 * easeInCubic;
    const rotateX = -3 * easeInCubic;
    // Dissolves outward as it sweeps past camera lens
    const opacity = Math.max(0, 1 - Math.pow(rawRatio, 1.25));

    return {
      transform: `translateZ(${translateZ}px) scale(${scale}) translateY(${translateY}px) rotateX(${rotateX}deg)`,
      opacity,
      pointerEvents: rawRatio < 0.25 ? 'auto' : 'none',
      visibility: 'visible',
      zIndex: 30,
    };
  }

  // Passed completely (beyond camera plane)
  return {
    transform: 'translateZ(720px) scale(1.38) translateY(-45px)',
    opacity: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    zIndex: 5,
  };
}

function getVideoTransform(progress: number): ChapterTransform {
  if (progress <= 0.15) {
    return {
      transform: 'translateZ(0px) scale(1)',
      opacity: 1,
      pointerEvents: 'auto',
      visibility: 'visible',
      zIndex: 25,
    };
  }
  if (progress <= 0.22) {
    const rawRatio = (progress - 0.15) / 0.07;
    const easeIn = Math.pow(rawRatio, 2);
    const translateZ = 680 * easeIn;
    const scale = 1 + 0.35 * easeIn;
    const rotateX = -2.5 * easeIn;
    const opacity = Math.max(0, 1 - Math.pow(rawRatio, 1.3));
    return {
      transform: `translateZ(${translateZ}px) scale(${scale}) rotateX(${rotateX}deg)`,
      opacity,
      pointerEvents: rawRatio < 0.25 ? 'auto' : 'none',
      visibility: 'visible',
      zIndex: 20,
    };
  }
  return {
    transform: 'translateZ(700px) scale(1.35)',
    opacity: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    zIndex: 5,
  };
}

interface ShowdownSectionProps {
  isModal?: boolean;
  onOpenModal?: () => void;
}

function ShowdownSection({ isModal = false, onOpenModal }: ShowdownSectionProps) {
  return (
    <div className={`w-full mx-auto flex flex-col items-center ${isModal ? 'max-w-[840px] space-y-6 sm:space-y-8 px-2 sm:px-4 py-2' : 'max-w-[720px] space-y-2.5 sm:space-y-3.5 px-2'}`}>
      
      {/* ─── 1. TOP HEADER: REAL TEXT & INTERACTIVE BUTTONS ─── */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pb-2 border-b border-white/10 shrink-0">
        <div className="space-y-0.5 text-left">
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-tight"
          >
            What’s Coming Up Next
          </h2>
          <p className="text-xs sm:text-[13px] text-stone-300 font-sans leading-normal">
            Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://tickets.liveachievebelieve.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-[11px] font-serif font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>TICKETS OPEN NOW</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-white text-[11px] font-serif font-medium tracking-wider hover:scale-105 transition-all cursor-pointer"
          >
            <span>Audition The Show</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── 2. POSTER BANNER: FITTED FULLY ON SCREEN (NO SIDED CUT-OFF) ─── */}
      <div 
        onClick={onOpenModal}
        className={`relative rounded-[14px] sm:rounded-[18px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/15 bg-black shrink-0 ${onOpenModal ? 'cursor-pointer group' : ''}`}
      >
        <img
          src={isModal ? showdownPoster : auditionBanner}
          alt="Showdown Suicide Awareness Event - Where Are You Now? Letters to Etcetera"
          className={isModal 
            ? "w-full h-auto object-cover block" 
            : "h-auto max-h-[calc(100vh-215px)] sm:max-h-[calc(100vh-225px)] w-auto max-w-full aspect-[1978/1620] object-contain block mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
          }
        />
        {onOpenModal && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/30 text-white text-xs font-serif tracking-wider uppercase flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
              <Maximize2 className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Click for Full Details & Auditions</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── 3. "IMPORTANT INFORMATION" PILL BUTTON ─── */}
      <div className="flex flex-col items-center justify-center pt-0.5 shrink-0">
        <button 
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#241135] hover:bg-[#34184c] border border-purple-400/30 text-stone-300 hover:text-white text-[11px] font-sans tracking-wide shadow-md transition-all cursor-pointer group"
        >
          <span>Important Information & Audition Details</span>
          <ChevronDown className="w-3.5 h-3.5 text-purple-300 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* ─── 4. BOTTOM 2-COLUMN INFORMATION CARD: REAL TEXT & BUTTONS (Rendered in modal) ─── */}
      {isModal && (
        <div 
          id="modal-audition-card"
          className="w-full rounded-[18px] sm:rounded-[22px] border border-purple-500/30 bg-gradient-to-br from-[#1C092E]/95 via-[#150624]/95 to-[#10031B]/98 p-5 sm:p-7 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-md mt-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Requirements */}
            <div className="lg:col-span-7 space-y-3.5 text-left">
              <h3 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase leading-snug"
              >
                WE WOULD STILL LOVE TO SEE YOUR TALENT.
              </h3>

              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm font-semibold text-stone-200 font-sans">
                  Please include:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-300 font-sans leading-relaxed list-disc list-inside">
                  <li><strong className="text-white font-medium">All performers:</strong> A current headshot and a video of yourself performing a monologue.</li>
                  <li><strong className="text-white font-medium">Singers:</strong> An additional, separate video singing a portion of a song that showcases your voice.</li>
                  <li><strong className="text-white font-medium">Dancers:</strong> An additional, separate video demonstrating your dance ability.</li>
                  <li><strong className="text-white font-medium">Singers and dancers:</strong> You may submit both additional videos.</li>
                  <li>Include your name and contact information with your submission.</li>
                </ul>
              </div>

              <p className="pt-2.5 border-t border-white/10 text-[11px] text-stone-400 font-sans italic leading-relaxed">
                This production explores sensitive themes involving mental health and suicide awareness. Performers are not expected to share personal experiences.
              </p>
            </div>

            {/* Right Column: Contact Details */}
            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-6 space-y-3.5 text-left">
              <div>
                <h4 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-base sm:text-lg font-bold text-white tracking-wide"
                >
                  Live Achieve Believe, Inc.
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  People Matter. Every Story Matters.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                {/* Audition Email */}
                <a 
                  href="mailto:auditions@thelab-inc.org"
                  className="group flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-purple-300 group-hover:text-[#F97316] group-hover:border-orange-500/30 transition-colors shrink-0">
                    <Mail className="w-3 h-3" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-sans">Audition Inquiries</span>
                    <span className="block text-xs text-stone-200 group-hover:text-white transition-colors truncate">auditions@thelab-inc.org</span>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href="tel:8132553592"
                  className="group flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-purple-300 group-hover:text-[#F97316] group-hover:border-orange-500/30 transition-colors shrink-0">
                    <Phone className="w-3 h-3" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-sans">Phone</span>
                    <span className="block text-xs text-stone-200 group-hover:text-white transition-colors truncate">813-255-3592</span>
                  </div>
                </a>

                {/* Website */}
                <a 
                  href="https://thelab-inc.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-purple-300 group-hover:text-[#F97316] group-hover:border-orange-500/30 transition-colors shrink-0">
                    <Globe className="w-3 h-3" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-sans">Website</span>
                    <span className="block text-xs text-stone-200 group-hover:text-white transition-colors truncate">thelab-inc.org</span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function ZAxisStage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // States
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVideoFinished, setIsVideoFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const navbarRevealedRef = useRef<boolean>(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState<boolean>(false);

  const openFlyerModal = () => {
    setIsFlyerModalOpen(true);
  };

  // Close flyer modal on Escape & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlyerModalOpen(false);
      }
    };
    if (isFlyerModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isFlyerModalOpen]);

  // Mouse tilt parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Camera velocity and inertia pitch (Edolus 3D camera feel)
  const [currentVelocity, setCurrentVelocity] = useState<number>(0);
  const [cameraPitch, setCameraPitch] = useState<number>(0);
  const currentPitchRef = useRef<number>(0);

  // Smooth lerping target progress
  const targetProgressRef = useRef<number>(0);

  // Handle Video Metadata & Playback Timing
  const hasStartedPlaybackRef = useRef<boolean>(false);

  const startVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    // Reset to beginning so viewer experiences the video from second 0
    if (!hasStartedPlaybackRef.current) {
      hasStartedPlaybackRef.current = true;
      video.currentTime = 0;
    }

    video.muted = false;
    setIsMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.muted = false;
          setIsMuted(false);
        })
        .catch(() => {
          // If browser policy blocks unmuted autoplay without prior interaction,
          // play muted first so video starts immediately after loading ends, and unmute on first interaction
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          const enableAudio = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setIsMuted(false);
            }
            window.removeEventListener('pointerdown', enableAudio);
            window.removeEventListener('touchstart', enableAudio);
            window.removeEventListener('scroll', enableAudio);
            window.removeEventListener('wheel', enableAudio);
            window.removeEventListener('keydown', enableAudio);
          };

          window.addEventListener('pointerdown', enableAudio, { once: true });
          window.addEventListener('touchstart', enableAudio, { once: true });
          window.addEventListener('scroll', enableAudio, { once: true });
          window.addEventListener('wheel', enableAudio, { once: true });
          window.addEventListener('keydown', enableAudio, { once: true });
        });
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const isPreloaderDone = typeof window !== 'undefined' && (window as unknown as { __preloaderDone?: boolean }).__preloaderDone;
      if (isPreloaderDone) {
        startVideoPlayback();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoEnded = () => {
    setIsVideoFinished(true);
  };

  // Video will start after loading ends
  useEffect(() => {
    const isAlreadyDone = typeof window !== 'undefined' && (window as unknown as { __preloaderDone?: boolean }).__preloaderDone;

    if (isAlreadyDone) {
      startVideoPlayback();
    } else {
      // Ensure video is paused at start (time 0) while preloader is active
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    const onPreloaderComplete = () => {
      startVideoPlayback();
    };

    window.addEventListener('preloader-complete', onPreloaderComplete);
    return () => {
      window.removeEventListener('preloader-complete', onPreloaderComplete);
    };
  }, []);

  // Scroll Progress Tracking with Lenis & window support
  useEffect(() => {
    const updateTarget = () => {
      if (!scrollContainerRef.current) return;
      const totalScrollable = scrollContainerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, window.scrollY / totalScrollable));
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    updateTarget();

    // Attach to Lenis instance if available
    const lenisInstance = (window as unknown as { __lenis?: { on: (event: string, cb: () => void) => void } }).__lenis;
    if (lenisInstance && typeof lenisInstance.on === 'function') {
      lenisInstance.on('scroll', updateTarget);
    }

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
    };
  }, []);

  // Snappy, energetic RAF loop for animated damping, 3D inertia & video scrubbing
  useEffect(() => {
    let rafId: number;
    let currentProgress = targetProgressRef.current;

    const loop = () => {
      const target = targetProgressRef.current;
      const diff = target - currentProgress;

      // Track frame velocity for 3D warp particle motes
      setCurrentVelocity(diff);

      // Responsive, animated interpolation damping
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.22;
        setScrollProgress(currentProgress);
      } else if (currentProgress !== target) {
        currentProgress = target;
        setScrollProgress(target);
      }

      // On scroll while video ends, navbar will show
      const shouldRevealNavbar = currentProgress >= 0.14 || (isVideoFinished && currentProgress > 0.04);
      if (shouldRevealNavbar !== navbarRevealedRef.current) {
        navbarRevealedRef.current = shouldRevealNavbar;
        window.dispatchEvent(new CustomEvent(shouldRevealNavbar ? 'reveal-navbar' : 'hide-navbar'));
      }

      // Dynamic 3D camera pitch based on scroll inertia (Edolus camera fly-through)
      const targetPitch = Math.max(-4.5, Math.min(4.5, -diff * 120));
      currentPitchRef.current += (targetPitch - currentPitchRef.current) * 0.16;
      setCameraPitch(currentPitchRef.current);

      // Manage video playback based on chapter visibility
      if (videoRef.current) {
        if (currentProgress > 0.22 && !videoRef.current.paused) {
          videoRef.current.pause();
        } else if (currentProgress <= 0.18 && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isVideoFinished]);

  // Mouse move tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 3;
    const y = (clientY / window.innerHeight - 0.5) * -3;
    setTilt({ x, y });
  };

  const videoZ = getVideoTransform(scrollProgress);

  return (
    // Brisk 750vh scroll distance: lively, animated progression without dragging slowly
    <div 
      ref={scrollContainerRef} 
      className="relative w-full h-[750vh] bg-black select-none"
    >
      {/* ─── FIXED CINEMATIC VIEWPORT (100vw x 100vh) ─── */}
      <div 
        onMouseMove={handleMouseMove}
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}
        className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0A0502] flex items-center justify-center z-10"
      >
        {/* Dynamic 3D Camera Rig with Mouse Look & Inertial Pitch */}
        <div 
          style={{
            transform: `rotateX(${tilt.y + cameraPitch}deg) rotateY(${tilt.x}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s cubic-bezier(0.1, 1, 0.1, 1)',
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Ambient motes in 3D depth reacting to scroll velocity */}
          <SpotlightCanvas velocity={currentVelocity} />

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 0: FULL-SCREEN VIDEO (0.00 to 0.18)
              ═══════════════════════════════════════════════════════════════ */}
          <div
            style={{
              transform: videoZ.transform,
              opacity: videoZ.opacity,
              zIndex: videoZ.zIndex,
              pointerEvents: videoZ.pointerEvents,
              visibility: videoZ.visibility,
              willChange: 'transform, opacity',
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black overflow-hidden"
          >
            <video
              ref={videoRef}
              src={welcomeVideo}
              playsInline
              preload="auto"
              muted={isMuted}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Ambient Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 1: "WE'VE BEEN EXPECTING YOU." (0.15 to 0.40)
              ═══════════════════════════════════════════════════════════════ */}
          {(() => {
            const z = getChapterTransform(scrollProgress, 0.15, 0.22, 0.34, 0.40);
            return (
              <div
                style={{
                  transform: z.transform,
                  opacity: z.opacity,
                  zIndex: z.zIndex,
                  pointerEvents: z.pointerEvents,
                  visibility: z.visibility,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#FAF4E6] px-6 sm:px-12 lg:px-20"
              >
                {/* Decorative flourish leaves in deep background layer */}
                <img 
                  src={leftLeaf} 
                  alt="" 
                  style={{ transform: 'translateZ(-25px)' }}
                  className="absolute left-0 bottom-12 w-28 sm:w-40 opacity-70 pointer-events-none select-none" 
                />
                <img 
                  src={rightLeaf} 
                  alt="" 
                  style={{ transform: 'translateZ(-25px)' }}
                  className="absolute right-0 bottom-12 w-28 sm:w-40 opacity-70 pointer-events-none select-none" 
                />

                <div 
                  style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
                  className="max-w-[1200px] w-full mx-auto relative z-10 space-y-10 sm:space-y-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Column */}
                    <div 
                      style={{ transform: 'translateZ(25px)' }}
                      className="lg:col-span-5 space-y-4"
                    >
                      <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Chapter 01</span>
                      </div>
                      <h2 
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-4xl sm:text-5xl lg:text-[52px] font-playfair font-bold text-[#F97316] tracking-tight leading-[1.06] uppercase"
                      >
                        WE’VE BEEN<br />EXPECTING YOU.
                      </h2>
                      <div className="space-y-1.5 text-sm sm:text-base text-[#6E6259] font-sans">
                        <p>Every person has a story.</p>
                        <p>Every story deserves to be heard.</p>
                        <p>Every person deserves hope.</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div 
                      style={{ transform: 'translateZ(25px)' }}
                      className="lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right space-y-4"
                    >
                      <p 
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-lg sm:text-xl lg:text-[22px] font-playfair leading-[1.4] max-w-xl text-left lg:text-right"
                      >
                        <span className="font-bold text-[#18181B]">This isn’t simply a website.</span>{" "}
                        <span className="text-[#7A6B60]">
                          It’s an invitation to experience a place where compassion becomes action, hope becomes visible, and{" "}
                        </span>
                        <span className="font-bold text-[#18181B]">Every story matters.</span>
                      </p>

                      <p 
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-lg sm:text-xl font-playfair font-semibold text-[#F97316]"
                      >
                        Including yours.
                      </p>

                      <div 
                        style={{ transform: 'translateZ(30px)' }}
                        className="flex flex-wrap items-center gap-3 pt-1"
                      >
                        <FigmaButton to="/how-we-serve" variant="primary">
                          Find Your Pathway
                        </FigmaButton>
                        <FigmaButton to="/movement" variant="outline">
                          Explore The Show
                        </FigmaButton>
                      </div>
                    </div>

                  </div>

                  {/* 4 Stat Badges */}
                  <div 
                    style={{ transform: 'translateZ(20px)' }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-orange-200/80"
                  >
                    {stats.map((s) => (
                      <div key={s.label} className="flex items-center gap-3.5 group">
                        <img src={s.icon} alt="" className="w-11 h-11 object-contain flex-shrink-0 group-hover:scale-105 transition-transform" />
                        <div>
                          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#231F20] leading-none">
                            {s.value}
                          </div>
                          <div className="text-xs text-[#6E6259] mt-1 whitespace-nowrap">
                            {s.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })()}

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 2: "WHERE WOULD YOU LIKE TO GO?" (0.36 to 0.54)
              ═══════════════════════════════════════════════════════════════ */}
          {(() => {
            const z = getChapterTransform(scrollProgress, 0.34, 0.40, 0.52, 0.58);
            return (
              <div
                style={{
                  transform: z.transform,
                  opacity: z.opacity,
                  zIndex: z.zIndex,
                  pointerEvents: z.pointerEvents,
                  visibility: z.visibility,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#201308] overflow-hidden select-none"
              >
                {/* 3D Doors Graphic - 1:1 identical to Figma design frame without duplicate headers or frames */}
                <div 
                  style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full max-w-[1920px] pt-[74px] pb-6 px-4 flex items-center justify-center"
                >
                  <div 
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative aspect-[1920/1080] max-h-full max-w-full w-full h-auto flex items-center justify-center"
                  >
                    <img 
                      src={doorsSectionImg} 
                      alt="Where would you like to go? Four open doors" 
                      className="w-full h-full object-contain block select-none pointer-events-none" 
                    />

                    {/* Clickable links positioned over each door (no overlay or highlight) */}
                    {doors.map((d) => (
                      <Link
                        key={d.id}
                        to={d.path}
                        title={d.title}
                        aria-label={`${d.title} - ${d.subtitle}`}
                        style={{
                          left: d.left,
                          width: d.width,
                          top: '12%',
                          bottom: '6%',
                        }}
                        className="absolute z-20 cursor-pointer block"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 3: "EVERY STORY MATTERS." (0.54 to 0.72)
              ═══════════════════════════════════════════════════════════════ */}
          {(() => {
            const z = getChapterTransform(scrollProgress, 0.52, 0.58, 0.70, 0.76);
            return (
              <div
                style={{
                  transform: z.transform,
                  opacity: z.opacity,
                  zIndex: z.zIndex,
                  pointerEvents: z.pointerEvents,
                  visibility: z.visibility,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#FAF4E6] px-6 sm:px-12 lg:px-20"
              >
                <div 
                  style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
                  className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                >
                  
                  {/* Left Column */}
                  <div 
                    style={{ transform: 'translateZ(25px)' }}
                    className="lg:col-span-5 space-y-4"
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Chapter 03</span>
                    </div>

                    <h2 
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-4xl sm:text-5xl lg:text-[50px] font-bold tracking-tight uppercase leading-[1.08]"
                    >
                      <span className="text-[#18181B]">EVERY </span>
                      <span className="text-[#F97316]">STORY</span>
                      <br />
                      <span className="text-[#18181B]">MATTERS.</span>
                    </h2>

                    <p className="text-sm sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-md">
                      Every story carries meaning, and every voice deserves to be heard. Experience an inspiring journey of real stories, human connection, and hope.
                    </p>
                  </div>

                  {/* Right Column: 3 Pillar Cards */}
                  <div 
                    style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
                    className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6"
                  >
                    {pillars.map((p) => (
                      <div 
                        key={p.title} 
                        style={{ transformStyle: 'preserve-3d' }}
                        className="group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:scale-105"
                      >
                        <div 
                          style={{ transform: 'translateZ(25px)' }}
                          className="w-full aspect-[4/5] rounded-[20px] overflow-hidden bg-stone-200 shadow-md border border-[#ecdac2] group-hover:shadow-2xl transition-all duration-500"
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                        <h3 
                          style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif",
                            transform: 'translateZ(35px)' 
                          }}
                          className="mt-3.5 text-lg sm:text-xl font-bold tracking-wider text-[#18181B] uppercase group-hover:text-[#F97316] transition-colors"
                        >
                          {p.title}
                        </h3>
                        <p 
                          style={{ transform: 'translateZ(20px)' }}
                          className="mt-0.5 text-xs text-[#7A6B60] font-sans"
                        >
                          {p.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            );
          })()}

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 4: "WHAT'S COMING UP NEXT" (0.72 to 0.88)
              ═══════════════════════════════════════════════════════════════ */}
          {(() => {
            const z = getChapterTransform(scrollProgress, 0.70, 0.76, 0.86, 0.91);
            return (
              <div
                style={{
                  transform: z.transform,
                  opacity: z.opacity,
                  zIndex: z.zIndex,
                  pointerEvents: z.pointerEvents,
                  visibility: z.visibility,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
                className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-[#140820] text-white pt-[78px] sm:pt-[82px] pb-4 px-4 sm:px-6 select-none overflow-hidden"
              >
                {/* Purple ambient backlights */}
                <div 
                  style={{ transform: 'translateZ(-40px)' }}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F97316]/15 rounded-full blur-[100px] pointer-events-none" 
                />

                <div 
                  style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
                  className="w-full relative z-10 flex flex-col items-center justify-center"
                >
                  <ShowdownSection onOpenModal={openFlyerModal} />
                </div>
              </div>
            );
          })()}

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 5: "YOU WERE EXPECTED." + SANCTUARY (0.88 to 1.00)
              ═══════════════════════════════════════════════════════════════ */}
          {(() => {
            const z = getChapterTransform(scrollProgress, 0.90, 0.94, 1.00, 1.00, true);
            return (
              <div
                style={{
                  transform: z.transform,
                  opacity: z.opacity,
                  zIndex: z.zIndex,
                  pointerEvents: z.pointerEvents,
                  visibility: z.visibility,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
                className="absolute inset-0 w-full h-full flex flex-col justify-between items-center bg-[#FAF4E6] pt-16 sm:pt-20 pb-0 px-0 overflow-y-auto overscroll-contain custom-modal-scrollbar"
              >
                {/* Flourish leaves in deep plane */}
                <img 
                  src={leftLeaf} 
                  alt="" 
                  style={{ transform: 'translateZ(-25px)' }}
                  className="absolute left-0 top-1/4 w-32 sm:w-44 opacity-60 pointer-events-none select-none" 
                />
                <img 
                  src={rightLeaf} 
                  alt="" 
                  style={{ transform: 'translateZ(-25px)' }}
                  className="absolute right-0 top-1/4 w-32 sm:w-44 opacity-60 pointer-events-none select-none" 
                />

                {/* Main Sanctuary Invitation */}
                <div 
                  style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
                  className="max-w-[760px] mx-auto text-center my-auto space-y-6 relative z-10 px-6 sm:px-10 py-6"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chapter 05 • Welcome Home</span>
                  </div>

                  <h2
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase"
                  >
                    <span className="text-[#18181B]">YOU WERE </span>
                    <span className="text-[#F97316]">EXPECTED.</span>
                  </h2>

                  <div className="space-y-2.5 text-sm sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-xl mx-auto">
                    <p>
                      Thank you for stepping inside. The table is prepared, the light is on, and you are welcome here.
                    </p>
                    <p>
                      Take your next step with us today. Whether reading stories or standing in our kitchen line, your presence completes our family.
                    </p>
                  </div>

                  <div 
                    style={{ transform: 'translateZ(30px)' }}
                    className="flex flex-wrap items-center justify-center gap-4 pt-2"
                  >
                    <FigmaButton to="/about" variant="primary">
                      Explore Our Story
                    </FigmaButton>
                    <FigmaButton to="/movement" variant="outline">
                      Join the Movement
                    </FigmaButton>
                  </div>
                </div>

                {/* ─── OFFICIAL FULL FIGMA FOOTER (Full Width) ─── */}
                <div 
                  style={{ transform: 'translateZ(20px)' }}
                  className="w-full pt-8 pb-0 relative z-10 shrink-0"
                >
                  <Footer className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-0 pb-6 bg-transparent" />
                </div>

              </div>
            );
          })()}

        </div>

        {/* ─── SHOWDOWN FULL FLYER MODAL (Portaled to document.body with z-[99999]) ─── */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {isFlyerModalOpen && (
              <div 
                className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* Dark blur backdrop covering the whole screen including navbar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setIsFlyerModalOpen(false)}
                  className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Dialog Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 15 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 340 }}
                  className="relative z-10 flex flex-col w-full max-w-[880px] h-[92vh] bg-[#14061F] border border-orange-500/30 rounded-[20px] sm:rounded-[24px] shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
                >
                  {/* Floating Close Button */}
                  <button
                    onClick={() => setIsFlyerModalOpen(false)}
                    aria-label="Close modal"
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white border border-white/20 transition-all cursor-pointer backdrop-blur-md shadow-lg"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Modal Content - Scrollable complete Figma design with full-width banner */}
                  <div 
                    data-lenis-prevent
                    className="flex-1 min-h-0 bg-gradient-to-b from-[#14061F] via-[#0E0316] to-[#0A0210] overflow-y-auto overscroll-contain custom-modal-scrollbar p-4 sm:p-8"
                  >
                    <ShowdownSection isModal={true} />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}


      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  ArrowRight,
  ArrowDown,
  ExternalLink,
  X,
  Maximize2,
  Mail,
  Phone,
  Globe,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

gsap.registerPlugin(ScrollTrigger);

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

interface ShowdownSectionProps {
  isModal?: boolean;
  onOpenModal?: () => void;
}

function ShowdownSection({ isModal = false, onOpenModal }: ShowdownSectionProps) {
  return (
    <div className={`w-full mx-auto flex flex-col items-center ${isModal ? 'max-w-[840px] space-y-6 sm:space-y-8 px-2 sm:px-4 py-2' : 'max-w-[720px] space-y-2.5 sm:space-y-3.5 px-2'}`}>
      
      {/* ─── 1. TOP HEADER: REAL TEXT & INTERACTIVE BUTTONS ─── */}
      <div className={`${isModal ? '' : 'ch4-header'} w-full flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 pb-2 border-b border-white/10 shrink-0`}>
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
        className={`${isModal ? '' : 'ch4-banner'} relative rounded-[14px] sm:rounded-[18px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/15 bg-black shrink-0 ${onOpenModal ? 'cursor-pointer group' : ''}`}
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
      <div className={`${isModal ? '' : 'ch4-pill'} flex flex-col items-center justify-center pt-0.5 shrink-0`}>
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const stageBgRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Chapter DOM refs for GSAP animation
  const ch0Ref = useRef<HTMLDivElement | null>(null);
  const ch1Ref = useRef<HTMLDivElement | null>(null);
  const ch2Ref = useRef<HTMLDivElement | null>(null);
  const ch3Ref = useRef<HTMLDivElement | null>(null);
  const ch4Ref = useRef<HTMLDivElement | null>(null);
  const ch5Ref = useRef<HTMLDivElement | null>(null);

  // Discrete application state
  const [isVideoFinished, setIsVideoFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const navbarRevealedRef = useRef<boolean>(false);
  const hasStartedPlaybackRef = useRef<boolean>(false);

  const openFlyerModal = () => {
    setIsFlyerModalOpen(true);
  };

  // Close flyer modal on Escape, coordinate body overflow & Lenis scroll lock
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlyerModalOpen(false);
      }
    };

    if (isFlyerModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      lenis?.stop();

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = prevOverflow;
        lenis?.start();
      };
    }
  }, [isFlyerModalOpen]);

  // Video playback management & preloader coordination
  const startVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

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
          // Autoplay policy fallback: start muted and unmute on first user interaction
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

  // Video starts when preloader completes
  useEffect(() => {
    const isAlreadyDone = typeof window !== 'undefined' && (window as unknown as { __preloaderDone?: boolean }).__preloaderDone;

    if (isAlreadyDone) {
      startVideoPlayback();
    } else {
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

  const handleScrollToStory = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: object) => void } }).__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(700);
    } else {
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
  };

  // ═════════════════════════════════════════════════════════════════
  // GSAP SCROLLTRIGGER MASTER TIMELINE CHOREOGRAPHY
  // Refined with +35% scroll distance, generous plateaus,
  // staggered multi-element choreography, and continuous overlapping handoffs
  // ═════════════════════════════════════════════════════════════════
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsReducedMotion(true);
      return;
    }

    const ctx = gsap.context(() => {
      const stageBg = stageBgRef.current;
      const ch0 = ch0Ref.current;
      const ch1 = ch1Ref.current;
      const ch2 = ch2Ref.current;
      const ch3 = ch3Ref.current;
      const ch4 = ch4Ref.current;
      const ch5 = ch5Ref.current;

      if (!stageBg || !ch0 || !ch1 || !ch2 || !ch3 || !ch4 || !containerRef.current || !pinnedStageRef.current) {
        return;
      }

      // Base chapter container initial states
      gsap.set([ch1, ch2, ch3, ch4], {
        autoAlpha: 0,
      });
      gsap.set(ch0, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });
      gsap.set(stageBg, {
        backgroundColor: '#000000',
      });

      // Internal sub-elements initial states for staggered entrance
      // Chapter 1
      gsap.set('.ch1-left-col', { autoAlpha: 0, y: 35 });
      gsap.set('.ch1-right-col', { autoAlpha: 0, y: 30 });
      gsap.set('.ch1-stat-item', { autoAlpha: 0, y: 25 });
      gsap.set('.ch1-leaf-left', { autoAlpha: 0, x: -25 });
      gsap.set('.ch1-leaf-right', { autoAlpha: 0, x: 25 });

      // Chapter 2
      gsap.set('.ch2-content', { autoAlpha: 0, y: 40, scale: 0.96 });

      // Chapter 3
      gsap.set('.ch3-left-col', { autoAlpha: 0, y: 35 });
      gsap.set('.ch3-card-item', { autoAlpha: 0, y: 45, scale: 0.95 });

      // Chapter 4
      gsap.set('.ch4-glow', { autoAlpha: 0, scale: 0.85 });
      gsap.set('.ch4-header', { autoAlpha: 0, y: 25 });
      gsap.set('.ch4-banner', { autoAlpha: 0, y: 35, scale: 0.96 });
      gsap.set('.ch4-pill', { autoAlpha: 0, y: 20 });

      // Chapter 0 Scroll Prompt
      gsap.set('.ch0-prompt', { autoAlpha: 1, y: 0 });

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };
        // Increased scroll travel by ~35% for a deliberate, cinematic pacing
        const scrollDistance = isDesktop ? 7000 : 5500;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            pin: pinnedStageRef.current,
            scrub: 1.0,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;

              // Navbar reveal threshold (reveals smoothly during Chapter 0 exit)
              const shouldReveal = p >= 0.07 || (isVideoFinished && p > 0.02);
              if (shouldReveal !== navbarRevealedRef.current) {
                navbarRevealedRef.current = shouldReveal;
                window.dispatchEvent(new CustomEvent(shouldReveal ? 'reveal-navbar' : 'hide-navbar'));
              }

              // Pause video when out of view, resume when back at top
              if (videoRef.current) {
                if (p > 0.15 && !videoRef.current.paused) {
                  videoRef.current.pause();
                } else if (p <= 0.15 && videoRef.current.paused) {
                  videoRef.current.play().catch(() => {});
                }
              }
            },
          },
        });

        // ─────────────────────────────────────────────────────────────
        // REFINED CHOREOGRAPHY: 15.2 Total Timeline Units
        // Generous plateaus, deliberate transitions, staggered elements
        // ─────────────────────────────────────────────────────────────

        // Chapter 0: Prompt fades out smoothly as soon as user begins scrolling
        tl.to('.ch0-prompt', {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: 'power1.out',
        }, 0.08);

        // ═════════════════════════════════════════════════════════════
        // CHAPTER 0: Full-Screen Video Hero
        // Plateau: 0.0 to 1.4 (Stable hold, viewer absorbs the mood)
        // Transition Ch 0 -> Ch 1: 1.4 to 2.6
        // ═════════════════════════════════════════════════════════════
        tl.to(ch0, {
          autoAlpha: 0,
          y: -35,
          scale: 1.02,
          duration: 1.2,
          ease: 'power1.inOut',
        }, 1.4)
        .to(stageBg, {
          backgroundColor: '#FAF4E6',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 1.4)

        // Chapter 1 Staggered Entrance (Overlapping start at 1.6)
        .to(ch1, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 1.6)
        .to('.ch1-left-col', {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        }, 1.6)
        .to(['.ch1-leaf-left', '.ch1-leaf-right'], {
          autoAlpha: 0.7,
          x: 0,
          duration: 1.0,
          ease: 'power1.out',
        }, 1.7)
        .to('.ch1-right-col', {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        }, 1.75)
        .to('.ch1-stat-item', {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
        }, 1.9);

        // ═════════════════════════════════════════════════════════════
        // CHAPTER 1: We've Been Expecting You
        // Plateau: 2.6 to 4.6 (Generous 2.0 units = ~920px reading hold)
        // Transition Ch 1 -> Ch 2: 4.6 to 5.8
        // ═════════════════════════════════════════════════════════════
        tl.to('.ch1-stat-item', {
          autoAlpha: 0,
          y: 15,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power1.in',
        }, 4.6)
        .to(['.ch1-left-col', '.ch1-right-col'], {
          autoAlpha: 0,
          y: -25,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 4.8)
        .to(['.ch1-leaf-left', '.ch1-leaf-right'], {
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power1.in',
        }, 4.8)
        .to(ch1, {
          autoAlpha: 0,
          duration: 0.6,
        }, 5.2)
        .to(stageBg, {
          backgroundColor: '#201308',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 4.6)

        // Chapter 2 Entrance (Overlapping start at 4.8)
        .to(ch2, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 4.8)
        .to('.ch2-content', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        }, 4.9);

        // ═════════════════════════════════════════════════════════════
        // CHAPTER 2: Where Would You Like To Go? (Four Doors)
        // Plateau: 5.8 to 7.8 (Generous 2.0 units = ~920px exploration hold)
        // Transition Ch 2 -> Ch 3: 7.8 to 9.0
        // ═════════════════════════════════════════════════════════════
        tl.to('.ch2-content', {
          autoAlpha: 0,
          y: -28,
          scale: 0.97,
          duration: 0.9,
          ease: 'power1.inOut',
        }, 7.8)
        .to(ch2, {
          autoAlpha: 0,
          duration: 0.5,
        }, 8.4)
        .to(stageBg, {
          backgroundColor: '#FAF4E6',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 7.8)

        // Chapter 3 Entrance (Overlapping start at 8.0)
        .to(ch3, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 8.0)
        .to('.ch3-left-col', {
          autoAlpha: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        }, 8.1)
        .to('.ch3-card-item', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
        }, 8.25);

        // ═════════════════════════════════════════════════════════════
        // CHAPTER 3: Every Story Matters (Three Pillars)
        // Plateau: 9.0 to 11.0 (Generous 2.0 units = ~920px reading hold)
        // Transition Ch 3 -> Ch 4: 11.0 to 12.2
        // ═════════════════════════════════════════════════════════════
        tl.to('.ch3-card-item', {
          autoAlpha: 0,
          y: -20,
          scale: 0.97,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power1.in',
        }, 11.0)
        .to('.ch3-left-col', {
          autoAlpha: 0,
          y: -25,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 11.1)
        .to(ch3, {
          autoAlpha: 0,
          duration: 0.5,
        }, 11.6)
        .to(stageBg, {
          backgroundColor: '#140820',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 11.0)

        // Chapter 4 Entrance (Overlapping start at 11.2)
        .to(ch4, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 11.2)
        .to('.ch4-glow', {
          autoAlpha: 0.25,
          scale: 1.05,
          duration: 1.0,
          ease: 'power1.out',
        }, 11.2)
        .to('.ch4-header', {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
        }, 11.3)
        .to('.ch4-banner', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: 'power2.out',
        }, 11.4)
        .to('.ch4-pill', {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, 11.55);

        // ═════════════════════════════════════════════════════════════
        // CHAPTER 4: What's Coming Up Next (Audition Showcase)
        // Plateau: 12.2 to 14.0 (Generous 1.8 units = ~830px reading hold)
        // Transition Ch 4 -> Finale: 14.0 to 15.2
        // ═════════════════════════════════════════════════════════════
        tl.to('.ch4-pill', {
          autoAlpha: 0,
          y: 10,
          duration: 0.5,
          ease: 'power1.in',
        }, 14.0)
        .to(['.ch4-banner', '.ch4-header'], {
          autoAlpha: 0,
          y: -25,
          scale: 0.97,
          duration: 0.9,
          ease: 'power1.inOut',
        }, 14.1)
        .to('.ch4-glow', {
          autoAlpha: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power1.in',
        }, 14.2)
        .to(ch4, {
          autoAlpha: 0,
          duration: 0.5,
        }, 14.7)
        .to(stageBg, {
          backgroundColor: '#FAF4E6',
          duration: 1.2,
          ease: 'power1.inOut',
        }, 14.0);
      });

      // Chapter 5 Entrance Animation as user scrolls past the pinned container
      if (ch5) {
        const ch5Tl = gsap.timeline({
          scrollTrigger: {
            trigger: ch5,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.0,
          }
        });

        ch5Tl.fromTo('.ch5-badge', 
          { autoAlpha: 0, y: 25 }, 
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 
          0
        )
        .fromTo('.ch5-heading', 
          { autoAlpha: 0, y: 35 }, 
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
          0.1
        )
        .fromTo('.ch5-body', 
          { autoAlpha: 0, y: 25 }, 
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
          0.2
        )
        .fromTo('.ch5-buttons', 
          { autoAlpha: 0, y: 20, scale: 0.97 }, 
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, 
          0.3
        )
        .fromTo('.ch5-leaf-left', 
          { autoAlpha: 0, x: -25 }, 
          { autoAlpha: 0.6, x: 0, duration: 0.9, ease: 'power1.out' }, 
          0.15
        )
        .fromTo('.ch5-leaf-right', 
          { autoAlpha: 0, x: 25 }, 
          { autoAlpha: 0.6, x: 0, duration: 0.9, ease: 'power1.out' }, 
          0.15
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isVideoFinished]);

  // ═════════════════════════════════════════════════════════════════
  // REDUCED MOTION ACCESSIBILITY LAYOUT
  // ═════════════════════════════════════════════════════════════════
  if (isReducedMotion) {
    return (
      <div className="w-full bg-[#FAF4E6] text-stone-900">
        {/* Chapter 0: Hero */}
        <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={welcomeVideo}
            playsInline
            controls
            preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 pointer-events-none select-none">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 flex items-center justify-center shrink-0">
              <ArrowDown className="w-3 h-3 text-white/80" />
            </div>
            <span 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/85 whitespace-nowrap font-medium"
            >
              SCROLL TO ENTER THE STORY
            </span>
          </div>
        </section>

        {/* Chapter 1: Welcome */}
        <section className="relative w-full min-h-screen bg-[#FAF4E6] py-20 px-6 sm:px-12 lg:px-20 flex items-center justify-center">
          <div className="max-w-[1200px] w-full mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chapter 01</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-4xl sm:text-5xl font-bold text-[#F97316] leading-tight uppercase">
                  WE’VE BEEN<br />EXPECTING YOU.
                </h2>
                <div className="space-y-1.5 text-sm sm:text-base text-[#6E6259]">
                  <p>Every person has a story.</p>
                  <p>Every story deserves to be heard.</p>
                  <p>Every person deserves hope.</p>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right space-y-4">
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-lg sm:text-xl lg:text-[22px] leading-relaxed max-w-xl">
                  <span className="font-bold text-[#18181B]">This isn’t simply a website.</span>{" "}
                  <span className="text-[#7A6B60]">It’s an invitation to experience a place where compassion becomes action, hope becomes visible, and </span>
                  <span className="font-bold text-[#18181B]">Every story matters.</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <FigmaButton to="/how-we-serve" variant="primary">Find Your Pathway</FigmaButton>
                  <FigmaButton to="/movement" variant="outline">Explore The Show</FigmaButton>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-orange-200">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3.5">
                  <img src={s.icon} alt="" className="w-11 h-11 object-contain" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[#231F20]">{s.value}</div>
                    <div className="text-xs text-[#6E6259]">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 2: Doors */}
        <section className="relative w-full min-h-screen bg-[#201308] py-20 px-4 flex items-center justify-center">
          <div className="relative aspect-[1920/1080] max-w-[1400px] w-full">
            <img src={doorsSectionImg} alt="Four open doors" className="w-full h-full object-contain" />
            {doors.map((d) => (
              <Link
                key={d.id}
                to={d.path}
                title={d.title}
                aria-label={`${d.title} - ${d.subtitle}`}
                style={{ left: d.left, width: d.width, top: '12%', bottom: '6%' }}
                className="absolute z-20 cursor-pointer block"
              />
            ))}
          </div>
        </section>

        {/* Chapter 3: Pillars */}
        <section className="relative w-full min-h-screen bg-[#FAF4E6] py-20 px-6 sm:px-12 lg:px-20 flex items-center justify-center">
          <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chapter 03</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-4xl sm:text-5xl font-bold uppercase leading-tight">
                <span className="text-[#18181B]">EVERY </span>
                <span className="text-[#F97316]">STORY</span>
                <br />
                <span className="text-[#18181B]">MATTERS.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6E6259] leading-relaxed max-w-md">
                Every story carries meaning, and every voice deserves to be heard. Experience an inspiring journey of real stories, human connection, and hope.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6">
              {pillars.map((p) => (
                <div key={p.title} className="flex flex-col items-center text-center">
                  <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden bg-stone-200 shadow-md">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="mt-3.5 text-lg font-bold text-[#18181B] uppercase">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#7A6B60]">{p.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 4: Audition Showdown */}
        <section className="relative w-full min-h-screen bg-[#140820] py-20 px-4 flex items-center justify-center">
          <ShowdownSection onOpenModal={openFlyerModal} />
        </section>

        {/* Chapter 5: Sanctuary Invitation */}
        <section className="relative w-full bg-[#FAF4E6] py-24 px-6 flex items-center justify-center">
          <div className="max-w-[760px] mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chapter 05 • Welcome Home</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-4xl sm:text-5xl font-bold uppercase">
              <span className="text-[#18181B]">YOU WERE </span>
              <span className="text-[#F97316]">EXPECTED.</span>
            </h2>
            <div className="space-y-2.5 text-sm sm:text-base text-[#6E6259] max-w-xl mx-auto">
              <p>Thank you for stepping inside. The table is prepared, the light is on, and you are welcome here.</p>
              <p>Take your next step with us today. Whether reading stories or standing in our kitchen line, your presence completes our family.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <FigmaButton to="/about" variant="primary">Explore Our Story</FigmaButton>
              <FigmaButton to="/movement" variant="outline">Join the Movement</FigmaButton>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // STANDARD CINEMATIC GSAP SCROLLTRIGGER STAGE
  // ═════════════════════════════════════════════════════════════════
  return (
    <div className="relative w-full select-none bg-[#FAF4E6]">
      {/* ─── PINNED CONTAINER (Holds Chapters 0 to 4 in a unified cinematic stage) ─── */}
      <div 
        ref={containerRef} 
        className="relative w-full"
      >
        <div 
          ref={pinnedStageRef}
          className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        >
          {/* Animated Background Color Layer */}
          <div 
            ref={stageBgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-colors duration-100 ease-linear"
          />

          {/* Ambient 3D Particle Canvas */}
          <SpotlightCanvas />

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 0: FULL-SCREEN VIDEO HERO
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={ch0Ref}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black overflow-hidden z-10 will-change-transform will-change-opacity"
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

            {/* Scroll prompt at bottom of video (visible if not scrolled) */}
            <div 
              onClick={handleScrollToStory}
              className="ch0-prompt absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 cursor-pointer select-none group pointer-events-auto"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/40 group-hover:border-white/80 flex items-center justify-center shrink-0 transition-colors">
                <ArrowDown className="w-3 h-3 text-white/80 group-hover:text-white transition-colors animate-bounce" />
              </div>
              <span 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/85 group-hover:text-white transition-colors whitespace-nowrap font-medium"
              >
                SCROLL TO ENTER THE STORY
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 1: "WE'VE BEEN EXPECTING YOU."
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={ch1Ref}
            className="absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-12 lg:px-20 z-20 will-change-transform will-change-opacity"
          >
            {/* Decorative flourish leaves */}
            <img 
              src={leftLeaf} 
              alt="" 
              className="ch1-leaf-left absolute left-0 bottom-12 w-28 sm:w-40 opacity-70 pointer-events-none select-none" 
            />
            <img 
              src={rightLeaf} 
              alt="" 
              className="ch1-leaf-right absolute right-0 bottom-12 w-28 sm:w-40 opacity-70 pointer-events-none select-none" 
            />

            <div className="max-w-[1200px] w-full mx-auto relative z-10 space-y-10 sm:space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column */}
                <div className="ch1-left-col lg:col-span-5 space-y-4">
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
                <div className="ch1-right-col lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right space-y-4">
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

                  <div className="flex flex-wrap items-center gap-3 pt-1">
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-orange-200/80">
                {stats.map((s) => (
                  <div key={s.label} className="ch1-stat-item flex items-center gap-3.5 group">
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

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 2: "WHERE WOULD YOU LIKE TO GO?" (Four Doors)
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={ch2Ref}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden select-none z-20 will-change-transform will-change-opacity"
          >
            <div className="ch2-content relative w-full h-full max-w-[1920px] pt-[74px] pb-6 px-4 flex items-center justify-center">
              <div className="relative aspect-[1920/1080] max-h-full max-w-full w-full h-auto flex items-center justify-center">
                <img 
                  src={doorsSectionImg} 
                  alt="Where would you like to go? Four open doors" 
                  className="w-full h-full object-contain block select-none pointer-events-none" 
                />

                {/* 4 Exact interactive door hitboxes linking to destinations */}
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

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 3: "EVERY STORY MATTERS." (Three Pillars)
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={ch3Ref}
            className="absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-12 lg:px-20 z-20 will-change-transform will-change-opacity"
          >
            <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column */}
              <div className="ch3-left-col lg:col-span-5 space-y-4">
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
              <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-6">
                {pillars.map((p) => (
                  <div 
                    key={p.title} 
                    className="ch3-card-item group flex flex-col items-center text-center cursor-default transition-transform duration-300 hover:scale-105"
                  >
                    <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden bg-stone-200 shadow-md border border-[#ecdac2] group-hover:shadow-2xl transition-all duration-500">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                    <h3 
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="mt-3.5 text-lg sm:text-xl font-bold tracking-wider text-[#18181B] uppercase group-hover:text-[#F97316] transition-colors"
                    >
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#7A6B60] font-sans">
                      {p.subtitle}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              CHAPTER 4: "WHAT'S COMING UP NEXT" (Audition Showdown)
              ═══════════════════════════════════════════════════════════════ */}
          <div
            ref={ch4Ref}
            className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-white pt-[78px] sm:pt-[82px] pb-4 px-4 sm:px-6 select-none overflow-hidden z-20 will-change-transform will-change-opacity"
          >
            {/* Ambient Backlight */}
            <div className="ch4-glow absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F97316]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full relative z-10 flex flex-col items-center justify-center">
              <ShowdownSection onOpenModal={openFlyerModal} />
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 5: "YOU WERE EXPECTED." (Sanctuary Invitation)
          Seamless natural flow out of the pinned sequence into the finale
          ═══════════════════════════════════════════════════════════════ */}
      <section 
        ref={ch5Ref}
        className="relative w-full min-h-[75vh] flex flex-col justify-center items-center bg-[#FAF4E6] px-6 sm:px-10 pt-20 pb-16 overflow-hidden z-20 will-change-transform will-change-opacity"
      >
        {/* Flourish leaves */}
        <img 
          src={leftLeaf} 
          alt="" 
          className="ch5-leaf-left absolute left-0 top-1/4 w-32 sm:w-44 opacity-60 pointer-events-none select-none" 
        />
        <img 
          src={rightLeaf} 
          alt="" 
          className="ch5-leaf-right absolute right-0 top-1/4 w-32 sm:w-44 opacity-60 pointer-events-none select-none" 
        />

        {/* Main Sanctuary Invitation Card */}
        <div className="max-w-[760px] mx-auto text-center space-y-6 relative z-10 px-4 my-auto">
          <div className="ch5-badge inline-flex items-center gap-1.5 text-xs font-serif text-[#F97316] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chapter 05 • Welcome Home</span>
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="ch5-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight uppercase"
          >
            <span className="text-[#18181B]">YOU WERE </span>
            <span className="text-[#F97316]">EXPECTED.</span>
          </h2>

          <div className="ch5-body space-y-2.5 text-sm sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-xl mx-auto">
            <p>
              Thank you for stepping inside. The table is prepared, the light is on, and you are welcome here.
            </p>
            <p>
              Take your next step with us today. Whether reading stories or standing in our kitchen line, your presence completes our family.
            </p>
          </div>

          <div className="ch5-buttons flex flex-wrap items-center justify-center gap-4 pt-2">
            <FigmaButton to="/about" variant="primary">
              Explore Our Story
            </FigmaButton>
            <FigmaButton to="/movement" variant="outline">
              Join the Movement
            </FigmaButton>
          </div>
        </div>
      </section>

      {/* ─── NATURAL CONTINUATION: FULL-WIDTH OFFICIAL FOOTER ─── */}
      <div className="relative w-full z-30 bg-[#FAF4E6]">
        <Footer />
      </div>

      {/* ─── SHOWDOWN FULL FLYER MODAL (Portaled to document.body) ─── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isFlyerModalOpen && (
            <div 
              className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Dark blur backdrop */}
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

                {/* Modal Content */}
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
  );
}

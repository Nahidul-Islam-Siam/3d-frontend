import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles,
  ArrowDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Assets
import welcomeVideo from '@/assets/video/welcome.mp4';
import seenImg from '@/assets/welcome/seen.png';
import heardImg from '@/assets/welcome/heard.png';
import hopeImg from '@/assets/welcome/hope.png';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';
import mealsIcon from '@/assets/icons/utensils4.png';
import mentorIcon from '@/assets/icons/utensils3.png';
import storiesIcon from '@/assets/icons/utensils2.png';
import partnersIcon from '@/assets/icons/utensils.png';
import FigmaButton from '@/components/common/FigmaButton';
import Footer from '@/components/partials/footer';
import SpotlightCanvas from './SpotlightCanvas';
import FourDoorsSection from './FourDoorsSection';
import ShowdownSection from './ShowdownSection';
import WelcomeHomeSection from './WelcomeHomeSection';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "12,400+", label: "Meals Shared", icon: mealsIcon },
  { value: "1,200", label: "Mentor Matches", icon: mentorIcon },
  { value: "380", label: "Stories Told", icon: storiesIcon },
  { value: "64", label: "Community Partners", icon: partnersIcon },
];

const pillars = [
  { 
    title: 'SEEN', 
    subtitle: 'People deserve to be seen', 
    image: seenImg,
    offsetClass: '-translate-y-4 sm:-translate-y-6 lg:-translate-y-10 xl:-translate-y-12' 
  },
  { 
    title: 'HEARD', 
    subtitle: 'Every story deserves a voice.', 
    image: heardImg,
    offsetClass: 'translate-y-0' 
  },
  { 
    title: 'HOPE', 
    subtitle: 'Every person deserves hope.', 
    image: hopeImg,
    offsetClass: 'translate-y-4 sm:translate-y-6 lg:translate-y-10 xl:translate-y-12' 
  },
];

export default function ZAxisStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const stageBgRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Chapter DOM refs for GSAP animation
  const ch0Ref = useRef<HTMLDivElement | null>(null);
  const ch1Ref = useRef<HTMLDivElement | null>(null);

  // Discrete application state
  const [isVideoFinished, setIsVideoFinished] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const navbarRevealedRef = useRef<boolean>(false);
  const hasStartedPlaybackRef = useRef<boolean>(false);

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
  // GSAP SCROLLTRIGGER: CHAPTER 0 (VIDEO) -> CHAPTER 1 TRANSITION
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

      if (!stageBg || !ch0 || !ch1 || !containerRef.current || !pinnedStageRef.current) {
        return;
      }

      // Initial resting properties
      gsap.set(ch1, {
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

      // Internal sub-elements of Chapter 1
      gsap.set('.ch1-left-col', { autoAlpha: 0, y: 35 });
      gsap.set('.ch1-right-col', { autoAlpha: 0, y: 30 });
      gsap.set('.ch1-stat-item', { autoAlpha: 0, y: 25 });
      gsap.set('.ch1-leaf-left', { autoAlpha: 0, x: -25 });
      gsap.set('.ch1-leaf-right', { autoAlpha: 0, x: 25 });
      gsap.set('.ch0-prompt', { autoAlpha: 1, y: 0 });

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };
        // Scroll distance dedicated exclusively to Chapter 0 -> Chapter 1 video transition
        const scrollDistance = isDesktop ? 700 : 550;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            pin: pinnedStageRef.current,
            scrub: 0.25,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;

              // Navbar reveal threshold
              const shouldReveal = p >= 0.08 || (isVideoFinished && p > 0.02);
              if (shouldReveal !== navbarRevealedRef.current) {
                navbarRevealedRef.current = shouldReveal;
                window.dispatchEvent(new CustomEvent(shouldReveal ? 'reveal-navbar' : 'hide-navbar'));
              }

              // Pause video when out of view, resume when back at top
              if (videoRef.current) {
                if (p > 0.25 && !videoRef.current.paused) {
                  videoRef.current.pause();
                } else if (p <= 0.25 && videoRef.current.paused) {
                  videoRef.current.play().catch(() => {});
                }
              }
            },
          },
        });

        // Chapter 0 Prompt: fades immediately upon initial scroll
        tl.to('.ch0-prompt', {
          autoAlpha: 0,
          y: 16,
          duration: 0.15,
          ease: 'power1.out',
        }, 0);

        // TRANSITION CH 0 (VIDEO) -> CH 1 (WELCOME)
        tl.to(ch0, {
          autoAlpha: 0,
          y: -35,
          scale: 1.02,
          duration: 0.95,
          ease: 'power1.inOut',
        }, 0.05)
        .to(stageBg, {
          backgroundColor: '#FAF4E6',
          duration: 0.95,
          ease: 'power1.inOut',
        }, 0.05)
        .to(ch1, {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 0.15)
        .to('.ch1-left-col', {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        }, 0.20)
        .to(['.ch1-leaf-left', '.ch1-leaf-right'], {
          autoAlpha: 0.7,
          x: 0,
          duration: 0.75,
          ease: 'power1.out',
        }, 0.25)
        .to('.ch1-right-col', {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        }, 0.25)
        .to('.ch1-stat-item', {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.04,
          ease: 'power2.out',
        }, 0.30);
      });
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
            className="w-full h-full object-contain lg:object-cover portrait:object-contain"
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

        {/* Chapter 2: Doors (Modular) */}
        <FourDoorsSection id="rm-chapter-02" />

        {/* Chapter 3: Pillars */}
        <section className="relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-32 xl:py-36 px-6 sm:px-12 lg:px-20 flex items-center justify-center overflow-hidden">
          <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="font-serif text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-bold uppercase leading-[1.08] tracking-[12px]"
              >
                <span className="font-serif text-[#18181B]">EVERY </span>
                <span className="font-serif text-[#F97316]">STORY</span>
                <br />
                <span className="font-serif text-[#18181B]">MATTERS.</span>
              </h2>

              <p className="text-xs sm:text-[13px] lg:text-sm text-[#7A6B60] font-sans leading-relaxed max-w-sm">
                Every story carries meaning, and every voice deserves to be heard. Experience an inspiring journey of real stories, human connection, and hope.
              </p>
            </div>

            {/* Right Column: 3 Stepped Pillar Cards */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 xl:gap-7 items-start">
              {pillars.map((p) => (
                <div 
                  key={p.title} 
                  className={`flex flex-col items-center text-center ${p.offsetClass} transition-transform duration-300`}
                >
                  <div className="w-full aspect-[4/5] rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-stone-200">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover block" 
                    />
                  </div>
                  <h3 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }} 
                    className="mt-3.5 sm:mt-4 text-base sm:text-lg lg:text-xl font-bold tracking-wider text-[#18181B] uppercase font-serif"
                  >
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-[13px] text-[#7A6B60] font-sans leading-snug whitespace-nowrap">
                    {p.subtitle}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Chapter 4: Showdown (Modular) */}
        <ShowdownSection />

        {/* Chapter 5: Welcome Home (Modular) */}
        <WelcomeHomeSection id="rm-chapter-05" />

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
      {/* ─── PINNED CONTAINER (Holds Chapters 0 to 1 in cinematic 3D stage) ─── */}
      <div 
        ref={containerRef} 
        className="relative w-full"
      >
        <div 
          ref={pinnedStageRef}
          style={{ perspective: '1200px' }}
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
              className="w-full h-full object-contain lg:object-cover portrait:object-contain pointer-events-none"
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
                    className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#F97316] leading-[1.08] uppercase"
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
                    className="text-lg sm:text-xl lg:text-[22px] leading-relaxed max-w-xl"
                  >
                    <span className="font-bold text-[#18181B]">This isn’t simply a website.</span>{" "}
                    <span className="text-[#7A6B60]">It’s an invitation to experience a place where compassion becomes action, hope becomes visible, and </span>
                    <span className="font-bold text-[#18181B]">Every story matters.</span>
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 pt-2">
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-orange-200">
                {stats.map((s) => (
                  <div key={s.label} className="ch1-stat-item flex items-center gap-3.5">
                    <img src={s.icon} alt="" className="w-11 h-11 object-contain" />
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

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 2: "WHERE WOULD YOU LIKE TO GO?" (Modular Four Doors)
          ═══════════════════════════════════════════════════════════════ */}
      <FourDoorsSection id="chapter-02" />

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 3: "EVERY STORY MATTERS." (Three Pillars)
          ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="chapter-03"
        className="relative w-full bg-[#FAF4E6] flex items-center justify-center py-20 sm:py-28 lg:py-32 xl:py-36 px-6 sm:px-12 lg:px-20 overflow-hidden"
      >
        <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="font-serif text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-bold tracking-tight uppercase leading-[1.08]"
            >
              <span className="font-serif text-[#18181B]">EVERY </span>
              <span className="font-serif text-[#F97316]">STORY</span>
              <br />
              <span className="font-serif text-[#18181B]">MATTERS.</span>
            </h2>

            <p className="text-xs sm:text-[13px] lg:text-sm text-[#7A6B60] font-sans leading-relaxed max-w-sm">
              Every story carries meaning, and every voice deserves to be heard. Experience an inspiring journey of real stories, human connection, and hope.
            </p>
          </div>

          {/* Right Column: 3 Stepped Pillar Cards */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 xl:gap-7 items-start">
            {pillars.map((p) => (
              <div 
                key={p.title} 
                className={`flex flex-col items-center text-center ${p.offsetClass} transition-transform duration-300`}
              >
                <div className="w-full aspect-[4/5] rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-stone-200">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover block" 
                  />
                </div>
                <h3 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }} 
                  className="mt-3.5 sm:mt-4 text-base sm:text-lg lg:text-xl font-bold tracking-wider text-[#18181B] uppercase font-serif"
                >
                  {p.title}
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#7A6B60] font-sans leading-snug whitespace-nowrap">
                  {p.subtitle}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 4: "WHAT'S COMING UP NEXT" (Modular Showdown Section)
          ═══════════════════════════════════════════════════════════════ */}
      <ShowdownSection id="chapter-04" />

      {/* ═══════════════════════════════════════════════════════════════
          CHAPTER 5: "YOU WERE EXPECTED." (Modular Sanctuary Invitation)
          ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="chapter-05"
        className="relative w-full min-h-[75vh] flex flex-col justify-center items-center bg-[#FAF4E6] px-6 sm:px-12 lg:px-20 py-20 overflow-hidden select-none relative"
      >
        {/* Flourish leaves */}
        <img 
          src={leftLeaf} 
          alt="" 
          className="absolute left-2 sm:left-6 lg:left-12 top-1/2 -translate-y-1/2 w-28 sm:w-40 lg:w-48 opacity-60 pointer-events-none select-none" 
        />
        <img 
          src={rightLeaf} 
          alt="" 
          className="absolute right-2 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 w-28 sm:w-40 lg:w-48 opacity-60 pointer-events-none select-none" 
        />

        {/* Main Sanctuary Invitation Card */}
        <div className="max-w-[760px] mx-auto text-center space-y-6 relative z-10 px-4 my-auto">
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

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <FigmaButton to="/about" variant="primary">
              Explore Our Story
            </FigmaButton>
            <FigmaButton to="/movement" variant="outline">
              Join the Movement
            </FigmaButton>
          </div>
        </div>
      </section>

      {/* ─── OFFICIAL FULL-WIDTH FOOTER ─── */}
      <Footer />
    </div>
  );
}

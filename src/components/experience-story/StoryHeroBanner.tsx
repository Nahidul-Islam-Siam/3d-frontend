import { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import storyVideo from '@/assets/experienc-story/experience-story.mp4';
import MovementStorySection from './MovementStorySection';

gsap.registerPlugin(ScrollTrigger);

export interface StoryHeroBannerProps {
  id?: string;
  onScrollToStory?: () => void;
  className?: string;
}

export default function StoryHeroBanner({ 
  id = 'story-hero-stage',
  onScrollToStory, 
  className = '' 
}: StoryHeroBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const video1WrapperRef = useRef<HTMLDivElement | null>(null);
  const section2WrapperRef = useRef<HTMLDivElement | null>(null);
  const promptBtnRef = useRef<HTMLButtonElement | null>(null);

  // ─── GSAP ScrollTrigger Pinned Cinema Stage Animation ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const v1 = video1WrapperRef.current;
    const s2 = section2WrapperRef.current;
    const prompt = promptBtnRef.current;

    if (!container || !stage || !v1 || !s2) return;

    // Initial resting states
    gsap.set(v1, { scale: 1, autoAlpha: 1 });
    if (prompt) gsap.set(prompt, { autoAlpha: 1 });
    gsap.set(s2, {
      scale: 0.88,
      autoAlpha: 0,
      clipPath: 'inset(20% 15% 20% 15% round 32px)',
      webkitClipPath: 'inset(20% 15% 20% 15% round 32px)',
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px', // Pin right below the 74px fixed global navbar
          end: '+=1100', // Vertical scroll duration for the in-place aperture transition
          pin: stage,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // 1. Scroll prompt button fades out immediately
      if (prompt) {
        tl.to(prompt, { autoAlpha: 0, duration: 0.12, ease: 'power1.out' }, 0);
      }

      // 2. Hero video scales back slightly and dims
      tl.to(
        v1,
        {
          scale: 0.94,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'power2.inOut',
        },
        0.05
      );

      // 3. Second section (MovementStorySection) opens in the EXACT same position
      tl.to(
        s2,
        {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 32px)',
          webkitClipPath: 'inset(0% 0% 0% 0% round 32px)',
          duration: 0.7,
          ease: 'power2.out',
        },
        0.1
      );

      // 4. Hold duration so user can comfortably view and read the second section in place
      tl.to({}, { duration: 0.35 });
    }, container);

    // Refresh ScrollTrigger to calculate accurate pin offsets
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleScroll = () => {
    if (onScrollToStory) {
      onScrollToStory();
      return;
    }

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement, opts?: object) => void } }).__lenis;
    if (lenis && containerRef.current) {
      // Smoothly advance through the pinned aperture animation
      const target = containerRef.current.offsetTop + 1050;
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      window.scrollBy({ top: 900, behavior: 'smooth' });
    }
  };

  return (
    <div 
      id={id}
      ref={containerRef}
      className={`relative w-full bg-[#FAF4E6] select-none ${className}`}
    >
      {/* ─── Pinned Cinema Viewport Stage (Exact Same Position Below 74px Navbar) ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-[calc(100vh-74px)] min-h-[560px] max-h-[1080px] flex items-center justify-center px-2.5 sm:px-6 lg:px-12 xl:px-16 py-4 sm:py-6 overflow-hidden"
      >
        {/* Cinema Frame Container matching Figma Rounded Aspect-Video Card */}
        <div className="relative w-full max-w-[1840px] aspect-video max-h-full rounded-[16px] sm:rounded-[26px] lg:rounded-[32px] overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-stone-800/20 flex items-center justify-center">
          
          {/* Layer 1: Hero Video Banner */}
          <div
            ref={video1WrapperRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform z-0"
          >
            <video
              src={storyVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Cinematic Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

            {/* Scroll Prompt Button inside Hero Video */}
            <button
              ref={promptBtnRef}
              type="button"
              onClick={handleScroll}
              className="absolute bottom-3 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer select-none group text-white/90 hover:text-white transition-all bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full border border-white/20"
              aria-label="Scroll to enter the story"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/50 group-hover:border-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white animate-bounce" />
              </div>
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white/90 group-hover:text-white transition-colors whitespace-nowrap font-medium"
              >
                SCROLL TO ENTER THE STORY
              </span>
            </button>
          </div>

          {/* Layer 2: Movement Story Section (Opens in EXACT same position via aperture animation) */}
          <div
            ref={section2WrapperRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform z-10"
          >
            <MovementStorySection isEmbedded={true} />
          </div>

        </div>
      </div>
    </div>
  );
}

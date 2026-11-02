import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import seenImg from '@/assets/join-movement/join-movement.jpg';

gsap.registerPlugin(ScrollTrigger);

export interface SomeoneNoticesSectionProps {
  id?: string;
  className?: string;
}

export default function SomeoneNoticesSection({
  id = 'someone-notices',
  className = '',
}: SomeoneNoticesSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const bgBlurRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const preHeadingRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const narrativeRef = useRef<HTMLParagraphElement | null>(null);
  const scrollBtnRef = useRef<HTMLDivElement | null>(null);

  // ─── 1. GSAP SCROLLTRIGGER PINNED SCRUB (BongoExpert.com 1:1 Motion) ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const bgBlur = bgBlurRef.current;
    const card = cardRef.current;
    const preHeading = preHeadingRef.current;
    const title = titleRef.current;
    const narrative = narrativeRef.current;
    const scrollBtn = scrollBtnRef.current;

    if (!container || !stage || !card) return;

    const ctx = gsap.context(() => {
      // Resting states before scroll enters
      gsap.set(card, {
        scale: 0.84,
        rotateZ: -5,
        autoAlpha: 0.4,
        transformPerspective: 1200,
      });

      if (bgBlur) {
        gsap.set(bgBlur, { scale: 1.05, autoAlpha: 0.2 });
      }
      if (preHeading) {
        gsap.set(preHeading, { y: -20, autoAlpha: 0 });
      }
      if (title) {
        gsap.set(title, { x: -45, autoAlpha: 0 });
      }
      if (narrative) {
        gsap.set(narrative, { x: 45, autoAlpha: 0 });
      }
      if (scrollBtn) {
        gsap.set(scrollBtn, { y: 15, autoAlpha: 0 });
      }

      // Master Pinned Scroll Scrub Timeline (BongoExpert.com style)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px',
          end: '+=1100',
          pin: stage,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // ── Stage 1 (0 to 0.4): Reveal Title, Card Scales Forward, Background Aura Blooms ──
      if (preHeading) {
        tl.to(preHeading, { y: 0, autoAlpha: 1, duration: 0.28, ease: 'power2.out' }, 0.02);
      }

      if (title) {
        tl.to(title, { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.05);
      }

      if (bgBlur) {
        tl.to(bgBlur, { scale: 1.18, autoAlpha: 0.42, duration: 0.7, ease: 'power1.inOut' }, 0.05);
      }

      tl.to(
        card,
        {
          scale: 1.02,
          rotateZ: -2.5,
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.08
      );

      // ── Stage 2 (0.4 to 0.75): Narrative & Scroll Indicator Reveal ──
      if (narrative) {
        tl.to(narrative, { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.38);
      }

      tl.to(
        card,
        {
          scale: 1.0,
          rotateZ: -3,
          duration: 0.3,
          ease: 'power1.inOut',
        },
        0.5
      );

      if (scrollBtn) {
        tl.to(scrollBtn, { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0.55);
      }

      // ── Stage 3 (0.75 to 1.0): Hold Phase for Reading & Unpin ──
      tl.to({}, { duration: 0.3 });
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // ─── 2. INTERACTIVE 3D MOUSE TILT (Hover Glare & Inertia) ───
  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    const stage = pinnedStageRef.current;
    if (!card || !stage) return;

    const setRotateX = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    const setRotateY = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power2.out' });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const tiltY = Math.max(-12, Math.min(12, deltaX * 12));
      const tiltX = Math.max(-10, Math.min(10, -deltaY * 10));

      setRotateX(tiltX);
      setRotateY(tiltY);

      if (isHovering && glare) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(249,115,22,0.15) 40%, transparent 75%)`;
      }
    };

    const onMouseEnterCard = () => {
      isHovering = true;
      if (glare) gsap.to(glare, { opacity: 1, duration: 0.35 });
      gsap.to(card, {
        boxShadow: '0 35px 85px rgba(249, 115, 22, 0.32), 0 25px 60px rgba(0,0,0,0.95)',
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const onMouseLeaveCard = () => {
      isHovering = false;
      if (glare) gsap.to(glare, { opacity: 0, duration: 0.45 });
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
        duration: 0.9,
        ease: 'elastic.out(1, 0.45)',
      });
    };

    stage.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseenter', onMouseEnterCard);
    card.addEventListener('mouseleave', onMouseLeaveCard);

    return () => {
      stage.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseenter', onMouseEnterCard);
      card.removeEventListener('mouseleave', onMouseLeaveCard);
    };
  }, []);

  // ─── Smooth scroll down past the pinned section ───
  const handleScroll = () => {
    const next = document.getElementById('built-by-community');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.2, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full bg-[#060408] ${className}`}
    >
      {/* ─── Pinned Stage Viewport ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-[calc(100vh-74px)] bg-[#060408] text-white overflow-hidden flex flex-col justify-between py-8 sm:py-12 lg:py-16 px-6 sm:px-12 lg:px-16 xl:px-20 select-none"
      >
        {/* ─── Background Ambient Aura (BongoExpert 1:1 Blurred Card Photo) ─── */}
        <div
          ref={bgBlurRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={seenImg}
            alt=""
            className="w-full h-full object-cover filter blur-[75px] saturate-[1.4] opacity-35 transform scale-110"
          />
          {/* Subtle vignette over blur to maintain contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060408]/85 via-transparent to-[#060408]/90" />
        </div>

        {/* ─── Ambient Horizon Glow at Bottom ─── */}
        <div
          className="absolute bottom-0 inset-x-0 h-48 sm:h-72 lg:h-96 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 65% at 50% 100%, rgba(234, 88, 12, 0.38) 0%, rgba(74, 29, 11, 0.22) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* ─── Top Left: Floating Pre-heading Statement ─── */}
        <div
          ref={preHeadingRef}
          className="max-w-[1520px] w-full mx-auto text-left relative z-10 pt-1 sm:pt-2"
        >
          <p className="text-sm sm:text-base lg:text-[20px] xl:text-[22px] text-stone-300 font-sans tracking-wide flex flex-col gap-1 sm:gap-1.5 leading-snug">
            <span>Every meaningful change</span>
            <span>begins the same way.</span>
          </p>
        </div>

        {/* ─── Main 3-Column Center Stage (BongoExpert Layout with Perspective) ─── */}
        <div
          className="max-w-[1520px] w-full mx-auto relative z-10 my-auto py-4 sm:py-6 lg:py-8"
          style={{ perspective: 1200 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: "Someone notices." */}
            <div className="lg:col-span-3 text-left">
              <h3
                ref={titleRef}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal text-white tracking-wide leading-tight"
              >
                Someone notices.
              </h3>
            </div>

            {/* Center Column: 3D Inertia-Tilted Showcase Card + Scroll Button */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              {/* ─── BongoExpert / Lunetra Showcase Card ─── */}
              <div
                ref={cardRef}
                style={{
                  width: 'min(440px, 86vw)',
                  height: 'min(335px, calc(86vw * 335 / 440))',
                  transformStyle: 'preserve-3d',
                }}
                className="relative rounded-[26px] overflow-hidden border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-stone-900 cursor-pointer shrink-0 transition-shadow duration-300 group"
              >
                <img
                  src={seenImg}
                  alt="An observant neighbor noticing quietly with compassion"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dynamic Specular Light Glare Overlay */}
                <div
                  ref={glareRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
                />

                {/* Subtle Cinematic Vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10"
                  aria-hidden="true"
                />
              </div>

              {/* ─── (+) SCROLL TO CONTINUE (Exact Figma 1:1) ─── */}
              <div
                ref={scrollBtnRef}
                onClick={handleScroll}
                className="mt-6 sm:mt-10 flex items-center gap-2.5 cursor-pointer select-none group text-white/80 hover:text-white transition-all"
              >
                <div className="w-5 h-5 rounded-full border border-white/45 group-hover:border-[#F97316] flex items-center justify-center shrink-0 transition-colors bg-white/5 backdrop-blur-sm group-hover:scale-110 duration-200">
                  <Plus className="w-3 h-3 text-white/90 group-hover:text-[#F97316] transition-transform duration-300 group-hover:rotate-90" />
                </div>
                <span
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-white/85 group-hover:text-white transition-colors whitespace-nowrap font-medium"
                >
                  SCROLL TO CONTINUE
                </span>
              </div>
            </div>

            {/* Right Column: Narrative Text */}
            <div className="lg:col-span-3 text-left lg:pl-4">
              <p
                ref={narrativeRef}
                className="text-xs sm:text-sm lg:text-[14px] xl:text-[17px] text-stone-300 font-sans leading-relaxed max-w-[290px]"
              >
                An observant neighbor sees a family quietly carrying more than their share. No judgment, just seeing clearly.
              </p>
            </div>

          </div>
        </div>

        {/* Subtle bottom balance spacer */}
        <div className="w-full h-2 sm:h-4" />
      </div>
    </div>
  );
}

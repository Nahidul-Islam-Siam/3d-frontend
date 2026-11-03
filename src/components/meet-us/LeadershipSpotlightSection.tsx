import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import starryBg from '@/assets/meet-us/starry-cosmic-bg.png';
import sarahPhoto from '@/assets/meet-us/sarah-mitchell.png';

gsap.registerPlugin(ScrollTrigger);

export interface LeadershipSpotlightSectionProps {
  id?: string;
  className?: string;
  onScrollClick?: () => void;
}

export default function LeadershipSpotlightSection({
  id = 'leadership-spotlight',
  className = '',
  onScrollClick,
}: LeadershipSpotlightSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const bgImgRef = useRef<HTMLImageElement | null>(null);
  const bgGlowRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const scrollBtnRef = useRef<HTMLDivElement | null>(null);

  // ─── 1. GSAP SCROLLTRIGGER PINNED SCRUB (Edolus / SomeoneNotices 1:1 Motion) ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const bgImg = bgImgRef.current;
    const bgGlow = bgGlowRef.current;
    const card = cardRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const scrollBtn = scrollBtnRef.current;

    if (!container || !stage || !card) return;

    const ctx = gsap.context(() => {
      // Resting states before scroll enters
      gsap.set(card, {
        scale: 0.85,
        rotateZ: -4.5,
        autoAlpha: 0.35,
        transformPerspective: 1200,
      });

      if (bgImg) {
        gsap.set(bgImg, { scale: 1.02, y: 0 });
      }
      if (bgGlow) {
        gsap.set(bgGlow, { autoAlpha: 0.3, scale: 0.95 });
      }
      if (title) {
        gsap.set(title, { x: -45, autoAlpha: 0 });
      }
      if (subtitle) {
        gsap.set(subtitle, { x: -35, autoAlpha: 0 });
      }
      if (scrollBtn) {
        gsap.set(scrollBtn, { y: 16, autoAlpha: 0 });
      }

      // Master Pinned Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px',
          end: '+=1050',
          pin: stage,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // ── Stage 1 (0 to 0.45): Card scales forward, Title reveals, Glow blooms ──
      if (title) {
        tl.to(title, { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.05);
      }
      if (subtitle) {
        tl.to(subtitle, { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.12);
      }
      if (bgGlow) {
        tl.to(bgGlow, { autoAlpha: 0.85, scale: 1.05, duration: 0.65, ease: 'power1.inOut' }, 0.05);
      }
      if (bgImg) {
        tl.to(bgImg, { scale: 1.06, y: -15, duration: 0.8, ease: 'power1.out' }, 0.05);
      }

      tl.to(
        card,
        {
          scale: 1.02,
          rotateZ: -2,
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.08
      );

      // ── Stage 2 (0.45 to 0.75): Card settles into cinematic tilt, Scroll button reveals ──
      tl.to(
        card,
        {
          scale: 1.0,
          rotateZ: -2.5,
          duration: 0.3,
          ease: 'power1.inOut',
        },
        0.48
      );

      if (scrollBtn) {
        tl.to(scrollBtn, { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0.52);
      }

      // ── Stage 3 (0.75 to 1.0): Hold Phase for Reading & Smooth Unpin ──
      tl.to({}, { duration: 0.28 });
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // ─── 2. INTERACTIVE 3D MOUSE TILT (Hover Glare & Inertia Physics) ───
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
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, rgba(249,115,22,0.18) 40%, transparent 75%)`;
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
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const next = document.getElementById('moments-why-we-serve') || document.getElementById('meet-us-next') || document.getElementById('meet-us-team');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 1.25, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full bg-[#020409] ${className}`}
    >
      {/* ─── Pinned Stage Viewport (100vh - navbar) ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-[calc(100vh-74px)] bg-[#020409] text-white overflow-hidden flex flex-col justify-between py-8 sm:py-12 lg:py-16 px-6 sm:px-12 lg:px-16 xl:px-20 select-none"
      >
        {/* ─── Cosmic Starry Sky Photo Layer ─── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <img
            ref={bgImgRef}
            src={starryBg}
            alt="Cosmic starry background"
            className="w-full h-full object-cover object-bottom pointer-events-none select-none"
          />
        </div>

        {/* ─── Ambient Horizon Amber Glow at Bottom ─── */}
        <div
          ref={bgGlowRef}
          className="absolute bottom-0 inset-x-0 h-48 sm:h-72 lg:h-96 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 65% at 50% 100%, rgba(234, 88, 12, 0.42) 0%, rgba(74, 29, 11, 0.24) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* ─── Top Spacer for Flex Balance ─── */}
        <div className="w-full h-2 sm:h-6 pointer-events-none" aria-hidden="true" />

        {/* ─── Main Content Row (Perspective 3D Stage) ─── */}
        <div
          className="max-w-[1416px] w-full mx-auto relative z-10 my-auto py-4 sm:py-6 lg:py-8"
          style={{ perspective: 1200 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Sarah Mitchell & Title */}
            <div className="lg:col-span-5 text-left lg:pl-6 xl:pl-10">
              <h3
                ref={titleRef}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]"
              >
                Sarah Mitchell
              </h3>

              <p
                ref={subtitleRef}
                className="mt-2.5 sm:mt-3 text-[#A89880] text-sm sm:text-base lg:text-[17px] font-sans font-normal tracking-wide drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
              >
                Chief Operating Officer
              </p>
            </div>

            {/* Center/Right Column: 3D Inertia-Tilted Showcase Card */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div
                ref={cardRef}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15 bg-stone-900 cursor-pointer shrink-0 transition-shadow duration-300 group"
              >
                {/* Portrait Photo */}
                <img
                  src={sarahPhoto}
                  alt="Sarah Mitchell — Chief Operating Officer"
                  className="w-full h-auto object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dynamic Specular Light Glare Overlay */}
                <div
                  ref={glareRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
                />

                {/* Subtle Cinematic Edge Ring */}
                <div
                  className="absolute inset-0 rounded-[28px] sm:rounded-[32px] ring-1 ring-inset ring-white/15 pointer-events-none z-10"
                  aria-hidden="true"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ─── Bottom-Right CTA: SCROLL TO ENTER STORY ─── */}
        <div
          ref={scrollBtnRef}
          className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pb-2 sm:pb-4 flex justify-end items-end"
        >
          <div
            onClick={handleScroll}
            className="group flex items-center gap-2.5 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer select-none rounded-full p-1"
          >
            {/* Circular Down Arrow Icon Badge matching Figma */}
            <span className="w-5 h-5 rounded-full border border-white/60 group-hover:border-[#F97316] flex items-center justify-center transition-all duration-300 bg-white/5 backdrop-blur-sm group-hover:scale-110">
              <svg
                className="w-2.5 h-2.5 text-white/80 group-hover:text-[#F97316] transition-transform duration-300 group-hover:translate-y-0.5"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="2" x2="5" y2="8" />
                <polyline points="2.5 5.5 5 8 7.5 5.5" />
              </svg>
            </span>

            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase text-white/85 group-hover:text-white transition-colors duration-300"
            >
              SCROLL TO ENTER STORY
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

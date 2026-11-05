import { useRef, useEffect, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import starryBg from '@/assets/meet-us/starry-cosmic-bg.png';
import sarahPhoto from '@/assets/meet-us/sarah-mitchell.png';
import michaelPhoto from '@/assets/meet-us/michael-anderson.png';
import davidPhoto from '@/assets/meet-us/david-carter.png';

gsap.registerPlugin(ScrollTrigger);

export interface LeadershipSpotlightSectionProps {
  id?: string;
  className?: string;
  onScrollClick?: () => void;
}

interface StatItem {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
}

const impactStats: StatItem[] = [
  { target: 5000, prefix: '+', suffix: '', label: 'People Served' },
  { target: 200, prefix: '+', suffix: '', label: 'Volunteers' },
  { target: 8000, prefix: '+', suffix: '', label: 'Community Members' },
  { target: 8, prefix: '+', suffix: ' years', label: 'Years of Service' },
];

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2.2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

interface Leader {
  id: string;
  name: string;
  role: string;
  photo: string;
  objectPosition: string;
  whyServe: string;
  hope: string;
}

const leaders: Leader[] = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Chief Operating Officer',
    photo: sarahPhoto,
    objectPosition: 'object-[center_20%]',
    whyServe:
      'I serve because I believe every person deserves to know they matter. Being part of Live Achieve Believe gives me the opportunity to help create spaces where people feel seen, supported, and welcomed.',
    hope:
      'I find hope in people — in their courage to begin again, their willingness to care for one another, and the small moments of kindness that can change someone’s day.',
  },
  {
    id: 'michael-anderson',
    name: 'Michael Anderson',
    role: 'Executive Director',
    photo: michaelPhoto,
    objectPosition: 'object-[center_22%]',
    whyServe:
      'Leadership is fundamentally about stewardship. When we invest in one life with patience and dignity, that ripple spreads across families and generations.',
    hope:
      'I see hope in the resilience of human spirit — watching someone overcome deep adversity and turn around to lift up the person behind them.',
  },
  {
    id: 'david-carter',
    name: 'David Carter',
    role: 'Community Engagement Director',
    photo: davidPhoto,
    objectPosition: 'object-[center_22%]',
    whyServe:
      'Every community has unseen heroes and unheard voices. I serve to bridge the gap and ensure every person knows their presence is indispensable.',
    hope:
      'What gives me hope is authentic unity — when neighbors from completely different backgrounds sit at the same table and choose love over division.',
  },
];

export default function LeadershipSpotlightSection({
  id = 'leadership-spotlight',
  className = '',
  onScrollClick,
}: LeadershipSpotlightSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const preHeadingRef = useRef<HTMLDivElement | null>(null);

  const [activeLeaderIndex, setActiveLeaderIndex] = useState(-1);

  // References for 3D Cards, Glares, and Blurred Aura Layers
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glareRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ─── 1. MASTER GSAP SCROLLTRIGGER PINNED SCRUB (SomeoneNotices 1:1 Motion) ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const preHeading = preHeadingRef.current;

    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      // Resting states: Act 1 (Stats) visible first
      gsap.set('#opening-stats-slide', { autoAlpha: 1, scale: 1, y: 0 });

      if (preHeading) {
        gsap.set(preHeading, { y: 0, autoAlpha: 1 });
      }

      // Initial resting transform for all 3 leader cards (exact SomeoneNotices values)
      leaders.forEach((_, idx) => {
        const card = cardRefs.current[idx];
        if (card) {
          gsap.set(card, {
            scale: 0.84,
            rotateZ: -5,
            autoAlpha: 0.4,
            transformPerspective: 1200,
          });
        }

        gsap.set(`#leader-slide-${idx}`, { autoAlpha: 0, pointerEvents: 'none' });
        gsap.set(`#leader-title-${idx}`, { x: -45, autoAlpha: 0 });
        gsap.set(`#leader-narrative-${idx}`, { x: 45, autoAlpha: 0 });
        gsap.set(`#leader-btn-${idx}`, { y: 15, autoAlpha: 0 });
        gsap.set(`#bg-blur-${idx}`, { scale: 1.05, autoAlpha: 0 });
      });

      // Master Pinned Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=4200',
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.16) {
              setActiveLeaderIndex(-1);
            } else if (p < 0.44) {
              setActiveLeaderIndex(0);
            } else if (p < 0.72) {
              setActiveLeaderIndex(1);
            } else {
              setActiveLeaderIndex(2);
            }
          },
        },
      });

      // ─── ACT 1 (0.00 to 0.16): THE PEOPLE LEADING THE WAY (STATS FIRST!) ───
      // Hold stats until 0.10, then dissolve upward
      tl.to(
        '#opening-stats-slide',
        { autoAlpha: 0, scale: 0.95, y: -35, duration: 0.06, ease: 'power2.inOut' },
        0.10
      );

      // ─── ACT 2 (0.16 to 0.44): SARAH MITCHELL (SomeoneNotices 1:1 Motion) ───
      tl.set('#leader-slide-0', { autoAlpha: 1, pointerEvents: 'auto' }, 0.15);

      // Stage 1 (0.15 - 0.24): Title reveals, Aura blooms, Card zooms forward
      tl.to('#leader-title-0', { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, 0.16);
      tl.to('#bg-blur-0', { scale: 1.18, autoAlpha: 0.38, duration: 0.12, ease: 'power1.inOut' }, 0.16);
      const card0 = cardRefs.current[0];
      if (card0) {
        tl.to(
          card0,
          {
            scale: 1.02,
            rotateZ: -2.5,
            autoAlpha: 1,
            duration: 0.10,
            ease: 'power2.out',
          },
          0.16
        );
      }

      // Stage 2 (0.24 - 0.32): Narrative reveals, Card settles to -3deg, Button reveals
      tl.to('#leader-narrative-0', { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, 0.23);
      if (card0) {
        tl.to(
          card0,
          {
            scale: 1.0,
            rotateZ: -3,
            duration: 0.08,
            ease: 'power1.inOut',
          },
          0.24
        );
      }
      tl.to('#leader-btn-0', { y: 0, autoAlpha: 1, duration: 0.06, ease: 'power2.out' }, 0.26);

      // Stage 3 (0.32 - 0.40): Hold phase for reading
      tl.to({}, { duration: 0.08 });

      // Exit Sarah Slide (0.40 - 0.44)
      tl.to('#leader-slide-0', { autoAlpha: 0, scale: 0.96, y: -25, duration: 0.04, ease: 'power2.in' }, 0.40);
      tl.to('#bg-blur-0', { autoAlpha: 0, duration: 0.04 }, 0.40);
      tl.set('#leader-slide-0', { pointerEvents: 'none' }, 0.44);

      // ─── ACT 3 (0.44 to 0.72): MICHAEL ANDERSON (SomeoneNotices 1:1 Motion) ───
      tl.set('#leader-slide-1', { autoAlpha: 1, pointerEvents: 'auto' }, 0.43);

      // Stage 1 (0.44 - 0.53): Title reveals, Aura blooms, Card zooms forward
      tl.to('#leader-title-1', { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, 0.44);
      tl.to('#bg-blur-1', { scale: 1.18, autoAlpha: 0.38, duration: 0.12, ease: 'power1.inOut' }, 0.44);
      const card1 = cardRefs.current[1];
      if (card1) {
        tl.to(
          card1,
          {
            scale: 1.02,
            rotateZ: -2.5,
            autoAlpha: 1,
            duration: 0.10,
            ease: 'power2.out',
          },
          0.44
        );
      }

      // Stage 2 (0.52 - 0.60): Narrative reveals, Card settles to -3deg, Button reveals
      tl.to('#leader-narrative-1', { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, 0.51);
      if (card1) {
        tl.to(
          card1,
          {
            scale: 1.0,
            rotateZ: -3,
            duration: 0.08,
            ease: 'power1.inOut',
          },
          0.52
        );
      }
      tl.to('#leader-btn-1', { y: 0, autoAlpha: 1, duration: 0.06, ease: 'power2.out' }, 0.54);

      // Stage 3 (0.60 - 0.68): Hold phase for reading
      tl.to({}, { duration: 0.08 });

      // Exit Michael Slide (0.68 - 0.72)
      tl.to('#leader-slide-1', { autoAlpha: 0, scale: 0.96, y: -25, duration: 0.04, ease: 'power2.in' }, 0.68);
      tl.to('#bg-blur-1', { autoAlpha: 0, duration: 0.04 }, 0.68);
      tl.set('#leader-slide-1', { pointerEvents: 'none' }, 0.72);

      // ─── ACT 4 (0.72 to 1.00): DAVID CARTER (SomeoneNotices 1:1 Motion) ───
      tl.set('#leader-slide-2', { autoAlpha: 1, pointerEvents: 'auto' }, 0.71);

      // Stage 1 (0.72 - 0.81): Title reveals, Aura blooms, Card zooms forward
      tl.to('#leader-title-2', { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, 0.72);
      tl.to('#bg-blur-2', { scale: 1.18, autoAlpha: 0.38, duration: 0.12, ease: 'power1.inOut' }, 0.72);
      const card2 = cardRefs.current[2];
      if (card2) {
        tl.to(
          card2,
          {
            scale: 1.02,
            rotateZ: -2.5,
            autoAlpha: 1,
            duration: 0.10,
            ease: 'power2.out',
          },
          0.72
        );
      }

      // Stage 2 (0.80 - 0.88): Narrative reveals, Card settles to -3deg, Button reveals
      tl.to('#leader-narrative-2', { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, 0.79);
      if (card2) {
        tl.to(
          card2,
          {
            scale: 1.0,
            rotateZ: -3,
            duration: 0.08,
            ease: 'power1.inOut',
          },
          0.80
        );
      }
      tl.to('#leader-btn-2', { y: 0, autoAlpha: 1, duration: 0.06, ease: 'power2.out' }, 0.82);

      // Stage 3 (0.88 - 0.98): Hold phase for reading
      tl.to({}, { duration: 0.10 });
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // ─── 2. INTERACTIVE 3D MOUSE TILT (Hover Glare & Inertia on Active Card) ───
  useEffect(() => {
    if (activeLeaderIndex < 0) return;

    const stage = pinnedStageRef.current;
    const card = cardRefs.current[activeLeaderIndex];
    const glare = glareRefs.current[activeLeaderIndex];

    if (!stage || !card) return;

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
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28) 0%, rgba(249,115,22,0.18) 40%, transparent 75%)`;
      }
    };

    const onMouseEnterCard = () => {
      isHovering = true;
      if (glare) gsap.to(glare, { opacity: 1, duration: 0.35 });
      gsap.to(card, {
        boxShadow: '0 38px 95px rgba(249, 115, 22, 0.32), 0 25px 65px rgba(0,0,0,0.95)',
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
  }, [activeLeaderIndex]);

  // Smooth scroll down past the current view
  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const next =
      document.getElementById('moments-why-we-serve') ||
      document.getElementById('meet-us-next') ||
      document.getElementById('meet-us-team');
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
      className={`relative w-full bg-[#020409] ${className}`}
    >
      {/* ─── Pinned Stage Viewport (100vh) ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-screen min-h-[700px] lg:min-h-[800px] bg-[#020409] text-white overflow-hidden flex flex-col justify-between py-6 sm:py-8 lg:py-12 px-6 sm:px-10 lg:px-16 xl:px-20 select-none"
      >
        {/* ─── Cosmic Starry Sky Photo Base Layer ─── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <img
            src={starryBg}
            alt="Cosmic starry background"
            className="w-full h-full object-cover object-bottom pointer-events-none select-none"
          />
        </div>

        {/* ─── Blurred Background Photo Layers for Each Leader (SomeoneNotices 1:1 Bloom) ─── */}
        {leaders.map((leader, idx) => (
          <div
            key={`bg-blur-container-${leader.id}`}
            id={`bg-blur-${idx}`}
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-0"
            aria-hidden="true"
          >
            <img
              src={leader.photo}
              alt=""
              className="w-full h-full object-cover filter blur-[80px] saturate-[1.4] opacity-35 transform scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020409]/80 via-transparent to-[#020409]/90" />
          </div>
        ))}

        {/* ─── Ambient Horizon Amber Glow at Bottom ─── */}
        <div
          className="absolute bottom-0 inset-x-0 h-64 sm:h-80 lg:h-[460px] pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 70% at 50% 100%, rgba(234, 88, 12, 0.42) 0%, rgba(74, 29, 11, 0.22) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* ─── Top Floating Pre-heading & Breadcrumb Bar (Matching SomeoneNotices) ─── */}
        <div className="max-w-[1520px] w-full mx-auto flex items-start justify-between relative z-10 pt-1 sm:pt-2">
          <div ref={preHeadingRef} className="text-left">
            <p className="text-sm sm:text-base lg:text-[18px] xl:text-[20px] text-stone-300 font-sans tracking-wide flex flex-col gap-1 leading-snug">
              <span>Every meaningful change</span>
              <span>begins the same way.</span>
            </p>
          </div>

          <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-white/50 pt-1">
            Meet Us
          </span>
        </div>

        {/* ─── Center Stage Container with 3D Perspective ─── */}
        <div
          className="max-w-[1520px] w-full mx-auto relative z-10 my-auto py-4 sm:py-6 lg:py-8 flex-1 flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {/* ═══════════════════════════════════════════════════════════ */}
          {/* ACT 1: THE PEOPLE LEADING THE WAY (STATS FIRST!) */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div
            id="opening-stats-slide"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              The People Leading the Way
            </h2>

            <p className="mt-4 sm:mt-5 text-stone-300 text-sm sm:text-base lg:text-[17px] font-sans font-normal leading-relaxed text-center max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Meet the people who choose to serve, believe in hope, and help bring this mission to life.
            </p>

            {/* 4 Stat Boxes with Corner Registration Marks matching Figma Frame 1 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-5xl mx-auto mt-10 sm:mt-14">
              {impactStats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="relative p-6 sm:p-8 lg:p-10 border border-white/20 bg-black/30 backdrop-blur-sm rounded-none text-center flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] group transition-colors duration-300 hover:border-white/40 hover:bg-black/45"
                >
                  {/* Figma-Style Corner Crosshairs / Ticks */}
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

                  <span
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight block"
                  >
                    <AnimatedCounter
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </span>

                  <span className="mt-2 text-stone-300 text-xs sm:text-sm font-sans tracking-wide block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll Indicator below Stats */}
            <div
              onClick={handleScroll}
              className="mt-8 sm:mt-12 flex items-center gap-2.5 cursor-pointer select-none group text-white/80 hover:text-white transition-all"
            >
              <div className="w-5 h-5 rounded-full border border-white/45 group-hover:border-[#F97316] flex items-center justify-center shrink-0 transition-colors bg-white/5 backdrop-blur-sm group-hover:scale-110 duration-200">
                <Plus className="w-3 h-3 text-white/90 group-hover:text-[#F97316] transition-transform duration-300 group-hover:rotate-90" />
              </div>
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-white/85 group-hover:text-white transition-colors whitespace-nowrap font-medium"
              >
                SCROLL TO ENTER STORY
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* ACT 2 - 4: THREE LEADERS (SomeoneNotices 1:1 3-Column Layout) */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {leaders.map((leader, idx) => (
            <div
              key={leader.id}
              id={`leader-slide-${idx}`}
              className="absolute inset-0 flex items-center justify-center w-full opacity-0 pointer-events-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
                {/* ─── Left Column: Leader Name & Role (SomeoneNotices Title) ─── */}
                <div className="lg:col-span-3 text-left">
                  <div id={`leader-title-${idx}`}>
                    <h3
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-normal text-white tracking-wide leading-tight"
                    >
                      {leader.name}
                    </h3>
                    <p className="mt-2.5 text-stone-300 text-sm sm:text-base font-sans tracking-wide">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* ─── Center Column: 3D Inertia-Tilted Showcase Card + Scroll Button ─── */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center">
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    style={{
                      width: 'min(480px, 86vw)',
                      height: 'min(370px, calc(86vw * 370 / 480))',
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative rounded-[26px] overflow-hidden border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-stone-900 cursor-pointer shrink-0 transition-shadow duration-300 group"
                  >
                    <img
                      src={leader.photo}
                      alt={`${leader.name} — ${leader.role}`}
                      className={`w-full h-full object-cover ${leader.objectPosition} select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105`}
                    />

                    {/* Dynamic Specular Light Glare Overlay */}
                    <div
                      ref={(el) => {
                        glareRefs.current[idx] = el;
                      }}
                      className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
                    />

                    {/* Subtle Cinematic Vignette */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10"
                      aria-hidden="true"
                    />
                  </div>

                  {/* ─── (+) SCROLL TO CONTINUE (SomeoneNotices 1:1) ─── */}
                  <div
                    id={`leader-btn-${idx}`}
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

                {/* ─── Right Column: Narrative Story & Hope (SomeoneNotices 1:1) ─── */}
                <div className="lg:col-span-3 text-left lg:pl-4">
                  <div id={`leader-narrative-${idx}`} className="space-y-4 max-w-[310px]">
                    <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[16px] text-stone-300 font-sans leading-relaxed">
                      {leader.whyServe}
                    </p>
                    {leader.hope && (
                      <p className="pt-3 border-t border-white/10 text-xs sm:text-sm lg:text-[13px] text-[#C4B59D] font-serif italic leading-relaxed">
                        "{leader.hope}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom Balance Spacer matching SomeoneNotices ─── */}
        <div className="w-full h-2 sm:h-4" />
      </div>
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import starryBg from '@/assets/meet-us/starry-cosmic-bg.png';
import sarahPhoto from '@/assets/meet-us/sarah-mitchell.png';
import michaelPhoto from '@/assets/meet-us/michael-anderson.png';
import davidPhoto from '@/assets/meet-us/david-carter.png';
import { meetUsLeadership, type OfficialLeaderProfile } from '@/data/officialVerbiage';

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

const LEADER_MEDIA = [
  { photo: sarahPhoto, objectPosition: 'object-[center_20%]' },
  { photo: michaelPhoto, objectPosition: 'object-[center_22%]' },
  { photo: davidPhoto, objectPosition: 'object-[center_22%]' },
] as const;

const ACT_SCROLL_PROGRESS = [0.29, 0.56, 0.85] as const;

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2.2,
  reducedMotion = false,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  reducedMotion?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (reducedMotion || !isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, reducedMotion]);

  const displayedCount = reducedMotion ? target : count;

  return (
    <span ref={ref}>
      {prefix}{displayedCount}{suffix}
    </span>
  );
}

function ScrollCueButton({
  id,
  label,
  onClick,
}: {
  id?: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className="mt-5 sm:mt-7 inline-flex items-center gap-2.5 min-h-[36px] px-3 py-1.5 rounded-full cursor-pointer select-none group text-stone-200 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FDBA74]"
    >
      <span className="w-5 h-5 rounded-full border border-white/50 group-hover:border-[#FDBA74] flex items-center justify-center shrink-0 transition-colors bg-white/5 backdrop-blur-sm group-hover:scale-110 duration-200">
        <Plus
          aria-hidden="true"
          className="w-3 h-3 text-white group-hover:text-[#FDBA74] transition-transform duration-300 group-hover:rotate-90"
        />
      </span>
      <span
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        className="text-[11px] uppercase tracking-[0.22em] text-stone-100 group-hover:text-white transition-colors whitespace-nowrap font-medium"
      >
        {label}
      </span>
    </button>
  );
}

interface LeaderSpotlightSlideProps {
  leader: OfficialLeaderProfile;
  media: { photo: string; objectPosition: string };
  idx: number;
  totalLeaders: number;
  isDesktopMotion: boolean;
  cardRef?: (el: HTMLDivElement | null) => void;
  glareRef?: (el: HTMLDivElement | null) => void;
  onAdvance: (leaderIdx: number) => void;
}

function LeaderSpotlightSlide({
  leader,
  media,
  idx,
  totalLeaders,
  isDesktopMotion,
  cardRef,
  glareRef,
  onAdvance,
}: LeaderSpotlightSlideProps) {
  const isLast = idx === totalLeaders - 1;
  const nextLabel = isLast ? 'Scroll to continue' : 'Meet next leader';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,1fr)_minmax(300px,440px)_minmax(270px,1.25fr)] gap-6 xl:gap-10 items-center w-full">
      {/* Left Column: Leader Identity, Motto & Quote */}
      <div className="text-left">
        <div id={isDesktopMotion ? `leader-title-${idx}` : undefined}>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#FDBA74]">
            {leader.indexLabel} / {leader.role}
          </p>
          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="mt-2 text-3xl sm:text-4xl xl:text-[42px] font-normal text-white tracking-wide leading-tight"
          >
            {leader.name}
          </h3>
          <p className="mt-1 text-stone-300 text-xs sm:text-sm font-sans tracking-wide">
            {leader.organization}
          </p>
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="mt-3 text-[#FAF4E6] text-base sm:text-lg italic leading-snug"
          >
            {leader.headline}
          </p>

          <figure className="mt-4 pt-3 border-t border-white/15">
            <blockquote
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xs sm:text-[13px] xl:text-sm text-[#FAF4E6]/90 italic leading-relaxed space-y-0.5"
            >
              {leader.quoteLines.map((line, lineIdx) => (
                <p key={lineIdx}>{line}</p>
              ))}
            </blockquote>
            <figcaption className="mt-1.5 text-xs font-sans text-[#FDBA74]">
              {leader.quoteAttribution}
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Center Column: 3D Inertia-Tilted Showcase Photo Card */}
      <div className="flex flex-col items-center justify-center w-full">
        <div
          ref={cardRef}
          style={
            isDesktopMotion
              ? { transformStyle: 'preserve-3d' }
              : undefined
          }
          className="relative w-full max-w-[440px] aspect-[4/3.1] rounded-[26px] overflow-hidden border border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] bg-stone-900 shrink-0 transition-shadow duration-300 group"
        >
          <img
            src={media.photo}
            alt={`${leader.name} — ${leader.role}, ${leader.organization}`}
            className={`w-full h-full object-cover ${media.objectPosition} select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105`}
          />

          {/* Dynamic Specular Light Glare Overlay */}
          {isDesktopMotion && glareRef && (
            <div
              ref={glareRef}
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
            />
          )}

          {/* Subtle Cinematic Vignette */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />
        </div>

        <ScrollCueButton
          id={isDesktopMotion ? `leader-btn-${idx}` : undefined}
          label={nextLabel}
          onClick={() => onAdvance(idx)}
        />
      </div>

      {/* Right Column: Full Official Narrative Bio */}
      <div className="text-left lg:border-l lg:border-white/15 lg:pl-6">
        <div
          id={isDesktopMotion ? `leader-narrative-${idx}` : undefined}
          className="space-y-2.5 max-w-[54ch]"
        >
          {leader.bioParagraphs.map((paragraph, pIdx) => (
            <p
              key={pIdx}
              className="text-xs sm:text-[13px] xl:text-[14px] text-stone-200 font-sans leading-[1.58]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeadershipSpotlightSection({
  id = 'leadership-spotlight',
  className = '',
  onScrollClick,
}: LeadershipSpotlightSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glareRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isDesktopMotion, setIsDesktopMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches;
  });
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(-1);

  const leaders = meetUsLeadership.leaders;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    const updateMatch = () => setIsDesktopMotion(mq.matches);
    mq.addEventListener('change', updateMatch);
    return () => mq.removeEventListener('change', updateMatch);
  }, []);

  // Master GSAP ScrollTrigger Pinned Scrub on desktop when reduced motion is off
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    if (!container || !stage || !isDesktopMotion) {
      scrollTriggerRef.current = null;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('#opening-stats-slide', { autoAlpha: 1, scale: 1, y: 0, pointerEvents: 'auto' });

      leaders.forEach((_, idx) => {
        const card = cardRefs.current[idx];
        if (card) {
          gsap.set(card, {
            scale: 0.86,
            rotateZ: -4.5,
            autoAlpha: 0,
            transformPerspective: 1200,
          });
        }

        gsap.set(`#leader-slide-${idx}`, { autoAlpha: 0, pointerEvents: 'none' });
        gsap.set(`#leader-title-${idx}`, { x: -40, autoAlpha: 0 });
        gsap.set(`#leader-narrative-${idx}`, { x: 40, autoAlpha: 0 });
        gsap.set(`#leader-btn-${idx}`, { y: 15, autoAlpha: 0 });
        gsap.set(`#bg-blur-${idx}`, { scale: 1.05, autoAlpha: 0 });
      });

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
            if (p < 0.145) {
              setActiveLeaderIndex(-1);
            } else if (p < 0.41) {
              setActiveLeaderIndex(0);
            } else if (p < 0.68) {
              setActiveLeaderIndex(1);
            } else {
              setActiveLeaderIndex(2);
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Act 1 (0.00 - 0.14): Opening Impact Stats exit before Slide 0 starts
      tl.to(
        '#opening-stats-slide',
        { autoAlpha: 0, scale: 0.96, y: -30, duration: 0.04, ease: 'power2.inOut', pointerEvents: 'none' },
        0.10
      );

      // Strictly disjoint sequential windows:
      // Slide 0: 0.15 -> 0.40 | Slide 1: 0.42 -> 0.67 | Slide 2: 0.69 -> 1.00
      const slideStarts = [0.15, 0.42, 0.69] as const;

      leaders.forEach((_, idx) => {
        const start = slideStarts[idx];
        const card = cardRefs.current[idx];
        const isFinal = idx === leaders.length - 1;

        tl.set(`#leader-slide-${idx}`, { autoAlpha: 1, scale: 1, y: 0, pointerEvents: 'auto' }, start);
        tl.to(`#leader-title-${idx}`, { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' }, start);
        tl.to(`#bg-blur-${idx}`, { scale: 1.18, autoAlpha: 0.38, duration: 0.11, ease: 'power1.inOut' }, start);

        if (card) {
          tl.to(
            card,
            { scale: 1.02, rotateZ: -2.2, autoAlpha: 1, duration: 0.09, ease: 'power2.out' },
            start
          );
          tl.to(
            card,
            { scale: 1.0, rotateZ: -3, duration: 0.08, ease: 'power1.inOut' },
            start + 0.08
          );
        }

        tl.to(
          `#leader-narrative-${idx}`,
          { x: 0, autoAlpha: 1, duration: 0.08, ease: 'power2.out' },
          start + 0.07
        );
        tl.to(
          `#leader-btn-${idx}`,
          { y: 0, autoAlpha: 1, duration: 0.06, ease: 'power2.out' },
          start + 0.09
        );

        if (!isFinal) {
          const exitAt = start + 0.21;
          tl.to(
            `#leader-slide-${idx}`,
            { autoAlpha: 0, scale: 0.96, y: -25, duration: 0.04, ease: 'power2.in' },
            exitAt
          );
          tl.to(`#bg-blur-${idx}`, { autoAlpha: 0, duration: 0.04 }, exitAt);
          tl.set(`#leader-slide-${idx}`, { pointerEvents: 'none' }, exitAt + 0.04);
        } else {
          tl.to({}, { duration: 0.15 }, start + 0.16);
        }
      });
    }, container);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [isDesktopMotion, leaders]);

  // Interactive 3D Mouse Tilt on Active Desktop Card
  useEffect(() => {
    if (!isDesktopMotion || activeLeaderIndex < 0) return;

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
  }, [activeLeaderIndex, isDesktopMotion]);

  const scrollBehavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  const jumpToAct = (targetActIndex: number) => {
    const st = scrollTriggerRef.current;
    if (isDesktopMotion && st) {
      const progress =
        targetActIndex < 0 ? 0.02 : ACT_SCROLL_PROGRESS[targetActIndex] ?? 0.85;
      const top = st.start + (st.end - st.start) * progress;
      window.scrollTo({ top, behavior: scrollBehavior });
      return;
    }

    const elId = targetActIndex < 0 ? 'opening-stats-slide' : `leader-slide-${targetActIndex}`;
    const el = document.getElementById(elId);
    if (el) {
      el.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    }
  };

  const scrollPastSection = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const next =
      document.getElementById('moments-why-we-serve') ||
      document.getElementById('meet-us-next') ||
      document.getElementById('meet-us-team');
    if (next) {
      next.scrollIntoView({ behavior: scrollBehavior });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: scrollBehavior });
    }
  };

  const handleAdvanceFromLeader = (leaderIdx: number) => {
    if (leaderIdx < leaders.length - 1) {
      jumpToAct(leaderIdx + 1);
    } else {
      scrollPastSection();
    }
  };

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full bg-[#020409] overflow-x-clip ${className}`}
    >
      {/* Stage Viewport: Pinned on Desktop Motion, Full-Flow Stack on Mobile/Reduced Motion */}
      <div
        ref={pinnedStageRef}
        className={`relative w-full bg-[#020409] text-white flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 ${
          isDesktopMotion
            ? 'h-screen min-h-[700px] lg:min-h-[760px] overflow-hidden py-6 lg:py-10'
            : 'min-h-screen py-14 sm:py-20 space-y-14'
        }`}
      >
        {/* Cosmic Starry Sky Photo Base Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
          <img
            src={starryBg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-bottom pointer-events-none select-none"
          />
        </div>

        {/* Blurred Background Photo Layers for Each Leader */}
        {isDesktopMotion &&
          leaders.map((leader, idx) => {
            const media = LEADER_MEDIA[idx % LEADER_MEDIA.length];
            return (
              <div
                key={`bg-blur-container-${leader.id}`}
                id={`bg-blur-${idx}`}
                className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-0"
                aria-hidden="true"
              >
                <img
                  src={media.photo}
                  alt=""
                  className="w-full h-full object-cover filter blur-[80px] saturate-[1.4] opacity-35 transform scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020409]/80 via-transparent to-[#020409]/90" />
              </div>
            );
          })}

        {/* Ambient Horizon Amber Glow */}
        <div
          className="absolute bottom-0 inset-x-0 h-64 sm:h-80 lg:h-[420px] pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 70% at 50% 100%, rgba(234, 88, 12, 0.4) 0%, rgba(74, 29, 11, 0.2) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* Top Pre-heading & Direct Leadership Switcher */}
        <div className="max-w-[1520px] w-full mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-4 relative z-20 pt-1">
          <div className="text-left">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#FDBA74]">
              {meetUsLeadership.eyebrow}
            </p>
            <p className="mt-1 text-sm sm:text-base lg:text-[17px] text-stone-200 font-sans tracking-wide leading-snug">
              {meetUsLeadership.subheadline}
            </p>
          </div>

          <nav aria-label="Leadership sections" className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => jumpToAct(-1)}
              aria-current={isDesktopMotion && activeLeaderIndex === -1 ? 'step' : undefined}
              className={`min-h-[32px] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDBA74] ${
                isDesktopMotion && activeLeaderIndex === -1
                  ? 'border-[#FDBA74] text-[#FDBA74] bg-white/10'
                  : 'border-white/25 text-stone-200 hover:border-white/60 hover:text-white bg-black/30'
              }`}
            >
              Overview
            </button>
            {leaders.map((leader, idx) => {
              const isActive = isDesktopMotion && activeLeaderIndex === idx;
              return (
                <button
                  key={leader.id}
                  type="button"
                  onClick={() => jumpToAct(idx)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`min-h-[32px] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.16em] border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDBA74] ${
                    isActive
                      ? 'border-[#FDBA74] text-[#FDBA74] bg-white/10'
                      : 'border-white/25 text-stone-200 hover:border-white/60 hover:text-white bg-black/30'
                  }`}
                >
                  {leader.indexLabel} {leader.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center Stage Container */}
        <div
          className={`max-w-[1520px] w-full mx-auto relative z-10 ${
            isDesktopMotion
              ? 'my-auto py-4 flex-1 flex items-center justify-center'
              : 'space-y-20 py-4'
          }`}
          style={isDesktopMotion ? { perspective: 1200 } : undefined}
        >
          {/* Act 1: Impact Stats */}
          <div
            id="opening-stats-slide"
            className={`${
              isDesktopMotion
                ? 'absolute inset-0 flex flex-col items-center justify-center px-4'
                : 'flex flex-col items-center justify-center text-center py-4'
            } text-center`}
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              {meetUsLeadership.heading}
            </h2>

            <p className="mt-4 sm:mt-5 text-stone-200 text-sm sm:text-base lg:text-[17px] font-sans font-normal leading-relaxed text-center max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {meetUsLeadership.subheadline}
            </p>

            {/* 4 Stat Boxes with Corner Registration Marks */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full max-w-5xl mx-auto mt-10 sm:mt-12">
              {impactStats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="relative p-6 sm:p-8 lg:p-10 border border-white/20 bg-black/35 backdrop-blur-sm text-center flex flex-col items-center justify-center min-h-[130px] sm:min-h-[155px] transition-colors duration-300 hover:border-white/40 hover:bg-black/45"
                >
                  <span aria-hidden="true" className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
                  <span aria-hidden="true" className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
                  <span aria-hidden="true" className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
                  <span aria-hidden="true" className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

                  <span
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight block"
                  >
                    <AnimatedCounter
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      reducedMotion={prefersReducedMotion}
                    />
                  </span>

                  <span className="mt-2 text-stone-200 text-xs sm:text-sm font-sans tracking-wide block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <ScrollCueButton
              label="Scroll to meet leadership"
              onClick={() => jumpToAct(0)}
            />
          </div>

          {/* Acts 2 - 4: Three Leaders with Showcase Portrait Photos */}
          {leaders.map((leader, idx) => {
            const media = LEADER_MEDIA[idx % LEADER_MEDIA.length];
            return (
              <div
                key={leader.id}
                id={`leader-slide-${idx}`}
                className={
                  isDesktopMotion
                    ? 'absolute inset-0 flex items-center justify-center w-full opacity-0 pointer-events-none'
                    : 'relative w-full pt-8 border-t border-white/15'
                }
              >
                <LeaderSpotlightSlide
                  leader={leader}
                  media={media}
                  idx={idx}
                  totalLeaders={leaders.length}
                  isDesktopMotion={isDesktopMotion}
                  cardRef={
                    isDesktopMotion
                      ? (el) => {
                          cardRefs.current[idx] = el;
                        }
                      : undefined
                  }
                  glareRef={
                    isDesktopMotion
                      ? (el) => {
                          glareRefs.current[idx] = el;
                        }
                      : undefined
                  }
                  onAdvance={handleAdvanceFromLeader}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom Balance Spacer */}
        <div className="w-full h-2" aria-hidden="true" />
      </div>
    </section>
  );
}

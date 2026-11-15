import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import seenImg from '@/assets/join-movement/join-movement.jpg';

gsap.registerPlugin(ScrollTrigger);

export interface SomeoneNoticesSectionProps {
  id?: string;
  className?: string;
}

interface MovementMoment {
  preHeading: [string, string];
  title: string;
  image: string;
  alt: string;
  narrative: string;
}

const MOMENTS: MovementMoment[] = [
  {
    preHeading: ['Every meaningful change', 'begins the same way.'],
    title: 'Someone notices.',
    image: seenImg,
    alt: 'An observant neighbor noticing quietly with compassion',
    narrative: 'An observant neighbor sees a family quietly carrying more than their share. No judgment, just seeing clearly.',
  },
  {
    preHeading: ['Every meaningful change', 'begins the same way.'],
    title: 'Someone listens.',
    image: seenImg,
    alt: 'Listening with compassion and dignity',
    narrative: 'A conversation starts. A barrier comes down. Someone realizes they do not have to carry the weight alone.',
  },
  {
    preHeading: ['Every meaningful change', 'begins the same way.'],
    title: 'Someone acts.',
    image: seenImg,
    alt: 'Taking compassionate action together',
    narrative: 'Hands show up. A table is set. Compassion is no longer an intention—it becomes real, lasting change.',
  },
];

export default function SomeoneNoticesSection({
  id = 'someone-notices',
  className = '',
}: SomeoneNoticesSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const preHeadingRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const narrativeRef = useRef<HTMLParagraphElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const [slideIndex, setSlideIndex] = useState<number>(0);
  const currentMoment = MOMENTS[slideIndex];

  const prevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? MOMENTS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev === MOMENTS.length - 1 ? 0 : prev + 1));
  };

  // ─── 1. GSAP SCROLLTRIGGER PINNED ENTRANCE ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const card = cardRef.current;
    const preHeading = preHeadingRef.current;
    const title = titleRef.current;
    const narrative = narrativeRef.current;
    const controls = controlsRef.current;

    if (!container || !stage || !card) return;

    const ctx = gsap.context(() => {
      gsap.set(card, {
        scale: 0.9,
        rotateZ: -4,
        autoAlpha: 0.6,
        transformPerspective: 1200,
      });

      if (preHeading) {
        gsap.set(preHeading, { y: -16, autoAlpha: 0 });
      }
      if (title) {
        gsap.set(title, { x: -35, autoAlpha: 0 });
      }
      if (narrative) {
        gsap.set(narrative, { x: 35, autoAlpha: 0 });
      }
      if (controls) {
        gsap.set(controls, { y: 12, autoAlpha: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px',
          end: '+=700',
          pin: stage,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      if (preHeading) {
        tl.to(preHeading, { y: 0, autoAlpha: 1, duration: 0.3, ease: 'power2.out' }, 0.02);
      }

      if (title) {
        tl.to(title, { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.05);
      }

      tl.to(
        card,
        {
          scale: 1.0,
          rotateZ: -3,
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power2.out',
        },
        0.08
      );

      if (narrative) {
        tl.to(narrative, { x: 0, autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.2);
      }

      if (controls) {
        tl.to(controls, { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }, 0.3);
      }

      tl.to({}, { duration: 0.25 });
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

      const tiltY = Math.max(-10, Math.min(10, deltaX * 10));
      const tiltX = Math.max(-8, Math.min(8, -deltaY * 8));

      setRotateX(tiltX);
      setRotateY(tiltY);

      if (isHovering && glare) {
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, rgba(249,115,22,0.12) 40%, transparent 75%)`;
      }
    };

    const onMouseEnterCard = () => {
      isHovering = true;
      if (glare) gsap.to(glare, { opacity: 1, duration: 0.35 });
      gsap.to(card, {
        boxShadow: '0 24px 60px rgba(40, 25, 10, 0.18)',
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
        boxShadow: '0 16px 40px rgba(40, 25, 10, 0.12)',
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

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full bg-[#FFF1D3] ${className}`}
    >
      {/* ─── Pinned Stage Viewport ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full min-h-[85vh] lg:h-[calc(100vh-74px)] bg-[#FFF1D3] text-[#121010] overflow-hidden flex flex-col justify-between py-10 sm:py-14 lg:py-16 px-6 sm:px-12 lg:px-16 xl:px-20 select-none"
      >
        {/* ─── Top Left: Floating Pre-heading Statement (Figma 1:1) ─── */}
        <div
          ref={preHeadingRef}
          className="max-w-[1520px] w-full mx-auto text-left relative z-10 pt-2 sm:pt-4"
        >
          <p className="text-base sm:text-lg lg:text-[19px] xl:text-[21px] text-[#121010] font-sans font-bold tracking-tight flex flex-col gap-0.5 leading-snug">
            <span>{currentMoment.preHeading[0]}</span>
            <span>{currentMoment.preHeading[1]}</span>
          </p>
        </div>

        {/* ─── Main 3-Column Center Stage (Figma 1:1 Layout) ─── */}
        <div
          className="max-w-[1520px] w-full mx-auto relative z-10 my-auto py-6 sm:py-8"
          style={{ perspective: 1200 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: "Someone notices." */}
            <div className="lg:col-span-4 text-left">
              <h3
                ref={titleRef}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-normal text-[#121010] tracking-tight leading-tight"
              >
                {currentMoment.title}
              </h3>
            </div>

            {/* Center Column: 3D Inertia-Tilted Showcase Card + Circular (←) (→) Arrows */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                ref={cardRef}
                style={{
                  width: 'min(440px, 86vw)',
                  height: 'min(335px, calc(86vw * 335 / 440))',
                  transformStyle: 'preserve-3d',
                }}
                className="relative rounded-[26px] overflow-hidden border border-[#DECDB0] shadow-[0_16px_40px_rgba(40,25,10,0.12)] bg-[#FFF1D3] cursor-pointer shrink-0 transition-shadow duration-300 group"
              >
                <img
                  src={currentMoment.image}
                  alt={currentMoment.alt}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dynamic Specular Light Glare Overlay */}
                <div
                  ref={glareRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10"
                />
              </div>

              {/* ─── Circular (←) (→) Navigation Arrows (Figma 1:1) ─── */}
              <div
                ref={controlsRef}
                className="mt-6 sm:mt-8 flex items-center justify-center gap-3 select-none"
              >
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous moment"
                  className="w-8 h-8 rounded-full border border-[#D5C6A8] hover:border-[#121010] bg-[#FFF1D3] hover:bg-[#F2DFBA] flex items-center justify-center transition-all cursor-pointer active:scale-95 text-[#121010]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#121010]" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next moment"
                  className="w-8 h-8 rounded-full border border-[#D5C6A8] hover:border-[#121010] bg-[#FFF1D3] hover:bg-[#F2DFBA] flex items-center justify-center transition-all cursor-pointer active:scale-95 text-[#121010]"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#121010]" />
                </button>
              </div>
            </div>

            {/* Right Column: Narrative Text */}
            <div className="lg:col-span-3 text-left lg:pl-6">
              <p
                ref={narrativeRef}
                className="text-xs sm:text-[13px] lg:text-[14px] xl:text-[15px] text-[#121010] font-sans font-medium leading-relaxed max-w-[280px]"
              >
                {currentMoment.narrative}
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

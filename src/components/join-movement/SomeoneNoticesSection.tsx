import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import moment1Img from '@/assets/join-movement/img/moment-1-notices.png';
import moment2Img from '@/assets/join-movement/img/moment-2-cares.png';
import moment3Img from '@/assets/join-movement/img/moment-3-helps.png';
import moment4Img from '@/assets/join-movement/img/moment-4-joins.png';
import moment5Img from '@/assets/join-movement/img/moment-5-another.png';
import moment6Img from '@/assets/join-movement/img/moment-6-movement.png';

gsap.registerPlugin(ScrollTrigger);

export interface SomeoneNoticesSectionProps {
  id?: string;
  className?: string;
}

interface MovementMoment {
  title: string;
  titlePrefix?: string;
  highlight?: string;
  image: string;
  alt: string;
  narrative: string;
}

const MOMENTS: MovementMoment[] = [
  {
    title: 'Someone notices.',
    image: moment1Img,
    alt: 'An observant neighbor sees a family quietly carrying more than their share',
    narrative: 'An observant neighbor sees a family quietly carrying more than their share. No judgment, just seeing clearly.',
  },
  {
    title: 'Someone cares.',
    image: moment2Img,
    alt: 'A child smiling with a teddy bear and being comforted',
    narrative: 'A listening ear. A seat pulled up to the porch. Not an offer of instant answers, but the gift of uninterrupted presence.',
  },
  {
    title: 'Someone decides to help.',
    image: moment3Img,
    alt: 'Volunteers smiling and handing out relief boxes',
    narrative: 'A door held open. A pantry stocked without paperwork. The quiet courage to bridge isolation with tangible relief.',
  },
  {
    title: 'Then another person joins.',
    image: moment4Img,
    alt: 'Volunteers stacking hands together in community solidarity',
    narrative: 'When one shows up, second chairs appear. A retired carpenter helps build the shelves, a high schooler carries crates.',
  },
  {
    title: 'Then another.',
    image: moment5Img,
    alt: 'Community hall with volunteers sorting and organizing donations',
    narrative: 'The local corner store donates produce. A local teacher stops by to read with kids. Individual kindness becomes culture.',
  },
  {
    title: 'Until hope becomes a MOVEMENT.',
    titlePrefix: 'Until hope becomes a',
    highlight: 'MOVEMENT.',
    image: moment6Img,
    alt: 'A vibrant outdoor neighborhood dinner banquet at golden hour sunset',
    narrative: 'A neighborhood block alive with mutual dignity. No saviors, no beneficiaries—only neighbors holding the circle unbroken.',
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

  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const narrativeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ─── 1. GSAP SCROLLTRIGGER PINNED SCRUB ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const card = cardRef.current;

    if (!container || !stage || !card) return;

    const ctx = gsap.context(() => {
      // Initialize states
      titleRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 22,
        });
      });

      imageRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: idx === 0 ? 1 : 0,
          scale: idx === 0 ? 1 : 1.04,
        });
      });

      narrativeRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: idx === 0 ? 1 : 0,
          y: idx === 0 ? 0 : 22,
        });
      });

      gsap.set(card, {
        scale: 0.98,
        transformPerspective: 1200,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px',
          end: '+=2800',
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Settle card on entrance
      tl.to(card, { scale: 1.0, duration: 0.08, ease: 'power1.out' }, 0);

      // Transitions between the 6 moments across scroll
      const numTransitions = MOMENTS.length - 1; // 5
      const segmentDuration = 0.84 / numTransitions;
      const fadeDuration = 0.055;

      for (let i = 0; i < numTransitions; i++) {
        const transStart = 0.08 + (i + 1) * segmentDuration - fadeDuration;

        const currTitle = titleRefs.current[i];
        const nextTitle = titleRefs.current[i + 1];
        const currImg = imageRefs.current[i];
        const nextImg = imageRefs.current[i + 1];
        const currNarrative = narrativeRefs.current[i];
        const nextNarrative = narrativeRefs.current[i + 1];

        // Fade out current
        if (currTitle) {
          tl.to(currTitle, { autoAlpha: 0, y: -18, duration: fadeDuration, ease: 'power2.inOut' }, transStart);
        }
        if (currImg) {
          tl.to(currImg, { autoAlpha: 0, scale: 0.96, duration: fadeDuration, ease: 'power2.inOut' }, transStart);
        }
        if (currNarrative) {
          tl.to(currNarrative, { autoAlpha: 0, y: -18, duration: fadeDuration, ease: 'power2.inOut' }, transStart);
        }

        // Fade in next
        if (nextTitle) {
          tl.to(nextTitle, { autoAlpha: 1, y: 0, duration: fadeDuration, ease: 'power2.inOut' }, transStart + 0.015);
        }
        if (nextImg) {
          tl.to(nextImg, { autoAlpha: 1, scale: 1.0, duration: fadeDuration, ease: 'power2.inOut' }, transStart + 0.015);
        }
        if (nextNarrative) {
          tl.to(nextNarrative, { autoAlpha: 1, y: 0, duration: fadeDuration, ease: 'power2.inOut' }, transStart + 0.015);
        }
      }

      // Final hold at end of pinned section
      tl.to({}, { duration: 0.1 });
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
    };

    const onMouseLeaveCard = () => {
      isHovering = false;
      if (glare) gsap.to(glare, { opacity: 0, duration: 0.45 });
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
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
      {/* ─── Pinned Stage Viewport (Figma 1:1) ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full min-h-[85vh] lg:h-[calc(100vh-74px)] bg-[#FFF1D3] text-[#121010] overflow-hidden flex flex-col justify-between py-10 sm:py-14 lg:py-16 px-6 sm:px-12 lg:px-16 xl:px-20 select-none"
      >
        {/* ─── Top Left: Floating Pre-heading Statement (Figma 1:1) ─── */}
        <div className="max-w-[1520px] w-full mx-auto text-left relative z-10 pt-2 sm:pt-4">
          <p className="text-base sm:text-lg lg:text-[19px] xl:text-[21px] text-[#121010] font-sans font-bold tracking-tight flex flex-col gap-0.5 leading-snug">
            <span>Every meaningful change</span>
            <span>begins the same way.</span>
          </p>
        </div>

        {/* ─── Main 3-Column Center Stage (Figma 1:1 Layout) ─── */}
        <div
          className="max-w-[1520px] w-full mx-auto relative z-10 my-auto py-6 sm:py-8"
          style={{ perspective: 1200 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Title (Stack of 6 moments, cross-faded by ScrollTrigger) */}
            <div className="lg:col-span-4 text-left relative min-h-[140px] sm:min-h-[160px] flex items-center">
              {MOMENTS.map((moment, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    titleRefs.current[idx] = el;
                  }}
                  className={`absolute inset-0 flex items-center ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-semibold text-[#121010] tracking-tight leading-[1.12]"
                  >
                    {moment.titlePrefix && moment.highlight ? (
                      <>
                        <span>{moment.titlePrefix}</span>
                        <br />
                        <span className="text-[#EA580C] font-bold tracking-wide uppercase">
                          {moment.highlight}
                        </span>
                      </>
                    ) : (
                      moment.title
                    )}
                  </h3>
                </div>
              ))}
            </div>

            {/* Center Column: 3D Inertia Showcase (Stack of 6 images) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                ref={cardRef}
                style={{
                  width: 'min(480px, 88vw)',
                  height: 'min(380px, calc(88vw * 380 / 480))',
                  transformStyle: 'preserve-3d',
                }}
                className="relative cursor-pointer shrink-0 transition-transform duration-300 group flex items-center justify-center"
              >
                {MOMENTS.map((moment, idx) => (
                  <img
                    key={idx}
                    ref={(el) => {
                      imageRefs.current[idx] = el;
                    }}
                    src={moment.image}
                    alt={moment.alt}
                    className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.12)] select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                      idx === 0 ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                {/* Dynamic Specular Light Glare Overlay */}
                <div
                  ref={glareRef}
                  className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-10 rounded-[24px]"
                />
              </div>
            </div>

            {/* Right Column: Narrative Text (Stack of 6 moments, cross-faded by ScrollTrigger) */}
            <div className="lg:col-span-3 text-left lg:pl-6 relative min-h-[120px] flex items-center">
              {MOMENTS.map((moment, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    narrativeRefs.current[idx] = el;
                  }}
                  className={`absolute inset-0 flex items-center ${idx === 0 ? 'opacity-100' : 'opacity-0'}`}
                >
                  <p className="text-sm sm:text-[15px] lg:text-[16px] text-[#121010] font-sans font-bold leading-relaxed max-w-[320px]">
                    {moment.narrative}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Subtle bottom balance spacer */}
        <div className="w-full h-2 sm:h-4" />
      </div>
    </div>
  );
}

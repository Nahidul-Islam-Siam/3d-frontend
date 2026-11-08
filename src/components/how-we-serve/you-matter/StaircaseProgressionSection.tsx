import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'VALUE',
    desc: 'When young people recognize that they are valuable...',
  },
  {
    number: '02',
    title: 'SELF-WORTH',
    desc: 'They begin to value themselves.',
  },
  {
    number: '03',
    title: 'RELATIONSHIPS',
    desc: 'They become more able to value others.',
  },
  {
    number: '04',
    title: 'CONFIDENCE',
    desc: 'Confidence begins to grow.',
  },
  {
    number: '05',
    title: 'PURPOSE',
    desc: 'Purpose begins to grow.',
  },
];

export default function StaircaseProgressionSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const taglineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── Desktop Scrollytelling (Pinned Section, Scrub Step-by-Step) ───
      mm.add('(min-width: 768px)', () => {
        // Initial resting states
        stepCardRefs.current.forEach((card, idx) => {
          if (!card) return;
          gsap.set(card, { autoAlpha: 0.18, y: 30 });
          if (numberRefs.current[idx]) gsap.set(numberRefs.current[idx], { color: '#57534E' });
          if (titleRefs.current[idx]) gsap.set(titleRefs.current[idx], { color: '#78716C' });
          if (descRefs.current[idx]) gsap.set(descRefs.current[idx], { autoAlpha: 0.35 });
          if (lineRefs.current[idx]) gsap.set(lineRefs.current[idx], { width: 0, backgroundColor: '#57534E' });
        });

        if (taglineRef.current) {
          gsap.set(taglineRef.current, { autoAlpha: 0, y: 20 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: stage,
            start: 'top top',
            end: '+=2000',
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step by step timeline: 01 -> 02 -> 03 -> 04 -> 05 -> Tagline
        const stepDuration = 0.16;
        const stepGap = 0.03;

        steps.forEach((_, idx) => {
          const startTime = 0.04 + idx * (stepDuration + stepGap);
          const card = stepCardRefs.current[idx];
          const num = numberRefs.current[idx];
          const title = titleRefs.current[idx];
          const desc = descRefs.current[idx];
          const line = lineRefs.current[idx];

          if (!card) return;

          // Animate card into full illuminated focus
          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              duration: stepDuration,
              ease: 'power2.out',
            },
            startTime
          );

          if (num) {
            tl.to(
              num,
              {
                color: '#F97316',
                duration: stepDuration,
                ease: 'power2.out',
              },
              startTime
            );
          }

          if (title) {
            tl.to(
              title,
              {
                color: '#FFFFFF',
                duration: stepDuration,
                ease: 'power2.out',
              },
              startTime
            );
          }

          if (desc) {
            tl.to(
              desc,
              {
                autoAlpha: 1,
                color: '#D6D3D1',
                duration: stepDuration,
                ease: 'power2.out',
              },
              startTime
            );
          }

          if (line) {
            tl.to(
              line,
              {
                width: 36,
                backgroundColor: '#F97316',
                duration: stepDuration,
                ease: 'power2.out',
              },
              startTime
            );
          }
        });

        // Final conclusion tagline bloom
        if (taglineRef.current) {
          tl.to(
            taglineRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.14,
              ease: 'power2.out',
            },
            0.88
          );
        }
      });

      // ─── Mobile Scrollytelling (Vertical Natural Scroll Trigger) ───
      mm.add('(max-width: 767px)', () => {
        stepCardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { autoAlpha: 0.2, x: -16 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        if (taglineRef.current) {
          gsap.fromTo(
            taglineRef.current,
            { autoAlpha: 0, y: 15 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: taglineRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="staircase-progression"
      className="relative w-full bg-[#08070B] text-white"
    >
      {/* ─── Pinned Stage Viewport ─── */}
      <section
        ref={stageRef}
        className="relative w-full h-screen min-h-[700px] flex flex-col justify-between py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
      >
        {/* ─── Ambient Glow ─── */}
        <div 
          className="absolute top-1/4 left-10 w-[750px] h-[750px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto flex-1 flex flex-col justify-between">
          
          {/* ─── Header: Proposition (Figma 1:1 Scale) ─── */}
          <div ref={headerRef} className="max-w-4xl space-y-3.5 sm:space-y-4">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-[1.25] max-w-3xl"
            >
              Our children and young adults are the future of our families, our communities, and our world.
            </h2>

            {/* Dotted Single Divider (Figma 1:1) */}
            <div className="w-full max-w-[620px] pt-1 pb-1">
              <div className="w-full border-t border-dotted border-white/25" />
            </div>

            <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed font-sans max-w-3xl">
              One of the greatest gifts we can give them is the opportunity to understand their value before the world tries to define it for them. When young people recognize that they are valuable, they begin to value themselves. When they value themselves, they are more likely to value others.
            </p>
          </div>

          {/* ─── 5-Step Descending Diagonal Staircase (Scrollytelling Stepping) ─── */}
          <div className="w-full py-6 sm:py-10 my-auto">
            {/* Desktop/Tablet Diagonal Staircase Grid */}
            <div className="hidden md:grid grid-cols-5 gap-6 lg:gap-8 items-start">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepCardRefs.current[idx] = el;
                  }}
                  style={{ marginTop: `${idx * 52}px` }}
                  className="group relative select-text"
                >
                  {/* Step Number */}
                  <span 
                    ref={(el) => {
                      numberRefs.current[idx] = el;
                    }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="block text-xs font-semibold tracking-widest text-[#57534E] transition-colors"
                  >
                    {step.number}
                  </span>

                  {/* Step Title */}
                  <h3
                    ref={(el) => {
                      titleRefs.current[idx] = el;
                    }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="mt-2 text-xl lg:text-2xl font-bold tracking-tight uppercase text-stone-400 transition-colors"
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p 
                    ref={(el) => {
                      descRefs.current[idx] = el;
                    }}
                    className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-500 font-sans transition-colors max-w-[220px]"
                  >
                    {step.desc}
                  </p>

                  {/* Indicator bar that expands as step activates */}
                  <div 
                    ref={(el) => {
                      lineRefs.current[idx] = el;
                    }}
                    className="mt-3.5 h-[2px] rounded-full transition-all duration-300" 
                  />
                </div>
              ))}
            </div>

            {/* Mobile Vertical Cascade */}
            <div className="md:hidden flex flex-col space-y-6">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepCardRefs.current[idx] = el;
                  }}
                  className="pl-4 border-l-2 border-[#F97316]/60 space-y-1.5"
                >
                  <span className="text-xs font-serif font-bold text-[#F97316] tracking-widest">
                    {step.number}
                  </span>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg font-bold text-white uppercase"
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Bottom Center Conclusion Footnote (Figma 1:1) ─── */}
          <div
            ref={taglineRef}
            className="w-full text-center pb-2"
          >
            <span 
              className="text-[#F97316] text-sm sm:text-base font-sans font-medium tracking-wide"
            >
              Strong foundations are built.
            </span>
          </div>

        </div>
      </section>
    </div>
  );
}

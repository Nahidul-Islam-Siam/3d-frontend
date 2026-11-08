import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const leadsModules = [
  {
    id: 'communication',
    title: 'Communication & Active Listening',
    subtitle: 'Speaking candidly without hostility or retreat.',
  },
  {
    id: 'self-worth',
    title: 'Unshakable Self-Worth & Confidence',
    subtitle: "Knowing internal value isn't negotiable.",
  },
  {
    id: 'resilience',
    title: 'Emotional Resilience & Processing',
    subtitle: 'Navigating anger, sorrow, and surprise with poise.',
  },
  {
    id: 'boundaries',
    title: 'Healthy Boundaries & Mutual Consent',
    subtitle: 'Clear physical and emotional relationship standards.',
  },
  {
    id: 'life-skills',
    title: 'Practical Life Skills & Decision Making',
    subtitle: 'Forward-looking decisions with measured foresight.',
  },
];

export default function LeadsPartnershipSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const auraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── Desktop Scrollytelling Pinned Stage (Meet Us Spotlight Mechanics) ───
      mm.add('(min-width: 768px)', () => {
        // Initial resting states
        leadsModules.forEach((_, idx) => {
          const card = cardRefs.current[idx];
          const aura = auraRefs.current[idx];
          const title = titleRefs.current[idx];

          if (card) {
            gsap.set(card, {
              autoAlpha: 0.35,
              x: 20,
              borderColor: '#E5D9C3',
              boxShadow: '0 4px 18px rgba(116, 99, 67, 0.04)',
            });
          }
          if (aura) gsap.set(aura, { autoAlpha: 0, scale: 0.9 });
          if (title) gsap.set(title, { color: '#746343' });
        });

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

        const stepDuration = 0.16;
        const stepGap = 0.03;

        leadsModules.forEach((_, idx) => {
          const startTime = 0.05 + idx * (stepDuration + stepGap);
          const card = cardRefs.current[idx];
          const aura = auraRefs.current[idx];
          const title = titleRefs.current[idx];

          if (!card) return;

          // Spotlight Card in-place (Slide to 0, Glow Aura, Orange Border)
          tl.to(
            card,
            {
              autoAlpha: 1,
              x: 0,
              borderColor: '#F97316',
              boxShadow: '0 12px 35px rgba(249, 115, 22, 0.16)',
              duration: stepDuration,
              ease: 'power2.out',
            },
            startTime
          );

          if (aura) {
            tl.to(
              aura,
              {
                autoAlpha: 0.35,
                scale: 1.1,
                duration: stepDuration,
                ease: 'power1.out',
              },
              startTime
            );
          }

          if (title) {
            tl.to(
              title,
              {
                color: '#F97316',
                duration: stepDuration,
                ease: 'power2.out',
              },
              startTime
            );
          }

          // Settle into rest state when passing to next card
          if (idx < leadsModules.length - 1) {
            const settleTime = startTime + stepDuration + 0.02;
            tl.to(
              card,
              {
                borderColor: '#E5D9C3',
                boxShadow: '0 4px 18px rgba(116, 99, 67, 0.04)',
                duration: 0.08,
                ease: 'power1.inOut',
              },
              settleTime
            );
            if (aura) {
              tl.to(
                aura,
                {
                  autoAlpha: 0.06,
                  scale: 1.0,
                  duration: 0.08,
                },
                settleTime
              );
            }
            if (title) {
              tl.to(
                title,
                {
                  color: '#2C261E',
                  duration: 0.08,
                },
                settleTime
              );
            }
          }
        });
      });

      // ─── Mobile Scrollytelling (Vertical Natural Trigger) ───
      mm.add('(max-width: 767px)', () => {
        cardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { autoAlpha: 0.35, x: 15 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="leads-partnership"
      className="relative w-full bg-[#FAF4E6] text-[#2C261E]"
    >
      {/* ─── Pinned Stage Viewport ─── */}
      <section 
        ref={stageRef}
        className="relative w-full h-screen min-h-[700px] flex items-center justify-center py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
      >
        {/* ─── Ambient Glow ─── */}
        <div 
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ─── Left Column: Partner Narrative (Pinned Anchor) ─── */}
          <div className="lg:col-span-5 space-y-4">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C261E] leading-[1.18] max-w-md"
            >
              Building Stronger Foundations Together.
            </h2>

            <p className="text-[#574D3B] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans max-w-md pt-1">
              Live Achieve Believe proudly partners with Life Skills, Empowerment and Development Services (LEADS) to provide engaging experiences for middle and high school students.
            </p>
          </div>

          {/* ─── Right Column: 5 Uniform Spotlight Cards ─── */}
          <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-3.5">
            {leadsModules.map((module, idx) => (
              <div key={module.id} className="relative">
                {/* Spotlight Aura Layer */}
                <div
                  ref={(el) => {
                    auraRefs.current[idx] = el;
                  }}
                  className="absolute -inset-3 rounded-[28px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                  aria-hidden="true"
                />

                {/* Module Card (Warm White Glass) */}
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="group relative rounded-[20px] p-5 sm:p-5 lg:py-4.5 lg:px-7 bg-white/90 border border-[#E5D9C3] backdrop-blur-sm transition-colors duration-300 shadow-[0_6px_25px_rgba(116,99,67,0.06)] space-y-1 select-text"
                >
                  <h3
                    ref={(el) => {
                      titleRefs.current[idx] = el;
                    }}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg sm:text-xl lg:text-[21px] font-bold tracking-tight transition-colors text-[#2C261E]"
                  >
                    {module.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#746343] font-sans leading-relaxed">
                    {module.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

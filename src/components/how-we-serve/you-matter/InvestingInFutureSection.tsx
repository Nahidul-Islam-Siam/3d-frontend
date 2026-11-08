import { useRef, useEffect } from 'react';
import { Wrench, Award, Users, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: 'tools',
    title: 'TOOLS',
    icon: Wrench,
    desc: 'Practical emotional frameworks, de-escalation habits, stress regulation, and clear self-advocacy strategies that work in real classrooms and living rooms.',
  },
  {
    id: 'confidence',
    title: 'CONFIDENCE',
    icon: Award,
    desc: 'Grounded self-worth immune to external peer pressure, predatory trends, or social media validation metrics. Quiet conviction rooted within.',
  },
  {
    id: 'relationships',
    title: 'RELATIONSHIPS',
    icon: Users,
    desc: 'Healthy boundaries, mutual respect, empathetic active listening, and restorative communication skills to build healthy lifelong bonds.',
  },
  {
    id: 'support',
    title: 'SUPPORT',
    icon: HeartHandshake,
    desc: 'A continuous village of mentors, community allies, and trusted adults who never turn away, even when mistakes happen or paths wobble.',
  },
];

export default function InvestingInFutureSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const auraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const taglineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── Desktop Scrollytelling Pinned Stage (Meet Us Spotlight Mechanics) ───
      mm.add('(min-width: 768px)', () => {
        // Initial resting states
        pillars.forEach((_, idx) => {
          const card = cardRefs.current[idx];
          const aura = auraRefs.current[idx];
          const icon = iconRefs.current[idx];
          const title = titleRefs.current[idx];

          if (card) {
            gsap.set(card, {
              autoAlpha: 0.35,
              y: 24,
              borderColor: '#E5D9C3',
              boxShadow: '0 6px 20px rgba(116, 99, 67, 0.04)',
              transformPerspective: 1000,
            });
          }
          if (aura) gsap.set(aura, { autoAlpha: 0, scale: 0.9 });
          if (icon) gsap.set(icon, { scale: 0.9, opacity: 0.6 });
          if (title) gsap.set(title, { color: '#746343' });
        });

        if (taglineRef.current) {
          gsap.set(taglineRef.current, { autoAlpha: 0, y: 18 });
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

        const stepDuration = 0.18;
        const stepGap = 0.04;

        pillars.forEach((_, idx) => {
          const startTime = 0.05 + idx * (stepDuration + stepGap);
          const card = cardRefs.current[idx];
          const aura = auraRefs.current[idx];
          const icon = iconRefs.current[idx];
          const title = titleRefs.current[idx];

          if (!card) return;

          // Spotlight Card in-place (Zoom, Glow Aura, Orange Border)
          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              borderColor: '#F97316',
              boxShadow: '0 18px 45px rgba(249, 115, 22, 0.18)',
              duration: stepDuration,
              ease: 'power2.out',
            },
            startTime
          );

          if (aura) {
            tl.to(
              aura,
              {
                autoAlpha: 0.45,
                scale: 1.15,
                duration: stepDuration,
                ease: 'power1.out',
              },
              startTime
            );
          }

          if (icon) {
            tl.to(
              icon,
              {
                scale: 1.1,
                opacity: 1,
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
                color: '#F97316',
                duration: stepDuration,
                ease: 'power2.out',
              },
              startTime
            );
          }

          // Settle into rest state when passing to next card
          if (idx < pillars.length - 1) {
            const settleTime = startTime + stepDuration + 0.02;
            tl.to(
              card,
              {
                borderColor: '#E5D9C3',
                boxShadow: '0 6px 20px rgba(116, 99, 67, 0.06)',
                duration: 0.08,
                ease: 'power1.inOut',
              },
              settleTime
            );
            if (aura) {
              tl.to(
                aura,
                {
                  autoAlpha: 0.08,
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

        // Conclusion: all 4 pillars settle & tagline reveals
        if (taglineRef.current) {
          tl.to(
            taglineRef.current,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.12,
              ease: 'power2.out',
            },
            0.90
          );
        }
      });

      // ─── Mobile Scrollytelling (Vertical Trigger) ───
      mm.add('(max-width: 767px)', () => {
        cardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { autoAlpha: 0.35, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
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
      id="investing-in-future"
      className="relative w-full bg-[#FAF4E6] text-[#2C261E]"
    >
      {/* ─── Pinned Stage Viewport ─── */}
      <section 
        ref={stageRef}
        className="relative w-full h-screen min-h-[720px] flex flex-col justify-between py-12 sm:py-16 lg:py-20 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
      >
        {/* ─── Ambient Glow ─── */}
        <div 
          className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1720px] mx-auto flex-1 flex flex-col justify-between space-y-8 sm:space-y-10">
          
          {/* ─── Header: 2 Balanced Columns (Figma 1:1) ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-3.5">
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C261E] leading-tight"
              >
                Investing in the Future
              </h2>

              {/* Dotted Single Divider (Figma 1:1) */}
              <div className="w-full max-w-[480px] pt-1 pb-1">
                <div className="w-full border-t border-dotted border-[#D4C3A3]" />
              </div>

              <p className="text-[#574D3B] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans max-w-xl">
                At Live Achieve Believe, we believe investing in the mental and emotional well-being of young people is one of the greatest investments we can make.
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end pt-2">
              <p className="text-[#746343] text-xs sm:text-sm leading-relaxed font-sans max-w-sm">
                Life is full of highs and lows. Challenges come to everyone. The question is not whether life will be difficult.
              </p>
            </div>

          </div>

          {/* ─── 4 Pillar Cards (Pinned Scrollytelling Spotlight) ─── */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-start gap-5 sm:gap-6 lg:gap-8 my-auto w-full">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isStaggered = idx % 2 === 1;

              return (
                <div
                  key={pillar.id}
                  className={`relative ${isStaggered ? 'lg:mt-16' : 'lg:mt-0'}`}
                >
                  {/* Spotlight Radial Aura Layer */}
                  <div
                    ref={(el) => {
                      auraRefs.current[idx] = el;
                    }}
                    className="absolute -inset-4 rounded-[32px] pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, transparent 70%)',
                      filter: 'blur(30px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Card Container (Figma 336px x 272px with Warm White Glass) */}
                  <div
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="group relative w-full sm:w-[336px] h-auto sm:h-[272px] p-6 rounded-[24px] border border-[#E5D9C3] bg-white/90 backdrop-blur-sm transition-colors duration-300 flex flex-col justify-center items-start gap-4 select-text shadow-[0_8px_30px_rgba(116,99,67,0.06)]"
                  >
                    {/* Bare Orange Icon */}
                    <div
                      ref={(el) => {
                        iconRefs.current[idx] = el;
                      }}
                    >
                      <Icon className="w-7 h-7 text-[#F97316] stroke-[1.6]" />
                    </div>

                    {/* Pillar Title */}
                    <h3
                      ref={(el) => {
                        titleRefs.current[idx] = el;
                      }}
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-xl sm:text-2xl font-bold tracking-tight uppercase leading-none text-[#2C261E]"
                    >
                      {pillar.title}
                    </h3>

                    {/* Pillar Description */}
                    <p className="text-[#574D3B] text-xs sm:text-[13px] leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Footer Statement (Figma 1:1) ─── */}
          <div
            ref={taglineRef}
            className="text-center pb-2"
          >
            <p 
              className="text-[#F97316] text-xs sm:text-sm lg:text-base font-sans font-medium tracking-wide"
            >
              We want to help them build those tools before life asks them to use them.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

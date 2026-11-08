import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const choices = [
  {
    step: '01',
    action: 'CHOOSE',
    meaning: 'AWARENESS OF AGENCY',
  },
  {
    step: '02',
    action: 'RESPOND',
    meaning: 'CONSTRUCTIVE REACTION',
  },
  {
    step: '03',
    action: 'GROW',
    meaning: 'ROOTED RESILIENCE',
  },
  {
    step: '04',
    action: 'MOVE FORWARD',
    meaning: 'PURPOSEFUL STEPS',
  },
];

export default function ChoicesFutureSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const act1Ref = useRef<HTMLDivElement | null>(null);
  const act2Ref = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const auraRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const act1 = act1Ref.current;
    const act2 = act2Ref.current;
    if (!container || !stage || !act1 || !act2) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ─── Desktop Scrollytelling Pinned Stage (Meet Us Style In-Place Transition) ───
      mm.add('(min-width: 768px)', () => {
        // Initial resting states
        gsap.set(act1, { autoAlpha: 1, y: 0, scale: 1, pointerEvents: 'auto' });
        gsap.set(act2, { autoAlpha: 0, y: 35, scale: 0.94, pointerEvents: 'none' });

        choices.forEach((_, idx) => {
          const card = cardRefs.current[idx];
          const aura = auraRefs.current[idx];
          if (card) {
            gsap.set(card, {
              autoAlpha: 0.35,
              y: 20,
              borderColor: 'rgba(255, 255, 255, 0.05)',
            });
          }
          if (aura) gsap.set(aura, { autoAlpha: 0, scale: 0.9 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: stage,
            start: 'top top',
            end: '+=3000',
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ─── PHASE 1: Spotlight 4 Decision Cards (0.05 -> 0.42) ───
        const stepDuration = 0.08;
        const stepGap = 0.02;

        choices.forEach((_, idx) => {
          const startTime = 0.06 + idx * (stepDuration + stepGap);
          const card = cardRefs.current[idx];
          const aura = auraRefs.current[idx];

          if (!card) return;

          tl.to(
            card,
            {
              autoAlpha: 1,
              y: 0,
              borderColor: '#F97316',
              boxShadow: '0 16px 45px rgba(249, 115, 22, 0.22)',
              duration: stepDuration,
              ease: 'power2.out',
            },
            startTime
          );

          if (aura) {
            tl.to(
              aura,
              {
                autoAlpha: 0.4,
                scale: 1.15,
                duration: stepDuration,
                ease: 'power1.out',
              },
              startTime
            );
          }

          // Settle slightly when moving to next card
          if (idx < choices.length - 1) {
            const settleTime = startTime + stepDuration + 0.01;
            tl.to(
              card,
              {
                borderColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                duration: 0.04,
              },
              settleTime
            );
            if (aura) {
              tl.to(
                aura,
                {
                  autoAlpha: 0.08,
                  scale: 1.0,
                  duration: 0.04,
                },
                settleTime
              );
            }
          }
        });

        // Reading hold for all 4 choices
        tl.to({}, { duration: 0.06 });

        // ─── PHASE 2: Act 1 Dissolves Upward (0.46 -> 0.56) ───
        tl.to(
          act1,
          {
            autoAlpha: 0,
            y: -40,
            scale: 0.95,
            duration: 0.10,
            ease: 'power2.inOut',
          },
          0.46
        );
        tl.set(act1, { pointerEvents: 'none' }, 0.56);

        // ─── PHASE 3: Act 2 Climax "YOU MATTER." Enters In-Place (0.56 -> 0.76) ───
        tl.set(act2, { pointerEvents: 'auto' }, 0.56);
        tl.to(
          act2,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.14,
            ease: 'power2.out',
          },
          0.56
        );

        // Reading hold for the emotional Climax (0.76 -> 1.00)
        tl.to({}, { duration: 0.24 });
      });

      // ─── Mobile Scrollytelling ───
      mm.add('(max-width: 767px)', () => {
        gsap.set(act1, { autoAlpha: 1, y: 0 });
        gsap.set(act2, { autoAlpha: 1, y: 0 });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="choices-cosmic-stage"
      className="relative w-full bg-[#050407] text-white"
    >
      {/* ─── Pinned 100vh Cosmic Stage (Seamless Starfield, Zero Seams) ─── */}
      <section 
        ref={stageRef}
        className="relative w-full h-screen min-h-[720px] flex items-center justify-center select-none overflow-hidden"
      >
        {/* Starfield Backdrop (Continuous & Stable) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div 
            className="w-full h-full opacity-80"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 120px 75px, #ffd8a8, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 210px 160px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 340px 220px, #ffb366, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 430px 110px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(2px 2px at 560px 290px, #ffd8a8, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 690px 140px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 820px 250px, #ffffff, rgba(0,0,0,0))`,
              backgroundSize: '700px 400px',
            }}
          />
          <div 
            className="w-full h-full opacity-50"
            style={{
              backgroundImage: `radial-gradient(1px 1px at 70px 120px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 260px 280px, #ffd8a8, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at 480px 40px, #ffffff, rgba(0,0,0,0)),
                                radial-gradient(1.5px 1.5px at 650px 190px, #ffb366, rgba(0,0,0,0))`,
              backgroundSize: '550px 320px',
            }}
          />
          {/* Bottom Horizon Amber Radiance (Permanent & Uncut) */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[450px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(249, 115, 22, 0.35) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 80%)',
            }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            ACT 1: CHOICES SHAPE OUR FUTURE (In-Place Spotlight)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div
          ref={act1Ref}
          className="relative z-10 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 flex flex-col items-center text-center space-y-12 sm:space-y-16"
        >
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Our choices help shape our future.
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans max-w-2xl mx-auto pt-1">
              While none of us can control every circumstance we encounter, we can learn healthy ways to respond, grow, and move forward.
            </p>
          </div>

          {/* 4 Decision Cards */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-5 sm:gap-6 lg:gap-7 w-full max-w-6xl mx-auto pt-2">
            {choices.map((choice, idx) => (
              <div key={choice.step} className="relative">
                {/* Spotlight Aura */}
                <div
                  ref={(el) => {
                    auraRefs.current[idx] = el;
                  }}
                  className="absolute -inset-3 rounded-[28px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%)',
                    filter: 'blur(25px)',
                  }}
                  aria-hidden="true"
                />

                {/* Card Container */}
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="group relative w-full sm:w-[260px] lg:w-[280px] xl:w-[290px] h-[180px] sm:h-[195px] p-6 rounded-[20px] bg-white/[0.025] border border-white/5 backdrop-blur-md transition-colors duration-300 flex flex-col items-center justify-center text-center space-y-3 cursor-default select-text"
                >
                  {/* Step Number Circle Badge */}
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-[#F97316]/30 text-[#F97316] font-serif font-bold text-xs flex items-center justify-center">
                    {choice.step}
                  </div>

                  {/* Action Title */}
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[#F97316] uppercase leading-none"
                  >
                    {choice.action}
                  </h3>

                  {/* Subtitle / Meaning */}
                  <p className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-stone-400 uppercase">
                    {choice.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            ACT 2: CLIMAX REVEAL: "YOU MATTER." (In-Place Masterpiece)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div
          ref={act2Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-20 xl:px-28"
        >
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
            {/* Lead-in Proposition */}
            <div className="space-y-3.5 max-w-xl mx-auto">
              <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans font-normal">
                When young people are equipped with healthy values, supportive relationships, and practical life skills, amazing outcomes become possible
              </p>
              <p className="text-stone-400 text-xs sm:text-sm font-sans font-normal pt-1">
                Every lesson points back to one simple truth:
              </p>
            </div>

            {/* Statement: YOU MATTER. */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight text-[#F97316] uppercase leading-none select-none drop-shadow-[0_12px_45px_rgba(249,115,22,0.55)]"
            >
              YOU MATTER.
            </h2>
          </div>
        </div>

      </section>
    </div>
  );
}

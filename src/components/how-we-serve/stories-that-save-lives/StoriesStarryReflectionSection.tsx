import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StoriesStarryReflectionSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const act1Ref = useRef<HTMLDivElement | null>(null);
  const act2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const act1 = act1Ref.current;
    const act2 = act2Ref.current;
    if (!container || !stage || !act1 || !act2) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Initial setup
        gsap.set(act1, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(act2, { autoAlpha: 0, y: 30, scale: 0.96 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: stage,
            start: 'top top',
            end: '+=2000',
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Hold Act 1
        tl.to(act1, {
          autoAlpha: 1,
          duration: 0.35,
        });

        // Phase 2: Fade Act 1 out
        tl.to(
          act1,
          {
            autoAlpha: 0,
            y: -25,
            scale: 0.98,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          0.35
        );

        // Phase 3: Reveal Act 2 ("The next chapter...")
        tl.to(
          act2,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.65
        );
      });

      // Mobile fallback
      mm.add('(max-width: 767px)', () => {
        gsap.set([act1, act2], { autoAlpha: 1, y: 0, scale: 1 });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAF4E6] text-[#2C261E]">
      <section
        ref={stageRef}
        id="starry-reflection-stage"
        className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden select-none bg-[#FAF4E6]"
      >
        {/* ─── Warm Radiant Reflection Backdrop ─── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Bottom Horizon Amber Radiance */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(249, 115, 22, 0.22) 0%, rgba(254, 107, 53, 0.08) 45%, transparent 80%)',
            }}
          />
          {/* Subtle Horizon Line */}
          <div className="absolute bottom-[2px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
        </div>

        {/* ─── ACT 1: Triad of Power ─── */}
        <div
          ref={act1Ref}
          className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-y-5 px-4"
        >
          <p className="text-[#2C261E] text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed">
            Every story has the power to change another.
          </p>
          <p className="text-[#2C261E] text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed">
            Every conversation has the power to restore hope.
          </p>
          <p className="text-[#2C261E] text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed">
            Every act of kindness has the power to remind someone they matter.
          </p>
        </div>

        {/* ─── ACT 2: Golden Horizon Climax (Figma 1:1) ─── */}
        <div
          ref={act2Ref}
          className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center pointer-events-none"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#2C261E] leading-tight"
            >
              The next chapter of someone else&apos;s story...
            </h3>
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#F97316] italic drop-shadow-[0_4px_25px_rgba(249,115,22,0.3)]"
            >
              may begin with us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


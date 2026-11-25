import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MistyForestCanvas from './MistyForestCanvas';

gsap.registerPlugin(ScrollTrigger);

export interface PeopleBehindMissionSectionProps {
  className?: string;
  onScrollClick?: () => void;
}

export default function PeopleBehindMissionSection({
  className = '',
  onScrollClick: _onScrollClick,
}: PeopleBehindMissionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      },
    });

    // Stage 1 -> Stage 2: Headline floats up and dissolves as camera descends (0% -> 38%)
    tl.to(
      '#mission-headline',
      {
        opacity: 0,
        y: -70,
        ease: 'power2.inOut',
        duration: 0.38,
      },
      0
    );

    tl.to(
      '#mission-subtitle',
      {
        opacity: 0,
        y: -45,
        ease: 'power2.inOut',
        duration: 0.35,
      },
      0.04
    );

    // Bottom-right CTA fades out gently during deep zoom
    tl.to(
      '#mission-scroll-cta',
      {
        opacity: 0,
        y: 20,
        ease: 'power2.inOut',
        duration: 0.28,
      },
      0.72
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Compute combined text opacity (fades as user scrolls down)
  const manualZoomFade = Math.max(0, 1 - scrollProgress * 2.5);

  return (
    <section
      ref={sectionRef}
      id="people-behind-the-mission"
      className={`relative w-full h-screen min-h-[640px] max-h-[960px] bg-[#0c1414] overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Realtime Interactive 3D Real-Life Map Zoom Canvas ─── */}
      <MistyForestCanvas scrollProgress={scrollProgress} />

      {/* ─── Atmospheric Vignette Layer for Text Clarity ─── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Top Spacer for Optical Balance ─── */}
      <div className="w-full h-16 pointer-events-none" aria-hidden="true" />

      {/* ─── Centered Main Headline & Narrative ─── */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: manualZoomFade }}
      >
        {/* Main Heading: THE PEOPLE BEHIND THE MISSION */}
        <div id="mission-headline">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-bold leading-[1.12] tracking-[0.06em] uppercase text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)]"
          >
            THE PEOPLE
            <br />
            BEHIND THE MISSION
          </motion.h2>
        </div>

        {/* Subtitle */}
        <div id="mission-subtitle">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 text-stone-200/95 text-sm sm:text-base lg:text-[17px] font-sans font-normal leading-relaxed text-center max-w-md sm:max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Meet the people who choose to serve, believe in hope, and
            <br className="hidden sm:inline" /> help bring this mission to life.
          </motion.p>
        </div>
      </div>

      {/* Hidden anchor for layout */}
      <div id="mission-scroll-cta" className="hidden" />

      {/* ─── Bottom Smooth Fade to Next Section ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#0c1414]/50 to-[#0c1414] pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

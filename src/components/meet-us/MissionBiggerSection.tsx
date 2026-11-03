import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import handsBg from '@/assets/meet-us/mission-bigger-hands-bg.png';

export interface MissionBiggerSectionProps {
  id?: string;
  className?: string;
  onScrollClick?: () => void;
}

export default function MissionBiggerSection({
  id = 'mission-bigger-than-one',
  className = '',
  onScrollClick,
}: MissionBiggerSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse inertia coordinates for subtle 3D parallax on the hands silhouette
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-1.5%', '1.5%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollDown = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const nextSection = document.getElementById('serve-beside-us') || document.getElementById('next-story-chapter');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[calc(100vh-74px)] min-h-[640px] max-h-[920px] bg-[#121212] overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Interactive Background Artwork (Silhouette Embracing Hands) ─── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-[3%] w-[106%] h-[106%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={handsBg}
          alt="Silhouettes of two hands embracing in solidarity"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* ─── Subtle Warm Amber Bottom-Left Radial Gradient (Matching Figma) ─── */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18)_0%,_rgba(249,115,22,0.04)_35%,_transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Center Radial Soft Vignette for Text Contrast ─── */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Top Spacer for Flex Balance ─── */}
      <div className="w-full h-12 pointer-events-none" aria-hidden="true" />

      {/* ─── Center Core Headline & Narrative ─── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center">
        {/* Main Title: Playfair Display, 3 Clean Lines matching Figma 1:1 */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[66px] font-semibold leading-[1.12] tracking-tight text-center drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
        >
          <span className="block text-white">The Mission Is Bigger</span>
          <span className="block text-white mt-0.5 sm:mt-1">Than Any</span>
          <span className="block text-[#F97316] mt-0.5 sm:mt-1">One Person.</span>
        </motion.h2>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-[#D4D4D8] text-xs sm:text-sm md:text-base font-sans font-normal leading-relaxed text-center max-w-lg sm:max-w-xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]"
        >
          The work of Live Achieve Believe is made possible by hundreds who serve
          without spotlights — mentors, neighborhood bakers, monthly believers, and
          youth alumni.
        </motion.p>
      </div>

      {/* ─── Bottom-Right CTA: SCROLL TO ENTER STORY (Matching Figma 1:1) ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 lg:pb-12 flex justify-end items-end">
        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-center gap-2.5 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full p-1"
        >
          {/* Circular Down Arrow Icon Badge */}
          <span className="w-5 h-5 rounded-full border border-white/60 group-hover:border-white flex items-center justify-center transition-all duration-300">
            <svg
              className="w-2.5 h-2.5 text-white/80 group-hover:text-white transition-transform duration-300 group-hover:translate-y-0.5"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="2" x2="5" y2="8" />
              <polyline points="2.5 5.5 5 8 7.5 5.5" />
            </svg>
          </span>
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.14em]">
            SCROLL TO ENTER STORY
          </span>
        </motion.button>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
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
  const [isHovered, setIsHovered] = useState(false);

  // Scroll parallax progress for deep cinematic layering
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgScrollY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const textScrollY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  // Mouse inertia coordinates for interactive 3D parallax & light tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseScreenX = useMotionValue(50);
  const mouseScreenY = useMotionValue(50);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-3%', '3%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-3%', '3%']);
  const cardRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const cardRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    mouseScreenX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseScreenY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollDown = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const nextSection = document.getElementById('one-movement') || document.getElementById('what-coming-up-next');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.95, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full min-h-screen lg:min-h-[940px] xl:min-h-[1000px] bg-[#0E0E10] overflow-hidden flex flex-col justify-between py-12 sm:py-16 lg:py-20 select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* ─── Interactive Background Artwork (Silhouette Embracing Hands) ─── */}
      <motion.div
        style={{ x: bgX, y: bgY, translateY: bgScrollY }}
        className="absolute -inset-[6%] w-[112%] h-[112%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src={handsBg}
          alt="Silhouettes of two hands embracing in solidarity"
          className="w-full h-full object-cover object-center pointer-events-none filter contrast-[1.08] brightness-[0.96]"
        />
      </motion.div>

      {/* ─── Dynamic Interactive Amber Spotlight Following Mouse ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 0.9 : 0.45,
          background: useTransform(
            [mouseScreenX, mouseScreenY],
            ([x, y]) =>
              `radial-gradient(circle 560px at ${x}% ${y}%, rgba(249,115,22,0.24) 0%, rgba(234,88,12,0.08) 45%, transparent 75%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* ─── Subtle Warm Amber Bottom-Left Radial Gradient (Matching Figma) ─── */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.22)_0%,_rgba(249,115,22,0.05)_40%,_transparent_70%)] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ─── Center Soft Vignette for Text Contrast ─── */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/65 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ─── Top Spacer for Flex Balance ─── */}
      <div className="w-full h-8 sm:h-12 pointer-events-none" aria-hidden="true" />

      {/* ─── Center Core Headline & Narrative (Expansive Width & Height) ─── */}
      <motion.div
        style={{
          rotateX: cardRotateX,
          rotateY: cardRotateY,
          translateY: textScrollY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full max-w-5xl sm:max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center justify-center text-center my-auto py-8 sm:py-12"
      >
        {/* Main Title: Playfair Display, Scaled Up Dimensions */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] font-bold leading-[1.08] tracking-tight text-center drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)] cursor-default group"
        >
          <span className="block text-white transition-transform duration-300 group-hover:scale-[1.01]">
            The Mission Is Bigger
          </span>
          <span className="block text-white mt-1.5 sm:mt-2.5 transition-transform duration-300 group-hover:scale-[1.01]">
            Than Any
          </span>
          <span className="block text-[#F97316] mt-1.5 sm:mt-2.5 transition-all duration-300 drop-shadow-[0_0_35px_rgba(249,115,22,0.5)] group-hover:brightness-110">
            One Person.
          </span>
        </motion.h2>

        {/* Narrative Subtitle: Broader Width & Scaled Typography */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 md:mt-12 text-[#E4E4E7] text-sm sm:text-base md:text-lg lg:text-[20px] font-sans font-normal leading-relaxed text-center max-w-2xl sm:max-w-3xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
        >
          The work of Live Achieve Believe is made possible by hundreds who serve
          without spotlights — mentors, neighborhood bakers, monthly believers, and
          youth alumni.
        </motion.p>
      </motion.div>

      {/* ─── Bottom-Right Interactive CTA: SCROLL TO ENTER STORY ─── */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pb-4 sm:pb-6 flex justify-end items-end">
        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-center gap-2.5 text-white/85 hover:text-white transition-colors duration-300 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full p-1.5"
        >
          <span className="w-5 h-5 rounded-full border border-white/60 group-hover:border-[#F97316] flex items-center justify-center transition-all duration-300 bg-white/5 backdrop-blur-sm group-hover:scale-110">
            <svg
              className="w-2.5 h-2.5 text-white/80 group-hover:text-[#F97316] transition-transform duration-300 group-hover:translate-y-0.5"
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
          <span className="text-[11px] font-sans font-medium uppercase tracking-[0.18em] group-hover:text-white transition-colors">
            SCROLL TO ENTER STORY
          </span>
        </motion.button>
      </div>
    </section>
  );
}

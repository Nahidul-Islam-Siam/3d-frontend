import { motion } from 'framer-motion';
import aerialForestBg from '@/assets/meet-us/misty-forest-bg.png';

export interface PeopleBehindMissionSectionProps {
  className?: string;
  onScrollClick?: () => void;
}

export default function PeopleBehindMissionSection({
  className = '',
  onScrollClick,
}: PeopleBehindMissionSectionProps) {
  const handleScrollDown = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const nextSection = document.getElementById('people-leading-the-way') || document.getElementById('meet-us-team');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="people-behind-the-mission"
      className={`relative w-full h-[calc(100vh-74px)] min-h-[640px] max-h-[920px] bg-[#0e1616] overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Background Dramatic Aerial Forest with Mist/Clouds ─── */}
      <img
        src={aerialForestBg}
        alt="Aerial forest terrain with rolling misty clouds"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* ─── Subtle Vignette / Contrast Layer for Center Text Clarity ─── */}
      <div
        className="absolute inset-0 bg-black/25 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Top Spacer for Flex Balance ─── */}
      <div className="w-full h-12 pointer-events-none" aria-hidden="true" />

      {/* ─── Centered Main Headline & Narrative ─── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center">
        {/* Main Heading: THE PEOPLE BEHIND THE MISSION */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[60px] font-bold leading-[1.14] tracking-[0.06em] uppercase text-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]"
        >
          THE PEOPLE
          <br />
          BEHIND THE MISSION
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-6 text-stone-200/90 text-xs sm:text-sm md:text-base font-sans font-normal leading-relaxed text-center max-w-md sm:max-w-lg drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
        >
          Meet the people who choose, to serve, believe in hope, and
          <br className="hidden sm:inline" /> help bring this mission to life.
        </motion.p>
      </div>

      {/* ─── Bottom-Right CTA: SCROLL TO ENTER STORY ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 lg:pb-12 flex justify-end items-end">
        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-center gap-2.5 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full p-1"
        >
          {/* Circular Down Arrow Icon Badge matching Figma */}
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

          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase text-white/80 group-hover:text-white transition-colors duration-300"
          >
            SCROLL TO ENTER STORY
          </span>
        </motion.button>
      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import EarthGlobe3D from './EarthGlobe3D';
import meetUsFallbackBg from '@/assets/meet-us/hero-orbit-bg.png';

export interface MeetUsBannerProps {
  className?: string;
  onStepInsideClick?: () => void;
}

export default function MeetUsBanner({
  className = '',
  onStepInsideClick,
}: MeetUsBannerProps) {
  const handleStepInside = () => {
    if (onStepInsideClick) {
      onStepInsideClick();
      return;
    }

    const nextSection =
      document.getElementById('atmospheric-descent') ||
      document.getElementById('people-behind-the-mission') ||
      document.getElementById('meet-us-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="meet-us-banner"
      className={`relative w-full min-h-screen lg:h-screen lg:max-h-[960px] bg-black overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Static Fallback Image (Underneath) ─── */}
      <img
        src={meetUsFallbackBg}
        alt="Meet Us Hero — View of Earth from orbit"
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-center pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* ─── Realtime Interactive 3D Earth Globe (Three.js & Shaders) ─── */}
      <EarthGlobe3D autoRotate={true} interactive={true} />

      {/* ─── Mobile & Text Legibility Gradient Overlay ─── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 sm:from-transparent sm:via-transparent sm:to-black/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Main Content Container (Max width 1416px matching Figma 253px margins) ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 h-full flex-1 flex flex-col justify-between pt-28 sm:pt-36 md:pt-44 lg:pt-[220px] xl:pt-[240px] pb-12 sm:pb-14 lg:pb-[91px]">
        {/* Top/Middle Left Narrative Block */}
        <div id="meet-us-hero-text" className="max-w-xl text-left pointer-events-auto">
          {/* Main Heading: MEET US */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold leading-none tracking-tight uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          >
            MEET US
          </motion.h1>

          {/* Subtitle / Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-white/90 text-sm sm:text-base lg:text-[17px] font-sans font-normal leading-[26px] max-w-[420px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            The people behind the mission. Every life touched is carried by hands
            that chose to show up.
          </motion.p>
        </div>

        {/* Center Teaser Prompt (Matching image copy.png & image copy 2.png) */}
        <div
          id="meet-us-teaser"
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 select-none z-20"
        >
          <div className="flex items-center gap-3 text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span className="w-6 h-6 rounded-full border border-white/70 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <line x1="5" y1="2" x2="5" y2="8" strokeLinecap="round" />
                <polyline
                  points="2.5,5.5 5,8 7.5,5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xs sm:text-sm tracking-[0.22em] uppercase font-medium text-white"
            >
              SCROLL TO ENTER STORY
            </span>
          </div>
        </div>

        {/* Bottom Right CTA Action Trigger: STEP INSIDE */}
        <motion.div
          id="meet-us-step-inside"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-start sm:justify-end items-end mt-12 sm:mt-8 pointer-events-auto"
        >
          <button
            type="button"
            onClick={handleStepInside}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="w-[180px] h-[52px] border border-white/70 hover:border-white text-white bg-black/30 hover:bg-white/10 active:bg-white/20 text-[13px] tracking-[0.24em] font-medium uppercase transition-all duration-300 flex items-center justify-center cursor-pointer rounded-none outline-none focus-visible:ring-1 focus-visible:ring-white backdrop-blur-sm"
          >
            STEP INSIDE
          </button>
        </motion.div>
      </div>
    </section>
  );
}

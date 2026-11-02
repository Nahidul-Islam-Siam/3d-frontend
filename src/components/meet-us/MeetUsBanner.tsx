import { motion } from 'framer-motion';
import meetUsBg from '@/assets/Meet Us.png';

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

    const nextSection = document.getElementById('meet-us-content');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="meet-us-banner"
      className={`relative w-full min-h-[calc(100vh-74px)] lg:h-[calc(100vh-74px)] lg:max-h-[920px] bg-black overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Background Cinematic Earth/Space Photo ─── */}
      <img
        src={meetUsBg}
        alt="Meet Us Hero — View of Earth from orbit"
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-center pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* ─── Mobile Legibility Overlay ─── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 sm:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Main Content Container (Max width 1416px matching Figma 253px margins) ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 h-full flex-1 flex flex-col justify-between pt-20 sm:pt-28 md:pt-36 lg:pt-[240px] xl:pt-[260px] pb-12 sm:pb-14 lg:pb-[91px]">
        {/* Top/Middle Left Narrative Block */}
        <div className="max-w-xl text-left">
          {/* Main Heading: MEET US */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold leading-none tracking-tight uppercase"
          >
            MEET US
          </motion.h1>

          {/* Subtitle / Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-white/90 text-sm sm:text-base lg:text-[17px] font-sans font-normal leading-[26px] max-w-[420px]"
          >
            The people behind the mission. Every life touched is carried by hands that chose to show up.
          </motion.p>
        </div>

        {/* Bottom Right CTA Action Trigger: STEP INSIDE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-start sm:justify-end items-end mt-12 sm:mt-8"
        >
          <button
            type="button"
            onClick={handleStepInside}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="w-[180px] h-[52px] border border-white/70 hover:border-white text-white bg-transparent hover:bg-white/10 active:bg-white/20 text-[13px] tracking-[0.24em] font-medium uppercase transition-all duration-300 flex items-center justify-center cursor-pointer rounded-none outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            STEP INSIDE
          </button>
        </motion.div>
      </div>
    </section>
  );
}


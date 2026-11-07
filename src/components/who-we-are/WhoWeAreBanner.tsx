import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

const whoBannerBg = '/who/hero-banner.png';

export interface WhoWeAreBannerProps {
  className?: string;
  onExploreClick?: () => void;
  onGetInvolvedClick?: () => void;
}

export default function WhoWeAreBanner({
  className = '',
  onExploreClick,
  onGetInvolvedClick,
}: WhoWeAreBannerProps) {
  return (
    <section
      id="who-we-are-banner"
      className={`relative w-full min-h-screen flex items-center justify-center bg-[#131211] overflow-hidden select-none ${className}`}
    >
      {/* ─── Background Art Layer (Artwork from /who/hero-banner.png) ─── */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center lg:bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url("${whoBannerBg}")` }}
        aria-hidden="true"
      />

      {/* ─── Subtle Ambient Warmth Glow (Bottom Left) ─── */}
      <div 
        className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#f97316]/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Mobile/Tablet Legibility Gradient Mask ─── */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#131211]/90 via-[#131211]/30 to-transparent lg:hidden pointer-events-none" 
        aria-hidden="true"
      />

      {/* ─── Main Content Container (Centered Headline, Narrative & Stanzas matching Figma) ─── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-16 sm:pb-20 flex flex-col items-center text-center">
        
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[74px] font-normal leading-[1.12] sm:leading-[1.08] tracking-tight max-w-4xl"
        >
          Life Isn&apos;t Always Easy.
        </motion.h1>

        {/* Narrative Description (Stanzas from Figma) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-stone-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl font-normal font-sans space-y-4"
        >
          <p>
            Sometimes we celebrate.<br />
            Sometimes we struggle.<br />
            Sometimes we laugh until we cry.<br />
            Sometimes we cry until someone helps us laugh again.
          </p>
          <p className="pt-1">
            No matter where life finds us, one thing remains true:
          </p>
          <p className="pt-1">
            Every person deserves to be seen.<br />
            Every person deserves to be heard.<br />
            Every person deserves hope.
          </p>
        </motion.div>

        {/* Action Trigger Buttons (Rendered only if explicitly supplied via props) */}
        {(onExploreClick || onGetInvolvedClick) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            {onExploreClick && (
              <FigmaButton
                to="#mission"
                onClick={onExploreClick}
                variant="primary"
                size="lg"
                className="text-[14px] sm:text-[15px] px-6 sm:px-7 py-2.5 shadow-[0_6px_20px_rgba(249,115,22,0.32)]"
              >
                Explore Our Mission
              </FigmaButton>
            )}
            {onGetInvolvedClick && (
              <FigmaButton
                to="/movement"
                onClick={onGetInvolvedClick}
                variant="outline-white"
                size="lg"
                className="text-[14px] sm:text-[15px] px-6 sm:px-7 py-2.5 border-white/70 hover:border-white text-white hover:bg-white/10"
              >
                Get Involved
              </FigmaButton>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}

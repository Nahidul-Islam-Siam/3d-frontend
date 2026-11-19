import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export interface WelcomeHomeFinaleSectionProps {
  id?: string;
  className?: string;
}

export default function WelcomeHomeFinaleSection({
  id = 'welcome-home-finale',
  className = '',
}: WelcomeHomeFinaleSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-8 lg:px-12 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1140px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[28px] sm:rounded-[36px] px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 overflow-hidden"
          style={{ backgroundColor: '#FF7D43' }}
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Top Subtitle */}
            <p 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[#F6F6F6] text-base sm:text-xl lg:text-[24px] font-bold text-center mb-3 sm:mb-4 leading-normal"
            >
              Every veteran deserves a place to begin again
            </p>

            {/* Main Title: Let's Help Welcome The Next Hero Home. */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#F6F6F6] text-center tracking-tight leading-tight mb-8 sm:mb-10 max-w-3xl"
            >
              Let&apos;s Help Welcome The Next<br className="hidden sm:inline" /> Hero Home.
            </h2>

            {/* 3 Outline Capsule Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <FigmaButton
                to="/contact?subject=housing-partner"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Become a Housing Partner
              </FigmaButton>

              <FigmaButton
                to="/donate?category=furnishings"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Support Veteran Housing
              </FigmaButton>

              <FigmaButton
                to="/movement"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Join the Movement
              </FigmaButton>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

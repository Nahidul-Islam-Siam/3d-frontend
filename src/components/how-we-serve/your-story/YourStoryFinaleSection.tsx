import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export interface YourStoryFinaleSectionProps {
  id?: string;
  className?: string;
}

export default function YourStoryFinaleSection({
  id = 'your-story-finale',
  className = '',
}: YourStoryFinaleSectionProps) {
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
          className="relative w-full rounded-[28px] sm:rounded-[36px] px-6 sm:px-12 lg:px-16 py-14 sm:py-18 lg:py-20 overflow-hidden"
          style={{ backgroundColor: '#FF7D43' }}
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Main Headline */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#F6F6F6] text-center tracking-tight leading-tight mb-5 max-w-2xl"
            >
              Your story has the power to change another.
            </h2>

            {/* Sub-label: Explore */}
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xl sm:text-2xl text-[#F6F6F6] text-center font-normal mb-8 sm:mb-10 opacity-95"
            >
              Explore
            </p>

            {/* 5 Outline Capsule Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
              <FigmaButton
                to="/movement?tab=volunteer"
                variant="outline-white"
                size="md"
                showArrow={true}
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none text-xs sm:text-[13px]"
              >
                Volunteer
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=partner"
                variant="outline-white"
                size="md"
                showArrow={true}
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none text-xs sm:text-[13px]"
              >
                Partner
              </FigmaButton>

              <FigmaButton
                to="/suicide-awareness-showdown?tab=sponsor"
                variant="outline-white"
                size="md"
                showArrow={true}
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none text-xs sm:text-[13px]"
              >
                Sponsor
              </FigmaButton>

              <FigmaButton
                to="/donate"
                variant="outline-white"
                size="md"
                showArrow={true}
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none text-xs sm:text-[13px]"
              >
                Donate
              </FigmaButton>

              <FigmaButton
                to="/contact"
                variant="outline-white"
                size="md"
                showArrow={true}
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none text-xs sm:text-[13px]"
              >
                Connect With LAB
              </FigmaButton>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

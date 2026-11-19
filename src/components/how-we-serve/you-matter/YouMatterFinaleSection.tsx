import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export default function YouMatterFinaleSection() {
  return (
    <section 
      id="you-matter-finale"
      className="relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1140px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[28px] sm:rounded-[36px] px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 overflow-hidden"
          style={{ backgroundColor: '#FD7948' }}
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Top Subtitle */}
            <p className="text-white/95 text-xs sm:text-[13.5px] font-sans font-normal mb-2.5 sm:mb-3 tracking-wide">
              Because every young person deserves to know...
            </p>

            {/* Main Title: You Matter. */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-semibold text-white tracking-tight leading-tight mb-8 sm:mb-10"
            >
              You Matter.
            </h2>

            {/* 4 Outline Capsule Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full">
              <FigmaButton
                to="/experience-the-story"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Learn More
              </FigmaButton>

              <FigmaButton
                to="/contact?subject=partner"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Partner With Us
              </FigmaButton>

              <FigmaButton
                to="/movement?tab=volunteer"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Volunteer
              </FigmaButton>

              <FigmaButton
                to="/how-we-serve#hallway-of-possibilities"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
              >
                Return to the Hallway
              </FigmaButton>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

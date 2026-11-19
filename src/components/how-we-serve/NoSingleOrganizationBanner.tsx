import React from 'react';
import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

interface NoSingleOrganizationBannerProps {
  id?: string;
  className?: string;
}

export function NoSingleOrganizationBanner({
  id = 'every-door-opens',
  className = '',
}: NoSingleOrganizationBannerProps) {
  const handleScrollToDoors = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('hallway-of-possibilities');
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -74 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-8 lg:px-12 xl:px-16 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full px-6 sm:px-12 lg:px-16 pt-14 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 lg:pb-24 overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] box-border text-center flex flex-col items-center justify-center"
          style={{
            backgroundColor: '#FD7947',
          }}
        >
          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
            {/* Title */}
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-semibold text-white text-center leading-[1.38] sm:leading-[1.36] lg:leading-[1.38] tracking-tight mb-6 sm:mb-8 max-w-3xl mx-auto"
            >
              Every Door Opens Because
              <br />
              Someone Matters.
            </h3>

            {/* Subtitle with generous line spacing & readable font size */}
            <div
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="text-sm sm:text-base lg:text-[16px] text-white/95 font-normal text-center leading-relaxed max-w-2xl mx-auto space-y-2.5 sm:space-y-3 mb-10 sm:mb-12 lg:mb-14 px-4"
            >
              <p className="tracking-wide">Think Higher. Feel Deeper. Act with Purpose.</p>
              <p className="tracking-wide text-white/90">Live Achieve Believe, Inc. | People Matter. Always.</p>
            </div>

            {/* Action Buttons Row (Reusable FigmaButton) */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 w-full">
              <FigmaButton
                to="/movement"
                variant="outline-white"
                size="md"
              >
                Continue The Journey
              </FigmaButton>

              <FigmaButton
                onClick={handleScrollToDoors}
                variant="outline-white"
                size="md"
              >
                Step Through Another Door
              </FigmaButton>

              <FigmaButton
                to="/movement"
                variant="outline-white"
                size="md"
              >
                Become Part Of The Story
              </FigmaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NoSingleOrganizationBanner;

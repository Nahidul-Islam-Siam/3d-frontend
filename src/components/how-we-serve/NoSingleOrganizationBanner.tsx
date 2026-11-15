import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          className="relative w-full px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 shadow-[0_24px_64px_rgba(249,115,22,0.22)] overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] box-border text-center flex flex-col items-center justify-center"
          style={{
            backgroundColor: '#FE6B35',
          }}
        >
          {/* Diffused radiant white & soft cream glow at bottom matching Figma inspect */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 60% at 50% 90%, rgba(255, 235, 190, 0.45) 0%, rgba(251, 251, 251, 0.25) 35%, rgba(254, 107, 53, 0) 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
            {/* Title */}
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-white text-center leading-[1.2] tracking-tight mb-4 sm:mb-5 max-w-2xl mx-auto"
            >
              Every Door Opens Because
              <br />
              Someone Matters.
            </h3>

            {/* Subtitle */}
            <div
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="text-xs sm:text-[13.5px] lg:text-[14px] text-white/95 font-normal text-center leading-relaxed max-w-xl sm:max-w-2xl mx-auto space-y-1 mb-8 sm:mb-10"
            >
              <p>Think Higher. Feel Deeper. Act with Purpose.</p>
              <p>Live Achieve Believe, Inc. | People Matter. Always.</p>
            </div>

            {/* Action Buttons Row (Figma 1:1) */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
              <Link
                to="/movement"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/75 hover:border-white text-white text-xs sm:text-[13px] font-medium tracking-wide bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Continue The Journey</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>

              <button
                type="button"
                onClick={handleScrollToDoors}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/75 hover:border-white text-white text-xs sm:text-[13px] font-medium tracking-wide bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Step Through Another Door</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              <Link
                to="/movement"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/75 hover:border-white text-white text-xs sm:text-[13px] font-medium tracking-wide bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Become Part Of The Story</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NoSingleOrganizationBanner;

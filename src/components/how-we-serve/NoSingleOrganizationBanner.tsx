import React from 'react';
import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

interface NoSingleOrganizationBannerProps {
  id?: string;
  className?: string;
}

const partnerPills = [
  'Churches',
  'Nonprofits',
  'Local Bakeries & Farms',
  'Community Volunteers',
  'Civic Leaders',
];

export function NoSingleOrganizationBanner({
  id = 'no-single-organization',
  className = '',
}: NoSingleOrganizationBannerProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pb-20 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 shadow-[0_24px_64px_rgba(249,115,22,0.18)] overflow-hidden"
          style={{
            backgroundColor: '#FE6B35',
            borderRadius: '56px',
          }}
        >
          {/* Diffused radiant white & soft cream glow at bottom */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 60% at 50% 90%, rgba(255, 235, 190, 0.5) 0%, rgba(251, 251, 251, 0.3) 35%, rgba(254, 107, 53, 0) 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Title */}
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-white text-center leading-[1.2] tracking-tight mb-4 sm:mb-5 max-w-2xl"
            >
              No Single Organization Heals
              <br />
              A City Alone
            </h3>

            {/* Subtitle */}
            <p
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="text-xs sm:text-[13.5px] lg:text-[14px] text-white/95 font-normal text-center leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10"
            >
              We believe lasting change happens when churches, nonprofits, businesses,
              volunteers, and community partners come together with one shared purpose: loving
              people well.
            </p>

            {/* Partner Pills Row with '+' separators */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto mb-10 sm:mb-12">
              {partnerPills.map((pill, idx) => (
                <React.Fragment key={pill}>
                  <span className="px-3.5 sm:px-4 py-1.5 rounded-full border border-white/60 text-white text-[11.5px] sm:text-[12.5px] font-medium tracking-wide bg-white/10 backdrop-blur-sm shadow-sm select-none hover:bg-white/20 transition-colors">
                    {pill}
                  </span>
                  {idx < partnerPills.length - 1 && (
                    <span className="text-white/70 text-xs sm:text-sm font-light select-none">
                      +
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Navigation Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <FigmaButton
                to="#hallway-of-possibilities"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Return To Hallway Of Hope
              </FigmaButton>

              <FigmaButton
                to="/movement"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Next Door
              </FigmaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NoSingleOrganizationBanner;

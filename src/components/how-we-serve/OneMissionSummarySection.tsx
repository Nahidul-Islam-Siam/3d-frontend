import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';
import summaryImage from '@/assets/how-we-serve/Rectangle 138.png';

interface OneMissionSummarySectionProps {
  id?: string;
  className?: string;
}

export function OneMissionSummarySection({
  id = 'one-mission-summary',
  className = '',
}: OneMissionSummarySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-8 lg:px-12 xl:px-16 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto flex justify-center">
        {/* Card Container with exact Figma border, radius and warm canvas bg */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#FAF4E6] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] border border-[#DFCCA7] shadow-[0_12px_40px_rgba(44,36,29,0.05)] overflow-hidden"
        >
          {/* Top Community Photo - 100% Full Width (Edge-to-edge of card, no padding) */}
          <div className="w-full aspect-[16/7.5] sm:aspect-[16/6.8] lg:aspect-[16/6] overflow-hidden">
            <img
              src={summaryImage}
              alt="Diverse community of volunteers, families, and partners standing shoulder to shoulder"
              className="w-full h-full object-cover object-center block select-none pointer-events-none"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Bottom Content Area */}
          <div className="pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16 px-6 sm:px-10 lg:px-16 xl:px-20 text-left">
            {/* Title */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#121010',
                lineHeight: '1.2',
              }}
              className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight mb-4 sm:mb-5"
            >
              One Mission. Many Expressions.
            </h2>

            {/* Narrative Body */}
            <div className="space-y-3.5 font-sans text-sm sm:text-base text-[#3E342B] leading-relaxed max-w-4xl mb-6 sm:mb-8">
              <p>
                Every door represents a different opportunity. Every opportunity begins with
                compassion. And every act of compassion reminds us why we are here.
              </p>
              <p>
                We may serve in different ways, but our purpose remains the same. To see people. To
                value people. To meet people where they are. And to work together toward a
                community where more people can experience dignity, connection, and hope.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <FigmaButton
                to="/movement"
                variant="primary"
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

export default OneMissionSummarySection;

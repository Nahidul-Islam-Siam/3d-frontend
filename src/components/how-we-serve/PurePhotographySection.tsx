import { useState } from 'react';
import { motion } from 'framer-motion';
import leftLeaf from '@/assets/icons/Group.png';

export interface PurePhotographySectionProps {
  id?: string;
  className?: string;
}

interface PhotoCardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const photoCards: PhotoCardItem[] = [
  {
    id: 'warm-plate',
    title: 'A warm plate.',
    subtitle: 'Because everyone deserves nourishment.',
    image: '/who/photo-warm-plate.png',
    alt: 'Chef pouring warm sauce onto a freshly served plate with care',
  },
  {
    id: 'shared-conversation',
    title: 'A shared conversation',
    subtitle: 'Because sometimes listening is the greatest gift we can offer.',
    image: '/who/photo-shared-conversation.png',
    alt: 'Two women having a heartfelt, attentive conversation in living room',
  },
  {
    id: 'smile-table',
    title: 'A smile across the table.',
    subtitle: 'Because dignity begins when someone feels seen.',
    image: '/who/photo-smile-across-table.png',
    alt: 'Families and neighbors sharing joyful smiles and conversation around a dining table',
  },
];

export default function PurePhotographySection({
  id = 'pure-photography',
  className = '',
}: PurePhotographySectionProps) {
  // Center card expanded by default (matching Figma initial state)
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      {/* ─── Decorative Leaf Flourish - Top Left (Group.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute -top-6 -left-6 w-32 sm:w-44 lg:w-56 opacity-85 pointer-events-none select-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* ─── Section Headline (Exact Figma Specs: 48px, font-weight 600, #272624, line-height normal) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#272624] leading-normal tracking-tight"
          >
            Pure photography, quiet moments, zero staged gloss.
          </h2>
        </motion.div>

        {/* ─── Interactive Expanding Accordion Gallery on Hover ─── */}
        <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-6 items-stretch">
          {photoCards.map((card, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`flex flex-col cursor-pointer transition-[flex] duration-700 ease-out ${
                  isActive ? 'lg:flex-[2.4] flex-1' : 'lg:flex-[1] flex-1'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                {/* Photo Card Container */}
                <div
                  className={`relative w-full h-[320px] sm:h-[380px] lg:h-[460px] rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#ECE0D0] transition-all duration-700 ease-out ${
                    isActive
                      ? 'shadow-[0_20px_50px_rgba(44,36,29,0.16)] ring-1 ring-[#F97316]/30'
                      : 'shadow-[0_10px_28px_rgba(44,36,29,0.06)] opacity-90 hover:opacity-100'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />

                  {/* Subtle Vignette Gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Caption Underneath */}
                <div className="mt-4 sm:mt-5 transition-all duration-500 text-left">
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className={`font-bold tracking-tight transition-colors duration-300 ${
                      isActive
                        ? 'text-lg sm:text-[21px] text-[#0B0B0A]'
                        : 'text-base sm:text-[18px] text-[#2C241D]'
                    }`}
                  >
                    {card.title}
                  </h3>

                  <p
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    className="mt-1.5 text-xs sm:text-[13px] text-[#746343] font-normal leading-relaxed max-w-md"
                  >
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

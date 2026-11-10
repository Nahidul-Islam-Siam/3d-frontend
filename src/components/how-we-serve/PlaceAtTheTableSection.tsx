import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { officialPillars } from '@/data/officialVerbiage';

export interface PlaceAtTheTableSectionProps {
  id?: string;
  className?: string;
}

export default function PlaceAtTheTableSection({
  id = 'place-at-the-table',
  className = '',
}: PlaceAtTheTableSectionProps) {
  const content = officialPillars.placeAtTheTable;

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-14 sm:py-20 lg:py-28 px-4 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* ─── Main Headline: A PLACE AT THE TABLE ─── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-[48px] font-bold text-[#F97316] uppercase tracking-[0.02em] leading-tight"
        >
          {content.title.toUpperCase()}
        </motion.h2>

        {/* ─── Sub-headline / Quote ─── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-[#746343] font-normal leading-normal"
        >
          {content.lead}
        </motion.p>

        {/* ─── Centered Subtle Double Dotted Divider Lines (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[540px] sm:max-w-[620px] flex flex-col gap-1.5 my-6 sm:my-8"
        >
          <div className="w-full border-t border-dotted border-[#D4C3A3]" />
          <div className="w-full border-t border-dotted border-[#D4C3A3]" />
        </motion.div>

        {/* ─── Official Mission Narrative Paragraphs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          className="text-[14.5px] sm:text-[15.5px] lg:text-[16px] text-[#746343] font-normal leading-[26px] max-w-2xl mx-auto space-y-4"
        >
          <p className="font-medium text-[#2C261E]">{content.intro}</p>
          <p>{content.whatWeDo}</p>
          <p>{content.howYouCanHelp}</p>
          <p className="text-xs sm:text-sm font-serif italic text-[#EA580C] pt-1">
            {content.tagline}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-7">
          {content.ctas.map((cta) => (
            <Link
              key={cta.label}
              to={cta.href}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                cta.primary
                  ? 'bg-[#F97316] hover:bg-[#ea580c] text-white shadow-md'
                  : 'border border-[#D4C3A3] text-[#2C261E] hover:bg-[#EFE2C8]'
              }`}
            >
              {cta.label}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import aheadImg from '@/assets/how-we-serve/a-new-begining/Rectangle 138.png';

export interface EverythingAheadSectionProps {
  id?: string;
  className?: string;
}

export default function EverythingAheadSection({
  id = 'everything-ahead',
  className = '',
}: EverythingAheadSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[24px] sm:rounded-[32px] bg-[#FFF3D9] border border-[#F97316]/40 overflow-hidden shadow-[0_8px_30px_rgba(249,115,22,0.06)] group"
        >
          {/* Top Banner Photo */}
          <div className="w-full aspect-[1455/750] overflow-hidden bg-black/5 relative">
            <img
              src={aheadImg}
              alt="Community group joining hands together in celebration of solidarity and hope"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.015]"
            />
          </div>

          {/* Bottom Narrative Card Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#1C140D] mb-4"
            >
              Here&apos;s To Everything That&apos;s Ahead.
            </h2>

            <div className="space-y-2.5 text-[#746343] font-sans font-light text-xs sm:text-[13.5px] leading-relaxed max-w-2xl mb-5">
              <p>To the familiar comforts that make a place feel like home.</p>
              <p>To the connections that turn neighbors into friends.</p>
              <p>To the resources that find new purpose.</p>
              <p>To the wonderful things that happen when people bring their ideas, talents, and generosity together.</p>
              <p>A New Beginning is a celebration of all of it.</p>
              <p>
                Not because any one person has all the answers, but because life works beautifully when we recognize how much we have to offer one another.
              </p>
            </div>

            <p className="text-[#F97316] font-sans text-xs sm:text-[13.5px] font-medium tracking-wide">
              Good things grow when we grow together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

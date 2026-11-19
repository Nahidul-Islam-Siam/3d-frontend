import { motion } from 'framer-motion';

const fourPills = [
  { label: 'Show up.', id: 'show-up' },
  { label: 'Serve.', id: 'serve' },
  { label: 'Listen.', id: 'listen' },
  { label: 'Care.', id: 'care' },
];

export interface ServeBesideUsIntroSectionProps {
  id?: string;
  className?: string;
}

export default function ServeBesideUsIntroSection({
  id = 'serve-beside-us-intro',
  className = '',
}: ServeBesideUsIntroSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Title & Manifesto Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center max-w-2xl"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#2C261E] mb-3 leading-tight"
          >
            Serve Beside Us
          </h2>

          <p className="text-[#8F6629] font-sans text-xs sm:text-[13.5px] italic mb-5">
            Sometimes purpose begins with saying yes.
          </p>

          <div className="space-y-3.5 text-[#746343] text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans font-light">
            <p>
              You don&apos;t have to be extraordinary to make an extraordinary difference.<br className="hidden sm:inline" />
              You simply have to be willing.
            </p>
            <p>
              Our volunteers come from every walk of life. Students, parents, veterans, teachers, business owners, retirees, artists, churches, and neighbors serve together with one shared purpose: helping people experience dignity, compassion, and hope.
            </p>
          </div>
        </motion.div>

        {/* Right Column: 4 Pill Badges (2x2 Grid) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex items-center justify-start lg:justify-end"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs">
            {fourPills.map((pill, i) => (
              <motion.div
                key={pill.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FFF3D9] border border-[#F97316]/30 shadow-[0_4px_16px_rgba(249,115,22,0.06)] hover:border-[#F97316] hover:shadow-[0_8px_24px_rgba(249,115,22,0.12)] transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                <span className="text-[#E06D1A] font-sans font-semibold text-xs sm:text-[13px] tracking-wide">
                  {pill.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

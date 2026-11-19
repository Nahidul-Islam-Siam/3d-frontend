import { motion } from 'framer-motion';

const choices = [
  {
    step: '01',
    action: 'CHOOSE',
    meaning: 'AWARENESS OF AGENCY',
  },
  {
    step: '02',
    action: 'RESPOND',
    meaning: 'CONSTRUCTIVE REACTION',
  },
  {
    step: '03',
    action: 'GROW',
    meaning: 'ROOTED RESILIENCE',
  },
  {
    step: '04',
    action: 'MOVE FORWARD',
    meaning: 'PURPOSEFUL STEPS',
  },
];

export default function ChoicesFutureSection() {
  return (
    <section 
      id="choices-future"
      className="relative w-full bg-[#FAF4E6] text-[#2C261E] py-20 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-center text-center">
        
        {/* ─── Part 1: Headline & Subtitle ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16 lg:mb-20"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#121010] leading-tight"
          >
            Our choices help shape
            <br className="hidden sm:inline" /> our future.
          </h2>
          <p className="text-[#574D3B] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans max-w-2xl mx-auto pt-1">
            While none of us can control every circumstance we encounter, we can learn healthy ways to respond, grow, and move forward.
          </p>
        </motion.div>

        {/* ─── Part 2: 4 Decision Step Columns (Figma 1:1) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mx-auto mb-20 sm:mb-24 lg:mb-28">
          {choices.map((choice, idx) => (
            <motion.div
              key={choice.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-[22px] transition-all duration-300 ${
                idx === 3
                  ? 'bg-white/80 border border-[#E5D9C3] shadow-[0_8px_30px_rgba(116,99,67,0.06)]'
                  : 'bg-transparent border-t sm:border-t-0 sm:border-l first:border-0 border-[#D4C3A3]/60'
              }`}
            >
              {/* Step Number */}
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#F97316] font-sans mb-3 block">
                {choice.step}
              </span>

              {/* Action Title */}
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-xl sm:text-2xl font-bold tracking-tight text-[#F97316] uppercase leading-none mb-3"
              >
                {choice.action}
              </h3>

              {/* Meaning / Agency */}
              <p className="text-[11px] sm:text-xs font-sans font-semibold tracking-widest text-[#574D3B] uppercase">
                {choice.meaning}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── Part 3: Climax Reveal ("YOU MATTER.") ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
        >
          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-[#574D3B] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans">
              When young people are equipped with healthy values, supportive relationships, and practical life skills, amazing outcomes become possible.
            </p>
            <p className="text-[#8F6629] text-xs sm:text-sm font-sans font-medium pt-1">
              Every lesson points back to one simple truth:
            </p>
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-[#F97316] uppercase leading-none select-none drop-shadow-[0_4px_24px_rgba(249,115,22,0.25)]"
          >
            YOU MATTER.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}

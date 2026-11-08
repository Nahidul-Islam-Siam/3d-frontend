import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'VALUE',
    desc: 'When young people recognize that they are valuable...',
  },
  {
    number: '02',
    title: 'SELF-WORTH',
    desc: 'They begin to value themselves.',
  },
  {
    number: '03',
    title: 'RELATIONSHIPS',
    desc: 'They become more able to value others.',
  },
  {
    number: '04',
    title: 'CONFIDENCE',
    desc: 'Confidence begins to grow.',
  },
  {
    number: '05',
    title: 'PURPOSE',
    desc: 'Purpose begins to grow.',
  },
];

export default function StaircaseProgressionSection() {
  return (
    <section 
      id="staircase-progression"
      className="relative w-full min-h-screen bg-[#08070B] text-white flex flex-col justify-between py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Ambient Glow ─── */}
      <div 
        className="absolute top-1/3 left-10 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex-1 flex flex-col justify-between">
        
        {/* ─── Header: Proposition (Figma 1:1 Scale) ─── */}
        <div className="max-w-4xl space-y-4 sm:space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-[1.25] max-w-3xl"
          >
            Our children and young adults are the future of our families, our communities, and our world.
          </motion.h2>

          {/* Dotted Single Divider (Figma 1:1) */}
          <div className="w-full max-w-[620px] pt-1 pb-1">
            <div className="w-full border-t border-dotted border-white/25" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans max-w-3xl"
          >
            One of the greatest gifts we can give them is the opportunity to understand their value before the world tries to define it for them. When young people recognize that they are valuable, they begin to value themselves. When they value themselves, they are more likely to value others.
          </motion.p>
        </div>

        {/* ─── 5-Step Descending Diagonal Staircase (Clean Typography, No Boxes) ─── */}
        <div className="w-full py-10 sm:py-14 my-auto">
          {/* Desktop/Tablet Diagonal Staircase Grid */}
          <div className="hidden md:grid grid-cols-5 gap-6 lg:gap-8 items-start">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: idx * 0.1 }}
                style={{ marginTop: `${idx * 55}px` }}
                className="group relative select-text"
              >
                {/* Step Number */}
                <span 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="block text-xs font-semibold tracking-widest text-stone-500 transition-colors group-hover:text-[#F97316]"
                >
                  {step.number}
                </span>

                {/* Step Title */}
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="mt-2 text-xl lg:text-2xl font-bold tracking-tight uppercase text-white transition-colors group-hover:text-amber-200"
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-stone-400 group-hover:text-stone-300 font-sans transition-colors max-w-[220px]">
                  {step.desc}
                </p>

                {/* Subtle indicator bar */}
                <div className="mt-4 w-6 h-[2px] bg-white/20 transition-all duration-300 group-hover:w-10 group-hover:bg-[#F97316]" />
              </motion.div>
            ))}
          </div>

          {/* Mobile Vertical Cascade */}
          <div className="md:hidden flex flex-col space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="pl-4 border-l-2 border-white/15 space-y-1.5"
              >
                <span className="text-xs font-serif font-bold text-[#F97316] tracking-widest">
                  {step.number}
                </span>
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-lg font-bold text-white uppercase"
                >
                  {step.title}
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom Center Conclusion Footnote (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full text-center pb-2"
        >
          <span 
            className="text-[#F97316] text-sm sm:text-base font-sans font-medium tracking-wide"
          >
            Strong foundations are built.
          </span>
        </motion.div>

      </div>
    </section>
  );
}

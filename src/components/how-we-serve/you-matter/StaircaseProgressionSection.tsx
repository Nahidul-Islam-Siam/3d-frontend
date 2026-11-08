import { useState } from 'react';
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
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section 
      id="staircase-progression"
      className="relative w-full min-h-screen bg-[#08070B] text-white flex flex-col justify-center py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Ambient Glow ─── */}
      <div 
        className="absolute bottom-10 right-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.14) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto space-y-14 sm:space-y-16">
        
        {/* ─── Header: Main Proposition ─── */}
        <div className="max-w-5xl space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight text-white leading-[1.08]"
          >
            Our children and young adults are the future of our families, our communities, and our world.
          </motion.h2>

          {/* Dotted Double Divider */}
          <div className="w-full max-w-[720px] flex flex-col gap-1.5 pt-2">
            <div className="w-full border-t border-dotted border-white/20" />
            <div className="w-full border-t border-dotted border-white/20" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed font-sans max-w-4xl"
          >
            One of the greatest gifts we can give them is the opportunity to understand their value before the world tries to define it for them. When young people recognize that they are valuable, they begin to value themselves. When they value themselves, they are more likely to value others.
          </motion.p>
        </div>

        {/* ─── Interactive 5-Step Descending Staircase (Full Width Spread) ─── */}
        <div className="w-full pt-8 sm:pt-14">
          {/* Desktop/Tablet Diagonal Staircase Grid */}
          <div className="hidden md:grid grid-cols-5 gap-6 lg:gap-8 items-start relative">
            
            {/* Subtle Connecting Guideline */}
            <div className="absolute top-[36px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-orange-500/10 via-orange-500/40 to-orange-500/10 pointer-events-none" />

            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const topOffsetClass = idx === 0 ? 'mt-0' : idx === 1 ? 'mt-14' : idx === 2 ? 'mt-28' : idx === 3 ? 'mt-42' : 'mt-56';

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative ${topOffsetClass} cursor-pointer p-6 rounded-3xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/[0.05] border border-[#F97316]/50 shadow-[0_12px_45px_rgba(249,115,22,0.2)]' 
                      : 'border border-transparent hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  <span 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className={`block text-sm font-semibold tracking-widest transition-colors ${
                      isActive ? 'text-[#F97316]' : 'text-stone-500 group-hover:text-stone-300'
                    }`}
                  >
                    {step.number}
                  </span>

                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className={`mt-3 text-2xl lg:text-3xl font-bold tracking-tight uppercase transition-colors ${
                      isActive ? 'text-white' : 'text-stone-300 group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-stone-400 group-hover:text-stone-200 font-sans transition-colors">
                    {step.desc}
                  </p>

                  <div className={`mt-5 h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-16 bg-[#F97316]' : 'w-6 bg-white/20 group-hover:w-10 group-hover:bg-white/40'
                  }`} />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Vertical Stack */}
          <div className="md:hidden flex flex-col space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif font-bold text-[#F97316] tracking-widest">
                    {step.number}
                  </span>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-xl font-bold text-white uppercase"
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-stone-300 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ─── Staircase Conclusion Footnote ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="w-full text-center pt-20 sm:pt-28"
          >
            <span 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[#F97316] text-lg sm:text-xl lg:text-2xl font-medium tracking-wide uppercase italic"
            >
              Strong foundations are built.
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

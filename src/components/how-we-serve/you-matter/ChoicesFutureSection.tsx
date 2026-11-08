import { motion } from 'framer-motion';

const choices = [
  {
    step: '01',
    action: 'CHOOSE',
    meaning: 'AWARENESS OF AGENCY',
    desc: 'Recognizing that your response is always yours to author, regardless of circumstance.',
  },
  {
    step: '02',
    action: 'RESPOND',
    meaning: 'CONSTRUCTIVE REACTION',
    desc: 'Pausing before impulsivity, evaluating emotional triggers with steady clarity.',
  },
  {
    step: '03',
    action: 'GROW',
    meaning: 'ROOTED RESILIENCE',
    desc: 'Extracting wisdom and strength from adversity rather than carrying its bitterness.',
  },
  {
    step: '04',
    action: 'MOVE FORWARD',
    meaning: 'PURPOSEFUL STEPS',
    desc: 'Walking intentionally into tomorrow with confidence, supportive community, and dignity.',
  },
];

export default function ChoicesFutureSection() {
  return (
    <section 
      id="choices-future"
      className="relative w-full min-h-screen bg-[#050407] text-white flex flex-col justify-center py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Starfield Cosmic Backdrop Layer ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="w-full h-full opacity-65"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 150px 80px, #ffd599, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 240px 180px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 380px 240px, #ffb066, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 450px 120px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 600px 320px, #ffd7a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 780px 150px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 920px 280px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: '800px 450px',
          }}
        />
        {/* Bottom Horizon Amber Radiance */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(249, 115, 22, 0.25) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-center text-center space-y-16 sm:space-y-20">
        
        {/* ─── Header: Proposition ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-5"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08]"
          >
            Our choices help shape our future.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed font-sans max-w-3xl mx-auto">
            While none of us can control every circumstance we encounter, we can learn healthy ways to respond, grow, and move forward.
          </p>
        </motion.div>

        {/* ─── 4 Decision Cards (Full Width Spread) ─── */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4 text-left">
          {choices.map((choice, idx) => (
            <motion.div
              key={choice.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative p-7 sm:p-8 lg:p-9 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#F97316]/50 shadow-[0_16px_50px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            >
              <div className="space-y-5">
                <div className="w-11 h-11 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] font-serif font-bold text-sm flex items-center justify-center group-hover:bg-[#F97316] group-hover:text-white transition-all">
                  {choice.step}
                </div>

                <div className="space-y-1.5">
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F97316] group-hover:text-white transition-colors uppercase"
                  >
                    {choice.action}
                  </h3>
                  <p className="text-xs font-sans font-semibold tracking-widest text-stone-400 uppercase">
                    {choice.meaning}
                  </p>
                </div>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans pt-1">
                  {choice.desc}
                </p>
              </div>

              <div className="pt-6">
                <div className="w-8 h-0.5 rounded-full bg-white/20 group-hover:w-16 group-hover:bg-[#F97316] transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

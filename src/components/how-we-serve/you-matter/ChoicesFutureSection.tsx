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
      className="relative w-full min-h-screen bg-[#050407] text-white flex flex-col justify-center py-20 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Starfield Cosmic Backdrop Layer (Figma 1:1) ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Star Grid Layer 1 */}
        <div 
          className="w-full h-full opacity-80"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 120px 75px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 210px 160px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 340px 220px, #ffb366, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 430px 110px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 560px 290px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 690px 140px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 820px 250px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: '700px 400px',
          }}
        />
        {/* Star Grid Layer 2 (Offset Depth) */}
        <div 
          className="w-full h-full opacity-50"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 70px 120px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 260px 280px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 480px 40px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 650px 190px, #ffb366, rgba(0,0,0,0))`,
            backgroundSize: '550px 320px',
          }}
        />
        {/* Bottom Horizon Amber Radiance (Figma 1:1) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[380px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(249, 115, 22, 0.32) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-center text-center space-y-12 sm:space-y-16">
        
        {/* ─── Header: Proposition (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-3"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Our choices help shape our future.
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans max-w-2xl mx-auto pt-1">
            While none of us can control every circumstance we encounter, we can learn healthy ways to respond, grow, and move forward.
          </p>
        </motion.div>

        {/* ─── 4 Decision Cards: Compact, Centered (Figma 1:1) ─── */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-5 sm:gap-6 lg:gap-7 w-full max-w-6xl mx-auto pt-2">
          {choices.map((choice, idx) => (
            <motion.div
              key={choice.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative w-full sm:w-[260px] lg:w-[280px] xl:w-[290px] h-[180px] sm:h-[195px] p-6 rounded-[20px] bg-white/[0.025] hover:bg-white/[0.05] backdrop-blur-md border border-white/5 hover:border-[#F97316]/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col items-center justify-center text-center space-y-3 cursor-default select-text"
            >
              {/* Centered Step Number Circle Badge */}
              <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-[#F97316]/30 text-[#F97316] font-serif font-bold text-xs flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#F97316] group-hover:text-white">
                {choice.step}
              </div>

              {/* Action Title */}
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-xl sm:text-2xl font-bold tracking-tight text-[#F97316] group-hover:text-white transition-colors uppercase leading-none"
              >
                {choice.action}
              </h3>

              {/* Subtitle / Meaning */}
              <p className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-widest text-stone-400 group-hover:text-stone-300 uppercase transition-colors">
                {choice.meaning}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

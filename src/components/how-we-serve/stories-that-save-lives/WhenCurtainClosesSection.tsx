import { motion } from 'framer-motion';

const stackCards = [
  {
    role: 'PARENTS',
    action: 'Who sit a little longer at the dinner table',
  },
  {
    role: 'FRIENDS',
    action: 'Who send the text they were hesitating to send',
  },
  {
    role: 'TEACHERS',
    action: 'Who notice the quiet student in the third row',
  },
  {
    role: 'COMMUNITIES',
    action: 'Where vulnerability is greeted with dignity',
  },
];

export default function WhenCurtainClosesSection() {
  return (
    <section 
      id="when-the-curtain-closes"
      className="relative w-full bg-[#FFF3D9] text-[#2C261E] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden border-y border-[rgba(227,182,143,0.35)]"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ─── Left Column: Theatrical Narrative ─── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight text-[#121010] leading-tight"
            >
              When The Curtain Closes.
            </h2>

            <div className="space-y-4 max-w-lg text-[#5A5043] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans font-light">
              <p className="text-[#2C261E] font-medium">
                The experience is only beginning.
              </p>
              <p>
                The purpose was never the stage. The purpose is the kitchen tables, the school hallways, the late-night text messages, and the silent corners where life happens.
              </p>
              <p className="text-[#2C261E] font-medium">
                Ordinary people choose to care more intentionally.
              </p>
            </div>
          </motion.div>

          {/* ─── Right Column: 4 Cards ─── */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 sm:gap-4">
            {stackCards.map((card, idx) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[18px] bg-white/90 backdrop-blur-sm border border-[#EADBBD] p-5 sm:p-6 shadow-[0_4px_16px_rgba(44,38,30,0.04)] hover:border-[#F97316]/50 hover:bg-white transition-all duration-300"
              >
                <div className="flex flex-col gap-1">
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-base sm:text-lg font-bold tracking-wider text-[#121010] group-hover:text-[#F97316] transition-colors uppercase"
                  >
                    {card.role}
                  </h3>
                  <p className="text-[#5A5043] text-xs sm:text-sm font-sans font-light">
                    {card.action}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

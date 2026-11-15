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
      className="relative w-full min-h-screen bg-[#FAF4E6] text-[#2C261E] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* Background Subtle Amber Horizon Glow */}
      <div 
        className="absolute bottom-10 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* ─── Left Column: Theatrical Narrative (Figma 1:1) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C261E] leading-[1.08] mb-8"
            >
              WHEN THE CURTAIN<br />CLOSES.
            </h2>

            <div className="space-y-4 max-w-lg text-[#5A5043] text-sm sm:text-base leading-relaxed font-light">
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

          {/* ─── Right Column: 4 Glass Stack Cards (Figma 1:1) ─── */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
            {stackCards.map((card, idx) => (
              <motion.div
                key={card.role}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-[20px] bg-white/80 backdrop-blur-md border border-[#EADCC5] p-6 sm:p-7 shadow-[0_6px_24px_rgba(44,38,30,0.06)] hover:border-[#F97316]/60 hover:bg-white hover:shadow-[0_12px_36px_rgba(249,115,22,0.12)] transition-all duration-300"
              >
                <div className="flex flex-col gap-1.5">
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg sm:text-xl font-bold tracking-wider text-[#2C261E] group-hover:text-[#F97316] transition-colors uppercase"
                  >
                    {card.role}
                  </h3>
                  <p className="text-[#5A5043] text-sm sm:text-[15px] font-light">
                    {card.action}
                  </p>
                </div>

                {/* Subtle right accent bar on hover */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 w-1.5 h-6 rounded-full bg-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


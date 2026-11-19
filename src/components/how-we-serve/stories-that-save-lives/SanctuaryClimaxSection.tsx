import { motion } from 'framer-motion';

const audienceRow1 = [
  'Students',
  'Parents',
  'Educators',
  'Mental Health Professionals',
  'Veterans',
];

const audienceRow2 = [
  'First Responders',
  'Churches',
  'Businesses',
  'Community Leaders',
];

export default function SanctuaryClimaxSection() {
  return (
    <section 
      id="sanctuary-climax"
      className="relative w-full bg-[#FAF4E6] text-[#2C261E] py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden flex flex-col justify-center"
    >
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#121010] mb-8 sm:mb-10"
        >
          Who Is This Sanctuary
          <br />
          Built For?
        </motion.h2>

        {/* ─── Audience Pills ─── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3 mb-10 sm:mb-12"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {audienceRow1.map((item) => (
              <span
                key={item}
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/80 border border-[#EADBBD] text-[#554637] text-xs sm:text-[13px] font-sans font-medium select-none shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {audienceRow2.map((item) => (
              <span
                key={item}
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/80 border border-[#EADBBD] text-[#554637] text-xs sm:text-[13px] font-sans font-medium select-none shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─── Dotted Line Divider ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl my-3"
        >
          <div className="w-full border-t border-dotted border-[#D4C3A3]" />
        </motion.div>

        {/* ─── Climax: YOU. ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-6 sm:my-8"
        >
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tight text-[#F97316] select-none leading-none drop-shadow-[0_4px_24px_rgba(249,115,22,0.22)]"
          >
            YOU.
          </span>
        </motion.div>

        {/* ─── Subtitle & Credo ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 max-w-xl mx-auto"
        >
          <p className="text-[#5A5043] text-xs sm:text-sm font-sans font-light">
            Before your profession. Before your title. Before how others see you.
          </p>
          <p 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[#3E342B] italic text-sm sm:text-base leading-relaxed"
          >
            &ldquo;You are a person. A person with a story. A person who matters.
            <br />
            A person who deserves hope.&rdquo;
          </p>

          <div className="pt-4 space-y-1 text-[#5A5043] text-xs sm:text-sm font-sans font-light">
            <p>Every story has the power to change another.</p>
            <p>Every conversation has the power to restore hope.</p>
            <p>Every act of kindness has the power to remind someone they matter.</p>
          </div>

          <p className="text-[#F97316] text-xs sm:text-sm font-sans font-medium pt-3">
            The next chapter of someone else&apos;s story...
            <br />
            may begin with us.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

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
      className="relative w-full min-h-screen bg-[#08070B] text-white py-28 sm:py-36 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden flex flex-col justify-center"
    >
      {/* Centered Ambient Amber Horizon Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(217,119,6,0.05) 50%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-10"
        >
          Who Is This Sanctuary Built For?
        </motion.h2>

        {/* ─── Audience Pills (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3.5 mb-12 sm:mb-16"
        >
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {audienceRow1.map((item, i) => (
              <div key={item} className="flex items-center gap-2.5 sm:gap-3">
                <span className="px-4 sm:px-5 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-stone-200 text-xs sm:text-sm font-light hover:border-[#F97316]/60 hover:text-white transition-all">
                  {item}
                </span>
                {i < audienceRow1.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#F97316]/60 hidden sm:inline-block" />
                )}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {audienceRow2.map((item, i) => (
              <div key={item} className="flex items-center gap-2.5 sm:gap-3">
                <span className="px-4 sm:px-5 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-stone-200 text-xs sm:text-sm font-light hover:border-[#F97316]/60 hover:text-white transition-all">
                  {item}
                </span>
                {i < audienceRow2.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#F97316]/60 hidden sm:inline-block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Double Dotted Line Divider (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl my-4 space-y-1.5"
        >
          <div className="w-full border-t border-dashed border-white/20" />
          <div className="w-full border-t border-dashed border-white/20" />
        </motion.div>

        {/* ─── Climax: YOU. (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 mb-8"
        >
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#F97316] drop-shadow-[0_0_45px_rgba(249,115,22,0.45)]"
          >
            YOU.
          </span>
        </motion.div>

        {/* Subtitle / Credo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 max-w-lg"
        >
          <p className="text-stone-300 text-sm sm:text-base font-light">
            Before your profession. Before your title. Before how others see you.
          </p>
          <p 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-stone-400 italic text-sm sm:text-[15px]"
          >
            &ldquo;You are a person. You have a story. You matter.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}


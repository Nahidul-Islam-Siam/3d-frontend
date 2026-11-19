import { motion } from 'framer-motion';

const audiences = [
  'Students',
  'Families',
  'Local Businesses',
  'Churches',
  'Retirees',
  'Community Organizations',
  'Lifelong Friends',
  'Next-door Neighbors',
];

export default function WillingHeartCalloutSection() {
  return (
    <section 
      id="willing-heart"
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] bg-[#FAF4E6] text-[#2C261E] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden flex flex-col justify-center"
    >
      {/* Background Soft Center Horizon Radiance */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 75%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col justify-center">
        {/* ─── Center Stage Typography (Figma 1:1) ─── */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C140D] mb-8"
          >
            Anyone with a willing heart.
          </motion.h2>

          {/* Audience Row with Subtle Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[#554637] text-sm sm:text-base lg:text-[17px] font-normal tracking-wide max-w-3xl mb-12"
          >
            {audiences.map((aud, i) => (
              <span key={aud} className="inline-flex items-center gap-3">
                <span>{aud}</span>
                {i < audiences.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]/80 inline-block" />
                )}
              </span>
            ))}
          </motion.div>

          {/* Climax Callout: Maybe... YOU. (Figma 1:1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#F97316] drop-shadow-[0_4px_20px_rgba(249,115,22,0.25)] mb-4"
            >
              Maybe... YOU.
            </h3>

            <p className="text-[#554637] text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-xl mx-auto">
              Because changing someone&apos;s life doesn&apos;t require having all the answers. It begins by being willing to show up.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

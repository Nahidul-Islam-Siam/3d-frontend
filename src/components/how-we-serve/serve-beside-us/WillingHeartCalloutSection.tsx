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
      className="relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden flex flex-col justify-center"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col justify-center">
        {/* ─── Center Stage Typography (Figma 1:1) ─── */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#1C140D] mb-5"
          >
            Anyone with a willing heart.
          </motion.h2>

          {/* Audience Row with Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[#554637] text-xs sm:text-[13.5px] font-sans font-normal tracking-wide max-w-2xl mb-12 sm:mb-14"
          >
            {audiences.map((aud, i) => (
              <span key={aud} className="inline-flex items-center gap-2.5">
                <span>{aud}</span>
                {i < audiences.length - 1 && (
                  <span className="w-1 h-1 rounded-full bg-[#C7A87A] inline-block" />
                )}
              </span>
            ))}
          </motion.div>

          {/* Climax Callout: Maybe... YOU. (Figma 1:1) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#1C140D] mb-2.5"
            >
              Maybe... YOU.
            </h3>

            <p className="text-[#746343] text-xs sm:text-[13px] font-sans font-light leading-relaxed max-w-md mx-auto">
              Because changing someone&apos;s life doesn&apos;t require having all the answers.<br className="hidden sm:inline" />
              It begins by caring enough to show up.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export default function PlaceForYouSection() {
  return (
    <section 
      id="place-for-you"
      className="relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10 px-2 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          
          {/* ─── Left Column: Headline, Narrative & Figma Actions ─── */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Title */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#0B0B0A] leading-normal"
            >
              There&apos;s a Place for<br />
              You Here.
            </h2>

            {/* Paragraph */}
            <p className="mt-5 sm:mt-6 text-xs sm:text-[14px] lg:text-[14.5px] leading-relaxed text-[#6E6254] font-sans font-normal max-w-xl">
              You don&apos;t have to change the whole world to change someone&apos;s world.
              Whether you volunteer, share your talents, support a program, become a
              sponsor, or join us as a community partner, there is a place for you at LAB.
            </p>

            {/* Figma Action Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <FigmaButton to="/movement" variant="primary" size="md">
                Volunteer
              </FigmaButton>

              <FigmaButton to="/how-we-serve" variant="outline" size="md">
                Support Our Mission
              </FigmaButton>

              <FigmaButton to="/about" variant="outline" size="md">
                Explore Our Programs
              </FigmaButton>
            </div>
          </motion.div>

          {/* ─── Right Column: Photo with Notch Cutout (Subtract copy.png) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px] lg:max-w-[620px]">
              <img
                src="/who/subtract-copy.png"
                alt="Community volunteers sharing fresh food with families"
                className="w-full h-auto object-contain block drop-shadow-[0_12px_32px_rgba(40,30,20,0.06)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';

export default function LookingBeyondSection() {
  return (
    <section 
      id="looking-beyond"
      className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center bg-[#FAF4E6] py-28 sm:py-36 lg:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* ─── Decorative Leaf Flourish - Left (Group.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-28 sm:w-36 lg:w-48 opacity-85 pointer-events-none select-none"
      />

      {/* ─── Decorative Leaf Flourish - Right (Group-2.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: 16 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-32 sm:w-40 lg:w-52 opacity-85 pointer-events-none select-none"
      />

      <div className="w-full max-w-7xl mx-auto relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ─── Left Column: Headline & Mission Principle ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-[#0B0B0A] leading-normal"
            >
              Looking Beyond the<br />
              Surface
            </h2>

            <p 
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="text-[15px] sm:text-[17px] lg:text-[18px] text-[#746343] font-normal leading-[26px] max-w-xl"
            >
              We believe in meeting immediate needs while understanding the
              circumstances beneath them. Lasting change begins when we care about
              not only what someone is facing, but also the person facing it.
            </p>
          </motion.div>

          {/* ─── Right Column: Thoreau Quote ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="text-center max-w-md space-y-2">
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-sm sm:text-base lg:text-[16.5px] font-normal text-[#F97316] leading-relaxed"
              >
                &ldquo;For every thousand hacking at the leaves of evil,<br />
                there is one striking at the root.&rdquo;
              </p>
              <p className="text-xs sm:text-[13px] text-[#7D6F63] font-sans font-normal pt-1">
                &mdash; Henry David Thoreau
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


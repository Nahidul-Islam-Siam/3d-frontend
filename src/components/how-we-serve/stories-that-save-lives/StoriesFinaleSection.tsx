import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export default function StoriesFinaleSection() {
  return (
    <section 
      id="stories-finale"
      className="relative w-full min-h-screen bg-[#2D1B11] text-white flex items-center justify-center py-28 sm:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
    >
      {/* ─── Background Textured Dunes Layer (From /who-we-are: /who/more-than-name-bg.png) ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/more-than-name-bg.png"
          alt=""
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* ─── Headline (Figma 1:1) ─── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6 uppercase"
        >
          LET&apos;S BE THE REASON SOMEONE<br />
          BELIEVES <span className="text-[#F97316]">TOMORROW IS</span><br />
          <span className="text-[#F97316]">WORTH SEEING.</span>
        </motion.h2>

        {/* ─── Subtitle ─── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-stone-200 text-sm sm:text-base leading-relaxed font-light max-w-2xl mb-12"
        >
          Whether you join as an attendee, sponsor a school presentation, or bring this healing theatrical dialogue to your workplace, you are an essential steward of hope.
        </motion.p>

        {/* ─── 3 Capsule CTA Buttons using reusable FigmaButton ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <FigmaButton to="/about" variant="primary" size="lg">
            Experience the Show
          </FigmaButton>

          <FigmaButton to="/contact" variant="outline-white" size="lg">
            Bring It to Your School
          </FigmaButton>

          <FigmaButton to="/movement" variant="outline-white" size="lg">
            Join the Movement
          </FigmaButton>
        </motion.div>

      </div>
    </section>
  );
}


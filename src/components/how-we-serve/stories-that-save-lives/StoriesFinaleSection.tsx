import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export default function StoriesFinaleSection() {
  return (
    <section 
      id="stories-finale"
      className="relative w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] bg-[#432A19] text-white flex items-center justify-center py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden"
    >
      {/* ─── Background Sculpted Paper Dunes (more-than-name-bg.png) ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/more-than-name-bg.png"
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
        {/* Subtle Ambient Radial Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 25%, rgba(249, 115, 22, 0.08) 0%, rgba(20, 10, 5, 0.25) 80%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* ─── Headline (Figma 1:1 Title Case) ─── */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-tight text-white leading-[1.18] mb-6"
        >
          Let&apos;s Be The Reason Someone
          <br />
          Believes{' '}
          <span className="text-[#F97316]">
            Tomorrow Is Worth
            <br />
            Seeing.
          </span>
        </motion.h2>

        {/* ─── Subtitle ─── */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/85 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed font-sans font-light max-w-2xl mb-10 sm:mb-12"
        >
          Whether you join as an attendee, sponsor a school presentation, or bring this healing theatrical dialogue to your workplace, you are an essential steward of hope.
        </motion.p>

        {/* ─── 3 Capsule CTA Buttons ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <FigmaButton to="/experience-the-story" variant="primary" size="md">
            Experience the Show
          </FigmaButton>

          <FigmaButton
            to="/contact?subject=school"
            variant="outline-white"
            size="md"
            className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
          >
            Bring It to Your School
          </FigmaButton>

          <FigmaButton
            to="/movement"
            variant="outline-white"
            size="md"
            className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
          >
            Join the Movement
          </FigmaButton>
        </motion.div>

      </div>
    </section>
  );
}

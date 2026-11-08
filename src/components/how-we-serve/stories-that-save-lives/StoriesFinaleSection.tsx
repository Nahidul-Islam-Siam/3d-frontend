import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

        {/* ─── 3 Capsule CTA Buttons (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* Button 1: Experience the Show */}
          <Link to="/about">
            <button
              type="button"
              className="inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-sans tracking-wide transition-all shadow-[0_4px_25px_rgba(249,115,22,0.4)] hover:scale-105 cursor-pointer"
            >
              <span>Experience the Show &raquo;</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </button>
          </Link>

          {/* Button 2: Bring It to Your School */}
          <Link to="/contact">
            <button
              type="button"
              className="inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/30 hover:border-white text-white text-xs sm:text-sm font-sans tracking-wide transition-all hover:scale-105 cursor-pointer"
            >
              <span>Bring It to Your School</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </Link>

          {/* Button 3: Join the Movement */}
          <Link to="/movement">
            <button
              type="button"
              className="inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/30 hover:border-white text-white text-xs sm:text-sm font-sans tracking-wide transition-all hover:scale-105 cursor-pointer"
            >
              <span>Join the Movement</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}


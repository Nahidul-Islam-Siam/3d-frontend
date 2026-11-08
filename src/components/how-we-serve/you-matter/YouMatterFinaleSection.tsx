import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function YouMatterFinaleSection() {
  const navigate = useNavigate();

  return (
    <section 
      id="you-matter-finale"
      className="relative w-full min-h-screen bg-[#050407] text-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden py-24 sm:py-32"
    >
      {/* ─── Starfield Canvas Background ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="w-full h-full opacity-65"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 40px 60px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 190px 150px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 340px 90px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 520px 240px, #ffb366, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 670px 130px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 840px 310px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: '800px 450px',
          }}
        />
        {/* Bottom Horizon Amber Radiance */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(249, 115, 22, 0.22) 0%, rgba(217, 119, 6, 0.06) 45%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center space-y-12 sm:space-y-16">
        
        <div className="space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-stone-300 text-base sm:text-lg lg:text-xl font-sans font-normal italic"
          >
            Because every young person deserves to know...
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[128px] xl:text-[144px] font-bold tracking-tight text-[#F97316] uppercase drop-shadow-[0_16px_50px_rgba(249,115,22,0.6)] leading-none select-none"
          >
            YOU MATTER.
          </motion.h2>
        </div>

        {/* ─── 4 Interactive Capsule CTA Buttons (Exact Figma Frame 10) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-4"
        >
          {/* Button 1: Partner With Us (Solid Orange Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/contact#partner')}
            className="group inline-flex items-center gap-3.5 pl-7 pr-4 py-3.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_30px_rgba(249,115,22,0.4)] cursor-pointer"
          >
            <span className="font-serif font-bold text-[14px] uppercase tracking-wider text-white leading-none whitespace-nowrap">
              Partner With Us
            </span>
            <span className="w-8 h-5 rounded-full border border-white/40 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>

          {/* Button 2: Learn More (Outline Glass Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/about')}
            className="group inline-flex items-center gap-3.5 pl-7 pr-4 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/20 hover:border-white/50 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span className="font-serif font-bold text-[14px] uppercase tracking-wider text-white leading-none whitespace-nowrap">
              Learn More
            </span>
            <span className="w-8 h-5 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>

          {/* Button 3: Volunteer (Outline Glass Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center gap-3.5 pl-7 pr-4 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/20 hover:border-white/50 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span className="font-serif font-bold text-[14px] uppercase tracking-wider text-white leading-none whitespace-nowrap">
              Volunteer
            </span>
            <span className="w-8 h-5 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>

          {/* Button 4: Return to the Hallway (Outline Glass Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/how-we-serve')}
            className="group inline-flex items-center gap-3.5 pl-7 pr-4 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/20 hover:border-white/50 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <span className="font-serif font-bold text-[14px] uppercase tracking-wider text-white leading-none whitespace-nowrap">
              Return to the Hallway
            </span>
            <span className="w-8 h-5 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}

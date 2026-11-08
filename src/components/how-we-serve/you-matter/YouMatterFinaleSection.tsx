import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function YouMatterFinaleSection() {
  const navigate = useNavigate();

  return (
    <section 
      id="you-matter-finale"
      className="relative w-full min-h-screen bg-[#050407] text-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden py-20 sm:py-28"
    >
      {/* ─── Starfield Canvas Background (Figma 1:1) ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Star Grid Layer 1 */}
        <div 
          className="w-full h-full opacity-80"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 40px 60px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 190px 150px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 340px 90px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 520px 240px, #ffb366, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 670px 130px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 840px 310px, #ffffff, rgba(0,0,0,0))`,
            backgroundSize: '750px 400px',
          }}
        />
        {/* Star Grid Layer 2 */}
        <div 
          className="w-full h-full opacity-50"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 110px 80px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 280px 220px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 470px 60px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 640px 180px, #ffb366, rgba(0,0,0,0))`,
            backgroundSize: '580px 330px',
          }}
        />
        {/* Bottom Horizon Amber Radiance (Figma 1:1) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[380px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(249, 115, 22, 0.35) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10">
        
        {/* Lead-in & Statement */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-stone-300 text-xs sm:text-sm font-sans font-normal"
          >
            Because every young person deserves to know...
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-bold tracking-tight text-[#F97316] uppercase leading-none select-none drop-shadow-[0_8px_30px_rgba(249,115,22,0.45)]"
          >
            YOU MATTER.
          </motion.h2>
        </div>

        {/* ─── 4 Capsule CTA Buttons (Title Case, Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3"
        >
          {/* Button 1: Partner With Us (Solid Orange Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/contact#partner')}
            className="group inline-flex items-center gap-2.5 pl-5 pr-3 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-[0_6px_25px_rgba(249,115,22,0.35)] cursor-pointer"
          >
            <span className="font-sans font-medium text-[13px] sm:text-[14px] text-white leading-none whitespace-nowrap">
              Partner With Us
            </span>
            <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>

          {/* Button 2: Learn More (Outline Glass Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/about')}
            className="group inline-flex items-center gap-2.5 pl-5 pr-3 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/40 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <span className="font-sans font-medium text-[13px] sm:text-[14px] text-white leading-none whitespace-nowrap">
              Learn More
            </span>
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>

          {/* Button 3: Volunteer (Outline Glass Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="group inline-flex items-center gap-2.5 pl-5 pr-3 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/40 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <span className="font-sans font-medium text-[13px] sm:text-[14px] text-white leading-none whitespace-nowrap">
              Volunteer
            </span>
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>

          {/* Button 4: Return to the Hallway (Outline Glass Capsule) */}
          <button
            type="button"
            onClick={() => navigate('/how-we-serve')}
            className="group inline-flex items-center gap-2.5 pl-5 pr-3 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-white/40 text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            <span className="font-sans font-medium text-[13px] sm:text-[14px] text-white leading-none whitespace-nowrap">
              Return to the Hallway
            </span>
            <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}

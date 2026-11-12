import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export default function YouMatterFinaleSection() {

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
        {/* ─── Action Buttons using reusable FigmaButton ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3"
        >
          <FigmaButton to="/contact#partner" variant="primary" size="md">
            Partner With Us
          </FigmaButton>

          <FigmaButton to="/experience-the-story" variant="outline-white" size="md">
            Learn More
          </FigmaButton>

          <FigmaButton to="/contact" variant="outline-white" size="md">
            Volunteer
          </FigmaButton>

          <FigmaButton to="/how-we-serve" variant="outline-white" size="md">
            Return to the Hallway
          </FigmaButton>
        </motion.div>

      </div>
    </section>
  );
}

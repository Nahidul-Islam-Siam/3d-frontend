import { motion } from 'framer-motion';

export default function CosmicClimaxSection() {
  return (
    <section 
      id="cosmic-climax"
      className="relative w-full min-h-screen bg-[#050407] text-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden py-20 sm:py-28"
    >
      {/* ─── Starfield Canvas Background Layer (Figma 1:1) ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Star Grid Layer 1 */}
        <div 
          className="w-full h-full opacity-80"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 35px 45px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 180px 140px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 320px 80px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 460px 210px, #ffb366, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 580px 100px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(2px 2px at 720px 290px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 850px 180px, #ffd599, rgba(0,0,0,0))`,
            backgroundSize: '750px 400px',
          }}
        />
        {/* Star Grid Layer 2 */}
        <div 
          className="w-full h-full opacity-50"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 90px 110px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 270px 240px, #ffd8a8, rgba(0,0,0,0)),
                              radial-gradient(1px 1px at 490px 50px, #ffffff, rgba(0,0,0,0)),
                              radial-gradient(1.5px 1.5px at 660px 170px, #ffb366, rgba(0,0,0,0))`,
            backgroundSize: '580px 330px',
          }}
        />
        {/* Bottom Horizon Amber Radiance (Figma 1:1) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[380px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 90% 55% at 50% 100%, rgba(249, 115, 22, 0.32) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 80%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-8 sm:space-y-10">
        
        {/* ─── Lead-In Proposition (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3.5 max-w-xl mx-auto"
        >
          <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans font-normal">
            When young people are equipped with healthy values, supportive relationships, and practical life skills, amazing outcomes become possible
          </p>
          <p className="text-stone-400 text-xs sm:text-sm font-sans font-normal pt-1">
            Every lesson points back to one simple truth:
          </p>
        </motion.div>

        {/* ─── Balanced Statement: YOU MATTER. (Figma 1:1) ─── */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] font-bold tracking-tight text-[#F97316] uppercase leading-none select-none drop-shadow-[0_8px_30px_rgba(249,115,22,0.4)]"
        >
          YOU MATTER.
        </motion.h2>

      </div>
    </section>
  );
}

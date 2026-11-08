import { motion } from 'framer-motion';

export default function CosmicClimaxSection() {
  return (
    <section 
      id="cosmic-climax"
      className="relative w-full min-h-screen bg-[#050407] text-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden py-24 sm:py-32"
    >
      {/* ─── Starfield Canvas Background Layer ─── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="w-full h-full opacity-70"
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
        {/* Central Warm Glow Bloom Behind "YOU MATTER" */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249, 115, 22, 0.25) 0%, rgba(217, 119, 6, 0.08) 45%, transparent 75%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center space-y-10 sm:space-y-14">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 max-w-3xl"
        >
          <p className="text-stone-300 text-lg sm:text-xl lg:text-2xl leading-relaxed font-sans font-normal">
            When young people are equipped with healthy values, supportive relationships, and practical life skills, amazing outcomes become possible.
          </p>
          <p className="text-stone-400 text-sm sm:text-base tracking-widest font-sans uppercase font-medium">
            Every lesson points back to one simple truth:
          </p>
        </motion.div>

        {/* ─── Massive Glowing Title: YOU MATTER. ─── */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[132px] xl:text-[150px] font-bold tracking-tight text-[#F97316] uppercase drop-shadow-[0_16px_50px_rgba(249,115,22,0.65)] leading-none select-none"
        >
          YOU MATTER.
        </motion.h2>

      </div>
    </section>
  );
}

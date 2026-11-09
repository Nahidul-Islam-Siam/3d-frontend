import { motion } from 'framer-motion';

export interface WelcomeHomeTitleStageProps {
  id?: string;
  className?: string;
}

export default function WelcomeHomeTitleStage({
  id = 'welcome-home-title-stage',
  className = '',
}: WelcomeHomeTitleStageProps) {
  return (
    <section
      id={id}
      className={`relative w-full min-h-screen bg-[#0A0503] text-white flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden select-none py-20 ${className}`}
    >
      {/* ─── Ambient Warm Radial Glow (Matches Figma 1:1) ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 35% 60%, rgba(68,36,15,0.45) 0%, rgba(20,12,7,0.75) 50%, #0A0503 100%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(223,185,120,0.08) 0%, rgba(140,85,35,0.04) 45%, transparent 75%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ─── Pure Typography Center Stage ─── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Title: WELCOME HOME */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-wider text-white mb-6 uppercase"
        >
          WELCOME HOME
        </motion.h2>

        {/* Double Dotted / Dashed Line Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl my-4 space-y-1.5"
        >
          <div className="w-full border-t border-dashed border-white/20" />
          <div className="w-full border-t border-dashed border-white/20" />
        </motion.div>

        {/* Subtitle: Sometimes hope begins with a key. */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-stone-300 text-sm sm:text-base md:text-lg font-light tracking-wide max-w-lg mt-2"
        >
          Sometimes hope begins with a key.
        </motion.p>
      </div>
    </section>
  );
}

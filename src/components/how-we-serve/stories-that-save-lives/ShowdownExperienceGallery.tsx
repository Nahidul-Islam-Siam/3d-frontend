import { motion } from 'framer-motion';
import galleryComposite from '@/assets/how-we-serve/stories-that-save-lives/image copy 5.png';

export default function ShowdownExperienceGallery() {
  return (
    <section 
      id="showdown-experience"
      className="relative w-full min-h-screen bg-[#08070B] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        
        {/* ─── Header Section (Figma 1:1) ─── */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight"
          >
            Life in Full Motion: The Showdown Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-2xl"
          >
            Not a lecture. Not clinical detachment. A vibrant theater of human voices, genuine tears of relief, uncurated laughter, and community presence.
          </motion.p>
        </div>

        {/* ─── High-Fidelity 6-Photo Masonry Grid (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10 bg-[#121017]/50 shadow-[0_24px_80px_rgba(0,0,0,0.85)] group"
        >
          <img 
            src={galleryComposite}
            alt="The Showdown Experience - Vibrant Theater of Human Voices"
            className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
          />
          {/* Subtle Film Grain Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}


import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';

export interface WelcomeHomeFinaleSectionProps {
  id?: string;
  className?: string;
}

export default function WelcomeHomeFinaleSection({
  id = 'welcome-home-finale',
  className = '',
}: WelcomeHomeFinaleSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] bg-[#120904] text-white flex items-center justify-center py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 select-none overflow-hidden ${className}`}
    >
      {/* ─── Ambient Cosmic Glow & Lighting (Figma 1:1) ─── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, rgba(249, 115, 22, 0.22) 0%, rgba(30, 16, 9, 0.6) 45%, #120904 90%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(1px 1px at 30px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 120px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 160px 80px, #ffffff, rgba(0,0,0,0))',
          backgroundSize: '250px 250px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Eyebrow Credo */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 font-serif italic text-sm sm:text-base mb-4 tracking-wide"
        >
          Every veteran deserves a place to begin again
        </motion.p>

        {/* Double Dashed Divider Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md my-2 space-y-1.5"
        >
          <div className="w-full border-t border-dashed border-white/25" />
          <div className="w-full border-t border-dashed border-white/25" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight text-white leading-[1.16] mt-4 mb-10 sm:mb-12 uppercase"
        >
          LET&apos;S HELP WELCOME THE<br />
          <span className="text-[#F97316]">NEXT HERO</span> HOME.
        </motion.h2>

        {/* 3 Capsule Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <FigmaButton to="/contact?subject=housing-partner" variant="primary" size="md">
            Become a Housing Partner
          </FigmaButton>

          <FigmaButton
            to="/donate?category=furnishings"
            variant="outline-white"
            size="md"
            className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
          >
            Support Veteran Housing
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

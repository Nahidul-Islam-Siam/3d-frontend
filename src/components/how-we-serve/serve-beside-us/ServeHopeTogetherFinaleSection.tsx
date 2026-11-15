import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServeHopeTogetherFinaleSection() {
  return (
    <section 
      id="serve-finale"
      className="relative w-full min-h-[85vh] lg:min-h-screen bg-[#0A0706] text-white flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* Background Soft Center Warm Amber Radiance (Figma 1:1) */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, rgba(249,115,22,0.18) 0%, rgba(68,36,15,0.08) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col justify-between">
        
        {/* Eyebrow Tag at top-left */}
        <div className="mb-8 sm:mb-14">
          <span 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium"
          >
            SERVE BESIDE US
          </span>
        </div>

        {/* ─── Center Climax Stage (Figma 1:1) ─── */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Top Credo Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5 text-stone-300 text-xs sm:text-sm font-light tracking-wide mb-6"
          >
            <p>Every act of kindness begins with one decision.</p>
            <p>Every movement begins with one person.</p>
            <p>Every life is changed because someone chose to care.</p>
          </motion.div>

          {/* Double Dotted Line Divider (Figma 1:1) */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl my-4 space-y-1.5"
          >
            <div className="w-full border-t border-dashed border-white/20" />
            <div className="w-full border-t border-dashed border-white/20" />
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white leading-[1.15] mb-10 mt-2 uppercase"
          >
            LET&apos;S SERVE HOPE<br />
            <span className="text-[#F97316]">TOGETHER.</span>
          </motion.h2>

          {/* ─── 4 Pill CTA Buttons (Figma 1:1) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full"
          >
            {/* 1. Primary Volunteer Button */}
            <Link
              to="/movement?tab=volunteer"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(249,115,22,0.35)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Volunteer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* 2. Become an Outreach Partner */}
            <Link
              to="/contact?subject=outreach-partner"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/30 hover:border-white text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Become an Outreach Partner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* 3. Contact */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/30 hover:border-white text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Contact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* 4. Donate Items */}
            <Link
              to="/donate?category=supplies"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/30 hover:border-white text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Donate Items</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

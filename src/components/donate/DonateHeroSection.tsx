import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import charityJarBg from '@/assets/donate/Rectangle 57.png';

/*
// ─── PREVIOUS 3D COIN HERO IMPORTS (COMMENTED OUT) ───
// import { Sparkles } from 'lucide-react';
// import FigmaButton from '@/components/common/FigmaButton';
// import Coin3DCanvas from '@/components/donate/Coin3DCanvas';
*/

interface DonateHeroSectionProps {
  onDonateClick: () => void;
  onScrollClick: () => void;
}

export default function DonateHeroSection({
  onDonateClick,
  onScrollClick,
}: DonateHeroSectionProps) {
  return (
    <section 
      id="donate-hero-banner"
      className="relative w-full min-h-screen bg-[#08070B] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ─── Background Art Layer: Rectangle 57.png (Hand dropping coin into Charity Jar) ─── */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center lg:bg-center bg-no-repeat pointer-events-none select-none"
        style={{ backgroundImage: `url("${charityJarBg}")` }}
        aria-hidden="true"
      />

      {/* ─── Mobile / Tablet Gradient Protection ─── */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#08070B] via-[#08070B]/50 to-transparent lg:hidden pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Bottom Fade Gradient: Blends Jar Seamlessly into Section 2 ─── */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#08070B] via-[#08070B]/85 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ─── Main Content Container (Aligned with Navbar 24px/64px/96px margins) ─── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 h-full flex-1 flex flex-col justify-center pt-20 sm:pt-24 lg:pt-0">
        <div className="w-full max-w-[430px] text-left">
          
          {/* Main Title: GIVE HOPE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight leading-[1.06]"
          >
            GIVE HOPE
          </motion.h1>

          {/* Subtext Paragraph (Exact 3-Line Wrap Matching Figma) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 text-stone-300 text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[22px] sm:leading-[25px] font-normal font-sans"
          >
            Your generosity can become part of someone else&apos;s story. In a world<br className="hidden sm:inline" />
            of cold transactions, we create quiet, enduring spaces where<br className="hidden sm:inline" />
            people are recognized, heard, and held.
          </motion.p>

          {/* DONATE NOW CTA Pill Button (Exact Figma Capsule) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 sm:mt-8"
          >
            <button
              type="button"
              onClick={onDonateClick}
              className="group inline-flex items-center gap-3 pl-6 pr-3.5 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span className="font-serif font-bold text-[13px] sm:text-[14px] uppercase tracking-wider text-white leading-none">
                DONATE NOW
              </span>
              <span className="w-8 h-5 rounded-full border border-white/40 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </motion.div>

        </div>
      </div>

      {/* ─── Bottom Right: SCROLL Indicator Button (Serif Font Matching Figma) ─── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 pb-10 sm:pb-14 flex justify-end">
        <button
          type="button"
          onClick={onScrollClick}
          className="inline-flex items-center gap-2.5 text-white/80 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="w-6 h-6 rounded-full border border-white/70 group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown className="w-3 h-3 text-white group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[12px] uppercase tracking-[0.22em] text-white font-medium"
          >
            SCROLL
          </span>
        </button>
      </div>

      {/*
      // ─── PREVIOUS CODE WITH 3D COIN CANVAS (COMMENTED OUT) ───
      // <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
      //   <motion.div className="lg:col-span-5 space-y-6 sm:space-y-8">
      //     <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-[11px] uppercase tracking-widest font-sans font-semibold">
      //       <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
      //       <span>Minted For Human Dignity</span>
      //     </div>
      //     <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white tracking-tight leading-[1.04]">
      //       GIVE HOPE
      //     </h1>
      //     <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-sans leading-relaxed max-w-xl">
      //       Your generosity can become part of someone else's story...
      //     </p>
      //     <div className="pt-2">
      //       <FigmaButton onClick={onDonateClick} variant="primary" size="lg">DONATE NOW</FigmaButton>
      //     </div>
      //   </motion.div>
      //   <motion.div className="lg:col-span-7 flex flex-col items-center justify-center relative w-full">
      //     <Coin3DCanvas className="w-full" />
      //   </motion.div>
      // </div>
      */}

    </section>
  );
}

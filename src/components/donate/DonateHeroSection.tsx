import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import charityJarBg from '@/assets/donate/Rectangle 57.png';
import btnArrow from '@/assets/icons/btn-arrow.png';

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
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* ─── Background Art Layer: Rectangle 57.png (Hand dropping coin into Charity Jar) ─── */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-[center_right] lg:bg-center bg-no-repeat pointer-events-none select-none"
        style={{ backgroundImage: `url("${charityJarBg}")` }}
        aria-hidden="true"
      />

      {/* ─── Mobile / Tablet Legibility Gradient ─── */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 lg:bg-gradient-to-r lg:from-black/90 lg:via-black/50 lg:to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Main Content Container (Left Narrative & CTA matching Figma) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 h-full flex-1 flex flex-col justify-center pt-28 sm:pt-36 lg:pt-0">
        <div className="max-w-xl text-left">
          
          {/* Main Title: GIVE HOPE */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight leading-[1.05]"
          >
            GIVE HOPE
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-stone-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl font-normal font-sans"
          >
            Your generosity can become part of someone else&apos;s story. In a world of cold transactions, we create quiet, enduring spaces where people are recognized, heard, and held.
          </motion.p>

          {/* DONATE NOW CTA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={onDonateClick}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white shadow-[0_6px_25px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span className="font-serif font-bold text-[14px] sm:text-[15px] uppercase tracking-wider text-white">
                DONATE NOW
              </span>
              <img 
                src={btnArrow} 
                alt="" 
                className="h-[18px] w-auto object-contain group-hover:translate-x-1 transition-transform" 
              />
            </button>
          </motion.div>

        </div>
      </div>

      {/* ─── Bottom Right: SCROLL Indicator Button matching Figma ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pb-8 sm:pb-12 flex justify-end">
        <button
          type="button"
          onClick={onScrollClick}
          className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="w-7 h-7 rounded-full border border-white/60 group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span className="text-[12px] uppercase tracking-[0.2em] font-sans font-medium">
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

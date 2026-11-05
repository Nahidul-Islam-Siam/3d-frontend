import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';
import heroJarImg from '@/assets/donate/scrool/image.png';

interface DonateHeroSectionProps {
  onDonateClick: () => void;
  onScrollClick: () => void;
}

export default function DonateHeroSection({
  onDonateClick,
  onScrollClick,
}: DonateHeroSectionProps) {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#08070B] text-white flex flex-col justify-between overflow-hidden select-none px-6 sm:px-10 lg:px-16 xl:px-24 py-12 lg:py-16">
      
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Main 2-Column Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
        
        {/* Left Column: Heading, Narrative & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-[11px] uppercase tracking-widest font-sans font-semibold">
            <span>Live Achieve Believe</span>
          </div>

          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] font-bold text-white tracking-tight leading-[1.02]"
          >
            GIVE HOPE
          </h1>

          <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-sans leading-relaxed max-w-xl">
            Your generosity can become part of someone else&apos;s story. In a world of cold transactions, we create quiet, enduring spaces where people are recognized, heard, and held.
          </p>

          <div className="pt-2">
            <FigmaButton
              onClick={onDonateClick}
              variant="primary"
              size="lg"
              className="!text-sm sm:!text-base shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
            >
              DONATE NOW
            </FigmaButton>
          </div>
        </motion.div>

        {/* Right Column: Hand Dropping Coin into CHARITY Jar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[540px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black/40">
            <img
              src={heroJarImg}
              alt="Hand dropping coin of hope into charity jar"
              className="w-full h-full object-cover object-right"
              loading="eager"
            />
            {/* Subtle gradient overlay to blend into black stage */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08070B] via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Bottom Row: SCROLL Indicator Button */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-end pt-6">
        <button
          type="button"
          onClick={onScrollClick}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 hover:border-[#F97316] bg-white/5 hover:bg-[#F97316]/10 text-stone-300 hover:text-white transition-all duration-300 cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full border border-white/40 group-hover:border-[#F97316] flex items-center justify-center">
            <ArrowDown className="w-3 h-3 text-stone-300 group-hover:text-[#F97316] group-hover:translate-y-0.5 transition-transform" />
          </div>
          <span className="text-xs uppercase tracking-widest font-serif font-bold">
            SCROLL
          </span>
        </button>
      </div>

    </section>
  );
}


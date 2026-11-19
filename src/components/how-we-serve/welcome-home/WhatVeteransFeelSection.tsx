import { motion } from 'framer-motion';
import { 
  MessageSquareHeart, 
  Award, 
  ShieldCheck, 
  Sun, 
  Home 
} from 'lucide-react';

export interface WhatVeteransFeelSectionProps {
  id?: string;
  className?: string;
}

const covenants = [
  {
    id: 'appreciated',
    title: 'APPRECIATED',
    icon: MessageSquareHeart,
    desc: 'Your service mattered. Not just as a memory, but as an honored foundation of our community.',
    row: 1,
  },
  {
    id: 'honored',
    title: 'HONORED',
    icon: Award,
    desc: 'Your sacrifice is respected. Recognized with dignity, never reduced to pity or charity.',
    row: 1,
  },
  {
    id: 'safe',
    title: 'SAFE',
    icon: ShieldCheck,
    desc: 'A place to Solid walls, a secure threshold, and nights without fear or instability.',
    row: 1,
  },
  {
    id: 'hopeful',
    title: 'HOPEFUL',
    icon: Sun,
    desc: 'A new chapter can begin. The past acknowledged, but the future wide open with opportunity.',
    row: 2,
  },
  {
    id: 'home',
    title: 'HOME',
    icon: Home,
    desc: 'A place where your heart can rest. Your own space, your own key, your own sovereign sanctuary.',
    row: 2,
  },
];

export default function WhatVeteransFeelSection({
  id = 'what-veterans-feel',
  className = '',
}: WhatVeteransFeelSectionProps) {
  const row1Cards = covenants.filter((c) => c.row === 1);
  const row2Cards = covenants.filter((c) => c.row === 2);

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* ─── Top Header Section: Title (Left) & Covenant Statement (Right) ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          {/* Top-Left Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[36px] font-medium leading-[1.2] text-[#2C261E] tracking-tight"
            >
              What We Hope Every<br className="hidden sm:inline" /> Veteran Feels
            </h2>
          </motion.div>

          {/* Top-Right Covenant Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md lg:text-right"
          >
            <p className="text-[#746343] text-xs sm:text-[13px] leading-relaxed font-sans font-light">
              Not institutional placement. Not temporary shelter.<br className="hidden sm:inline" />
              These are the five unwavering covenants we build into every doorway.
            </p>
          </motion.div>
        </div>

        {/* ─── Center Cards: 5 Warm Cream Cards (3 on Row 1, 2 Centered on Row 2) ─── */}
        <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
          
          {/* Row 1: APPRECIATED, HONORED, SAFE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
            {row1Cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#FFF9ED] rounded-[22px] p-6 sm:p-7 border border-[#F2E5D0] shadow-[0_4px_20px_rgba(44,38,30,0.03)] hover:border-[#F97316]/50 hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 flex items-center justify-center text-[#F97316] mb-4">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-[#E06D1A] font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2 font-sans">
                      {card.title}
                    </h3>
                    <p className="text-[#746343] text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Row 2: HOPEFUL, HOME (Centered 2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-2xl">
            {row2Cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#FFF9ED] rounded-[22px] p-6 sm:p-7 border border-[#F2E5D0] shadow-[0_4px_20px_rgba(44,38,30,0.03)] hover:border-[#F97316]/50 hover:shadow-[0_10px_30px_rgba(249,115,22,0.08)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 flex items-center justify-center text-[#F97316] mb-4">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h3 className="text-[#E06D1A] font-bold text-xs sm:text-[13px] tracking-wider uppercase mb-2 font-sans">
                      {card.title}
                    </h3>
                    <p className="text-[#746343] text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

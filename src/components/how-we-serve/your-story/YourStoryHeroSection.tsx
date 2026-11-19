import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/how-we-serve/story/image 112.png';

export interface YourStoryHeroSectionProps {
  id?: string;
  className?: string;
}

export default function YourStoryHeroSection({
  id = 'your-story-hero',
  className = '',
}: YourStoryHeroSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* ─── 1. Hero Cinema Image Card (Matches Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[360px] sm:min-h-[480px] lg:min-h-[620px] max-h-[85vh] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden bg-black shadow-[0_20px_60px_rgba(44,36,29,0.12)] group select-none"
        >
          <img
            src={heroImage}
            alt="Volunteers sorting and packing community provisions together"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />

          {/* Subtle Ambient Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_65%,rgba(18,12,8,0.25)_100%)]" 
            aria-hidden="true"
          />
        </motion.div>

        {/* ─── 2. Centered Typography & CTA Under Hero ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 flex flex-col items-center text-center"
        >
          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#1C140D] mb-2 leading-tight"
          >
            Your Story
          </h1>

          <p className="text-[#8F6629] font-sans text-xs sm:text-[14px] italic mb-6 max-w-md">
            Every story has the power to change another.
          </p>

          <Link
            to="/movement"
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-[13px] font-medium tracking-wide shadow-[0_4px_20px_rgba(249,115,22,0.3)] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span>Join the Movement</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

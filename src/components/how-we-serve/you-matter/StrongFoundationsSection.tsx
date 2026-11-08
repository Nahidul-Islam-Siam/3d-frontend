import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

import g1 from '@/assets/how-we-serve/you-matter/gallery/gallery-1.jpg';
import g2 from '@/assets/how-we-serve/you-matter/gallery/gallery-2.jpg';
import g3 from '@/assets/how-we-serve/you-matter/gallery/gallery-3.jpg';
import g4 from '@/assets/how-we-serve/you-matter/gallery/gallery-4.jpg';
import g5 from '@/assets/how-we-serve/you-matter/gallery/gallery-5.jpg';
import g6 from '@/assets/how-we-serve/you-matter/gallery/gallery-6.jpg';
import g7 from '@/assets/how-we-serve/you-matter/gallery/gallery-7.jpg';
import g8 from '@/assets/how-we-serve/you-matter/gallery/gallery-8.jpg';
import g9 from '@/assets/how-we-serve/you-matter/gallery/gallery-9.jpg';
import g10 from '@/assets/how-we-serve/you-matter/gallery/gallery-10.jpg';
import g11 from '@/assets/how-we-serve/you-matter/gallery/gallery-11.jpg';
import g12 from '@/assets/how-we-serve/you-matter/gallery/gallery-12.jpg';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

const lane1: GalleryItem[] = [
  { id: 'l1-1', src: g1, alt: 'Smiling young woman with radiant hope', caption: 'Finding My Voice' },
  { id: 'l1-2', src: g2, alt: 'Young leader smiling in community workshop', caption: 'Leadership In Action' },
  { id: 'l1-3', src: g3, alt: 'Youth leader with boundless optimism', caption: 'Unlocking Worth' },
  { id: 'l1-4', src: g4, alt: 'Young woman discovering self-worth', caption: 'Safe Community' },
];

const lane2: GalleryItem[] = [
  { id: 'l2-1', src: g5, alt: 'Joyful youth laughing and thriving', caption: 'Creative Expression' },
  { id: 'l2-2', src: g6, alt: 'Inspiring young man in natural light', caption: 'Strong Roots' },
  { id: 'l2-3', src: g7, alt: 'Young student with focused determination', caption: 'Boundless Potential' },
  { id: 'l2-4', src: g8, alt: 'Thoughtful young creator finding purpose', caption: 'Purpose & Hope' },
];

const lane3: GalleryItem[] = [
  { id: 'l3-1', src: g9, alt: 'Diverse young student smiling brightly', caption: 'Youth Mentorship' },
  { id: 'l3-2', src: g10, alt: 'Young changemaker taking bold steps', caption: 'Brighter Futures' },
  { id: 'l3-3', src: g11, alt: 'Young man smiling with quiet strength', caption: 'Belonging & Dignity' },
  { id: 'l3-4', src: g12, alt: 'Youth embracing future opportunities', caption: 'Empowered Steps' },
];

export default function StrongFoundationsSection() {
  return (
    <section
      id="strong-foundations"
      className="relative w-full min-h-screen bg-[#FAF4E6] text-[#2C261E] flex items-center overflow-hidden select-none"
    >
      {/* ─── Embedded Keyframe Animations ─── */}
      <style>{`
        @keyframes diagonalStreamLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes diagonalStreamRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .stream-track-left {
          animation: diagonalStreamLeft 34s linear infinite;
          will-change: transform;
        }
        .stream-track-right {
          animation: diagonalStreamRight 38s linear infinite;
          will-change: transform;
        }
        .stream-track-left-fast {
          animation: diagonalStreamLeft 28s linear infinite;
          will-change: transform;
        }
        .stream-ribbon:hover .stream-track-left,
        .stream-ribbon:hover .stream-track-right,
        .stream-ribbon:hover .stream-track-left-fast {
          animation-play-state: paused;
        }
      `}</style>

      {/* ─── Ambient Amber Glow Behind Typography ─── */}
      <div
        className="absolute top-1/2 left-[12%] -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      {/* ─── Left Blend Veil (Ensures Text Stays 100% Legible on All Screens) ─── */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-gradient-to-r from-[#FAF4E6] via-[#FAF4E6]/95 to-transparent z-15 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Main Content Container (Left-Aligned Text) ─── */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 py-20 lg:py-28 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl xl:max-w-2xl space-y-6 sm:space-y-7 pointer-events-auto"
        >
          {/* Main Title & Subtitle */}
          <div className="space-y-2.5">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[84px] font-bold tracking-tight text-[#2C261E] leading-none uppercase"
            >
              YOU MATTER
            </h2>
            <p className="text-[#746343] text-sm sm:text-base lg:text-lg font-sans tracking-widest uppercase font-medium">
              Strong Foundations
            </p>
          </div>

          {/* Dotted Single Divider (Figma 1:1) */}
          <div className="w-full max-w-[420px] pt-1 pb-1">
            <div className="w-full border-t border-dotted border-[#D4C3A3]" />
          </div>

          {/* Italic Quote */}
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[#574D3B] text-xl sm:text-2xl lg:text-[27px] font-normal leading-relaxed italic max-w-xl"
          >
            “Sometimes hope begins when someone discovers their worth.”
          </p>
        </motion.div>
      </div>

      {/* ─── Right Side: Diagonal Streaming Gallery (Full Bleed to Edges) ─── */}
      <div
        className="absolute -right-[18%] sm:-right-[12%] md:-right-[8%] lg:right-[-4%] xl:right-[-1%] -top-[35%] sm:-top-[30%] -bottom-[35%] sm:-bottom-[30%] w-[130%] sm:w-[105%] md:w-[90%] lg:w-[68%] xl:w-[62%] flex flex-col justify-center gap-3 sm:gap-4 lg:gap-5 select-none pointer-events-auto z-10"
        style={{
          transform: 'rotate(-28.5deg)',
          transformOrigin: 'center center',
        }}
      >
        {/* ─── Lane 1: Upper Diagonal Ribbon (Marquee Left) ─── */}
        <div className="stream-ribbon relative w-full h-[170px] sm:h-[210px] lg:h-[250px] xl:h-[280px] overflow-hidden">
          <div className="stream-track-left flex gap-3.5 sm:gap-4 lg:gap-5 shrink-0 w-max h-full items-center">
            {[...lane1, ...lane1, ...lane1].map((item, idx) => (
              <div
                key={`lane1-${item.id}-${idx}`}
                className="group relative shrink-0 w-[240px] sm:w-[290px] lg:w-[340px] xl:w-[380px] h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:border-amber-400/50 hover:shadow-[0_12px_40px_rgba(249,115,22,0.25)] hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.52]"
                  style={{ transform: 'rotate(28.5deg) scale(1.45)' }}
                  loading="lazy"
                />
                {/* Subtle Hover Gradient & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-amber-200">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Lane 2: Middle Diagonal Ribbon (Marquee Right, Slightly Wider) ─── */}
        <div className="stream-ribbon relative w-full h-[190px] sm:h-[230px] lg:h-[270px] xl:h-[310px] overflow-hidden">
          <div className="stream-track-right flex gap-3.5 sm:gap-4 lg:gap-5 shrink-0 w-max h-full items-center">
            {[...lane2, ...lane2, ...lane2].map((item, idx) => (
              <div
                key={`lane2-${item.id}-${idx}`}
                className="group relative shrink-0 w-[260px] sm:w-[310px] lg:w-[360px] xl:w-[410px] h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:border-amber-400/50 hover:shadow-[0_12px_40px_rgba(249,115,22,0.25)] hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.52]"
                  style={{ transform: 'rotate(28.5deg) scale(1.45)' }}
                  loading="lazy"
                />
                {/* Subtle Hover Gradient & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-amber-200">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Lane 3: Lower Diagonal Ribbon (Marquee Left Fast) ─── */}
        <div className="stream-ribbon relative w-full h-[170px] sm:h-[210px] lg:h-[250px] xl:h-[280px] overflow-hidden">
          <div className="stream-track-left-fast flex gap-3.5 sm:gap-4 lg:gap-5 shrink-0 w-max h-full items-center">
            {[...lane3, ...lane3, ...lane3].map((item, idx) => (
              <div
                key={`lane3-${item.id}-${idx}`}
                className="group relative shrink-0 w-[240px] sm:w-[290px] lg:w-[340px] xl:w-[380px] h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-500 ease-out hover:border-amber-400/50 hover:shadow-[0_12px_40px_rgba(249,115,22,0.25)] hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.52]"
                  style={{ transform: 'rotate(28.5deg) scale(1.45)' }}
                  loading="lazy"
                />
                {/* Subtle Hover Gradient & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-amber-200">
                    {item.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom-Right Floating Subtle Scroll Badge (Figma 1:1) ─── */}
      <div className="absolute bottom-6 right-8 lg:bottom-10 lg:right-14 z-30 pointer-events-none hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D4C3A3] text-[#2C261E] text-xs tracking-widest uppercase shadow-md">
        <ArrowDown className="w-3.5 h-3.5 text-[#F97316] animate-bounce" />
        <span className="font-sans font-medium text-[11px] text-[#746343]">SCROLL</span>
      </div>
    </section>
  );
}

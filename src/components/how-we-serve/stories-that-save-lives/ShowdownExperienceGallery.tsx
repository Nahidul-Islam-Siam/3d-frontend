import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import galleryComposite from '@/assets/how-we-serve/stories-that-save-lives/image copy 5.png';

interface CardDef {
  id: number;
  alt: string;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  flexWidth: string;
}

// ─── Row 1 & 2 matching Figma 1:1 geometry ───
const row1Cards: CardDef[] = [
  { id: 0, alt: 'Community Dialogue Gathering', sx: 204, sy: 195, sw: 442, sh: 240, flexWidth: 'sm:w-[38%]' },
  { id: 1, alt: 'Mindful Stillness and Reflection', sx: 665, sy: 195, sw: 441, sh: 240, flexWidth: 'sm:w-[38%]' },
  { id: 2, alt: 'Theatrical Stage Performance at Sunset', sx: 1125, sy: 195, sw: 234, sh: 240, flexWidth: 'sm:w-[24%]' },
];

const row2Cards: CardDef[] = [
  { id: 3, alt: 'Youth Leadership and Voices', sx: 204, sy: 455, sw: 235, sh: 240, flexWidth: 'sm:w-[24%]' },
  { id: 4, alt: 'Audience Shared Laughter', sx: 460, sy: 455, sw: 438, sh: 240, flexWidth: 'sm:w-[44%]' },
  { id: 5, alt: 'Empathetic Conversation on Bench', sx: 918, sy: 455, sw: 441, sh: 240, flexWidth: 'sm:w-[32%]' },
];

const allCards = [...row1Cards, ...row2Cards];

export default function ShowdownExperienceGallery() {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // ─── Extract the 6 exact Figma photos in-memory from the high-res composite ───
  useEffect(() => {
    const img = new Image();
    img.src = galleryComposite;
    img.onload = () => {
      const urls = allCards.map((card) => {
        const canvas = document.createElement('canvas');
        canvas.width = card.sw;
        canvas.height = card.sh;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, card.sx, card.sy, card.sw, card.sh, 0, 0, card.sw, card.sh);
          return canvas.toDataURL('image/jpeg', 0.95);
        }
        return '';
      });
      setPhotoUrls(urls);
    };
  }, []);

  const handleNext = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx + 1) % allCards.length);
  };

  const handlePrev = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx - 1 + allCards.length) % allCards.length);
  };

  return (
    <section 
      id="showdown-experience"
      className="relative w-full min-h-screen bg-[#08070B] text-white py-20 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
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
        <div className="max-w-2xl mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-white mb-3.5 leading-snug"
          >
            Life in Full Motion: The Showdown Experience
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-stone-300 text-xs sm:text-sm lg:text-[14px] font-light leading-relaxed max-w-xl"
          >
            Not a lecture. Not clinical detachment. A vibrant theater of human voices, genuine tears of relief, uncurated laughter, and community presence.
          </motion.p>
        </div>

        {/* ─── 6-Photo Masonry Bento Grid (Figma 1:1 Geometry) ─── */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          
          {/* Row 1: 3 Photos (38% | 38% | 24%) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
            {row1Cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActivePhotoIdx(card.id)}
                className={`relative w-full ${card.flexWidth} h-[240px] sm:h-[270px] lg:h-[300px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#16131B] border border-white/10 hover:border-[#F97316]/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_45px_rgba(249,115,22,0.18)] transition-all duration-300 cursor-pointer group`}
              >
                {photoUrls[card.id] ? (
                  <img
                    src={photoUrls[card.id]}
                    alt={card.alt}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1622] animate-pulse" />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Row 2: 3 Photos (24% | 44% | 32%) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
            {row2Cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (i + 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActivePhotoIdx(card.id)}
                className={`relative w-full ${card.flexWidth} h-[240px] sm:h-[270px] lg:h-[300px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#16131B] border border-white/10 hover:border-[#F97316]/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_45px_rgba(249,115,22,0.18)] transition-all duration-300 cursor-pointer group`}
              >
                {photoUrls[card.id] ? (
                  <img
                    src={photoUrls[card.id]}
                    alt={card.alt}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1622] animate-pulse" />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* ─── Interactive Lightbox on Click ─── */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 bg-black shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActivePhotoIdx(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {photoUrls[activePhotoIdx] && (
                <img
                  src={photoUrls[activePhotoIdx]}
                  alt={allCards[activePhotoIdx].alt}
                  className="max-h-[80vh] w-auto object-contain mx-auto"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

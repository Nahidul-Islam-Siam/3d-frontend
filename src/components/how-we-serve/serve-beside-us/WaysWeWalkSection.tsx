import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Exact 1:1 Figma assets matching user screenshot
import cardMealsImg from '@/assets/how-we-serve/serve-beside-us/Rectangle 109 copy.png';
import cardVeteransImg from '@/assets/how-we-serve/serve-beside-us/Rectangle 109 copy 2.png';
import cardExperienceImg from '@/assets/meet-us/gallery/figma-card-children.png';
import cardYouthImg from '@/assets/how-we-serve/serve-beside-us/card-investing-youth.png';
import cardDonationsImg from '@/assets/how-we-serve/serve-beside-us/Rectangle 109.png';
import cardShowingUpImg from '@/assets/how-we-serve/serve-beside-us/Rectangle 109 copy 3.png';

interface WalkWayCard {
  id: string;
  title: string;
  description: string;
  extendedText: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const walkWays: WalkWayCard[] = [
  {
    id: 'serving-meals',
    title: 'Serving Meals',
    description: 'Because everyone deserves a place at the table.',
    extendedText:
      'From prepping fresh ingredients to sharing warmth across a dinner table, our meal volunteers create moments where community members feel seen, honored, and deeply cared for.',
    ctaText: 'Help Serve Meals',
    ctaLink: '/how-we-serve/a-place-at-the-table',
    image: cardMealsImg,
  },
  {
    id: 'welcoming-veterans',
    title: 'Welcoming Veterans Home',
    description: 'Because everyone deserves a place to begin again.',
    extendedText:
      'Standing shoulder-to-shoulder with veterans during transitions, helping furnish apartments, carrying household boxes, and handing over the keys to a fresh start.',
    ctaText: 'Support Veterans',
    ctaLink: '/how-we-serve/welcome-home',
    image: cardVeteransImg,
  },
  {
    id: 'supporting-experience',
    title: 'Supporting the Experience',
    description: 'Helping create conversations that inspire hope.',
    extendedText:
      'Serving behind the scenes at our theatrical showcases, community gatherings, and musical productions that break the silence around mental health and suicide awareness.',
    ctaText: 'Experience The Show',
    ctaLink: '/how-we-serve/stories-that-save-lives',
    image: cardExperienceImg,
  },
  {
    id: 'investing-youth',
    title: 'Investing in Young People',
    description: 'Helping students discover their worth.',
    extendedText:
      'Mentoring middle and high school students through the LEADS program, instilling leadership, dignity, and self-worth so the next generation thrives.',
    ctaText: 'Explore Youth Mentorship',
    ctaLink: '/how-we-serve/you-matter',
    image: cardYouthImg,
  },
  {
    id: 'organizing-donations',
    title: 'Organizing Donations',
    description: 'Turning generosity into new beginnings.',
    extendedText:
      'Receiving, sorting, and delivering furniture, beddings, pantry goods, and essentials to families taking their first courageous steps into stable housing.',
    ctaText: 'Donate Essentials',
    ctaLink: '/donate?category=supplies',
    image: cardDonationsImg,
  },
  {
    id: 'simply-showing-up',
    title: 'Simply Showing Up',
    description: '— Sometimes the greatest gift we can give is our presence.',
    extendedText:
      'You don\'t need specialized training or clinical credentials. Being a faithful, compassionate friend who sits down to listen can literally save someone\'s life.',
    ctaText: 'Join The Movement',
    ctaLink: '/movement',
    image: cardShowingUpImg,
  },
];

export default function WaysWeWalkSection() {
  const [activeCardIdx, setActiveCardIdx] = useState<number | null>(null);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCardIdx === null) return;
      if (e.key === 'Escape') setActiveCardIdx(null);
      if (e.key === 'ArrowRight') setActiveCardIdx((activeCardIdx + 1) % walkWays.length);
      if (e.key === 'ArrowLeft') setActiveCardIdx((activeCardIdx - 1 + walkWays.length) % walkWays.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIdx]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCardIdx === null) return;
    setActiveCardIdx((activeCardIdx + 1) % walkWays.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeCardIdx === null) return;
    setActiveCardIdx((activeCardIdx - 1 + walkWays.length) % walkWays.length);
  };

  const renderCard = (item: WalkWayCard, idx: number, imgAspectClass: string) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setActiveCardIdx(idx)}
      className="group relative rounded-[22px] sm:rounded-[26px] bg-[#2A1D14] border border-[#3E2B1F] hover:border-[#F97316]/70 shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_50px_rgba(249,115,22,0.16)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Card Photo with Hover Zoom */}
      <div className={`w-full ${imgAspectClass} overflow-hidden bg-black/40 relative`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
        
        {/* Hover Pill */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-sans opacity-0 group-hover:opacity-100 transition-opacity">
          Click to explore
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-lg sm:text-xl font-normal tracking-wide text-white group-hover:text-[#F97316] transition-colors mb-2.5"
          >
            {item.title}
          </h3>
          <p className="text-[#C4A992] text-xs sm:text-[13px] leading-relaxed font-light">
            {item.description}
          </p>
        </div>

        {/* Bottom Accent */}
        <div className="w-8 h-0.5 rounded-full bg-[#F97316]/30 group-hover:w-16 group-hover:bg-[#F97316] transition-all duration-300 mt-5" />
      </div>
    </motion.div>
  );

  return (
    <section 
      id="ways-we-walk"
      className="relative w-full min-h-screen bg-[#FAF4E6] text-[#2C261E] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* Background Soft Amber Radial Glow */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        {/* ─── Top Header Row (Figma 1:1) ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#1C140D] leading-[1.18]"
            >
              Ways We Walk Beside Our<br />Community
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="text-[#554637] text-xs sm:text-sm lg:text-[14px] leading-relaxed font-light">
              No administrative checklists or distant corporate committees. Choose the doorway that speaks to your gifts.
            </p>
          </motion.div>
        </div>

        {/* ─── 3 Columns Asymmetrical Bento Grid (Figma 1:1) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-start">
          
          {/* ─── Column 1 (Left) ─── */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            {renderCard(walkWays[0], 0, 'aspect-[16/9.5] sm:aspect-[16/9]')}  {/* Serving Meals */}
            {renderCard(walkWays[3], 3, 'aspect-[16/12] sm:aspect-[16/11]')} {/* Investing in Young People (Taller!) */}
          </div>

          {/* ─── Column 2 (Middle - Staggered Offset Downwards) ─── */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8 lg:pt-10 xl:pt-14">
            {renderCard(walkWays[1], 1, 'aspect-[16/11] sm:aspect-[16/10]')} {/* Welcoming Veterans Home */}
            {renderCard(walkWays[4], 4, 'aspect-[16/11] sm:aspect-[16/10]')} {/* Organizing Donations */}
          </div>

          {/* ─── Column 3 (Right) ─── */}
          <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
            {renderCard(walkWays[2], 2, 'aspect-[16/9.5] sm:aspect-[16/9]')}  {/* Supporting the Experience */}
            {renderCard(walkWays[5], 5, 'aspect-[16/12] sm:aspect-[16/11]')} {/* Simply Showing Up (Taller!) */}
          </div>

        </div>

      </div>

      {/* ─── Interactive Lightbox Dialog on Card Click ─── */}
      <AnimatePresence>
        {activeCardIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveCardIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden border border-[#DBCAB0] bg-[#FAF4E6] shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveCardIdx(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous card"
                className="absolute left-4 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next card"
                className="absolute right-4 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="w-full h-[260px] sm:h-[300px] overflow-hidden bg-black/10">
                <img
                  src={walkWays[activeCardIdx].image}
                  alt={walkWays[activeCardIdx].title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Modal Text Content */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#F97316] font-semibold tracking-widest uppercase">
                  <span>Pathway {activeCardIdx + 1} of {walkWays.length}</span>
                  <span className="text-[#8F6629]">Serve Beside Us</span>
                </div>

                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-2xl sm:text-3xl font-normal text-[#1C140D]"
                >
                  {walkWays[activeCardIdx].title}
                </h3>

                <p className="text-[#F97316] text-sm font-medium">
                  {walkWays[activeCardIdx].description}
                </p>

                <p className="text-[#554637] text-sm leading-relaxed font-light">
                  {walkWays[activeCardIdx].extendedText}
                </p>

                <div className="pt-3 flex items-center justify-end">
                  <Link
                    to={walkWays[activeCardIdx].ctaLink}
                    onClick={() => setActiveCardIdx(null)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all hover:scale-105"
                  >
                    <span>{walkWays[activeCardIdx].ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

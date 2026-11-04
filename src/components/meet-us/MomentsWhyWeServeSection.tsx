import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Heart } from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';

// Exact 1:1 Figma exported assets
import figmaGarden from '@/assets/meet-us/gallery/figma-card-garden.png';
import figmaChildren from '@/assets/meet-us/gallery/figma-card-children.png';
import figmaHands from '@/assets/meet-us/gallery/figma-card-hands.png';
import figmaDonation from '@/assets/meet-us/gallery/figma-card-donation.png';
import figmaTeacher from '@/assets/meet-us/gallery/figma-card-teacher.png';
import figmaFamily from '@/assets/meet-us/gallery/figma-card-family.png';
import figmaYouth from '@/assets/meet-us/gallery/figma-card-youth.png';
import figmaThankYou from '@/assets/meet-us/gallery/figma-card-thankyou.png';
import figmaMeal from '@/assets/meet-us/gallery/figma-card-meal.png';
import figmaRice from '@/assets/meet-us/gallery/figma-card-rice.png';

export interface GalleryCardData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  alt: string;
  story: string;
}

interface ColumnData {
  id: string;
  widthClass: string;
  topCard: {
    data: GalleryCardData;
    heightClass: string;
  };
  bottomCard: {
    data: GalleryCardData;
    heightClass: string;
  };
}

// 5 Columns matching Figma's exact variable-height bento geometry (sum = 591px per column)
const figmaColumns: ColumnData[] = [
  // Column 1 (309w): Top: Garden (343h) | Bottom: Family (248h)
  {
    id: 'col-1',
    widthClass: 'w-[250px] sm:w-[280px] lg:w-[309px]',
    topCard: {
      data: {
        id: 'garden',
        title: 'Together, We Grow',
        subtitle: 'Community Gardens & Sustainability',
        category: 'Community Agriculture',
        image: figmaGarden,
        alt: 'Together We Grow community garden banner and volunteers',
        story: 'Fresh local produce grown by neighbors for neighbors, turning idle soil into nutrient-rich harvests for over 1,200 local families.',
      },
      heightClass: 'h-[250px] sm:h-[300px] lg:h-[343px]',
    },
    bottomCard: {
      data: {
        id: 'family',
        title: 'Quiet Connections',
        subtitle: 'Walking Alongside Families',
        category: 'Family Support',
        image: figmaFamily,
        alt: 'Community volunteers in conversation with family outdoors',
        story: 'True service begins in unhurried conversations—listening closely and offering real companionship through life transitions.',
      },
      heightClass: 'h-[180px] sm:h-[215px] lg:h-[248px]',
    },
  },
  // Column 2 (402w): Top: Smiling Children (290h) | Bottom: Youth (301h)
  {
    id: 'col-2',
    widthClass: 'w-[310px] sm:w-[360px] lg:w-[402px]',
    topCard: {
      data: {
        id: 'children',
        title: 'Joyful Futures',
        subtitle: 'Safe Spaces for Every Child',
        category: 'Youth Development',
        image: figmaChildren,
        alt: 'Group of smiling children gathering together',
        story: 'After-school programs, trauma-informed mentorship, and safe havens where children discover their potential without fear.',
      },
      heightClass: 'h-[210px] sm:h-[250px] lg:h-[290px]',
    },
    bottomCard: {
      data: {
        id: 'youth',
        title: 'The Next Generation',
        subtitle: 'Youth Stepping Up to Serve',
        category: 'Youth Leadership',
        image: figmaYouth,
        alt: 'Young woman in blue community shirt smiling at camera',
        story: 'Over 200 young adults actively leading service days, food drives, and peer mentorship networks in their own neighborhoods.',
      },
      heightClass: 'h-[220px] sm:h-[260px] lg:h-[301px]',
    },
  },
  // Column 3 (402w): Top: Hands in Circle (343h) | Bottom: Thank You Sign (248h)
  {
    id: 'col-3',
    widthClass: 'w-[310px] sm:w-[360px] lg:w-[402px]',
    topCard: {
      data: {
        id: 'hands',
        title: 'United in Purpose',
        subtitle: 'The Power of Many Hands',
        category: 'Movement',
        image: figmaHands,
        alt: 'Circle of hands reaching together holding an origami dove',
        story: 'When faith communities, local leaders, and volunteers join hands, collective compassion becomes unstoppable change.',
      },
      heightClass: 'h-[250px] sm:h-[300px] lg:h-[343px]',
    },
    bottomCard: {
      data: {
        id: 'thank-you',
        title: 'Heartfelt Gratitude',
        subtitle: '8,000+ Community Voices',
        category: 'Impact Stories',
        image: figmaThankYou,
        alt: 'Three smiling boys holding a Thank You chalkboard sign',
        story: 'Every donation and hour of volunteered time creates ripples of tangible gratitude across homes, schools, and neighborhood tables.',
      },
      heightClass: 'h-[180px] sm:h-[215px] lg:h-[248px]',
    },
  },
  // Column 4 (402w): Top: Food Donation (290h) | Bottom: Warm Meal (301h)
  {
    id: 'col-4',
    widthClass: 'w-[310px] sm:w-[360px] lg:w-[402px]',
    topCard: {
      data: {
        id: 'donation',
        title: 'Food Dignity',
        subtitle: 'Care Packages with Respect',
        category: 'Nutrition Relief',
        image: figmaDonation,
        alt: 'Volunteers at donation box table handing packages to neighbors',
        story: 'Eliminating the stigma of food insecurity through warm, welcoming distribution hubs where every recipient is treated like family.',
      },
      heightClass: 'h-[210px] sm:h-[250px] lg:h-[290px]',
    },
    bottomCard: {
      data: {
        id: 'meal',
        title: 'A Warm Seat',
        subtitle: '12,400+ Meals Shared Together',
        category: 'Food Dignity',
        image: figmaMeal,
        alt: 'Volunteer serving a hot nutritious plate of food to elder neighbor',
        story: 'More than hot food—a warm plate is an affirmation of dignity, letting someone know they are never forgotten.',
      },
      heightClass: 'h-[220px] sm:h-[260px] lg:h-[301px]',
    },
  },
  // Column 5 (309w): Top: Teacher Blackboard (343h) | Bottom: Hands with Rice (248h)
  {
    id: 'col-5',
    widthClass: 'w-[250px] sm:w-[280px] lg:w-[309px]',
    topCard: {
      data: {
        id: 'teacher',
        title: 'Empowering Minds',
        subtitle: 'Classroom Mentorship & Literacy',
        category: 'Education',
        image: figmaTeacher,
        alt: 'Teacher at chalkboard guiding attentive students',
        story: 'Equipping teachers and students with supplies, tutoring, and emotional support so every young learner believes in tomorrow.',
      },
      heightClass: 'h-[250px] sm:h-[300px] lg:h-[343px]',
    },
    bottomCard: {
      data: {
        id: 'rice',
        title: 'Sustenance & Dignity',
        subtitle: 'Wholesome Grains & Essentials',
        category: 'Pantry Support',
        image: figmaRice,
        alt: 'Cupped hands holding wholesome white grains of rice',
        story: 'Ensuring pantry staples, grains, and clean essentials reach those enduring hard seasons, restoring stability one household at a time.',
      },
      heightClass: 'h-[180px] sm:h-[215px] lg:h-[248px]',
    },
  },
];

// 4 complete sets ensure infinite, seamless looping across all screen sizes
const repeatedColumns = [
  ...figmaColumns,
  ...figmaColumns,
  ...figmaColumns,
  ...figmaColumns,
];

export interface MomentsWhyWeServeSectionProps {
  id?: string;
  className?: string;
}

export default function MomentsWhyWeServeSection({
  id = 'moments-why-we-serve',
  className = '',
}: MomentsWhyWeServeSectionProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryCardData | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-28 overflow-hidden select-none ${className}`}
    >
      {/* ─── Seamless Left-to-Right CSS Marquee Animation ─── */}
      <style>{`
        @keyframes marqueeLToR {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        .gallery-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeLToR 45s linear infinite;
        }
        .gallery-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ─── Header: Matching Figma 1:1 Layout & Typography ─── */}
      <div className="max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-14 mb-8 sm:mb-12 lg:mb-14">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 sm:gap-10">
          {/* Left Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-left flex-1 min-w-0"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-semibold leading-[1.22] tracking-tight">
              <span className="block text-[#272624]">
                The people, places, and moments
              </span>
              <span className="block text-[#746343] mt-1 sm:mt-2">
                that remind us why we serve.
              </span>
            </h2>
          </motion.div>

          {/* Right Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-left sm:text-right shrink-0 self-start sm:self-auto"
          >
            <p className="text-[#18181B] font-sans font-bold text-base sm:text-lg lg:text-[19px] leading-snug">
              Every person has a<br className="hidden sm:inline" /> part in the story.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Gallery Section: 100% Full-Width Edge-to-Edge Moving Left to Right ─── */}
      <div className="w-full overflow-hidden">
        <div className="gallery-marquee-track gap-3.5 sm:gap-4 lg:gap-5">
          {repeatedColumns.map((col, idx) => (
            <div
              key={`${col.id}-${idx}`}
              className={`flex flex-col gap-3.5 sm:gap-4 lg:gap-4.5 ${col.widthClass} shrink-0`}
            >
              {/* ─── Top Card ─── */}
              <div
                onClick={() => setSelectedItem(col.topCard.data)}
                className={`group relative ${col.topCard.heightClass} w-full rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] overflow-hidden border border-[#D2C9B5]/80 bg-stone-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(249,115,22,0.22)] hover:border-[#F97316] transition-all duration-300 hover:scale-[1.02]`}
              >
                <img
                  src={col.topCard.data.image}
                  alt={col.topCard.data.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Caption Details */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-left text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#F97316] font-sans font-semibold">
                    {col.topCard.data.category}
                  </span>
                  <h4
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-sm sm:text-base font-bold leading-tight mt-0.5"
                  >
                    {col.topCard.data.title}
                  </h4>
                  <p className="text-[11px] text-stone-200 line-clamp-1 mt-0.5 font-sans">
                    {col.topCard.data.subtitle}
                  </p>
                </div>

                {/* Top Right Zoom Badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 z-10">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* ─── Bottom Card ─── */}
              <div
                onClick={() => setSelectedItem(col.bottomCard.data)}
                className={`group relative ${col.bottomCard.heightClass} w-full rounded-[18px] sm:rounded-[22px] lg:rounded-[24px] overflow-hidden border border-[#D2C9B5]/80 bg-stone-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(249,115,22,0.22)] hover:border-[#F97316] transition-all duration-300 hover:scale-[1.02]`}
              >
                <img
                  src={col.bottomCard.data.image}
                  alt={col.bottomCard.data.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Caption Details */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-left text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-[#F97316] font-sans font-semibold">
                    {col.bottomCard.data.category}
                  </span>
                  <h4
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-sm sm:text-base font-bold leading-tight mt-0.5"
                  >
                    {col.bottomCard.data.title}
                  </h4>
                  <p className="text-[11px] text-stone-200 line-clamp-1 mt-0.5 font-sans">
                    {col.bottomCard.data.subtitle}
                  </p>
                </div>

                {/* Top Right Zoom Badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 z-10">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Lightbox Modal for Card Details ─── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#FAF4E6] rounded-[28px] overflow-hidden shadow-2xl border border-[#E5DAC3]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#F97316] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-[320px] sm:h-[380px] bg-stone-900">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.alt}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-sans uppercase tracking-wider font-semibold">
                  {selectedItem.category}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-2xl sm:text-3xl font-bold text-[#272624] leading-tight"
                >
                  {selectedItem.title}
                </h3>
                <p className="text-sm font-sans text-[#746343] font-semibold mt-1">
                  {selectedItem.subtitle}
                </p>
                <p className="text-stone-700 font-sans text-sm sm:text-base leading-relaxed mt-4">
                  {selectedItem.story}
                </p>

                <div className="mt-6 pt-5 border-t border-[#E5DAC3] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
                    <Heart className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                    <span>Live Achieve Believe Community Action</span>
                  </div>
                  <FigmaButton
                    variant="primary"
                    to="/movement"
                    size="sm"
                  >
                    Support This Work
                  </FigmaButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

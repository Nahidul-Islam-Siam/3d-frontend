import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logoIcon from '@/assets/logo/logo-icon.png';
import faceChild from '@/assets/join-movement/faces/face_child_running.png';
import faceSculptor from '@/assets/join-movement/faces/face_sculptor.png';
import faceFlowers from '@/assets/join-movement/faces/face_flowers.png';
import faceFamily from '@/assets/join-movement/faces/face_family_living_room.png';
import faceStudent from '@/assets/join-movement/faces/face_student.png';
import faceHandshake from '@/assets/join-movement/faces/face_handshake.png';
import faceCommunity from '@/assets/join-movement/faces/face_community_hub.png';

export interface FacesOfMovementSectionProps {
  id?: string;
  className?: string;
}

interface FaceStory {
  id: string;
  image: string;
  title: string;
  quote: string;
  role: string;
}

// Exactly ordered to match reference image 3: [Child, Sculptor, Flowers, Family (Center), Student, Handshake, Community]
const stories: FaceStory[] = [
  {
    id: 'story-child',
    image: faceChild,
    title: 'Unbroken laughter . A brighter horizon.',
    quote: '“ For the first time in two years, my daughter runs across the grass without fear. Seeing her smile freely again is the greatest gift this community has given our family. ”',
    role: 'Family Respite Retreat',
  },
  {
    id: 'story-sculptor',
    image: faceSculptor,
    title: 'Restoring hands . Renewing hope.',
    quote: '“ After losing my job, my hands felt useless. Mentoring young people in the woodshop taught me that when you help someone build their future, you heal your own. ”',
    role: 'Youth Apprenticeship Mentor',
  },
  {
    id: 'story-flowers',
    image: faceFlowers,
    title: 'A single blossom . A lifelong bond.',
    quote: '“ Mrs. Gable had not received visitors in months. When I dropped off flowers on her stoop, she looked up with tears and said: ‘Someone remembered me.’ That was the turning point. ”',
    role: 'Neighbor Stoop Outreach',
  },
  {
    id: 'story-family',
    image: faceFamily,
    title: 'I came to help . I found family.',
    quote: '“ I thought I was dropping off extra canned goods before work. Three years later, the teenagers who sit around my prep table have become my own children in spirit. ”',
    role: 'Community Living Circle',
  },
  {
    id: 'story-student',
    image: faceStudent,
    title: 'Finding my voice . Guiding tomorrow.',
    quote: '“ As a first-generation college student, I felt completely invisible. Coming here to tutor high school girls gave me a courage and purpose I never knew I was carrying. ”',
    role: 'Campus Mentorship Hub',
  },
  {
    id: 'story-handshake',
    image: faceHandshake,
    title: 'Dignity restored . Eye to eye.',
    quote: '“ People usually walk past without looking down. But Marcus stopped, knelt down on the sidewalk, and offered his hand. He treated me like a brother. That handshake changed everything. ”',
    role: 'Street Fellowship Partner',
  },
  {
    id: 'story-community',
    image: faceCommunity,
    title: 'A warm plate . An open seat.',
    quote: '“ The kitchen is where barriers melt away. When we sit together over a home-cooked meal, there are no strangers — only neighbors who haven’t heard each other’s names yet. ”',
    role: 'Harvest Kitchen Coordinator',
  },
];

// Tripled array for seamless infinite looping in both directions
const allStories = [...stories, ...stories, ...stories];

export default function FacesOfMovementSection({ 
  id = 'faces-of-movement', 
  className = '' 
}: FacesOfMovementSectionProps) {
  // Start centered on story-family in the middle set (index 10)
  const [activeIndex, setActiveIndex] = useState<number>(stories.length + 3);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    containerWidth: 1400,
    sideWidth: 282,
    centerWidth: 440,
    gap: 24,
  });

  // Calculate responsive card dimensions
  const updateDimensions = useCallback(() => {
    const width = containerRef.current?.offsetWidth || window.innerWidth;
    let sideW = 282;
    let centerW = 440;
    let g = 24;

    if (width < 640) {
      sideW = 160;
      centerW = Math.min(340, width - 40);
      g = 14;
    } else if (width < 1024) {
      sideW = 230;
      centerW = 390;
      g = 20;
    }

    setDimensions({
      containerWidth: width,
      sideWidth: sideW,
      centerWidth: centerW,
      gap: g,
    });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Autoplay interval (advances every 4 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;
        // When reaching the end of the second set, cycle back cleanly
        if (next >= stories.length * 2) {
          return stories.length;
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Calculate track offset so the active card is centered horizontally
  const { containerWidth, sideWidth, centerWidth, gap } = dimensions;
  
  // Calculate center of active card along the track
  // All cards prior to activeIndex are rendered as sideWidth
  const centerOfActive = (activeIndex * (sideWidth + gap)) + (centerWidth / 2);
  const trackOffset = (containerWidth / 2) - centerOfActive;

  const handlePrev = () => {
    setActiveIndex((prev) => {
      if (prev <= 0) return stories.length * 2 - 1;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      if (prev >= allStories.length - 1) return stories.length;
      return prev + 1;
    });
  };

  const currentStoryRealIndex = activeIndex % stories.length;

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#0D0906] text-white py-20 sm:py-28 overflow-hidden select-none flex flex-col items-center justify-center ${className}`}
    >
      {/* ─── Ambient Warm Subtle Radial Glow ─── */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ─── Top Header (Exact Match to Figma Reference) ─── */}
      <div className="max-w-[1380px] w-full mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 relative z-10">
        <div className="text-left space-y-2">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[0.10em] leading-tight"
          >
            Faces Of The<br />
            Movement
          </h2>
        </div>

        <div className="text-left sm:text-right max-w-sm">
          <p className="text-xs sm:text-sm lg:text-[14.5px] text-stone-300 font-sans font-light leading-relaxed">
            No glossy resumes. Just honest turning points from neighbors who answered the whisper.
          </p>
        </div>
      </div>

      {/* ─── Autoplay Carousel Stage with Highlighted Middle Card ─── */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden py-4 sm:py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Moving Track - Top Aligned for Exact Horizon Match */}
        <div
          className="flex items-start transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] will-change-transform"
          style={{
            transform: `translateX(${trackOffset}px)`,
            gap: `${gap}px`,
          }}
        >
          {allStories.map((story, idx) => {
            const isCenter = idx === activeIndex;

            if (isCenter) {
              // ─── ACTIVE CENTER CARD: Full Details + Dashed Border (Exact Match to Figma) ───
              return (
                <div
                  key={`${story.id}-${idx}`}
                  style={{ width: `${centerWidth}px` }}
                  className="relative shrink-0 border-[1.5px] border-dashed border-white/40 rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 bg-[#16100A]/95 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-left flex flex-col justify-between transition-all duration-500 z-20 cursor-default"
                >
                  {/* Photo with Monogram Logo Watermark */}
                  <div className="relative w-full aspect-[354/240] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-md bg-stone-900">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                    {/* Elegant Live Achieve Believe Monogram Badge */}
                    <div className="absolute top-3 left-3 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      <img
                        src={logoIcon}
                        alt="Live Achieve Believe"
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain brightness-0 invert opacity-90 drop-shadow-md"
                      />
                    </div>
                  </div>

                  {/* Headline Title */}
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg sm:text-xl lg:text-[23px] font-bold text-white tracking-wide mt-4 sm:mt-5 mb-2 leading-snug"
                  >
                    {story.title}
                  </h3>

                  {/* Narrative Quote */}
                  <p className="text-xs sm:text-[13.5px] text-stone-300 font-sans font-light leading-relaxed mb-1">
                    {story.quote}
                  </p>
                </div>
              );
            }

            // ─── SIDE CARDS: Rounded Photo Only (Clickable to Center) ───
            return (
              <div
                key={`${story.id}-${idx}`}
                onClick={() => setActiveIndex(idx)}
                style={{ 
                  width: `${sideWidth}px`,
                  height: dimensions.containerWidth < 640 ? '160px' : '240px'
                }}
                className="relative shrink-0 rounded-[18px] sm:rounded-[24px] overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-all duration-400 group shadow-lg border border-white/10 z-10"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* ─── Floating Subtle Left & Right Arrow Navigation Controls ─── */}
        <button
          type="button"
          aria-label="Previous story"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-white text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-xl backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          aria-label="Next story"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-white text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-xl backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ─── Bottom Navigation Dots Indicator ─── */}
      <div className="flex items-center gap-2 mt-6 sm:mt-8 relative z-10">
        {stories.map((story, dotIdx) => {
          const isActive = dotIdx === currentStoryRealIndex;
          return (
            <button
              key={story.id}
              type="button"
              aria-label={`Jump to ${story.title}`}
              onClick={() => {
                // Find nearest index matching this story in the tripled array
                const target = stories.length + dotIdx;
                setActiveIndex(target);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive 
                  ? 'w-7 sm:w-8 h-2 bg-[#F97316] shadow-[0_0_12px_rgba(249,115,22,0.6)]' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}

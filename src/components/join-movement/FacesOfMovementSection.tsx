import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
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

// Exactly ordered to match reference image: [Child, Sculptor, Flowers, Family (Center), Student, Handshake, Community]
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

export default function FacesOfMovementSection({ 
  id = 'faces-of-movement', 
  className = '' 
}: FacesOfMovementSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(3);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Initialize Embla Carousel with true infinite loop, center alignment, and smooth inertia
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    startIndex: 3,
    duration: 35,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay interval (advances every 4.5 seconds smoothly)
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

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

      {/* ─── Buttery Smooth Embla Carousel Stage with Center Active Highlight ─── */}
      <div 
        className="relative w-full overflow-hidden py-4 sm:py-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Embla Viewport (supports drag, touch gesture, and smooth spring physics) */}
        <div ref={emblaRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
          {/* Moving Track */}
          <div className="flex items-start">
            {stories.map((story, idx) => {
              const isCenter = idx === selectedIndex;

              return (
                <div
                  key={story.id}
                  onClick={() => scrollTo(idx)}
                  className="flex-[0_0_320px] sm:flex-[0_0_380px] lg:flex-[0_0_440px] min-w-0 px-2 sm:px-3 lg:px-3.5"
                >
                  <div
                    className={`relative rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 transition-all duration-500 ease-out select-none cursor-pointer text-left flex flex-col justify-between ${
                      isCenter
                        ? 'border-[1.5px] border-dashed border-white/40 bg-[#16100A]/95 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.8)] scale-100 opacity-100 z-20'
                        : 'border border-transparent bg-transparent scale-[0.88] opacity-45 hover:opacity-80 z-10'
                    }`}
                  >
                    {/* Photo with Monogram Logo Watermark */}
                    <div className="relative w-full aspect-[354/240] rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-md bg-stone-900 shrink-0">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Elegant Live Achieve Believe Monogram Badge */}
                      <div 
                        className={`absolute top-3 left-3 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-opacity duration-500 ${
                          isCenter ? 'opacity-90' : 'opacity-0'
                        }`}
                      >
                        <img
                          src={logoIcon}
                          alt="Live Achieve Believe"
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain brightness-0 invert drop-shadow-md"
                        />
                      </div>
                    </div>

                    {/* Content smoothly transitions when active / center */}
                    <div 
                      className={`transition-all duration-500 ease-out overflow-hidden ${
                        isCenter 
                          ? 'max-h-[320px] opacity-100 mt-4 sm:mt-5' 
                          : 'max-h-0 opacity-0 mt-0 pointer-events-none'
                      }`}
                    >
                      {/* Headline Title */}
                      <h3
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-lg sm:text-xl lg:text-[23px] font-bold text-white tracking-wide mb-2 leading-snug"
                      >
                        {story.title}
                      </h3>

                      {/* Narrative Quote */}
                      <p className="text-xs sm:text-[13.5px] text-stone-300 font-sans font-light leading-relaxed mb-1">
                        {story.quote}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Floating Subtle Left & Right Arrow Navigation Controls ─── */}
        <button
          type="button"
          aria-label="Previous story"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-white text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-xl backdrop-blur-sm active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          type="button"
          aria-label="Next story"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/25 hover:border-white text-white flex items-center justify-center transition-all z-30 cursor-pointer shadow-xl backdrop-blur-sm active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ─── Bottom Navigation Dots Indicator ─── */}
      <div className="flex items-center gap-2 mt-6 sm:mt-8 relative z-10">
        {stories.map((story, dotIdx) => {
          const isActive = dotIdx === selectedIndex;
          return (
            <button
              key={story.id}
              type="button"
              aria-label={`Jump to ${story.title}`}
              onClick={() => scrollTo(dotIdx)}
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

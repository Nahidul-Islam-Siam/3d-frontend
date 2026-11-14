import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import subtractImg from "@/assets/experience-story/Subtract.png";
import slide2Img from "@/assets/experience-story/Subtract-slide-2.png";
import slide3Img from "@/assets/experience-story/Subtract-slide-3.png";

export interface WhereJourneyBeganSectionProps {
  id?: string;
  className?: string;
  customImages?: Array<{ src: string; alt?: string; caption?: string }>;
}

export default function WhereJourneyBeganSection({
  id = "where-the-journey-began",
  className = "",
  customImages,
}: WhereJourneyBeganSectionProps) {
  const images = customImages && customImages.length > 0 ? customImages : [
    {
      src: subtractImg,
      alt: "Founder sitting by the window reflecting on the journey",
      caption: "Where the journey began",
    },
    {
      src: slide2Img,
      alt: "Community moments and leadership throughout the mission",
      caption: "A foundation of compassion and faith",
    },
    {
      src: slide3Img,
      alt: "Discovering purpose and empowering future generations",
      caption: "Discovering purpose along the way",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play timer (advances every 5s, pauses on hover)
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, images.length]);

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 xl:px-20 scroll-mt-24 select-none ${className}`}
    >
      <div className="w-full max-w-[1360px] xl:max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#141414] tracking-tight mb-12 sm:mb-16 lg:mb-20 text-left"
        >
          Where the Journey Began
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">
          
          {/* ─── Left Column: Sticky Pinned Container (Sticks while right story scrolls) ─── */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 xl:top-28 z-20 self-start">
            <div 
              className="relative isolate w-full max-w-[390px] sm:max-w-[430px] lg:max-w-[410px] xl:max-w-[450px] mx-auto lg:mx-0 group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Orange Geometric Accent Card (Behind) */}
              <div 
                className="absolute -top-3 -bottom-3 -left-4 sm:-left-6 right-8 sm:right-10 bg-[#E06A26] rounded-[24px] sm:rounded-[32px] z-0 transform -rotate-1 shadow-md transition-transform duration-300 group-hover:-rotate-2" 
                aria-hidden="true"
              />

              {/* Slider Image Container (No Background Color, Pure Transparent Cutout) */}
              <div className="relative z-10 w-full aspect-[635/912] drop-shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt || "Story photograph"}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-contain block select-none pointer-events-none"
                    loading="eager"
                    decoding="async"
                  />
                </AnimatePresence>

                {/* Navigation Arrows (Visible on hover or mobile) */}
                {images.length > 1 && (
                  <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-between pointer-events-none px-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 pointer-events-auto cursor-pointer shadow-md"
                      aria-label="Previous story photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 pointer-events-auto cursor-pointer shadow-md"
                      aria-label="Next story photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Minimal Bottom Indicators (No Counting Badge) */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? "w-5 bg-[#E06A26]"
                            : "w-1.5 bg-white/60 hover:bg-white"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Floating Quote Callout (Bottom-Right Overlap) */}
              <div
                className="absolute -bottom-8 -right-2 sm:-bottom-10 sm:-right-6 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border border-[#E8DEC7] shadow-[0_14px_36px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl p-4 sm:p-5 max-w-[270px] sm:max-w-[310px]"
              >
                <div className="border-l-[3.5px] border-[#E06A26] pl-3.5 sm:pl-4">
                  <p className="font-serif italic text-xs sm:text-[13px] lg:text-[13.5px] text-[#222222] font-medium leading-[1.6]">
                    Your circumstances may be part of your story, but they do not have to determine its ending.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Column: Story Narrative ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col text-left space-y-6 sm:space-y-7 text-[#444444] font-sans text-xs sm:text-sm lg:text-[14.5px] leading-[1.72]"
          >
            {/* Opening Chapter */}
            <div className="space-y-3.5">
              <p>
                Long before Live Achieve Believe became an organization, its founder was discovering the meaning of perseverance, compassion, and faith.
              </p>
              <p>
                At just ten years old, she experienced the profound loss of someone who had been a pillar in her life. Someone whose presence had represented love, strength, and stability.
              </p>
              <p>
                It was a life-changing moment at an age when the world should have felt full of endless possibilities.
              </p>
            </div>

            {/* Subheading 1 */}
            <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[22px] text-[#141414] pt-2">
              But her journey was only beginning.
            </h3>

            {/* Missionary & Hardship */}
            <div className="space-y-3.5">
              <p>
                By the age of eleven, she had stepped into the world of foreign missionary service, walking alongside individuals navigating mental-health challenges while learning to navigate struggles of her own.
              </p>
              <p>
                Over the years, life would take her through circumstances that few could imagine.
              </p>
            </div>

            {/* Personal Seasons (With delicate dividers) */}
            <div className="space-y-3 pt-1">
              <div className="border-b border-[#E8DFC9] pb-3">
                <p>She experienced homelessness.</p>
              </div>
              <div className="border-b border-[#E8DFC9] pb-3">
                <p>She knew what it meant to be hungry.</p>
              </div>
              <div className="border-b border-[#E8DFC9] pb-3">
                <p>
                  She endured significant abuse and faced seasons when the road ahead seemed uncertain.
                </p>
              </div>
              <p className="pt-1">
                Yet even in those difficult chapters, she continued searching for ways to move forward.
              </p>
            </div>

            {/* Subheading 2 */}
            <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[22px] text-[#141414] pt-4">
              Her faith became an anchor.
            </h3>

            <div className="space-y-3.5">
              <p>
                By the age of eleven, she had stepped into the world of foreign missionary service, walking alongside individuals navigating mental-health challenges while learning to navigate struggles of her own.
              </p>
              <p>
                Over the years, life would take her through circumstances that few could imagine.
              </p>
            </div>

            {/* Three Pillars: Prayer, Reading, Exercise */}
            <div className="space-y-3 pt-1">
              <div className="border-b border-[#E8DFC9] pb-3">
                <p className="font-semibold text-[#141414] mb-0.5">Prayer</p>
                <p>Prayer offered moments of peace and connection with God.</p>
              </div>
              <div className="border-b border-[#E8DFC9] pb-3">
                <p className="font-semibold text-[#141414] mb-0.5">Reading</p>
                <p>Reading opened doors to understanding, reflection, and possibilities beyond her circumstances.</p>
              </div>
              <div className="border-b border-[#E8DFC9] pb-3">
                <p className="font-semibold text-[#141414] mb-0.5">Exercise</p>
                <p>Exercise became an outlet for releasing stress, regaining focus, and strengthening her resolve.</p>
              </div>
            </div>

            {/* Lessons & Growth */}
            <div className="space-y-3.5 pt-2">
              <p>
                Step by step, she learned that moving through a difficult season did not mean having every answer. Sometimes it meant finding the courage to take the next step, even when the entire path was not yet visible.
              </p>
              <p>
                And somewhere along that journey, a belief began to grow stronger.
              </p>
              <div className="border-b border-[#E8DFC9] pb-4">
                <p>
                  The little girl who encountered grief so early in life would grow into a woman whose heart remained open to the needs of others.
                </p>
              </div>
            </div>

            {/* Closing Manifesto */}
            <div className="space-y-2 pt-2 text-[#222222] font-medium">
              <p>A woman who understood that dignity matters.</p>
              <p>That kindness matters.</p>
              <p>That hope matters.</p>
              <p className="text-[#444444] font-normal pt-1">
                And that sometimes the smallest gesture can remind someone of their own strength.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

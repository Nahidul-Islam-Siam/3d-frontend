import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

export interface StoriesFromTheTableSectionProps {
  id?: string;
  className?: string;
}

interface TestimonialQuote {
  id: string;
  quote: string;
  author: string;
  role: string;
  initial: string;
}

const testimonials: TestimonialQuote[] = [
  {
    id: 'marcus-henderson',
    quote:
      '“I spent three years eating out of paper bags on curbs. The first day I walked in here, someone pulled out an actual wooden chair, called me Mr. Henderson, poured hot coffee in a real ceramic mug, and asked how my morning was. I didn\'t cry because of the food. I cried because someone remembered I was a man.”',
    author: 'Marcus Henderson',
    role: 'GUEST TURNED VOLUNTEER · 14 MONTHS',
    initial: 'M',
  },
  {
    id: 'elena-rostova',
    quote:
      '“After moving here with nothing, finding this table felt like exhaling for the first time in months. Nobody asked what I had to give or judged why I came. They just made room, looked me in the eyes, and reminded my daughters and me that we have a family right here.”',
    author: 'Elena Rostova',
    role: 'COMMUNITY MEMBER · 8 MONTHS',
    initial: 'E',
  },
  {
    id: 'david-chen',
    quote:
      '“You come thinking you are serving someone else, and within ten minutes you realize they are filling your soul. Sharing a meal breaks down every barrier. We sit down as strangers and by the end of dessert, we belong to one another.”',
    author: 'David Chen',
    role: 'VOLUNTEER & TABLE HOST · 2 YEARS',
    initial: 'D',
  },
];

export default function StoriesFromTheTableSection({
  id = 'stories-from-the-table',
  className = '',
}: StoriesFromTheTableSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,            
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-14 sm:py-20 lg:py-28 px-4 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto">
        
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#272624',
              lineHeight: 'normal',
            }}
            className="text-3xl sm:text-4xl lg:text-[48px] font-semibold tracking-tight"
          >
            Stories From the Table
          </h2>
        </motion.div>

        {/* ─── Embla Carousel Container ─── */}
        <div className="mt-12 sm:mt-16 lg:mt-20 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 sm:gap-7 lg:gap-8">
            {testimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-[0_0_90%] sm:flex-[0_0_58%] lg:flex-[0_0_38%] min-w-0"
              >
                {/* Testimonial Card (Matches Figma 1:1) */}
                <div className="h-full bg-white rounded-[22px] sm:rounded-[26px] p-5 sm:p-7 md:p-9 border border-[#EFE5D2] shadow-[0_10px_32px_rgba(44,36,29,0.04)] hover:shadow-[0_16px_44px_rgba(44,36,29,0.08)] transition-all duration-300 flex flex-col justify-between">
                  
                  {/* Top Quote Icon & Testimonial Paragraph */}
                  <div>
                    {/* Double Quote Graphic */}
                    <div className="mb-4 text-[#0B0B0A]" aria-hidden="true">
                      <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 opacity-90">
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
                      </svg>
                    </div>

                    {/* Testimonial Quote */}
                    <p
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                      className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#4A3E31] leading-relaxed font-normal"
                    >
                      {item.quote}
                    </p>
                  </div>

                  {/* Bottom Divider & Author Details */}
                  <div className="mt-6 sm:mt-8 pt-4 border-t border-[#EFE5D2]">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar Circle with Initial */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EFE5D2] text-[#594B3C] flex items-center justify-center font-sans font-bold text-xs sm:text-sm shrink-0">
                        {item.initial}
                      </div>

                      {/* Author Name and Subtitle Role */}
                      <div className="flex flex-col text-left">
                        <span
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          className="font-bold text-sm sm:text-[15px] text-[#0B0B0A] leading-tight"
                        >
                          {item.author}
                        </span>
                        <span
                          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                          className="text-[10px] sm:text-[11px] text-[#8C7A65] tracking-wider uppercase font-medium mt-0.5"
                        >
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Pagination Dots ─── */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                selectedIndex === i
                  ? 'bg-[#A89882] w-6'
                  : 'bg-[#EADBCA] hover:bg-[#C8B89E] w-2'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}


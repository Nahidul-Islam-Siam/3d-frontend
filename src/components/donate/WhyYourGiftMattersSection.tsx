import { useEffect, useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import Coin3DCanvas from './Coin3DCanvas';
import story1 from '@/assets/donate/story-1-living-room.png';
import story2 from '@/assets/donate/story-2-woodworking.png';
import story3 from '@/assets/donate/story-3-robotics.png';

const stories = [
  {
    id: 1,
    title: 'Creating spaces where people feel welcomed and seen.',
    narrative:
      'Isolation is the quietest crisis of our neighborhoods. Your gifts sustain open, unpoliced living rooms where unhoused neighbors, single parents, and young creatives gather without judgment or prerequisites.',
    image: story1,
    alt: 'Neighbors gathered together in a welcoming community living room',
    side: 'Heads',
  },
  {
    id: 2,
    title: 'Coming alongside people when they need someone to believe in them.',
    narrative:
      'Mentorship isn’t a curriculum; it’s consistency. When someone steps forward to rebuild their life, our mentors walk shoulder-to-shoulder with them through craft, trades, and personal healing.',
    image: story2,
    alt: 'A woodworking mentor and apprentice working together in a workshop',
    side: 'The edge',
  },
  {
    id: 3,
    title: 'Helping make the next chapter possible.',
    narrative:
      'Tools, apprenticeships, studio time, and licensing funds. When a community member determines their pathway forward, your gift ensures that poverty of capital does not extinguish courage.',
    image: story3,
    alt: 'Young people building a robotics project together in STEM laboratory',
    side: 'Tails',
  },
];

export default function WhyYourGiftMattersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const storiesTrackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: storiesTrackRef,
    offset: ['start center', 'end center'],
  });

  // Butter-smooth spring damping for realistic coin rotation
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.0001,
  });

  useEffect(() => {
    progressRef.current = smoothed.get();
    return smoothed.on('change', (value) => {
      progressRef.current = Math.max(0, Math.min(1, value));
    });
  }, [smoothed]);

  return (
    <section
      ref={sectionRef}
      id="why-your-gift-matters"
      className="relative w-full bg-[#08070B] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-16 xl:px-24 select-none"
      aria-label="Why Your Gift Matters Stories"
    >
      {/* ─── Ambient Warm Golden Atmosphere (Matching Figma Glow) ─── */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] lg:w-[1100px] h-[800px] lg:h-[1100px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, rgba(217, 119, 6, 0.06) 45%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* ─── Header: Left Title | Right Narrative (Exact Figma) ─── */}
        <header className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-12 border-b border-white/15">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.05] uppercase"
          >
            WHY YOUR GIFT<br />MATTERS
          </h2>
          <p className="text-stone-300 text-[13px] sm:text-[14px] lg:text-[14.5px] leading-relaxed max-w-md font-sans font-normal">
            Your generosity helps create a continuum of care, belonging, and new beginnings. We focus on community-rooted struggles, one individual family, home, school, and individual program.
          </p>
        </header>

        {/* ─── Main Stories Container with Sticky 3D Coin ─── */}
        <div ref={storiesTrackRef} className="relative w-full">
          
          {/* ─── Sticky 3D Floating Coin (Centered between columns) ─── */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
            <div className="sticky top-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none">
              <div className="w-full grid grid-cols-12 items-center pointer-events-none">
                <div className="col-start-6 col-span-2 flex items-center justify-center -ml-3 xl:-ml-5">
                  <div className="relative flex items-center justify-center">
                    {/* Warm Ambient Radial Glow Halo */}
                    <div
                      className="absolute w-[280px] h-[280px] rounded-full pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(249, 115, 22, 0.45) 0%, rgba(217, 119, 6, 0.15) 45%, transparent 70%)',
                        filter: 'blur(35px)',
                      }}
                      aria-hidden="true"
                    />
                    
                    {/* 3D WebGL Coin Canvas */}
                    <div className="relative w-44 h-44 xl:w-52 xl:h-52 pointer-events-auto">
                      <Coin3DCanvas progressRef={progressRef} className="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Stack of 3 Stories */}
          <div className="w-full flex flex-col divide-y divide-white/15">
            {stories.map((story) => (
              <article
                key={story.id}
                className="w-full min-h-[60vh] lg:min-h-[75vh] py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Title & Subtitle */}
                <div className="lg:col-span-6 space-y-4 max-w-xl pr-0 lg:pr-12">
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-white text-2xl sm:text-3xl lg:text-[34px] font-normal leading-[1.18]"
                  >
                    {story.title}
                  </h3>
                  <p className="text-stone-300 text-[13px] sm:text-[14px] lg:text-[14.5px] leading-relaxed font-sans font-normal max-w-lg">
                    {story.narrative}
                  </p>
                </div>

                {/* Right Column: Photo Card */}
                <div className="lg:col-span-6 flex justify-end pl-0 lg:pl-12">
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.8)] w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[480px] aspect-[16/10]">
                    <img
                      src={story.image}
                      alt={story.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

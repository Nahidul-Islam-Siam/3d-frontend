import { motion } from 'framer-motion';
import storyBeginsImg from '@/assets/how-we-serve/story/image 50 copy 6.png';

export interface YourStoryBeginsHereSectionProps {
  id?: string;
  className?: string;
}

export default function YourStoryBeginsHereSection({
  id = 'your-story-begins-here',
  className = '',
}: YourStoryBeginsHereSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Typography & Narrative Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center max-w-xl"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1C140D] mb-5 leading-tight"
          >
            Your Story Begins Here
          </h2>

          <div className="space-y-4 text-[#746343] text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans font-light">
            <p>
              You&apos;ve walked through our hallway. You&apos;ve discovered different ways compassion can become action. And now there is one more door. This one is yours.
            </p>
            <p>
              Because the story of <strong>LAB</strong> isn&apos;t only about the people who founded it or the programs we offer. It&apos;s also about the people who choose to become part of what happens next.
            </p>
            <p>
              People who believe that kindness matters. That community matters. That showing up matters. And that meaningful change becomes possible when we work together.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-[663/448] rounded-[24px] sm:rounded-[30px] overflow-hidden border border-[#EBD6C1] shadow-[0_12px_36px_rgba(44,38,30,0.08)] bg-black/5 group">
            <img
              src={storyBeginsImg}
              alt="Volunteers and community members laughing and connecting together"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

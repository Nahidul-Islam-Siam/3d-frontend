import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';
import mealsIcon from '@/assets/icons/utensils4.png';
import mentorIcon from '@/assets/icons/utensils3.png';
import storiesIcon from '@/assets/icons/utensils2.png';
import partnersIcon from '@/assets/icons/utensils.png';

const stats = [
  {
    value: "12,400+",
    label: "Meals Shared",
    icon: mealsIcon,
  },
  {
    value: "1,200",
    label: "Mentor Matches",
    icon: mentorIcon,
  },
  {
    value: "380",
    label: "Stories Told",
    icon: storiesIcon,
  },
  {
    value: "64",
    label: "Community Partners",
    icon: partnersIcon,
  },
];

export default function ExpectingYouSection() {
  return (
    <section className="relative w-full bg-[#FAF4E6] pt-16 md:pt-24 pb-16 md:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden select-none">
      {/* Decorative leaf flourish - Left (Group.png) */}
      <img
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-28 sm:bottom-32 lg:bottom-36 w-28 sm:w-36 lg:w-44 opacity-85 pointer-events-none select-none"
      />
      
      {/* Decorative leaf flourish - Right (Group-2.png) */}
      <img
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-24 sm:bottom-28 lg:bottom-32 w-28 sm:w-36 lg:w-44 opacity-85 pointer-events-none select-none"
      />

      <div className="max-w-[1140px] mx-auto relative z-10 space-y-20 lg:space-y-24">
        {/* Top Two-Column Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Heading and 3 Principles */}
          <div className="lg:col-span-5 space-y-6">
            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl lg:text-[50px] font-playfair font-bold text-[#F97316] tracking-tight leading-[1.06] uppercase"
            >
              WE'VE BEEN<br />EXPECTING YOU.
            </h2>
            
            <div className="space-y-2 text-[15px] sm:text-base text-[#6E6259] font-sans leading-relaxed">
              <p>Every person has a story.</p>
              <p>Every story deserves to be heard.</p>
              <p>Every person deserves hope.</p>
            </div>
          </div>

          {/* Right Column: Narrative Copy & Buttons (Right Aligned per Figma) */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right space-y-4 sm:space-y-5 lg:ml-auto">
            {/* Main Narrative Paragraph */}
            <p 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-base sm:text-lg lg:text-[21px] font-playfair leading-[1.45] max-w-xl text-left lg:text-right"
            >
              <span className="font-bold text-[#18181B]">This isn’t simply a website.</span>{" "}
              <span className="text-[#7A6B60]">
                It’s an invitation. An invitation to experience a place where compassion becomes action, hope becomes visible, and{" "}
              </span>
              <span className="font-bold text-[#18181B]">Every story matters.</span>
            </p>

            {/* Tagline */}
            <p 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-lg sm:text-xl lg:text-[22px] font-playfair  font-semibold text-[#F97316] text-left lg:text-right"
            >
              Including yours.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 pt-1">
              <FigmaButton to="/how-we-serve" variant="primary">
                Find Your Pathway
              </FigmaButton>

              <FigmaButton to="/movement" variant="outline">
                Explore The Show
              </FigmaButton>
            </div>
          </div>

        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pt-2">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="flex items-center gap-4 group cursor-default"
            >
              {/* Official Figma Icon */}
              <img 
                src={stat.icon} 
                alt="" 
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain flex-shrink-0 group-hover:scale-105 transition-transform" 
              />

              {/* Number and Label */}
              <div>
                <div className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-[#231F20] tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-[13px] font-sans text-[#6E6259] mt-1.5 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
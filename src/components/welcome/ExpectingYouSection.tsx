import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import btnArrow from '@/assets/icons/btn-arrow.png';
import leafFlourish from '@/assets/icons/Group-2.png';
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
    <section className="relative w-full bg-[#FAF4E6] py-16 md:py-24 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">
      {/* Decorative leaf flourish on edges */}
      <img
        src={leafFlourish}
        alt=""
        aria-hidden="true"
        className="absolute -left-12 top-1/4 w-36 sm:w-48 opacity-30 pointer-events-none select-none"
      />
      <img
        src={leafFlourish}
        alt=""
        aria-hidden="true"
        className="absolute -right-12 top-1/3 w-36 sm:w-48 opacity-30 pointer-events-none select-none scale-x-[-1]"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Two-Column Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading and 3 Principles */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F97316] tracking-tight leading-tight uppercase">
              WE’VE BEEN<br />EXPECTING YOU.
            </h2>
            
            <div className="space-y-1.5 text-base sm:text-lg text-[#746343] font-sans leading-relaxed">
              <p>Every person has a story.</p>
              <p>Every story deserves to be heard.</p>
              <p>Every person deserves hope.</p>
            </div>
          </div>

          {/* Right Column: Narrative Copy & Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl text-[#292524] font-serif leading-relaxed">
              <span className="font-semibold text-stone-900">This isn’t simply a website.</span> It’s an invitation. An invitation to experience a place where compassion becomes action, hope becomes visible, and <span className="font-bold text-stone-900">Every story matters.</span>
            </p>

            <p className="text-xl sm:text-2xl font-serif font-bold text-[#F97316] italic">
              Including yours.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/how-we-serve"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white font-serif font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:scale-105"
              >
                <span>Find Your Pathway</span>
                <img src={btnArrow} alt="" className="w-3.5 h-3.5 object-contain" />
              </Link>

              <Link
                to="/movement"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full border border-[#F97316] hover:bg-orange-50 text-[#F97316] font-serif font-bold text-sm tracking-wide transition-all hover:scale-105"
              >
                <span>Explore The Show</span>
                <span className="text-base">&rarr;</span>
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Impact Stat Cards (Frame 292 from Figma) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex items-center gap-4 group cursor-default"
            >
              {/* Official Figma Icon */}
              <img 
                src={stat.icon} 
                alt="" 
                className="w-14 h-14 object-contain flex-shrink-0 group-hover:scale-105 transition-transform drop-shadow-sm" 
              />

              {/* Number and Label */}
              <div>
                <div className="text-3xl lg:text-4xl font-serif font-bold text-[#292524] tracking-tight leading-none">
                  {stat.value}
                </div>
                <div className="text-sm font-sans text-[#746343] mt-1.5 whitespace-nowrap">
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


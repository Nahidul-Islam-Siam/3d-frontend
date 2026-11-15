import { motion } from 'framer-motion';
import cardImg1 from '@/assets/how-we-serve/serve-beside-us/Rectangle 109.png';
import cardImg2 from '@/assets/how-we-serve/serve-beside-us/Rectangle 109 copy.png';
import cardImg3 from '@/assets/how-we-serve/serve-beside-us/Rectangle 109 copy 2.png';
import cardImg4 from '@/assets/how-we-serve/serve-beside-us/Rectangle 109 copy 3.png';
import cardImg5 from '@/assets/how-we-serve/image 52.png';
import cardImg6 from '@/assets/how-we-serve/image 53.png';

interface WalkWayCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const walkWays: WalkWayCard[] = [
  {
    id: 'serving-meals',
    title: 'Serving Meals',
    description: 'Because everyone deserves a place at the table.',
    image: cardImg1,
  },
  {
    id: 'welcoming-veterans',
    title: 'Welcoming Veterans Home',
    description: 'Because everyone deserves a place to begin again.',
    image: cardImg2,
  },
  {
    id: 'supporting-experience',
    title: 'Supporting the Experience',
    description: 'Helping create conversations that inspire hope.',
    image: cardImg3,
  },
  {
    id: 'investing-youth',
    title: 'Investing in Young People',
    description: 'Helping students discover their worth.',
    image: cardImg4,
  },
  {
    id: 'organizing-donations',
    title: 'Organizing Donations',
    description: 'Turning generosity into new beginnings.',
    image: cardImg5,
  },
  {
    id: 'simply-showing-up',
    title: 'Simply Showing Up',
    description: '— Sometimes the greatest gift we can give is our presence.',
    image: cardImg6,
  },
];

export default function WaysWeWalkSection() {
  return (
    <section 
      id="ways-we-walk"
      className="relative w-full min-h-screen bg-[#0A0706] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* Background Soft Amber Radial Glow */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        
        {/* Eyebrow Tag at top-left */}
        <div className="mb-8 sm:mb-12">
          <span 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xs uppercase tracking-[0.25em] text-white/60 font-medium"
          >
            SERVE BESIDE US
          </span>
        </div>

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
              className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-white leading-[1.18]"
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
            <p className="text-stone-300 text-xs sm:text-sm lg:text-[14px] leading-relaxed font-light">
              No administrative checklists or distant corporate committees. Choose the doorway that speaks to your gifts.
            </p>
          </motion.div>
        </div>

        {/* ─── 6 Cards in 3x2 Grid (Figma 1:1) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {walkWays.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[22px] bg-[#16120F]/90 backdrop-blur-md border border-white/10 hover:border-[#F97316]/60 shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_16px_50px_rgba(249,115,22,0.18)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Card Photo */}
              <div className="w-full h-[200px] sm:h-[220px] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Card Bottom Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg sm:text-xl font-medium tracking-wide text-white group-hover:text-[#F97316] transition-colors mb-2"
                  >
                    {item.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator on Hover */}
                <div className="w-8 h-0.5 rounded-full bg-[#F97316]/30 group-hover:w-14 group-hover:bg-[#F97316] transition-all duration-300 mt-5" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

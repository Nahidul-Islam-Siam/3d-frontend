import { motion } from 'framer-motion';
import seenImg from '@/assets/welcome/seen.png';
import heardImg from '@/assets/welcome/heard.png';
import hopeImg from '@/assets/welcome/hope.png';

interface PillarCard {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const pillars: PillarCard[] = [
  {
    title: 'SEEN',
    subtitle: 'People deserve to be seen',
    image: seenImg,
    alt: 'Smiling community member at service table',
  },
  {
    title: 'HEARD',
    subtitle: 'Every story deserves a voice.',
    image: heardImg,
    alt: 'Handwritten letter of hope beside candlelight',
  },
  {
    title: 'HOPE',
    subtitle: 'Every person deserves hope.',
    image: hopeImg,
    alt: 'Joyful child enjoying sunlight and laughter',
  },
];

export default function StoryMattersSection() {
  return (
    <section className="relative w-full bg-[#FAF4E6] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-b border-orange-200/60">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-6"
          >
            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight uppercase leading-[1.08]"
            >
              <span className="text-[#18181B]">EVERY </span>
              <span className="text-[#F97316]">STORY</span>
              <br />
              <span className="text-[#18181B]">MATTERS.</span>
            </h2>

            <p className="text-[15px] sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-md">
              Every story carries meaning, and every voice deserves to be heard. Experience an inspiring journey of real stories, human connection, and hope.
            </p>
          </motion.div>

          {/* Right Column: 3 Pillar Photo Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 lg:gap-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="group flex flex-col items-center text-center cursor-default"
              >
                {/* Photo Card with Rounded Corners & Subtle Border */}
                <div className="relative w-full aspect-[4/5] rounded-[22px] overflow-hidden bg-stone-200 shadow-md border border-[#ecdac2] group-hover:shadow-xl transition-all duration-500">
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Pillar Title */}
                <h3 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="mt-5 text-xl sm:text-[22px] font-bold tracking-wider text-[#18181B] uppercase group-hover:text-[#F97316] transition-colors"
                >
                  {pillar.title}
                </h3>

                {/* Pillar Subtitle */}
                <p className="mt-1 text-xs sm:text-[13px] text-[#7A6B60] font-sans max-w-[180px] leading-snug">
                  {pillar.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

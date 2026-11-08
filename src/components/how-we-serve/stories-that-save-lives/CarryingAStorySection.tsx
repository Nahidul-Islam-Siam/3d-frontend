import { motion } from 'framer-motion';
import { Smile, MessageCircleQuestion, Flame, HandHeart } from 'lucide-react';

const dimensions = [
  {
    icon: Smile,
    title: 'JOY',
    description: 'The laughter, the shared songs, and the tender beauty carried gently in memory through long winters.',
    staggerClass: 'lg:translate-y-0',
  },
  {
    icon: MessageCircleQuestion,
    title: 'QUESTIONS',
    description: 'The quiet wonderings of the soul when the house is still, seeking meaning, belonging, and an anchor.',
    staggerClass: 'lg:translate-y-10 xl:translate-y-12',
  },
  {
    icon: Flame,
    title: 'CHALLENGES',
    description: 'The silent, exhausting battles fought without witnesses behind locked doors, where courage is simply breathing.',
    staggerClass: 'lg:translate-y-0',
  },
  {
    icon: HandHeart,
    title: 'VICTORIES',
    description: 'The quiet, monumental resilience that woke up this morning, stood up, and decided to keep going.',
    staggerClass: 'lg:translate-y-10 xl:translate-y-12',
  },
];

export default function CarryingAStorySection() {
  return (
    <section 
      id="carrying-a-story"
      className="relative w-full min-h-screen bg-[#08070B] text-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* Warm Ambient Glow from bottom-left */}
      <div 
        className="absolute bottom-0 left-0 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, rgba(249,115,22,0.14) 0%, rgba(217,119,6,0.05) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto">
        
        {/* ─── Split Header (Figma 1:1) ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.18]"
            >
              Every person you meet is carrying a story.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Beneath every everyday encounter lies an entire unspoken landscape of experience, struggle, and untamed beauty.
            </p>
          </motion.div>
        </div>

        {/* ─── 4 Staggered Glass Cards (Figma 1:1) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 pb-12 lg:pb-24">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <motion.div
                key={dim.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-[24px] bg-[#121017]/75 backdrop-blur-md border border-white/10 p-8 sm:p-9 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] hover:border-[#F97316]/50 hover:bg-[#16131D]/90 hover:shadow-[0_16px_50px_rgba(249,115,22,0.15)] transition-all duration-300 ${dim.staggerClass}`}
              >
                {/* Top: Icon */}
                <div>
                  <div className="w-12 h-12 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 flex items-center justify-center mb-7 group-hover:scale-110 group-hover:border-[#F97316] transition-transform">
                    <Icon className="w-6 h-6 text-[#F97316]" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-xl sm:text-2xl font-bold tracking-wider text-[#F97316] mb-4 uppercase"
                  >
                    {dim.title}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-300 text-sm sm:text-[15px] leading-relaxed font-light">
                    {dim.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Glow */}
                <div className="w-10 h-0.5 rounded-full bg-[#F97316]/30 group-hover:w-16 group-hover:bg-[#F97316] transition-all duration-300 mt-6" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


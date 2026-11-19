import { motion } from 'framer-motion';
import { Smile, HelpCircle, Flame, Award } from 'lucide-react';

const dimensions = [
  {
    icon: Smile,
    title: 'JOY',
    description: 'The laughter, the shared songs, and the tender beauty carried gently in memory through long winters.',
    staggerClass: 'lg:translate-y-0',
  },
  {
    icon: HelpCircle,
    title: 'QUESTIONS',
    description: 'The quiet wonderings of the soul when the house is still, seeking meaning, belonging, and an anchor.',
    staggerClass: 'lg:translate-y-8',
  },
  {
    icon: Flame,
    title: 'CHALLENGES',
    description: 'The silent, exhausting battles fought without witnesses behind locked doors, where courage is simply breathing.',
    staggerClass: 'lg:translate-y-0',
  },
  {
    icon: Award,
    title: 'VICTORIES',
    description: 'The quiet, monumental resilience that woke up this morning, stood up, and decided to keep going.',
    staggerClass: 'lg:translate-y-8',
  },
];

export default function CarryingAStorySection() {
  return (
    <section 
      id="carrying-a-story"
      className="relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        
        {/* ─── Top Eyebrow Section Title ─── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#121010] tracking-tight mb-2.5"
          >
            Stories That Save Lives
          </h2>
          <p className="text-[#8F6629] text-xs sm:text-sm italic font-serif">
            Sometimes hope begins with one conversation.
          </p>
        </motion.div>

        {/* ─── Main Headline ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-12 sm:mb-16"
        >
          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight text-[#121010] leading-tight"
          >
            Every person you meet is
            <br />
            carrying a story.
          </h3>
        </motion.div>

        {/* ─── 4 Staggered Story Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 sm:pb-16">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;
            return (
              <motion.div
                key={dim.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-[22px] bg-white/85 backdrop-blur-sm border border-[#EADCC5] p-7 sm:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] shadow-[0_6px_24px_rgba(44,38,30,0.05)] hover:border-[#F97316]/50 hover:bg-white transition-all duration-300 ${dim.staggerClass}`}
              >
                <div>
                  <div className="w-10 h-10 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-[#F97316]" strokeWidth={1.75} />
                  </div>

                  <h4 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg sm:text-xl font-bold tracking-wider text-[#F97316] mb-3 uppercase"
                  >
                    {dim.title}
                  </h4>

                  <p className="text-[#5A5043] text-xs sm:text-[13.5px] leading-relaxed font-sans font-light">
                    {dim.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Centered Narrative Block ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-3.5 pt-6 sm:pt-10"
        >
          <p className="text-[#5A5043] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans">
            At Live Achieve Believe, we believe stories remind us that we are never as alone as we think we are.
          </p>
          <p className="text-[#F97316] text-xs sm:text-sm lg:text-[15px] font-sans font-medium">
            That is why we created Suicide Awareness Showdown, Where Are You Now? Letters to Etcetera.
          </p>
          <p className="text-[#5A5043] text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans">
            Not simply to tell a story. But to create an experience that reminds people hope is always worth pursuing, conversations are always worth having, and every life has immeasurable value.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

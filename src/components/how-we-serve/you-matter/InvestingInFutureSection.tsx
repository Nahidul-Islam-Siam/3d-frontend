import { motion } from 'framer-motion';
import { Wrench, Award, Users, HeartHandshake } from 'lucide-react';

const pillars = [
  {
    id: 'tools',
    title: 'TOOLS',
    icon: Wrench,
    desc: 'Practical emotional frameworks, de-escalation habits, stress regulation, and clear self-advocacy strategies that work in real classrooms and living rooms.',
  },
  {
    id: 'confidence',
    title: 'CONFIDENCE',
    icon: Award,
    desc: 'Grounded self-worth immune to external peer pressure, predatory trends, or social media validation metrics. Quiet conviction rooted within.',
  },
  {
    id: 'relationships',
    title: 'RELATIONSHIPS',
    icon: Users,
    desc: 'Healthy boundaries, mutual respect, empathetic active listening, and restorative communication skills to build healthy lifelong bonds.',
  },
  {
    id: 'support',
    title: 'SUPPORT',
    icon: HeartHandshake,
    desc: 'A continuous village of mentors, community allies, and trusted adults who never turn away, even when mistakes happen or paths wobble.',
  },
];

export default function InvestingInFutureSection() {
  return (
    <section 
      id="investing-in-future"
      className="relative w-full min-h-screen bg-[#08070B] text-white flex flex-col justify-between py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Ambient Glow ─── */}
      <div 
        className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex-1 flex flex-col justify-between space-y-10 sm:space-y-12">
        
        {/* ─── Header: 2 Balanced Columns (Figma 1:1) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Investing in the Future
            </h2>

            {/* Dotted Single Divider (Figma 1:1) */}
            <div className="w-full max-w-[480px] pt-1 pb-1">
              <div className="w-full border-t border-dotted border-white/25" />
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              At Live Achieve Believe, we believe investing in the mental and emotional well-being of young people is one of the greatest investments we can make.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex lg:justify-end pt-2"
          >
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-sans max-w-sm">
              Life is full of highs and lows. Challenges come to everyone. The question is not whether life will be difficult.
            </p>
          </motion.div>

        </div>

        {/* ─── 4 Pillar Cards (Figma Exact 336px x 272px with Stagger) ─── */}
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-start gap-5 sm:gap-6 lg:gap-8 my-auto w-full">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isStaggered = idx % 2 === 1;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`group relative w-full sm:w-[336px] h-auto sm:h-[272px] p-6 rounded-[24px] border border-[#272624] bg-[#0E0D12]/40 hover:border-[#F97316]/60 hover:bg-[#0E0D12]/80 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center items-start gap-4 select-text ${
                  isStaggered ? 'lg:mt-16' : 'lg:mt-0'
                }`}
              >
                {/* Bare Orange Icon */}
                <div>
                  <Icon className="w-7 h-7 text-[#F97316] stroke-[1.6] transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Pillar Title */}
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl sm:text-2xl font-bold tracking-tight text-[#F97316] group-hover:text-white transition-colors uppercase leading-none"
                >
                  {pillar.title}
                </h3>

                {/* Pillar Description */}
                <p className="text-stone-400 group-hover:text-stone-300 text-xs sm:text-[13px] leading-relaxed font-sans transition-colors">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Footer Statement (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="text-center pb-2"
        >
          <p 
            className="text-[#F97316] text-xs sm:text-sm lg:text-base font-sans font-medium tracking-wide"
          >
            We want to help them build those tools before life asks them to use them.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

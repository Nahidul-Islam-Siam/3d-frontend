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
      className="relative w-full min-h-screen bg-[#08070B] text-white flex flex-col justify-center py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Ambient Glow ─── */}
      <div 
        className="absolute top-1/3 left-1/3 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.14) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto space-y-16 sm:space-y-20">
        
        {/* ─── Header: 2 Expansive Columns ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08]"
            >
              Investing in the Future
            </h2>

            {/* Dotted Divider */}
            <div className="w-full max-w-[480px] flex flex-col gap-1.5 py-1">
              <div className="w-full border-t border-dotted border-white/20" />
              <div className="w-full border-t border-dotted border-white/20" />
            </div>

            <p className="text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed font-sans max-w-xl">
              At Live Achieve Believe, we believe investing in the mental and emotional well-being of young people is one of the greatest investments we can make.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex lg:justify-end"
          >
            <p className="text-stone-400 text-base sm:text-lg leading-relaxed font-sans max-w-md">
              Life is full of highs and lows. Challenges come to everyone. The question is not whether life will be difficult.
            </p>
          </motion.div>

        </div>

        {/* ─── 4 Frosted Glass Pillar Cards (Full Width Spread) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-7 sm:p-8 lg:p-9 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-[#F97316]/50 shadow-[0_16px_50px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between min-h-[340px]"
              >
                {/* Glow Aura on Hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-[#F97316] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F97316] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F97316] group-hover:text-white transition-colors uppercase"
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6">
                  <div className="w-10 h-0.5 rounded-full bg-white/20 group-hover:w-20 group-hover:bg-[#F97316] transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Footer Highlight Statement ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="text-center pt-10 sm:pt-14"
        >
          <p 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[#F97316] text-lg sm:text-xl lg:text-2xl font-medium tracking-wide uppercase italic"
          >
            We want to help them build those tools before life asks them to use them.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

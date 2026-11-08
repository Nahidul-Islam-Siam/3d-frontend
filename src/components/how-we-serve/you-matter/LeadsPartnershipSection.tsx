import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const leadsModules = [
  {
    id: 'communication',
    title: 'Communication & Active Listening',
    subtitle: 'Speaking candidly without hostility or retreat.',
    detail: 'Equipping youth to express emotions clearly, defuse verbal conflict, and listen with deep empathy so relationships stay grounded in mutual understanding.',
  },
  {
    id: 'self-worth',
    title: 'Unshakable Self-Worth & Confidence',
    subtitle: "Knowing internal value isn't negotiable.",
    detail: 'Cultivating inner self-respect that is resilient to social media pressure, peer comparison, and external validation.',
  },
  {
    id: 'resilience',
    title: 'Emotional Resilience & Processing',
    subtitle: 'Navigating anger, sorrow, and surprise with poise.',
    detail: 'Healthy emotional regulation techniques that transform distress into constructive self-reflection rather than impulsive reaction.',
  },
  {
    id: 'boundaries',
    title: 'Healthy Boundaries & Mutual Consent',
    subtitle: 'Clear physical and emotional relationship standards.',
    detail: 'Teaching young adults how to honor their personal space, say no without guilt, and respect the boundaries of everyone around them.',
  },
  {
    id: 'life-skills',
    title: 'Practical Life Skills & Decision Making',
    subtitle: 'Forward-looking decisions with measured foresight.',
    detail: 'Practical mentorship on financial habits, goal setting, accountability, and making responsible choices that protect their future.',
  },
];

export default function LeadsPartnershipSection() {
  const [expandedId, setExpandedId] = useState<string | null>('communication');

  return (
    <section 
      id="leads-partnership"
      className="relative w-full min-h-screen bg-[#08070B] text-white flex items-center justify-center py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Ambient Glow ─── */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[850px] h-[850px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, transparent 65%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* ─── Left Column: Partner Narrative ─── */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F97316] text-xs uppercase tracking-widest font-sans font-semibold">
            <span>Community Partnership</span>
          </div>

          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-tight text-white leading-[1.08]"
          >
            Building Stronger Foundations Together.
          </h2>

          <div className="w-full max-w-[440px] flex flex-col gap-1.5 py-1">
            <div className="w-full border-t border-dotted border-white/20" />
            <div className="w-full border-t border-dotted border-white/20" />
          </div>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-sans max-w-xl">
            Live Achieve Believe proudly partners with <span className="text-white font-semibold">Life Skills, Empowerment and Development Services (LEADS)</span> to provide engaging, transformative experiences for middle and high school students.
          </p>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
            Click on any focus area on the right to discover the practical core competencies taught inside our interactive workshops.
          </p>
        </motion.div>

        {/* ─── Right Column: 5 Stacked Rounded Cards (Expansive Full Width) ─── */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {leadsModules.map((module, idx) => {
            const isExpanded = expandedId === module.id;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setExpandedId(isExpanded ? null : module.id)}
                className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 border ${
                  isExpanded
                    ? 'bg-white/[0.08] border-[#F97316]/60 shadow-[0_16px_45px_rgba(249,115,22,0.2)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.05] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className={`text-xl sm:text-2xl lg:text-[26px] font-bold transition-colors ${
                        isExpanded ? 'text-white' : 'text-stone-200 group-hover:text-white'
                      }`}
                    >
                      {module.title}
                    </h3>
                    <p className="text-sm sm:text-base text-stone-400 font-sans">
                      {module.subtitle}
                    </p>
                  </div>

                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                    isExpanded 
                      ? 'border-[#F97316] bg-[#F97316] text-white rotate-90' 
                      : 'border-white/20 text-stone-400 group-hover:border-white/40 group-hover:text-white'
                  }`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Extended Details Drawer */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-5 mt-4 border-t border-white/10"
                  >
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
                      {module.detail}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

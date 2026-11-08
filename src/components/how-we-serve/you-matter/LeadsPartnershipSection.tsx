import { motion } from 'framer-motion';

const leadsModules = [
  {
    id: 'communication',
    title: 'Communication & Active Listening',
    subtitle: 'Speaking candidly without hostility or retreat.',
  },
  {
    id: 'self-worth',
    title: 'Unshakable Self-Worth & Confidence',
    subtitle: "Knowing internal value isn't negotiable.",
  },
  {
    id: 'resilience',
    title: 'Emotional Resilience & Processing',
    subtitle: 'Navigating anger, sorrow, and surprise with poise.',
  },
  {
    id: 'boundaries',
    title: 'Healthy Boundaries & Mutual Consent',
    subtitle: 'Clear physical and emotional relationship standards.',
  },
  {
    id: 'life-skills',
    title: 'Practical Life Skills & Decision Making',
    subtitle: 'Forward-looking decisions with measured foresight.',
  },
];

export default function LeadsPartnershipSection() {
  return (
    <section 
      id="leads-partnership"
      className="relative w-full min-h-screen bg-[#08070B] text-white flex items-center justify-center py-20 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      {/* ─── Ambient Glow ─── */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.13) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ─── Left Column: Partner Narrative (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-5"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.18] max-w-md"
          >
            Building Stronger Foundations Together.
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-sans max-w-md pt-1">
            Live Achieve Believe proudly partners with Life Skills, Empowerment and Development Services (LEADS) to provide engaging experiences for middle and high school students.
          </p>
        </motion.div>

        {/* ─── Right Column: 5 Uniform Frosted Glass Cards (Figma 1:1) ─── */}
        <div className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4">
          {leadsModules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
              className="group rounded-[20px] p-5 sm:p-6 lg:py-5 lg:px-7 bg-white/[0.025] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] space-y-1.5 cursor-default select-text"
            >
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-lg sm:text-xl lg:text-[21px] font-bold text-white group-hover:text-amber-100 transition-colors tracking-tight"
              >
                {module.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed">
                {module.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

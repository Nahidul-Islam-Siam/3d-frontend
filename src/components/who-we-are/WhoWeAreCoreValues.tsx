import { motion } from 'framer-motion';

interface CoreValueItem {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const coreValues: CoreValueItem[] = [
  {
    id: 'think-higher',
    title: 'Think Higher',
    description:
      'See beyond circumstances and limitations. Recognize possibilities where others see obstacles.',
    image: '/who/think-higher.png',
    alt: 'Person standing on mountain ridge looking out over the horizon at sunrise',
  },
  {
    id: 'feel-deeper',
    title: 'Feel Deeper',
    description:
      "Look beyond appearances. Listen without judgment and recognize every person's dignity, struggles, and hopes.",
    image: '/who/feel-deeper.png',
    alt: 'Two women sharing a heartfelt, compassionate conversation',
  },
  {
    id: 'act-with-purpose',
    title: 'Act with Purpose',
    description:
      'Turn compassion into action through service, encouragement, meaningful support, and human connection.',
    image: '/who/act-with-purpose.png',
    alt: 'Community volunteers serving fresh food and essentials to families',
  },
];

export default function WhoWeAreCoreValues() {
  return (
    <section 
      id="core-values"
      className="relative w-full bg-[#FAF4E6] py-16 sm:py-24 md:py-28 lg:py-36 overflow-hidden select-none"
    >
      {/* ─── Wave Container Background Layer (our-core-values.png) ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/our-core-values.png"
          alt=""
          className="w-full h-full object-fill object-center"
        />
      </div>

      {/* ─── Foreground Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#2C241D] tracking-tight"
          >
            Our Core Values
          </h2>
        </motion.div>

        {/* 3 Core Values Cards */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-8 xl:gap-10">
          {coreValues.map((value, idx) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.75,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col"
            >
              {/* Card Photo Container */}
              <div className="relative w-full aspect-[458/368] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#ECE0D0] shadow-[0_10px_28px_rgba(44,36,29,0.06)]">
                <img
                  src={value.image}
                  alt={value.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Title */}
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="mt-5 sm:mt-6 text-xl sm:text-[22px] lg:text-[23px] font-bold text-[#2C241D] tracking-tight"
              >
                {value.title}
              </h3>

              {/* Description */}
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-[14px] lg:text-[14.5px] leading-relaxed text-[#6E6152] font-sans font-normal">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


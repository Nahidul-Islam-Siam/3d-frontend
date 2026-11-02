import { motion } from 'framer-motion';

export interface APlaceForThemSectionProps {
  id?: string;
  className?: string;
}

const tableCards = [
  {
    id: 'seeing-people',
    title: 'Seeing People.',
    image: '/who/table-seeing-people.png',
    alt: 'Close-up of eyes seeing each individual with dignity and compassion',
    offsetClass: 'lg:translate-y-8',
  },
  {
    id: 'listening',
    title: 'Listening.',
    image: '/who/table-listening.png',
    alt: 'Attentive, compassionate listening in personal conversation',
    offsetClass: 'lg:-translate-y-3',
  },
  {
    id: 'building-relationships',
    title: 'Building relationships.',
    image: '/who/table-building-relationships.png',
    alt: 'Volunteers and community members sharing a warm meal together at the table',
    offsetClass: 'lg:translate-y-10',
  },
  {
    id: 'offering-hope',
    title: 'Offering hope.',
    image: '/who/table-offering-hope.png',
    alt: 'Warm, welcoming smile offering sincere hope and human connection',
    offsetClass: 'lg:-translate-y-6',
  },
  {
    id: 'one-conversation',
    title: 'One conversation at a time.',
    image: '/who/table-one-conversation.png',
    alt: 'Holding hands across the table in deep empathy, love, and care',
    offsetClass: 'lg:translate-y-8',
  },
];

export default function APlaceForThemSection({
  id = 'a-place-for-them',
  className = '',
}: APlaceForThemSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      {/* ─── Undulating Wave Container Background Layer (values-wave-bg.png) ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/values-wave-bg.png"
          alt=""
          className="w-full h-full object-fill object-center"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* ─── Top Row: Headline & Narrative Principle ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-between">
          
          {/* Left Column: Bold Headline */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-semibold text-[#0B0B0A] leading-[1.18] tracking-tight max-w-xl"
            >
              No one should have to wonder if there is a place for them.
            </h2>
          </motion.div>

          {/* Right Column: Centered Narrative Card with Dotted Divider */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-center justify-center pt-2"
          >
            <div className="flex flex-col items-center text-center max-w-sm sm:max-w-md space-y-3">
              <p
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                className="text-[13px] sm:text-[14px] text-[#746343] font-normal leading-relaxed"
              >
                Every meal we share is an opportunity to restore dignity, create connection, and remind someone they are not alone.
              </p>

              <div className="w-full max-w-[280px] border-t border-dotted border-[#D4C3A3] my-2" />

              <p
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                className="text-[12.5px] sm:text-[13.5px] text-[#746343] font-normal leading-relaxed"
              >
                For us, serving a meal is never simply about food.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ─── Bottom Row: 5 Organic Staggered Narrative Photo Cards ─── */}
        <div className="mt-16 sm:mt-20 lg:mt-28 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-5 xl:gap-6 items-start">
          {tableCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.75,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group flex flex-col ${card.offsetClass} transition-transform duration-300`}
            >
              {/* Card Photo Container */}
              <div className="relative w-full aspect-[250/200] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#ECE0D0] shadow-[0_10px_28px_rgba(44,36,29,0.08)]">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Caption Underneath */}
              <p
                style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                className="mt-3 sm:mt-3.5 text-xs sm:text-[13px] lg:text-[13.5px] font-normal text-[#594B3C] text-left leading-snug tracking-normal"
              >
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


import { motion } from 'framer-motion';

import imgAtHome from '@/assets/how-we-serve/a-new-begining/image 50 copy.png';
import imgOutWorld from '@/assets/how-we-serve/a-new-begining/image 50 copy 2.png';
import imgLittleExtras from '@/assets/how-we-serve/a-new-begining/image 50 copy 3.png';

interface CollectionCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const items: CollectionCard[] = [
  {
    id: 'at-home',
    title: 'At Home',
    description: 'Linens, towels, blankets, kitchenware, and household items that make everyday spaces comfortable, functional, and personal.',
    image: imgAtHome,
  },
  {
    id: 'out-in-the-world',
    title: 'Out in the World',
    description: 'Clothing and shoes that support busy mornings, workdays, school days, special occasions, and everything in between.',
    image: imgOutWorld,
  },
  {
    id: 'the-little-extras',
    title: 'The Little Extras',
    description: 'Practical everyday necessities that make routines smoother and leave more room for enjoying life.',
    image: imgLittleExtras,
  },
];

export interface EverydayCollectionSectionProps {
  id?: string;
  className?: string;
}

export default function EverydayCollectionSection({
  id = 'everyday-collection',
  className = '',
}: EverydayCollectionSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1C140D] mb-3"
          >
            The Everyday Collection
          </h2>

          <div className="text-[#746343] font-sans font-light text-xs sm:text-[13.5px] leading-relaxed max-w-lg mx-auto space-y-1">
            <p>Every home, every wardrobe, and every daily routine tells its own story.</p>
            <p>Here are some of the essentials that help those stories unfold.</p>
          </div>
        </motion.div>

        {/* 3 Cards in Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-8">
          {items.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[22px] sm:rounded-[26px] bg-[#FFF3D9] border border-[#F97316]/40 p-4 sm:p-5 shadow-[0_4px_20px_rgba(249,115,22,0.06)] hover:border-[#F97316] hover:shadow-[0_10px_32px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="w-full aspect-[451/338] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-black/5 relative mb-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-lg sm:text-xl font-bold tracking-tight text-[#1C140D] mb-1.5"
                >
                  {card.title}
                </h3>
                <p className="text-[#746343] text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote Under Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-[#8F6629] font-sans text-xs sm:text-[13px] leading-relaxed max-w-xl mx-auto italic mt-6"
        >
          <p>These aren&apos;t simply items moving from one place to another.</p>
          <p>They&apos;re useful resources finding new purpose within our community.</p>
        </motion.div>

      </div>
    </section>
  );
}

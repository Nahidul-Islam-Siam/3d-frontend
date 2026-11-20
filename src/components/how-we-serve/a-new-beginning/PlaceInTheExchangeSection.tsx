import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import imgShareEssentials from '@/assets/how-we-serve/a-new-begining/image 50 copy 5.png';
import imgCommunityCollection from '@/assets/how-we-serve/a-new-begining/image 50 copy 6.png';
import imgLendTalents from '@/assets/how-we-serve/a-new-begining/image 50 copy 7.png';
import imgBuildPartnership from '@/assets/how-we-serve/a-new-begining/image 50 copy 8.png';

interface ExchangeCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const cards: ExchangeCard[] = [
  {
    id: 'share-essentials',
    title: 'Share Useful Essentials',
    description: 'Contribute clean, quality clothing, shoes, linens, kitchenware, or household items that are ready for their next chapter.',
    image: imgShareEssentials,
    link: '/donate?category=supplies',
  },
  {
    id: 'create-collection',
    title: 'Create a Community Collection',
    description: 'Bring together your workplace, school, church, neighborhood, or circle of friends around a shared effort.',
    image: imgCommunityCollection,
    link: '/contact?subject=community-collection',
  },
  {
    id: 'lend-talents',
    title: 'Lend Your Talents',
    description: 'Help organize collections, sort essentials, coordinate resources, or bring a creative idea to life.',
    image: imgLendTalents,
    link: '/movement?tab=volunteer',
  },
  {
    id: 'build-partnership',
    title: 'Build a Partnership',
    description: 'Connect your business or organization with LAB to explore ways we can share resources and strengthen our community together.',
    image: imgBuildPartnership,
    link: '/contact?subject=partnerships',
  },
];

export interface PlaceInTheExchangeSectionProps {
  id?: string;
  className?: string;
}

export default function PlaceInTheExchangeSection({
  id = 'place-in-the-exchange',
  className = '',
}: PlaceInTheExchangeSectionProps) {
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
            Find Your Place in the Exchange
          </h2>

          <p className="text-[#746343] font-sans font-light text-xs sm:text-[13.5px] leading-relaxed max-w-lg mx-auto">
            There&apos;s no single way to participate in A New Beginning. The best connections happen when people bring what comes naturally to them.
          </p>
        </motion.div>

        {/* 2x2 Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={card.link}
                className="group block rounded-[22px] sm:rounded-[26px] bg-[#FFF3D9] border border-[#F97316]/40 p-4 sm:p-5 shadow-[0_4px_20px_rgba(249,115,22,0.06)] hover:border-[#F97316] hover:shadow-[0_10px_32px_rgba(249,115,22,0.12)] transition-all duration-300"
              >
                {/* Photo Header */}
                <div className="w-full aspect-[647/390] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-black/5 relative mb-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-lg sm:text-xl font-bold tracking-tight text-[#1C140D] group-hover:text-[#F97316] transition-colors mb-1.5"
                  >
                    {card.title}
                  </h3>
                  <p className="text-[#746343] text-xs sm:text-[13px] leading-relaxed font-sans font-light">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

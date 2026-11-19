import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import imgVolunteer from '@/assets/how-we-serve/story/image 50.png';
import imgPartner from '@/assets/how-we-serve/story/image 50 copy.png';
import imgSponsor from '@/assets/how-we-serve/story/image 50 copy 2.png';
import imgDonate from '@/assets/how-we-serve/story/image 50 copy 3.png';
import imgShareMission from '@/assets/how-we-serve/story/image 50 copy 4.png';
import imgBringIdeas from '@/assets/how-we-serve/story/image 50 copy 5.png';

interface ServeCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const cards: ServeCard[] = [
  {
    id: 'volunteer',
    title: 'Volunteer',
    description: 'Share your time, talents, and willingness to serve.',
    image: imgVolunteer,
    link: '/movement?tab=volunteer',
  },
  {
    id: 'partner',
    title: 'Partner',
    description: 'Bring your organization, business, or community group alongside LAB to help expand opportunities and resources.',
    image: imgPartner,
    link: '/contact?subject=partner',
  },
  {
    id: 'sponsor',
    title: 'Sponsor',
    description: 'Help support a program, project, event, or community initiative.',
    image: imgSponsor,
    link: '/suicide-awareness-showdown?tab=sponsor',
  },
  {
    id: 'donate',
    title: 'Donate',
    description: 'Contribute financial support or requested goods to help turn compassion into action.',
    image: imgDonate,
    link: '/donate',
  },
  {
    id: 'share-the-mission',
    title: 'Share the Mission',
    description: 'Tell others about LAB and help connect people with opportunities to serve or receive support.',
    image: imgShareMission,
    link: '/movement',
  },
  {
    id: 'bring-your-ideas',
    title: 'Bring Your Ideas',
    description: 'Start a conversation about how we might work together to make a meaningful difference.',
    image: imgBringIdeas,
    link: '/contact?subject=ideas',
  },
];

export interface HowWeServeCardsSectionProps {
  id?: string;
  className?: string;
}

export default function HowWeServeCardsSection({
  id = 'how-we-serve-cards',
  className = '',
}: HowWeServeCardsSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#1C140D]"
          >
            How We Serve
          </h2>
        </motion.div>

        {/* 2-Column Grid of 6 Cards */}
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
                <div className="w-full aspect-[648/300] rounded-[16px] sm:rounded-[18px] overflow-hidden bg-black/5 relative mb-4">
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

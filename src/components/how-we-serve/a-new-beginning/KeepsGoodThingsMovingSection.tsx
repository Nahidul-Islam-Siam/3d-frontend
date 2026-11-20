import { motion } from 'framer-motion';
import movingImg from '@/assets/how-we-serve/a-new-begining/image 50 copy 4.png';

export interface KeepsGoodThingsMovingSectionProps {
  id?: string;
  className?: string;
}

export default function KeepsGoodThingsMovingSection({
  id = 'keeps-good-things-moving',
  className = '',
}: KeepsGoodThingsMovingSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1"
        >
          <div className="relative w-full max-w-md aspect-[663/566] rounded-[24px] sm:rounded-[30px] overflow-hidden border border-[#EBD6C1] shadow-[0_12px_36px_rgba(44,38,30,0.08)] bg-black/5 group">
            <img
              src={movingImg}
              alt="Volunteers sorting and packing community clothes and essentials"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Column: Narrative Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center max-w-xl order-1 lg:order-2"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1C140D] mb-5 leading-tight"
          >
            A Community That Keeps<br />Good Things Moving
          </h2>

          <div className="space-y-3.5 text-[#746343] font-sans font-light text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed">
            <p>
              There&apos;s a special kind of satisfaction in seeing something useful continue its journey.
            </p>
            <p>
              Maybe it&apos;s a local business sharing household goods. A family passing along gently used clothing. A group of friends organizing a neighborhood collection. Or volunteers bringing their creativity and organizational talents to the table.
            </p>
            <p className="italic text-[#8F6629]">
              Each person adds something different.
            </p>
            <p>
              Together, we create opportunities for resources to circulate, relationships to grow, and everyday needs to be met with care and consideration.
            </p>
            <p>
              No one has to do it all.<br className="hidden sm:inline" />
              And no one is defined by what they give or receive.
            </p>
            <p className="font-normal text-[#1C140D]">
              We simply make more possible by staying connected.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

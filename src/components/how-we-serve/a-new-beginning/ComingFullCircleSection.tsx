import { motion } from 'framer-motion';
import circleImg from '@/assets/how-we-serve/a-new-begining/image 50.png';

export interface ComingFullCircleSectionProps {
  id?: string;
  className?: string;
}

export default function ComingFullCircleSection({
  id = 'coming-full-circle',
  className = '',
}: ComingFullCircleSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Narrative Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center max-w-xl"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1C140D] mb-5 leading-tight"
          >
            Life Has a Wonderful Way of<br />Coming Full Circle.
          </h2>

          <div className="space-y-3.5 text-[#746343] font-sans font-light text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed">
            <p>
              Think about how much we share without even realizing it.
            </p>
            <p>
              A neighbor lends a hand. A friend passes along something useful. A family shares what they&apos;ve outgrown. Someone offers a skill, a connection, or a few hours of their time.
            </p>
            <p className="italic text-[#8F6629]">
              It&apos;s the beautiful rhythm of community.
            </p>
            <p>
              Sometimes we&apos;re the ones sharing. Sometimes we&apos;re the ones receiving. Often, we&apos;re doing both.
            </p>
            <p>
              A New Beginning embraces that natural exchange by connecting individuals and families with clothing, shoes, household essentials, and everyday necessities.
            </p>
            <p>
              It&apos;s not about who has more or who has less.
            </p>
            <p className="font-normal text-[#1C140D]">
              It&apos;s about recognizing that we all have something to offer one another.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-[663/566] rounded-[24px] sm:rounded-[30px] overflow-hidden border border-[#EBD6C1] shadow-[0_12px_36px_rgba(44,38,30,0.08)] bg-black/5 group">
            <img
              src={circleImg}
              alt="Community members sharing meals and resources together outdoors"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

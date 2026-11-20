import { motion } from 'framer-motion';
import heroImg from '@/assets/how-we-serve/a-new-begining/image 112.png';

export interface NewBeginningHeroSectionProps {
  id?: string;
  className?: string;
}

export default function NewBeginningHeroSection({
  id = 'a-new-beginning-hero',
  className = '',
}: NewBeginningHeroSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1720px] mx-auto">
        {/* ─── 1. Hero Cinema Photo Card (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] min-h-[360px] sm:min-h-[480px] lg:min-h-[620px] max-h-[85vh] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] overflow-hidden bg-black shadow-[0_20px_60px_rgba(44,36,29,0.12)] group select-none"
        >
          <img
            src={heroImg}
            alt="Woman presenting donation essentials box to smiling family at their doorway"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />

          {/* Subtle Ambient Radial Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_65%,rgba(18,12,8,0.25)_100%)]" 
            aria-hidden="true"
          />
        </motion.div>

        {/* ─── 2. Centered Typography Block ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#1C140D] mb-3 leading-tight"
          >
            A New Beginning
          </h1>

          <p 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-base sm:text-lg font-medium text-[#1C140D] mb-1.5"
          >
            There&apos;s Something Beautiful About What We Can Do Together.
          </p>

          <p className="text-[#8F6629] font-sans text-xs sm:text-[13.5px] italic mb-6">
            Good things have a way of finding their place.
          </p>

          <div className="space-y-3.5 text-[#746343] font-sans font-light text-xs sm:text-[13.5px] leading-relaxed">
            <p>
              A set of dishes finds a new kitchen. A favorite jacket becomes someone else&apos;s favorite. A collection of household essentials helps turn an unfamiliar space into one that feels comfortable and welcoming.
            </p>
            <p>
              And somewhere along the way, something else happens.<br className="hidden sm:inline" />
              Neighbors connect. Friendships form. Communities grow a little closer.
            </p>
            <p>
              That&apos;s the spirit of A New Beginning at Live Achieve Believe.<br className="hidden sm:inline" />
              It&apos;s a place where resources, relationships, and opportunities come together to make everyday life a little brighter.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

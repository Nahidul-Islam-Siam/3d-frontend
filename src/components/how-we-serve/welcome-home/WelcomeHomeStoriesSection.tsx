import { motion } from 'framer-motion';
import keyBackdrop from '@/assets/how-we-serve/stories-that-save-lives/Rectangle 108.png';
import keyPhoto from '@/assets/how-we-serve/stories-that-save-lives/Rectangle 555.png';
import soldierBackdrop from '@/assets/how-we-serve/stories-that-save-lives/455.png';
import familyPhoto from '@/assets/how-we-serve/stories-that-save-lives/Rectangle 108 copy.png';

export interface WelcomeHomeStoriesSectionProps {
  id?: string;
  className?: string;
}

export default function WelcomeHomeStoriesSection({
  id = 'welcome-home-stories',
  className = '',
}: WelcomeHomeStoriesSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden ${className}`}
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        
        {/* ─── Top Center Title Stage (Figma 1:1) ─── */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#2C261E] mb-2.5"
          >
            Welcome Home
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#746343] text-xs sm:text-sm font-sans tracking-wide"
          >
            Sometimes hope begins with a key.
          </motion.p>
        </div>

        {/* ─── Block 1: Sometimes Hope Begins with a Key (Text Left / Image Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20 sm:mb-28 lg:mb-32">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-[#2C261E] leading-[1.2] mb-5 sm:mb-6 max-w-md"
            >
              Sometimes hope begins with a key.
            </h3>

            <div className="space-y-2 text-[#746343] text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans max-w-md">
              <p>Sometimes hope begins with a key.</p>
              <p>It is where healing has room to grow.</p>
              <p>Where birthdays are celebrated.</p>
              <p>Where coffee is shared.</p>
              <p>Where family gathers.</p>
              <p>Where tomorrow begins to feel possible.</p>
            </div>
          </motion.div>

          {/* Right Image: Kitchen Counter Key with Backplate (Figma 1:1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-[726/788] flex items-center justify-center">
              {/* Outer Frosted Glass Backplate (Rectangle 108.png) */}
              <img
                src={keyBackdrop}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_12px_40px_rgba(44,38,30,0.08)]"
              />

              {/* Inner Rounded Key Photo (Rectangle 555.png) */}
              <div className="relative z-10 w-[85.7%] aspect-[622/675] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_8px_30px_rgba(44,38,30,0.1)]">
                <img
                  src={keyPhoto}
                  alt="Keys on kitchen counter with Home Sweet Home keychain"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Block 2: For Many Veterans... (Image Left / Text Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Image: Soldier Moving In With Family with Backplate (Figma 1:1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-[744/806] flex items-center justify-center">
              {/* Outer Frosted Glass Backplate (455.png) */}
              <img
                src={soldierBackdrop}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_12px_40px_rgba(44,38,30,0.08)]"
              />

              {/* Inner Rounded Soldier Photo (Rectangle 108 copy.png) */}
              <div className="relative z-10 w-[83.6%] aspect-[622/675] rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-[0_8px_30px_rgba(44,38,30,0.1)]">
                <img
                  src={familyPhoto}
                  alt="Smiling veteran in uniform carrying moving box with his family"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
          >
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-[#2C261E] leading-[1.2] mb-5 sm:mb-6 max-w-lg"
            >
              For many veterans, the journey home continues long after military service ends.
            </h3>

            <p className="text-[#746343] text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans mb-5 max-w-md">
              Whether your memories bring pride, pain, or a little of both, we hope this home becomes a place where peace has room to grow.
            </p>

            <div className="space-y-1.5 text-[#746343] text-xs sm:text-[13px] font-sans max-w-md">
              <p>Every veteran deserves appreciation.</p>
              <p>Every veteran deserves respect.</p>
              <p>Every veteran deserves dignity.</p>
              <p>Every veteran deserves the opportunity to begin again.</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import bannerImg from '@/assets/how-we-serve/story/Rectangle 138.png';

export interface HowYouCanHelpSectionProps {
  id?: string;
  className?: string;
}

export default function HowYouCanHelpSection({
  id = 'how-you-can-help',
  className = '',
}: HowYouCanHelpSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] text-[#2C261E] py-8 sm:py-12 lg:py-16 px-4 sm:px-8 lg:px-12 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[24px] sm:rounded-[32px] bg-[#FFF3D9] border border-[#F97316]/40 overflow-hidden shadow-[0_8px_30px_rgba(249,115,22,0.06)] group"
        >
          {/* Top Banner Photo */}
          <div className="w-full aspect-[1455/750] overflow-hidden bg-black/5 relative">
            <img
              src={bannerImg}
              alt="Community volunteers packing family relief boxes"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.015]"
            />
          </div>

          {/* Bottom Narrative Card Content */}
          <div className="p-6 sm:p-10 lg:p-12">
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-[#1C140D] mb-4"
            >
              How You Can Help
            </h2>

            <div className="space-y-2 text-[#746343] font-sans font-light text-xs sm:text-[13.5px] leading-relaxed max-w-2xl">
              <p>
                You don&apos;t need to do everything. You simply need to find the something that speaks to your heart.
              </p>
              <p>
                We don&apos;t believe everyone has to do everything. We believe everyone can do something. And together, those somethings can change lives.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

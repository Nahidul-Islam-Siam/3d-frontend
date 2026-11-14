import { motion } from "framer-motion";
import subtractImage from "@/assets/experience-story/Subtract copy 2.png";

interface OurStoryStillWrittenSectionProps {
  id?: string;
  className?: string;
}

export default function OurStoryStillWrittenSection({
  id = "story-still-written",
  className = "",
}: OurStoryStillWrittenSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Center Section Header ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: "1.2",
            }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-[#272624] tracking-tight"
          >
            Our Story Is Still
            <br />
            Being Written
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-5"
          >
            <p className="font-sans text-xs sm:text-[13.5px] text-[#555555] leading-relaxed max-w-2xl mx-auto">
              The founder, COO, and DOO each bring different experiences, gifts, and perspectives to this journey.
              <br className="hidden sm:inline" /> Together, they share a commitment to turning compassion into meaningful action.
            </p>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#F97316] font-medium mt-2">
              And the most exciting part?
            </p>
          </motion.div>
        </div>

        {/* ─── Two Column Content Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* ─── Left Column: The story is still unfolding narrative ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-[26px] font-semibold text-[#272624] tracking-tight mb-5 sm:mb-6"
            >
              The story is still unfolding.
            </h3>

            {/* First Paragraph Group */}
            <div className="space-y-1 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#444444] leading-[1.75] mb-6 sm:mb-7">
              <p>There are more people to meet.</p>
              <p>More relationships to build.</p>
              <p>More opportunities to create.</p>
              <p>More lives to encourage.</p>
              <p>And more reasons to believe that what we do together can make a difference.</p>
            </div>

            {/* Second Paragraph Group */}
            <div className="space-y-1 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#444444] leading-[1.75] mb-8 sm:mb-10">
              <p>Perhaps you've experienced challenges that have strengthened your compassion.</p>
              <p>Perhaps you've discovered a talent that could brighten someone's day.</p>
              <p>Perhaps you're searching for a meaningful way to give back.</p>
              <p>Or perhaps you simply believe, as we do, that every person deserves to feel valued.</p>
              <p>Whatever brought you here, we hope you'll discover something worth carrying forward.</p>
            </div>

            {/* Three Value Statements with dividers */}
            <div className="space-y-0 max-w-sm">
              <div className="py-2.5 sm:py-3 border-b border-[#E5DDD0]">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="font-semibold text-sm sm:text-[15px] text-[#272624]"
                >
                  Your experiences have value.
                </p>
              </div>
              <div className="py-2.5 sm:py-3 border-b border-[#E5DDD0]">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="font-semibold text-sm sm:text-[15px] text-[#272624]"
                >
                  Your gifts have purpose.
                </p>
              </div>
              <div className="py-2.5 sm:py-3 border-b border-[#E5DDD0]">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="font-semibold text-sm sm:text-[15px] text-[#272624]"
                >
                  Your presence can make a difference.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Subtract copy 2 with notched overlay ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full max-w-[560px] lg:max-w-none mx-auto"
          >
            <div className="relative isolate w-full">
              {/* Photo with rounded corners and transparent bottom-right notch */}
              <img
                src={subtractImage}
                alt="Diverse community members walking outdoors together in warm sunlight"
                className="w-full h-auto block select-none pointer-events-none drop-shadow-sm"
                loading="lazy"
                decoding="async"
              />

              {/* Text placed inside the transparent bottom-right notch */}
              <div className="absolute right-0 bottom-0 w-[63%] h-[12.3%] flex items-center justify-end pr-2 sm:pr-4 md:pr-6 pointer-events-none">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="italic text-xs sm:text-[13px] md:text-[14px] text-[#272624] tracking-normal select-none"
                >
                  And your story is still being written, too...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


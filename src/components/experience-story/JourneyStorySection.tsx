import { motion } from "framer-motion";

export interface JourneyStorySectionProps {
  id?: string;
  className?: string;
}

export default function JourneyStorySection({
  id = "journey-story",
  className = "",
}: JourneyStorySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 flex items-center justify-center select-none ${className}`}
    >
      <div className="w-full max-w-[880px] mx-auto text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold text-[#141414] leading-[1.28] tracking-tight max-w-[680px]"
        >
          Life has a way of taking us on journeys<br />
          we never imagined.
        </motion.h2>

        {/* Narrative Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 space-y-5 sm:space-y-6 text-[#555555] font-sans text-sm sm:text-base lg:text-[16.5px] leading-[1.75] max-w-[820px]"
        >
          <p>
            Some roads are filled with laughter, love, and beautiful memories. Others lead us through unexpected loss, uncertainty, and challenges that test our strength in ways we never thought possible.
          </p>
          <p>
            But every journey carries something powerful: the possibility of discovering strength we didn't know we had, finding purpose in unexpected places, and becoming a source of hope for someone else.
          </p>
          <p>
            At Live Achieve Believe, Inc. (LAB), our story is woven together by three individuals whose journeys have been different, yet whose hearts have been drawn toward the same purpose.
          </p>
        </motion.div>

        {/* Orange Accent Tagline */}
        <motion.p
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic font-bold text-[#E06A26] text-xl sm:text-2xl lg:text-[26px] tracking-wide mt-8 sm:mt-10"
        >
          People Matter. It’s That Simple.
        </motion.p>
      </div>
    </section>
  );
}


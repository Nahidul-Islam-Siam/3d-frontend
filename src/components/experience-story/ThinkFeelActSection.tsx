import { motion } from "framer-motion";

interface ThinkFeelActSectionProps {
  id?: string;
  className?: string;
}

export default function ThinkFeelActSection({
  id = "think-feel-act",
  className = "",
}: ThinkFeelActSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 select-none overflow-hidden ${className}`}
    >
      {/* ─── Wave Container Background Layer (values-wave-bg.png from Who We Are) ─── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/values-wave-bg.png"
          alt=""
          className="w-full h-full object-fill object-center"
        />
      </div>

      {/* ─── Foreground Content Grid ─── */}
      <div className="relative z-10 w-full max-w-[1240px] xl:max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          {/* ─── Left Column: Think Higher. Feel Deeper. Act with Purpose. ─── */}
          <motion.div    
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#272624",
                lineHeight: "1.18",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight"
            >
              Think Higher.
              <br />
              Feel Deeper.
              <br />
              Act with Purpose.
            </h2>

            <p className="font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed mt-5 sm:mt-6 max-w-lg">
              Because the best way out is always through. And sometimes, the most beautiful
              <br className="hidden sm:inline" /> part of the journey is discovering that we don't have to walk it alone.
            </p>
          </motion.div>

          {/* ─── Right Column: LIVE ACHIEVE BELIEVE Stepped Trilogy ─── */}
          <div className="lg:col-span-6 flex flex-col space-y-7 sm:space-y-9 lg:space-y-11 justify-center py-4">
            {/* 1. LIVE */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="self-start pl-0 sm:pl-4 lg:pl-6"
            >
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="block text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#272624] tracking-tight leading-none"
              >
                LIVE
              </span>
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="block text-xs sm:text-[13px] text-[#272624] font-normal mt-1.5"
              >
                with purpose.
              </span>
            </motion.div>

            {/* 2. ACHIEVE */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="self-start pl-16 sm:pl-28 lg:pl-32 xl:pl-36"
            >
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="block text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#272624] tracking-tight leading-none"
              >
                ACHIEVE
              </span>
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="block text-xs sm:text-[13px] text-[#272624] font-normal mt-1.5"
              >
                with determination.
              </span>
            </motion.div>

            {/* 3. BELIEVE */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="self-start pl-32 sm:pl-56 lg:pl-64 xl:pl-72"
            >
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="block text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#272624] tracking-tight leading-none"
              >
                BELIEVE
              </span>
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="block text-xs sm:text-[13px] text-[#272624] font-normal mt-1.5"
              >
                in what's possible.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

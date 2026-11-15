import { motion } from "framer-motion";
import heroVideo from "@/assets/how-we-serve/A_slow_cinematic_video_begins_.mp4.mp4";
import heroPhoto from "@/assets/how-we-serve/one-mission-hero.jpg";

interface HowWeServeHeroSectionProps {
  id?: string;
  className?: string;
}

export function HowWeServeHeroSection({
  id = "how-we-serve-hero",
  className = "",
}: HowWeServeHeroSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-14 sm:pt-18 lg:pt-24 pb-14 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* ─── Left Column: Title & Mission Narrative ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.14",
              }}
              className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-semibold tracking-tight mb-6 sm:mb-8"
            >
              One Mission.
              <br />
              Many Expressions.
            </h1>

            {/* Narrative Paragraphs */}
            <div className="space-y-3.5 sm:space-y-4 max-w-xl font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#272624] leading-relaxed">
              <p className="font-medium text-[#121010]">
                Every door opens because someone matters.
              </p>

              <p>
                Love is more than something we believe. It is something we choose to do. Every day.
              </p>

              <p>
                Every act of service begins with the same belief: every person deserves to be seen, valued, and given the opportunity to thrive.
              </p>

              <p>
                Whether we are sharing a meal, helping someone turn a house into a home, investing in young people, creating conversations through the arts, or standing beside a veteran, our purpose never changes.
              </p>
            </div>
          </motion.div>

          {/* ─── Right Column: Warm Coffee Pour Photo ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end items-center"
          >
            <div className="w-full max-w-[480px] lg:max-w-[520px] xl:max-w-[550px] aspect-[386/357] rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] bg-[#FAF4E6]">
              <video
                src={heroVideo}
                poster={heroPhoto}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover block select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowWeServeHeroSection;

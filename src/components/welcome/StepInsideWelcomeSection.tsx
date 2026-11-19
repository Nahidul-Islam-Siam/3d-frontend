import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";

export interface StepInsideWelcomeSectionProps {
  id?: string;
  className?: string;
}

export default function StepInsideWelcomeSection({
  id = "welcome-hero",
  className = "",
}: StepInsideWelcomeSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full flex items-center bg-[#FAF4E6] pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-18 lg:pb-24 overflow-hidden select-none ${className}`}
    >
      {/* ─── Foreground Content ─── */}
      <div className="relative z-10 w-full max-w-[1280px] xl:max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 text-center">
        <div className="max-w-2xl lg:max-w-[760px] mx-auto text-center">
          {/* Eyebrow Label */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs sm:text-[13px] uppercase tracking-[0.18em] text-[#6E6259] font-medium mb-3 sm:mb-4 text-center"
          >
            WELCOME TO LIVE ACHIEVE BELIEVE
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: "1.15",
              color: "#272624",
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-semibold tracking-tight mb-5 sm:mb-7 text-center"
          >
            Step Inside. You Matter Here.
          </motion.h1>

          {/* Narrative Body Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5 font-sans text-xs sm:text-[13.5px] lg:text-[14px] text-[#555555] leading-[1.8] text-center max-w-xl mx-auto"
          >
            <p>
              Before we tell you what we do, there&apos;s something we want you to know.
            </p>

            <p>
              You matter. Your story matters. And there&apos;s a place for you here.
            </p>

            <p>
              At Live Achieve Believe, Inc. (LAB), we believe compassion should be more than something we talk about. It should be something people experience.
            </p>

            <p>
              Sometimes that experience begins with a warm meal. Sometimes with the keys to a home. Sometimes with guidance, encouragement, or a conversation that reminds someone they are not alone.
            </p>

            <p>
              We believe small moments of kindness can create extraordinary possibilities.
            </p>
          </motion.div>

          {/* Orange Callout Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs sm:text-[13.5px] lg:text-[14px] text-[#F97316] font-medium mt-5 sm:mt-6 mb-7 sm:mb-8 text-center"
          >
            People Matter. It&apos;s That Simple.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <FigmaButton to="/who-we-are" variant="primary" size="md">
              Explore LAB
            </FigmaButton>

            <FigmaButton to="/how-we-serve" variant="outline" size="md">
              Discover How We Serve
            </FigmaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

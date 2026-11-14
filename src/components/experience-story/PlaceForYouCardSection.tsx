import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";

interface PlaceForYouCardSectionProps {
  id?: string;
  className?: string;
}

export default function PlaceForYouCardSection({
  id = "place-for-you-card",
  className = "",
}: PlaceForYouCardSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-12 sm:pt-16 pb-20 sm:pb-28 lg:pb-36 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[32px] sm:rounded-[40px] px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 shadow-[0_24px_64px_rgba(249,115,22,0.18)] overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #FD7646 0%, #FA7545 40%, #F57242 70%, #EA6635 100%)",
          }}
        >
          {/* Subtle diffused radiant white glow at bottom-center matching Figma & AnotherSeatWaitingSection */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 85%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Title */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "1.2",
              }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-white tracking-tight mb-4 sm:mb-5 max-w-xl text-center"
            >
              There&apos;s a Place for
              <br />
              You Here.
            </h2>

            {/* Subtitle */}
            <div className="mb-8 sm:mb-10 text-center">
              <p className="font-sans text-xs sm:text-[13.5px] text-white/95 font-medium leading-relaxed">
                Live Achieve Believe, Inc.
                <br />
                People Matter. Always.
              </p>
            </div>

            {/* 3 FigmaButton Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5 w-full">
              <FigmaButton
                to="/how-we-serve"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Discover How We Serve
              </FigmaButton>

              <FigmaButton
                to="/experience-the-story"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Experience The Production
              </FigmaButton>

              <FigmaButton
                to="/join-the-movement"
                variant="outline-white"
                size="md"
                className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
              >
                Become Part Of The Story
              </FigmaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

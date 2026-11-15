import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";

interface CtaButton {
  label: string;
  to: string;
}

const ctaButtons: CtaButton[] = [
  { label: "Experience Our Story", to: "/experience-the-story" },
  { label: "Explore How We Serve", to: "/how-we-serve" },
  { label: "Connect With LAB", to: "/movement" },
];

interface WhoWeAreCtaBannerSectionProps {
  id?: string;
  className?: string;
}

export function WhoWeAreCtaBannerSection({
  id = "who-we-are-cta",
  className = "",
}: WhoWeAreCtaBannerSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-4 pb-20 sm:pb-28 lg:pb-36 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto flex justify-center">
        {/* ─── Orange Rounded Banner Card (Patterned from AnotherSeatWaitingSection + Figma: border-radius 56px, opacity 0.9, bg #FE6B35) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 shadow-[0_24px_64px_rgba(249,115,22,0.18)] overflow-hidden"
          style={{
            backgroundColor: "#FE6B35",
            borderRadius: "56px",
          }}
        >
          {/* Diffused radiant white & soft cream glow at bottom matching Figma inspect colors (#FFEBBE, #FBFBFB, white) */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 60% at 50% 90%, rgba(255, 235, 190, 0.5) 0%, rgba(251, 251, 251, 0.3) 35%, rgba(254, 107, 53, 0) 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Title */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "1.22",
              }}
              className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-white text-center tracking-tight mb-8 sm:mb-10 max-w-3xl"
            >
              Think Higher. Feel Deeper.
              <br />
              Act with Purpose.
            </h2>

            {/* 3 Reusable Outline Action Buttons matching AnotherSeatWaitingSection */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              {ctaButtons.map((btn) => (
                <FigmaButton
                  key={btn.label}
                  to={btn.to}
                  variant="outline-white"
                  size="md"
                  className="!border-white/80 !text-white !bg-white/10 hover:!bg-white/25 shadow-sm backdrop-blur-sm"
                >
                  {btn.label}
                </FigmaButton>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhoWeAreCtaBannerSection;

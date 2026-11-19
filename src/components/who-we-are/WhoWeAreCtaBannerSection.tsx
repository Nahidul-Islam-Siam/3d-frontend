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
        {/* ─── Orange Rounded Banner Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
          style={{
            backgroundColor: "#FD7947",
            borderRadius: "56px",
          }}
        >
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

            {/* 3 Reusable Outline Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              {ctaButtons.map((btn) => (
                <FigmaButton
                  key={btn.label}
                  to={btn.to}
                  variant="outline-white"
                  size="md"
                  className="!border-white/80 !text-white !bg-transparent hover:!bg-white/10 !shadow-none !backdrop-blur-none"
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

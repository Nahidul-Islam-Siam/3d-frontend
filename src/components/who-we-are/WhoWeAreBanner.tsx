import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";
import heroImg84 from "@/assets/who-we-are/image 84.png";

export interface WhoWeAreBannerProps {
  id?: string;
  className?: string;
}

export default function WhoWeAreBanner({
  id = "who-we-are-banner",
  className = "",
}: WhoWeAreBannerProps) {
  const scrollToMission = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("we-see-people-differently");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-10 lg:px-14 xl:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ─── Left Column: Headline, Narrative & Figma Action Buttons ─── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Title */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#141414",
                lineHeight: "1.15",
              }}
              className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-bold tracking-tight mb-5 sm:mb-6"
            >
              People Matter. It&apos;s
              <br />
              That Simple.
            </h1>

            {/* Narrative Paragraphs */}
            <div className="space-y-3 font-sans text-xs sm:text-[13.5px] lg:text-[14px] text-[#4A453E] leading-relaxed max-w-lg mb-8 sm:mb-10">
              <p>There is something extraordinary about being seen.</p>
              <p>
                Not for what you have. Not for what you&apos;ve accomplished. Not for the
                challenges you&apos;ve faced or the circumstances you&apos;re navigating.
              </p>
              <p>But simply for who you are.</p>
            </div>

            {/* Figma Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <FigmaButton
                to="#mission"
                onClick={scrollToMission}
                variant="primary"
                size="md"
              >
                Explore Our Mission
              </FigmaButton>

              <FigmaButton
                to="/movement"
                variant="outline"
                size="md"
              >
                Get Involved
              </FigmaButton>
            </div>
          </motion.div>

          {/* ─── Right Column: Artistic Charcoal Collage (image 84.png) ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[560px] xl:max-w-[600px]">
              <img
                src={heroImg84}
                alt="People Matter collage of faces"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-sm"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

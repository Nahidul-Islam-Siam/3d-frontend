import { motion } from "framer-motion";

interface WeSeePeopleDifferentlySectionProps {
  id?: string;
  className?: string;
}

const valueBadges = [
  { text: "To be seen.", bg: "rgba(249, 115, 22, 0.15)" },
  { text: "To be heard.", bg: "#23940026" },
  { text: "To be valued.", bg: "#104DD226" },
  { text: "To know that their presence matters.", bg: "#007DBC26" },
];

export function WeSeePeopleDifferentlySection({
  id = "we-see-people-differently",
  className = "",
}: WeSeePeopleDifferentlySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-14 sm:pt-18 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Top Block: Statement & 4 Colored Value Badges ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.25",
            }}
            className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight mb-6 sm:mb-8"
          >
            At Live Achieve Believe, Inc. (LAB), we believe
            <br />
            every person deserves that experience.
          </h2>

          {/* 4 Colored Badges (Exact Figma Specs: border-radius 12px, padding 32px 24px, gap 10px) */}
          <div className="flex flex-wrap items-center justify-center gap-[10px] mb-6 sm:mb-8">
            {valueBadges.map((badge) => (
              <div
                key={badge.text}
                style={{ backgroundColor: badge.bg }}
                className="flex items-center justify-center rounded-[12px] py-6 sm:py-[32px] px-5 sm:px-[24px]"
              >
                <span className="font-sans text-xs sm:text-[13.5px] lg:text-[14px] font-bold text-[#121010] text-center tracking-tight whitespace-nowrap">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>

          {/* Subtext (Exact Figma Specs: Helvetica 24px/32px #0B0B0A 400) */}
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#0B0B0A",
            }}
            className="text-center font-normal text-base sm:text-xl lg:text-[24px] lg:leading-[32px] max-w-[800px] mx-auto mt-6 sm:mt-8"
          >
            Because before we can make a difference in someone&apos;s life,
            <br className="hidden sm:inline" />
            {" "}we must first recognize the value of that life.
          </p>
        </motion.div>

        {/* ─── Bottom Split: "We See People Differently" Narrative & Photo ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: Heading & Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#121010",
                lineHeight: "1.2",
              }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight mb-5 sm:mb-6"
            >
              We See People Differently.
            </h3>

            <div className="space-y-3.5 font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#444444] leading-relaxed">
              <p>
                We believe there is more to every person than what meets the eye.
              </p>
              <p>
                Behind every face is a story. Behind every story are experiences
                that have shaped a life. And within every life are strengths,
                possibilities, and gifts that deserve to be recognized.
              </p>
              <p>
                We don&apos;t believe a person&apos;s current circumstances determine
                their worth or define their future.
              </p>
              <p>
                We believe in meeting people with compassion rather than
                assumptions. With respect rather than judgment. With an open
                heart and a willingness to listen.
              </p>
              <p className="pt-1 font-medium text-[#121010]">
                And that changes everything.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Photo with Notch Caption */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[560px] lg:max-w-[580px]">
              <img
                src="/who/story-community.png"
                alt="Community volunteers serving meals - We don't just see a need. We see a person."
                className="w-full h-auto block object-contain select-none pointer-events-none drop-shadow-[0_12px_32px_rgba(40,30,20,0.06)]"
                loading="lazy"
                decoding="async"
              />

              {/* Caption positioned in the cutout notch */}
              <div className="absolute bottom-0 right-0 h-[17%] w-[62%] flex items-center justify-center pr-2 sm:pr-4">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-[11px] sm:text-[12.5px] md:text-[13.5px] text-[#2C241D] font-normal tracking-tight whitespace-nowrap"
                >
                  We don&apos;t just see a need. We see a person.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WeSeePeopleDifferentlySection;

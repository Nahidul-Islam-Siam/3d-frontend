import { motion } from "framer-motion";

interface NeedSomeoneToTalkToSectionProps {
  id?: string;
  className?: string;
}

export function NeedSomeoneToTalkToSection({
  id = "need-someone-to-talk-to",
  className = "",
}: NeedSomeoneToTalkToSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-14 sm:py-18 lg:py-24 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto flex justify-center">
        {/* ─── Orange Crisis Support Banner (Matching Figma: border-radius 56px, opacity 0.9, bg #FE6B35 + bottom glow) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pt-12 sm:pt-14 lg:pt-16 pb-12 sm:pb-14 lg:pb-16 shadow-[0_24px_64px_rgba(249,115,22,0.18)] overflow-hidden"
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
            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "1.2",
              }}
              className="text-2xl sm:text-3xl lg:text-[40px] font-semibold tracking-tight text-white mb-4 sm:mb-5"
            >
              Need Someone to Talk To?
            </h2>

            {/* Supportive Copy & Lifeline Contacts */}
            <div className="max-w-2xl mx-auto space-y-3 font-sans text-xs sm:text-[13px] lg:text-[14px] text-white/95 leading-relaxed">
              <p>
                If you&apos;re experiencing emotional distress or a mental-health crisis in
                the United States, call or{" "}
                <a
                  href="sms:988"
                  className="font-bold underline decoration-white/50 hover:decoration-white transition-colors"
                >
                  text 988
                </a>{" "}
                to connect with the Suicide &amp; Crisis Lifeline.
              </p>

              <p>
                Veterans and service members can{" "}
                <a
                  href="tel:988"
                  className="font-bold underline decoration-white/50 hover:decoration-white transition-colors"
                >
                  call 988
                </a>{" "}
                and press 1, or{" "}
                <a
                  href="sms:838255"
                  className="font-bold underline decoration-white/50 hover:decoration-white transition-colors"
                >
                  text 838255
                </a>
                , to reach the Veterans Crisis Line.
              </p>

              <p>
                If you or someone else is in immediate danger, call{" "}
                <a
                  href="tel:911"
                  className="font-bold underline decoration-white/50 hover:decoration-white transition-colors"
                >
                  911
                </a>
                .
              </p>
            </div>

            {/* Italic Affirmation Note */}
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="italic text-base sm:text-lg lg:text-[20px] font-medium text-white mt-6 sm:mt-7"
            >
              Your life matters. Support is available.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NeedSomeoneToTalkToSection;

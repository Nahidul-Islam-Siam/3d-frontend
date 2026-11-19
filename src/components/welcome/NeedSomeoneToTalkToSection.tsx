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
      className={`relative w-full bg-[#FFF3D9] py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-12 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1080px] mx-auto flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full mx-auto px-6 sm:px-12 lg:px-16 py-10 sm:py-14 rounded-[28px] sm:rounded-[36px]   overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "1.2",
              }}
              className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-tight text-[#121010] mb-4 sm:mb-5"
            >
              Need Someone to Talk To?
            </h2>

            {/* Supportive Copy & Lifeline Contacts */}
            <div className="max-w-2xl mx-auto space-y-2.5 font-sans text-xs sm:text-[13px] lg:text-[14px] text-[#444444] leading-relaxed">
              <p>
                If you&apos;re experiencing emotional distress or a mental-health crisis in
                the United States, call or{" "}
                <a
                  href="sms:988"
                  className="font-bold text-[#F97316] underline hover:text-[#EA580C] transition-colors"
                >
                  text 988
                </a>{" "}
                to connect with the Suicide &amp; Crisis Lifeline.
              </p>

              <p>
                Veterans and service members can{" "}
                <a
                  href="tel:988"
                  className="font-bold text-[#F97316] underline hover:text-[#EA580C] transition-colors"
                >
                  call 988
                </a>{" "}
                and press 1, or{" "}
                <a
                  href="sms:838255"
                  className="font-bold text-[#F97316] underline hover:text-[#EA580C] transition-colors"
                >
                  text 838255
                </a>
                , to reach the Veterans Crisis Line.
              </p>

              <p>
                If you or someone else is in immediate danger, call{" "}
                <a
                  href="tel:911"
                  className="font-bold text-[#F97316] underline hover:text-[#EA580C] transition-colors"
                >
                  911
                </a>
                .
              </p>
            </div>

            {/* Italic Affirmation Note in Orange */}
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="italic text-sm sm:text-base lg:text-[17px] font-medium text-[#F97316] mt-5 sm:mt-6"
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

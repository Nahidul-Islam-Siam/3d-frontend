import { motion } from "framer-motion";

interface TheresRoomForYouSectionProps {
  id?: string;
  className?: string;
}

export function TheresRoomForYouSection({
  id = "theres-room-for-you",
  className = "",
}: TheresRoomForYouSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* ─── Heading ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 lg:mb-10"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.2",
            }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight"
          >
            There&apos;s Room for<br />
            You in This Story.
          </h2>
        </motion.div>

        {/* ─── Centered Narrative Paragraphs ─── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 sm:space-y-5 font-sans text-xs sm:text-[13.5px] lg:text-[14px] text-[#444444] leading-relaxed max-w-[680px] mx-auto"
        >
          <p>
            You don&apos;t need a title to make a difference. You don&apos;t need extraordinary resources. You don&apos;t need to have all the answers.
          </p>

          <p>
            Sometimes all it takes is a willingness to care, to connect, and to take the next meaningful step.
          </p>

          <p>
            We don&apos;t believe everyone has to do everything.
          </p>

          <p>
            We believe everyone can do something.
          </p>

          <p>
            And when those somethings come together, remarkable things become possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TheresRoomForYouSection;

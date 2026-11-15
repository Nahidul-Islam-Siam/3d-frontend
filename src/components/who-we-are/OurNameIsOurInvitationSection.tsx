import { motion } from "framer-motion";

interface ValueCard {
  title: string;
  description: string;
}

const valueCards: ValueCard[] = [
  {
    title: "LIVE.",
    description:
      "To live is more than simply existing. It is discovering meaning, embracing possibility, and recognizing that your life has value. We believe everyone deserves the opportunity to live with dignity, purpose, connection, and hope.",
  },
  {
    title: "ACHIEVE.",
    description:
      "Achievement looks different for everyone. Sometimes it’s reaching a long-awaited milestone. Sometimes it’s taking one courageous step forward. Sometimes it’s discovering a strength you didn’t know you possessed. We believe progress matters, possibilities deserve to be explored, and every meaningful step is worth celebrating.",
  },
  {
    title: "BELIEVE.",
    description:
      "Belief is where possibility begins. It is the courage to imagine something beyond what we can see today. It is recognizing the potential within ourselves and others. And sometimes, it is having someone believe in us until we are ready to believe in ourselves.",
  },
];

interface OurNameIsOurInvitationSectionProps {
  id?: string;
  className?: string;
}

export function OurNameIsOurInvitationSection({
  id = "our-name-is-our-invitation",
  className = "",
}: OurNameIsOurInvitationSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 md:py-28 lg:py-36 overflow-hidden select-none ${className}`}
    >
      {/* ─── Wave Container Background Layer (values-wave-bg.png) ─── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/values-wave-bg.png"
          alt=""
          className="w-full h-full object-fill object-center"
        />
      </div>

      {/* ─── Foreground Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.2",
            }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight"
          >
            Our Name Is Our Invitation.
          </h2>
        </motion.div>

        {/* 3 Core Cards: LIVE, ACHIEVE, BELIEVE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-[1100px] mx-auto mb-10 sm:mb-12">
          {valueCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#FAF4E6]/75 backdrop-blur-xs border border-[#F4BA78] rounded-[18px] sm:rounded-[20px] p-6 sm:p-7 md:p-8 flex flex-col justify-start shadow-xs hover:border-[#F97316] transition-colors"
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#121010",
                }}
                className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight mb-3 sm:mb-4"
              >
                {card.title}
              </h3>
              <div className="w-full h-px bg-[#F4D8A5] mb-4 sm:mb-5" />
              <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#555555] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="bg-[#FFF0D4] border border-[#FCE1B6] rounded-md sm:rounded-lg py-2.5 px-6 sm:px-8 text-center shadow-xs">
            <p className="font-sans text-xs sm:text-[13px] lg:text-[14px] text-[#EA580C] font-bold tracking-wide">
              LIVE with purpose. ACHIEVE with determination. BELIEVE in
              what&apos;s possible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default OurNameIsOurInvitationSection;

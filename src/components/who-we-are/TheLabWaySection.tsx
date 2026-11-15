import { motion } from "framer-motion";

interface LabWayCard {
  title: string;
  body: string;
}

const cards: LabWayCard[] = [
  {
    title: "Think Higher.",
    body: "Look beyond limitations. Challenge assumptions. Imagine what could be possible if we approached people and circumstances with fresh understanding.",
  },
  {
    title: "Feel Deeper.",
    body: "Choose empathy. Listen with intention. Recognize the humanity behind every experience.",
  },
  {
    title: "Act with Purpose.",
    body: "Let compassion move beyond good intentions. Make choices that reflect what we believe and create meaningful opportunities for others.",
  },
];

interface TheLabWaySectionProps {
  id?: string;
  className?: string;
}

export function TheLabWaySection({
  id = "the-lab-way",
  className = "",
}: TheLabWaySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FFF1D3] pt-14 sm:pt-20 lg:pt-28 pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      {/* ─── Top Wave Transition Scoop from #FAF4E6 to #FFF3D9 ─── */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-8 md:h-10 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 C1080,30 360,30 0,0 Z"
            fill="#FAF4E6"
          />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          {/* Eyebrow */}
          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#666666] font-medium mb-3 sm:mb-4">
            THE LAB WAY
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.25",
            }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight mb-3 sm:mb-4"
          >
            Think Higher. Feel Deeper. Act with Purpose.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-[13.5px] lg:text-[14px] text-[#555555] max-w-xl mx-auto leading-relaxed">
            These words are more than a motto. They are a challenge we give ourselves.
          </p>
        </motion.div>

        {/* ─── 3 Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-[1140px] mx-auto mb-10 sm:mb-12">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#FFEBBE] border-l-[3.5px] border-l-[#F97316] rounded-r-[10px] p-6 sm:p-7 flex flex-col justify-start shadow-xs hover:bg-[#FFECCC]/85 transition-colors"
            >
              {/* Card Title */}
              <h3
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: "#121010",
                }}
                className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold tracking-tight mb-2.5 sm:mb-3"
              >
                {card.title}
              </h3>

              {/* Card Body */}
              <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#555555] leading-relaxed">
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── Bottom Summary Paragraph ─── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#555555] leading-relaxed max-w-[780px] mx-auto"
        >
          Thinking higher helps us see possibilities. Feeling deeper helps us understand people. Acting with purpose helps us make a difference. Together, they shape the way we approach our mission, our relationships, and our community.
        </motion.p>
      </div>
    </section>
  );
}

export default TheLabWaySection;

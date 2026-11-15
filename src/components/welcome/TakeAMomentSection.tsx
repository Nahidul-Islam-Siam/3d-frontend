import React from "react";
import { motion } from "framer-motion";
import { Drama, HandHeart, HeartHandshake } from "lucide-react";

interface TakeAMomentSectionProps {
  id?: string;
  className?: string;
}

interface MomentCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function TakeAMomentSection({
  id = "take-a-moment",
  className = "",
}: TakeAMomentSectionProps) {
  const cards: MomentCard[] = [
    {
      title: "Breathe With Intention",
      description:
        "Breathe in gently for four seconds. Breathe out slowly for six seconds. Repeat a few times at a pace that feels comfortable.",
      icon: (
        <Drama
          className="w-9 h-9 sm:w-10 sm:h-10 text-[#F97316]"
          strokeWidth={1.8}
        />
      ),
    },
    {
      title: "Find Your Ground",
      description:
        "Look around and notice five things you can see, four things you can feel, three things you can hear, two things you can smell, and one thing you can taste.",
      icon: (
        <HandHeart
          className="w-9 h-9 sm:w-10 sm:h-10 text-[#F97316]"
          strokeWidth={1.8}
        />
      ),
    },
    {
      title: "Give Yourself Permission to Pause",
      description:
        "Relax your shoulders. Unclench your hands. Take a sip of water. Step away from the noise for a moment.",
      icon: (
        <HeartHandshake
          className="w-9 h-9 sm:w-10 sm:h-10 text-[#F97316]"
          strokeWidth={1.8}
        />
      ),
    },
    {
      title: "Reach Out",
      description:
        'Sometimes the most meaningful thing you can do is tell someone you trust, "I could use someone to talk to."',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F97316"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-9 h-9 sm:w-10 sm:h-10 text-[#F97316]"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FFF3D9] pt-14 sm:pt-18 lg:pt-24 pb-16 sm:pb-20 lg:pb-28 px-6 sm:px-10 lg:px-16 xl:px-20 select-none overflow-hidden ${className}`}
    >
      <div className="w-full max-w-[1240px] xl:max-w-[1300px] mx-auto">
        {/* ─── Top Heading & Intro ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#121010",
              lineHeight: "1.15",
            }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-semibold tracking-tight mb-5"
          >
            Take a Moment. This
            <br />
            One Is for You.
          </h2>

          <div className="max-w-2xl space-y-3">
            <p className="font-sans text-xs sm:text-[13px] lg:text-[13.5px] text-[#444444] leading-relaxed">
              Life moves quickly. Between responsibilities, expectations, and
              everything happening around us, we sometimes forget to check in
              with ourselves. So before you continue exploring, we&apos;d like
              to offer you something.
            </p>
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="italic text-sm sm:text-base text-[#121010]"
            >
              A moment to simply be.
            </p>
          </div>
        </motion.div>

        {/* ─── Subtitle: Feeling Overwhelmed? ─── */}
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#121010",
          }}
          className="text-xl sm:text-2xl font-semibold tracking-tight mb-6 sm:mb-8"
        >
          Feeling Overwhelmed?
        </motion.h3>

        {/* ─── 4 Mindfulness Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                borderRadius: "12px",
                borderColor: "#F4D8A5",
              }}
              className="bg-[#FAF4E6]/60 border rounded-[12px] p-6 sm:p-7 flex flex-col items-center text-center hover:border-[#F97316]/50 hover:bg-[#FAF4E6] transition-all duration-300 shadow-sm"
            >
              {/* Centered Orange Icon */}
              <div className="flex justify-center items-center mb-4 text-[#F97316]">
                {card.icon}
              </div>

              {/* Card Title */}
              <h4
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  color: "#121010",
                  lineHeight: "24px",
                }}
                className="text-[17px] sm:text-[18px] font-bold mb-2.5"
              >
                {card.title}
              </h4>

              {/* Card Description */}
              <p className="font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#555555] leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── Bottom Note ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-sans text-xs sm:text-[13px] sm:text-sm text-[#444444] mt-8 sm:mt-10"
        >
          You don&apos;t have to carry everything alone.
        </motion.p>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Ear, Users, Smile, Quote } from "lucide-react";
import cooImg from "@/assets/experience-story/coo-portrait.png";
import dooImg from "@/assets/experience-story/doo-portrait.png";

function CheckHandsIcon({
  className = "w-7 h-7 sm:w-8 sm:h-8 text-[#F97316]",
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
    >
      <path
        d="M26.2254 19.5586C28.0132 17.2835 29.3332 14.7578 29.3332 12.2589C29.3332 8.43385 26.5261 5.33301 22.6665 5.33301C20.6665 5.33301 18.6665 5.99967 15.9998 8.66634C13.3332 5.99967 11.3332 5.33301 9.33317 5.33301C5.47352 5.33301 2.6665 8.43385 2.6665 12.2589C2.6665 19.0218 12.3351 25.9826 14.7778 27.6333C15.1386 27.8771 15.5644 27.9997 15.9998 27.9997C16.4353 27.9997 16.861 27.8771 17.2218 27.6333C17.3621 27.5385 17.5264 27.4262 17.7112 27.2973C19.0393 26.3715 19.1446 24.4778 17.9998 23.333"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M24.6667 14.667L25.9867 15.987C26.9317 16.9321 27.1311 18.3937 26.3115 19.4494C25.3171 20.7302 23.4176 20.7513 22.2709 19.6046L22 19.3337"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M22 19.333L22.2589 19.5919C23.4255 20.7585 23.3467 22.7479 22.1111 23.8411C20.9591 24.8603 19.3287 24.6617 18.2411 23.5741L18 23.333"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
      <path
        d="M16.0001 8.66699L12.3334 12.3337C11.4129 13.2541 11.4129 14.7465 12.3334 15.667C13.2539 16.5875 14.7462 16.5875 15.6668 15.667L18.0001 13.3337C18.727 12.6067 19.0906 12.2432 19.4828 12.0488C20.2288 11.6791 21.1048 11.6791 21.8508 12.0488C22.2428 12.2431 22.6061 12.6064 23.3326 13.3328L23.3334 13.3337L25.3334 15.3337"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
}

export interface PeopleWhoChangedLivesSectionProps {
  id?: string;
  className?: string;
}

export default function PeopleWhoChangedLivesSection({
  id = "people-who-changed-our-lives",
  className = "",
}: PeopleWhoChangedLivesSectionProps) {
  const pillars = [
    {
      icon: CheckHandsIcon,
      title: "Check",
      description: "For checking in with people.",
    },
    {
      icon: Ear,
      title: "Listen Deeply",
      description: "For listening beyond the words someone speaks.",
    },
    {
      icon: Users,
      title: "Create",
      description: "For creating spaces where individuals feel comfortable being themselves.",
    },
    {
      icon: Smile,
      title: "Show Kindness",
      description:
        "For remembering that a smile doesn't always tell the whole story, and that a moment of genuine kindness can mean more than we realize.",
    },
  ];

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-14 sm:pt-20 lg:pt-24 pb-0 scroll-mt-24 select-none ${className}`}
    >
      <div className="w-full max-w-[1360px] xl:max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* ─── Header: Section Title & Narrative Intro ─── */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#141414] tracking-tight leading-tight mb-6"
          >
            The People Who Forever
            <br className="hidden sm:inline" /> Changed Our Lives
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5 text-[#444444] font-sans text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-3xl mx-auto"
          >
            <p>
              Alongside the founder's journey are the personal experiences of LAB's Chief Operating Officer (COO) and Director of Operations (DOO).
            </p>
            <p>
              Both have known the joy of meaningful friendships, the laughter that comes from shared memories, and the blessing of having people in their lives who leave lasting impressions.
            </p>
            <p className="font-medium text-[#222222]">
              Both have also experienced the heartbreaking loss of very close friends to suicide.
            </p>
          </motion.div>
        </div>

        {/* ─── The Two Leadership Portraits (COO & DOO Side-by-Side - Generous Width) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 max-w-[1140px] xl:max-w-[1240px] mx-auto mb-20 sm:mb-28">
          {/* COO Card (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative isolate w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] group">
              {/* Figma Orange Accent Card (z-0 inside isolate prevents vanishing after animation) */}
              <div
                className="absolute top-2.5 sm:top-3.5 bottom-8 sm:bottom-12 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 bg-[#F97316] rounded-[30px] sm:rounded-[42px] z-0 shadow-sm pointer-events-none"
                aria-hidden="true"
              />

              {/* Portrait Image (Preserving transparent alpha shape) */}
              <div className="relative z-10 w-full aspect-[675/735] drop-shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <img
                  src={cooImg}
                  alt="Chief Operating Officer"
                  className="w-full h-full object-contain block select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#333333] font-medium mt-5 tracking-wide text-center">
              Chief Operating Officer
            </p>
          </motion.div>

          {/* DOO Card (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative isolate w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] group">
              {/* Figma Orange Accent Card (z-0 inside isolate prevents vanishing after animation) */}
              <div
                className="absolute top-2.5 sm:top-3.5 bottom-8 sm:bottom-12 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 bg-[#F97316] rounded-[30px] sm:rounded-[42px] z-0 shadow-sm pointer-events-none"
                aria-hidden="true"
              />

              {/* Portrait Image (Preserving transparent alpha shape) */}
              <div className="relative z-10 w-full aspect-[675/735] drop-shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
                <img
                  src={dooImg}
                  alt="Director of Operations"
                  className="w-full h-full object-contain block select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#333333] font-medium mt-5 tracking-wide text-center">
              Director of Operations
            </p>
          </motion.div>
        </div>

        {/* ─── Narrative Story: "More Than the Circumstances" ─── */}
        <div className="max-w-[1040px] xl:max-w-[1140px] mx-auto space-y-6 text-left mb-16 sm:mb-24">
          <div className="border-t border-[#E8DFC9] pt-12 sm:pt-16 mb-8" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2.5"
          >
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#141414]">
              More Than the Circumstances
            </h3>
            <p className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#444444]">
              Their friends were more than the circumstances surrounding their deaths.
            </p>
          </motion.div>

          {/* Highlight Callout Box: "They Were Individuals." */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[rgba(242,226,203,0.30)] rounded-[12px] p-6 sm:p-8"
          >
            <h4 className="font-serif font-bold text-lg sm:text-xl text-[#141414] mb-2.5">
              They Were Individuals.
            </h4>
            <p className="font-sans text-xs sm:text-sm lg:text-[14px] text-[#444444] leading-relaxed">
              They were individuals with personalities, dreams, relationships, laughter, and stories that mattered. Their lives left lasting impressions, and the love shared with them continues to hold meaning.
            </p>
          </motion.div>
        </div>

        {/* ─── Narrative Story: "The Importance of Human Connection" ─── */}
        <div className="max-w-[1040px] xl:max-w-[1140px] mx-auto space-y-6 text-left mb-20 sm:mb-28">
          <div className="border-t border-[#E8DFC9] pt-12 sm:pt-16 mb-8" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3.5"
          >
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#141414]">
              The Importance of Human Connection
            </h3>
            <p className="font-sans text-xs sm:text-sm lg:text-[14.5px] text-[#444444] leading-relaxed">
              Through these experiences, the COO and DOO developed an even deeper appreciation for the importance of human connection. Together, these experiences have strengthened their commitment to helping create a community where people feel seen, heard, valued, and supported.
            </p>
          </motion.div>

          {/* 4 Pillars Grid (2x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-4">
            {pillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#FFF3E3] border border-[#F97316] rounded-[12px] p-6 sm:p-7 lg:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-start items-start text-left"
                >
                  <div className="mb-4 sm:mb-5">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[#F97316]" strokeWidth={1.5} />
                  </div>
                  <span className="font-sans text-xs sm:text-[13px] text-[#555555] font-medium tracking-normal mb-1.5 block">
                    {pillar.title}
                  </span>
                  <p className="font-serif text-[#141414] text-base sm:text-lg lg:text-[19px] leading-snug font-normal">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Closing Quote Banner (Full Width Background Matching Figma) ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[rgba(242,226,203,0.30)] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 text-center mt-16 sm:mt-24"
      >
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#F97316] fill-[#F97316] mb-3.5" />
          <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px] text-[#141414] leading-snug">
            Because Every Person We Encounter Has A Story We May Not Fully Know.
          </h3>
          <div className="w-44 sm:w-60 h-[1px] bg-[#E2D6C0] my-3.5 sm:my-4" />
          <p className="font-sans text-xs sm:text-[13.5px] text-[#555555] font-normal leading-normal">
            And every person deserves to be treated as though that story matters.
          </p>
        </div>
      </motion.div>
    </section>
  );
}


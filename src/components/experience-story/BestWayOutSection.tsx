import { motion } from "framer-motion";
import leftLeaf from "@/assets/icons/Group.png";
import rightLeaf from "@/assets/icons/Group-2.png";

export interface BestWayOutSectionProps {
  id?: string;
  className?: string;
}

export default function BestWayOutSection({
  id = "the-best-way-out-is-always-through",
  className = "",
}: BestWayOutSectionProps) {
  const orangeBulletPoints = [
    "The ability to begin again.",
    "To discover new possibilities.",
    "To find strength in faith, relationships, and the support of others.",
    "To recognize that yesterday's circumstances do not have to define tomorrow's opportunities.",
  ];

  return (
    <section
      id={id}
      style={{ backgroundColor: "#F9731608" }}
      className={`relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden scroll-mt-24 select-none ${className}`}
    >
      {/* ─── Bottom-Left Decorative Leaf Flourish (Group.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: -20, y: 20 }}
        whileInView={{ opacity: 0.85, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-0 sm:-bottom-4 w-32 sm:w-44 lg:w-56 opacity-85 pointer-events-none select-none z-0"
      />

      {/* ─── Top-Right Decorative Leaf Flourish (Group-2.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: 20, y: -20 }}
        whileInView={{ opacity: 0.85, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-40px" }} 
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 sm:-top-4 w-36 sm:w-48 lg:w-60 opacity-85 pointer-events-none select-none z-0"
      />

      <div className="w-full max-w-[1280px] xl:max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.22fr] gap-10 lg:gap-12 xl:gap-16 items-end">
          {/* ─── Left Column: "The Best Way Out Is Always Through" ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-start"
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#272624",
                lineHeight: "normal",
                fontWeight: 600,
              }}
              className="text-3xl sm:text-4xl lg:text-[48px] tracking-tight mb-3"
            >
              The Best Way Out Is
              <br />
              Always Through
            </h2>

            <p className="font-sans text-xs sm:text-[13.5px] text-[#555555] mb-8 font-normal">
              There is something extraordinary about the human spirit.
            </p>

            {/* Orange Square Bullets */}
            <ul className="space-y-3 mb-8 sm:mb-10">
              {orangeBulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-xs sm:text-[13px] text-[#272624] leading-relaxed"
                >
                  <span className="w-2.5 h-2.5 bg-[#F97316] rounded-none mr-3 mt-1.5 flex-shrink-0 select-none" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Narrative Paragraphs */}
            <div className="space-y-1 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#444444] leading-[1.7] max-w-lg">
              <p>Moving forward does not mean every day will be easy.</p>
              <p>It doesn't mean we have to walk alone, or that asking for help makes us less capable.</p>
              <p>It means believing that another step is possible.</p>
              <p>That support can make a difference.</p>
              <p>That our lives have meaning beyond the challenges we face.</p>
              <p>
                And that even when the road takes an unexpected turn, there can still be purpose,
                <br className="hidden sm:inline" /> connection, joy, and beautiful chapters waiting to unfold.
              </p>
            </div>
          </motion.div>

          {/* ─── Right Column: Right-Aligned Mission Belief ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:items-end text-left lg:text-right justify-end lg:self-end mt-12 lg:mt-0"
          >
            {/* Styled Editorial Serif Statement matching Figma */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                lineHeight: "1.32",
                fontWeight: 600,
                opacity: 0.8,
              }}
              className="text-xl sm:text-2xl lg:text-[25px] xl:text-[28px] 2xl:text-[30px] tracking-tight mb-8 sm:mb-12 max-w-[660px] text-left lg:text-right"
            >
              <span className="inline lg:block">
                <span style={{ color: "var(--Primary-color, #F97316)" }}>At LAB, </span>
                <span style={{ color: "#919191" }}>we believe that when people come together</span>
              </span>
              <span className="inline lg:block">
                <span style={{ color: "#919191" }}>with compassion and a willingness to act,</span>
              </span>
              <span className="inline lg:block">
                <span style={{ color: "var(--bg-color, #0B0B0A)" }}>extraordinary things become possible.</span>
              </span>
            </h3>

            {/* Poetic Reflections */}
            <div className="space-y-1.5 font-sans text-xs sm:text-[12.5px] lg:text-[13px] text-[#444444] leading-[1.75] max-w-lg text-left lg:text-right">
              <p>A shared meal can create a friendship.</p>
              <p>A welcoming home can provide a foundation for a fresh start.</p>
              <p>A few words of encouragement can inspire a young person to believe in their potential.</p>
              <p>A story told onstage can open a conversation.</p>
              <p>And one person's willingness to show up can remind another that they matter.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


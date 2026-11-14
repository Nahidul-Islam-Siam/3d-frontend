import { motion } from "framer-motion";
import theaterImg from "@/assets/experience-story/stories/image 100.png";
import showdownPosterImg from "@/assets/experience-story/stories/image 99.png";
import twoWomenImg from "@/assets/experience-story/stories/image 101.png";

export interface StoriesStageForHopeSectionProps {
  id?: string;
  className?: string;
}

export default function StoriesStageForHopeSection({
  id = "when-stories-become-a-stage-for-hope",
  className = "",
}: StoriesStageForHopeSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-20 lg:py-24 scroll-mt-24 select-none ${className}`}
    >
      <div className="w-full max-w-[980px] lg:max-w-[1040px] xl:max-w-[1080px] mx-auto px-6 sm:px-10">
        {/* ─── Header: Section Title & Subtitle ─── */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#141414] tracking-tight leading-tight mb-3"
          >
            When Stories Become a
            <br />
            Stage for Hope
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#555555] font-sans text-xs sm:text-[13.5px] leading-relaxed"
          >
            One expression of this shared purpose is our original theatrical production: Suicide
          </motion.p>
        </div>

        {/* ─── Story Rows ─── */}
        <div className="space-y-10 sm:space-y-12">
          {/* ─── Row 1: "Putting Words to Silent Screams." ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[352px_1fr] gap-7 sm:gap-10 lg:gap-12 items-start"
          >
            {/* Image (Theater Auditorium) */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[352/288] w-full max-w-[352px] mx-auto md:mx-0">
              <img
                src={theaterImg}
                alt="Audience watching stage production"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Narrative Content */}
            <div className="flex flex-col justify-start">
              <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[22px] text-[#141414] leading-snug mb-3.5">
                Putting Words to Silent Screams.
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed mb-3">
                Born from a deep appreciation for life and the importance of connection, this production
                brings together storytelling, music, dance, humor, and meaningful reflection.
              </p>
              <p className="font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed mb-3">
                It invites audiences to look beyond appearances, recognize the humanity in one another,
                and discover how powerful it can be to feel understood.
              </p>
              <div className="space-y-1 font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed">
                <p>It reminds us that people can be navigating challenges we know nothing about.</p>
                <p>That compassion can open doors.</p>
                <p>That asking for support is an act of courage.</p>
                <p>
                  And that hope can be found in the relationships we build and the communities we
                  create together.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full border-t border-[#E8DFC9]" />

          {/* ─── Row 2: "Where Are You Now? Letters to Etcetera" ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[352px_1fr] gap-7 sm:gap-10 lg:gap-12 items-center"
          >
            {/* Image (Showdown Suicide Awareness Poster) */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[352/288] w-full max-w-[352px] mx-auto md:mx-0">
              <img
                src={showdownPosterImg}
                alt="Showdown Suicide Awareness - Where Are You Now? Letters to Etcetera"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Content (Centered with Poster) */}
            <div className="flex flex-col justify-center">
              <span className="font-sans text-xs sm:text-[12.5px] text-[#666666] font-medium tracking-normal mb-2 block">
                Awareness Showdown
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-[26px] text-[#141414] leading-snug">
                Where Are You Now?
                <br />
                Letters to Etcetera
              </h3>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full border-t border-[#E8DFC9]" />

          {/* ─── Row 3: "We are not creating a play about dying..." ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[352px_1fr] gap-7 sm:gap-10 lg:gap-12 items-start"
          >
            {/* Image (Two Women on Couch) */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[352/288] w-full max-w-[352px] mx-auto md:mx-0">
              <img
                src={twoWomenImg}
                alt="Supportive human connection and conversation"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Narrative Content */}
            <div className="flex flex-col justify-start">
              <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[22px] text-[#141414] leading-snug mb-3.5">
                We are not creating a play about dying. We are creating a
                <br className="hidden sm:inline" /> play about noticing people while they're living.
              </h3>
              <p className="font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed mb-3">
                We want audiences to laugh, reflect, connect, and leave with something meaningful to
                carry into their everyday lives.
              </p>
              <div className="space-y-1 font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed">
                <p>Perhaps they'll call an old friend.</p>
                <p>Spend a little more time listening to someone they love.</p>
                <p>Reach out for support.</p>
                <p>Or simply begin looking at the people around them with greater understanding.</p>
                <p>Because sometimes a story doesn't end when the curtain closes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


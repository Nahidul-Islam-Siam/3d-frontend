import { motion } from "framer-motion";
import theaterImg from "@/assets/experience-story/stories/image 100.png";
import auditionBanner from "@/assets/welcome/audition_banner.png";

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

        {/* ─── Story Rows (Exact 2 Rows from Figma) ─── */}
        <div className="space-y-12 sm:space-y-16">
          {/* ─── Row 1: "Putting Words to Silent Screams." ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-7 sm:gap-10 lg:gap-12 items-start"
          >
            {/* Image (Theater Auditorium) */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[352/288] w-full max-w-[340px] mx-auto md:mx-0">
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
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-7 sm:gap-10 lg:gap-12 items-start"
          >
            {/* Image (Showdown Suicide Awareness Poster) */}
            <div className="overflow-hidden rounded-[14px] shadow-sm aspect-[1/1] w-full max-w-[340px] mx-auto md:mx-0">
              <img
                src={auditionBanner}
                alt="Showdown Suicide Awareness - Where Are You Now? Letters to Etcetera"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Narrative Content */}
            <div className="flex flex-col justify-start">
              <span className="font-sans text-xs sm:text-[12px] text-[#666666] font-medium tracking-normal mb-1.5 block">
                Awareness Showdown
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-[26px] text-[#141414] leading-snug mb-2.5">
                Where Are You Now?
                <br />
                Letters to Etcetera
              </h3>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#141414] leading-snug mb-3">
                Beyond the silence, there&apos;s a story. Beyond the struggle,
                <br className="hidden sm:inline" /> there&apos;s possibility.
              </h4>
              <div className="space-y-3 font-sans text-xs sm:text-[13px] text-[#444444] leading-relaxed">
                <p>
                  Imagine an evening where laughter opens hearts, music stirs emotions, and stories illuminate the beautiful, sometimes unexpected ways our lives touch one another.
                </p>
                <p>
                  Suicide Awareness Showdown: Where Are You Now? Letters to Etcetera is more than a theatrical production. It&apos;s an invitation to experience the power of connection, discover hope in unexpected places, and remember that even the smallest gesture can make an extraordinary difference.
                </p>
                <p>
                  Through unforgettable characters, music, dance, humor, and moments that speak straight to the heart, we invite audiences on a journey that celebrates life, courage, compassion, and the possibilities that unfold when we truly see one another.
                </p>
                <p>
                  And when the curtain falls, we hope something wonderful begins.
                </p>
                <p>
                  Perhaps it&apos;s a long-overdue conversation. A friendship rekindled. A moment of kindness offered without hesitation. The courage to reach out, or the inspiration to remind someone just how much they matter.
                </p>
                <p>
                  Because the most powerful stories don&apos;t simply stay on the stage.
                </p>
                <p>
                  They come alive in us. They inspire us to love more openly, listen more deeply, and recognize the extraordinary value of every life.
                </p>
                <p className="font-semibold text-[#141414] pt-1">
                  Every life deserves to be seen. Every voice deserves to be heard. Every story matters.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

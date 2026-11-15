import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";
import showdownPoster from "@/assets/welcome/showdown-poster.png";

interface NextEventSectionProps {
  id?: string;
  className?: string;
}

export default function NextEventSection({
  id = "next-event",
  className = "",
}: NextEventSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-gradient-to-b from-[#251236] via-[#1A0B26] to-[#12071C] text-white py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      {/* Intense ambient stage lighting glows matching Figma 1:1 */}
      <div className="absolute top-1/2 -left-20 sm:-left-32 -translate-y-1/2 w-[420px] sm:w-[540px] h-[650px] sm:h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.42)_0%,_rgba(234,88,12,0.18)_45%,_transparent_75%)] blur-[85px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 sm:-right-32 -translate-y-1/2 w-[400px] sm:w-[500px] h-[620px] sm:h-[750px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.32)_0%,_rgba(234,88,12,0.12)_45%,_transparent_75%)] blur-[85px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1080px] xl:max-w-[1140px] mx-auto relative z-10 space-y-8 sm:space-y-10">
        {/* ─── Top Header Bar ─── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
          {/* Left Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 text-left max-w-xl"
          >
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-tight"
            >
              What&apos;s Coming Up Next
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-300 font-sans leading-normal">
              Discover our next event—an inspiring experience filled with
              meaningful stories, connection, and hope.
            </p>
          </motion.div>

          {/* Right Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <FigmaButton
              href="https://tickets.liveachievebelieve.org"
              target="_blank"
              variant="primary"
              size="sm"
            >
              TICKETS OPEN NOW
            </FigmaButton>

            <FigmaButton
              to="/movement"
              variant="outline-white"
              size="sm"
              showArrow={true}
              className="!border-white/30 !text-white !bg-white/10 hover:!bg-white/20"
            >
              Audition
            </FigmaButton>
          </motion.div>
        </div>

        {/* ─── Featured Showcase Poster ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[640px] sm:max-w-[700px] lg:max-w-[760px] rounded-[20px] sm:rounded-[26px] overflow-hidden shadow-[0_25px_60px_rgba(15,4,24,0.85)] border border-purple-500/25 bg-[#1B0C2A]">
            <img
              src={showdownPoster}
              alt="Showdown Suicide Awareness - Where Are You Now? Letters to Etcetera"
              className="w-full h-auto block select-none"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

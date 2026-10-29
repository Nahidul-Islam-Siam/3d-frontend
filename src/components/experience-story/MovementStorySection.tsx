import roomBg from "@/assets/experienc-story/experience-story-2nd-section.jpg";

export interface MovementStorySectionProps {
  id?: string;
  className?: string;
}

export default function MovementStorySection({
  id = "movement-story",
  className = "",
}: MovementStorySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* --- Main 16:9 Living Room Scene --- */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/1080] min-h-[500px] sm:min-h-[620px] lg:min-h-[780px] xl:min-h-[860px] overflow-hidden flex items-center">
        {/* Background Room Photo */}
        <img
          src={roomBg}
          alt="Cozy warm room representing every person's story"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* --- Left Glassmorphic Warm Panel (Exact Figma Design) --- */}
        <div className="absolute left-0 top-0 bottom-0 z-10 w-full max-w-[85vw] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] bg-[#423223]/80 backdrop-blur-[2px] border-r border-[#69543e]/30 px-6 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center text-left shadow-2xl">
          {/* Main Statement */}
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="font-serif text-xl sm:text-2xl lg:text-[32px] xl:text-[36px] font-bold text-white uppercase flex flex-col gap-[16px] sm:gap-[22px] lg:gap-[27px] leading-tight"
          >
            <span>EVERY MOVEMENT</span>
            <span>BEGINS WITH A STORY.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-[20px] sm:mt-[28px] lg:mt-[34px] text-xs sm:text-[13px] lg:text-[20px] text-[#E2D5C3] font-sans font-normal tracking-wide">
            Ours began with a simple belief:
          </p>

          {/* Double Dashed Separator Lines (Exact Figma Reference) */}
          <div className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] flex flex-col gap-[9px] sm:gap-[11px] lg:gap-[13px] mt-[30px] sm:mt-[42px] lg:mt-[51px] mb-[40px] sm:mb-[52px] lg:mb-[66px]">
            <div className="w-full border-b border-dashed border-white/40" />
            <div className="w-full border-b border-dashed border-white/40" />
          </div>

          {/* Core Philosophy Emphasis */}
          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="font-serif text-2xl sm:text-3xl lg:text-[40px] xl:text-[46px] font-bold text-white uppercase tracking-[0.14em] flex flex-col gap-[18px] sm:gap-[26px] lg:gap-[33px] leading-tight"
          >
            <span>EVERY PERSON</span>
            <span>MATTERS.</span>
          </h3>
        </div>

        {/* --- Bottom-Right 4-Point Star Sparkle Watermark --- */}
        <div className="absolute bottom-6 right-8 sm:bottom-12 sm:right-16 lg:bottom-16 lg:right-24 z-10 pointer-events-none select-none">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#F3E8D7] opacity-40 hover:opacity-70 transition-opacity"
          >
            <path
              d="M40 0C40 22.0914 47.9086 40 70 40C47.9086 40 40 57.9086 40 80C40 57.9086 32.0914 40 10 40C32.0914 40 40 22.0914 40 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

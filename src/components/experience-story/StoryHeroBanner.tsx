import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import FigmaButton from "@/components/common/FigmaButton";
import storyVideo from "@/assets/experience-story/experience-story.mp4";
import { usePublicVideoSlot } from "@/lib/hooks/usePublicCms";

export interface StoryHeroBannerProps {
  id?: string;
  className?: string;
}

export default function StoryHeroBanner({
  id = "story-hero-banner",
  className = "",
}: StoryHeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const liveVideo = usePublicVideoSlot({
    pagePaths: ["/experience-the-story", "/experience-story", "/about"],
    slotMatchers: ["story", "hero"],
    fallbackUrl: storyVideo,
  });

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleExploreShow = () => {
    const nextSection =
      document.getElementById("movement-story") ||
      document.getElementById("documentary-video") ||
      document.getElementById("showdown-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] pt-[84px] sm:pt-[96px] lg:pt-[104px] pb-12 sm:pb-16 lg:pb-24 min-h-[calc(100vh-74px)] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-[1440px] xl:max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          
          {/* ─── Left Column: Editorial Typography & Reusable Buttons ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left"
          >
            {/* Main Headline */}
            <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[60px] lg:text-[64px] xl:text-[72px] font-bold text-[#141414] leading-[1.12] tracking-tight">
              Every Life Has A<br />
              Story.{" "}
              <span className="relative inline-block">
                Every Story
                <span className="absolute left-0 -bottom-0.5 sm:bottom-0.5 w-full h-[2.5px] sm:h-[3px] bg-[#E06A26] rounded-full" />
              </span><br />
              <span className="relative inline-block">
                Matters.
                <span className="absolute left-0 -bottom-0.5 sm:bottom-0.5 w-full h-[2.5px] sm:h-[3px] bg-[#E06A26] rounded-full" />
              </span>
            </h1>

            {/* Quote and Author */}
            <div className="mt-6 sm:mt-7 mb-8 sm:mb-10 space-y-1">
              <p className="font-serif italic text-base sm:text-lg lg:text-[19px] text-[#222222] font-medium leading-relaxed">
                “The best way out is always through.”
              </p>
              <p className="text-xs sm:text-sm text-[#555555] font-sans">
                Robert Frost
              </p>
            </div>

            {/* Action Buttons using Reusable FigmaButton (matching Navbar) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <FigmaButton
                to="/how-we-serve"
                variant="primary"
                size="lg"
                ariaLabel="Find Your Pathway"
              >
                Find Your Pathway
              </FigmaButton>

              <FigmaButton
                onClick={handleExploreShow}
                variant="outline"
                size="lg"
                ariaLabel="Explore The Show"
              >
                Explore The Show
              </FigmaButton>
            </div>
          </motion.div>

          {/* ─── Right Column: Rounded Cinema Card ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[580px] lg:max-w-[620px] aspect-[4/3] sm:aspect-[1.14/1] rounded-[26px] sm:rounded-[34px] lg:rounded-[40px] overflow-hidden bg-[#E2D9C5] shadow-[0_16px_40px_rgba(0,0,0,0.07)] border border-[#2b2118]/10 group">
              <video
                ref={videoRef}
                src={liveVideo.videoUrl}
                poster={liveVideo.posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_65%,rgba(0,0,0,0.18)_100%)]" />

              {/* Audio Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

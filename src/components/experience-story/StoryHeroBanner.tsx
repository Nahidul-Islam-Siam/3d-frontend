import { ArrowDown } from 'lucide-react';
import storyVideo from '@/assets/experienc-story/experience-story.mp4';

export interface StoryHeroBannerProps {
  onScrollToStory?: () => void;
  className?: string;
}

export default function StoryHeroBanner({ onScrollToStory, className = '' }: StoryHeroBannerProps) {
  const handleScroll = () => {
    if (onScrollToStory) {
      onScrollToStory();
      return;
    }

    const nextSection = document.getElementById('movement-story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative w-full bg-[#FAF4E6] pt-4 sm:pt-6 pb-6 sm:pb-10 px-2.5 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-center ${className}`}>
      {/* ─── Hero Video Card (Exact Figma Frame with Rounded Corners) ─── */}
      <div className="relative w-full max-w-[1840px] aspect-video rounded-[16px] sm:rounded-[26px] lg:rounded-[32px] overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-stone-800/20 flex items-center justify-center">
        {/* Banner Video */}
        <video
          src={storyVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

        {/* Scroll Prompt at bottom of video */}
        <button
          type="button"
          onClick={handleScroll}
          className="absolute bottom-2.5 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:px-4 sm:py-2 cursor-pointer select-none group text-white/90 hover:text-white transition-all bg-black/25 hover:bg-black/45 backdrop-blur-sm rounded-full border border-white/20"
          aria-label="Scroll to enter the story"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/50 group-hover:border-white flex items-center justify-center shrink-0 transition-colors">
            <ArrowDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white animate-bounce" />
          </div>
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] text-white/90 group-hover:text-white transition-colors whitespace-nowrap font-medium"
          >
            SCROLL TO ENTER THE STORY
          </span>
        </button>
      </div>
    </section>
  );
}

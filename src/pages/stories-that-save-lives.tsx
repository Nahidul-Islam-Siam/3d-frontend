import { useEffect } from 'react';
import Seo from '@/components/Seo';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import CarryingAStorySection from '@/components/how-we-serve/stories-that-save-lives/CarryingAStorySection';
import ShowdownExperienceGallery from '@/components/how-we-serve/stories-that-save-lives/ShowdownExperienceGallery';
import InvestingInFutureSection from '@/components/how-we-serve/you-matter/InvestingInFutureSection';
import WhenCurtainClosesSection from '@/components/how-we-serve/stories-that-save-lives/WhenCurtainClosesSection';
import SanctuaryClimaxSection from '@/components/how-we-serve/stories-that-save-lives/SanctuaryClimaxSection';
import StoriesFinaleSection from '@/components/how-we-serve/stories-that-save-lives/StoriesFinaleSection';

import storiesVideo from '@/assets/video/gemini_generated_video_e55e26c9.mp4 (1) copy.mp4';
import storiesPoster from '@/assets/how-we-serve/stories-that-save-lives/stories-hero-poster.jpg';

export default function StoriesThatSaveLivesPage() {
  useEffect(() => {
    // Reveal global navbar for light creamy theme
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
  }, []);

  return (
    <>
      <Seo 
        title="Stories That Save Lives — Live Achieve Believe" 
        description="Sometimes hope begins with one conversation. Discover how Live Achieve Believe elevates documentary storytelling, theatrical vulnerability, and community presence to save lives." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        
        {/* ─── 1. Cinematic Dining / Indoor Hero Video Cinema Card ─── */}
        <HowWeServeHero 
          id="stories-hero"
          videoSrc={storiesVideo}
          posterSrc={storiesPoster}
        />

        {/* ─── 2. Showdown Event Banner Card (What's Coming Up Next) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          rounded={true}
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. Every Person Carrying A Story (4 Dimensions + Narrative) ─── */}
        <CarryingAStorySection />

        {/* ─── 4. Life in Full Motion: Showdown Experience (6-Photo Gallery) ─── */}
        <ShowdownExperienceGallery />

        {/* ─── 5. Investing in the Future (4 Pillars) ─── */}
        <InvestingInFutureSection />

        {/* ─── 6. When The Curtain Closes (4 Community Pillars) ─── */}
        <WhenCurtainClosesSection />

        {/* ─── 7. Sanctuary Climax: Who Is This Built For? -> "YOU." ─── */}
        <SanctuaryClimaxSection />

        {/* ─── 8. Grand Finale CTA: Tomorrow Is Worth Seeing ─── */}
        <StoriesFinaleSection />

      </div>
    </>
  );
}

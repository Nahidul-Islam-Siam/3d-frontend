import { useEffect } from 'react';
import Seo from '@/components/Seo';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import APlaceForThemSection from '@/components/how-we-serve/APlaceForThemSection';
import ServingCommunityTogetherSection from '@/components/how-we-serve/ServingCommunityTogetherSection';
import PurePhotographySection from '@/components/how-we-serve/PurePhotographySection';
import StoriesFromTheTableSection from '@/components/how-we-serve/StoriesFromTheTableSection';
import AnotherSeatWaitingSection from '@/components/how-we-serve/AnotherSeatWaitingSection';
import tableHeroVideo from '@/assets/video/gemini_generated_video_fd16485a.mp4.mp4';

export default function APlaceAtTheTablePage() {
  useEffect(() => {
    // Reveal global navbar
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
  }, []);

  return (
    <>
      <Seo 
        title="A Place at the Table — Live Achieve Believe" 
        description="Sometimes hope begins with a meal. Sharing meals, listening, and restoring human dignity one conversation at a time." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white">
        {/* ─── 1. Cinematic Dining Hero Video ─── */}
        <HowWeServeHero videoSrc={tableHeroVideo} />

        {/* ─── 2. Showdown Event (What's Coming Up Next) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          rounded={true}
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. A Place at the Table Narrative & 5 Photos ─── */}
        <APlaceForThemSection id="place-at-the-table" />

        {/* ─── 4. Community Collaboration in Action ─── */}
        <ServingCommunityTogetherSection id="community-together" />

        {/* ─── 5. Authentic Moments Gallery ─── */}
        <PurePhotographySection />

        {/* ─── 6. Lived Experiences & Stories From the Table ─── */}
        <StoriesFromTheTableSection id="table-stories" />

        {/* ─── 7. Finale: Another Seat Waiting & Return to Hallway ─── */}
        <AnotherSeatWaitingSection id="another-seat-waiting" />
      </div>
    </>
  );
}


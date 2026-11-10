import { useRef } from 'react';
import Seo from '@/components/Seo';
import ThreeHallway from '@/components/cinematic/ThreeHallway';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import PlaceAtTheTableSection from '@/components/how-we-serve/PlaceAtTheTableSection';
import APlaceForThemSection from '@/components/how-we-serve/APlaceForThemSection';
import ServingCommunityTogetherSection from '@/components/how-we-serve/ServingCommunityTogetherSection';
import PurePhotographySection from '@/components/how-we-serve/PurePhotographySection';
import StoriesFromTheTableSection from '@/components/how-we-serve/StoriesFromTheTableSection';
import AnotherSeatWaitingSection from '@/components/how-we-serve/AnotherSeatWaitingSection';
import NewBeginningSection from '@/components/how-we-serve/NewBeginningSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';

export default function HowWeServePage() {
  const overviewRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToOverview = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Seo 
        title="How We Serve — The Hallway | Live Achieve Believe" 
        description="Walk the walnut corridor of Live Achieve Believe. Seven doors, seven expressions of compassion, seven ways we stand beside people in their deepest moments." 
      />

      <div className="w-full bg-[#0d0805]">
        {/* ─── Realtime 3D Three.js Hallway of Hope ─── */}
        <ThreeHallway onScrollToOverview={handleScrollToOverview} />

        {/* ─── Comprehensive Overview Sections Below Corridor ─── */}
        <div ref={overviewRef} id="how-we-serve-overview" className="w-full bg-[#FAF4E6]">
          {/* Section 1: Cinematic Dining / Table Hero Video */}
          <HowWeServeHero />

          {/* Section 2: A Place at the Table */}
          <PlaceAtTheTableSection id="place-at-the-table" />

          {/* Section 3: You Matter (5 Step Cards) */}
          <APlaceForThemSection id="you-matter" />

          {/* Section 4: Welcome Home (Partners & Network Map) */}
          <ServingCommunityTogetherSection id="welcome-home" />

          {/* Section 5: Pure photography, quiet moments, zero staged gloss. */}
          <PurePhotographySection />

          {/* Section 6: Stories That Save Lives (Testimonial Carousel) */}
          <StoriesFromTheTableSection id="stories-that-save-lives" />

          {/* Section 7: Serve Beside Us (Action Cards) */}
          <AnotherSeatWaitingSection id="serve-beside-us" />

          {/* Section 8: Door 5 — A New Beginning & One Mission Climax */}
          <NewBeginningSection id="a-new-beginning" />

          {/* Section 9: Suicide Awareness Showdown */}
          <ShowdownSection id="what-coming-up-next" />
        </div>
      </div>
    </>
  );
}

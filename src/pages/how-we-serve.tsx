import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Seo from '@/components/Seo';
import HowWeServeHeroSection from '@/components/how-we-serve/HowWeServeHeroSection';
import FourDoorsSection from '@/components/welcome/FourDoorsSection';
import HowWeServePillarsSection from '@/components/how-we-serve/HowWeServePillarsSection';
import OneMissionSummarySection from '@/components/how-we-serve/OneMissionSummarySection';
import NoSingleOrganizationBanner from '@/components/how-we-serve/NoSingleOrganizationBanner';

export default function HowWeServePage() {  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Reveal global navbar for site redesign
    window.dispatchEvent(new CustomEvent('reveal-navbar'));

    // Deep link #your-story redirects to dedicated Your Story page
    if (location.hash === '#your-story') {
      navigate('/how-we-serve/your-story', { replace: true });
    }
  }, [location.hash, navigate]);

  return (
    <>
      <Seo 
        title="How We Serve — The Hallway | Live Achieve Believe" 
        description="Walk the walnut corridor of Live Achieve Believe. Seven doors, seven expressions of compassion, seven ways we stand beside people in their deepest moments." 
      />

      {/* ─── How We Serve Redesign Canvas ─── */}
      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Redesign Section 1: Hero Banner (One Mission. Many Expressions.) ─── */}
        <HowWeServeHeroSection />

        {/* ─── Redesign Section 2: Hallway of Possibilities (4 Interactive Doors) ─── */}
        <FourDoorsSection id="hallway-of-possibilities" />

        {/* ─── Redesign Section 3: All 7 Doors (Door One through Door Seven) ─── */}
        <HowWeServePillarsSection />

        {/* ─── Redesign Section 4: Summary Card (One Mission. Many Expressions.) ─── */}
        <OneMissionSummarySection />

        {/* ─── Redesign Section 5: Bottom Banner (No Single Organization Heals A City Alone) ─── */}
        <NoSingleOrganizationBanner />

        {/* Legacy components commented out for redesign */}
        {/* <ThreeHallway onScrollToOverview={handleScrollToOverview} /> */}
        {/* <HowWeServeHero /> */}
        {/* <PlaceAtTheTableSection id="place-at-the-table" /> */}
        {/* <APlaceForThemSection id="you-matter" /> */}
        {/* <ServingCommunityTogetherSection id="welcome-home" /> */}
        {/* <PurePhotographySection /> */}
        {/* <StoriesFromTheTableSection id="stories-that-save-lives" /> */}
        {/* <AnotherSeatWaitingSection id="serve-beside-us" /> */}
        {/* <NewBeginningSection id="a-new-beginning" /> */}
        {/* <ShowdownSection id="what-coming-up-next" /> */}
      </div>
    </>
  );
}

import Seo from '@/components/Seo';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import PlaceAtTheTableSection from '@/components/how-we-serve/PlaceAtTheTableSection';
import APlaceForThemSection from '@/components/how-we-serve/APlaceForThemSection';
import ServingCommunityTogetherSection from '@/components/how-we-serve/ServingCommunityTogetherSection';
import PurePhotographySection from '@/components/how-we-serve/PurePhotographySection';
import StoriesFromTheTableSection from '@/components/how-we-serve/StoriesFromTheTableSection';
import AnotherSeatWaitingSection from '@/components/how-we-serve/AnotherSeatWaitingSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';

export default function HowWeServePage() {
  return (
    <>
      <Seo 
        title="How We Serve — Live Achieve Believe" 
        description="Discover how Live Achieve Believe strengthens lives and builds community through food dignity, youth development, mental health awareness, and veteran housing." 
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1: Cinematic Dining / Table Hero Video ─── */}
        <HowWeServeHero />

        {/* ─── Section 2: A Place of the Table ─── */}
        <PlaceAtTheTableSection id="place-at-the-table" />

        {/* ─── Section 3: You Matter (5 Step Cards) ─── */}
        <APlaceForThemSection id="you-matter" />

        {/* ─── Section 4: Welcome Home (Partners & Network Map) ─── */}
        <ServingCommunityTogetherSection id="welcome-home" />

        {/* ─── Section 5: Pure photography, quiet moments, zero staged gloss. (Interactive Gallery) ─── */}
        <PurePhotographySection />

        {/* ─── Section 6: Stories That Save Lives (Testimonial Carousel) ─── */}
        <StoriesFromTheTableSection id="stories-that-save-lives" />

        {/* ─── Section 7: Serve Beside Us (Action Cards) ─── */}
        <AnotherSeatWaitingSection id="serve-beside-us" />

        {/* ─── Section 8: What's Coming Up Next (Showdown Event & Auditions) ─── */}
        <ShowdownSection id="what-coming-up-next" />
      </div>
    </>
  );
}

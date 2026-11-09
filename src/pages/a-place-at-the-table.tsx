import Seo from '@/components/Seo';
import PlaceAtTheTableSection from '@/components/how-we-serve/PlaceAtTheTableSection';
import ServingCommunityTogetherSection from '@/components/how-we-serve/ServingCommunityTogetherSection';
import PurePhotographySection from '@/components/how-we-serve/PurePhotographySection';
import StoriesFromTheTableSection from '@/components/how-we-serve/StoriesFromTheTableSection';
import AnotherSeatWaitingSection from '@/components/how-we-serve/AnotherSeatWaitingSection';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';

export default function APlaceAtTheTablePage() {
  return (
    <>
      <Seo 
        title="A Place at the Table — Live Achieve Believe" 
        description="Sometimes hope begins with a meal. Sharing meals, listening, and restoring human dignity one conversation at a time." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white">
        {/* ─── 1. Cinematic Dining Hero Video ─── */}
        <HowWeServeHero />

        {/* ─── 2. A Place at the Table Narrative ─── */}
        <PlaceAtTheTableSection id="place-at-the-table" />

        {/* ─── 3. Community Collaboration in Action ─── */}
        <ServingCommunityTogetherSection id="community-together" />

        {/* ─── 4. Authentic Moments Gallery ─── */}
        <PurePhotographySection />

        {/* ─── 5. Lived Experiences & Stories From the Table ─── */}
        <StoriesFromTheTableSection id="table-stories" />

        {/* ─── 6. Finale: Another Seat Waiting & Return to Hallway ─── */}
        <AnotherSeatWaitingSection id="another-seat-waiting" />
      </div>
    </>
  );
}


import Seo from "@/components/Seo";
import StoryHeroBanner from "@/components/experience-story/StoryHeroBanner";
import JourneyStorySection from "@/components/experience-story/JourneyStorySection";
import WhereJourneyBeganSection from "@/components/experience-story/WhereJourneyBeganSection";
import PeopleWhoChangedLivesSection from "@/components/experience-story/PeopleWhoChangedLivesSection";
import ThreeJourneysSection from "@/components/experience-story/ThreeJourneysSection";
import DocumentaryVideoSection from "@/components/experience-story/DocumentaryVideoSection";
import StoriesStageForHopeSection from "@/components/experience-story/StoriesStageForHopeSection";
import BestWayOutSection from "@/components/experience-story/BestWayOutSection";
import OurStoryStillWrittenSection from "@/components/experience-story/OurStoryStillWrittenSection";
import ThinkFeelActSection from "@/components/experience-story/ThinkFeelActSection";
import PlaceForYouCardSection from "@/components/experience-story/PlaceForYouCardSection";

export default function About() {
  return (
    <>
      <Seo
        title="Experience the Story — Live Achieve Believe"
        description="Experience an inspiring journey of real stories, human connection, and hope through documentary storytelling and compassionate direct action."
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1: Hero Banner (Figma Reference) ─── */}
        <StoryHeroBanner />

        {/* ─── Section 2: Journey Story Section ("Life has a way of taking us on journeys...") ─── */}
        <JourneyStorySection />

        {/* ─── Section 3: Where the Journey Began (Subtract.png + Founder's Story) ─── */}
        <WhereJourneyBeganSection />

        {/* ─── Section 4: The People Who Forever Changed Our Lives (COO & DOO Story) ─── */}
        <PeopleWhoChangedLivesSection />

        {/* ─── Section 5: Three Journeys. One Shared Purpose. ─── */}
        <ThreeJourneysSection />

        {/* ─── Section 6: Documentary Video (Experience Story 2) ─── */}
        <DocumentaryVideoSection />

        {/* ─── Section 7: When Stories Become a Stage for Hope ─── */}
        <StoriesStageForHopeSection />

        {/* ─── Section 8: The Best Way Out Is Always Through ─── */}
        <BestWayOutSection />

        {/* ─── Section 9: Our Story Is Still Being Written ─── */}
        <OurStoryStillWrittenSection />

        {/* ─── Section 10: Think Higher. Feel Deeper. Act with Purpose. (LIVE ACHIEVE BELIEVE) ─── */}
        <ThinkFeelActSection />

        {/* ─── Section 11: There's a Place for You Here (Callout Card) ─── */}
        <PlaceForYouCardSection />
      </div>
    </>
  );
}

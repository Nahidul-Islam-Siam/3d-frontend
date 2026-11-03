import Seo from '@/components/Seo';
import MeetUsBanner from '@/components/meet-us/MeetUsBanner';
import PeopleBehindMissionSection from '@/components/meet-us/PeopleBehindMissionSection';
import PeopleLeadingWaySection from '@/components/meet-us/PeopleLeadingWaySection';
import LeadershipSpotlightSection from '@/components/meet-us/LeadershipSpotlightSection';
import MomentsWhyWeServeSection from '@/components/meet-us/MomentsWhyWeServeSection';
import MissionBiggerSection from '@/components/meet-us/MissionBiggerSection';

export default function MeetUsPage() {
  return (
    <>
      <Seo
        title="Meet Us — Live Achieve Believe"
        description="The people behind the mission. Every life touched is carried by hands that chose to show up."
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1: Meet Us Cinematic Banner ─── */}
        <MeetUsBanner />

        {/* ─── Cream Spacer / Transition Band (Figma Frame 150px) ─── */}
        <div className="w-full h-24 sm:h-32 lg:h-40 bg-[#FAF4E6]" aria-hidden="true" />

        {/* ─── Section 2: The People Behind the Mission ─── */}
        <PeopleBehindMissionSection />

        {/* ─── Section 3: The People Leading the Way (Impact Stat Cards) ─── */}
        <PeopleLeadingWaySection />

        {/* ─── Section 4: Leadership Spotlight — Sarah Mitchell (Interactive 3D Section) ─── */}
        <LeadershipSpotlightSection />

        {/* ─── Section 5: The People, Places, and Moments That Remind Us Why We Serve (Interactive Gallery) ─── */}
        <MomentsWhyWeServeSection />

        {/* ─── Section 6: The Mission Is Bigger Than Any One Person (Cinematic Hands Section) ─── */}
        <MissionBiggerSection />

        {/* ─── Bottom Cream Transition Band (Figma Frame 150px) ─── */}
        <div className="w-full h-24 sm:h-32 lg:h-40 bg-[#FAF4E6]" aria-hidden="true" />
      </div>
    </>
  );
}

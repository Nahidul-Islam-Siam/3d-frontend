import Seo from '@/components/Seo';
import MeetUsBanner from '@/components/meet-us/MeetUsBanner';
import PeopleBehindMissionSection from '@/components/meet-us/PeopleBehindMissionSection';
import LeadershipSpotlightSection from '@/components/meet-us/LeadershipSpotlightSection';
import MomentsWhyWeServeSection from '@/components/meet-us/MomentsWhyWeServeSection';
import MissionBiggerSection from '@/components/meet-us/MissionBiggerSection';
import OneMovementSection from '@/components/meet-us/OneMovementSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';

export default function MeetUsPage() {
  return (
    <>
      <Seo
        title="Meet Us — Live Achieve Believe"
        description="The people behind the mission. Every life touched is carried by hands that chose to show up."
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1: Meet Us Cinematic Banner (Space & 3D Earth) ─── */}
        <MeetUsBanner />

        {/* ─── Section 2: The People Behind the Mission (Interactive 3D Zoom Map) ─── */}
        <PeopleBehindMissionSection />

        {/* ─── Section 3: The People Leading the Way & Leadership Voices (Stats & 3D Cards) ─── */}
        <LeadershipSpotlightSection />

        {/* ─── Section 4: The People, Places, and Moments That Remind Us Why We Serve (Interactive Gallery) ─── */}
        <MomentsWhyWeServeSection />

        {/* ─── Section 5: The Mission Is Bigger Than Any One Person (Cinematic Hands Section) ─── */}
        <MissionBiggerSection />

        {/* ─── Section 6: WE ARE MANY PEOPLE. ONE MOVEMENT. (Community Table Banner) ─── */}
        <OneMovementSection />

        {/* ─── Section 7: What's Coming Up Next (Showdown Suicide Awareness & Auditions) ─── */}
        <ShowdownSection id="what-coming-up-next" topCreamBand={true} bottomCreamBand={true} />
      </div>
    </>
  );
}

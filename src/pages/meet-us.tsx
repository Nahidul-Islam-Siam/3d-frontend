import { useEffect } from 'react';
import Seo from '@/components/Seo';
import MeetUsLeadershipSection from '@/components/meet-us/MeetUsLeadershipSection';
import MomentsWhyWeServeSection from '@/components/meet-us/MomentsWhyWeServeSection';
import PeopleLeadingWaySection from '@/components/meet-us/PeopleLeadingWaySection';
import OneMovementSection from '@/components/meet-us/OneMovementSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';

export default function MeetUsPage() {
  useEffect(() => {
    // Reveal global navbar for site redesign
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
  }, []);

  return (
    <>
      <Seo
        title="Meet Us — Live Achieve Believe"
        description="The people behind the mission. Every life touched is carried by hands that chose to show up."
      />

      {/* ─── Meet Us Redesign Canvas ─── */}
      <div className="w-full bg-[#FAF4E6] min-h-screen">
        {/* ─── Section 1: The People Behind Live Achieve Believe, Inc. (Leadership Profiles) ─── */}
        <MeetUsLeadershipSection />

        {/* ─── Section 2: The People, Places, and Moments That Remind Us Why We Serve ─── */}
        <MomentsWhyWeServeSection />

        {/* ─── Section 3: The People Leading the Way (Impact Stats Counter) ─── */}
        <PeopleLeadingWaySection />

        {/* ─── Section 4: WE ARE MANY PEOPLE. ONE MOVEMENT. (Cinematic Banner) ─── */}
        <OneMovementSection />

        {/* ─── Section 5: What's Coming Up Next (Showdown Suicide Awareness & Auditions) ─── */}
        <ShowdownSection
          id="what-coming-up-next"
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge={true}
          topCreamBand={true}
          bottomCreamBand={true}
        />
      </div>
    </>
  );
}

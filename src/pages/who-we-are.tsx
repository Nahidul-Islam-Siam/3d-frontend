import Seo from '@/components/Seo';
import WhoWeAreBanner from '@/components/who-we-are/WhoWeAreBanner';
import WeSeePeopleDifferentlySection from '@/components/who-we-are/WeSeePeopleDifferentlySection';
import OurNameIsOurInvitationSection from '@/components/who-we-are/OurNameIsOurInvitationSection';
import WhatGuidesOurHeartsSection from '@/components/who-we-are/WhatGuidesOurHeartsSection';
import TheLabWaySection from '@/components/who-we-are/TheLabWaySection';
import WeBelieveInThePowerOfTogetherSection from '@/components/who-we-are/WeBelieveInThePowerOfTogetherSection';
import TheHeartOfLabSection from '@/components/who-we-are/TheHeartOfLabSection';
import TheresRoomForYouSection from '@/components/who-we-are/TheresRoomForYouSection';
import WhoWeAreCtaBannerSection from '@/components/who-we-are/WhoWeAreCtaBannerSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';
// import LookingBeyondSection from '@/components/who-we-are/LookingBeyondSection';
// import MoreThanANameSection from '@/components/who-we-are/MoreThanANameSection';
// import WhoWeAreCoreValues from '@/components/who-we-are/WhoWeAreCoreValues';
// import WhoWeAreStorySection from '@/components/who-we-are/WhoWeAreStorySection';
// import PlaceForYouSection from '@/components/who-we-are/PlaceForYouSection';
// import WhoWeAreVideoSection from '@/components/who-we-are/WhoWeAreVideoSection';
// import PeopleMatterEveryDaySection from '@/components/who-we-are/PeopleMatterEveryDaySection';

export default function WhoWeArePage() {
  return (
    <>
      <Seo 
        title="Who We Are — Live Achieve Believe" 
        description="People Matter. It's That Simple. We believe extraordinary things happen when ordinary people choose to care. Every act of kindness has the power to restore dignity, renew hope, and change lives." 
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Redesign Section 1: Hero Banner ─── */}
        <WhoWeAreBanner />

        {/* ─── Redesign Section 2: We See People Differently ─── */}
        <WeSeePeopleDifferentlySection />

        {/* ─── Redesign Section 3: Our Name Is Our Invitation (LIVE. ACHIEVE. BELIEVE.) ─── */}
        <OurNameIsOurInvitationSection />

        {/* ─── Redesign Section 4: What Guides Our Hearts ─── */}
        <WhatGuidesOurHeartsSection />

        {/* ─── Redesign Section 5: The LAB Way (Think Higher. Feel Deeper. Act with Purpose.) ─── */}
        <TheLabWaySection />

        {/* ─── Redesign Section 6: We Believe in the Power of Together ─── */}
        <WeBelieveInThePowerOfTogetherSection />

        {/* ─── Redesign Section 7: The Heart of LAB (We are people who believe in people.) ─── */}
        <TheHeartOfLabSection />

        {/* ─── Redesign Section 8: There's Room for You in This Story ─── */}
        <TheresRoomForYouSection />

        {/* ─── Redesign Section 9: CTA Banner (Think Higher. Feel Deeper. Act with Purpose.) ─── */}
        <WhoWeAreCtaBannerSection />

        {/* ─── Redesign Section 10: Showdown Event (What's Coming Up Next) ─── */}
        <ShowdownSection id="what-coming-up-next" />

        {/* ─── Legacy sections preserved in comments ─── */}
        {/* WhoWeAreCoreValues */}
        {/* WhoWeAreStorySection */}
        {/* LookingBeyondSection */}
        {/* MoreThanANameSection */}
        {/* PlaceForYouSection */}
        {/* WhoWeAreVideoSection */}
        {/* PeopleMatterEveryDaySection */}
      </div>
    </>
  );
}

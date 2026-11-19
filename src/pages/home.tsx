import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import WelcomeExperience from '@/components/welcome/WelcomeExperience';
import StepInsideWelcomeSection from '@/components/welcome/StepInsideWelcomeSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import VisitorInterestFormSection from '@/components/welcome/VisitorInterestFormSection';
import TakingTheStageSection from '@/components/welcome/TakingTheStageSection';
import FourDoorsSection from '@/components/welcome/FourDoorsSection';
import { TakeAMomentSection } from '@/components/welcome/TakeAMomentSection';
import NeedSomeoneToTalkToSection from '@/components/welcome/NeedSomeoneToTalkToSection';
import OneMissionManyExpressionsSection from '@/components/welcome/OneMissionManyExpressionsSection';
import RoomForYourStorySection from '@/components/welcome/RoomForYourStorySection';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash deep link (e.g. #your-story or #visitor-interest-form)
    if (location.hash) {
      window.dispatchEvent(new CustomEvent('reveal-navbar'));
      const hashId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const target = document.getElementById(hashId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <Seo 
        title="Live Achieve Believe — Welcome" 
        description="An invitation to experience a place where compassion becomes action, hope becomes visible, and every story matters." 
      />

      {/* ─── 0. Welcome Video Hero (Cinematic Entrance) ─── */}
      <WelcomeExperience />

      {/* ─── Root Page Canvas (#FAF4E6) ─── */}
      <div className="w-full bg-[#FAF4E6]">
        {/* ─── 1. Step Inside. You Matter Here. (Centered) ─── */}
        <StepInsideWelcomeSection />

        {/* ─── 2. What's Coming Up Next (Full Width) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          title="What's Coming Up Next"
          subtitle="Showdown by sar and sar — reimagining experiences with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. Visitor Interest Form: Get Involved with LAB ─── */}
        <span id="your-story" className="block -mt-24 pt-24 pointer-events-none" />
        <VisitorInterestFormSection id="visitor-interest-form" />

        {/* ─── 4. Stage Section: Something Extraordinary Is Taking the Stage ─── */}
        <TakingTheStageSection id="taking-the-stage" />

        {/* ─── 5. Four Doors: Where would you like to go? ─── */}
        <FourDoorsSection id="four-doors" />

        {/* ─── 6. Mindfulness Section: Take a Moment. This One Is for You. ─── */}
        <TakeAMomentSection id="take-a-moment" />

        {/* ─── 7. Support Banner: Need Someone to Talk To? ─── */}
        <NeedSomeoneToTalkToSection id="need-someone-to-talk-to" />

        {/* ─── 8. Expressions Section: One Mission. Many Expressions. ─── */}
        <OneMissionManyExpressionsSection id="one-mission-many-expressions" />

        {/* ─── 9. Story Invitation: Now There's Room for Your Story ─── */}
        <RoomForYourStorySection id="room-for-your-story" />
      </div>
    </>
  );
}

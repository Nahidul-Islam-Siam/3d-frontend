import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import StepInsideWelcomeSection from '@/components/welcome/StepInsideWelcomeSection';
import TakingTheStageSection from '@/components/welcome/TakingTheStageSection';
import { TakeAMomentSection } from '@/components/welcome/TakeAMomentSection';
import NeedSomeoneToTalkToSection from '@/components/welcome/NeedSomeoneToTalkToSection';
import OneMissionManyExpressionsSection from '@/components/welcome/OneMissionManyExpressionsSection';
import RoomForYourStorySection from '@/components/welcome/RoomForYourStorySection';
import VisitorInterestFormSection from '@/components/welcome/VisitorInterestFormSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';
// import ZAxisStage from '@/components/welcome/ZAxisStage';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Reveal global navbar for site redesign
    window.dispatchEvent(new CustomEvent('reveal-navbar'));

    // Handle hash deep link (e.g. #your-story or #visitor-interest-form)
    if (location.hash) {
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

      {/* ─── Root Page Redesign Canvas ─── */}
      <div className="w-full bg-[#FAF4E6]">
        {/* Previous root components preserved (commented out) for site redesign */}
        {/* <ZAxisStage /> */}

        {/* ─── 1. Hero Section: Step Inside. You Matter Here. ─── */}
        <StepInsideWelcomeSection />

        {/* ─── 2. Stage Section: Something Extraordinary Is Taking the Stage ─── */}
        <TakingTheStageSection />

        {/* ─── 2.5 Next Event: What's Coming Up Next ─── */}
   

        {/* ─── 3. Mindfulness Section: Take a Moment. This One Is for You. ─── */}
        <TakeAMomentSection />

        {/* ─── 4. Support Banner: Need Someone to Talk To? ─── */}
        <NeedSomeoneToTalkToSection />

        {/* ─── 5. Expressions Section: One Mission. Many Expressions. ─── */}
        <OneMissionManyExpressionsSection />

        {/* ─── 6. Story Invitation: Now There's Room for Your Story ─── */}
        <RoomForYourStorySection />

        {/* ─── 7. Visitor Interest Form: Get Involved with LAB (Door 7: Your Story) ─── */}
        <span id="your-story" className="block -mt-24 pt-24 pointer-events-none" />
        <VisitorInterestFormSection id="visitor-interest-form" />

           <ShowdownSection id="what-coming-up-next" />
      </div>
    </>
  );
}

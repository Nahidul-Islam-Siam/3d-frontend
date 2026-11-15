import { useEffect } from 'react';
import Seo from '../components/Seo';
import StepInsideWelcomeSection from '@/components/welcome/StepInsideWelcomeSection';
import TakingTheStageSection from '@/components/welcome/TakingTheStageSection';
import { TakeAMomentSection } from '@/components/welcome/TakeAMomentSection';
// import ZAxisStage from '@/components/welcome/ZAxisStage';

export default function Home() {
  useEffect(() => {
    // Reveal global navbar for site redesign
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
  }, []);

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

        {/* ─── 3. Mindfulness Section: Take a Moment. This One Is for You. ─── */}
        <TakeAMomentSection />
      </div>
    </>
  );
}

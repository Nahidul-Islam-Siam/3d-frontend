import { useRef } from 'react';
import Seo from '@/components/Seo';
import ServeBesideUsHeroSection from '@/components/how-we-serve/serve-beside-us/ServeBesideUsHeroSection';
import WaysWeWalkSection from '@/components/how-we-serve/serve-beside-us/WaysWeWalkSection';
import UnfilteredHumanVoicesSection from '@/components/how-we-serve/serve-beside-us/UnfilteredHumanVoicesSection';
import WillingHeartCalloutSection from '@/components/how-we-serve/serve-beside-us/WillingHeartCalloutSection';
import FamilyTableVideoInterludeSection from '@/components/how-we-serve/serve-beside-us/FamilyTableVideoInterludeSection';
import ServeHopeTogetherFinaleSection from '@/components/how-we-serve/serve-beside-us/ServeHopeTogetherFinaleSection';

export default function ServeBesideUsPage() {
  const introStageRef = useRef<HTMLDivElement | null>(null);

  const handleScrollClick = () => {
    introStageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Seo 
        title="Serve Beside Us — Live Achieve Believe" 
        description="Sometimes purpose begins with saying yes. Discover how volunteers from every walk of life serve together to bring hope, dignity, and compassion to our community." 
      />

      <div className="w-full bg-[#0A0706] text-white selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        {/* ─── 1. VIDEO HERO & INTRO STAGE (Figma Frames 1 & 2) ─── */}
        <ServeBesideUsHeroSection onScrollClick={handleScrollClick} />

        {/* ─── 2. WAYS WE WALK BESIDE OUR COMMUNITY (Figma Frame 3) ─── */}
        <div ref={introStageRef}>
          <WaysWeWalkSection />
        </div>

        {/* ─── 3. UNFILTERED HUMAN VOICES (Figma Frame 4) ─── */}
        <UnfilteredHumanVoicesSection />

        {/* ─── 4. ANYONE WITH A WILLING HEART -> MAYBE... YOU (Figma Frame 5) ─── */}
        <WillingHeartCalloutSection />

        {/* ─── 5. FAMILY TABLE VIDEO INTERLUDE (Figma Frames 6 & 7) ─── */}
        <FamilyTableVideoInterludeSection />

        {/* ─── 6. GRAND FINALE CTA: LET'S SERVE HOPE TOGETHER (Figma Frame 8) ─── */}
        <ServeHopeTogetherFinaleSection />
      </div>
    </>
  );
}

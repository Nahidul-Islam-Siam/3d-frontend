import { useEffect } from 'react';
import Seo from '@/components/Seo';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import ServeBesideUsIntroSection from '@/components/how-we-serve/serve-beside-us/ServeBesideUsIntroSection';
import WaysWeWalkSection from '@/components/how-we-serve/serve-beside-us/WaysWeWalkSection';
import UnfilteredHumanVoicesSection from '@/components/how-we-serve/serve-beside-us/UnfilteredHumanVoicesSection';
import WillingHeartCalloutSection from '@/components/how-we-serve/serve-beside-us/WillingHeartCalloutSection';
import FamilyTableVideoInterludeSection from '@/components/how-we-serve/serve-beside-us/FamilyTableVideoInterludeSection';
import ServeHopeTogetherFinaleSection from '@/components/how-we-serve/serve-beside-us/ServeHopeTogetherFinaleSection';

import heroVideo from '@/assets/video/Untitled design.mp4.mp4';

export default function ServeBesideUsPage() {
  useEffect(() => {
    // Reveal global navbar and scroll to top
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo 
        title="Serve Beside Us — Live Achieve Believe" 
        description="Sometimes purpose begins with saying yes. Discover how volunteers from every walk of life serve together to bring hope, dignity, and compassion to our community." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        {/* ─── 1. VIDEO HERO CINEMA CARD (Figma Frame 1) ─── */}
        <HowWeServeHero 
          id="serve-beside-us-hero"
          videoSrc={heroVideo}
        />

        {/* ─── 2. WHAT'S COMING UP NEXT EVENT CARD (Figma Frame 2) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          rounded={true}
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. SERVE BESIDE US INTRO MANIFESTO & 4 PILLS (Figma Frame 3) ─── */}
        <ServeBesideUsIntroSection />

        {/* ─── 4. WAYS WE WALK BESIDE OUR COMMUNITY - 6 CARDS (Figma Frames 4 & 5) ─── */}
        <WaysWeWalkSection />

        {/* ─── 5. UNFILTERED HUMAN VOICES - 3 CARDS (Figma Frame 6) ─── */}
        <UnfilteredHumanVoicesSection />

        {/* ─── 6. ANYONE WITH A WILLING HEART -> MAYBE... YOU (Figma Frame 7) ─── */}
        <WillingHeartCalloutSection />

        {/* ─── 7. FAMILY TABLE VIDEO CINEMA CARD (Figma Frame 8) ─── */}
        <FamilyTableVideoInterludeSection />

        {/* ─── 8. GRAND FINALE ORANGE CARD: LET'S SERVE HOPE TOGETHER (Figma Frame 9) ─── */}
        <ServeHopeTogetherFinaleSection />
      </div>
    </>
  );
}

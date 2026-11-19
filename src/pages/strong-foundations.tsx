import { useEffect } from 'react';
import Seo from '@/components/Seo';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import StrongFoundationsSection from '@/components/how-we-serve/you-matter/StrongFoundationsSection';
import StaircaseProgressionSection from '@/components/how-we-serve/you-matter/StaircaseProgressionSection';
import InvestingInFutureSection from '@/components/how-we-serve/you-matter/InvestingInFutureSection';
import LeadsPartnershipSection from '@/components/how-we-serve/you-matter/LeadsPartnershipSection';
import ChoicesFutureSection from '@/components/how-we-serve/you-matter/ChoicesFutureSection';
import ClassroomMomentSection from '@/components/how-we-serve/you-matter/ClassroomMomentSection';
import YouMatterFinaleSection from '@/components/how-we-serve/you-matter/YouMatterFinaleSection';

import heroPoster from '@/assets/how-we-serve/you-matter/strong-foundations-hero.jpg';
import youthVideo from '@/assets/how-we-serve/you-matter/Bright_hopeful_youth_communit.mp4.mp4';

export default function StrongFoundationsPage() {
  useEffect(() => {
    // Reveal global navbar
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
  }, []);

  return (
    <>
      <Seo 
        title="Strong Foundations — Live Achieve Believe" 
        description="Our children and young adults are the future of our families, our communities, and our world. Discover how we partner with LEADS to build strong foundations for middle and high school students." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white">
        
        {/* ─── 1. Cinematic Hero Video / Image Cinema Card ─── */}
        <HowWeServeHero 
          id="strong-foundations-hero"
          videoSrc={youthVideo} 
          posterSrc={heroPoster} 
        />

        {/* ─── 2. Showdown Event Banner Card (What's Coming Up Next) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          rounded={true}
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. You Matter / Strong Foundations (Angled Youth Slices) ─── */}
        <StrongFoundationsSection />

        {/* ─── 4. 5-Step Staircase Progression (01 VALUE -> 05 PURPOSE) ─── */}
        <StaircaseProgressionSection />

        {/* ─── 5. Investing In The Future (4 Pillars) ─── */}
        <InvestingInFutureSection />

        {/* ─── 6. LEADS Partnership (5 Core Modules) ─── */}
        <LeadsPartnershipSection />

        {/* ─── 7. Choices Shape Our Future -> Climax ("YOU MATTER.") ─── */}
        <ChoicesFutureSection />

        {/* ─── 8. Classroom Moment Photo Visual ─── */}
        <ClassroomMomentSection />

        {/* ─── 9. Finale Call To Action ─── */}
        <YouMatterFinaleSection />

      </div>
    </>
  );
}

import { useRef } from 'react';
import Seo from '@/components/Seo';
import YouMatterHero from '@/components/how-we-serve/you-matter/YouMatterHero';
import StrongFoundationsSection from '@/components/how-we-serve/you-matter/StrongFoundationsSection';
import StaircaseProgressionSection from '@/components/how-we-serve/you-matter/StaircaseProgressionSection';
import InvestingInFutureSection from '@/components/how-we-serve/you-matter/InvestingInFutureSection';
import LeadsPartnershipSection from '@/components/how-we-serve/you-matter/LeadsPartnershipSection';
import ChoicesFutureSection from '@/components/how-we-serve/you-matter/ChoicesFutureSection';
import CosmicClimaxSection from '@/components/how-we-serve/you-matter/CosmicClimaxSection';
import ClassroomMomentSection from '@/components/how-we-serve/you-matter/ClassroomMomentSection';
import YouMatterFinaleSection from '@/components/how-we-serve/you-matter/YouMatterFinaleSection';

export default function YouMatterPage() {
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollClick = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Seo 
        title="You Matter — Live Achieve Believe" 
        description="Our children and young adults are the future of our families, our communities, and our world. Discover how we partner with LEADS to build strong foundations for middle and high school students." 
      />

      <div className="w-full bg-[#08070B] text-white selection:bg-[#F97316] selection:text-white">
        
        {/* ─── 1. HERO VIDEO & TITLE INTRO ─── */}
        <YouMatterHero onScrollClick={handleScrollClick} />

        {/* ─── 2. STRONG FOUNDATIONS (DIAGONAL YOUTH SLICES) ─── */}
        <div ref={nextSectionRef}>
          <StrongFoundationsSection />
        </div>

        {/* ─── 3. 5-STEP STAIRCASE PROGRESSION (01 VALUE -> 05 PURPOSE) ─── */}
        <StaircaseProgressionSection />

        {/* ─── 4. INVESTING IN THE FUTURE (4 PILLARS) ─── */}
        <InvestingInFutureSection />

        {/* ─── 5. LEADS PARTNERSHIP (5 CORE MODULES) ─── */}
        <LeadsPartnershipSection />

        {/* ─── 6. CHOICES SHAPE OUR FUTURE (STARFIELD + 4 DECISION STEPS) ─── */}
        <ChoicesFutureSection />

        {/* ─── 7. COSMIC CLIMAX ("YOU MATTER.") ─── */}
        <CosmicClimaxSection />

        {/* ─── 8. DIRECT CLASSROOM MOMENT VISUAL ─── */}
        <ClassroomMomentSection />

        {/* ─── 9. FINALE CALL TO ACTION ─── */}
        <YouMatterFinaleSection />

      </div>
    </>
  );
}


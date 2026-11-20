import { useEffect } from 'react';
import Seo from '@/components/Seo';
import NewBeginningHeroSection from '@/components/how-we-serve/a-new-beginning/NewBeginningHeroSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import ComingFullCircleSection from '@/components/how-we-serve/a-new-beginning/ComingFullCircleSection';
import EverydayCollectionSection from '@/components/how-we-serve/a-new-beginning/EverydayCollectionSection';
import KeepsGoodThingsMovingSection from '@/components/how-we-serve/a-new-beginning/KeepsGoodThingsMovingSection';
import PlaceInTheExchangeSection from '@/components/how-we-serve/a-new-beginning/PlaceInTheExchangeSection';
import EverythingAheadSection from '@/components/how-we-serve/a-new-beginning/EverythingAheadSection';
import NewBeginningFinaleSection from '@/components/how-we-serve/a-new-beginning/NewBeginningFinaleSection';

export default function ANewBeginningPage() {
  useEffect(() => {
    // Reveal global navbar for light creamy theme and scroll to top
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo 
        title="A New Beginning — Live Achieve Believe" 
        description="Good things have a way of finding their place. Connecting individuals and families with clothing, shoes, household essentials, and everyday necessities." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        {/* ─── 1. Photo Cinema Hero Card & Manifesto (Figma Frame 1) ─── */}
        <NewBeginningHeroSection />

        {/* ─── 2. What's Coming Up Next Showdown Card (Figma Frame 2) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          rounded={true}
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. Life Has a Wonderful Way of Coming Full Circle (Figma Frame 3) ─── */}
        <ComingFullCircleSection />

        {/* ─── 4. The Everyday Collection (Figma Frame 4) ─── */}
        <EverydayCollectionSection />

        {/* ─── 5. A Community That Keeps Good Things Moving (Figma Frame 5) ─── */}
        <KeepsGoodThingsMovingSection />

        {/* ─── 6. Find Your Place in the Exchange (Figma Frame 6) ─── */}
        <PlaceInTheExchangeSection />

        {/* ─── 7. Here's To Everything That's Ahead (Figma Frame 7) ─── */}
        <EverythingAheadSection />

        {/* ─── 8. Grand Finale: Be Part Of The Connection (Figma Frame 8) ─── */}
        <NewBeginningFinaleSection />
      </div>
    </>
  );
}

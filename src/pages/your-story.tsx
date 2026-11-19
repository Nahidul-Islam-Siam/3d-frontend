import { useEffect } from 'react';
import Seo from '@/components/Seo';
import YourStoryHeroSection from '@/components/how-we-serve/your-story/YourStoryHeroSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import { VisitorInterestFormSection } from '@/components/welcome/VisitorInterestFormSection';
import YourStoryBeginsHereSection from '@/components/how-we-serve/your-story/YourStoryBeginsHereSection';
import HowWeServeCardsSection from '@/components/how-we-serve/your-story/HowWeServeCardsSection';
import HowYouCanHelpSection from '@/components/how-we-serve/your-story/HowYouCanHelpSection';
import YourStoryFinaleSection from '@/components/how-we-serve/your-story/YourStoryFinaleSection';

export default function YourStoryPage() {
  useEffect(() => {
    // Reveal global navbar for light creamy theme and scroll to top
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo 
        title="Your Story — Live Achieve Believe" 
        description="Every story has the power to change another. Discover how you can share your gifts, volunteer, partner, sponsor, and become an essential part of Live Achieve Believe." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        {/* ─── 1. Photo Cinema Hero Card & Intro (Figma Frame 1) ─── */}
        <YourStoryHeroSection />

        {/* ─── 2. What's Coming Up Next Showdown Card (Figma Frame 2) ─── */}
        <ShowdownSection 
          id="what-coming-up-next"
          rounded={true}
          title="What's Coming Up Next"
          subtitle="Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope."
          hideBadge
          hideEventsStrip
        />

        {/* ─── 3. Visitor Interest Form: Get Involved with LAB (Figma Frame 3) ─── */}
        <VisitorInterestFormSection id="visitor-interest-form" />

        {/* ─── 4. Your Story Begins Here (Figma Frame 4) ─── */}
        <YourStoryBeginsHereSection />

        {/* ─── 5. How We Serve - 6 Pillar Cards Grid (Figma Frame 5) ─── */}
        <HowWeServeCardsSection />

        {/* ─── 6. How You Can Help Wide Card (Figma Frame 6) ─── */}
        <HowYouCanHelpSection />

        {/* ─── 7. Grand Finale Orange Card: Your Story Has The Power (Figma Frame 7) ─── */}
        <YourStoryFinaleSection />
      </div>
    </>
  );
}

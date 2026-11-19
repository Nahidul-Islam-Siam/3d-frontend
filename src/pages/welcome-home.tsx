import { useEffect } from 'react';
import Seo from '@/components/Seo';
import HowWeServeHero from '@/components/how-we-serve/HowWeServeHero';
import ShowdownSection from '@/components/welcome/ShowdownSection';
import WelcomeHomeStoriesSection from '@/components/how-we-serve/welcome-home/WelcomeHomeStoriesSection';
import WhatVeteransFeelSection from '@/components/how-we-serve/welcome-home/WhatVeteransFeelSection';
import ALetterWaitingSection from '@/components/how-we-serve/welcome-home/ALetterWaitingSection';
import VeteranNewDoorSection from '@/components/how-we-serve/welcome-home/VeteranNewDoorSection';
import WelcomeHomeFinaleSection from '@/components/how-we-serve/welcome-home/WelcomeHomeFinaleSection';

import porchVideo from '@/assets/how-we-serve/welcome-home/gemini_generated_video_b330336e.mp4.mp4';

export default function WelcomeHomePage() {
  useEffect(() => {
    // Reveal global navbar for light creamy theme
    window.dispatchEvent(new CustomEvent('reveal-navbar'));
  }, []);

  return (
    <>
      <Seo 
        title="Welcome Home — Live Achieve Believe" 
        description="Sometimes hope begins with a key. Honoring our veterans and families with fully furnished housing, essential moving assistance, and dignified community support." 
      />

      <div className="w-full bg-[#FAF4E6] text-[#2C261E] selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        
        {/* ─── 1. Front Porch Video Cinema Card (Matches Figma 1:1) ─── */}
        <HowWeServeHero 
          id="welcome-home-hero"
          videoSrc={porchVideo}
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

        {/* ─── 3. Welcome Home Title & 2 Alternating Story Blocks ─── */}
        <WelcomeHomeStoriesSection />

        {/* ─── 4. What We Hope Every Veteran Feels (5 Covenant Cards) ─── */}
        <WhatVeteransFeelSection />

        {/* ─── 5. A Letter Waiting (Full-Bleed Photographic Stage) ─── */}
        <ALetterWaitingSection />

        {/* ─── 6. Young Veteran Turning Key Into Home (Cinema Video Card) ─── */}
        <VeteranNewDoorSection />

        {/* ─── 7. Grand Finale: Let's Help Welcome The Next Hero Home ─── */}
        <WelcomeHomeFinaleSection />

      </div>
    </>
  );
}

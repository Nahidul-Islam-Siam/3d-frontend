import { useRef } from 'react';
import Seo from '@/components/Seo';
import StoriesHeroSection from '@/components/how-we-serve/stories-that-save-lives/StoriesHeroSection';
import CarryingAStorySection from '@/components/how-we-serve/stories-that-save-lives/CarryingAStorySection';
import ShowdownExperienceGallery from '@/components/how-we-serve/stories-that-save-lives/ShowdownExperienceGallery';
import WhenCurtainClosesSection from '@/components/how-we-serve/stories-that-save-lives/WhenCurtainClosesSection';
import SanctuaryClimaxSection from '@/components/how-we-serve/stories-that-save-lives/SanctuaryClimaxSection';
import DocumentaryInterludeSection from '@/components/how-we-serve/stories-that-save-lives/DocumentaryInterludeSection';
import StoriesStarryReflectionSection from '@/components/how-we-serve/stories-that-save-lives/StoriesStarryReflectionSection';
import StoriesFinaleSection from '@/components/how-we-serve/stories-that-save-lives/StoriesFinaleSection';

export default function StoriesThatSaveLivesPage() {
  const nextSectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollClick = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Seo 
        title="Stories That Save Lives — Live Achieve Believe" 
        description="Sometimes hope begins with one conversation. Discover how Live Achieve Believe elevates documentary storytelling, theatrical vulnerability, and community presence to save lives." 
      />

      <div className="w-full bg-[#08070B] text-white selection:bg-[#F97316] selection:text-white overflow-x-hidden">
        
        {/* ─── 1. HERO VIDEO & TITLE INTRO (Frames 1 & 2) ─── */}
        <StoriesHeroSection onScrollClick={handleScrollClick} />

        {/* ─── 2. EVERY PERSON CARRYING A STORY (Frame 3) ─── */}
        <div ref={nextSectionRef}>
          <CarryingAStorySection />
        </div>

        {/* ─── 3. SHOWDOWN EXPERIENCE GALLERY (Frame 4) ─── */}
        <ShowdownExperienceGallery />

        {/* ─── 4. WHEN THE CURTAIN CLOSES (Frame 5) ─── */}
        <WhenCurtainClosesSection />

        {/* ─── 5. SANCTUARY CLIMAX: WHO IS THIS BUILT FOR? -> "YOU." (Frame 6) ─── */}
        <SanctuaryClimaxSection />

        {/* ─── 6. DOCUMENTARY REST INTERLUDE (Frame 7) ─── */}
        <DocumentaryInterludeSection />

        {/* ─── 7. STARRY NIGHT REFLECTION (Frame 8) ─── */}
        <StoriesStarryReflectionSection />

        {/* ─── 8. GRAND FINALE CTA: TOMORROW IS WORTH SEEING (Frame 9) ─── */}
        <StoriesFinaleSection />

      </div>
    </>
  );
}


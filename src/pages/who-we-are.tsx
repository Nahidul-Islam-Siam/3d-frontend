import Seo from '@/components/Seo';
import WhoWeAreBanner from '@/components/who-we-are/WhoWeAreBanner';
import WhoWeAreStorySection from '@/components/who-we-are/WhoWeAreStorySection';
import WhoWeAreCoreValues from '@/components/who-we-are/WhoWeAreCoreValues';
import LookingBeyondSection from '@/components/who-we-are/LookingBeyondSection';
import MoreThanANameSection from '@/components/who-we-are/MoreThanANameSection';
import PlaceForYouSection from '@/components/who-we-are/PlaceForYouSection';
import WhoWeAreVideoSection from '@/components/who-we-are/WhoWeAreVideoSection';

export default function WhoWeArePage() {
  return (
    <>
      <Seo 
        title="Who We Are — Live Achieve Believe" 
        description="People Matter. It's That Simple. We believe extraordinary things happen when ordinary people choose to care. Every act of kindness has the power to restore dignity, renew hope, and change lives." 
      />

      <div className="w-full">
        {/* ─── Section 1: Who We Are Page Hero Banner ─── */}
        <WhoWeAreBanner />

        {/* ─── Section 2: Who We Are Story & Community Mission ─── */}
        <WhoWeAreStorySection />

        {/* ─── Section 3: Our Core Values (Frame 350) ─── */}
        <WhoWeAreCoreValues />

        {/* ─── Section 4: Looking Beyond the Surface ─── */}
        <LookingBeyondSection />

        {/* ─── Section 5: More Than a Name. A Way of Life. (Frame 360) ─── */}
        <MoreThanANameSection />

        {/* ─── Section 6: There's a Place for You Here. (Subtract copy.png) ─── */}
        <PlaceForYouSection />

        {/* ─── Section 7: Cinematic 3D Video Experience ─── */}
        <WhoWeAreVideoSection />
      </div>
    </>
  );
}

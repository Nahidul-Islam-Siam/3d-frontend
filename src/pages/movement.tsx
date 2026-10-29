import Seo from '@/components/Seo';
import MovementHeroBanner from '@/components/join-movement/MovementHeroBanner';
import MovementTitleSection from '@/components/join-movement/MovementTitleSection';
import SomeoneNoticesSection from '@/components/join-movement/SomeoneNoticesSection';
import BuiltByCommunitySection from '@/components/join-movement/BuiltByCommunitySection';
import WhereDoYouSeeSection from '@/components/join-movement/WhereDoYouSeeSection';
import LivingMovementSection from '@/components/join-movement/LivingMovementSection';
import FacesOfMovementSection from '@/components/join-movement/FacesOfMovementSection';
import MovementThirdVideo from '@/components/join-movement/MovementThirdVideo';
import ReasonSomeoneBelievesSection from '@/components/join-movement/ReasonSomeoneBelievesSection';
import ShowdownSection from '@/components/welcome/ShowdownSection';

export default function MovementPage() {
  return (
    <>
      <Seo 
        title="Join the Movement — Live Achieve Believe" 
        description="Together, we become the reason someone believes tomorrow is worth seeing. Discover pathways, volunteer, sponsor, and walk beside neighbors who need hope." 
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1 & 2: Pinned Cinematic Video Stage (Banner Video into Second Video Open Animation) ─── */}
        <MovementHeroBanner />

        {/* ─── Section 3: "JOIN THE MOVEMENT" Title & Flourish Leaves ─── */}
        <MovementTitleSection />

        {/* ─── Section 4: "Someone Notices" Dark Cinematic Card ─── */}
        <SomeoneNoticesSection />

        {/* ─── Section 5: "Never Meant To Be Built By One Person" Community Pillars ─── */}
        <BuiltByCommunitySection />

        {/* ─── Section 6: "WHERE DO YOU SEE YOURSELF?" Pathway Cards Carousel ─── */}
        <WhereDoYouSeeSection />

        {/* ─── Section 7: "A LIVING MOVEMENT" Network Constellation Graph ─── */}
        <LivingMovementSection />

        {/* ─── Section 8: "Faces Of The Movement" Community Gallery ─── */}
        <FacesOfMovementSection />

        {/* ─── Section 9: Third Video (join-the-movement-3.mp4 - Directly Above Section 10) ─── */}
        <MovementThirdVideo />

        {/* ─── Section 10: "TOGETHER... Let's Be The Reason Someone Believes Tomorrow Is Worth Seeing" ─── */}
        <ReasonSomeoneBelievesSection />

        {/* ─── Section 11: "What’s Coming Up Next" (Reusable Showdown Section) ─── */}
        <ShowdownSection />
      </div>
    </>
  );
}

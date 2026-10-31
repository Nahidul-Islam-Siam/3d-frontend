import Seo from "@/components/Seo";
import StoryHeroBanner from "@/components/experience-story/StoryHeroBanner";
import DocumentaryVideoSection from "@/components/experience-story/DocumentaryVideoSection";
import ShowdownSection from "@/components/welcome/ShowdownSection";
import FourDoorsSection from "@/components/welcome/FourDoorsSection";

export default function About() {
  return (
    <>
      <Seo
        title="Experience the Story — Live Achieve Believe"
        description="Experience an inspiring journey of real stories, human connection, and hope through documentary storytelling and compassionate direct action."
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1 & 2: Pinned Theatrical Stage (Hero Video transitions into Living Room Scene in the exact same position) ─── */}
        <StoryHeroBanner />

        {/* ─── Section 3: Documentary Video (Experience Story 2) ─── */}
        <DocumentaryVideoSection />

        {/* ─── Section 4: What’s Coming Up Next (Showdown Section from Welcome) ─── */}
        <ShowdownSection />

        {/* ─── Section 5: Where Would You Like To Go? (Four Doors from Welcome) ─── */}
        <div className="py-16">
          <FourDoorsSection />
        </div>
      </div>
    </>
  );
}

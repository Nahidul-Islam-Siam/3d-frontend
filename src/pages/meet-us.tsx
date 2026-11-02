import Seo from '@/components/Seo';
import MeetUsBanner from '@/components/meet-us/MeetUsBanner';

export default function MeetUsPage() {
  return (
    <>
      <Seo
        title="Meet Us — Live Achieve Believe"
        description="The people behind the mission. Every life touched is carried by hands that chose to show up."
      />

      <div className="w-full bg-[#FAF4E6]">
        {/* ─── Section 1: Meet Us Cinematic Banner ─── */}
        <MeetUsBanner />
      </div>
    </>
  );
}


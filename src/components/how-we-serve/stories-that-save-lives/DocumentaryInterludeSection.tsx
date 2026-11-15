import heroVideo from '@/assets/how-we-serve/stories-that-save-lives/Untitled design (3).mp4.mp4';
import heroPoster from '@/assets/how-we-serve/stories-that-save-lives/image copy.png';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

export default function DocumentaryInterludeSection() {
  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/stories-that-save-lives', '/stories-that-save-lives'],
    slotMatchers: ['interlude', 'documentary', 'second'],
    slotIndex: 1,
    fallbackUrl: heroVideo,
    fallbackPoster: heroPoster,
  });

  return (
    <section 
      id="documentary-interlude"
      className="relative w-full h-[65vh] sm:h-[80vh] lg:h-screen min-h-[500px] bg-[#FAF4E6] text-[#2C261E] select-none overflow-hidden"
    >
      {/* ─── Full-Bleed Edge-to-Edge Documentary Video ─── */}
      <div className="relative w-full h-full overflow-hidden bg-[#FAF4E6]">
        <video
          src={liveVideo.videoUrl}
          poster={liveVideo.posterUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Cinematic Vignette Overlay blending with creamy theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4E6] via-transparent to-[#FAF4E6] pointer-events-none" />
      </div>
    </section>
  );
}


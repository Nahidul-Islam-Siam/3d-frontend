import heroVideo from '@/assets/how-we-serve/stories-that-save-lives/Untitled design (3).mp4.mp4';
import heroPoster from '@/assets/how-we-serve/stories-that-save-lives/image copy.png';

export default function DocumentaryInterludeSection() {
  return (
    <section 
      id="documentary-interlude"
      className="relative w-full h-[65vh] sm:h-[80vh] lg:h-screen min-h-[500px] bg-black text-white select-none overflow-hidden"
    >
      {/* ─── Full-Bleed Edge-to-Edge Documentary Video ─── */}
      <div className="relative w-full h-full overflow-hidden bg-black">
        <video
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08070B] via-transparent to-[#08070B] pointer-events-none" />
      </div>
    </section>
  );
}


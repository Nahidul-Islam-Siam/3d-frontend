import classroomVideo from '@/assets/how-we-serve/you-matter/Cinematic_documentary_style_sc.mp4.mp4';
import classroomImg from '@/assets/how-we-serve/you-matter/image copy 8.png';

export default function ClassroomMomentSection() {
  return (
    <section 
      id="classroom-moment"
      className="relative w-full h-[65vh] sm:h-[80vh] lg:h-screen min-h-[500px] bg-black text-white select-none overflow-hidden"
    >
      {/* ─── Full-Bleed Edge-to-Edge Cinematic Video ─── */}
      <div className="relative w-full h-full overflow-hidden bg-black">
        <video
          src={classroomVideo}
          poster={classroomImg}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
      </div>
    </section>
  );
}

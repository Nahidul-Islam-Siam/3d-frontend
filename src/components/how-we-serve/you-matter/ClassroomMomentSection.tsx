import { motion } from 'framer-motion';
import classroomVideo from '@/assets/how-we-serve/you-matter/Cinematic_documentary_style_sc.mp4.mp4';
import classroomImg from '@/assets/how-we-serve/you-matter/image copy 8.png';

export default function ClassroomMomentSection() {
  return (
    <section 
      id="classroom-moment"
      className="relative w-full min-h-screen bg-[#050407] text-white flex items-center justify-center py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-center">
        
        {/* ─── Cinematic Video Player Container (Figma 1:1) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.95)] border border-white/10 group bg-black"
        >
          <video
            src={classroomVideo}
            poster={classroomImg}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Bottom Left Capsule Pill (Figma 1:1) */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-[13px] font-sans">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              Direct Classroom Engagement · LEADS Interactive Curriculum
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

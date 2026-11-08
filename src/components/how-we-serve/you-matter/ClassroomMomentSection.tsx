import { motion } from 'framer-motion';
import classroomImg from '@/assets/how-we-serve/you-matter/image copy 8.png';

export default function ClassroomMomentSection() {
  return (
    <section 
      id="classroom-moment"
      className="relative w-full min-h-screen bg-[#050407] text-white flex items-center justify-center py-20 sm:py-24 px-6 sm:px-12 lg:px-20 xl:px-28 select-none overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1720px] mx-auto flex flex-col items-center">
        
        {/* ─── Cinematic Full-Width Photo Frame (Matching Figma Frame 9) ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.95)] border border-white/10 group"
        >
          <img
            src={classroomImg}
            alt="Students and mentors gathered in a bright, supportive classroom environment"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050407]/80 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,4,7,0.7)_100%)] pointer-events-none" />

          {/* Subtle Bottom Caption Pill */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-sm sm:text-base font-sans">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-pulse" />
              Direct Classroom Engagement · LEADS Interactive Curriculum
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

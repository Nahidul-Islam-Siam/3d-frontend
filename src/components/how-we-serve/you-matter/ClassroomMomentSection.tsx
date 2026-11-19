import { motion } from 'framer-motion';
import classroomVideo from '@/assets/how-we-serve/you-matter/Cinematic_documentary_style_sc.mp4.mp4';
import classroomImg from '@/assets/how-we-serve/you-matter/image copy 8.png';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

export default function ClassroomMomentSection() {
  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/strong-foundations', '/how-we-serve/you-matter', '/you-matter'],
    slotMatchers: ['classroom', 'moment', 'documentary', 'second'],
    slotIndex: 1,
    fallbackUrl: classroomVideo,
    fallbackPoster: classroomImg,
  });

  return (
    <section 
      id="classroom-moment"
      className="relative w-full bg-[#FAF4E6] pt-10 sm:pt-14 lg:pt-16 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      <div className="w-full max-w-[1140px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(44,36,29,0.08)] bg-stone-900"
        >
          <video
            src={liveVideo.videoUrl}
            poster={liveVideo.posterUrl || classroomImg}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}

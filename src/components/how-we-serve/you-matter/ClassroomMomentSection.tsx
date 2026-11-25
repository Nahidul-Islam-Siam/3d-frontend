import { useState, useRef } from 'react';
import { useAutoPauseOnScroll } from '@/lib/hooks/useAutoPauseOnScroll';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import classroomVideo from '@/assets/how-we-serve/you-matter/Cinematic_documentary_style_sc.mp4.mp4';
import classroomImg from '@/assets/how-we-serve/you-matter/image copy 8.png';
import { usePublicVideoSlot } from '@/lib/hooks/usePublicCms';

export default function ClassroomMomentSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto pause & mute when scrolling past this section
  useAutoPauseOnScroll(videoRef, undefined, setIsMuted, { autoResumeMuted: true });

  const liveVideo = usePublicVideoSlot({
    pagePaths: ['/how-we-serve/strong-foundations', '/how-we-serve/you-matter', '/you-matter'],
    slotMatchers: ['classroom', 'moment', 'documentary', 'second'],
    slotIndex: 1,
    fallbackUrl: classroomVideo,
    fallbackPoster: classroomImg,
  });

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

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
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_12px_40px_rgba(44,36,29,0.08)] bg-stone-900 group"
        >
          <video
            ref={videoRef}
            src={liveVideo.videoUrl}
            poster={liveVideo.posterUrl || classroomImg}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center cursor-pointer"
            onClick={toggleMute}
          />

          {/* Sound Toggle Button (Top Right) */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
              className={`flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-sans font-semibold tracking-wide uppercase transition-all backdrop-blur-md shadow-xl cursor-pointer ${
                isMuted
                  ? 'bg-gradient-to-r from-[#F97316] to-[#ea580c] text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:scale-105 animate-pulse'
                  : 'bg-black/70 hover:bg-black/90 text-white border border-white/30'
              }`}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                  <span>Tap for Sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Sound On</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '@/assets/join-movement/join-movement.mp4';
import MovementSecondVideo from './MovementSecondVideo';

gsap.registerPlugin(ScrollTrigger);

export interface MovementHeroBannerProps {
  onScrollNext?: () => void;
  className?: string;
}

export default function MovementHeroBanner({
  onScrollNext,
  className = '',
}: MovementHeroBannerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const video1WrapperRef = useRef<HTMLDivElement | null>(null);
  const video2WrapperRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const promptBtnRef = useRef<HTMLButtonElement | null>(null);

  const [activeStage, setActiveStage] = useState<'video1' | 'video2'>('video1');
  const [, setIsVideo1Playing] = useState<boolean>(true);

  // Toggle Banner Video play/pause on click with sound
  const toggleVideo1Play = () => {
    const video = video1Ref.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video.play().then(() => setIsVideo1Playing(true)).catch(() => {});
    } else {
      video.pause();
      setIsVideo1Playing(false);
    }
  };

  // ─── GSAP ScrollTrigger Pinned Opening Animation ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const v1 = video1WrapperRef.current;
    const v2 = video2WrapperRef.current;
    const prompt = promptBtnRef.current;

    if (!container || !stage || !v1 || !v2) return;

    // Initial resting positions
    gsap.set(v1, { scale: 1, autoAlpha: 1 });
    if (prompt) gsap.set(prompt, { autoAlpha: 1 });
    gsap.set(v2, {
      scale: 0.78,
      autoAlpha: 0,
      y: 45,
      clipPath: 'inset(25% 18% 25% 18% round 42px)',
      webkitClipPath: 'inset(25% 18% 25% 18% round 42px)',
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px',
          end: '+=1100',
          pin: stage,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= 0.38) {
              setActiveStage('video2');
              if (video1Ref.current && !video1Ref.current.muted) {
                video1Ref.current.muted = true;
              }
            } else {
              setActiveStage('video1');
              if (video1Ref.current && video1Ref.current.muted) {
                video1Ref.current.muted = false;
              }
            }
          },
        },
      });

      // 1. Scroll prompt fades out quickly
      if (prompt) {
        tl.to(prompt, { autoAlpha: 0, duration: 0.12, ease: 'power1.out' }, 0);
      }

      // 2. Banner video scales back slightly and dims out
      tl.to(
        v1,
        {
          scale: 0.93,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0.08
      );

      // 3. Second video opens like a cinema shutter in the same position
      tl.to(
        v2,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0% round 32px)',
          webkitClipPath: 'inset(0% 0% 0% 0% round 32px)',
          duration: 0.72,
          ease: 'power2.out',
        },
        0.12
      );

      // 4. Hold/stay phase so user can enjoy the opened video in place
      tl.to({}, { duration: 0.35 });
    }, container);

    // Refresh ScrollTrigger to calculate accurate pin offsets
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Autoplay banner video with sound
  useEffect(() => {
    const video = video1Ref.current;
    if (!video) return;

    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  // Handle smooth scrub to the opened second video
  const handleScrollToSecond = () => {
    if (onScrollNext) {
      onScrollNext();
      return;
    }
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string | HTMLElement, options?: { duration?: number }) => void } }).__lenis;
    if (containerRef.current) {
      const targetTop = containerRef.current.offsetTop + 950;
      if (lenis) {
        lenis.scrollTo(targetTop, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full bg-[#FAF4E6] ${className}`}
    >
      {/* ─── GSAP Pinned Stage: Locked in the same position below the navbar ─── */}
      <div 
        ref={pinnedStageRef}
        className="relative w-full h-[calc(100vh-74px)] overflow-hidden flex items-center justify-center bg-[#FAF4E6]"
      >
        
        {/* ─── LAYER 1: Fullscreen Banner Video (join-movement.mp4) ─── */}
        <div
          ref={video1WrapperRef}
          onClick={toggleVideo1Play}
          className="absolute inset-0 w-full h-full bg-black flex items-center justify-center cursor-pointer select-none"
        >
          <video
            ref={video1Ref}
            src={heroVideo}
            autoPlay
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Ambient Subtle Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

          {/* ─── Scroll Prompt Button ─── */}
          <button
            ref={promptBtnRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleScrollToSecond();
            }}
            className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 cursor-pointer select-none group text-white/90 hover:text-white transition-all bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full border border-white/20 shadow-xl"
            aria-label="Scroll to enter the story"
          >
            <div className="w-5 h-5 rounded-full border border-white/50 group-hover:border-white flex items-center justify-center shrink-0 transition-colors">
              <ArrowDown className="w-3 h-3 text-white animate-bounce" />
            </div>
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[9px] sm:text-[11px] md:text-xs uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors whitespace-nowrap font-medium"
            >
              SCROLL TO ENTER THE STORY
            </span>
          </button>
        </div>

        {/* ─── LAYER 2: Second Video Opens in Place (join-the-movement-2.mp4) ─── */}
        <div
          ref={video2WrapperRef}
          className="relative z-20 w-full max-w-[1720px] px-3 sm:px-6 lg:px-12 xl:px-16 flex items-center justify-center select-none"
        >
          <MovementSecondVideo 
            isEmbedded
            isActive={activeStage === 'video2'}
          />
        </div>

      </div>
    </div>
  );
}

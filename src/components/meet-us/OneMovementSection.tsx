import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';
import communityBg from '@/assets/meet-us/Meet Us.png';

export interface OneMovementSectionProps {
  id?: string;
  className?: string;
}

export default function OneMovementSection({
  id = 'one-movement',
  className = '',
}: OneMovementSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Subtle mouse inertia parallax on the background photo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-1.5%', '1.5%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full bg-[#FAF4E6] py-10 sm:py-14 lg:py-18 overflow-hidden select-none ${className}`}
    >
      {/* ─── Inner Cinema Banner Box (Exact Figma Frame Proportion) ─── */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] bg-black overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image with subtle parallax */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute -inset-[3%] w-[106%] h-[106%] pointer-events-none select-none"
          aria-hidden="true"
        >
          <img
            src={communityBg}
            alt="Community gathering at table — Live Achieve Believe"
            className="w-full h-full object-cover object-center filter grayscale-[35%] contrast-[1.1] pointer-events-none"
          />
        </motion.div>

        {/* Cinematic Dark Vignette Overlay for Text Legibility */}
        <div
          className="absolute inset-0 bg-black/60 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Ambient Warm Radial Spotlight */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.18)_0%,_rgba(0,0,0,0.45)_55%,_rgba(0,0,0,0.85)_100%)] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* ─── Central Content ─── */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24">
          {/* Main Title: 2 Lines matching Figma 1:1 */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-bold tracking-tight uppercase leading-[1.08] text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            <span className="block text-white">WE ARE MANY PEOPLE.</span>
            <span className="block text-[#F97316] mt-1.5 sm:mt-2.5">
              ONE MOVEMENT.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 sm:mt-5 md:mt-6 text-stone-200 text-sm sm:text-base lg:text-[17px] font-sans font-normal leading-relaxed text-center max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
          >
            Your story can be part of it. Whether you have two hours a month or a
            calling to launch a local neighborhood circle.
          </motion.p>

          {/* Action Triggers using Reusable FigmaButton */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4.5"
          >
            <FigmaButton to="/movement" variant="primary" size="lg">
              Join the Movement
            </FigmaButton>

            <FigmaButton to="/donate" variant="white" size="lg">
              Give Hope
            </FigmaButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


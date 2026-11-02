import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import starryBg from '@/assets/meet-us/starry-cosmic-bg.png';
import sarahPhoto from '@/assets/meet-us/sarah-mitchell.png';

export interface LeadershipSpotlightSectionProps {
  className?: string;
  onScrollClick?: () => void;
}

export default function LeadershipSpotlightSection({
  className = '',
  onScrollClick,
}: LeadershipSpotlightSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (-0.5 to 0.5 relative to card center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth cinematic spring physics
  const springConfig = { stiffness: 140, damping: 18, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D card tilt transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['9deg', '-9deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-9deg', '9deg']);

  // Parallax shifts for cosmic background
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], ['-10px', '10px']);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], ['-8px', '8px']);

  // Dynamic light sheen across the card surface
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

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
    setIsHovered(false);
  };

  const handleScrollDown = () => {
    if (onScrollClick) {
      onScrollClick();
      return;
    }

    const nextSection = document.getElementById('meet-us-team-grid') || document.getElementById('meet-us-next');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="leadership-spotlight"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full min-h-[calc(100vh-74px)] lg:h-[calc(100vh-74px)] lg:max-h-[920px] bg-[#020409] overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* ─── Cosmic Starry Sky with Horizon Amber Glow (Parallax Layer) ─── */}
      <motion.img
        src={starryBg}
        alt="Cosmic starry background"
        style={{
          x: bgTranslateX,
          y: bgTranslateY,
          scale: 1.04,
        }}
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none transition-transform duration-700 ease-out"
        aria-hidden="true"
      />

      {/* ─── Ambient Glow Enhancer ─── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-orange-950/20 via-transparent to-black/30 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── Top Spacer for Balance ─── */}
      <div className="w-full h-8 sm:h-12 pointer-events-none" aria-hidden="true" />

      {/* ─── Main Content Row (1416px Figma Container) ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Leader Name & Executive Title */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left lg:pl-4 xl:pl-8"
          >
            {/* Leader Name */}
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            >
              Sarah Mitchell
            </h3>

            {/* Leadership Role / Title */}
            <p className="mt-2.5 sm:mt-3 text-[#A89880] text-sm sm:text-base lg:text-[17px] font-sans font-normal tracking-wide drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
              Chief Operating Officer
            </p>

            {/* Interactive Leadership Mission Tag */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.9 : 0.65 }}
              transition={{ duration: 0.4 }}
              className="mt-6 sm:mt-8 text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-sm hidden sm:block"
            >
              Guiding daily operations and community pathways to make sure every story finds dignity and a seat at the table.
            </motion.p>
          </motion.div>

          {/* Right Column: Interactive 3D Tilt Portrait Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                perspective: 1200,
              }}
              className="relative group cursor-pointer"
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden max-w-[340px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[540px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-5px_rgba(249,115,22,0.18)] border border-white/10 group-hover:border-white/25 transition-colors duration-500"
              >
                {/* Portrait Photo */}
                <img
                  src={sarahPhoto}
                  alt="Sarah Mitchell — Chief Operating Officer"
                  className="w-full h-auto object-cover select-none pointer-events-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Interactive Dynamic Sheen Glare */}
                <motion.div
                  style={{
                    background: useTransform(
                      [glareX, glareY],
                      ([gx, gy]) =>
                        `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 65%)`
                    ),
                  }}
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Subtle Edge Vignette */}
                <div
                  className="absolute inset-0 rounded-[28px] sm:rounded-[32px] ring-1 ring-inset ring-white/15 pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ─── Bottom-Right CTA: SCROLL TO ENTER STORY ─── */}
      <div className="relative z-10 w-full max-w-[1416px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-0 pb-8 sm:pb-10 lg:pb-12 flex justify-end items-end">
        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-center gap-2.5 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-white rounded-full p-1"
        >
          {/* Circular Down Arrow Icon Badge */}
          <span className="w-5 h-5 rounded-full border border-white/60 group-hover:border-white flex items-center justify-center transition-all duration-300">
            <svg
              className="w-2.5 h-2.5 text-white/80 group-hover:text-white transition-transform duration-300 group-hover:translate-y-0.5"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="2" x2="5" y2="8" />
              <polyline points="2.5 5.5 5 8 7.5 5.5" />
            </svg>
          </span>

          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase text-white/80 group-hover:text-white transition-colors duration-300"
          >
            SCROLL TO ENTER STORY
          </span>
        </motion.button>
      </div>
    </section>
  );
}


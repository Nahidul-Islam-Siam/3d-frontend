import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Utensils, HeartHandshake, Sparkles } from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';
import communityBg from '@/assets/meet-us/Meet Us.png';

export interface OneMovementSectionProps {
  id?: string;
  className?: string;
}

interface CommunityStoryPin {
  id: string;
  top: string;
  left: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const storyPins: CommunityStoryPin[] = [
  {
    id: 'meals',
    top: '44%',
    left: '22%',
    title: 'Family Feasts',
    subtitle: 'Nourishing dignity & food security',
    icon: Utensils,
  },
  {
    id: 'belonging',
    top: '70%',
    left: '50%',
    title: 'Belonging Circles',
    subtitle: 'A seat at the table for everyone',
    icon: Sparkles,
  },
  {
    id: 'mentorship',
    top: '48%',
    left: '78%',
    title: 'Youth Mentorship',
    subtitle: 'Unlocking potential through guidance',
    icon: HeartHandshake,
  },
];

export default function OneMovementSection({
  id = 'one-movement',
  className = '',
}: OneMovementSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll scrub for cinematic expansion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bannerScale = useTransform(scrollYProgress, [0.1, 0.45], [0.97, 1]);
  const bannerY = useTransform(scrollYProgress, [0, 1], ['25px', '-25px']);

  // Mouse inertia coordinates for interactive spotlight & 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseScreenX = useMotionValue(50);
  const mouseScreenY = useMotionValue(50);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const tiltRotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3]);
  const tiltRotateY = useTransform(smoothX, [-0.5, 0.5], [-3.5, 3.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    mouseScreenX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseScreenY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActivePin(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full bg-[#FAF4E6] py-12 sm:py-16 lg:py-24 overflow-hidden select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* ─── FULL-BLEED Cinema Banner Box (Edge-to-Edge Width & Expansive Height) ─── */}
      <motion.div
        style={{
          scale: bannerScale,
          y: bannerY,
          rotateX: tiltRotateX,
          rotateY: tiltRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full min-h-[820px] sm:min-h-[880px] lg:min-h-[960px] xl:min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center shadow-[0_35px_100px_rgba(0,0,0,0.55)] border-y border-stone-800/80"
      >
        {/* Background Image with subtle mouse parallax */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute -inset-[5%] w-[110%] h-[110%] pointer-events-none select-none"
          aria-hidden="true"
        >
          <img
            src={communityBg}
            alt="Community gathering at table — Live Achieve Believe"
            className="w-full h-full object-cover object-center filter grayscale-[28%] contrast-[1.14] brightness-[0.9] pointer-events-none transition-all duration-700"
          />
        </motion.div>

        {/* ─── Interactive Golden Torchlight Following Cursor ─── */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            opacity: isHovered ? 0.92 : 0.45,
            background: useTransform(
              [mouseScreenX, mouseScreenY],
              ([x, y]) =>
                `radial-gradient(circle 560px at ${x}% ${y}%, rgba(249,115,22,0.34) 0%, rgba(255,180,120,0.12) 35%, transparent 75%)`
            ),
          }}
          aria-hidden="true"
        />

        {/* Cinematic Vignette for Text Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* ─── Interactive Community Touchpoint Pins on Table ─── */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block">
          {storyPins.map((pin) => {
            const Icon = pin.icon;
            const isOpen = activePin === pin.id;

            return (
              <div
                key={pin.id}
                style={{ top: pin.top, left: pin.left }}
                className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2"
              >
                {/* Pulsing Beacon Dot */}
                <button
                  type="button"
                  onClick={() => setActivePin(isOpen ? null : pin.id)}
                  onMouseEnter={() => setActivePin(pin.id)}
                  className="relative group flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none"
                  aria-label={pin.title}
                >
                  <span className="absolute inset-0 rounded-full bg-[#F97316]/30 animate-ping" />
                  <span className="relative w-4 h-4 rounded-full bg-[#F97316] border-2 border-white shadow-[0_0_18px_rgba(249,115,22,0.9)] group-hover:scale-125 transition-transform duration-200" />
                </button>

                {/* Floating Glassmorphic Tooltip Card */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 p-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl text-left pointer-events-auto select-none"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-[#F97316]/20 border border-[#F97316]/50 flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3 text-[#F97316]" />
                        </div>
                        <span
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          className="text-xs font-bold text-white tracking-wide"
                        >
                          {pin.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-300 font-sans leading-relaxed pl-7">
                        {pin.subtitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ─── Central Content (Expansive Width & Height) ─── */}
        <div className="relative z-10 w-full max-w-5xl sm:max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center flex flex-col items-center justify-center py-20 sm:py-24 lg:py-32">
          {/* Main Title: Scaled Up Typography */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[88px] font-bold tracking-tight uppercase leading-[1.06] text-center drop-shadow-[0_4px_32px_rgba(0,0,0,0.95)]"
          >
            <span className="block text-white transition-transform duration-300 hover:scale-[1.01]">
              WE ARE MANY PEOPLE.
            </span>
            <span className="block text-[#F97316] mt-2.5 sm:mt-3.5 drop-shadow-[0_0_35px_rgba(249,115,22,0.45)]">
              ONE MOVEMENT.
            </span>
          </motion.h2>

          {/* Subtitle: Broader Width & Scaled Typography */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 md:mt-10 text-stone-200 text-sm sm:text-base md:text-lg lg:text-[20px] font-sans font-normal leading-relaxed text-center max-w-2xl sm:max-w-3xl mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]"
          >
            Your story can be part of it. Whether you have two hours a month or a
            calling to launch a local neighborhood circle.
          </motion.p>

          {/* Action Triggers using Reusable FigmaButton */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <FigmaButton to="/movement" variant="primary" size="lg">
              Join the Movement
            </FigmaButton>

            <FigmaButton to="/donate" variant="white" size="lg">
              Give Hope
            </FigmaButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

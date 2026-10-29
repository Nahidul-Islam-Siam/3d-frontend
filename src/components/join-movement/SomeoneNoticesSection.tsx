import { ArrowDown } from 'lucide-react';
import seenImg from '@/assets/join-movement/join-movement.jpg';

export interface SomeoneNoticesSectionProps {
  id?: string;
  className?: string;
}

export default function SomeoneNoticesSection({ 
  id = 'someone-notices', 
  className = '' 
}: SomeoneNoticesSectionProps) {
  const handleScroll = () => {
    const next = document.getElementById('built-by-community');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id={id}
      className={`relative w-full min-h-screen bg-[#07050A] text-white py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-16 xl:px-20 flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      {/* ─── Ambient Starfield & Bottom Amber Horizon Glow (Exact Match to Image) ─── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:72px_72px] opacity-15" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 lg:h-80 bg-gradient-to-t from-[#4A1D0B]/85 via-[#2A0E06]/40 to-transparent pointer-events-none" />

      {/* ─── Top Left: Floating Pre-heading Statement ─── */}
      <div className="max-w-[1520px] w-full mx-auto text-left relative z-10 pt-2 sm:pt-4">
        <p className="text-sm sm:text-base lg:text-[22px] xl:text-[24px] text-stone-300 font-sans tracking-wide flex flex-col gap-2 sm:gap-2.5 lg:gap-3 leading-snug">
          <span>Every meaningful change</span>
          <span>begins the same way.</span>
        </p>
      </div>

      {/* ─── Main 3-Column Center Stage (All 3 items vertically center-aligned) ─── */}
      <div className="max-w-[1520px] w-full mx-auto relative z-10 my-auto py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column (lg:col-span-3 xl:col-span-3): "Someone notices." */}
          <div className="lg:col-span-3 text-left">
            <h3 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-white tracking-wide "
            >
              Someone notices.
            </h3>
          </div>

          {/* Center Column (lg:col-span-6 xl:col-span-6): 480x358 Rotated Card + Scroll Button */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* ─── Exact Figma Spec: 480px x 358px, Radius 24px, Rotation -3° ─── */}
            <div 
              style={{
                width: 'min(480px, 86vw)',
                height: 'min(358px, calc(86vw * 358 / 480))',
              }}
              className="relative rounded-[24px] overflow-hidden border border-white/20 shadow-[0_25px_65px_rgba(0,0,0,0.9)] bg-stone-900 rotate-3 transition-transform duration-500 hover:rotate-0 group shrink-0"
            >
              <img
                src={seenImg}
                alt="An observant neighbor noticing quietly with compassion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Scroll Button centered directly below the card */}
            <div 
              onClick={handleScroll}
              className="mt-6 sm:mt-20 flex items-center gap-2 cursor-pointer select-none group text-white/80 hover:text-white transition-all"
            >
              <div className="w-5 h-5 rounded-full border border-white/40 group-hover:border-white flex items-center justify-center shrink-0 transition-colors">
                <ArrowDown className="w-3 h-3 text-white animate-bounce" />
              </div>
              <span
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/85 group-hover:text-white transition-colors whitespace-nowrap font-medium"
              >
                SCROLL TO CONTINUE
              </span>
            </div>
          </div>

          {/* Right Column (lg:col-span-3 xl:col-span-3): Narrative Text */}
          <div className="lg:col-span-3 text-left lg:pl-4">
            <p className="text-xs sm:text-sm lg:text-[14px] xl:text-[18px] text-stone-300 font-sans leading-relaxed max-w-[280px]">
              An observant neighbor sees a family quietly carrying more than their share. No judgment, just seeing clearly.
            </p>
          </div>

        </div>
      </div>

      {/* Subtle bottom spacing balance */}
      <div className="w-full h-4 sm:h-8" />
    </section>
  );
}

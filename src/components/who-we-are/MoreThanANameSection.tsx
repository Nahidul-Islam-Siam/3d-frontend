import { motion } from 'framer-motion';
import logoIcon from '@/assets/logo/logo-icon.png';

export default function MoreThanANameSection() {
  return (
    <section 
      id="more-than-a-name"
      className="relative w-full min-h-[660px] lg:min-h-[760px] bg-[#432A19] py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none flex items-center"
    >
      {/* ─── Background Textured Layer (Frame 360.png) ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/who/frame-360.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10 px-2 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── Left Column: Headline & Meaning Narrative ─── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Title */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-white leading-normal"
            >
              More Than a Name.<br />
              A Way of Life.
            </h2>

            {/* Sub-block */}
            <div className="pt-2 sm:pt-4 space-y-2">
              <h3
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-base sm:text-lg lg:text-[19px] font-normal text-stone-200 tracking-wide"
              >
                Life Achieve Believe
              </h3>

              <p className="text-xs sm:text-[14px] text-stone-300/80 font-sans leading-relaxed max-w-md font-normal">
                Most people hear the word &apos;LAB&apos; and think of science. So do we.
              </p>
            </div>
          </motion.div>

          {/* ─── Right Column: Interactive LAB Diagram ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex justify-center lg:justify-end"
          >
            {/* Diagram Container */}
            <div className="relative w-full max-w-[580px] min-h-[380px] sm:min-h-[400px]">
              
              {/* ─── SVG Connector Lines Layer ─── */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-0" 
                viewBox="0 0 580 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Horizontal dotted connector between ACHIEVE - LAB - BELIEVE */}
                <line 
                  x1="180" 
                  y1="315" 
                  x2="400" 
                  y2="315" 
                  stroke="rgba(255,255,255,0.22)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                />

                {/* Left Branch: From top of ACHIEVE card (x=105, y=260) up to y=60 then right to LIVE card (x=215, y=60) */}
                <path
                  d="M 105 260 L 105 78 Q 105 60 125 60 L 210 60"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                />

                {/* Right Branch: From LIVE card right (x=370, y=60) to x=475, then down to top of BELIEVE card (x=475, y=260) */}
                <path
                  d="M 370 60 L 455 60 Q 475 60 475 78 L 475 260"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                />
              </svg>

              {/* ─── Card 1: LIVE (Top Center) ─── */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[210px] sm:w-[230px]">
                <div className="rounded-[18px] sm:rounded-[20px] bg-white/[0.07] backdrop-blur-md border border-white/20 p-4 sm:p-5 text-center shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:border-white/40 hover:bg-white/[0.11] transition-all duration-300">
                  <h4
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-base sm:text-lg font-bold text-white tracking-widest uppercase"
                  >
                    LIVE
                  </h4>
                  <p className="mt-1 text-xs sm:text-[13px] font-medium text-stone-200">
                    Live with Purpose
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-stone-300/80 leading-snug">
                    Dignity, compassion, and hope.
                  </p>
                </div>
              </div>

              {/* ─── Card 2: ACHIEVE (Bottom Left) ─── */}
              <div className="absolute bottom-2 left-0 z-10 w-[205px] sm:w-[225px]">
                <div className="rounded-[18px] sm:rounded-[20px] bg-white/[0.07] backdrop-blur-md border border-white/20 p-4 sm:p-5 text-center shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:border-white/40 hover:bg-white/[0.11] transition-all duration-300">
                  <h4
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-base sm:text-lg font-bold text-white tracking-widest uppercase"
                  >
                    ACHIEVE
                  </h4>
                  <p className="mt-1 text-xs sm:text-[13px] font-medium text-stone-200">
                    Overcome &amp; Grow
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-stone-300/80 leading-snug">
                    Discover possibilities and build a stronger future.
                  </p>
                </div>
              </div>

              {/* ─── Center Node: LAB Heart Logo Badge ─── */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#4A2E1A]/60 backdrop-blur-sm rounded-full">
                <img
                  src={logoIcon}
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert"
                />
                <span
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-white font-bold tracking-widest text-xs sm:text-sm"
                >
                  LAB
                </span>
              </div>

              {/* ─── Card 3: BELIEVE (Bottom Right) ─── */}
              <div className="absolute bottom-2 right-0 z-10 w-[205px] sm:w-[225px]">
                <div className="rounded-[18px] sm:rounded-[20px] bg-white/[0.07] backdrop-blur-md border border-white/20 p-4 sm:p-5 text-center shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:border-white/40 hover:bg-white/[0.11] transition-all duration-300">
                  <h4
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-base sm:text-lg font-bold text-white tracking-widest uppercase"
                  >
                    BELIEVE
                  </h4>
                  <p className="mt-1 text-xs sm:text-[13px] font-medium text-stone-200">
                    Believe in Possibility
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-stone-300/80 leading-snug">
                    Believe in yourself and one another.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


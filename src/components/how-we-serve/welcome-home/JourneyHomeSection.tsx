import { motion } from 'framer-motion';
import veteranFamilyPhoto from './Rectangle 108 copy.png';
import rectangleBackdrop from './Rectangle 108.png';

export interface JourneyHomeSectionProps {
  id?: string;
  className?: string;
}

export default function JourneyHomeSection({
  id = 'journey-home-section',
  className = '',
}: JourneyHomeSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full min-h-screen bg-[#0A0503] text-white flex items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-28 py-20 lg:py-28 overflow-hidden select-none ${className}`}
    >
      {/* ─── Ambient Warm Glow Background ─── */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(68,36,15,0.35) 0%, rgba(20,12,7,0.75) 55%, #0A0503 100%)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(50,26,12,0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ─── Responsive 2-Column Grid (Figma 1:1) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
        {/* Left Column: Soldier & Family Photo with Glowing Backplate Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center lg:justify-start order-2 lg:order-1"
        >
          <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] aspect-[744/806] flex items-center justify-center">
            {/* Outer Frosted Glowing Frame (Rectangle 108.png) */}
            <img
              src={rectangleBackdrop}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            />

            {/* Inner Rounded Soldier & Family Photo (Rectangle 108 copy.png) */}
            <div className="relative z-10 w-[84%] aspect-[622/675] rounded-[22px] sm:rounded-[30px] overflow-hidden shadow-2xl">
              <img
                src={veteranFamilyPhoto}
                alt="Smiling veteran in uniform holding moving box alongside his family"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Typography & Dignity Manifesto */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-6 text-left order-1 lg:order-2"
        >
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-white tracking-tight leading-[1.2]"
          >
            For many veterans, the journey home continues long after military service ends.
          </h2>

          {/* Double Dashed Divider Line */}
          <div className="w-full max-w-md py-1 space-y-1.5">
            <div className="w-full border-t border-dashed border-white/20" />
            <div className="w-full border-t border-dashed border-white/20" />
          </div>

          {/* Paragraph & Dignity Statements */}
          <div className="space-y-4 text-stone-300 font-serif text-sm sm:text-base lg:text-[17px] leading-relaxed pt-2">
            <p>
              Whether your memories bring pride, pain, or a little of both, we hope this home becomes a place where peace has room to grow.
            </p>

            <div className="space-y-2.5 pt-2">
              <p>Every veteran deserves appreciation.</p>
              <p>Every veteran deserves respect.</p>
              <p>Every veteran deserves dignity.</p>
              <p>Every veteran deserves the opportunity to begin again.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

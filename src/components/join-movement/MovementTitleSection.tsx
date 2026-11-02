import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';

export interface MovementTitleSectionProps {
  id?: string;
  className?: string;
}

export default function MovementTitleSection({ 
  id = 'movement-title', 
  className = '' 
}: MovementTitleSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden select-none flex items-center justify-center min-h-[520px] lg:min-h-[680px] ${className}`}
    >
      {/* Decorative Left Flourish Leaf (Exact Figma: bottom-left offset) */}
      <img 
        src={leftLeaf} 
        alt="" 
        className="absolute left-0 sm:left-2 lg:left-3 bottom-6 sm:bottom-10 lg:bottom-12 w-[140px] sm:w-[180px] lg:w-[218px] h-auto opacity-95 pointer-events-none select-none object-contain" 
      />

      {/* Decorative Right Flourish Leaf (Exact Figma: bottom-right offset) */}
      <img 
        src={rightLeaf} 
        alt="" 
        className="absolute right-0 sm:right-2 lg:right-3 bottom-6 sm:bottom-10 lg:bottom-12 w-[120px] sm:w-[155px] lg:w-[177px] h-auto opacity-95 pointer-events-none select-none object-contain" 
      />

      {/* Main Centered Content */}
      <div className="max-w-[840px] mx-auto text-center relative z-10 px-4">
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight sm:leading-tight lg:leading-[100px] tracking-normal uppercase flex flex-col items-center justify-center"
        >
          <span 
            style={{
              color: '#272624',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'inherit',
              lineHeight: 'inherit',
              fontWeight: 900,
            }}
            className="block text-[#272624]"
          >
            JOIN THE
          </span>
          <span 
            style={{
              color: '#F97316',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'inherit',
              lineHeight: 'inherit',
              fontWeight: 900,
            }}
            className="block text-[#F97316]"
          >
            MOVEMENT
          </span>
        </h2>

        <p 
          style={{
            color: '#746343',
            fontFamily: "Helvetica, Arial, -apple-system, sans-serif",
            fontWeight: 400,
          }}
          className="mt-6 sm:mt-8 lg:mt-10 text-base sm:text-xl lg:text-[24px] leading-snug sm:leading-snug lg:leading-[26px] text-[#746343] text-center max-w-[550px] mx-auto font-normal font-sans"
        >
          Together, we become the reason someone believes<br className="hidden sm:inline" /> tomorrow is worth seeing.
        </p>
      </div>
    </section>
  );
}

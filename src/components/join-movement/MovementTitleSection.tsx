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
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-20 lg:py-28 px-4 sm:px-6 overflow-hidden select-none flex items-center justify-center ${className}`}
    >
      {/* Decorative Left Flourish Leaf (Exact Figma: 195.05px x 258.35px at Left Edge) */}
      <img 
        src={leftLeaf} 
        alt="" 
        className="absolute left-0 bottom-0 w-[135px] h-[178px] sm:w-[165px] sm:h-[218px] lg:w-[195.05px] lg:h-[258.35px] opacity-95 pointer-events-none select-none object-contain origin-bottom-left" 
      />

      {/* Decorative Right Flourish Leaf (Exact Figma: 195.05px x 258.35px at Right Edge) */}
      <img 
        src={rightLeaf} 
        alt="" 
        className="absolute right-0 bottom-0 w-[135px] h-[178px] sm:w-[165px] sm:h-[218px] lg:w-[195.05px] lg:h-[258.35px] opacity-95 pointer-events-none select-none object-contain origin-bottom-right" 
      />

      {/* Main Centered Content */}
      <div className="max-w-[820px] mx-auto text-center relative z-10 px-4">
        <h2
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[68px] font-bold tracking-[0.08em] sm:tracking-[0.11em] uppercase flex flex-col gap-2 sm:gap-3 lg:gap-3.5 leading-none"
        >
          <span className="block text-[#1F1E1C]">JOIN THE</span>
          <span className="block text-[#F97316]">MOVEMENT</span>
        </h2>

        <p className="mt-4 sm:mt-5 lg:mt-6 text-xs sm:text-sm lg:text-[15px] text-[#6E6259] font-sans max-w-lg mx-auto leading-relaxed">
          Together, we become the reason someone believes<br className="hidden sm:inline" /> tomorrow is worth seeing.
        </p>
      </div>
    </section>
  );
}

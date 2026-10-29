import { 
  Gift, 
  MessageCircle, 
  Sparkles, 
  Clock, 
  Utensils, 
  HandHeart, 
  Heart 
} from 'lucide-react';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';
import youBadge from '@/assets/join-movement/you-community-badge.png';

export interface BuiltByCommunitySectionProps {
  id?: string;
  className?: string;
}

const row1Pillars = [
  { label: 'Every Gift', icon: Gift },
  { label: 'Every Conversation', icon: MessageCircle },
  { label: 'Every Talent', icon: Sparkles },
  { label: 'Every Volunteer Hour', icon: Clock },
];

const row2Pillars = [
  { label: 'Every Meal', icon: Utensils },
  { label: 'Every Act of Generosity', icon: HandHeart },
  { label: 'Every Prayer', icon: Heart },
];

export default function BuiltByCommunitySection({ 
  id = 'built-by-community', 
  className = '' 
}: BuiltByCommunitySectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 overflow-hidden select-none flex flex-col items-center justify-center ${className}`}
    >
      {/* Decorative Flourish Leaves Flush Against Edges (Matching Figma) */}
      <img 
        src={leftLeaf} 
        alt="" 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[120px] sm:w-[155px] lg:w-[195px] opacity-90 pointer-events-none select-none object-contain origin-left" 
      />
      <img 
        src={rightLeaf} 
        alt="" 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[120px] sm:w-[155px] lg:w-[195px] opacity-90 pointer-events-none select-none object-contain origin-right" 
      />

      <div className="max-w-[1080px] w-full mx-auto text-center space-y-9 sm:space-y-12 relative z-10 px-2 sm:px-4">
        
        {/* Main Heading: Exact Dual Color Matching Reference Image with Generous Line Spacing */}
        <h2
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] tracking-tight flex flex-col items-center gap-2.5 sm:gap-3.5 lg:gap-4 leading-none"
        >
          <span className="text-[#1F1E1C]">Live Achieve Believe Was</span>
          <span className="text-[#1F1E1C]">Never Meant To Be Built By</span>
          <span className="text-[#F97316]">One Person.</span>
        </h2>

        {/* ─── 7 Pillar White Cards in 2 Balanced Rows (4 on Top, 3 Below) ─── */}
        <div className="space-y-3.5 sm:space-y-4 max-w-[1040px] mx-auto pt-2">
          
          {/* Row 1: 4 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5">
            {row1Pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white/95 rounded-[16px] sm:rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#F0E6D8]/60 py-5 sm:py-6 px-3 sm:px-4 flex flex-col items-center justify-center gap-2 sm:gap-2.5 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-default"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#EA580C] stroke-[1.65]" />
                  <span className="text-xs sm:text-[13px] font-sans font-medium text-[#EA580C] tracking-wide text-center whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Row 2: 3 Cards Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-4.5 max-w-[780px] mx-auto">
            {row2Pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white/95 rounded-[16px] sm:rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#F0E6D8]/60 py-5 sm:py-6 px-3 sm:px-4 flex flex-col items-center justify-center gap-2 sm:gap-2.5 transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-default"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#EA580C] stroke-[1.65]" />
                  <span className="text-xs sm:text-[13px] font-sans font-medium text-[#EA580C] tracking-wide text-center whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ─── Core Community Invitation Callout with "Y [Badge] U" ─── */}
        <div className="pt-3 sm:pt-6">
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-base sm:text-lg lg:text-[21px] text-[#1F1E1C] font-normal tracking-wide flex items-center justify-center flex-wrap gap-1.5"
          >
            <span>There Is Room For</span>
            <span className="inline-flex items-center mx-1 font-bold text-[#F97316] tracking-wider">
              <span>Y</span>
              <img
                src={youBadge}
                alt="Community circle"
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover mx-1 shadow-sm inline-block"
              />
              <span>U</span>
            </span>
            <span>In That Community.</span>
          </p>
        </div>

      </div>
    </section>
  );
}

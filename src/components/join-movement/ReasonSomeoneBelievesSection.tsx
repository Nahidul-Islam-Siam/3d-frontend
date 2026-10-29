import { 
  Package, 
  HeartHandshake, 
  Users, 
  Gift, 
  Handshake, 
  Award, 
  Mic, 
  Church, 
  GraduationCap 
} from 'lucide-react';

export interface ReasonSomeoneBelievesSectionProps {
  id?: string;
  className?: string;
}

interface ActionPill {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
}

const actionPillsRow1: ActionPill[] = [
  { label: 'Donate Household Goods & Clothing', icon: Package },
  { label: 'Join the Prayer Team', icon: HeartHandshake },
  { label: 'Bring the Experience to Your Community', icon: Users },
];

const actionPillsRow2: ActionPill[] = [
  { label: 'Give a Gift', icon: Gift },
  { label: 'Volunteer', icon: Users },
  { label: 'Become a Sponsor', icon: Handshake },
  { label: 'Become Our Presenting Sponsor', icon: Award },
];

const actionPillsRow3: ActionPill[] = [
  { label: 'Audition', icon: Mic },
  { label: 'Partner as a Church', icon: Church },
  { label: 'Partner as a School', icon: GraduationCap },
];

export default function ReasonSomeoneBelievesSection({ 
  id = 'reason-someone-believes', 
  className = '' 
}: ReasonSomeoneBelievesSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="max-w-[1100px] w-full mx-auto text-center relative z-10 px-2 sm:px-4">
        
        {/* ─── Top Header: TOGETHER... & Title with Generous Vertical Line Spacing ─── */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#EA580C] text-xs sm:text-[13px] font-sans tracking-[0.24em] uppercase font-semibold block mb-3 sm:mb-4">
            TOGETHER...
          </span>

          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#18181B] tracking-tight flex flex-col items-center gap-2.5 sm:gap-3.5 lg:gap-4 leading-none mb-4 sm:mb-6"
          >
            <span>Let's Be The Reason Someone</span>
            <span>Believes Tomorrow Is</span>
            <span>Worth Seeing.</span>
          </h2>

          <p className="text-xs sm:text-sm lg:text-[14.5px] text-[#5A5048] font-sans font-normal max-w-xl mx-auto leading-relaxed">
            Select the door you wish to open today. Our team follows up with a genuine human
            <span className="hidden sm:inline"><br /></span>
            phone call or tea invitation—never an automated marketing sequence.
          </p>
        </div>

        {/* ─── 3 Balanced Staggered Rows of Apricot Action Pills (Exact Figma Match) ─── */}
        <div className="space-y-3 sm:space-y-3.5 max-w-4xl mx-auto pt-8 sm:pt-10">
          
          {/* Row 1: 3 Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {actionPillsRow1.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.label}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-5.5 py-2 sm:py-2.5 rounded-full bg-[#FCE3CE]/90 hover:bg-[#FCD8BE] border border-[#F7CCAB]/60 text-xs sm:text-[13px] font-sans font-medium text-[#EA580C] shadow-[0_2px_10px_rgba(234,88,12,0.05)] hover:shadow-[0_4px_16px_rgba(234,88,12,0.12)] hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C] stroke-[1.8] group-hover:scale-110 transition-transform" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 2: 4 Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {actionPillsRow2.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.label}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-5.5 py-2 sm:py-2.5 rounded-full bg-[#FCE3CE]/90 hover:bg-[#FCD8BE] border border-[#F7CCAB]/60 text-xs sm:text-[13px] font-sans font-medium text-[#EA580C] shadow-[0_2px_10px_rgba(234,88,12,0.05)] hover:shadow-[0_4px_16px_rgba(234,88,12,0.12)] hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C] stroke-[1.8] group-hover:scale-110 transition-transform" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 3: 3 Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {actionPillsRow3.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.label}
                  type="button"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-5.5 py-2 sm:py-2.5 rounded-full bg-[#FCE3CE]/90 hover:bg-[#FCD8BE] border border-[#F7CCAB]/60 text-xs sm:text-[13px] font-sans font-medium text-[#EA580C] shadow-[0_2px_10px_rgba(234,88,12,0.05)] hover:shadow-[0_4px_16px_rgba(234,88,12,0.12)] hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EA580C] stroke-[1.8] group-hover:scale-110 transition-transform" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

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
      <div className="max-w-[1160px] w-full mx-auto text-center relative z-10 px-2 sm:px-4">
        
        {/* ─── Top Header: TOGETHER... & Title with Generous Vertical Line Spacing ─── */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[#F97316] text-xs sm:text-[13px] font-sans tracking-[0.24em] uppercase font-semibold block mb-3 sm:mb-4">
            TOGETHER...
          </span>

          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#18181B] tracking-tight flex flex-col items-center gap-2.5 sm:gap-3.5 lg:gap-4 leading-tight mb-4 sm:mb-6"
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
        <div className="space-y-3 sm:space-y-3.5 max-w-[1140px] w-full mx-auto pt-8 sm:pt-10">
          
          {/* Row 1: 3 Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {actionPillsRow1.map((pill) => {
              const Icon = pill.icon;
              return (
                <button
                  key={pill.label}
                  type="button"
                  style={{
                    display: 'flex',
                    padding: '16px 24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '47px',
                    background: 'rgba(249, 115, 22, 0.15)',
                    boxShadow: '0px 4px 20px 0px rgba(249, 115, 22, 0.22)',
                    color: '#F97316',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}
                  className="flex items-center justify-center gap-[10px] px-6 py-4 rounded-[47px] bg-[rgba(249,115,22,0.15)] hover:bg-[rgba(249,115,22,0.25)] text-[#F97316] font-playfair font-bold text-[16px] leading-[24px] hover:scale-[1.02] hover:shadow-[0px_6px_28px_rgba(249,115,22,0.32)] transition-all duration-300 group cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Icon className="w-5 h-5 text-[#F97316] stroke-[2] shrink-0 group-hover:scale-110 transition-transform" />
                  <span
                    style={{
                      color: '#F97316',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: '24px',
                    }}
                    className="font-playfair font-bold text-[16px] leading-[24px] text-[#F97316]"
                  >
                    {pill.label}
                  </span>
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
                  style={{
                    display: 'flex',
                    padding: '16px 24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '47px',
                    background: 'rgba(249, 115, 22, 0.15)',
                    boxShadow: '0px 4px 20px 0px rgba(249, 115, 22, 0.22)',
                    color: '#F97316',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}
                  className="flex items-center justify-center gap-[10px] px-6 py-4 rounded-[47px] bg-[rgba(249,115,22,0.15)] hover:bg-[rgba(249,115,22,0.25)] text-[#F97316] font-playfair font-bold text-[16px] leading-[24px] hover:scale-[1.02] hover:shadow-[0px_6px_28px_rgba(249,115,22,0.32)] transition-all duration-300 group cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Icon className="w-5 h-5 text-[#F97316] stroke-[2] shrink-0 group-hover:scale-110 transition-transform" />
                  <span
                    style={{
                      color: '#F97316',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: '24px',
                    }}
                    className="font-playfair font-bold text-[16px] leading-[24px] text-[#F97316]"
                  >
                    {pill.label}
                  </span>
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
                  style={{
                    display: 'flex',
                    padding: '16px 24px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '47px',
                    background: 'rgba(249, 115, 22, 0.15)',
                    boxShadow: '0px 4px 20px 0px rgba(249, 115, 22, 0.22)',
                    color: '#F97316',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '24px',
                  }}
                  className="flex items-center justify-center gap-[10px] px-6 py-4 rounded-[47px] bg-[rgba(249,115,22,0.15)] hover:bg-[rgba(249,115,22,0.25)] text-[#F97316] font-playfair font-bold text-[16px] leading-[24px] hover:scale-[1.02] hover:shadow-[0px_6px_28px_rgba(249,115,22,0.32)] transition-all duration-300 group cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Icon className="w-5 h-5 text-[#F97316] stroke-[2] shrink-0 group-hover:scale-110 transition-transform" />
                  <span
                    style={{
                      color: '#F97316',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: '24px',
                    }}
                    className="font-playfair font-bold text-[16px] leading-[24px] text-[#F97316]"
                  >
                    {pill.label}
                  </span>
                </button>
              );  
            })}
          </div>

        </div>



      </div>
    </section>
  );
}

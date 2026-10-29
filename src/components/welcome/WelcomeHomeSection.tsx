import { Sparkles } from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';

export interface WelcomeHomeSectionProps {
  id?: string;
  className?: string;
}

export default function WelcomeHomeSection({ 
  id = "chapter-05", 
  className = "" 
}: WelcomeHomeSectionProps) {
  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] flex items-center justify-center py-20 sm:py-24 lg:py-28 px-6 text-center overflow-hidden ${className}`}
    >
      <div className="max-w-[720px] w-full mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/70 border border-orange-200/80 text-xs font-serif text-[#F97316] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter 05 — Welcome Home</span>
        </div>

        <h2
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#18181B] tracking-tight leading-tight uppercase font-serif"
        >
          A Seat at the Table <br />
          <span className="text-[#F97316]">Is Waiting for You.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-lg mx-auto">
          Take your next step with us today. Whether reading stories or standing in our kitchen line, your presence completes our family.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <FigmaButton to="/about" variant="primary">
            Explore Our Story
          </FigmaButton>
          <FigmaButton to="/movement" variant="outline">
            Join the Movement
          </FigmaButton>
        </div>
      </div>
    </section>
  );
}


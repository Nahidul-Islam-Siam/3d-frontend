import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import logoWithText from '@/assets/logo/logo-with-text.png';

interface FooterProps {
  isHidden?: boolean;
  className?: string;
}

export default function Footer({ isHidden = false, className = '' }: FooterProps) {
  if (isHidden) return null;

  return (
    <footer className={`w-full bg-[#FAF4E6] text-stone-800 pt-6 pb-8 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 font-sans select-none ${className}`}>
      {/* Top Rounded Border Frame (Full Width) */}
      <div className="w-full rounded-t-[32px] sm:rounded-t-[40px] border-t border-x border-[#FDBA74]/90 bg-[#FAF4E6] px-6 sm:px-10 lg:px-12 xl:px-16 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={logoWithText} 
                alt="Live Achieve Believe" 
                className="h-[32px] sm:h-[36px] w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-[13px] text-[#5A4F44] leading-relaxed max-w-md font-sans">
              Dedicated to elevating resilience, nurturing collective human potential, and bringing hope through documentary storytelling and compassionate direct action.
            </p>
          </div>

          {/* Col 2: Pathways */}
          <div className="lg:col-span-2 xl:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#F97316] uppercase font-sans">
              PATHWAYS
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-700 font-sans">
              <li>
                <Link to="/" className="hover:text-[#F97316] transition-colors">
                  Welcome
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F97316] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve" className="hover:text-[#F97316] transition-colors">
                  How We Serve
                </Link>
              </li>
              <li>
                <Link to="/meet-us" className="hover:text-[#F97316] transition-colors">
                  Stewards &amp; Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Engagement */}
          <div className="lg:col-span-2 xl:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#F97316] uppercase font-sans">
              ENGAGEMENT
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-stone-700 font-sans">
              <li>
                <Link to="/movement" className="hover:text-[#F97316] transition-colors">
                  The Show Broadcast
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve#volunteer" className="hover:text-[#F97316] transition-colors">
                  Volunteer &amp; Partner
                </Link>
              </li>
              <li>
                <a 
                  href="https://tickets.liveachievebelieve.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#F97316] transition-colors"
                >
                  Give Hope
                </a>
              </li>
              <li>
                <Link to="/who-we-are" className="hover:text-[#F97316] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Next Event Broadcast Box */}
          <div className="lg:col-span-4 xl:col-span-4">
            <div className="rounded-2xl border border-[#F97316]/60 bg-[#FAF1E3]/60 p-5 sm:p-6 space-y-2.5">
              <span className="block text-[11px] font-bold tracking-wider text-[#F97316] uppercase font-sans">
                NEXT EVENT BROADCAST
              </span>
              
              <h5 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-lg sm:text-[19px] font-bold text-stone-900 leading-snug"
              >
                Voices of Conviction: Annual Showcase
              </h5>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Join our global community for an evening of live retrospective stories, unscripted dialogues, and musical reflections.
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs font-medium text-stone-800 font-sans">
                <Calendar className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                <span>November 14, 2025 • 7:00 PM EST</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Bar with thin divider (Full Width) */}
      <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-16 pt-6 border-t border-[#E8DAC2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 font-sans">
        <p>
          © 2025 Live Achieve Believe (LAB) Foundation. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-stone-600 font-sans">
          <Link to="/privacy" className="hover:text-[#F97316] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-[#F97316] transition-colors">
            Terms and Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}


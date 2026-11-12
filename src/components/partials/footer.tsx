import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import logoWithText from '@/assets/logo/logo-with-text.png';

interface FooterProps {
  isHidden?: boolean;
  className?: string;
  isHome?: boolean;
}

export default function Footer({ isHidden = false, className = '' }: FooterProps) {
  if (isHidden) return null;

  return (
    <footer 
      className={`w-full bg-[#FAF4E6] text-stone-800 border-t border-[#F9D3B2] rounded-t-[32px] sm:rounded-t-[40px] pt-[56px] pb-[56px] px-6 sm:px-10 md:px-16 lg:px-20 min-[1440px]:px-[250px] font-sans select-none ${className}`}
    >
      <div className="footer-card w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* Col 1: Brand Info */}
          <div className="footer-col footer-brand lg:col-span-4 xl:col-span-4 space-y-4">
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
          <div className="footer-col footer-pathways lg:col-span-2 xl:col-span-2 space-y-3">
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
                <Link to="/experience-the-story" className="hover:text-[#F97316] transition-colors">
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
          <div className="footer-col footer-engagement lg:col-span-2 xl:col-span-2 space-y-3">
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
                <Link to="/suicide-awareness-showdown" className="hover:text-[#F97316] transition-colors">
                  Showdown Production
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-[#F97316] transition-colors">
                  Give Hope
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F97316] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Next Event Broadcast Box (Same border color #F9D3B2 as main frame) */}
          <div className="footer-col footer-event-col lg:col-span-4 xl:col-span-4">
            <div className="footer-event-box rounded-2xl border border-[#F9D3B2] bg-[#FAEAD5] p-5 sm:p-6 space-y-2.5">
              <span className="block text-[11px] font-bold tracking-wider text-[#F97316] uppercase font-sans">
                FEATURED PRODUCTION
              </span>
              
              <h5 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-lg sm:text-[19px] font-bold text-stone-900 leading-snug"
              >
                Suicide Awareness Showdown
              </h5>

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Where Are You Now? Letters to Etcetera — storytelling, theatre, music, and dance encouraging conversations of hope.
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs font-medium text-stone-800 font-sans">
                <Calendar className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                <Link to="/suicide-awareness-showdown" className="hover:text-[#F97316] underline-offset-4 hover:underline">
                  Audition, Volunteer, Sponsor or Donate &rarr;
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Bar with thin divider (Contained inside the padded footer) */}
        <div className="footer-bottom w-full mt-10 sm:mt-12 pt-6 border-t border-[#F9D3B2]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 font-sans">
          <p>
            © {new Date().getFullYear()} Live Achieve Believe (LAB) Foundation. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-stone-600 font-sans">
            <Link to="/about-us" className="hover:text-[#F97316] transition-colors">
              About Us
            </Link>
            <Link to="/privacy" className="hover:text-[#F97316] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F97316] transition-colors">
              Terms and Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

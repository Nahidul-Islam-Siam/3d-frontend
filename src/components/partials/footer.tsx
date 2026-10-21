import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import logoWithText from '@/assets/logo/logo-with-text.png';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF4E6] text-stone-800 pt-8 pb-6 px-4 sm:px-8 lg:px-14 font-sans select-none border-t border-stone-200">
      {/* Top Rounded Border Frame */}
      <div className="max-w-7xl mx-auto rounded-t-[32px] border-t border-x border-orange-200/90 bg-[#FAF4E6] px-6 sm:px-10 py-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={logoWithText} 
                alt="Live Achieve Believe" 
                className="h-8 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm">
              Dedicated to elevating resilience, nurturing collective human potential, and bringing hope through documentary storytelling and compassionate direct action.
            </p>
          </div>

          {/* Col 2: Pathways */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#ea580c] uppercase">
              Pathways
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              <li>
                <Link to="/" className="hover:text-[#ea580c] transition-colors">
                  Welcome
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#ea580c] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve" className="hover:text-[#ea580c] transition-colors">
                  How We Serve
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-[#ea580c] transition-colors">
                  Stewards & Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Engagement */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#ea580c] uppercase">
              Engagement
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              <li>
                <Link to="/how-we-serve#stories" className="hover:text-[#ea580c] transition-colors">
                  The Show Broadcast
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve#volunteer" className="hover:text-[#ea580c] transition-colors">
                  Volunteer & Partner
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#ea580c] transition-colors">
                  Give Hope
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Next Event Broadcast Box */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-orange-300/80 bg-[#faeee2]/70 p-5 sm:p-6 space-y-3 shadow-sm">
              <span className="block text-[11px] font-mono font-bold tracking-wider text-[#ea580c] uppercase">
                Next Event Broadcast
              </span>
              
              <h5 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                Voices of Conviction: Annual Showcase
              </h5>

              <p className="text-xs text-stone-600 leading-relaxed">
                Join our global community for an evening of live retrospective stories, unscripted dialogues, and musical reflections.
              </p>

              <div className="pt-1 flex items-center gap-2 text-xs font-medium text-stone-800">
                <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>November 14, 2025 &bull; 7:00 PM EST</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 font-sans">
        <p>
          &copy; 2025 Live Achieve Believe (LAB) Foundation. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-stone-600">
          <Link to="/privacy" className="hover:text-[#ea580c] transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-[#ea580c] transition-colors">
            Terms and Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}

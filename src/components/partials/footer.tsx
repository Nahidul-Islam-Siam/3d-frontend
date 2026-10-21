import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#070709] border-t border-amber-500/20 text-[#f7f5f0] font-sans overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Quote Banner */}
      <div className="border-b border-stone-800/80 bg-stone-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center space-y-3">
          <p className="font-serif italic text-base md:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            "What lies behind us and what lies before us are tiny things compared to what lies within us."
          </p>
          <span className="block text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
            — Oliver Wendell Holmes
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand & Heart Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-serif tracking-[0.2em] font-semibold text-[#fcfaf7] uppercase">
                  Live Achieve Believe
                </span>
                <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-mono">
                  People Matter
                </span>
              </div>
            </Link>

            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              We don't believe people should be defined by the hardest chapter of their lives. We believe healing begins when people are seen, heard, and reminded that they matter.
            </p>

            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300 space-y-1">
              <span className="font-semibold text-amber-300 uppercase tracking-wider font-mono block text-[10px]">
                Our Foundation
              </span>
              <p className="font-serif italic text-stone-400 leading-normal">
                Everything we do is grounded in our faith in Jesus Christ. His life reminds us that compassion is more than something we feel—it is something we choose.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-stone-400 pt-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Hillsborough County & Beyond
              </span>
            </div>
          </div>

          {/* Col 1: The Movement Journey */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
              The Journey
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/" className="hover:text-amber-200 transition-colors">
                  Welcome Experience
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-200 transition-colors">
                  Experience the Story
                </Link>
              </li>
              <li>
                <Link to="/about#who-we-are" className="hover:text-amber-200 transition-colors">
                  Who We Are (Philosophy)
                </Link>
              </li>
              <li>
                <Link to="/movement" className="hover:text-amber-200 transition-colors">
                  Join the Movement
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-amber-200 transition-colors">
                  Meet Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: How We Serve (5 Doorways) */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
              How We Serve
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/how-we-serve#table" className="hover:text-amber-200 transition-colors">
                  A Place at the Table
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve#youth" className="hover:text-amber-200 transition-colors">
                  Strong Foundations (LEADS)
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve#stories" className="hover:text-amber-200 transition-colors">
                  Stories That Save Lives
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve#veterans" className="hover:text-amber-200 transition-colors">
                  Welcome Home (Veterans)
                </Link>
              </li>
              <li>
                <Link to="/how-we-serve#volunteer" className="hover:text-amber-200 transition-colors">
                  Serve Beside Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Partners */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
              Community Partners
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-1.5 text-stone-300">
                <span>Bread of Refuge</span>
                <span className="text-[10px] text-stone-500 font-mono">(Meals)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <span>Family Promise</span>
                <span className="text-[10px] text-stone-500 font-mono">(Housing)</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <span>LEADS Youth Services</span>
                <span className="text-[10px] text-stone-500 font-mono">(Love Notes)</span>
              </li>
              <li className="pt-2">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors text-xs font-mono"
                >
                  <span>Become a Partner</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <p>
            &copy; {new Date().getFullYear()} Live Achieve Believe. One Mission. Many Expressions.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-stone-400 italic font-serif">
              "Every door opens because someone matters."
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

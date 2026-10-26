import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logoWithText from '@/assets/logo/logo-with-text.png';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  isHidden?: boolean;
  className?: string;
  isHome?: boolean;
}

export default function Footer({ isHidden = false, className = '', isHome = false }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // If hidden or on home page (where ZAxisStage manages the cinematic choreography), skip internal trigger
    if (isHidden || isHome) return;

    const ctx = gsap.context(() => {
      const footerEl = footerRef.current;
      if (!footerEl) return;

      const footerCard = footerEl.querySelector('.footer-card');
      const footerCols = footerEl.querySelectorAll('.footer-col');
      const footerEventBox = footerEl.querySelector('.footer-event-box');
      const footerBottom = footerEl.querySelector('.footer-bottom');

      if (footerCard) {
        gsap.from(footerCard, {
          autoAlpha: 0,
          y: 40,
          scale: 0.98,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 88%',
            toggleActions: 'play reverse play reverse',
          }
        });
      }

      if (footerCols && footerCols.length > 0) {
        gsap.from(footerCols, {
          autoAlpha: 0,
          y: 30,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          }
        });
      }

      if (footerEventBox) {
        gsap.from(footerEventBox, {
          autoAlpha: 0,
          scale: 0.95,
          y: 20,
          duration: 0.8,
          delay: 0.15,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          }
        });
      }

      if (footerBottom) {
        gsap.from(footerBottom, {
          autoAlpha: 0,
          y: 15,
          duration: 0.65,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerEl,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse',
          }
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [isHidden, isHome]);

  if (isHidden) return null;

  return (
    <footer 
      ref={footerRef}
      className={`w-full bg-[#FAF4E6] text-stone-800 pt-6 pb-8 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 font-sans select-none ${className}`}
    >
      {/* Top Rounded Border Frame (Full Width) */}
      <div className="footer-card w-full rounded-t-[32px] sm:rounded-t-[40px] border-t border-x border-[#FDBA74]/90 bg-[#FAF4E6] px-6 sm:px-10 lg:px-12 xl:px-16 pt-10 pb-8 will-change-transform will-change-opacity">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* Col 1: Brand Info */}
          <div className="footer-col footer-brand lg:col-span-4 xl:col-span-4 space-y-4 will-change-transform will-change-opacity">
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
          <div className="footer-col footer-pathways lg:col-span-2 xl:col-span-2 space-y-3 will-change-transform will-change-opacity">
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
          <div className="footer-col footer-engagement lg:col-span-2 xl:col-span-2 space-y-3 will-change-transform will-change-opacity">
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
          <div className="footer-col footer-event-col lg:col-span-4 xl:col-span-4 will-change-transform will-change-opacity">
            <div className="footer-event-box rounded-2xl border border-[#F97316]/60 bg-[#FAF1E3]/60 p-5 sm:p-6 space-y-2.5 will-change-transform will-change-opacity">
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
      <div className="footer-bottom w-full px-6 sm:px-10 lg:px-12 xl:px-16 pt-6 border-t border-[#E8DAC2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 font-sans will-change-transform will-change-opacity">
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


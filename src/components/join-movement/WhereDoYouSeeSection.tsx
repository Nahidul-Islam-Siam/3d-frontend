import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import card1Img from '@/assets/join-movement/cards/1.png';
import card2Img from '@/assets/join-movement/cards/2.png';
import card3Img from '@/assets/join-movement/cards/3.png';
import hopeImg from '@/assets/welcome/hope.png';
import heardImg from '@/assets/welcome/heard.png';
import seenImg from '@/assets/welcome/seen.png';

gsap.registerPlugin(ScrollTrigger);

export interface WhereDoYouSeeSectionProps {
  id?: string;
  className?: string;
}

interface PathwayCard {
  title: string;
  subtitle: string;
  image?: string;
  isCutout?: boolean;
  linkText: string;
  href?: string;
}

const pathwayCards: PathwayCard[] = [
  {
    title: 'Give Hope',
    subtitle: 'Every gift helps write a new chapter.',
    image: card1Img,
    isCutout: true,
    linkText: 'Be Part of It',
    href: '#',
  },
  {
    title: 'Volunteer',
    subtitle: 'Walk beside someone who needs hope.',
    image: card2Img,
    isCutout: true,
    linkText: 'Be Part of It',
    href: '#',
  },
  {
    title: 'Become a Sponsor',
    subtitle: 'Invest in experiences that change lives.',
    image: card3Img,
    isCutout: true,
    linkText: 'Be Part of It',
    href: '#',
  },
  {
    title: 'Become Our Presenting Sponsor',
    subtitle: 'Help bring hope to an entire community.',
    image: hopeImg,
    isCutout: false,
    linkText: 'Be Part of It',
    href: '#',
  },
  {
    title: 'Audition & Share Your Gifts',
    subtitle: 'Use your creative voice to tell stories that matter.',
    image: heardImg,
    isCutout: false,
    linkText: 'Be Part of It',
    href: '#',
  },
  {
    title: 'Partner as a Church or School',
    subtitle: 'Love your community together and build strong foundations.',
    image: seenImg,
    isCutout: false,
    linkText: 'Be Part of It',
    href: '#',
  },
];

export default function WhereDoYouSeeSection({ 
  id = 'where-do-you-see', 
  className = '' 
}: WhereDoYouSeeSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const pinnedStageRef = useRef<HTMLDivElement | null>(null);
  const cardsTrackRef = useRef<HTMLDivElement | null>(null);

  // ─── Pinned Horizontal Scroll Scrub via GSAP ScrollTrigger ───
  useEffect(() => {
    const container = containerRef.current;
    const stage = pinnedStageRef.current;
    const track = cardsTrackRef.current;

    if (!container || !stage || !track) return;

    // Helper: Calculate exact pixel distance to translate the track to reveal all cards with padding
    const getScrollDistance = () => {
      const dist = track.scrollWidth - window.innerWidth + 120;
      return Math.max(0, dist);
    };

    const ctx = gsap.context(() => {
      // The timeline holds the pin until all cards slide horizontally into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 74px', // Locks immediately below the 74px fixed navbar
          end: () => `+=${getScrollDistance() + 350}`, // Scroll distance: horizontal travel + resting hold
          pin: stage,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Smooth horizontal card translation from right to left
      tl.to(
        track,
        {
          x: () => -getScrollDistance(),
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 2. Resting hold phase so the last card stays comfortably in view before unpinning
      tl.to({}, { duration: 0.18 });
    }, container);

    // Refresh ScrollTrigger to calculate accurate layout and card widths
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    const next = document.getElementById('living-movement');
    if (next) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(next, { offset: -74, duration: 1.2 });
      } else {
        next.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id={id}
      ref={containerRef}
      className={`relative w-full bg-[#0C0805] text-white select-none ${className}`}
    >
      {/* ─── Pinned Viewport Stage (Exact Height between 74px Navbar & Screen Bottom) ─── */}
      <div
        ref={pinnedStageRef}
        className="relative w-full h-[calc(100vh-74px)] min-h-[580px] max-h-[1080px] flex flex-col justify-between overflow-hidden"
      >
        {/* ─── Ambient Subtle Topographic & Warm Glow Background ─── */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[450px] bg-[#F97316]/10 rounded-full blur-[150px] pointer-events-none" />

        {/* ─── Centered Main Heading with Generous Vertical Spacing & Line Gap ─── */}
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 text-center pt-8 sm:pt-12 lg:pt-14 pb-4 sm:pb-6 relative z-10 shrink-0">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[0.18em] uppercase flex flex-col items-center gap-3 sm:gap-4.5 leading-none"
          >
            <span>WHERE DO YOU SEE</span>
            <span className="text-white/95">YOURSELF?</span>
          </h2>
        </div>

        {/* ─── Pinned Horizontal Track Viewport Window ─── */}
        <div className="w-full overflow-hidden relative z-10 my-auto py-2">
          <div 
            ref={cardsTrackRef}
            className="flex gap-6 sm:gap-8 px-6 sm:px-12 lg:px-20 w-max will-change-transform"
          >
            {pathwayCards.map((card, idx) => (
              <div
                key={idx}
                className="relative shrink-0 w-[320px] sm:w-[480px] md:w-[540px] lg:w-[614px] h-[280px] sm:h-[305px] lg:h-[324px] rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-br from-[#23170E]/85 via-[#180F08]/85 to-[#100904]/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-orange-500/40 transition-all duration-300 group cursor-default"
              >
                {/* Left Narrative & Call to Action */}
                <div className="w-full max-w-[58%] sm:max-w-[54%] h-full flex flex-col justify-between p-6 sm:p-8 lg:p-9 relative z-10 text-left">
                  <div>
                    <h3
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-white tracking-wide leading-tight group-hover:text-orange-100 transition-colors"
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-[14px] text-[#C5BDB5] font-sans font-light leading-relaxed mt-2.5 max-w-[270px]">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div>
                    <a
                      href={card.href || '#'}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/30 hover:border-white text-xs sm:text-[13px] text-white font-serif tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right Photo Asset with Transparent Cutout or Subtle Soft Edge Blend */}
                {card.image && (
                  <div className="absolute right-0 bottom-0 h-full w-[46%] sm:w-[48%] flex items-end justify-end pointer-events-none select-none z-0 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`h-[90%] sm:h-[94%] lg:h-[98%] w-auto max-w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105 ${
                        card.isCutout
                          ? ''
                          : 'rounded-tl-[24px] rounded-bl-[20px] shadow-2xl [mask-image:linear-gradient(to_left,black_60%,transparent_100%)]'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom Bar: Floating Scroll Prompt ─── */}
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 flex justify-end pb-6 sm:pb-8 relative z-10 shrink-0">
          {/* (↓) SCROLL CTA button matching Figma reference */}
          <div 
            onClick={handleScrollDown}
            className="flex items-center gap-2.5 cursor-pointer select-none group text-white/80 hover:text-white transition-all ml-auto"
          >
            <div className="w-6 h-6 rounded-full border border-white/40 group-hover:border-white flex items-center justify-center shrink-0 transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />
            </div>
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/85 group-hover:text-white transition-colors whitespace-nowrap font-medium"
            >
              SCROLL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

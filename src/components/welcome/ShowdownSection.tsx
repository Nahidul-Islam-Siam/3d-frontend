import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  X,
  Maximize2,
  Mail,
  Phone,
  Globe,
  Info,
  ChevronDown
} from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';
import auditionBanner from '@/assets/welcome/audition_banner.png';
import showdownPoster from '@/assets/welcome/showdown-poster.png';

export interface ShowdownSectionProps {
  id?: string;
  className?: string;
  isStandaloneSection?: boolean;
}

export default function ShowdownSection({ 
  id = 'chapter-04',
  className = '',
  isStandaloneSection = true 
}: ShowdownSectionProps) {
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState<boolean>(false);

  // Close flyer modal on Escape, coordinate body overflow and Lenis pause/resume
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFlyerModalOpen(false);
      }
    };

    if (isFlyerModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Temporarily pause Lenis smooth scroll while modal is open to ensure native wheel scrolling works
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      lenis?.stop();

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = prevOverflow;
        lenis?.start();
      };
    }
  }, [isFlyerModalOpen]);

  const openModal = () => setIsFlyerModalOpen(true);
  const closeModal = () => setIsFlyerModalOpen(false);

  const content = (
    <div 
      className="w-full space-y-4 sm:space-y-6 px-4 sm:px-6 mx-auto flex flex-col items-center"
      style={{ width: 'min(1420px, 94vw, calc((100vh - 165px) * (1978 / 1620)))' }}
    >
      {/* ─── 1. TOP HEADER: FIGMA BUTTON & AUDITION TRIGGER ─── */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 shrink-0">
        <div className="space-y-1 text-left">
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-tight"
          >
            What's Coming Up Next
          </h2>
          <p className="text-xs sm:text-[13px] text-stone-300 font-sans leading-normal">
            Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <FigmaButton
            href="https://tickets.liveachievebelieve.org"
            target="_blank"
            variant="primary"
            size="sm"
          >
            TICKETS OPEN NOW
          </FigmaButton>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-[11px] sm:text-xs font-serif font-medium tracking-wider hover:scale-105 transition-all cursor-pointer"
          >
            <span>Audition</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── 2. POSTER BANNER (Preview Card with Rich Plum Background) ─── */}
      <div 
        onClick={openModal}
        className="relative w-full rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-[0_25px_60px_rgba(15,4,24,0.85)] border border-purple-500/25 bg-[#1B0C2A] shrink-0 cursor-pointer group"
      >
        <img
          src={auditionBanner}
          alt="Showdown Suicide Awareness Event - Where Are You Now? Letters to Etcetera"
          className="w-full h-auto aspect-[1978/1620] object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
        <div className="absolute inset-0 bg-[#1B0C2A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-[#1A0B2C]/90 backdrop-blur-md border border-purple-400/40 text-white text-xs font-serif tracking-wider uppercase flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
            <Maximize2 className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Click for Full Details & Auditions</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isStandaloneSection ? (
        <section 
          id={id}
          className={`relative w-full min-h-screen bg-gradient-to-b from-[#2B173E] via-[#1B0C2A] to-[#140820] flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden select-none ${className}`}
        >
          {/* Ambient background glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#F97316]/12 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-3xl pointer-events-none" />
          
          {content}
        </section>
      ) : (
        content
      )}

      {/* ─── AUDITION FLYER MODAL PORTAL (Full Details & Requirements) ─── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isFlyerModalOpen && (
            <div 
              data-lenis-prevent="true"
              onClick={closeModal}
              className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#10051C]/88 backdrop-blur-md flex justify-center items-start p-3 sm:p-6 md:p-8"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#F97316 rgba(255,255,255,0.1)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Modal Card */}
              <motion.div
                data-lenis-prevent="true"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-[1080px] my-4 sm:my-8 bg-gradient-to-b from-[#2C1841] via-[#200E32] to-[#160824] border border-purple-500/35 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 space-y-7 sm:space-y-9 shadow-[0_25px_90px_rgba(10,3,18,0.95)] overflow-hidden"
              >
                {/* Floating Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-xl backdrop-blur-md hover:scale-105"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Ambient background glows inside modal */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-[#F97316]/12 rounded-full blur-[130px] pointer-events-none" />
                <div className="absolute top-1/2 right-4 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-3xl pointer-events-none" />

                {/* ─── 1. TOP HEADER BAR INSIDE MODAL (Figma Reference) ─── */}
                <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
                  <div className="space-y-1 text-left max-w-xl pr-12 sm:pr-0">
                    <h2 
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-tight"
                    >
                      What's Coming Up Next
                    </h2>
                    <p className="text-xs sm:text-[13px] text-stone-300 font-sans leading-normal">
                      Discover our next event—an inspiring experience filled with meaningful stories, connection, and hope.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <FigmaButton
                      href="https://tickets.liveachievebelieve.org"
                      target="_blank"
                      variant="primary"
                      size="sm"
                    >
                      TICKETS OPEN NOW
                    </FigmaButton>
                    <button
                      type="button"
                      onClick={() => {
                        const card = document.getElementById('modal-audition-card');
                        card?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-[11px] sm:text-xs font-serif font-medium tracking-wider hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>Audition The Show</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ─── 2. COMPLETE FLYER POSTER (Full 1978x2560 High-Resolution Data) ─── */}
                <div className="w-full rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-purple-500/25 bg-[#1B0C2A]">
                  <img
                    src={showdownPoster}
                    alt="Showdown Suicide Awareness Event - Where Are You Now? Letters to Etcetera"
                    className="w-full h-auto block select-none"
                  />
                </div>

                {/* ─── 3. IMPORTANT INFORMATION PILL BADGE ─── */}
                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const card = document.getElementById('modal-audition-card');
                      card?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3F2D50] hover:bg-[#4E3963] border border-purple-400/30 text-stone-200 text-xs font-sans tracking-wide transition-all shadow-md cursor-pointer hover:scale-105"
                  >
                    <Info className="w-3.5 h-3.5 text-purple-300" />
                    <span>Important Information</span>
                    <ChevronDown className="w-3.5 h-3.5 text-purple-300 animate-bounce" />
                  </button>
                </div>

                {/* ─── 4. COMPLETE AUDITION REQUIREMENTS & CONTACT CARD ─── */}
                <div 
                  id="modal-audition-card"
                  className="w-full rounded-[18px] sm:rounded-[22px] border border-purple-500/35 bg-gradient-to-br from-[#230C38]/95 via-[#1A082B]/95 to-[#130520]/98 p-5 sm:p-7 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-md"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* Left Column: Requirements */}
                    <div className="lg:col-span-7 space-y-3.5 text-left">
                      <h3 
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase leading-snug"
                      >
                        WE WOULD STILL LOVE TO SEE YOUR TALENT.
                      </h3>

                      <div className="space-y-1.5">
                        <p className="text-xs sm:text-sm font-semibold text-stone-200 font-sans">
                          Please include:
                        </p>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-300 font-sans leading-relaxed list-disc list-inside">
                          <li><strong className="text-white font-medium">All performers:</strong> A current headshot and a video of yourself performing a monologue.</li>
                          <li><strong className="text-white font-medium">Singers:</strong> An additional, separate video singing a portion of a song that showcases your voice.</li>
                          <li><strong className="text-white font-medium">Dancers:</strong> An additional, separate video demonstrating your dance ability.</li>
                          <li><strong className="text-white font-medium">Singers and dancers:</strong> You may submit both additional videos.</li>
                          <li>Include your name and contact information with your submission.</li>
                        </ul>
                      </div>

                      <p className="pt-2.5 border-t border-white/10 text-[11px] text-stone-400 font-sans italic leading-relaxed">
                        This production explores sensitive themes involving mental health and suicide awareness. Performers are not expected to share personal experiences.
                      </p>
                    </div>

                    {/* Right Column: Contact Details */}
                    <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-6 space-y-3.5 text-left">
                      <div>
                        <h4 
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          className="text-base sm:text-lg font-bold text-white tracking-wide"
                        >
                          Live Achieve Believe, Inc.
                        </h4>
                        <p className="text-xs text-stone-400 font-sans mt-0.5">
                          People Matter. Every Story Matters.
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-1">
                        {/* Audition Email */}
                        <a 
                          href="mailto:auditions@thelab-inc.org"
                          className="group flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-purple-300 group-hover:text-[#F97316] group-hover:border-orange-500/30 transition-colors shrink-0">
                            <Mail className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-sans">Audition Inquiries</span>
                            <span className="block text-xs text-stone-200 group-hover:text-white transition-colors truncate">auditions@thelab-inc.org</span>
                          </div>
                        </a>

                        {/* Phone */}
                        <a 
                          href="tel:8132553592"
                          className="group flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-purple-300 group-hover:text-[#F97316] group-hover:border-orange-500/30 transition-colors shrink-0">
                            <Phone className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-sans">Phone</span>
                            <span className="block text-xs text-stone-200 group-hover:text-white transition-colors truncate">813-255-3592</span>
                          </div>
                        </a>

                        {/* Website */}
                        <a 
                          href="https://thelab-inc.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2.5 p-1.5 -mx-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-purple-300 group-hover:text-[#F97316] group-hover:border-orange-500/30 transition-colors shrink-0">
                            <Globe className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-sans">Website</span>
                            <span className="block text-xs text-stone-200 group-hover:text-white transition-colors truncate">thelab-inc.org</span>
                          </div>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, ArrowRight, X } from 'lucide-react';
import Seo from '@/components/Seo';
import FigmaButton from '@/components/common/FigmaButton';
import Coin3DCanvas from '@/components/donate/Coin3DCanvas';

export default function DonatePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <Seo
        title="Give Hope — Live Achieve Believe"
        description="A single coin creates an enduring ripple. Explore the minted coin of hope in interactive 3D."
      />

      {/* ─── ORYZO.AI CINEMATIC 3D COIN STAGE ─── */}
      <section className="relative w-full min-h-screen bg-[#0E0C13] text-stone-100 flex flex-col justify-between overflow-hidden select-none px-4 sm:px-8 lg:px-14 py-8 lg:py-12">
        
        {/* Warm Amber Radial Spotlight (Behind Coin) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(249, 115, 22, 0.22) 0%, rgba(217, 119, 6, 0.08) 40%, rgba(14, 12, 19, 0) 75%)',
          }}
          aria-hidden="true"
        />

        {/* Ambient Top Subtle Dust / Vignette */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.03)_0%,_transparent_60%)]"
          aria-hidden="true"
        />

        {/* ─── 1. TOP EDITORIAL BAR (Oryzo.ai style) ─── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6 pt-2">
          
          {/* Brand & Section Title */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-[#F97316] text-[11px] uppercase tracking-widest font-sans font-semibold mb-3">
              <Sparkles className="w-3 h-3 text-[#F97316]" />
              <span>Minted For Human Dignity</span>
            </div>
            <h1
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Give Hope.
            </h1>
          </div>

          {/* Right Editorial Statement (Oryzo editorial quote) */}
          <div className="max-w-md md:text-right">
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed italic"
            >
              "Do not take our word for it. Toss the coin of hope and watch how a single act of compassion alters the trajectory of a human life."
            </p>
            <span className="block mt-2 text-xs font-sans uppercase tracking-widest text-[#F97316] font-semibold">
              Live Achieve Believe • 501(c)(3)
            </span>
          </div>

        </div>

        {/* ─── 2. HERO 3D COIN CENTERPIECE ─── */}
        <div className="relative z-20 w-full flex-1 flex flex-col items-center justify-center my-6 sm:my-10">
          <Coin3DCanvas className="w-full" />
        </div>

        {/* ─── 3. BOTTOM TELEMETRY DOCK (Oryzo.ai style telemetry line) ─── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto border-t border-white/10 pt-5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-400">
          
          {/* Left: Trust & Impact */}
          <div className="flex items-center gap-2">
            <span className="text-[#F97316] font-bold tracking-wider uppercase text-[11px]">
              Impact Rating:
            </span>
            <div className="flex text-[#F97316] text-xs">★★★★★</div>
            <span className="text-stone-400 hidden sm:inline">[ 92¢ of each dollar directly to community meals ]</span>
          </div>

          {/* Center: Instruction badge */}
          <div className="text-stone-400 text-[11px] uppercase tracking-wider font-medium">
            Click Coin to Toss • Drag 360° to Inspect
          </div>

          {/* Right: Quick Action Pill */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-[#F97316] text-white text-xs font-serif font-bold border border-white/15 hover:border-[#F97316] transition-all duration-300 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-[#F97316] group-hover:text-white transition-colors" />
              <span>Plant a Seed ($50)</span>
              <ArrowRight className="w-3 h-3 text-[#F97316] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

        </div>

      </section>

      {/* ─── OPTIONAL MODAL POPUP FOR DONOR GIFT (Keeps main page 100% clean) ─── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-orange-100 text-[#F97316] flex items-center justify-center mx-auto">
                    <Heart className="w-7 h-7 fill-current" />
                  </div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-2xl font-bold text-stone-900"
                  >
                    Thank You for Giving Hope!
                  </h3>
                  <p className="text-sm text-stone-600 font-sans max-w-sm mx-auto">
                    Your gift of ${selectedAmount} directly fuels community meals and mentorship.
                  </p>
                  <FigmaButton
                    onClick={() => {
                      setIsSubmitted(false);
                      setShowModal(false);
                    }}
                    variant="primary"
                    size="md"
                  >
                    Close
                  </FigmaButton>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#F97316] tracking-wider font-sans">
                      Tax-Deductible 501(c)(3)
                    </span>
                    <h3
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1"
                    >
                      Complete Your Gift
                    </h3>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[10, 25, 50, 100].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-2.5 rounded-xl border text-sm font-bold font-serif transition-all ${
                          selectedAmount === amt
                            ? 'bg-[#F97316] text-white border-[#F97316] shadow-md'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#F97316]'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200/60 text-xs text-stone-700 font-sans flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                    <span>
                      92¢ of every dollar directly funds community meals, youth LEADS development, and veteran housing.
                    </span>
                  </div>

                  <FigmaButton
                    onClick={() => setIsSubmitted(true)}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                  >
                    Complete Gift of ${selectedAmount}
                  </FigmaButton>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
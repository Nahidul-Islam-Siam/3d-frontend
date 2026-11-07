import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShieldCheck, X } from 'lucide-react';
import Seo from '@/components/Seo';
import FigmaButton from '@/components/common/FigmaButton';
import DonateHeroSection from '@/components/donate/DonateHeroSection';
import WhyYourGiftMattersSection from '@/components/donate/WhyYourGiftMattersSection';
import DonateFinaleSection from '@/components/donate/DonateFinaleSection';

export default function DonatePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whySectionRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToWhy = () => {
    whySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCompleteSquareDonation = () => {
    window.open('https://square.link/u/D9O5AJW0', '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  return (
    <>
      <Seo
        title="Give Hope — Live Achieve Believe"
        description="Your generosity can become part of someone else's story. Explore the 3D coin of hope and see what actually happens when we show up."
      />

      <div className="w-full bg-[#08070B] text-white">
        
        {/* ─── 1. HERO SECTION ("GIVE HOPE" + Charity Jar) ─── */}
        <DonateHeroSection
          onDonateClick={() => setShowModal(true)}
          onScrollClick={handleScrollToWhy}
        />

        {/* ─── 2. STICKY 3D SCROLLYTELLING ("WHY YOUR GIFT MATTERS" + Oryzo.ai 3D Coin) ─── */}
        <div ref={whySectionRef}>
          <WhyYourGiftMattersSection />
        </div>

        {/* ─── 3. FINALE SECTION ("YOUR GIFT BECOMES PART OF A STORY") ─── */}
        <DonateFinaleSection
          onDonateClick={() => setShowModal(true)}
        />

      </div>

      {/* ─── ELEGANT GIVING MODAL DIALOG ─── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
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
                    Your gift of ${selectedAmount} directly fuels community meals, youth mentorship, and veteran shelter.
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
                        className={`py-2.5 rounded-xl border text-sm font-bold font-serif transition-all cursor-pointer ${
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
                    onClick={handleCompleteSquareDonation}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center shadow-[0_6px_20px_rgba(249,115,22,0.35)]"
                  >
                    Proceed with Square Checkout (${selectedAmount})
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

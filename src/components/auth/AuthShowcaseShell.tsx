import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Send } from 'lucide-react';
import logoWithText from '@/assets/logo/logo-with-text.png';

export interface AuthShowcaseShellProps {
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerLinkTo: string;
}

/** Minimalist line-art illustration flanking the left side of the auth card. */
function LeftEditorialIllustration() {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[240px] lg:w-[290px] xl:w-[320px] h-auto"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line x1="20" y1="238" x2="305" y2="238" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" />

      {/* Warm Amber & Ivory Stepped Blocks */}
      <rect x="82" y="168" width="54" height="70" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.4" />
      <rect x="136" y="138" width="58" height="100" fill="#FCE09B" stroke="#18181B" strokeWidth="1.4" />
      {/* Subtle upward hope arc inside block */}
      <path d="M96 222 C102 206, 114 192, 124 185" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M117 184 L125 184 L123 192" stroke="#18181B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Accent spark lines top-left */}
      <line x1="88" y1="42" x2="82" y2="30" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="100" y1="38" x2="101" y2="25" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="112" y1="44" x2="120" y2="35" stroke="#18181B" strokeWidth="1.6" strokeLinecap="round" />

      {/* Editorial seated figure with laptop */}
      {/* Hair bun & head */}
      <circle cx="116" cy="64" r="5" fill="#18181B" />
      <circle cx="128" cy="68" r="9" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" />
      <path d="M119 66 C121 58, 134 58, 136 67" fill="#18181B" />

      {/* Patterned sweater torso */}
      <path
        d="M117 82 L141 82 L145 124 L113 124 Z"
        fill="#18181B"
        stroke="#18181B"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Sweater white dash texture */}
      <line x1="122" y1="92" x2="128" y2="92" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="131" y1="100" x2="137" y2="100" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="120" y1="110" x2="126" y2="110" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Arms reaching to coral/orange laptop */}
      <path d="M138 89 L158 103 L172 103" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M174 103 L188 86 L190 86 L177 104 Z" fill="#F97316" stroke="#F97316" strokeWidth="1" />
      <line x1="158" y1="105" x2="180" y2="105" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" />

      {/* Wide-leg trousers sitting across blocks */}
      <path
        d="M113 124 L145 124 L178 136 L172 190 L152 190 L154 148 L113 148 Z"
        fill="#FFFFFF"
        stroke="#18181B"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M148 148 L128 190 L110 184 L126 142" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Shoes */}
      <path d="M160 190 L160 202 L173 202 C173 196, 168 190, 160 190 Z" fill="#18181B" />
      <path d="M114 185 L106 196 L118 201 C120 195, 118 188, 114 185 Z" fill="#18181B" />
    </svg>
  );
}

/** Minimalist geometric doorway & rising pillar illustration on the right side. */
function RightEditorialIllustration() {
  return (
    <svg
      viewBox="0 0 300 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[220px] lg:w-[270px] xl:w-[300px] h-auto"
      aria-hidden="true"
    >
      {/* Ground line */}
      <line x1="15" y1="218" x2="285" y2="218" stroke="#18181B" strokeWidth="1.4" strokeLinecap="round" />

      {/* Soft organic flourish / hope cloud lines behind blocks */}
      <path
        d="M180 86 C192 52, 240 50, 248 80 C268 78, 280 102, 264 122 C278 138, 266 164, 246 162"
        stroke="#18181B"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Stepped Architectural Blocks */}
      <rect x="86" y="138" width="60" height="80" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.4" />
      <rect x="146" y="96" width="84" height="122" fill="#FCE09B" stroke="#18181B" strokeWidth="1.4" />

      {/* Minimalist Inner Doorway Motif (Live Achieve Believe Signature) */}
      <rect x="166" y="128" width="44" height="90" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.4" />
      <circle cx="201" cy="176" r="2.6" fill="#F97316" />

      {/* Tiny diamond sparkle */}
      <path d="M115 84 L118 92 L126 95 L118 98 L115 106 L112 98 L104 95 L112 92 Z" fill="#F97316" opacity="0.85" />
    </svg>
  );
}

export default function AuthShowcaseShell({
  title,
  subtitle,
  children,
  footerPrompt,
  footerLinkLabel,
  footerLinkTo,
}: AuthShowcaseShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#EFECE6] flex items-center justify-center p-3 sm:p-6 md:p-10 selection:bg-[#F97316] selection:text-white">
      {/* Main Rounded Light Canvas */}
      <div className="relative w-full max-w-[1160px] min-h-[680px] rounded-[28px] sm:rounded-[36px] bg-[#FAF9F6] border border-stone-200/80 shadow-[0_24px_80px_rgba(24,24,27,0.08)] overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-12">
        {/* Top Header Bar */}
        <header className="relative z-20 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <img
              src={logoWithText}
              alt="Live Achieve Believe"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              aria-label="Back to website"
              title="Back to Live Website"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white/80 hover:bg-white text-stone-700 hover:text-[#F97316] flex items-center justify-center transition-all shadow-xs"
            >
              <Globe className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              aria-label="Contact Live Achieve Believe"
              title="Contact Us"
              className="w-10 h-10 rounded-full bg-[#1C1917] hover:bg-[#F97316] text-white flex items-center justify-center transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Left & Right Editorial Illustrations (Desktop) */}
        <div className="pointer-events-none select-none hidden md:block absolute bottom-6 left-4 lg:left-10 z-0">
          <LeftEditorialIllustration />
        </div>
        <div className="pointer-events-none select-none hidden md:block absolute bottom-6 right-4 lg:right-10 z-0">
          <RightEditorialIllustration />
        </div>

        {/* Center Floating Auth Card */}
        <main className="relative z-10 flex items-center justify-center my-8 sm:my-6">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[390px] bg-white rounded-[26px] sm:rounded-[30px] p-7 sm:p-9 shadow-[0_20px_60px_rgba(24,24,27,0.06)] border border-stone-200/60"
          >
            <div className="space-y-1.5 mb-6 text-left">
              <h1 className="text-2xl sm:text-[26px] font-bold text-[#18181B] tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-[13px] text-stone-500 font-normal">
                {subtitle}
              </p>
            </div>

            {children}

            <p className="mt-5 text-center text-xs text-stone-500">
              {footerPrompt}{' '}
              <Link
                to={footerLinkTo}
                className="font-semibold text-stone-800 hover:text-[#F97316] transition-colors"
              >
                {footerLinkLabel}
              </Link>
            </p>
          </motion.div>
        </main>

        {/* Subtle bottom spacer for balanced vertical framing */}
        <div className="h-2 sm:h-4" aria-hidden="true" />
      </div>
    </div>
  );
}


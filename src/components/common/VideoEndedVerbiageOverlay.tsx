import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowDown, ArrowRight } from 'lucide-react';

export interface VideoEndedVerbiageOverlayProps {
  visible: boolean;
  eyebrow?: string;
  title: string;
  lead?: string;
  body: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onReplay: () => void;
  onScrollDown: () => void;
}

/**
 * Fades in approved organization verbiage in-place once a hero video finishes,
 * while giving visitors instant replay and scroll controls.
 */
export default function VideoEndedVerbiageOverlay({
  visible,
  eyebrow,
  title,
  lead,
  body,
  tagline,
  ctaLabel,
  ctaHref,
  onReplay,
  onScrollDown,
}: VideoEndedVerbiageOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 text-center bg-[radial-gradient(ellipse_at_center,rgba(36,20,10,0.92)_0%,rgba(12,8,5,0.98)_75%,#080503_100%)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto space-y-5"
          >
            {eyebrow && (
              <span className="inline-block text-xs uppercase tracking-[0.28em] font-semibold text-[#F97316]">
                {eyebrow}
              </span>
            )}

            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] uppercase"
            >
              {title}
            </h2>

            {lead && (
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-lg sm:text-xl text-amber-200/90 italic"
              >
                {lead}
              </p>
            )}

            <div className="w-full max-w-md mx-auto py-1 space-y-1">
              <div className="w-full border-t border-dashed border-white/20" />
              <div className="w-full border-t border-dashed border-white/20" />
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto font-sans">
              {body}
            </p>

            {tagline && (
              <p className="text-xs sm:text-sm font-serif italic text-[#dfb978] pt-1">
                {tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={onScrollDown}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                <span>Scroll Down to Explore</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              {ctaLabel && ctaHref && (
                <Link
                  to={ctaHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-stone-300 hover:text-white hover:bg-white/10 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Video</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

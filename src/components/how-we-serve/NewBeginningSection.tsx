import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PackageCheck, Sparkles, ArrowRight } from 'lucide-react';
import {
  officialPillars,
  oneMissionManyExpressions,
} from '@/data/officialVerbiage';

export interface NewBeginningSectionProps {
  id?: string;
  className?: string;
}

export default function NewBeginningSection({
  id = 'a-new-beginning',
  className = '',
}: NewBeginningSectionProps) {
  const content = officialPillars.newBeginning;

  return (
    <section
      id={id}
      className={`relative w-full bg-[#150E09] text-stone-100 py-20 lg:py-28 px-6 sm:px-12 lg:px-20 overflow-hidden select-none ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(249, 115, 22, 0.14) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* Door 5: A New Beginning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-6 space-y-5 text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/15 border border-[#F97316]/35 text-[#F97316] text-xs font-semibold uppercase tracking-widest">
              <PackageCheck className="w-3.5 h-3.5" /> Door 5: {content.title}
            </span>

            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
            >
              {content.lead}
            </h2>

            <p className="text-base sm:text-lg text-amber-200/90 font-serif italic">
              {content.intro}
            </p>

            <div className="w-full max-w-md py-1 space-y-1.5">
              <div className="w-full border-t border-dashed border-white/20" />
              <div className="w-full border-t border-dashed border-white/20" />
            </div>

            <p className="text-xs uppercase tracking-[0.22em] text-[#dfb978] font-semibold">
              {content.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="lg:col-span-6 rounded-3xl bg-white/5 border border-white/10 p-7 sm:p-9 space-y-6 text-left backdrop-blur-sm"
          >
            <div>
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#F97316] mb-2">
                What We Do
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {content.whatWeDo}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#dfb978] mb-2">
                How You Can Help
              </h3>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {content.howYouCanHelp}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {content.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  to={cta.href}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    cta.primary
                      ? 'bg-[#F97316] hover:bg-[#ea580c] text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
                  }`}
                >
                  <span>{cta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* One Mission. Many Expressions. Climax */}
        <div className="rounded-3xl bg-[#FAF4E6] text-[#1C140D] p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#EA580C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{oneMissionManyExpressions.lead}</span>
          </div>

          <h3
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B]"
          >
            {oneMissionManyExpressions.title}
          </h3>

          <p className="text-sm sm:text-base text-[#5E5042] max-w-2xl mx-auto leading-relaxed">
            {oneMissionManyExpressions.body}
          </p>

          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-lg sm:text-xl font-bold text-[#F97316] tracking-wide"
          >
            {oneMissionManyExpressions.mantra.join(' ')}
          </p>

          <p className="text-sm font-serif italic text-[#746343]">
            {oneMissionManyExpressions.closing}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {oneMissionManyExpressions.ctas.map((cta) => (
              <Link
                key={cta.label}
                to={cta.href}
                className={`px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  cta.primary
                    ? 'bg-[#F97316] hover:bg-[#ea580c] text-white shadow-md'
                    : 'border border-[#D4C3A3] text-[#18181B] hover:bg-[#f1e5cd]'
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

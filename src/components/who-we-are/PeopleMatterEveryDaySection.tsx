import { motion } from 'framer-motion';
import {
  MessageCircle,
  Users,
  Utensils,
  GraduationCap,
  Church,
  Home,
  HeartHandshake,
} from 'lucide-react';
import FigmaButton from '@/components/common/FigmaButton';

export interface PeopleMatterEveryDaySectionProps {
  id?: string;
  className?: string;
}

const row1Pills = [
  { id: 'conversation', label: 'One conversation.', icon: MessageCircle },
  { id: 'volunteer', label: 'One volunteer', icon: Users },
  { id: 'meal', label: 'One meal', icon: Utensils },
];

const row2Pills = [
  { id: 'student', label: 'One student', icon: GraduationCap },
  { id: 'churches', label: 'Churches', icon: Church },
  { id: 'home', label: 'One home', icon: Home },
  {
    id: 'kindness',
    label: 'One act of kindness.',
    icon: HeartHandshake,
    highlight: true,
  },
];

export default function PeopleMatterEveryDaySection({
  id = 'people-matter-everyday',
  className = '',
}: PeopleMatterEveryDaySectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── Left Column: Headline, Narrative, Impact Pills & CTA ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Main Headline */}
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-semibold text-[#0B0B0A] leading-[1.15] tracking-tight"
            >
              People Matter. Every Day.<br />
              In Every Circumstance.<br />
              Without Exception.
            </h2>

            {/* Narrative Paragraph */}
            <p
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              className="mt-6 text-[15px] sm:text-[16px] text-[#746343] font-normal leading-[24px] max-w-xl"
            >
              We don&apos;t believe everyone has to do everything. We believe everyone can do something. And together, those somethings can change lives.
            </p>

            {/* Subtle Double Dotted Divider */}
            <div className="w-full flex flex-col gap-1.5 my-6 sm:my-8">
              <div className="w-full border-t border-dotted border-[#D4C3A3]" />
              <div className="w-full border-t border-dotted border-[#D4C3A3]" />
            </div>

            {/* ─── Impact Tags / Pills ─── */}
            <div className="space-y-3">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {row1Pills.map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={pill.id}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5ECDA]/50 hover:bg-[#F5ECDA]/80 border border-[#DECDB3] transition-colors duration-200"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#8C7A65] shrink-0" />
                      <span className="font-sans text-xs sm:text-[13px] text-[#594B3C] font-normal whitespace-nowrap">
                        {pill.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {row2Pills.map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={pill.id}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                        pill.highlight
                          ? 'bg-[#F97316]/10 border border-[#F97316]/35'
                          : 'bg-[#F5ECDA]/50 hover:bg-[#F5ECDA]/80 border border-[#DECDB3]'
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          pill.highlight ? 'text-[#F97316]' : 'text-[#8C7A65]'
                        }`}
                      />
                      <span
                        className={`font-sans text-xs sm:text-[13px] font-normal whitespace-nowrap ${
                          pill.highlight ? 'text-[#F97316] font-medium' : 'text-[#594B3C]'
                        }`}
                      >
                        {pill.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── Action Button (FigmaButton) ─── */}
            <div className="pt-8 sm:pt-10">
              <FigmaButton
                variant="primary"
                size="md"
                to="/movement"
                className="shadow-[0_6px_20px_rgba(249,115,22,0.28)]"
              >
                Be Part Of LAB
              </FigmaButton>
            </div>
          </motion.div>

          {/* ─── Right Column: 4-Photo Bento Mosaic (Figma 1:1) ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="grid grid-cols-[320fr_275fr] gap-3 sm:gap-4 max-w-[620px] w-full items-start">
              
              {/* Column 1 (Left): Two women with food (top) + Buffet kitchen (bottom) */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Top: volunteer-food.png (320x155) */}
                <div className="relative w-full aspect-[320/155] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#ECE0D0] shadow-[0_8px_24px_rgba(44,36,29,0.08)] group">
                  <img
                    src="/who/volunteer-food.png"
                    alt="Volunteers sharing warm food and compassion"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom: volunteer-buff.png (320x418) */}
                <div className="relative w-full aspect-[320/418] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#ECE0D0] shadow-[0_8px_24px_rgba(44,36,29,0.08)] group">
                  <img
                    src="/who/volunteer-buff.png"
                    alt="Community kitchen preparing fresh meals for families"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Column 2 (Right): Smiling girl with plate (top) + Smiling kids group (bottom) */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Top: volunteer-child.png (275x347) */}
                <div className="relative w-full aspect-[275/347] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#ECE0D0] shadow-[0_8px_24px_rgba(44,36,29,0.08)] group">
                  <img
                    src="/who/volunteer-child.png"
                    alt="Young girl smiling with meal at community gathering"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom: volunteer-group.png (275x163) */}
                <div className="relative w-full aspect-[275/163] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#ECE0D0] shadow-[0_8px_24px_rgba(44,36,29,0.08)] group">
                  <img
                    src="/who/volunteer-group.png"
                    alt="Children radiating joy and hope through community support"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

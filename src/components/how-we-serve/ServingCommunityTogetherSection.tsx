import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';

export interface ServingCommunityTogetherSectionProps {
  id?: string;
  className?: string;
}

const partners = [
  {
    id: 'bread-of-refuge',
    title: 'Bread of Refuge',
    description:
      'We are honored to partner with Bread of Refuge to help provide meals and compassionate support to individuals and families.',
    mapUrl: 'https://maps.google.com/?q=Bread+of+Refuge+Tampa+FL',
  },
  {
    id: 'family-promise',
    title: 'Family Promise of Hillsborough County',
    description:
      'Together with Family Promise of Hillsborough County, we serve families working toward stability by providing meals, encouragement, and a welcoming community.',
    mapUrl: 'https://maps.google.com/?q=Family+Promise+of+Hillsborough+County',
  },
  {
    id: 'community-street-outreach',
    title: 'Community Street Outreach',
    description:
      'We also take meals directly to individuals experiencing homelessness, meeting people where they are with dignity, compassion, and hope.',
    mapUrl: 'https://maps.google.com/?q=Tampa+Bay+Direct+Outreach',
  },
];

export default function ServingCommunityTogetherSection({
  id = 'serving-community-together',
  className = '',
}: ServingCommunityTogetherSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      {/* ─── Decorative Leaf Flourish - Bottom Left (Group.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: -18 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -left-6 w-32 sm:w-44 lg:w-56 opacity-85 pointer-events-none select-none z-0"
      />

      {/* ─── Decorative Leaf Flourish - Top Right (Group-2.png) ─── */}
      <motion.img
        initial={{ opacity: 0, x: 18 }}
        whileInView={{ opacity: 0.85, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="absolute top-8 sm:top-12 -right-6 w-36 sm:w-48 lg:w-60 opacity-85 pointer-events-none select-none z-0"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* ─── Section Header (Headline & Narrative) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3.5"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#272624',
              lineHeight: 'normal',
            }}
            className="text-3xl sm:text-4xl lg:text-[48px] font-semibold text-center tracking-tight"
          >
            Serving Our Community Together
          </h2>

          <p
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            className="text-xs sm:text-sm lg:text-[14.5px] text-[#746343] font-normal leading-relaxed max-w-xl mx-auto"
          >
            We are grateful to serve alongside incredible community partners
            and through direct outreach across our community.
          </p>
        </motion.div>

        {/* ─── 3 Community Partner Cards with Network Map (Frame 212.png) ─── */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-8">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.75,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 md:p-8 border border-[#EFE5D2] shadow-[0_10px_32px_rgba(44,36,29,0.04)] hover:shadow-[0_16px_44px_rgba(44,36,29,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Upper Content: Title + Description */}
              <div>
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="font-bold text-lg sm:text-[21px] text-[#0B0B0A] leading-snug tracking-tight"
                >
                  {partner.title}
                </h3>

                <p
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  className="mt-3 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed text-[#746343] font-normal"
                >
                  {partner.description}
                </p>
              </div>

              {/* Lower Content: Dotted Divider + Network Map + Map Link */}
              <div className="mt-6 sm:mt-8 flex flex-col">
                {/* Dotted Divider */}
                <div className="w-full border-t border-dotted border-[#D4C3A3] mb-4" />

                {/* Network Map Illustration (partner-map-network.png) */}
                <div className="w-full py-2 flex items-center justify-center">
                  <img
                    src="/who/partner-map-network.png"
                    alt={`${partner.title} network hub`}
                    className="w-full h-auto object-contain max-h-[140px] group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Action Link: View Map */}
                <a
                  href={partner.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-sans font-medium text-[#F97316] hover:text-[#ea580c] transition-colors mt-4 self-start"
                >
                  <span>View map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


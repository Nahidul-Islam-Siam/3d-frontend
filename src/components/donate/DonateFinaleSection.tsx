import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FigmaButton from '@/components/common/FigmaButton';
import finaleJarImg from '@/assets/donate/finale-charity-jar.png';

interface DonateFinaleSectionProps {
  onDonateClick: () => void;
}

export default function DonateFinaleSection({
  onDonateClick,
}: DonateFinaleSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen bg-[#08070B] text-white flex flex-col items-center justify-center overflow-hidden select-none px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
      
      {/* Ambient Radial Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(249, 115, 22, 0.18) 0%, rgba(217, 119, 6, 0.05) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
        
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight uppercase"
        >
          YOUR GIFT BECOMES <br />
          PART OF A STORY
        </motion.h2>

        {/* Narrative Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-stone-300 text-sm sm:text-base lg:text-lg font-sans leading-relaxed max-w-2xl mx-auto"
        >
          Behind every gift is a person, a moment, and a possibility. Every act of generosity helps make hope possible. When we choose to show up for each other, survival turns into creation.
        </motion.p>

        {/* Center Charity Jar & Coin Drop Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="relative w-full max-w-[460px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 my-4"
        >
          <img
            src={finaleJarImg}
            alt="Hand depositing coin into charity jar"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08070B] via-transparent to-transparent opacity-50 pointer-events-none" />
        </motion.div>

        {/* Action Trigger Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <FigmaButton
            onClick={onDonateClick}
            variant="primary"
            size="lg"
            className="shadow-[0_8px_30px_rgba(249,115,22,0.4)]"
          >
            DONATE NOW
          </FigmaButton>

          <FigmaButton
            onClick={() => navigate('/movement')}
            variant="outline"
            size="lg"
          >
            JOIN THE MOVEMENT
          </FigmaButton>
        </motion.div>

      </div>

    </section>
  );
}


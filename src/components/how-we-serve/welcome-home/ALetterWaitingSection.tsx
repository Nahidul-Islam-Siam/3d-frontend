import { motion } from 'framer-motion';
import letterBanner from '@/assets/how-we-serve/welcome-home/letter-waiting-clean.png';

export interface ALetterWaitingSectionProps {
  id?: string;
  className?: string;
}

export default function ALetterWaitingSection({
  id = 'a-letter-waiting',
  className = '',
}: ALetterWaitingSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full max-w-none p-0 m-0 bg-[#FAF4E6] select-none overflow-hidden leading-none ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-none p-0 m-0 overflow-hidden leading-none"
      >
        <img
          src={letterBanner}
          alt="A Letter Waiting - Welcome Home letter on prepared bed"
          className="w-full h-auto object-cover block select-none pointer-events-none"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}

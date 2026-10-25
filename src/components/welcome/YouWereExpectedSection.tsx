import { motion } from 'framer-motion';
import FigmaButton from '@/components/common/FigmaButton';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';

export default function YouWereExpectedSection() {
  return (
    <section className="relative w-full bg-[#FAF4E6] py-20 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden select-none">
      
      {/* Decorative leaf flourish - Left */}
      <img
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-10 sm:bottom-16 w-28 sm:w-36 lg:w-44 opacity-80 pointer-events-none select-none"
      />
      
      {/* Decorative leaf flourish - Right */}
      <img
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-8 sm:bottom-14 w-28 sm:w-36 lg:w-44 opacity-80 pointer-events-none select-none"
      />

      <div className="max-w-[860px] mx-auto text-center relative z-10 space-y-7">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase"
        >
          <span className="text-[#18181B]">YOU WERE </span>
          <span className="text-[#F97316]">EXPECTED.</span>
        </motion.h2>

        {/* Narrative Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-3 text-[15px] sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-2xl mx-auto"
        >
          <p>
            Thank you for stepping inside. The table is prepared, the light is on, and you are welcome here.
          </p>
          <p>
            Take your next step with us today. Whether reading stories or standing in our kitchen line, your presence completes our family.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-3"
        >
          <FigmaButton to="/about" variant="primary">
            Explore Our Story
          </FigmaButton>

          <FigmaButton to="/movement" variant="outline">
            Join the Movement
          </FigmaButton>
        </motion.div>

      </div>
    </section>
  );
}

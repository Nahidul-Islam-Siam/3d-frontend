import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import leftLeaf from '@/assets/icons/Group.png';
import rightLeaf from '@/assets/icons/Group-2.png';

interface StatItem {
  target: number;
  prefix: string;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    target: 5000,
    prefix: '+',
    suffix: '',
    label: 'People Served',
  },
  {
    target: 200,
    prefix: '+',
    suffix: '',
    label: 'Volunteers',
  },
  {
    target: 8000,
    prefix: '+',
    suffix: '',
    label: 'Community Members',
  },
  {
    target: 8,
    prefix: '+',
    suffix: ' years',
    label: 'Years of Service',
  },
];

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2.2,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export interface PeopleLeadingWaySectionProps {
  className?: string;
}

export default function PeopleLeadingWaySection({
  className = '',
}: PeopleLeadingWaySectionProps) {
  return (
    <section
      id="people-leading-the-way"
      className={`relative w-full bg-[#FAF4E6] py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden select-none ${className}`}
    >
      {/* ─── Decorative Leaf Flourish - Left (Group.png) ─── */}
      <img
        src={leftLeaf}
        alt=""
        aria-hidden="true"
        className="absolute left-0 bottom-8 sm:bottom-12 lg:bottom-16 w-24 sm:w-32 lg:w-40 opacity-80 pointer-events-none select-none"
      />

      {/* ─── Decorative Leaf Flourish - Right (Group-2.png) ─── */}
      <img
        src={rightLeaf}
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-6 sm:bottom-10 lg:bottom-14 w-24 sm:w-32 lg:w-40 opacity-80 pointer-events-none select-none"
      />

      <div className="max-w-[1080px] mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Main Heading: The People Leading the Way */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-[#18181B] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight tracking-tight text-center max-w-3xl"
        >
          The People Leading the Way
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 text-[#746343] text-sm sm:text-base lg:text-[16px] font-sans font-normal leading-relaxed text-center max-w-xl"
        >
          Meet the people who choose to serve, believe in hope, and help bring this mission to life.
        </motion.p>

        {/* 4 Stat Cards Grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 max-w-[940px] mx-auto">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.65,
                delay: 0.1 + idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center justify-center py-7 sm:py-9 px-4 sm:px-6 border border-[#D2C9B5] bg-transparent hover:border-[#F97316]/60 hover:bg-[#F97316]/[0.02] hover:shadow-[0_8px_24px_rgba(249,115,22,0.08)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              {/* Stat Value with Smooth Hardware-Accelerated Counting Animation */}
              <span className="text-[#F97316] text-2xl sm:text-3xl lg:text-[34px] font-sans font-bold leading-none tracking-tight group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2.0 + idx * 0.2}
                />
              </span>

              {/* Stat Label */}
              <span className="text-[#746343] text-xs sm:text-[13px] md:text-sm font-sans font-normal mt-2.5 sm:mt-3 text-center whitespace-nowrap">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

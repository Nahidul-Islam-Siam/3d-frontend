import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    // Paced for cinematic ~3.2s duration (Edolus pace)
    const interval = setInterval(() => {
      // Natural variable pacing with micro-pauses
      const step = current < 35 
        ? 1 
        : current < 70 
          ? (Math.random() > 0.3 ? 1 : 0) // Subtle organic pause
          : current < 92 
            ? (Math.random() > 0.2 ? 1 : 0) 
            : 1;

      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onComplete) onComplete();
        }, 500); // Elegant hold at 100%
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!isDone && (
        <div className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden font-sans">
          
          {/* Main Pure Black Shutter (Edolus 1:1) */}
          <motion.div
            initial={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ 
              duration: 1.2, 
              ease: [0.77, 0, 0.175, 1], // Theatrical left-to-right wipe
            }}
            className="absolute inset-0 bg-[#000000] flex flex-col items-center justify-center p-6"
          >
            {/* Center Pure Brand & Numeric Counter Only */}
            <div className="flex flex-col items-center text-center space-y-4">
              
              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-[0.2em] uppercase"
              >
                LIVE ACHIEVE BELIEVE
              </motion.h1>

              {/* Percentage & Dot */}
              <div className="flex flex-col items-center font-mono pt-2">
                <div className="flex items-baseline gap-0.5 text-stone-300">
                  <span className="text-xl sm:text-2xl font-light tabular-nums">
                    {progress.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs font-normal opacity-70">%</span>
                </div>

                <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-500">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}

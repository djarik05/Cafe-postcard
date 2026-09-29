import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const raf = useRef<number>(0);
  const start = useRef(0);

  useEffect(() => {
    const duration = 1600;

    const tick = (now: number) => {
      if (!start.current) start.current = now;
      const elapsed = now - start.current;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);

      if (pct < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(onComplete, 800);
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [onComplete]);

  const containerVariants: Variants = {
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(12px)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="visible"
      animate={exiting ? 'exit' : 'visible'}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Slow rotating ambient blob */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[600px] h-[600px] rounded-full bg-brand/10 blur-[120px] pointer-events-none"
      />

      {/* Pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.08, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-80 h-80 rounded-full border border-brand/20 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Cafe name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-serif tracking-[0.25em] text-primary mb-3"
        >
          CAFÉ POSTCARD
        </motion.h1>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs font-sans tracking-[0.35em] text-muted uppercase mb-14"
        >
          Bhubaneswar · Odisha
        </motion.p>

        {/* Progress line */}
        <div className="w-56 h-[1px] bg-white/[0.08] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent/80 origin-left"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-5 text-[11px] font-sans text-muted tracking-[0.25em] uppercase"
        >
          Preparing your postcard…
        </motion.p>
      </div>
    </motion.div>
  );
};

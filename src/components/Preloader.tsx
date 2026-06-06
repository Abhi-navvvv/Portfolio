'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onRevealStart: () => void;
  onComplete: () => void;
}

export default function Preloader({ onRevealStart, onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    // Check if preloader has already played this session
    const hasPlayed = sessionStorage.getItem('preloader-played');
    if (hasPlayed) {
      setShouldPlay(false);
      setIsVisible(false);
      onComplete();
    } else {
      setShouldPlay(true);
    }
  }, [onComplete]);

  // Handle reveal start (1.2s delay) and completion (2.1s total)
  useEffect(() => {
    if (!shouldPlay) return;

    const revealTimer = setTimeout(() => {
      onRevealStart();
    }, 1200);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2100);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [shouldPlay, onRevealStart]);

  if (!shouldPlay) return null;

  const cubicBezierEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden pointer-events-none select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Half Panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{
              delay: 1.2,
              duration: 0.9,
              ease: cubicBezierEase,
            }}
            className="absolute top-0 left-0 w-full h-[50vh] bg-[#0a0a0a] overflow-hidden pointer-events-auto border-b border-white/5"
          >
            <div className="absolute top-0 left-0 w-full h-[100vh] flex items-center justify-center">
              <span className="font-anton uppercase text-[clamp(60px,10vw,120px)] text-[#fafafa] tracking-[0.15em] select-none">
                ABHINAV
              </span>
            </div>
          </motion.div>

          {/* Bottom Half Panel */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{
              delay: 1.2,
              duration: 0.9,
              ease: cubicBezierEase,
            }}
            className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#0a0a0a] overflow-hidden pointer-events-auto border-t border-white/5"
          >
            <div className="absolute bottom-0 left-0 w-full h-[100vh] flex items-center justify-center">
              <span className="font-anton uppercase text-[clamp(60px,10vw,120px)] text-[#fafafa] tracking-[0.15em] select-none">
                ABHINAV
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

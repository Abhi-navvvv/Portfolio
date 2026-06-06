'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, className = '', children }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when 15% of the section is visible in the viewport
  const isInView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section id={id} ref={ref} className={`relative pt-24 md:pt-32 ${className}`}>
      {/* 1px Sweeping Line Transition */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden">
        {isInView && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ originX: 0 }}
            className="w-full h-[1px] bg-violet-accent"
          />
        )}
      </div>

      {/* Main Section Content with Scroll Reveal */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  );
}

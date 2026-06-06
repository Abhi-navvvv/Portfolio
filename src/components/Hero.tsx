'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const tickerItems = [
  'Solidity',
  'Circom',
  'Rust',
  'Anchor',
  'IPFS',
  'ZK Proofs',
  'Next.js',
  'Wagmi',
  'Ethers.js',
  'Foundry',
];

export default function Hero() {
  const { scrollY } = useScroll();
  // Parallax background moves at 0.4x scroll speed
  const bgY = useTransform(scrollY, [0, 800], [0, 320]);
  const textY = useTransform(scrollY, [0, 800], [0, 120]);

  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-32 md:pt-40 pb-12"
    >
      {/* Parallax Background Grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-20"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </motion.div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Side: Editorial Typography */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center items-start text-left z-10"
          style={{ y: textY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        >
          {/* Subtitle Line 1 */}
          <span className="uppercase tracking-[0.25em] text-[11px] md:text-[13px] font-semibold text-mint-accent mb-4 block">
            Blockchain & ZK Engineer
          </span>

          {/* Headline Line 2 */}
          <h1 className="font-anton uppercase text-5xl sm:text-6xl md:text-8xl tracking-tight text-white leading-none mb-6">
            Abhinav Singh
          </h1>

          {/* Description Line 3 */}
          <p className="text-[#666666] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl mb-10">
            Building trustless systems &middot; B.Tech CSE @ Bennett University
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 md:px-8 md:py-4 bg-mint-accent hover:bg-mint-hover text-[#0a0a0a] font-bold rounded-lg transition-all duration-300 shadow-lg shadow-mint-accent/10 text-sm md:text-base cursor-pointer"
            >
              View Projects
            </button>
            <a
              href="https://github.com/Abhi-navvvv"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 md:px-8 md:py-4 glass-card hover:bg-white/5 text-[#fafafa] font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              GitHub <ArrowUpRight className="w-4 h-4 text-mint-accent" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Animated SVG Hex Grid */}
        <motion.div
          className="lg:col-span-5 hidden lg:flex justify-center items-center pointer-events-none opacity-40 z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.svg
            width="420"
            height="420"
            viewBox="0 0 200 200"
            className="w-full max-w-[420px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {/* Draw outer, middle and inner hex networks */}
            <defs>
              <pattern id="dotPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#00f050" fillOpacity="0.3" />
              </pattern>
            </defs>

            {/* Glowing Center */}
            <circle cx="100" cy="100" r="12" fill="#00f050" className="blur-[4px]" fillOpacity="0.3" />
            <circle cx="100" cy="100" r="4" fill="#ffffff" fillOpacity="0.8" />

            {/* Inner Ring Hexagons */}
            <polygon points="100,60 135,80 135,120 100,140 65,120 65,80" fill="none" stroke="#00f050" strokeWidth="0.75" strokeDasharray="3 3" />
            <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.5" />
            <polygon points="100,20 169,60 169,140 100,180 31,140 31,60" fill="none" stroke="#00f050" strokeWidth="0.75" strokeOpacity="0.8" />

            {/* Radial Lines connecting vertices */}
            <line x1="100" y1="20" x2="100" y2="180" stroke="#00f050" strokeWidth="0.25" strokeOpacity="0.4" />
            <line x1="31" y1="60" x2="169" y2="140" stroke="#00f050" strokeWidth="0.25" strokeOpacity="0.4" />
            <line x1="31" y1="140" x2="169" y2="60" stroke="#00f050" strokeWidth="0.25" strokeOpacity="0.4" />

            {/* Decorative Orbiting Node Rings */}
            <circle cx="100" cy="20" r="3" fill="#ffffff" />
            <circle cx="169" cy="60" r="2" fill="#00f050" />
            <circle cx="169" cy="140" r="3" fill="#ffffff" />
            <circle cx="100" cy="180" r="2" fill="#00f050" />
            <circle cx="31" cy="140" r="3" fill="#ffffff" />
            <circle cx="31" cy="60" r="2" fill="#00f050" />

            {/* Additional abstract shapes inside */}
            <polygon points="100,75 122,87 122,113 100,125 78,113 78,87" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 1" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Infinite Scrolling Ticker (Tajmirul inspired) */}
      <div className="w-full bg-[#1a1a1a]/60 border-y border-[#2a2a2a] py-4 overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap">
          {/* Double list for smooth seamless looping */}
          <div className="animate-ticker flex items-center">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <div key={idx} className="flex items-center text-sm md:text-base font-anton uppercase tracking-widest text-white/50 mx-8">
                <span>{item}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-mint-accent ml-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

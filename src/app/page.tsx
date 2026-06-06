'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import GithubActivity from '@/components/GithubActivity';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [revealPage, setRevealPage] = useState(false);
  const [hasPlayedSession, setHasPlayedSession] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasPlayed = sessionStorage.getItem('preloader-played');
      setHasPlayedSession(!!hasPlayed);
      if (hasPlayed) {
        setRevealPage(true);
      }
    }
  }, []);

  const handleRevealStart = () => {
    setRevealPage(true);
  };

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader-played', 'true');
  };

  return (
    <>
      {!hasPlayedSession && (
        <Preloader onRevealStart={handleRevealStart} onComplete={handlePreloaderComplete} />
      )}
      <motion.div
        initial={hasPlayedSession ? { opacity: 1 } : { opacity: 0 }}
        animate={revealPage ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10 w-full min-h-screen flex flex-col"
      >
        <Navbar />
        <Hero />
        <About />
        <GithubActivity />
        <Projects />
        <Certifications />
        <Footer />
      </motion.div>
    </>
  );
}

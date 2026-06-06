'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Activity', href: '#activity', id: 'activity' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Certifications', href: '#certifications', id: 'certifications' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll detection for background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up intersection observer to highlight current section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ['about', 'activity', 'projects', 'certifications'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Handle home/hero section
    const heroElement = document.getElementById('home');
    if (heroElement) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection('home');
          }
        },
        { threshold: 0.5 }
      );
      heroObserver.observe(heroElement);
      return () => {
        observer.disconnect();
        heroObserver.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Monogram Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="group relative flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-mint-accent/50 transition-all duration-300 bg-white/5"
        >
          <span className="font-anton uppercase text-lg tracking-wider text-white group-hover:text-mint-accent transition-colors duration-300">
            AN
          </span>
          {/* Subtle Glow Behind Monogram */}
          <span className="absolute inset-0 rounded-lg bg-mint-accent/0 group-hover:bg-mint-accent/5 transition-all duration-300 blur-sm -z-10" />
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-1 md:space-x-2 overflow-x-auto no-scrollbar max-w-[calc(100vw-5rem)] mask-linear-fade">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative px-2 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[11px] sm:text-sm font-medium transition-colors duration-300 text-white/60 hover:text-white whitespace-nowrap shrink-0"
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-mint-accent"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}

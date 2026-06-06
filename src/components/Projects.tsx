'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';

interface Project {
  number: string;
  title: string;
  featured: boolean;
  categories: string[];
  tags: string[];
  description: string;
  links: {
    github?: string;
    demo?: string;
    etherscan?: string;
  };
}

const projectsData: Project[] = [
  {
    number: '_01.',
    title: 'ZK-Whistleblower',
    featured: true,
    categories: ['ZK', 'EVM', 'Fullstack'],
    tags: ['Circom', 'Solidity', 'Next.js 15', 'IPFS', 'Wagmi'],
    description: 'Anonymous whistleblowing platform using zero-knowledge proofs for identity privacy.',
    links: {
      github: 'https://github.com/Abhi-navvvv/Zero-K-Whistleblower',
      demo: '#',
    },
  },
  {
    number: '_02.',
    title: 'Sol-Uptime',
    featured: false,
    categories: ['Solana'],
    tags: ['Solana', 'Rust', 'Anchor', 'TypeScript'],
    description: 'Decentralized uptime monitoring using Solana validators as truth sources.',
    links: {
      github: 'https://github.com/Abhi-navvvv',
    },
  },
  {
    number: '_03.',
    title: 'Authentiq',
    featured: false,
    categories: ['Fullstack'],
    tags: ['Next.js 16', 'FastAPI', 'PyTorch', 'Web3'],
    description: 'AI-powered deepfake detector with decentralized verification layer.',
    links: {
      github: 'https://github.com/Abhi-navvvv',
    },
  },
  {
    number: '_04.',
    title: 'ERC-721 NFT Contract',
    featured: false,
    categories: ['EVM'],
    tags: ['Solidity', 'Hardhat', 'OpenZeppelin'],
    description: 'Gas-optimized NFT collection with on-chain metadata.',
    links: {
      github: 'https://github.com/Abhi-navvvv',
      etherscan: 'https://etherscan.io',
    },
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ x: isEven ? -60 : 60, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : { x: isEven ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between relative transition-shadow duration-300 hover:shadow-xl hover:shadow-mint-accent/5 ${
        project.featured ? 'border-t-2 border-t-mint-accent' : ''
      }`}
    >
      <div>
        {/* Top Header Card */}
        <div className="flex justify-between items-start mb-6">
          <span className="font-anton text-sm text-mint-accent">
            {project.number}
          </span>
          {project.featured && (
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-mint-accent/15 text-mint-accent border border-mint-accent/20">
              Featured
            </span>
          )}
        </div>

        {/* Project Name */}
        <h3 className="font-anton uppercase text-2xl md:text-3xl text-[#fafafa] mb-3 hover:text-mint-accent transition-colors duration-300">
          {project.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-xs font-mono font-medium text-[#fafafa]/60 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-[#666666] text-sm md:text-base mb-8 leading-relaxed font-normal">
          {project.description}
        </p>
      </div>

      {/* Links Row */}
      <div className="flex items-center gap-4 border-t border-white/5 pt-4 mt-auto">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-[#fafafa] hover:text-mint-accent font-semibold transition-colors duration-200 flex items-center gap-1.5"
          >
            GitHub <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            className="text-xs md:text-sm text-[#fafafa] hover:text-mint-accent font-semibold transition-colors duration-200 flex items-center gap-1.5"
          >
            Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
        {project.links.etherscan && (
          <a
            href={project.links.etherscan}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-[#fafafa] hover:text-mint-accent font-semibold transition-colors duration-200 flex items-center gap-1.5"
          >
            Etherscan <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.categories.includes(filter));

  return (
    <Section id="projects" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-baseline gap-4">
          <span className="font-anton text-xl md:text-2xl text-mint-accent">03.</span>
          <h2 className="font-anton uppercase text-3xl md:text-5xl text-white">Projects</h2>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 z-10">
          {['All', 'ZK', 'Solana', 'EVM', 'Fullstack'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-mint-accent border-mint-accent text-[#0a0a0a] shadow-md shadow-mint-accent/20'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#666666] hover:text-[#fafafa] hover:border-[#666666]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={idx}
            />
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

'use client';

import Section from './Section';

const skills = {
  'on-chain': ['Solidity', 'Rust', 'Anchor', 'Circom'],
  frontend: ['Next.js', 'TypeScript', 'Wagmi', 'Ethers.js'],
  infra: ['IPFS', 'PostgreSQL', 'Hardhat', 'Foundry'],
};

export default function About() {
  return (
    <Section id="about" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-12 md:mb-16">
        <span className="font-anton text-xl md:text-2xl text-mint-accent">01.</span>
        <h2 className="font-anton uppercase text-3xl md:text-5xl text-white">About</h2>
      </div>

      {/* Grid Layout: Left Bio, Right Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
        {/* Left Column (60% equivalent) */}
        <div className="lg:col-span-7 flex flex-col justify-start space-y-6">
          <p className="text-[#fafafa] text-base md:text-lg leading-relaxed font-normal">
            I build privacy-first decentralized systems &mdash; from ZK circuits in Circom to Solidity smart contracts. Currently a 2nd-year CS student at Bennett University, focused on blockchain infrastructure, DeFi protocols, and zero-knowledge proofs.
          </p>
          <p className="text-[#666666] text-base md:text-lg leading-relaxed font-normal">
            Passionate about trustless execution, cryptography, and the mathematics that enable secure, censorship-resistant networks. I specialize in the EVM and Solana ecosystems, developing audited, gas-optimized contracts and user-friendly Web3 frontends.
          </p>
        </div>

        {/* Right Column (40% equivalent): Stat Cards in Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          <div className="glass-card rounded-xl p-6 flex flex-col justify-between hover:border-mint-accent/30 transition-colors duration-300">
            <span className="text-[11px] uppercase tracking-widest text-mint-accent font-bold mb-2 block">
              NPTEL Elite
            </span>
            <span className="text-white text-lg md:text-xl font-bold font-anton uppercase">
              Top 5% nationally
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 flex flex-col justify-between hover:border-mint-accent/30 transition-colors duration-300">
            <span className="text-[11px] uppercase tracking-widest text-mint-accent font-bold mb-2 block">
              3 Live Projects
            </span>
            <span className="text-white text-lg md:text-xl font-bold font-anton uppercase">
              ZK &middot; Solana &middot; EVM
            </span>
          </div>

          <div className="glass-card rounded-xl p-6 flex flex-col justify-between hover:border-mint-accent/30 transition-colors duration-300">
            <span className="text-[11px] uppercase tracking-widest text-mint-accent font-bold mb-2 block">
              Open Source
            </span>
            <a
              href="https://github.com/Abhi-navvvv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm md:text-base font-bold font-anton uppercase hover:text-mint-accent transition-colors duration-200 break-all"
            >
              github.com/Abhi-navvvv
            </a>
          </div>
        </div>
      </div>

      {/* Tech Stack Categories Rows */}
      <div className="space-y-8">
        <h3 className="font-anton text-lg text-[#666666] uppercase tracking-widest mb-6">
          Skills / Technologies
        </h3>

        <div className="space-y-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="flex flex-col md:flex-row md:items-center py-4 border-b border-white/5 gap-4"
            >
              {/* Category label */}
              <div className="w-32 flex-shrink-0">
                <span className="font-anton text-xs md:text-sm text-mint-accent uppercase tracking-widest">
                  {category}
                </span>
              </div>

              {/* Skills chips */}
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-xs md:text-sm font-medium text-[#fafafa]/80 rounded-md bg-white/5 border border-white/5 hover:border-mint-accent/20 transition-all duration-300 hover:bg-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

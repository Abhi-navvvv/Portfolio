'use client';

import Section from './Section';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface Certification {
  id: string;
  featured?: boolean;
  title: string;
  issuer: string;
  details: string;
  badge: string;
  status: 'Verified' | 'In Progress';
  faviconDomain: string;
  link: string;
}

const certificationsData: Certification[] = [
  {
    id: 'nptel',
    featured: true,
    title: 'Blockchain and its Applications',
    issuer: 'NPTEL &middot; IIT Kharagpur',
    details: 'Elite + Silver Medal &mdash; Top 5% nationally',
    badge: 'Elite + Silver',
    status: 'Verified',
    faviconDomain: 'nptel.ac.in',
    link: 'https://nptel.ac.in/noc/E_Certificate/NOC26CS34S76260031304329764',
  },
  {
    id: 'nptel2',
    featured: false,
    title: 'Data Structure and Algorithm Designs',
    issuer: 'NPTEL &middot; IIT Kanpur',
    details: 'Proficiency in analyzing and designing algorithms for various computational problems',
    badge: 'Verified Professional',
    status: 'Verified',
    faviconDomain: 'nptel.ac.in',
    link: 'https://nptel.ac.in/noc/E_Certificate/NPTEL25CS81S46560166710326823',
  },
  {
    id: 'google-OS',
    featured: false,
    title: 'Operating System and You',
    issuer: 'Coursera &middot; Google',
    details: 'Foundational understanding of operating system concepts and principles.',
    badge: 'Verified Professional',
    status: 'Verified',
    faviconDomain: 'google.com',
    link: 'https://www.coursera.org/account/accomplishments/certificate/KC9LT5419NAF',
  },
];

export default function Certifications() {
  return (
    <Section id="certifications" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-12">
        <span className="font-anton text-xl md:text-2xl text-mint-accent">04.</span>
        <div>
          <h2 className="font-anton uppercase text-3xl md:text-5xl text-white">
            Certifications & Recognition
          </h2>
          <p className="text-[#666666] text-xs md:text-sm mt-1 font-normal">
            Validated expertise in blockchain infrastructure
          </p>
        </div>
      </div>

      {/* Grid Layout (2 cols on desktop, 1 on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {certificationsData.map((cert) => (
          <div
            key={cert.id}
            className={`glass-card rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-mint-accent/30 transition-all duration-300 relative ${cert.featured ? 'border-t-2 border-t-mint-accent md:col-span-2' : ''
              }`}
          >
            {/* Card Header: Favicon & Status */}
            <div className="flex justify-between items-center mb-6">
              {/* Favicon from Issuer */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 relative p-2">
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${cert.faviconDomain}`}
                    alt={`${cert.id}-logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // fallback to generic award icon if favicon fails
                      e.currentTarget.style.display = 'none';
                      const sibling = e.currentTarget.nextElementSibling;
                      if (sibling) sibling.classList.remove('hidden');
                    }}
                  />
                  <Award className="w-5 h-5 text-mint-accent hidden" />
                </div>
                <div>
                  <h4
                    className="font-sans font-semibold text-[#fafafa]/90 text-sm md:text-base leading-tight"
                    dangerouslySetInnerHTML={{ __html: cert.issuer }}
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5">
                {cert.status === 'Verified' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                    In Progress
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <h3 className="font-anton uppercase text-lg md:text-2xl text-white mb-2 leading-tight flex items-center gap-2">
                {cert.title}
                {cert.featured && <span className="text-mint-accent text-sm">&middot; Featured</span>}
              </h3>
              <p
                className="text-[#666666] text-sm md:text-base font-normal"
                dangerouslySetInnerHTML={{ __html: cert.details }}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-white/5 pt-4">
              <span className={`px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded ${cert.status === 'Verified'
                ? 'bg-mint-accent/15 text-mint-accent border border-mint-accent/20'
                : 'bg-white/5 text-[#666666] border border-white/5'
                }`}>
                {cert.badge}
              </span>

              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs md:text-sm text-[#fafafa]/80 hover:text-mint-accent transition-colors duration-200 font-semibold"
              >
                Credential Link <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

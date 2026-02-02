
import React from 'react';

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
    {children}
  </div>
);

export const Header: React.FC = () => (
  <header className="mb-12 text-center">
    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-2">
      Nexus <span className="font-semibold text-indigo-400">Engineer</span>
    </h1>
    <p className="text-zinc-400 text-sm md:text-base font-light tracking-widest uppercase italic">
      Prompt Synthesis & Harmonic Alignment
    </p>
    <div className="mt-8 h-px w-24 bg-indigo-500/50 mx-auto"></div>
  </header>
);

export const Section: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <section className={`mb-12 ${className}`}>
    {title && <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400/80 mb-4">{title}</h2>}
    {children}
  </section>
);

import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Zap, Palette, Feather, Menu, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';

export default function Navbar({ annotationsEnabled, setAnnotationsEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerBlast = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#a855f7', '#06b6d4', '#f59e0b', '#ec4899', '#3b82f6'],
      shapes: ['circle', 'square']
    });
  };

  const navLinks = [
    { name: 'Doodle Lab', href: '#doodle-lab', icon: Palette },
    { name: 'Motion Engine', href: '#motion-engine', icon: Zap },
    { name: 'Framer Physics', href: '#framer-physics', icon: Layers },
    { name: 'Specifications', href: '#specifications', icon: Feather }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
      <div className={`max-w-6xl mx-auto rounded-full transition-all duration-500 px-6 py-3.5 flex items-center justify-between ${
        scrolled 
          ? 'apple-glass shadow-2xl border-white/10 shadow-purple-950/20' 
          : 'bg-slate-950/30 backdrop-blur-md border border-white/5'
      }`}>
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0b0d14] rounded-[11px] flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white text-base">
              <span>Aether</span>
              <RoughAnnotation 
                type="underline" 
                color="#06b6d4" 
                show={annotationsEnabled} 
                strokeWidth={2}
                animationDuration={600}
              >
                <span className="text-cyan-400">Motion</span>
              </RoughAnnotation>
            </div>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">Labs & Canvas</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-full hover:bg-white/5"
              >
                <Icon className="w-3.5 h-3.5 text-purple-400/80" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Annotation Toggle */}
          <button
            onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${
              annotationsEnabled
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-sm shadow-purple-500/20'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'
            }`}
            title="Toggle hand-drawn Rough Annotations across website"
          >
            <span className={`w-2 h-2 rounded-full ${annotationsEnabled ? 'bg-purple-400 animate-ping' : 'bg-slate-600'}`} />
            <span>Doodles: <strong className={annotationsEnabled ? 'text-purple-300' : 'text-slate-400'}>{annotationsEnabled ? 'ACTIVE' : 'OFF'}</strong></span>
          </button>

          {/* Confetti Trigger Button */}
          <button
            onClick={triggerBlast}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Burst</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/5"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto apple-glass rounded-2xl p-5 border border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-200 hover:text-purple-400 py-2 px-3 rounded-lg hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
              className="text-xs font-medium px-3.5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300"
            >
              Doodles: {annotationsEnabled ? 'ACTIVE' : 'OFF'}
            </button>
            <button
              onClick={triggerBlast}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-purple-600 text-white flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Burst</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { Feather, Sun, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';
import ProfessionalDoodle from './ProfessionalDoodle';

export default function ProductHeaderNav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.1 }
    });
  };

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Global Top Mini Bar (Apple Style) */}
      <div className={`py-2 px-6 text-center text-xs transition-colors border-b ${
        isDark 
          ? 'bg-[#161617]/90 text-[#86868b] border-[#2c2c2e]' 
          : 'bg-[#e8e8ed]/90 text-[#6e6e73] border-[#d2d2d7]'
      }`}>
        <span className="inline-flex items-center gap-2 font-medium">
          <ProfessionalDoodle type="sparkle" className="w-4 h-4 text-[#2997ff] animate-pulse" />
          <span className={`font-semibold tracking-wide ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}`}>
            Sanket Kakad GenAI Portfolio
          </span>
        </span>
      </div>

      {/* Product Sticky Local Nav (Apple MacBook Pro Style) */}
      <div className={`transition-all duration-300 py-3.5 px-6 border-b ${
        scrolled
          ? isDark 
            ? 'bg-[#161617]/85 backdrop-blur-xl border-[#2c2c2e] shadow-2xl shadow-black/80'
            : 'bg-[#ffffff]/85 backdrop-blur-xl border-[#d2d2d7] shadow-xl shadow-slate-200/50'
          : isDark 
            ? 'bg-[#161617]/50 backdrop-blur-md border-[#2c2c2e]/40'
            : 'bg-[#f5f5f7]/50 backdrop-blur-md border-[#d2d2d7]/40'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Product Title */}
          <div className="flex items-baseline gap-3">
            <a href="#" className={`text-lg md:text-xl font-bold tracking-tight flex items-center gap-2 ${
              isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
            }`}>
              <div className="w-6 h-6 rounded-lg bg-[#0071e3] p-[1px]">
                <div className={`w-full h-full rounded-[7px] flex items-center justify-center ${
                  isDark ? 'bg-[#000000]' : 'bg-[#ffffff]'
                }`}>
                  <Feather className="w-3.5 h-3.5 text-[#0071e3]" />
                </div>
              </div>
              <RoughAnnotation
                type="underline"
                color="#0071e3"
                show={true}
                strokeWidth={2}
              >
                <span>Sanket Kakad</span>
              </RoughAnnotation>
            </a>
            <span className={`text-xs font-mono hidden sm:inline-block ${
              isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
            }`}>Senior AI Engineer</span>
          </div>

          {/* Subnav Anchor Links & Action Buttons */}
          <div className="flex items-center gap-6 text-xs">
            <nav className={`hidden md:flex items-center gap-6 font-medium ${
              isDark ? 'text-[#a1a1a6]' : 'text-[#6e6e73]'
            }`}>
              <a href="#overview" className={`transition-colors font-semibold ${
                isDark ? 'hover:text-[#f5f5f7] text-[#f5f5f7]' : 'hover:text-[#1d1d1f] text-[#1d1d1f]'
              }`}>Overview</a>
              <a href="#projects" className={isDark ? 'hover:text-[#f5f5f7]' : 'hover:text-[#1d1d1f]'}>Projects</a>
              <a href="#articles" className={isDark ? 'hover:text-[#f5f5f7]' : 'hover:text-[#1d1d1f]'}>Articles</a>
              <a href="#contact" className={isDark ? 'hover:text-[#f5f5f7]' : 'hover:text-[#1d1d1f]'}>Contact</a>
            </nav>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all flex items-center gap-2 active:scale-95 ${
                isDark
                  ? 'bg-[#2c2c2e] border-[#3a3a3c] text-[#f5f5f7] hover:bg-[#3a3a3c]'
                  : 'bg-[#e8e8ed] border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#d2d2d7]'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

    </header>
  );
}

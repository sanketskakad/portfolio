import React from 'react';
import { ArrowUp, Mail, ExternalLink, Heart } from 'lucide-react';

export default function Footer({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors duration-500 pt-16 pb-12 relative overflow-hidden ${
      isDark ? 'bg-[#161617] border-[#2c2c2e] text-[#f5f5f7]' : 'bg-[#e8e8ed] border-[#d2d2d7] text-[#1d1d1f]'
    }`}>
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Header Banner */}
        <div className={`flex flex-col md:flex-row items-center justify-between pb-12 border-b gap-6 ${
          isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
        }`}>
          <div>
            <div className={`flex items-center gap-2 text-2xl font-extrabold tracking-tight mb-1 ${
              isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
            }`}>
              <span>Sanket Kakad</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3]" />
            </div>
            <p className={`text-xs font-light max-w-md ${
              isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
            }`}>
              Senior AI Engineer building production LLM architectures, agentic workflows, and low-latency streaming engines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className={`px-4 py-2 rounded-full transition-all border cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-semibold ${
                isDark 
                  ? 'bg-[#2c2c2e] text-[#f5f5f7] hover:bg-[#3a3a3c] border-[#2c2c2e]' 
                  : 'bg-[#ffffff] text-[#1d1d1f] hover:bg-[#f5f5f7] border-[#d2d2d7] shadow-sm'
              }`}
              title="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clean Aligned Site Map & Contact Info Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b text-xs ${
          isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
        }`}>
          
          {/* Column 1: Site Map Navigation */}
          <div>
            <h4 className={`font-mono font-bold uppercase tracking-wider mb-4 text-[11px] text-[#0071e3]`}>
              Site Map
            </h4>
            <ul className={`flex flex-col gap-3 font-medium ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>
              <li>
                <a href="#overview" className="hover:text-[#0071e3] transition-colors flex items-center gap-1.5">
                  <span>Overview</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#0071e3] transition-colors flex items-center gap-1.5">
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a href="#articles" className="hover:text-[#0071e3] transition-colors flex items-center gap-1.5">
                  <span>Articles</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0071e3] transition-colors flex items-center gap-1.5">
                  <span>Contact Form</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Featured AI Projects */}
          <div>
            <h4 className={`font-mono font-bold uppercase tracking-wider mb-4 text-[11px] text-[#0071e3]`}>
              Live Projects
            </h4>
            <ul className={`flex flex-col gap-3 font-medium ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>
              <li>
                <a 
                  href="https://huggingface.co/spaces/SANKETKAKAD/usa-constitution-gpt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0071e3] transition-colors flex items-center gap-1 text-[#0071e3] font-semibold"
                >
                  <span>USA Constitution GPT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering Stack */}
          <div>
            <h4 className={`font-mono font-bold uppercase tracking-wider mb-4 text-[11px] text-[#0071e3]`}>
              Core Tech Stack
            </h4>
            <ul className={`flex flex-col gap-3 font-medium ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>
              <li><span className={isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}>Python & Pydantic</span></li>
              <li><span className={isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}>LangChain & LangGraph</span></li>
              <li><span className={isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}>React 19 & Tailwind v4</span></li>
              <li><span className={isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}>Docker & SQL</span></li>
            </ul>
          </div>

          {/* Column 4: Aligned Contact Information */}
          <div>
            <h4 className={`font-mono font-bold uppercase tracking-wider mb-4 text-[11px] text-[#0071e3]`}>
              Contact Information
            </h4>
            <div className={`flex flex-col gap-3 font-medium ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>
              
              {/* Direct Email */}
              <a 
                href="mailto:sanket.kakad@gmail.com" 
                className="hover:text-[#0071e3] transition-colors flex items-center gap-2 text-[#0071e3] font-semibold break-all"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#0071e3]" />
                <span>sanket.kakad@gmail.com</span>
              </a>

              {/* Status */}
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] leading-tight">Available for AI Engineering Roles</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 font-mono ${
          isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
        }`}>
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Sanket Kakad. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse" />
          </div>
          <div className="flex items-center gap-6">
            <a href="#overview" className="hover:text-[#0071e3] transition-colors">Overview</a>
            <a href="#projects" className="hover:text-[#0071e3] transition-colors">Projects</a>
            <a href="#articles" className="hover:text-[#0071e3] transition-colors">Articles</a>
            <a href="#contact" className="hover:text-[#0071e3] transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

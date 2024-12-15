import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';
import AISkillsMatrix from './AISkillsMatrix';

gsap.registerPlugin(ScrollTrigger);

export default function ProductHeroSection({ theme = 'dark' }) {
  const heroRef = useRef(null);
  const isDark = theme === 'dark';

  useGSAP(() => {
    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    tl.from('.hero-eyebrow', { opacity: 0, y: -20 })
      .from('.hero-main-title', { opacity: 0, y: 50, scale: 0.96 })
      .from('.hero-sub-title', { opacity: 0, y: 30 }, '-=0.4')
      .from('.hero-sub-text', { opacity: 0, y: 30 }, '-=0.4')
      .from('.hero-device-mockup', { opacity: 0, y: 80, scale: 0.88 }, '-=0.2');

    // Apple-style scroll-driven scaling & parallax
    gsap.to('.hero-device-mockup', {
      scale: 1.02,
      rotateX: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: heroRef });

  const triggerBlast = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <section ref={heroRef} id="overview" className={`relative pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
    }`}>
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0071e3]/10 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0071e3]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        
        {/* Eyebrow badge */}
        <div className={`hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 border transition-colors ${
          isDark 
            ? 'bg-[#161617] border-[#2c2c2e] text-[#2997ff]' 
            : 'bg-[#ffffff] border-[#d2d2d7] text-[#0071e3] shadow-sm'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
          <span>Generative AI & Machine Learning Architect</span>
        </div>

        {/* BIG Name Headline */}
        <h1 className={`hero-main-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[1.0] text-center mb-4 ${
          isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
        }`}>
          Sanket Kakad
        </h1>

        {/* Medium Experienced Subheading */}
        <div className={`hero-sub-title text-xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6 ${
          isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
        }`}>
          Architecting Enterprise LLMs.{' '}
          <RoughAnnotation
            type="underline"
            color="#0071e3"
            show={true}
            strokeWidth={3}
            animationDuration={1000}
            className="px-1"
          >
            <span className="text-[#0071e3]">Engineering Autonomous Agents.</span>
          </RoughAnnotation>
        </div>

        {/* Subtitle */}
        <p className={`hero-sub-text text-base sm:text-lg md:text-xl font-light max-w-3xl leading-relaxed mb-14 ${
          isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
        }`}>
          Senior AI engineer designing production-grade LLM systems, multimodal RAG architectures, multi-agent tool execution, and low-latency streaming infrastructure.
        </p>

        {/* Sleek Laptop Device Frame Mockup (Apple Style) */}
        <motion.div
          whileHover={{ rotateX: 2, rotateY: -2, y: -6 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="hero-device-mockup w-full max-w-4xl relative perspective-1000"
        >
          {/* Laptop Lid / Screen Container */}
          <div className="rounded-3xl p-3 bg-gradient-to-b from-[#2c2c2e] via-[#1c1c1e] to-[#161617] border border-white/15 shadow-2xl shadow-black/90">
            <div className="bg-[#000000] rounded-2xl overflow-hidden border border-[#2c2c2e] aspect-[16/10] relative flex flex-col justify-between p-6 sm:p-10">
              
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#2c2c2e] text-xs font-mono text-[#86868b]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[#f5f5f7] font-medium">Terminal</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#86868b]">
                  <span>zsh</span>
                </div>
              </div>

              {/* BIG AI Skills Matrix Showcase */}
              <div className="my-auto h-[260px] sm:h-[320px] w-full p-1 sm:p-2 flex flex-col justify-between overflow-hidden">
                <AISkillsMatrix isDark={isDark} />
              </div>

            </div>
          </div>

          {/* Laptop Base Mockup Accent */}
          <div className="w-[85%] h-3 bg-gradient-to-r from-[#2c2c2e] via-[#1c1c1e] to-[#2c2c2e] rounded-b-xl mx-auto border-t border-white/20 shadow-md" />

        </motion.div>

      </div>

    </section>
  );
}

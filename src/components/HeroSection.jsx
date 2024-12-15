import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Sparkles, ArrowRight, Play, CheckCircle2, Sliders, Zap, Shield, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';

export default function HeroSection({ annotationsEnabled }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  
  // Interactive annotation style control state
  const [activeAnnotationType, setActiveAnnotationType] = useState('circle');
  const [annotationColor, setAnnotationColor] = useState('#a855f7');

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    
    tl.from('.hero-badge', { y: -20, opacity: 0, scale: 0.9 })
      .from('.hero-title-line', { y: 40, opacity: 0, stagger: 0.15 }, '-=0.4')
      .from('.hero-desc', { y: 20, opacity: 0 }, '-=0.4')
      .from('.hero-ctas', { y: 20, opacity: 0 }, '-=0.4')
      .from('.hero-card-preview', { y: 60, opacity: 0, scale: 0.95 }, '-=0.2');
  }, { scope: containerRef });

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const annotationTypes = [
    { id: 'circle', label: 'Circle', color: '#a855f7' },
    { id: 'highlight', label: 'Highlight', color: '#06b6d4' },
    { id: 'box', label: 'Box', color: '#f59e0b' },
    { id: 'underline', label: 'Underline', color: '#ec4899' },
    { id: 'bracket', label: 'Bracket', color: '#10b981' }
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Overlay Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-8 shadow-lg shadow-purple-950/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Next-Gen Web Architecture</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-slate-400 font-normal">Vite + React + GSAP</span>
        </div>

        {/* Main Headline */}
        <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          <div className="hero-title-line">
            Where Precision Motion
          </div>
          <div className="hero-title-line flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-2">
            <span>Meets</span>
            
            {/* Interactive Rough Annotation Triggered Word */}
            <RoughAnnotation
              type={activeAnnotationType}
              color={annotationColor}
              show={annotationsEnabled}
              strokeWidth={3}
              animationDuration={900}
              className="px-2"
            >
              <span className="apple-gradient-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300">
                Hand-Drawn Magic
              </span>
            </RoughAnnotation>
            
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-desc text-lg md:text-xl text-slate-300/90 max-w-2xl font-light leading-relaxed mb-8">
          Craft breathtaking Apple-grade web interfaces backed by vector doodle annotations, 
          real-time physics, and hardware-accelerated GSAP timelines.
        </p>

        {/* Annotation Style Switcher Controls */}
        <div className="hero-ctas w-full max-w-md bg-slate-900/70 apple-glass p-2.5 rounded-2xl border border-white/10 mb-10 flex flex-col gap-2 shadow-2xl">
          <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              Live Headline Doodle Control:
            </span>
            <span className="text-purple-300 font-bold uppercase">{activeAnnotationType}</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {annotationTypes.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveAnnotationType(item.id);
                  setAnnotationColor(item.color);
                }}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeAnnotationType === item.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 scale-105'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-ctas flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#doodle-lab"
            className="px-7 py-3.5 rounded-full bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition-all shadow-xl shadow-white/10 flex items-center gap-2 group active:scale-95"
          >
            <span>Launch Doodle Lab</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={triggerConfetti}
            className="px-7 py-3.5 rounded-full apple-glass text-white font-medium text-sm hover:bg-white/10 transition-all border-white/15 flex items-center gap-2 active:scale-95 shadow-lg"
          >
            <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span>Trigger Particle Blast</span>
          </button>
        </div>

        {/* Framer Motion Interactive Floating Glass Hero Card */}
        <motion.div
          whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="hero-card-preview w-full max-w-4xl apple-glass-card rounded-3xl p-6 md:p-8 text-left relative overflow-hidden border border-white/10 glow-purple"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">aether-engine.config.ts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 60 FPS Accelerated
              </span>
            </div>
          </div>

          {/* Interactive Feature Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 text-purple-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">GSAP Timeline Engine</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Precision frame-by-frame orchestration with zero layout thrashing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3 text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">RoughJS Sketch Engine</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Generative hand-drawn vector graphics rendered straight to canvas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3 text-amber-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Framer Spring Physics</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Gestural drag, layout morphing, and tactile spring dynamics.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

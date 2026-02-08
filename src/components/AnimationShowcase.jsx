import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Play, Pause, RotateCcw, Layers, Move, RefreshCw, Star, Crown, Sparkles, Feather } from 'lucide-react';
import RoughAnnotation from './RoughAnnotation';

gsap.registerPlugin(ScrollTrigger);

export default function AnimationShowcase({ annotationsEnabled }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  
  // GSAP Timeline Controls State
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [progress, setProgress] = useState(0);

  // Framer Motion Layout Expansion State
  const [selectedCard, setSelectedCard] = useState(null);

  // SVG Animated Path Trigger State
  const [svgPathKey, setSvgPathKey] = useState(0);

  // Setup GSAP Interactive Demo Timeline
  useGSAP(() => {
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        if (tl) setProgress(Math.round(tl.progress() * 100));
      }
    });

    tl.to('.gsap-box-1', { x: 120, rotation: 360, borderRadius: '50%', duration: 1.2, ease: 'power2.inOut' })
      .to('.gsap-box-2', { y: -40, scale: 1.25, backgroundColor: '#06b6d4', duration: 1, ease: 'back.out(1.7)' }, '-=0.6')
      .to('.gsap-box-3', { x: -120, rotation: -180, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, '-=0.4');

    timelineRef.current = tl;

    // ScrollTrigger Parallax Banner
    gsap.to('.parallax-banner', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: containerRef });

  const handlePlayPause = () => {
    if (!timelineRef.current) return;
    if (isPlaying) {
      timelineRef.current.pause();
    } else {
      timelineRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed) => {
    setTimeScale(speed);
    if (timelineRef.current) {
      timelineRef.current.timeScale(speed);
    }
  };

  const handleRestart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
      setIsPlaying(true);
    }
  };

  // Framer Motion Card Deck Data
  const framerCards = [
    {
      id: 1,
      title: 'Spring Physics',
      badge: 'Framer Motion',
      desc: 'Tactile fluid momentum with customizable stiffness & damping.',
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30'
    },
    {
      id: 2,
      title: 'Shared Layout Morph',
      badge: 'LayoutID Engine',
      desc: 'Smooth position and scale transitions across component updates.',
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30'
    },
    {
      id: 3,
      title: 'Gestural Drag Bounds',
      badge: 'Pointer Events',
      desc: 'Drag elements freely with elastic snapping boundaries.',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
    }
  ];

  return (
    <section ref={containerRef} id="motion-lab" className="py-24 relative overflow-hidden bg-[#000000]">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Dual Motion Architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            GSAP & Framer Motion Suite
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Use high-frequency timeline controls alongside gestural physics for ultimate UI reactivity.
          </p>
        </div>

        {/* GSAP Timeline Playground */}
        <div className="apple-glass-card rounded-3xl p-6 md:p-8 mb-16 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-semibold text-lg">GSAP Timeline Control Center</h3>
              </div>
              <p className="text-slate-400 text-xs mt-1">Real-time timeline playback manipulation & progress tracking</p>
            </div>

            {/* Playback Toolbar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-950/40"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium"
                title="Restart Timeline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5 ml-2">
                {[0.5, 1, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
                      timeScale === speed ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GSAP Visual Timeline Canvas Box */}
          <div className="bg-[#050609] rounded-2xl border border-white/10 p-8 min-h-[220px] flex items-center justify-around relative overflow-hidden mb-6">
            
            {/* Box 1 */}
            <div className="gsap-box-1 w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/40">
              01
            </div>

            {/* Box 2 */}
            <div className="gsap-box-2 w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/40">
              02
            </div>

            {/* Box 3 */}
            <div className="gsap-box-3 w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-900/40">
              03
            </div>

          </div>

          {/* Timeline Progress Bar */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400">Timeline Progress:</span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-purple-300 w-10 text-right">{progress}%</span>
          </div>
        </div>

        {/* Framer Motion Physics & Drag Deck */}
        <div id="framer-physics" className="apple-glass-card rounded-3xl p-6 md:p-8 mb-16 border border-white/10">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-semibold text-lg">Framer Motion Drag & Layout Morphing</h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Move className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Interactive Drag Enabled</span>
            </div>
          </div>

          {/* Draggable Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {framerCards.map((card) => (
              <motion.div
                key={card.id}
                drag
                dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                whileDrag={{ scale: 1.05, zIndex: 10 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} border backdrop-blur-xl cursor-grab active:cursor-grabbing flex flex-col justify-between min-h-[200px] transition-all`}
              >
                <div>
                  <span className="inline-block text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-white font-medium mb-3">
                    {card.badge}
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono">
                  <span>Hold & Drag Me</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SVG Vector Path Stroke Animation Engine */}
        <div className="apple-glass-card rounded-3xl p-6 md:p-8 border border-white/10">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-2">
              <Feather className="w-5 h-5 text-rose-400" />
              <h3 className="text-white font-semibold text-lg">Hand-Drawn Vector SVG Path Animation</h3>
            </div>
            <button
              onClick={() => setSvgPathKey((prev) => prev + 1)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span>Re-trigger Stroke</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* SVG 1: Crown Doodle */}
            <div className="p-6 rounded-2xl bg-[#050609] border border-white/10 flex flex-col items-center justify-center text-center min-h-[180px]">
              <svg key={`crown-${svgPathKey}`} className="w-20 h-20 text-amber-400 mb-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path
                  d="M10 70 L25 30 L45 50 L65 20 L85 50 L95 70 Z M10 70 L95 70"
                  className="[stroke-dasharray:400] [stroke-dashoffset:400] animate-[dashOffset_2s_ease-in-out_forwards]"
                />
              </svg>
              <span className="text-xs font-medium text-slate-300">Vector Crown Stroke</span>
            </div>

            {/* SVG 2: Sparkle Burst */}
            <div className="p-6 rounded-2xl bg-[#050609] border border-white/10 flex flex-col items-center justify-center text-center min-h-[180px]">
              <svg key={`star-${svgPathKey}`} className="w-20 h-20 text-cyan-400 mb-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <path
                  d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M20 80 L80 20"
                  className="[stroke-dasharray:400] [stroke-dashoffset:400] animate-[dashOffset_1.8s_ease-in-out_0.2s_forwards]"
                />
              </svg>
              <span className="text-xs font-medium text-slate-300">Vector Sparkle Grid</span>
            </div>

            {/* SVG 3: Hand-Drawn Heart/Spiral */}
            <div className="p-6 rounded-2xl bg-[#050609] border border-white/10 flex flex-col items-center justify-center text-center min-h-[180px]">
              <svg key={`spiral-${svgPathKey}`} className="w-20 h-20 text-purple-400 mb-3" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                <path
                  d="M50 50 m-35 0 a35 35 0 1 0 70 0 a35 35 0 1 0 -70 0 m10 0 a25 25 0 1 0 50 0 a25 25 0 1 0 -50 0"
                  className="[stroke-dasharray:600] [stroke-dashoffset:600] animate-[dashOffset_2.5s_ease-in-out_0.4s_forwards]"
                />
              </svg>
              <span className="text-xs font-medium text-slate-300">Vector Spiral Loop</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

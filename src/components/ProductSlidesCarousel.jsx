import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import rough from 'roughjs';
import { ChevronLeft, ChevronRight, Play, Pause, Cpu, Monitor, BatteryCharging, Cable, Sparkles, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ProductSlidesCarousel({ theme = 'dark' }) {
  const pinSectionRef = useRef(null);
  const trackRef = useRef(null);
  const canvasRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDark = theme === 'dark';

  const slides = [
    {
      id: 0,
      category: 'Multimodal LLM Architecture',
      icon: Cpu,
      title: 'Reasoning Power.',
      titleHighlight: 'Unrivaled.',
      annotationType: 'highlight',
      annotationColor: isDark ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.25)',
      desc: 'Autonomous agentic workflows, structured function calling, and multi-step reasoning capabilities.',
      stat: '1.5 Trillion',
      statDesc: 'Tokens Processed / Day',
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#0071e3]/40' : 'border-[#0071e3]/30'
    },
    {
      id: 1,
      category: 'Generative Canvas & Doodles',
      icon: Layers,
      title: 'Vector Vision.',
      titleHighlight: 'Sketch Redefined.',
      annotationType: 'circle',
      annotationColor: isDark ? '#2fd8d8' : '#00a8a8',
      desc: 'Real-time hand-drawn vector graphics, interactive Rough Notation highlights, and dynamic 120Hz canvas animation.',
      stat: '120Hz',
      statDesc: 'ProMotion Interactive Canvas',
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#2fd8d8]/40' : 'border-[#00a8a8]/30'
    },
    {
      id: 2,
      category: 'Real-Time Latency & Efficiency',
      icon: BatteryCharging,
      title: 'Sub-100ms Streaming.',
      titleHighlight: 'All-Day Speed.',
      annotationType: 'underline',
      annotationColor: isDark ? '#f5a623' : '#d97706',
      desc: 'Low-latency SSE token streaming, efficient memory caching, and zero thermal throttling under full load.',
      stat: '24 Hours',
      statDesc: 'Continuous Model Serving',
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#f5a623]/40' : 'border-[#d97706]/30'
    },
    {
      id: 3,
      category: 'AI Tooling & Integration',
      icon: Cable,
      title: 'Plug In.',
      titleHighlight: 'Scale Out.',
      annotationType: 'box',
      annotationColor: isDark ? '#2997ff' : '#0071e3',
      desc: 'Direct integration with Gemini 1.5/2.0, OpenAI, Anthropic, LangChain, and custom vector store RAG pipelines.',
      stat: '100+ Tools',
      statDesc: 'Unified Agent API Mesh',
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#2997ff]/40' : 'border-[#0071e3]/30'
    },
    {
      id: 4,
      category: 'On-Device AI Privacy',
      icon: Sparkles,
      title: 'Intelligence Built In.',
      titleHighlight: 'Privacy Kept In.',
      annotationType: 'bracket',
      annotationColor: isDark ? '#30d158' : '#16a34a',
      desc: 'Local vector database embeddings, local WebGPU model execution, and privacy-first confidential data processing.',
      stat: '100% On-Device',
      statDesc: 'Privacy-First Confidential AI',
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#30d158]/40' : 'border-[#16a34a]/30'
    }
  ];

  // GSAP ScrollTrigger Pinned Horizontal Scrub Animation (Apple Style)
  useGSAP(() => {
    if (!pinSectionRef.current || !trackRef.current) return;

    const totalSlides = slides.length;
    const targetXPercent = -((totalSlides - 1) / totalSlides) * 100;

    const tween = gsap.to(trackRef.current, {
      xPercent: targetXPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: pinSectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: `+=${window.innerHeight * (totalSlides - 1)}`,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(Math.round(progress * 100));
          const index = Math.min(
            Math.floor(progress * totalSlides),
            totalSlides - 1
          );
          setActiveSlide(index);
        }
      }
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };

  }, { scope: pinSectionRef, dependencies: [slides.length] });

  // Render RoughJS Vector Canvas Sketches for Each Slide
  useEffect(() => {
    slides.forEach((slide, idx) => {
      const canvas = canvasRefs.current[idx];
      if (!canvas) return;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const strokeColor = slide.annotationColor;
      const fillStyle = isDark ? '#1c1c1e' : '#ffffff';

      if (idx === 0) {
        // Slide 1: Neural Mesh Architecture
        rc.rectangle(20, 20, 320, 200, { fill: fillStyle, roughness: 1.5, stroke: strokeColor });
        rc.circle(180, 120, 90, { fill: strokeColor, fillStyle: 'hachure', stroke: strokeColor });
        rc.line(60, 60, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
        rc.line(300, 60, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
        rc.line(60, 180, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
        rc.line(300, 180, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
      } else if (idx === 1) {
        // Slide 2: Doodle Vector Circle & Curves
        rc.ellipse(180, 120, 220, 140, { stroke: strokeColor, strokeWidth: 3, roughness: 2 });
        rc.linearPath([[40, 160], [120, 80], [200, 160], [280, 80], [320, 140]], { stroke: strokeColor, strokeWidth: 2.5 });
      } else if (idx === 2) {
        // Slide 3: Low-Latency Timeline Spectrum
        for (let i = 0; i < 12; i++) {
          const height = Math.sin(i * 0.6) * 60 + 80;
          rc.rectangle(40 + i * 24, 180 - height, 16, height, { fill: strokeColor, stroke: strokeColor, roughness: 1.2 });
        }
      } else if (idx === 3) {
        // Slide 4: Tool Integration Grid
        rc.rectangle(40, 40, 120, 70, { fill: strokeColor, fillStyle: 'cross-hatch', stroke: strokeColor });
        rc.rectangle(200, 40, 120, 70, { stroke: strokeColor, roughness: 1.8 });
        rc.rectangle(40, 130, 120, 70, { stroke: strokeColor, roughness: 1.8 });
        rc.rectangle(200, 130, 120, 70, { fill: strokeColor, fillStyle: 'dots', stroke: strokeColor });
      } else if (idx === 4) {
        // Slide 5: On-Device Shield Vault
        rc.polygon([[180, 30], [280, 70], [280, 160], [180, 210], [80, 160], [80, 70]], {
          stroke: strokeColor,
          strokeWidth: 3,
          fill: strokeColor,
          fillStyle: 'zigzag'
        });
      }
    });
  }, [activeSlide, isDark]);

  const jumpToSlide = (index) => {
    if (!pinSectionRef.current) return;
    const totalSlides = slides.length;
    const scrollDistance = window.innerHeight * (totalSlides - 1);
    const targetScroll = pinSectionRef.current.offsetTop + (index / (totalSlides - 1)) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const triggerSlideBlast = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section 
      ref={pinSectionRef} 
      id="projects" 
      className={`relative transition-colors duration-500 overflow-hidden ${
        isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
      }`}
    >
      {/* Sticky Viewport Container */}
      <div className="h-screen sticky top-0 flex flex-col justify-between py-12 overflow-hidden">
        
        {/* Top Section Header (Apple Style) */}
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between z-20">
          <div>
            <span className="text-xs font-mono text-[#0071e3] uppercase tracking-widest block mb-1">
              Scroll-Driven Highlights
            </span>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
              isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
            }`}>
              Get the highlights. <span className={`font-light text-base sm:text-xl ml-2 ${
                isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
              }`}>Scroll to explore.</span>
            </h2>
          </div>

          {/* Slide Indicator Dots */}
          <div className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border transition-colors ${
            isDark 
              ? 'bg-[#161617]/90 border-[#2c2c2e]' 
              : 'bg-[#ffffff]/90 border-[#d2d2d7] shadow-sm'
          }`}>
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeSlide === idx
                    ? 'w-8 h-2.5 bg-[#0071e3] shadow-md shadow-[#0071e3]/40'
                    : isDark ? 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40' : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/40'
                }`}
                title={`Jump to Slide ${idx + 1}: ${s.category}`}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Track (Width = 500% for 5 slides) */}
        <div 
          ref={trackRef} 
          className="flex flex-nowrap w-[500%] h-full items-center my-auto z-10 will-change-transform"
        >
          {slides.map((slide, idx) => {
            const IconComponent = slide.icon;
            return (
              <div 
                key={slide.id}
                className="w-screen shrink-0 px-6 sm:px-12 max-w-6xl mx-auto"
              >
                <div className={`apple-glass-card rounded-3xl p-8 md:p-12 border ${slide.borderColor} bg-gradient-to-br ${slide.gradient} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px] shadow-2xl relative overflow-hidden`}>
                  
                  {/* Left Column: Title & Text (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border ${
                        isDark 
                          ? 'bg-[#2c2c2e]/60 border-white/10 text-[#f5f5f7]' 
                          : 'bg-[#ffffff]/80 border-slate-300 text-[#1d1d1f] shadow-sm'
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" style={{ color: slide.annotationColor }} />
                        <span>Slide {slide.id + 1} of 5 • {slide.category}</span>
                      </div>

                      <h3 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 ${
                        isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                      }`}>
                        {slide.title}{' '}
                        <RoughAnnotation
                          type={slide.annotationType}
                          color={slide.annotationColor}
                          show={true}
                          strokeWidth={3}
                          animationDuration={900}
                        >
                          <span className={`px-1 ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}`}>{slide.titleHighlight}</span>
                        </RoughAnnotation>
                      </h3>

                      <p className={`text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl ${
                        isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                      }`}>
                        {slide.desc}
                      </p>
                    </div>

                    {/* Stat Footnote */}
                    <div className={`pt-6 border-t flex items-center justify-between ${
                      isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
                    }`}>
                      <div>
                        <span className={`block text-3xl font-extrabold font-mono tracking-tight ${
                          isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                        }`}>
                          {slide.stat}
                        </span>
                        <span className={`text-xs font-medium ${
                          isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                        }`}>
                          {slide.statDesc}
                        </span>
                      </div>

                      <button
                        onClick={triggerSlideBlast}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer ${
                          isDark
                            ? 'bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#f5f5f7] border-white/10'
                            : 'bg-[#ffffff] hover:bg-[#e8e8ed] text-[#1d1d1f] border-[#d2d2d7] shadow-sm'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                        <span>Sparkle</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: RoughJS Canvas Display (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className={`w-full rounded-2xl border p-4 flex items-center justify-center min-h-[240px] relative overflow-hidden shadow-inner ${
                      isDark 
                        ? 'bg-[#000000] border-[#2c2c2e]' 
                        : 'bg-[#ffffff] border-[#d2d2d7]'
                    }`}>
                      <canvas
                        ref={(el) => (canvasRefs.current[idx] = el)}
                        width={360}
                        height={240}
                        className="w-full h-[240px] object-contain"
                      />
                      <div className={`absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isDark 
                          ? 'text-[#86868b] bg-[#161617] border-[#2c2c2e]' 
                          : 'text-[#6e6e73] bg-[#f5f5f7] border-[#d2d2d7]'
                      }`}>
                        RoughJS Canvas #{idx + 1}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pinned Progress Bar */}
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between z-20">
          <div className={`flex items-center gap-2 text-xs font-mono ${
            isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
          }`}>
            <span>Scroll Scrub Progress:</span>
            <div className={`w-32 h-1.5 rounded-full overflow-hidden ${
              isDark ? 'bg-[#2c2c2e]' : 'bg-[#e8e8ed]'
            }`}>
              <div
                className="h-full bg-[#0071e3] transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className={`font-bold ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}`}>{scrollProgress}%</span>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono ${
            isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
          }`}>
            <span>Slide {activeSlide + 1} / 5</span>
          </div>
        </div>

      </div>
    </section>
  );
}

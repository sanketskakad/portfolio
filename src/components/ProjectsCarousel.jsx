import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import rough from 'roughjs';
import { Cpu, ArrowUpRight, Bot, FileText } from 'lucide-react';
import RoughAnnotation from './RoughAnnotation';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export default function ProjectsCarousel({ theme = 'dark' }) {
  const pinSectionRef = useRef(null);
  const trackRef = useRef(null);
  const usaCanvasRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDark = theme === 'dark';

  const projects = [

    {
      id: 'multipdf-chatbot',
      category: 'Production RAG & Vector Engine',
      icon: FileText,
      title: 'Advanced Multi-PDF Chatbot',
      titleHighlight: 'Groq Llama 3.1 RAG.',
      url: 'https://sanket-kakad-multi-pdf-advanced-rag.vercel.app/',
      githubUrl: 'https://github.com/sanketskakad/multipdf-chatbot',
      videoUrl: 'https://www.youtube.com/embed/bh_6XDT8_zY?autoplay=1&loop=1&playlist=bh_6XDT8_zY&mute=1&controls=0&playsinline=1&rel=0',
      annotationType: 'highlight',
      annotationColor: isDark ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.25)',
      desc: 'Sub-second, production-grade RAG engine with pre-cached vector indexing, page-aware chunking, hybrid BM25 + dense retrieval, FlashRank re-ranking, and Groq Llama 3.1 8B instant inference.',
      stat: 'Live on Vercel',
      statDesc: 'Production Multi-PDF RAG',
      tech: ['Python', 'FastAPI', 'Groq Llama 3.1', 'ChromaDB', 'BM25 RAG', 'React', 'Vercel'],
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#0071e3]/40' : 'border-[#0071e3]/30',
      mediaType: 'video'
    },
    {
      id: 'agentic-travel-booking',
      category: 'Multi-Agent Autonomous AI App',
      icon: Bot,
      title: 'Agentic Travel Booking',
      titleHighlight: 'Multi-Agent System.',
      url: 'https://sanket-kakad-agentic-travel-booking.vercel.app/',
      githubUrl: 'https://github.com/sanketskakad/agentic-travel-booking-app',
      videoUrl: 'https://www.youtube.com/embed/Jc2GhSvd-_w?autoplay=1&loop=1&playlist=Jc2GhSvd-_w&mute=1&controls=0&playsinline=1&rel=0',
      annotationType: 'highlight',
      annotationColor: isDark ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.25)',
      desc: 'Autonomous multi-agent travel orchestration system. Executes flight, hotel, and activity search, generates customized itineraries, and orchestrates live booking workflows in real-time.',
      stat: 'Live on Render',
      statDesc: 'Production Multi-Agent App',
      tech: ['Python', 'FastAPI', 'React', 'Multi-Agent Workflows', 'Docker', 'Render'],
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#0071e3]/40' : 'border-[#0071e3]/30',
      mediaType: 'video'
    },
    {
      id: 'usa-constitution-gpt',
      category: 'Generative AI & Hugging Face Space',
      icon: Cpu,
      title: 'USA Constitution GPT',
      titleHighlight: 'Legal RAG Engine.',
      url: 'https://huggingface.co/spaces/SANKETKAKAD/usa-constitution-gpt',
      githubUrl: null,
      annotationType: 'highlight',
      annotationColor: isDark ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.25)',
      desc: 'Conversational AI assistant trained for US Constitutional law querying, precise article citation extraction, and legal document Q&A.',
      stat: 'Hugging Face Space',
      statDesc: 'Live Model Deployment',
      tech: ['Hugging Face', 'Python', 'LangChain', 'Gradio'],
      gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
      borderColor: isDark ? 'border-[#0071e3]/40' : 'border-[#0071e3]/30',
      mediaType: 'canvas'
    }
  ];

  // GSAP ScrollTrigger Pinned Horizontal Scrub Animation (Apple Style)
  useGSAP(() => {
    if (!pinSectionRef.current || !trackRef.current) return;

    const totalSlides = projects.length;
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
  }, { scope: pinSectionRef, dependencies: [projects.length] });

  // Render RoughJS Vector Canvas Sketch for USA Constitution GPT
  useEffect(() => {
    const canvas = usaCanvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokeColor = isDark ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.25)';
    const fillStyle = isDark ? '#1c1c1e' : '#ffffff';

    rc.rectangle(20, 20, 320, 200, { fill: fillStyle, roughness: 1.5, stroke: strokeColor });
    rc.circle(180, 120, 90, { fill: strokeColor, fillStyle: 'hachure', stroke: strokeColor });
    rc.line(60, 60, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
    rc.line(300, 60, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
  }, [isDark, activeSlide]);

  const jumpToSlide = (index) => {
    if (!pinSectionRef.current) return;
    const totalSlides = projects.length;
    const scrollDistance = window.innerHeight * (totalSlides - 1);
    const targetScroll = pinSectionRef.current.offsetTop + (index / (totalSlides - 1)) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={pinSectionRef}
      id="projects"
      className={`relative transition-colors duration-500 overflow-hidden ${isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
        }`}
    >
      {/* Sticky Viewport Container */}
      <div className="h-screen sticky top-0 flex flex-col justify-between py-12 overflow-hidden">

        {/* Top Header */}
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between z-20">
          <div>
            <span className="text-xs font-mono text-[#0071e3] uppercase tracking-widest block mb-1">
              Featured Live Projects
            </span>
            <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
              }`}>
              Production AI Architecture.{' '}
              <span className={`font-light text-base sm:text-xl ml-2 ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                }`}>Scroll to explore.</span>
            </h2>
          </div>

          {/* Slide Indicator Dots */}
          <div className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border transition-colors ${isDark
            ? 'bg-[#161617]/90 border-[#2c2c2e]'
            : 'bg-[#ffffff]/90 border-[#d2d2d7] shadow-sm'
            }`}>
            {projects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => jumpToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${activeSlide === idx
                  ? 'w-8 h-2.5 bg-[#0071e3] shadow-md shadow-[#0071e3]/40'
                  : isDark ? 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40' : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/40'
                  }`}
                title={`Jump to Project ${idx + 1}: ${p.title}`}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          style={{ width: `${projects.length * 100}%` }}
          className="flex flex-nowrap h-full items-center my-auto z-10 will-change-transform"
        >
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="w-screen shrink-0 px-6 sm:px-12 max-w-6xl mx-auto"
              >
                <div className={`apple-glass-card rounded-3xl p-8 md:p-12 border ${project.borderColor} bg-gradient-to-br ${project.gradient} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px] shadow-2xl relative overflow-hidden`}>

                  {/* Left Column: Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border ${isDark ? 'bg-[#2c2c2e]/60 border-white/10 text-[#f5f5f7]' : 'bg-[#ffffff]/80 border-slate-300 text-[#1d1d1f] shadow-sm'
                        }`}>
                        <Icon className="w-3.5 h-3.5 text-[#0071e3]" />
                        <span>Project {idx + 1} of {projects.length} • {project.category}</span>
                      </div>

                      <h3 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                        }`}>
                        {project.title}{' '}
                        <RoughAnnotation
                          type={project.annotationType}
                          color={project.annotationColor}
                          show={true}
                          strokeWidth={3}
                        >
                          <span className={`px-1 ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}`}>{project.titleHighlight}</span>
                        </RoughAnnotation>
                      </h3>

                      <p className={`text-base md:text-lg font-light leading-relaxed mb-6 max-w-xl ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                        }`}>
                        {project.desc}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${isDark ? 'bg-[#2c2c2e] border-white/10 text-[#2997ff]' : 'bg-[#ffffff] border-[#d2d2d7] text-[#0071e3]'
                              }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stat Footnote & Action Buttons */}
                    <div className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
                      }`}>
                      <div>
                        <span className={`block text-2xl font-extrabold font-mono tracking-tight ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                          }`}>
                          {project.stat}
                        </span>
                        <span className={`text-xs font-medium ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                          }`}>
                          {project.statDesc}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 ${isDark
                              ? 'bg-[#2c2c2e] hover:bg-[#3a3a3c] text-[#f5f5f7] border-white/10 hover:border-white/20'
                              : 'bg-white hover:bg-slate-100 text-[#1d1d1f] border-slate-300 shadow-sm'
                              }`}
                          >
                            <GithubIcon className="w-4 h-4 text-[#0071e3]" />
                            <span>GitHub</span>
                          </a>
                        )}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 bg-[#0071e3] hover:bg-[#0077ed] text-white border-[#0071e3] shadow-md shadow-[#0071e3]/30"
                        >
                          <span>{project.githubUrl ? 'Open Live App' : 'Open Live Space'}</span>
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Media Display */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    {project.mediaType === 'video' ? (
                      <div className={`w-full aspect-video rounded-2xl border relative overflow-hidden shadow-inner ${isDark ? 'bg-black border-[#2c2c2e]' : 'bg-slate-900 border-[#d2d2d7]'
                        }`}>
                        <iframe
                          src={project.videoUrl}
                          title={`${project.title} Video Preview`}
                          className="w-full h-full border-0 object-cover"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                        <div className={`absolute top-3 right-3 text-[10px] font-mono px-2.5 py-1 rounded-full border flex items-center gap-1.5 backdrop-blur-md ${isDark ? 'text-[#f5f5f7] bg-[#161617]/80 border-white/10' : 'text-[#1d1d1f] bg-[#ffffff]/80 border-slate-300 shadow-sm'
                          }`}>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="font-semibold tracking-wide">Live Demo Video</span>
                        </div>
                      </div>
                    ) : (
                      <div className={`w-full rounded-2xl border p-4 flex items-center justify-center min-h-[240px] relative overflow-hidden shadow-inner ${isDark ? 'bg-[#000000] border-[#2c2c2e]' : 'bg-[#ffffff] border-[#d2d2d7]'
                        }`}>
                        <canvas
                          ref={usaCanvasRef}
                          width={360}
                          height={240}
                          className="w-full h-[240px] object-contain"
                        />
                        <div className={`absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded border ${isDark ? 'text-[#86868b] bg-[#161617] border-[#2c2c2e]' : 'text-[#6e6e73] bg-[#f5f5f7] border-[#d2d2d7]'
                          }`}>
                          Hugging Face Vector Architecture
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Progress Bar */}
        <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between z-20">
          <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
            }`}>
            <span>Scroll Scrub Progress:</span>
            <div className={`w-32 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#2c2c2e]' : 'bg-[#e8e8ed]'
              }`}>
              <div
                className="h-full bg-[#0071e3] transition-all duration-75"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <span className={`font-bold ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}`}>{scrollProgress}%</span>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
            }`}>
            <span>Project {activeSlide + 1} / {projects.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

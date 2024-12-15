import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import rough from 'roughjs';
import { Cpu, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsCarousel({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const isDark = theme === 'dark';

  const project = {
    id: 0,
    category: 'Generative AI & Hugging Face Space',
    icon: Cpu,
    title: 'USA Constitution GPT',
    titleHighlight: 'Legal RAG Engine.',
    url: 'https://huggingface.co/spaces/SANKETKAKAD/usa-constitution-gpt',
    annotationType: 'highlight',
    annotationColor: isDark ? 'rgba(0, 113, 227, 0.4)' : 'rgba(0, 113, 227, 0.25)',
    desc: 'Conversational AI assistant trained for US Constitutional law querying, precise article citation extraction, and legal document Q&A.',
    stat: 'Hugging Face Space',
    statDesc: 'Live Model Deployment',
    tech: ['Hugging Face', 'Python', 'LangChain', 'Gradio'],
    gradient: isDark ? 'from-[#1c1c1e] via-[#161617] to-[#000000]' : 'from-[#ffffff] via-[#f5f5f7] to-[#e8e8ed]',
    borderColor: isDark ? 'border-[#0071e3]/40' : 'border-[#0071e3]/30'
  };

  // Render RoughJS Vector Canvas Sketch for USA Constitution GPT
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokeColor = project.annotationColor;
    const fillStyle = isDark ? '#1c1c1e' : '#ffffff';

    rc.rectangle(20, 20, 320, 200, { fill: fillStyle, roughness: 1.5, stroke: strokeColor });
    rc.circle(180, 120, 90, { fill: strokeColor, fillStyle: 'hachure', stroke: strokeColor });
    rc.line(60, 60, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
    rc.line(300, 60, 180, 120, { stroke: strokeColor, strokeWidth: 2 });
  }, [isDark, project.annotationColor]);

  const Icon = project.icon;

  return (
    <section 
      id="projects" 
      className={`relative transition-colors duration-500 py-24 overflow-hidden ${
        isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-[#0071e3] uppercase tracking-widest block mb-1">
            Featured Live Project
          </span>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${
            isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
          }`}>
            Production AI Architecture
          </h2>
        </div>

        {/* Featured Project Card */}
        <div className={`apple-glass-card rounded-3xl p-8 md:p-12 border ${project.borderColor} bg-gradient-to-br ${project.gradient} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden`}>
          
          {/* Left Column: Title & Text */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border ${
                isDark ? 'bg-[#2c2c2e]/60 border-white/10 text-[#f5f5f7]' : 'bg-[#ffffff]/80 border-slate-300 text-[#1d1d1f] shadow-sm'
              }`}>
                <Icon className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>Live Project • {project.category}</span>
              </div>

              <h3 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6 ${
                isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
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

              <p className={`text-base md:text-lg font-light leading-relaxed mb-6 max-w-xl ${
                isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
              }`}>
                {project.desc}
              </p>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, tIdx) => (
                  <span 
                    key={tIdx} 
                    className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${
                      isDark ? 'bg-[#2c2c2e] border-white/10 text-[#2997ff]' : 'bg-[#ffffff] border-[#d2d2d7] text-[#0071e3]'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat Footnote & Action Button */}
            <div className={`pt-6 border-t flex items-center justify-between ${
              isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
            }`}>
              <div>
                <span className={`block text-2xl font-extrabold font-mono tracking-tight ${
                  isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                }`}>
                  {project.stat}
                </span>
                <span className={`text-xs font-medium ${
                  isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                }`}>
                  {project.statDesc}
                </span>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 cursor-pointer active:scale-95 bg-[#0071e3] hover:bg-[#0077ed] text-white border-[#0071e3] shadow-md shadow-[#0071e3]/30"
              >
                <span>Open Live Space</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Right Column: RoughJS Canvas Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className={`w-full rounded-2xl border p-4 flex items-center justify-center min-h-[240px] relative overflow-hidden shadow-inner ${
              isDark ? 'bg-[#000000] border-[#2c2c2e]' : 'bg-[#ffffff] border-[#d2d2d7]'
            }`}>
              <canvas
                ref={canvasRef}
                width={360}
                height={240}
                className="w-full h-[240px] object-contain"
              />
              <div className={`absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded border ${
                isDark ? 'text-[#86868b] bg-[#161617] border-[#2c2c2e]' : 'text-[#6e6e73] bg-[#f5f5f7] border-[#d2d2d7]'
              }`}>
                Hugging Face Vector Architecture
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

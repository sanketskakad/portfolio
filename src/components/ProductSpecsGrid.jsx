import React from 'react';
import { Cpu, Zap, ShieldCheck, Sliders, Layers } from 'lucide-react';
import RoughAnnotation from './RoughAnnotation';

export default function ProductSpecsGrid({ theme = 'dark' }) {
  const isDark = theme === 'dark';

  const specs = [
    {
      category: 'Neural Compute',
      icon: Cpu,
      title: 'LLM Orchestration Engine',
      desc: 'Multi-model agent router with dynamic prompt optimization, function calling, and structured JSON output schema validation.',
      stat: 'Multi-Agent',
      statLabel: 'Autonomous Execution Mesh',
      color: isDark ? 'from-[#1c1c1e] to-[#161617] border-[#2c2c2e]' : 'from-[#ffffff] to-[#f5f5f7] border-[#d2d2d7] shadow-lg shadow-slate-200/50'
    },
    {
      category: 'Real-Time Streaming',
      icon: Zap,
      title: 'Low-Latency SSE Pipeline',
      desc: 'Sub-100ms server-sent event token streaming engine with adaptive backpressure handling and instant client hydration.',
      stat: '< 100ms',
      statLabel: 'First Token Latency',
      color: isDark ? 'from-[#1c1c1e] to-[#161617] border-[#2c2c2e]' : 'from-[#ffffff] to-[#f5f5f7] border-[#d2d2d7] shadow-lg shadow-slate-200/50'
    },
    {
      category: 'Security & Privacy',
      icon: ShieldCheck,
      title: 'Confidential Local Vector Store',
      desc: 'Private vector embeddings stored on-device using HNSW indexing and local WebGPU model execution.',
      stat: '100% Private',
      statLabel: 'Zero Third-Party Data Leak',
      color: isDark ? 'from-[#1c1c1e] to-[#161617] border-[#2c2c2e]' : 'from-[#ffffff] to-[#f5f5f7] border-[#d2d2d7] shadow-lg shadow-slate-200/50'
    },
    {
      category: 'Vector Graphics',
      icon: Layers,
      title: 'Dynamic Doodle Canvas Engine',
      desc: 'Custom RoughJS vector renderer integrated with GSAP ScrollTrigger timelines for hardware-accelerated 120 FPS sketch rendering.',
      stat: '120 FPS',
      statLabel: 'Hardware Vector Render',
      color: isDark ? 'from-[#1c1c1e] to-[#161617] border-[#2c2c2e]' : 'from-[#ffffff] to-[#f5f5f7] border-[#d2d2d7] shadow-lg shadow-slate-200/50'
    }
  ];

  return (
    <section id="specs" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
    }`}>
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border transition-colors ${
            isDark 
              ? 'bg-[#161617] border-[#2c2c2e] text-[#2997ff]' 
              : 'bg-[#ffffff] border-[#d2d2d7] text-[#0071e3] shadow-sm'
          }`}>
            <Sliders className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Engine Specifications</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${
            isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
          }`}>
            Engineered Like No Other
          </h2>
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
          }`}>
            Discover the technical specifications powering Sanket Kakad's Generative AI architecture.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`apple-glass-card rounded-3xl p-8 border bg-gradient-to-br ${item.color} relative overflow-hidden group hover:scale-[1.01] transition-all duration-300`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-[#2c2c2e] text-[#0071e3] border-white/10' : 'bg-[#e8e8ed] text-[#0071e3] border-[#d2d2d7]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
                    isDark ? 'bg-[#161617] border-[#2c2c2e] text-[#86868b]' : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#6e6e73]'
                  }`}>
                    {item.category}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                  isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed font-light mb-8 ${
                  isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                }`}>
                  {item.desc}
                </p>

                {/* Stat Footnote */}
                <div className={`pt-6 border-t flex items-end justify-between ${
                  isDark ? 'border-[#2c2c2e]' : 'border-[#d2d2d7]'
                }`}>
                  <div>
                    <span className={`block text-3xl font-extrabold tracking-tight font-mono ${
                      isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                    }`}>
                      {item.stat}
                    </span>
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                    }`}>
                      {item.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Architecture Quote Box */}
        <div className={`rounded-3xl p-8 md:p-12 border text-center relative overflow-hidden transition-colors ${
          isDark 
            ? 'bg-[#161617] border-[#2c2c2e] text-[#f5f5f7]' 
            : 'bg-[#ffffff] border-[#d2d2d7] text-[#1d1d1f] shadow-lg shadow-slate-200/50'
        }`}>
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#0071e3] uppercase tracking-widest block mb-4">
              Architecture Philosophy
            </span>
            <blockquote className="text-xl md:text-3xl font-medium leading-snug mb-6">
              “Motion shouldn’t just be fast. It should feel{' '}
              <RoughAnnotation
                type="underline"
                color="#0071e3"
                show={true}
                strokeWidth={3}
              >
                <span className="text-[#0071e3] font-bold">tactile and alive</span>
              </RoughAnnotation>{' '}
              like a hand drawing directly on digital glass.”
            </blockquote>
            <span className={`text-xs font-medium ${
              isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
            }`}>
              Sanket Kakad Engineering Principles
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

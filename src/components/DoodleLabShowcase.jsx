import React, { useState, useEffect, useRef } from 'react';
import rough from 'roughjs';
import { Palette, RotateCcw, PenTool, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import RoughAnnotation from './RoughAnnotation';

export default function DoodleLabShowcase({ annotationsEnabled }) {
  // Canvas Sketch State
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('wireframe');
  const [roughness, setRoughness] = useState(2.0);
  const [strokeColor, setStrokeColor] = useState('#a855f7');
  const [fillColor, setFillColor] = useState('rgba(168, 85, 247, 0.15)');

  // Annotation Studio State
  const [studioType, setStudioType] = useState('box');
  const [studioColor, setStudioColor] = useState('#06b6d4');
  const [animDuration, setAnimDuration] = useState(800);
  const [iterations, setIterations] = useState(2);

  // Redraw Canvas when settings/tool change
  const drawSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);

    const options = {
      roughness: Number(roughness),
      stroke: strokeColor,
      strokeWidth: 2.5,
      fill: fillColor,
      fillStyle: 'hachure', // 'hachure', 'solid', 'zigzag', 'cross-hatch'
      fillWeight: 1.5,
    };

    if (selectedTool === 'rectangle') {
      rc.rectangle(40, 40, canvas.width - 80, canvas.height - 80, options);
    } else if (selectedTool === 'circle') {
      const radius = Math.min(canvas.width, canvas.height) / 2 - 40;
      rc.circle(canvas.width / 2, canvas.height / 2, radius * 2, options);
    } else if (selectedTool === 'wireframe') {
      // Draw wireframe UI card
      const w = canvas.width;
      const h = canvas.height;
      
      // Card Container
      rc.rectangle(30, 30, w - 60, h - 60, { ...options, fill: 'rgba(255, 255, 255, 0.02)' });
      // Header bar
      rc.rectangle(45, 45, w - 90, 40, { stroke: strokeColor, roughness: Number(roughness) });
      // Inner Circle Icon
      rc.circle(75, 65, 20, { stroke: '#06b6d4', fill: 'rgba(6, 182, 212, 0.2)', roughness: Number(roughness) });
      // Text lines
      rc.line(100, 60, w - 70, 60, { stroke: '#cbd5e1', roughness: Number(roughness) });
      rc.line(100, 70, w - 120, 70, { stroke: '#94a3b8', roughness: Number(roughness) });
      
      // Feature Grid Columns
      const colWidth = (w - 110) / 2;
      rc.rectangle(45, 100, colWidth, h - 145, { stroke: '#f59e0b', roughness: Number(roughness), fill: 'rgba(245, 158, 11, 0.1)' });
      rc.rectangle(60 + colWidth, 100, colWidth, h - 145, { stroke: '#ec4899', roughness: Number(roughness), fill: 'rgba(236, 72, 153, 0.1)' });
      
      // Decorative Hand-Drawn Arrow
      rc.curve([
        [w - 100, h - 60],
        [w - 60, h - 80],
        [w - 40, h - 40]
      ], { stroke: '#a855f7', strokeWidth: 3, roughness: Number(roughness) });
    } else if (selectedTool === 'star') {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const points = [];
      const outerR = Math.min(cx, cy) - 50;
      const innerR = outerR / 2.2;
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
      }
      rc.polygon(points, options);
    } else if (selectedTool === 'arrow') {
      const w = canvas.width;
      const h = canvas.height;
      rc.linearPath([
        [50, h / 2],
        [w - 100, h / 2],
        [w - 120, h / 2 - 30],
        [w - 70, h / 2],
        [w - 120, h / 2 + 30]
      ], { stroke: strokeColor, strokeWidth: 4, roughness: Number(roughness) });
    }
  };

  useEffect(() => {
    drawSketch();
  }, [selectedTool, roughness, strokeColor, fillColor]);

  const palette = [
    { stroke: '#a855f7', fill: 'rgba(168, 85, 247, 0.15)', name: 'Purple' },
    { stroke: '#06b6d4', fill: 'rgba(6, 182, 212, 0.15)', name: 'Cyan' },
    { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.15)', name: 'Amber' },
    { stroke: '#ec4899', fill: 'rgba(236, 72, 153, 0.15)', name: 'Rose' },
    { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.15)', name: 'Emerald' }
  ];

  return (
    <section id="doodle-lab" className="py-24 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <PenTool className="w-3.5 h-3.5" />
            <span>Interactive Vector Sketching</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Doodle Lab & Annotation Engine
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Generate vector sketch primitives on canvas with RoughJS and annotate copy live with hand-drawn highlights.
          </p>
        </div>

        {/* 2-Column Grid: RoughJS Canvas + Rough Notation Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: RoughJS Canvas Playground */}
          <div className="apple-glass-card rounded-3xl p-6 flex flex-col border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-semibold text-base">RoughJS Canvas Renderer</h3>
              </div>
              <button
                onClick={drawSketch}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Re-draw sketch with new randomized strokes"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-sketch</span>
              </button>
            </div>

            {/* Canvas Display */}
            <div className="relative bg-[#050609] rounded-2xl border border-white/10 p-4 mb-6 flex items-center justify-center min-h-[300px] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={480}
                height={300}
                className="w-full h-[300px] object-contain"
              />
            </div>

            {/* Canvas Controls */}
            <div className="flex flex-col gap-4">
              
              {/* Tool Picker */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Vector Sketch Tool:</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: 'wireframe', label: 'UI Wireframe' },
                    { id: 'rectangle', label: 'Box' },
                    { id: 'circle', label: 'Circle' },
                    { id: 'star', label: 'Star' },
                    { id: 'arrow', label: 'Arrow' }
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all ${
                        selectedTool === tool.id
                          ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-lg shadow-purple-950/40'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette & Roughness Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-2 block">Stroke Palette:</label>
                  <div className="flex items-center gap-2">
                    {palette.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => {
                          setStrokeColor(p.stroke);
                          setFillColor(p.fill);
                        }}
                        className={`w-7 h-7 rounded-full transition-transform ${
                          strokeColor === p.stroke ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: p.stroke }}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium mb-1">
                    <span>Sketch Roughness:</span>
                    <span className="text-purple-300 font-mono">{roughness}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.5"
                    value={roughness}
                    onChange={(e) => setRoughness(e.target.value)}
                    className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Rough Notation Studio */}
          <div className="apple-glass-card rounded-3xl p-6 flex flex-col border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-semibold text-base">Rough Notation Annotation Studio</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/30">
                v1.0 Ready
              </span>
            </div>

            {/* Interactive Live Preview Box */}
            <div className="bg-[#050609] rounded-2xl border border-white/10 p-6 mb-6 min-h-[300px] flex flex-col justify-center gap-6">
              
              <div className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed">
                Elevate your web product copy using{' '}
                <RoughAnnotation
                  type={studioType}
                  color={studioColor}
                  show={annotationsEnabled}
                  strokeWidth={2.5}
                  animationDuration={Number(animDuration)}
                  iterations={Number(iterations)}
                >
                  <span className="font-bold text-white px-1">hand-crafted vector annotations</span>
                </RoughAnnotation>{' '}
                that draw organically directly on the screen.
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Zero SVG Overhead:</span> Annotations calculate geometric paths on the fly and render asynchronously without blocking main thread layout.
                </div>
              </div>

            </div>

            {/* Studio Controls */}
            <div className="flex flex-col gap-4">
              
              {/* Type Switcher */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Annotation Style:</label>
                <div className="grid grid-cols-4 gap-2">
                  {['box', 'circle', 'underline', 'highlight', 'strike-through', 'bracket', 'crossed-off'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setStudioType(t)}
                      className={`py-1.5 text-xs font-medium capitalize rounded-lg border transition-all ${
                        studioType === t
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-950/40'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders: Duration & Iterations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium mb-1">
                    <span>Duration:</span>
                    <span className="text-cyan-300 font-mono">{animDuration}ms</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="2000"
                    step="100"
                    value={animDuration}
                    onChange={(e) => setAnimDuration(e.target.value)}
                    className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium mb-1">
                    <span>Stroke Iterations:</span>
                    <span className="text-cyan-300 font-mono">{iterations}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={iterations}
                    onChange={(e) => setIterations(e.target.value)}
                    className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

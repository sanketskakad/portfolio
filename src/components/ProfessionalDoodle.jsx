import React from 'react';

/**
 * Professional Hand-Drawn Vector Doodle Component
 * Renders a crisp vector sketch sparkle/crown/neural flourish
 */
export default function ProfessionalDoodle({ 
  className = "w-5 h-5 text-[#2997ff]", 
  type = "sparkle" 
}) {
  if (type === "crown") {
    return (
      <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path 
          d="M5 28 L11 12 L19 20 L27 8 L35 28 Z M5 28 L35 28" 
          className="[stroke-dasharray:120] [stroke-dashoffset:0] transition-all hover:stroke-amber-400" 
        />
      </svg>
    );
  }

  if (type === "orbit") {
    return (
      <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <ellipse cx="20" cy="20" rx="16" ry="7" transform="rotate(-25 20 20)" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
        <circle cx="32" cy="14" r="2.5" fill="currentColor" />
      </svg>
    );
  }

  // Default: Professional Hand-Drawn Sparkle Flourish
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 C20 14 26 20 36 20 C26 20 20 26 20 36 C20 26 14 20 4 20 C14 20 20 14 20 4 Z" />
      <circle cx="31" cy="9" r="1.5" fill="currentColor" />
      <circle cx="9" cy="31" r="1.5" fill="currentColor" />
    </svg>
  );
}

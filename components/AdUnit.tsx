
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  type: 'banner' | 'script';
  code: string;
  isDark: boolean;
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, code, isDark, className = "", label = "محتوى مدعوم" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === 'script' && code && containerRef.current) {
      containerRef.current.innerHTML = "";
      const range = document.createRange();
      const documentFragment = range.createContextualFragment(code);
      containerRef.current.appendChild(documentFragment);
    }
  }, [code, type]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center gap-2 mb-2 opacity-20">
        <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
        <span className="text-[7px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div 
        ref={containerRef}
        className={`w-full flex justify-center overflow-hidden rounded-3xl transition-all border ${
          isDark ? 'bg-white/5 border-white/5' : 'bg-zinc-50 border-zinc-100'
        }`}
        style={{ minHeight: type === 'banner' ? 'auto' : '50px' }}
        dangerouslySetInnerHTML={type === 'banner' ? { __html: code } : undefined}
      />
    </div>
  );
};

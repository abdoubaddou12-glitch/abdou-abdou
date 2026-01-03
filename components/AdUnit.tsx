
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  type: 'banner' | 'script';
  code: string;
  isDark: boolean;
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, code, isDark, className = "", label = "مساحة إعلانية" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (code && containerRef.current) {
      containerRef.current.innerHTML = "";
      
      try {
        if (type === 'script') {
          const range = document.createRange();
          const documentFragment = range.createContextualFragment(code);
          containerRef.current.appendChild(documentFragment);
          
          const scripts = containerRef.current.querySelectorAll('script');
          scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach((attr) => {
              const { name, value } = attr as Attr;
              newScript.setAttribute(name, value);
            });
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode?.replaceChild(newScript, oldScript);
          });
        }
      } catch (e) {
        console.error("Ad Injection Error:", e);
      }
    }
  }, [code, type, isDark]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ${className}`}>
      {/* تسمية هادئة جداً وغير ملفتة */}
      <div className="flex items-center gap-2 mb-2 opacity-10">
        <span className="text-[7px] font-black uppercase tracking-[0.5em]">{label}</span>
      </div>
      
      {/* إطار إعلاني منسجم مع تصميم الموقع */}
      <div 
        ref={containerRef}
        className={`w-full flex justify-center overflow-hidden rounded-[2rem] transition-all border ${
          isDark 
            ? 'bg-zinc-900/40 border-white/5 shadow-inner' 
            : 'bg-zinc-50 border-zinc-200/50 shadow-sm'
        }`}
        style={{ minHeight: '100px', display: 'flex', alignItems: 'center' }}
        dangerouslySetInnerHTML={type === 'banner' ? { __html: code } : undefined}
      />
    </div>
  );
};

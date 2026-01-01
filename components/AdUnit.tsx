
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  type: 'banner' | 'script';
  code: string;
  isDark: boolean;
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, code, isDark, className = "", label = "إعلان ممول" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === 'script' && code && containerRef.current) {
      // تنظيف الحاوية قبل الحقن
      containerRef.current.innerHTML = "";
      
      // استخراج السكريبت من الكود المنسوخ
      const range = document.createRange();
      const documentFragment = range.createContextualFragment(code);
      containerRef.current.appendChild(documentFragment);
    }
  }, [code, type]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
      <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-20 mb-2">{label}</span>
      <div 
        ref={containerRef}
        className={`w-full flex justify-center overflow-hidden rounded-2xl transition-all ${
          type === 'banner' ? (isDark ? 'bg-zinc-900/20' : 'bg-gray-50') : ''
        }`}
        dangerouslySetInnerHTML={type === 'banner' ? { __html: code } : undefined}
      />
    </div>
  );
};

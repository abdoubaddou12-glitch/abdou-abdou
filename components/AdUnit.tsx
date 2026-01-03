
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  type: 'banner' | 'script';
  code: string;
  isDark: boolean;
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, code, isDark, className = "", label = "إعلان" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = ""; // تنظيف

    const executeAds = () => {
      // 1. استخراج خيارات Adsterra (atOptions) إن وجدت لتعريفها عالمياً
      const atOptionsMatch = code.match(/atOptions\s*=\s*({[\s\S]*?});/);
      if (atOptionsMatch && atOptionsMatch[1]) {
        try {
          // @ts-ignore
          window.atOptions = new Function(`return ${atOptionsMatch[1]}`)();
        } catch (e) {
          console.error("Adsterra Options Fail:", e);
        }
      }

      // 2. إنشاء محرر DOM مؤقت لتحليل العناصر
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      const elements = Array.from(doc.body.childNodes);

      elements.forEach(node => {
        if (node.nodeName === 'SCRIPT') {
          const oldScript = node as HTMLScriptElement;
          const newScript = document.createElement('script');
          
          // نسخ الخصائص
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // نسخ الكود المضمن
          if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
          }

          // الحقن المباشر في الصفحة
          if (type === 'script') {
            document.head.appendChild(newScript);
          } else {
            container.appendChild(newScript);
          }
        } else {
          // نسخ العناصر العادية (مثل divs أو ins)
          container.appendChild(node.cloneNode(true));
        }
      });

      // 3. دعم Google AdSense المباشر
      if (code.includes('adsbygoogle')) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
      }
    };

    // مهلة قصيرة لضمان استقرار المتصفح قبل الحقن
    const timer = setTimeout(executeAds, 500);
    return () => clearTimeout(timer);
  }, [code, isDark, type]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ${className}`}>
      {label && type === 'banner' && (
        <div className="flex items-center gap-2 mb-2 opacity-20">
          <span className="text-[7px] font-black uppercase tracking-[0.5em]">{label}</span>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className={`w-full flex justify-center overflow-hidden transition-all ${
          type === 'banner' ? 'rounded-[2rem] border min-h-[50px]' : ''
        } ${
          type === 'banner' && isDark 
            ? 'bg-zinc-900/40 border-white/5' 
            : type === 'banner' ? 'bg-zinc-50 border-zinc-200/50 shadow-sm' : ''
        }`}
      />
    </div>
  );
};

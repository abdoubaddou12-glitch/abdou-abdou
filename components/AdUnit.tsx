
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
    container.innerHTML = ""; // تنظيف الحاوية

    // وظيفة الحقن الذكي للسكريبتات
    const executeAds = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      const elements = Array.from(doc.body.childNodes);

      elements.forEach(node => {
        if (node.nodeName === 'SCRIPT') {
          const oldScript = node as HTMLScriptElement;
          const newScript = document.createElement('script');
          
          // نسخ جميع الخصائص
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // معالجة السكريبتات المضمنة (مثل atOptions)
          if (oldScript.innerHTML) {
            // تنفيذ كود الـ JS مباشرة في سياق الصفحة
            try {
              newScript.innerHTML = oldScript.innerHTML;
            } catch (e) {
              console.error("Inline script error", e);
            }
          }

          container.appendChild(newScript);
        } else {
          // نسخ العناصر غير السكريبت (مثل ins أو div)
          container.appendChild(node.cloneNode(true));
        }
      });
      
      // إذا كان إعلان أدسنس، قم بدفع التحديث
      if (code.includes('adsbygoogle')) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {}
      }
    };

    // تنفيذ الحقن بعد مهلة قصيرة لضمان استقرار الـ DOM
    const timer = setTimeout(executeAds, 100);
    return () => clearTimeout(timer);
  }, [code, isDark]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ${className}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2 opacity-10">
          <span className="text-[7px] font-black uppercase tracking-[0.5em]">{label}</span>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className={`w-full flex justify-center overflow-hidden transition-all ${
          type === 'banner' ? 'rounded-[2rem] border min-h-[100px]' : ''
        } ${
          type === 'banner' && isDark 
            ? 'bg-zinc-900/40 border-white/5 shadow-inner' 
            : type === 'banner' ? 'bg-zinc-50 border-zinc-200/50 shadow-sm' : ''
        }`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
    </div>
  );
};

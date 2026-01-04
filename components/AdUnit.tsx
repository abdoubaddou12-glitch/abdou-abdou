
import React, { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  type: 'banner' | 'script';
  code: string;
  isDark: boolean;
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, code, isDark, className = "", label = "إعلان" }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const injectedCodeRef = useRef<string>("");

  useEffect(() => {
    if (!code || !adRef.current || injectedCodeRef.current === code) return;

    const container = adRef.current;
    if (type === 'banner') container.innerHTML = "";

    const inject = () => {
      try {
        const range = document.createRange();
        const fragment = range.createContextualFragment(code);
        const scripts = Array.from(fragment.querySelectorAll('script'));

        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));

          if (oldScript.src) {
            newScript.src = oldScript.src;
            newScript.async = true;
          } else {
            const content = oldScript.textContent || "";
            if (content.includes('atOptions')) {
              (window as any).atOptions = null; // تنظيف قديم
              const s = document.createElement('script');
              s.textContent = content;
              document.head.appendChild(s);
            } else {
              newScript.textContent = content;
            }
          }

          if (!oldScript.textContent?.includes('atOptions')) {
            document.body.appendChild(newScript);
          }
          oldScript.parentNode?.removeChild(oldScript);
        });

        if (type === 'banner') {
          container.appendChild(fragment);
        } else {
          const holder = document.createElement('div');
          holder.style.display = 'none';
          holder.appendChild(fragment);
          document.body.appendChild(holder);
        }
        injectedCodeRef.current = code;
      } catch (err) {
        console.error("Ad Engine Error:", err);
      }
    };

    // تأخير بسيط لضمان استقرار واجهة المستخدم قبل الحقن
    const timer = setTimeout(inject, 500);
    return () => clearTimeout(timer);
  }, [code, type]);

  if (!code && type === 'banner') {
    return (
      <div className={`w-full max-w-4xl mx-auto p-8 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${
        isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500/30' : 'bg-gray-50 border-gray-200 text-gray-400'
      } ${className}`}>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">{label} قيد الانتظار</span>
      </div>
    );
  }

  if (!code) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center animate-fade-in ${className}`}>
      {label && type === 'banner' && (
        <div className="w-full max-w-4xl flex justify-between items-center mb-2 px-6 opacity-20 text-[7px] font-black uppercase tracking-widest">
          <span>{label}</span>
          <span>ADS</span>
        </div>
      )}
      <div ref={adRef} className={type === 'banner' ? 'w-full flex justify-center overflow-hidden' : 'hidden'} />
    </div>
  );
};

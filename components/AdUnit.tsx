
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
  const [injected, setInjected] = useState(false);
  const injectedCodeRef = useRef<string>("");

  useEffect(() => {
    if (!code || !adRef.current || injectedCodeRef.current === code) return;

    const container = adRef.current;
    if (type === 'banner') container.innerHTML = "";

    const executeInjectedCode = (target: HTMLElement, html: string) => {
      const range = document.createRange();
      const fragment = range.createContextualFragment(html);
      const scripts = Array.from(fragment.querySelectorAll('script'));

      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        // نقل السمات
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.src) {
          newScript.src = oldScript.src;
          newScript.async = true;
        } else {
          // معالجة خاصة لتعريف atOptions عالمياً
          const scriptContent = oldScript.textContent || "";
          if (scriptContent.includes('atOptions')) {
             try {
                // تنفيذ السكريبت في النطاق العالمي لتعريف المتغير
                const script = document.createElement('script');
                script.textContent = scriptContent;
                document.head.appendChild(script);
             } catch(e) { console.error("Global Script Error", e); }
          } else {
            newScript.textContent = scriptContent;
          }
        }

        if (!oldScript.textContent?.includes('atOptions')) {
           document.body.appendChild(newScript);
        }
        oldScript.parentNode?.removeChild(oldScript);
      });

      target.appendChild(fragment);
    };

    try {
      if (type === 'banner') {
        executeInjectedCode(container, code);
      } else {
        const hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
        document.body.appendChild(hiddenDiv);
        executeInjectedCode(hiddenDiv, code);
      }
      injectedCodeRef.current = code;
      setInjected(true);
    } catch (err) {
      console.error("Ad Injection Error:", err);
    }
  }, [code, type]);

  if (!code && type === 'banner') {
    return (
      <div className={`w-full max-w-4xl mx-auto p-10 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${
        isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500/30' : 'bg-gray-50 border-gray-200 text-gray-400'
      } ${className}`}>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2">{label} قيد الانتظار</span>
        <p className="text-[9px] font-bold">يرجى إضافة كود الإعلان من الإعدادات</p>
      </div>
    );
  }

  if (!code) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center animate-fade-in ${className}`}>
      {label && type === 'banner' && (
        <div className="w-full max-w-4xl flex justify-between items-center mb-3 px-6 opacity-20 text-[8px] font-black uppercase tracking-[0.3em]">
          <span>{label}</span>
          <span>SPONSORED CONTENT</span>
        </div>
      )}
      <div 
        ref={adRef} 
        className={`w-full flex justify-center transition-all ${
          type === 'banner' ? 'min-h-[50px] rounded-3xl overflow-hidden' : 'hidden'
        }`}
      />
    </div>
  );
};

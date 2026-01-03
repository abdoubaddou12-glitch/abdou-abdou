
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
    if (code && containerRef.current) {
      // تنظيف الحاوية قبل الحقن الجديد
      containerRef.current.innerHTML = "";
      
      try {
        if (type === 'script') {
          // استخدام Range لخلق DocumentFragment يسمح بتنفيذ السكريبتات
          const range = document.createRange();
          const fragment = range.createContextualFragment(code);
          
          // البحث عن كل السكريبتات داخل الكود المعطى وإعادة إنشائها لضمان تنفيذها
          const scripts = Array.from(fragment.querySelectorAll('script'));
          
          scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            
            // نقل الخصائص (src, async, type, etc.)
            Array.from(oldScript.attributes).forEach(attr => {
              newScript.setAttribute(attr.name, attr.value);
            });
            
            // نقل المحتوى الداخلي إن وجد
            if (oldScript.innerHTML) {
              newScript.innerHTML = oldScript.innerHTML;
            }
            
            // حذف السكريبت القديم من الـ fragment
            oldScript.parentNode?.removeChild(oldScript);
            
            // إضافة السكريبت الجديد للحاوية
            containerRef.current?.appendChild(newScript);
          });

          // إضافة بقية المحتوى (HTML)
          containerRef.current.appendChild(fragment);
        } else {
          // للبانرات العادية التي لا تحتوي على سكريبتات
          containerRef.current.innerHTML = code;
        }
      } catch (e) {
        console.error("Ad Injection Error:", e);
      }
    }
  }, [code, type, isDark]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ${className}`}>
      <div className="flex items-center gap-2 mb-2 opacity-10">
        <span className="text-[7px] font-black uppercase tracking-[0.5em]">{label}</span>
      </div>
      
      <div 
        ref={containerRef}
        className={`w-full flex justify-center overflow-hidden rounded-[2rem] transition-all border ${
          isDark 
            ? 'bg-zinc-900/40 border-white/5 shadow-inner' 
            : 'bg-zinc-50 border-zinc-200/50 shadow-sm'
        }`}
        style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
    </div>
  );
};

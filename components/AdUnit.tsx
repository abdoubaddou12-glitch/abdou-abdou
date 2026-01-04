
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
    // إذا لم يكن هناك كود أو تم حقن هذا الكود بالفعل، لا تفعل شيئاً
    if (!code || !adRef.current || injectedCodeRef.current === code) return;

    const container = adRef.current;
    
    // تنظيف الحاوية للبانرات فقط
    if (type === 'banner') {
      container.innerHTML = "";
    }

    const executeInjectedCode = (target: HTMLElement, html: string) => {
      const range = document.createRange();
      const fragment = range.createContextualFragment(html);
      
      // معالجة السكريبتات لضمان تشغيلها
      const scripts = Array.from(fragment.querySelectorAll('script'));
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        // نقل كل السمات (src, async, data-ad-client, etc.)
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.src) {
          // إذا كان سكريبت خارجي
          newScript.src = oldScript.src;
          newScript.async = true;
        } else {
          // إذا كان سكريبت داخلي
          newScript.textContent = oldScript.textContent;
        }

        // حقن السكريبت في الـ body لضمان التنفيذ المستقل
        document.body.appendChild(newScript);
        
        // إزالة السكريبت من الفراغمنت لتجنب تكرار الحقن في الحاوية
        oldScript.parentNode?.removeChild(oldScript);
      });

      // إضافة ما تبقى من HTML (مثل div الإعلان) إلى الحاوية المستهدفة
      target.appendChild(fragment);
    };

    try {
      if (type === 'banner') {
        executeInjectedCode(container, code);
      } else {
        // للسكريبتات الخلفية (Popunder/Social Bar)
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

  // عرض "مكان الإعلان" إذا تم التفعيل بدون كود
  if (!code && type === 'banner') {
    return (
      <div className={`w-full max-w-4xl mx-auto p-12 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${
        isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500/30' : 'bg-gray-50 border-gray-200 text-gray-400'
      } ${className}`}>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-2">{label} قيد الانتظار</span>
        <p className="text-[9px] font-bold">يرجى إضافة كود الإعلان من الإعدادات</p>
      </div>
    );
  }

  if (!code) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center animate-fade-in ${className}`}>
      {label && type === 'banner' && (
        <div className="w-full max-w-4xl flex justify-between items-center mb-2 px-4 opacity-20 text-[7px] font-black uppercase tracking-widest">
          <span>{label}</span>
          <span>SPONSORED</span>
        </div>
      )}
      <div 
        ref={adRef} 
        className={`w-full flex justify-center transition-all ${
          type === 'banner' ? 'min-h-[90px] rounded-2xl overflow-hidden' : 'hidden'
        }`}
      />
    </div>
  );
};

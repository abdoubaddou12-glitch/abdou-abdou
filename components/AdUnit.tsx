
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

    const injectAd = () => {
      try {
        // 1. استخراج خيارات Adsterra (atOptions) إن وجدت في الكود
        const atOptionsMatch = code.match(/atOptions\s*=\s*({[\s\S]*?});/);
        if (atOptionsMatch && atOptionsMatch[1]) {
          try {
            // تنفيذ كود الخيارات في سياق الـ window ليكون متاحاً للسكريبت الخارجي
            // @ts-ignore
            window.atOptions = new Function(`return ${atOptionsMatch[1]}`)();
          } catch (e) {
            console.error("Adsterra Options Parsing Error:", e);
          }
        }

        // 2. إنشاء محرر DOM مؤقت
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = code;
        
        const scripts = Array.from(tempDiv.querySelectorAll('script'));
        
        // 3. حقن السكريبتات يدوياً
        scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
          
          // نقل كل الخصائص (src, async, type, etc.)
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });

          // نقل المحتوى المضمن (الذي لا يعتمد على src)
          if (oldScript.innerHTML) {
            newScript.innerHTML = oldScript.innerHTML;
          }

          // إضافة السكريبت للـ Container
          container.appendChild(newScript);
        });

        // 4. حقن العناصر غير السكريبت (مثل ins أو div الإعلانية)
        Array.from(tempDiv.childNodes).forEach(node => {
          if (node.nodeName !== 'SCRIPT') {
            container.appendChild(node.cloneNode(true));
          }
        });

        // 5. دعم إعلانات Google AdSense (دفع التحديث)
        if (code.includes('adsbygoogle')) {
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {}
        }

      } catch (err) {
        console.error("Ad Injection Execution Error:", err);
      }
    };

    // تنفيذ الحقن بعد التأكد من استقرار الصفحة
    const timer = setTimeout(injectAd, 300);
    return () => clearTimeout(timer);
  }, [code, isDark, type]);

  if (!code) return null;

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ${className}`}>
      {label && (
        <div className="flex items-center gap-2 mb-2 opacity-20">
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

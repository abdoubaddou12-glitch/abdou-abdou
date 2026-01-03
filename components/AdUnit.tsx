
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

    if (type === 'banner') {
      // تقنية Iframe Bridge: إنشاء بيئة معزولة تماماً للإعلان
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.display = 'block';
      iframe.style.margin = '0 auto';
      iframe.scrolling = 'no';
      
      container.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        // حقن الكود داخل الإطار لضمان تنفيذ document.write
        iframeDoc.write(`
          <!DOCTYPE html>
          <html dir="rtl">
            <head>
              <style>
                body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; overflow: hidden; background: transparent; }
              </style>
            </head>
            <body>
              ${code}
              <script>
                // محاولة تعديل الارتفاع تلقائياً بعد التحميل
                window.onload = function() {
                  setTimeout(function() {
                    parent.postMessage({ height: document.body.scrollHeight, id: '${label}' }, '*');
                  }, 500);
                };
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }

      // استماع لتعديل الارتفاع
      const handleMessage = (event: MessageEvent) => {
        if (event.data.id === label) {
          iframe.style.height = (event.data.height || 250) + 'px';
        }
      };
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    } else {
      // حقن السكريبتات غير المرئية (Popunder / Social Bar) مباشرة في الـ head
      const temp = document.createElement('div');
      temp.innerHTML = code;
      const scripts = Array.from(temp.querySelectorAll('script'));
      
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        Array.from(s.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        if (s.innerHTML) newScript.innerHTML = s.innerHTML;
        document.head.appendChild(newScript);
      });
    }
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
          type === 'banner' ? 'rounded-[2rem] border min-h-[100px]' : ''
        } ${
          type === 'banner' && isDark 
            ? 'bg-zinc-900/40 border-white/5' 
            : type === 'banner' ? 'bg-zinc-50 border-zinc-200/50 shadow-sm' : ''
        }`}
      />
    </div>
  );
};

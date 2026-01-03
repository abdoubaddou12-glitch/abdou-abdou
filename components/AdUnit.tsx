
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
    container.innerHTML = ""; 

    if (type === 'banner') {
      // استخدام Iframe لضمان عمل سكريبتات Adsterra دون حظر من المتصفح
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';
      iframe.style.minHeight = '100px';
      
      container.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; background:transparent;">
            ${code}
            <script>
              window.onload = function() {
                // إرسال الارتفاع الحقيقي للحاوية لتجنب الفراغات
                setTimeout(() => {
                  parent.postMessage({ height: document.body.scrollHeight, id: '${label}' }, '*');
                }, 1000);
              };
            </script>
          </body>
        `);
        iframeDoc.close();
      }

      const handleResize = (event: MessageEvent) => {
        if (event.data.id === label) {
          iframe.style.height = (event.data.height || 250) + 'px';
        }
      };
      window.addEventListener('message', handleResize);
      return () => window.removeEventListener('message', handleResize);
    } else {
      // حقن السكريبتات غير المرئية في الـ head مباشرة
      const div = document.createElement('div');
      div.innerHTML = code;
      const scripts = Array.from(div.querySelectorAll('script'));
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.innerHTML = oldScript.innerHTML;
        document.head.appendChild(newScript);
      });
    }
  }, [code, label, type]);

  if (!code) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      {label && type === 'banner' && (
        <span className="text-[8px] font-black uppercase opacity-20 mb-2 tracking-[0.3em]">{label}</span>
      )}
      <div 
        ref={containerRef} 
        className={`w-full flex justify-center overflow-hidden transition-all ${
          type === 'banner' ? 'rounded-2xl border' : ''
        } ${isDark ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}
      />
    </div>
  );
};

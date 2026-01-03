
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
  const frameId = useRef(`ad-frame-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = ""; 

    if (type === 'banner') {
      const iframe = document.createElement('iframe');
      iframe.id = frameId.current;
      iframe.style.width = '100%';
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.scrolling = 'no';
      iframe.style.minHeight = '50px';
      iframe.style.display = 'block';
      
      container.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        // تمرير الكود مع سكريبت لحساب الارتفاع وإرساله للأب
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; background:transparent;">
              <div id="ad-container" style="width:100%; display:flex; justify-content:center;">
                ${code}
              </div>
              <script>
                function updateHeight() {
                  const height = document.getElementById('ad-container').scrollHeight;
                  if (height > 0) {
                    window.parent.postMessage({ height: height, id: '${frameId.current}' }, '*');
                  }
                }
                window.onload = updateHeight;
                // إعادة الفحص بعد ثواني للتأكد من تحميل الصور داخل الإعلان
                setTimeout(updateHeight, 2000);
                setTimeout(updateHeight, 5000);
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }

      const handleResize = (event: MessageEvent) => {
        if (event.data.id === frameId.current) {
          iframe.style.height = (event.data.height || 250) + 'px';
        }
      };
      window.addEventListener('message', handleResize);
      return () => window.removeEventListener('message', handleResize);
    } else {
      // حقن سكريبتات أدستيرا (Popunder / Social Bar)
      const div = document.createElement('div');
      div.innerHTML = code;
      const scripts = Array.from(div.querySelectorAll('script'));
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        if (oldScript.innerHTML) newScript.innerHTML = oldScript.innerHTML;
        document.head.appendChild(newScript);
      });
    }
  }, [code, type]);

  if (!code) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center animate-fade-in ${className}`}>
      {label && type === 'banner' && (
        <span className="text-[7px] font-black uppercase opacity-20 mb-2 tracking-[0.4em]">{label}</span>
      )}
      <div 
        ref={containerRef} 
        className={`w-full flex justify-center overflow-hidden transition-all ${
          type === 'banner' ? 'rounded-2xl border border-emerald-500/5' : ''
        } ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
      />
    </div>
  );
};


import React from 'react';
import { AdSenseConfig } from '../types.ts';

interface AdSenseProps {
  config: AdSenseConfig;
  isDark: boolean;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({ config, isDark, className = "" }) => {
  if (!config.isEnabled) return null;

  // في حال كانت الإعدادات غير مكتملة، نعرض مساحة تجريبية جذابة
  if (!config.publisherId || !config.slotId) {
    return (
      <div className={`w-full h-32 flex items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
        isDark 
          ? 'bg-zinc-900/30 border-zinc-800 text-zinc-600' 
          : 'bg-indigo-50/50 border-indigo-100 text-indigo-300'
      } ${className}`}>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-widest">مساحة إعلانية (Google AdSense)</p>
          <p className="text-[10px] opacity-60 mt-1 italic">قم بضبط الإعدادات من لوحة التحكم لتفعيل الإعلانات</p>
        </div>
      </div>
    );
  }

  // هذا هو الهيكل الفعلي الذي يتطلبه غوغل أدسنس
  return (
    <div className={`adsense-wrapper overflow-hidden flex justify-center py-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={config.publisherId}
        data-ad-slot={config.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>
    </div>
  );
};

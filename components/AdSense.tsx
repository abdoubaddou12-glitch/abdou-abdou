
import React from 'react';
import { AdSenseConfig } from '../types.ts';

interface AdSenseProps {
  config: AdSenseConfig;
  isDark: boolean;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({ config, isDark, className = "" }) => {
  if (!config.isEnabled) return null;

  // Placeholder for when IDs are missing
  if (!config.publisherId || !config.slotId) {
    return (
      <div className={`w-full overflow-hidden flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed transition-all py-12 px-8 text-center ${
        isDark 
          ? 'bg-zinc-900/30 border-zinc-800 text-zinc-600' 
          : 'bg-emerald-50/50 border-emerald-100 text-emerald-300'
      } ${className}`}>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-3 opacity-60">إعلان ممول - Google AdSense</span>
        <div className="max-w-xs">
          <p className="text-xs font-bold leading-relaxed">ستظهر إعلانات أدسنس الحقيقية هنا بمجرد إدخال معرف الناشر والوحدة في لوحة التحكم.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`adsense-wrapper overflow-hidden flex flex-col items-center py-8 ${className}`}>
      <div className="w-full flex justify-between items-center mb-2 px-4 max-w-4xl opacity-20 text-[9px] font-black uppercase tracking-widest">
        <span>إعلان</span>
        <span>Google AdSense</span>
      </div>
      <div className={`w-full max-w-4xl p-2 rounded-2xl border ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-100 border-gray-200'}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '100px' }}
          data-ad-client={config.publisherId}
          data-ad-slot={config.slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>
      </div>
    </div>
  );
};

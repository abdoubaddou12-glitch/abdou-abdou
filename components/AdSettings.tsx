
import React, { useState, useEffect } from 'react';
import { AdSenseConfig, AdsterraConfig } from '../types.ts';
import { Layout, Save, X, Globe, DollarSign, Terminal, RotateCcw, AlertTriangle } from 'lucide-react';

interface AdSettingsProps {
  adsense: AdSenseConfig;
  adsterra: AdsterraConfig;
  isDark: boolean;
  onSave: (configs: { adsense: AdSenseConfig, adsterra: AdsterraConfig }) => void;
  onCancel: () => void;
}

export const AdSettings: React.FC<AdSettingsProps> = ({ adsense, adsterra, isDark, onSave, onCancel }) => {
  const [asConfig, setAsConfig] = useState<AdSenseConfig>({ ...adsense });
  const [atConfig, setAtConfig] = useState<AdsterraConfig>({ ...adsterra });
  const [activeTab, setActiveTab] = useState<'adsense' | 'adsterra'>('adsterra');

  const handleRestoreDefaults = () => {
    if (confirm('هل تريد استعادة أكواد Adsterra الموصى بها؟ سيتم تفعيل جميع الإعلانات بالأكواد الجديدة.')) {
      setAtConfig({
        isEnabled: true,
        socialBar: '<script src="https://bouncingbuzz.com/15/38/5b/15385b7c751e6c7d59d59fb7f34e2934.js"></script>',
        popUnder: '<script src="https://bouncingbuzz.com/29/98/27/29982794e86cad0441c5d56daad519bd.js"></script>',
        banner728x90: '',
        banner300x250: `<script>atOptions = {'key' : '0295263cf4ed8d9e3a97b6a2490864ee','format' : 'iframe','height' : 250,'width' : 300,'params' : {}};</script><script src="https://bouncingbuzz.com/0295263cf4ed8d9e3a97b6a2490864ee/invoke.js"></script>`
      });
    }
  };

  return (
    <div className="animate-slide-up">
      <div className={`emerald-card p-6 md:p-10 ${isDark ? 'border-emerald-500/10' : 'bg-white shadow-2xl'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black italic">إعدادات الربح</h3>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">إدارة شبكات الإعلانات</p>
            </div>
          </div>
          
          {activeTab === 'adsterra' && (
            <button 
              onClick={handleRestoreDefaults}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <RotateCcw size={14} /> استعادة الأكواد الافتراضية
            </button>
          )}
        </div>

        <div className="flex gap-2 p-1.5 rounded-2xl bg-black/10 mb-8">
          <button 
            onClick={() => setActiveTab('adsterra')}
            className={`flex-grow py-3 rounded-xl font-black text-xs transition-all ${activeTab === 'adsterra' ? 'bg-emerald-500 text-black shadow-lg' : 'opacity-40'}`}
          >
            Adsterra (موصى به)
          </button>
          <button 
            onClick={() => setActiveTab('adsense')}
            className={`flex-grow py-3 rounded-xl font-black text-xs transition-all ${activeTab === 'adsense' ? 'bg-emerald-500 text-black shadow-lg' : 'opacity-40'}`}
          >
            Google AdSense
          </button>
        </div>

        {activeTab === 'adsterra' ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-emerald-500" />
                <span className="text-sm font-bold">تفعيل شبكة Adsterra</span>
              </div>
              <Toggle enabled={atConfig.isEnabled} onToggle={() => setAtConfig({...atConfig, isEnabled: !atConfig.isEnabled})} />
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <AlertTriangle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[10px] font-black uppercase tracking-wider opacity-60 leading-relaxed">
                ملاحظة: لقد قمنا بدمج الأكواد الخاصة بك (Social Bar، Popunder، والبانر 300x250) تلقائياً. تأكد من تفعيل الزر أعلاه لتظهر في الموقع.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <CodeArea 
                label="بانر علوي للحاسوب (728x90)" 
                value={atConfig.banner728x90} 
                onChange={(v) => setAtConfig({...atConfig, banner728x90: v})} 
                isDark={isDark} 
                placeholder="إلصق كود البانر 728x90 هنا..." 
              />
              <CodeArea 
                label="بانر للهاتف (300x250) - تم الإعداد" 
                value={atConfig.banner300x250} 
                onChange={(v) => setAtConfig({...atConfig, banner300x250: v})} 
                isDark={isDark} 
                placeholder="إلصق كود البانر 300x250 هنا..." 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CodeArea label="سكريبت Social Bar" value={atConfig.socialBar} onChange={(v) => setAtConfig({...atConfig, socialBar: v})} isDark={isDark} />
                <CodeArea label="سكريبت Popunder" value={atConfig.popUnder} onChange={(v) => setAtConfig({...atConfig, popUnder: v})} isDark={isDark} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
             <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <span className="text-sm font-bold">تفعيل AdSense</span>
              <Toggle enabled={asConfig.isEnabled} onToggle={() => setAsConfig({...asConfig, isEnabled: !asConfig.isEnabled})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="معرف الناشر" value={asConfig.publisherId} onChange={(v) => setAsConfig({...asConfig, publisherId: v})} isDark={isDark} />
              <InputField label="معرف الوحدة" value={asConfig.slotId} onChange={(v) => setAsConfig({...asConfig, slotId: v})} isDark={isDark} />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-10">
          <button onClick={() => onSave({ adsense: asConfig, adsterra: atConfig })} className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3">
            <Save size={20} /> حفظ وتفعيل الإعلانات
          </button>
          <button onClick={onCancel} className="px-8 bg-zinc-800 text-white py-5 rounded-2xl font-black hover:bg-zinc-700 transition-all">إلغاء</button>
        </div>
      </div>
    </div>
  );
};

const Toggle = ({ enabled, onToggle }: any) => (
  <button onClick={onToggle} className={`w-12 h-6 rounded-full relative transition-all ${enabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'right-7' : 'right-1'}`} />
  </button>
);

const CodeArea = ({ label, value, onChange, isDark, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2 flex items-center gap-2">
      <Terminal size={12} /> {label}
    </label>
    <textarea 
      rows={3}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      dir="ltr"
      className={`w-full px-4 py-3 rounded-xl border text-[10px] font-mono outline-none transition-all ${isDark ? 'bg-black/50 border-white/5 focus:border-emerald-500 text-zinc-300' : 'bg-gray-50 border-zinc-200 focus:border-emerald-500'}`}
      placeholder={placeholder || "إلصق الكود هنا..."}
    />
  </div>
);

const InputField = ({ label, value, onChange, isDark }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">{label}</label>
    <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={`w-full px-6 py-4 rounded-xl border font-bold ${isDark ? 'bg-black border-white/10' : 'bg-white border-zinc-200'}`} />
  </div>
);


import React, { useState } from 'react';
import { AdSenseConfig } from '../types.ts';
import { Shield, Layout, AlertCircle, Save, ArrowRight } from 'lucide-react';

interface AdSenseSettingsProps {
  config: AdSenseConfig;
  isDark: boolean;
  onSave: (config: AdSenseConfig) => void;
  onCancel: () => void;
}

export const AdSenseSettings: React.FC<AdSenseSettingsProps> = ({ config, isDark, onSave, onCancel }) => {
  const [formData, setFormData] = useState<AdSenseConfig>({ ...config });

  return (
    <div className="max-w-4xl mx-auto py-10 animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tighter">إعدادات غوغل أدسنس</h1>
          <p className={`text-sm ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>اربط مدونتك بحسابك في أدسنس لتبدأ بجني الأرباح.</p>
        </div>
        <button 
          onClick={onCancel}
          className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:scale-110 transition-all"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900/50 border-emerald-500/20' : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/50'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-black">معلومات الحساب</h3>
                <p className="text-xs opacity-50">أدخل المعرفات الموجودة في حساب أدسنس الخاص بك</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 opacity-60">معرف الناشر (Publisher ID)</label>
                <input 
                  type="text"
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  value={formData.publisherId}
                  onChange={(e) => setFormData({...formData, publisherId: e.target.value})}
                  className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all ${
                    isDark ? 'bg-zinc-800 border-zinc-700 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3 opacity-60">معرف الوحدة الإعلانية (Slot ID)</label>
                <input 
                  type="text"
                  placeholder="XXXXXXXXXX"
                  value={formData.slotId}
                  onChange={(e) => setFormData({...formData, slotId: e.target.value})}
                  className={`w-full px-6 py-4 rounded-2xl outline-none border transition-all ${
                    isDark ? 'bg-zinc-800 border-zinc-700 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200 focus:border-emerald-500'
                  }`}
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={() => setFormData({...formData, isEnabled: !formData.isEnabled})}
                  className={`w-14 h-8 rounded-full transition-all relative ${formData.isEnabled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.isEnabled ? 'right-7' : 'right-1'}`}></div>
                </button>
                <span className="font-bold">تفعيل الإعلانات على الموقع</span>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border flex items-start gap-4 ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
            <AlertCircle size={20} className="shrink-0 mt-1" />
            <p className="text-sm font-medium leading-relaxed">
              تأكد من إضافة شفرة "ads.txt" في جذر موقعك وتفعيل خاصية "الإعلانات التلقائية" في حسابك بـ أدسنس للحصول على أفضل النتائج.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900/50 border-emerald-500/20' : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/50'}`}>
            <h3 className="font-black mb-6 flex items-center gap-2">
              <Layout size={18} className="text-emerald-500" /> معاينة
            </h3>
            <div className={`w-full aspect-square rounded-2xl border-2 border-dashed flex items-center justify-center p-4 text-center ${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`}>
               <span className="text-[10px] font-black opacity-40">هنا سيظهر الإعلان للمستخدمين</span>
            </div>
          </div>

          <button 
            onClick={() => onSave(formData)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black py-6 rounded-[2rem] font-black shadow-2xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
          >
            <Save size={20} />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
};

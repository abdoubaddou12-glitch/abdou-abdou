
import React, { useState } from 'react';
import { AdSenseConfig } from '../types.ts';
import { Shield, Layout, AlertCircle, Save, X } from 'lucide-react';

interface AdSenseSettingsProps {
  config: AdSenseConfig;
  isDark: boolean;
  onSave: (config: AdSenseConfig) => void;
  onCancel: () => void;
}

export const AdSenseSettings: React.FC<AdSenseSettingsProps> = ({ config, onSave, onCancel }) => {
  const [formData, setFormData] = useState<AdSenseConfig>({ ...config });

  return (
    <div className="animate-slide-up">
      <div className="emerald-card p-8 md:p-12 border-emerald-500/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
              <Layout size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tighter">إعدادات الإعلانات</h3>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">ربط حساب غوغل أدسنس</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-black/40 px-6 py-3 rounded-2xl border border-white/5">
            <span className="text-xs font-bold">تفعيل الإعلانات</span>
            <button 
              onClick={() => setFormData({...formData, isEnabled: !formData.isEnabled})}
              className={`w-12 h-6 rounded-full transition-all relative ${formData.isEnabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isEnabled ? 'right-7' : 'right-1'}`}></div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">معرف الناشر (Publisher ID)</label>
            <input 
              type="text"
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              value={formData.publisherId}
              onChange={(e) => setFormData({...formData, publisherId: e.target.value})}
              className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-emerald-500 transition-all font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40 pr-2">معرف الوحدة الإعلانية (Slot ID)</label>
            <input 
              type="text"
              placeholder="XXXXXXXXXX"
              value={formData.slotId}
              onChange={(e) => setFormData({...formData, slotId: e.target.value})}
              className="w-full px-6 py-4 rounded-xl bg-black/50 border border-white/10 outline-none focus:border-emerald-500 transition-all font-bold"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 mb-10 flex items-start gap-4">
          <AlertCircle size={20} className="text-emerald-500 shrink-0 mt-1" />
          <p className="text-xs font-medium opacity-60 leading-relaxed">
            بمجرد تفعيل الإعلانات وإدخال المعرفات الصحيحة، ستبدأ الإعلانات بالظهور في الأماكن المخصصة لها تلقائياً. تأكد من أن حسابك في أدسنس مفعل للموقع: <span className="text-emerald-500">storehalal.shop</span>
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => onSave(formData)}
            className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-black py-5 rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3"
          >
            <Save size={20} /> حفظ الإعدادات
          </button>
          <button 
            onClick={onCancel}
            className="px-8 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black hover:bg-white/10 transition-all"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

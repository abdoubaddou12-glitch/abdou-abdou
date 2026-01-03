
import React, { useState } from 'react';
import { AnalyticsData } from '../types.ts';
import { 
  ShieldCheck, RefreshCw, 
  Eye, Users, DollarSign, Zap
} from 'lucide-react';

interface AdminPanelProps {
  isDark: boolean;
  analytics: AnalyticsData;
  onOpenAdSense: () => void;
  onOpenSecurity: () => void;
  onSyncData: () => void;
  baseVisitors: number;
  onUpdateBaseVisitors: (val: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isDark, analytics, onOpenSecurity, onOpenAdSense, baseVisitors, onUpdateBaseVisitors
}) => {
  const [tempBase, setTempBase] = useState(baseVisitors);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleForceUpdate = () => {
    setIsSyncing(true);
    // مسح الكاش البرمجي
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
        window.location.reload();
    }, 1500);
  };
  
  return (
    <div className="max-w-6xl mx-auto py-10 animate-fade-in px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter italic text-glow">لوحة التحكم</h1>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">إدارة النظام v13.0</p>
          </div>
          
          <button 
            onClick={handleForceUpdate}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isSyncing ? 'bg-emerald-500 text-black animate-pulse' : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'}`}
          >
            {isSyncing ? <RefreshCw className="animate-spin" /> : <Zap size={16} />}
            تحديث النظام ومسح الكاش
          </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <button 
            onClick={onOpenSecurity} 
            className={`group p-8 rounded-3xl font-black flex flex-col items-center gap-3 border transition-all ${isDark ? 'border-emerald-500/10 bg-zinc-900/50 hover:bg-emerald-500/10 text-emerald-400' : 'border-emerald-500/10 bg-white shadow-xl text-zinc-600 hover:border-emerald-500'}`}
          >
            <ShieldCheck size={32} className="text-emerald-500" /> 
            <span className="text-xs uppercase tracking-widest">الأمان والوصول</span>
          </button>
          
          <button 
            onClick={onOpenAdSense} 
            className={`group p-8 rounded-3xl font-black flex flex-col items-center gap-3 border transition-all ${isDark ? 'border-emerald-500/10 bg-zinc-900/50 hover:bg-emerald-500/10 text-emerald-400' : 'border-emerald-500/10 bg-white shadow-xl text-zinc-600 hover:border-emerald-500'}`}
          >
            <DollarSign size={32} className="text-emerald-500" /> 
            <span className="text-xs uppercase tracking-widest">الإعلانات والربح</span>
          </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <StatCard title="إجمالي الزوار" value={(analytics.totalVisitors + baseVisitors).toLocaleString()} icon={<Users size={22} />} isDark={isDark} />
          <StatCard title="عمليات التحويل" value={analytics.totalViews.toLocaleString()} icon={<RefreshCw size={22} />} isDark={isDark} />
      </div>

      <div className={`p-6 md:p-10 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
           <div className="flex items-center gap-4 mb-8">
              <Eye size={24} className="text-emerald-500" />
              <h3 className="text-xl font-black italic">عداد الزوار الوهمي</h3>
           </div>
           <div className="flex flex-col sm:flex-row items-center gap-4">
              <input 
                type="number" 
                value={tempBase}
                onChange={(e) => setTempBase(Number(e.target.value))}
                className={`w-full px-6 py-4 rounded-2xl border outline-none font-black text-lg ${isDark ? 'bg-black border-white/5 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200'}`}
              />
              <button 
                onClick={() => onUpdateBaseVisitors(tempBase)}
                className="w-full sm:w-auto bg-emerald-500 text-black px-10 py-5 rounded-2xl font-black shadow-xl active:scale-95 transition-all whitespace-nowrap"
              >
                حفظ التعديل
              </button>
           </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, isDark }: any) => (
  <div className={`p-6 md:p-8 rounded-[2rem] border flex items-center gap-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">{title}</div>
      <div className="text-xl md:text-2xl font-black italic tracking-tighter">{value}</div>
    </div>
  </div>
);

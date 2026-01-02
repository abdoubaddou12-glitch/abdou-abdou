
import React, { useState } from 'react';
import { AnalyticsData } from '../types.ts';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ShieldCheck, TrendingUp, RefreshCw, 
  Trash2, Save, Users, Eye, Plus, Activity,
  CloudLightning
} from 'lucide-react';

interface AdminPanelProps {
  isDark: boolean;
  analytics: AnalyticsData;
  onOpenAdSense: () => void;
  onOpenSecurity: () => void;
  onSyncData: () => void;
  posts: any[];
  onNewPost: () => void;
  onEditPost: (id: string) => void;
  onDeletePost: (id: string) => void;
  baseVisitors: number;
  onUpdateBaseVisitors: (val: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  isDark, analytics, onOpenSecurity, baseVisitors, onUpdateBaseVisitors
}) => {
  const [tempBase, setTempBase] = useState(baseVisitors);

  const handleHardRefresh = () => {
    if (confirm('سيتم الآن تنظيف الكاش وإجبار الموقع على التحديث من السيرفر. سيؤدي هذا لمزامنة النسخة بين الهاتف والحاسوب.')) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
      }
      window.location.href = window.location.pathname + '?v=' + Date.now();
    }
  };

  const handleClearStats = () => {
    if (confirm('هل أنت متأكد من تصفير إحصائيات النظام؟')) {
      localStorage.setItem('total_converted', '0');
      localStorage.setItem('total_visitors', '0');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 animate-fade-in px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter italic">لوحة التحكم</h1>
          <p className="text-xs font-bold opacity-30 uppercase tracking-widest">مراقبة الأداء والمزامنة الفورية</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleHardRefresh}
            className="px-5 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-black shadow-lg shadow-amber-500/5"
          >
            <CloudLightning size={20} /> مزامنة وتحديث (Cloudflare)
          </button>
          <button onClick={onOpenSecurity} className={`px-5 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-emerald-400' : 'border-zinc-200 shadow-lg text-zinc-600'}`}>
            <ShieldCheck size={20} className="text-emerald-500" /> الأمان
          </button>
          <button onClick={handleClearStats} className="px-5 py-4 rounded-2xl font-black flex items-center gap-2 border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all">
            <Trash2 size={20} /> تصفير
          </button>
        </div>
      </div>

      <div className="animate-slide-up space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="إجمالي الزوار" value={analytics.totalVisitors.toLocaleString()} icon={<Users size={22} />} isDark={isDark} />
          <StatCard title="إجمالي التحويلات" value={analytics.totalViews.toLocaleString()} icon={<RefreshCw size={22} />} isDark={isDark} />
          <StatCard title="حالة النظام" value="نشط" icon={<Activity size={22} />} isDark={isDark} />
        </div>

        <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
           <div className="flex items-center gap-4 mb-6">
              <Eye size={24} className="text-emerald-500" />
              <h3 className="text-xl font-black italic">إعدادات عداد الزوار</h3>
           </div>
           <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-grow w-full">
                 <p className="text-xs opacity-40 mb-3 font-bold">إضافة عدد زوار أساسي للفوتر:</p>
                 <div className="relative">
                    <input 
                      type="number" 
                      value={tempBase}
                      onChange={(e) => setTempBase(Number(e.target.value))}
                      className={`w-full px-6 py-4 rounded-xl border outline-none font-black text-lg ${isDark ? 'bg-black border-white/5' : 'bg-zinc-50 border-zinc-200'}`}
                    />
                    <Plus className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20" size={20} />
                 </div>
              </div>
              <button 
                onClick={() => onUpdateBaseVisitors(tempBase)}
                className="w-full md:w-auto bg-emerald-500 text-black px-10 py-5 rounded-xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
              >
                <Save size={20} /> حفظ العداد
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, isDark }: any) => (
  <div className={`p-8 rounded-[2rem] border flex items-center gap-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-1">{title}</div>
      <div className="text-2xl font-black italic">{value}</div>
    </div>
  </div>
);

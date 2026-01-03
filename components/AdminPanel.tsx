
import React, { useState } from 'react';
import { AnalyticsData } from '../types.ts';
import { 
  ShieldCheck, RefreshCw, 
  Save, Users, Eye, Activity,
  DollarSign
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
  isDark, analytics, onOpenSecurity, onOpenAdSense, baseVisitors, onUpdateBaseVisitors
}) => {
  const [tempBase, setTempBase] = useState(baseVisitors);
  
  return (
    <div className="max-w-6xl mx-auto py-10 animate-fade-in px-4">
      <div className="flex flex-col gap-6 mb-12 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter italic">مركز الإدارة</h1>
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">إدارة المحول والأرباح</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button 
            onClick={onOpenSecurity} 
            className={`group p-8 rounded-3xl font-black flex flex-col items-center gap-3 border transition-all ${isDark ? 'border-emerald-500/10 bg-zinc-900/50 hover:bg-emerald-500/10 text-emerald-400' : 'border-emerald-500/10 bg-white shadow-xl text-zinc-600 hover:border-emerald-500'}`}
          >
            <ShieldCheck size={32} className="text-emerald-500" /> 
            <span className="text-xs uppercase tracking-widest">إعدادات الأمان</span>
          </button>
          
          <button 
            onClick={onOpenAdSense} 
            className={`group p-8 rounded-3xl font-black flex flex-col items-center gap-3 border transition-all ${isDark ? 'border-emerald-500/10 bg-zinc-900/50 hover:bg-emerald-500/10 text-emerald-400' : 'border-emerald-500/10 bg-white shadow-xl text-zinc-600 hover:border-emerald-500'}`}
          >
            <DollarSign size={32} className="text-emerald-500" /> 
            <span className="text-xs uppercase tracking-widest">إدارة الإعلانات</span>
          </button>
      </div>

      <div className="animate-slide-up space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="إجمالي الزوار" value={analytics.totalVisitors.toLocaleString()} icon={<Users size={22} />} isDark={isDark} />
          <StatCard title="عمليات التحويل" value={analytics.totalViews.toLocaleString()} icon={<RefreshCw size={22} />} isDark={isDark} />
          <StatCard title="حالة النظام" value="نشط" icon={<Activity size={22} />} isDark={isDark} />
        </div>

        <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
           <div className="flex items-center gap-4 mb-6">
              <Eye size={24} className="text-emerald-500" />
              <h3 className="text-xl font-black italic">تعديل عداد الزوار الظاهري</h3>
           </div>
           <div className="flex flex-col md:flex-row items-center gap-6">
              <input 
                type="number" 
                value={tempBase}
                onChange={(e) => setTempBase(Number(e.target.value))}
                className={`w-full px-6 py-4 rounded-xl border outline-none font-black text-lg ${isDark ? 'bg-black border-white/5 focus:border-emerald-500' : 'bg-zinc-50 border-zinc-200'}`}
              />
              <button 
                onClick={() => onUpdateBaseVisitors(tempBase)}
                className="w-full md:w-auto bg-emerald-500 text-black px-10 py-5 rounded-xl font-black shadow-xl active:scale-95 transition-all"
              >
                تحديث العداد
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, isDark }: any) => (
  <div className={`p-8 rounded-[2rem] border flex items-center gap-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">{title}</div>
      <div className="text-2xl font-black italic tracking-tighter">{value}</div>
    </div>
  </div>
);


import React, { useState, useEffect } from 'react';
import { AnalyticsData } from '../types.ts';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { 
  ShieldCheck, TrendingUp, RefreshCw, 
  Save, Users, Eye, Plus, Activity,
  Smartphone, Monitor, Globe, 
  Clock, MapPin
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
  
  // بيانات محاكاة ذكية للتحليلات
  const deviceData = [
    { name: 'هاتف', value: 65, icon: <Smartphone size={14}/> },
    { name: 'حاسوب', value: 30, icon: <Monitor size={14}/> },
    { name: 'تابلت', value: 5, icon: <Activity size={14}/> }
  ];

  const geoData = [
    { country: 'المغرب', users: '45%', color: '#10b981' },
    { country: 'السعودية', users: '20%', color: '#34d399' },
    { country: 'مصر', users: '15%', color: '#6ee7b7' },
    { country: 'أخرى', users: '20%', color: '#a7f3d0' }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 animate-fade-in px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter italic">لوحة التحكم</h1>
          <p className="text-xs font-bold opacity-30 uppercase tracking-widest">مراقبة الأداء والتحليلات الذكية</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={onOpenSecurity} className={`px-5 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-emerald-400' : 'border-zinc-200 shadow-lg text-zinc-600'}`}>
            <ShieldCheck size={20} className="text-emerald-500" /> الأمان والوصول
          </button>
        </div>
      </div>

      <div className="animate-slide-up space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="إجمالي الزوار" value={analytics.totalVisitors.toLocaleString()} icon={<Users size={22} />} isDark={isDark} />
          <StatCard title="إجمالي التحويلات" value={analytics.totalViews.toLocaleString()} icon={<RefreshCw size={22} />} isDark={isDark} />
          <StatCard title="معدل الارتداد" value="12%" icon={<Activity size={22} />} isDark={isDark} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* توزيع الأجهزة */}
          <div className={`lg:col-span-4 p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
             <h3 className="text-sm font-black mb-6 flex items-center gap-2 opacity-50 uppercase tracking-widest"><Monitor size={16}/> توزيع الأجهزة</h3>
             <div className="space-y-6">
                {deviceData.map((d, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-black italic">
                       <span className="flex items-center gap-2">{d.icon} {d.name}</span>
                       <span>{d.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${d.value}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* التوزيع الجغرافي */}
          <div className={`lg:col-span-8 p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
             <h3 className="text-sm font-black mb-6 flex items-center gap-2 opacity-50 uppercase tracking-widest"><Globe size={16}/> أعلى المناطق زيارة</h3>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {geoData.map((g, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-black/10 border border-white/5 text-center">
                    <p className="text-[10px] font-black opacity-30 mb-1">{g.country}</p>
                    <p className="text-lg font-black text-emerald-500">{g.users}</p>
                  </div>
                ))}
             </div>
             <div className="mt-8 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black opacity-60">
                   <Clock size={14}/> تحديث تلقائي كل 15 ثانية
                </div>
                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">مباشر الآن</div>
             </div>
          </div>
        </div>

        <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
           <div className="flex items-center gap-4 mb-6">
              <Eye size={24} className="text-emerald-500" />
              <h3 className="text-xl font-black italic">إعدادات عداد الزوار الأساسي</h3>
           </div>
           <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-grow w-full">
                 <p className="text-xs opacity-40 mb-3 font-bold">تعديل الرقم الأساسي الذي يظهر في واجهة الموقع:</p>
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

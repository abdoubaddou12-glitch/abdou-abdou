
import React, { useState } from 'react';
import { AnalyticsData } from '../types.ts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ShieldCheck, TrendingUp, RefreshCw, Zap, 
  HardDrive, Trash2, Settings2, Save
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
  isDark, analytics, onOpenSecurity
}) => {
  const chartData = analytics.dailyEarnings.map((val, i) => ({
    name: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء'][i],
    conversions: val * 10
  }));

  const handleClearHistory = () => {
    if (confirm('هل تريد تصفير كافة إحصائيات التحويل؟')) {
      localStorage.setItem('total_converted', '0');
      localStorage.setItem('total_saved_mb', '0');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 animate-fade-in px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter italic">إحصائيات الأداة</h1>
          <p className="text-xs font-bold opacity-30 uppercase tracking-widest">أداء معالجة الصور والنظام</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={onOpenSecurity} className={`px-5 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-emerald-400' : 'border-zinc-200 hover:bg-white text-zinc-600 shadow-lg'}`}><ShieldCheck size={20} className="text-emerald-500" />الأمان</button>
          <button onClick={handleClearHistory} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 transition-all border border-red-500/20"><Trash2 size={20} />تصفير البيانات</button>
        </div>
      </div>

      <div className="animate-slide-up space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="إجمالي التحويلات" value={analytics.totalViews.toLocaleString()} icon={<RefreshCw size={22} />} isDark={isDark} />
          <StatCard title="المساحة الموفرة" value={analytics.ctr} icon={<HardDrive size={22} />} isDark={isDark} />
          <StatCard title="سرعة المعالجة" value="~0.8s" icon={<Zap size={22} />} isDark={isDark} />
        </div>

        <div className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border ${isDark ? 'bg-zinc-900/50 border-emerald-500/10' : 'bg-white border-zinc-100 shadow-xl'}`}>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-lg md:text-xl font-black flex items-center gap-3 italic"><TrendingUp size={24} className="text-emerald-500" /> معدل الاستخدام الأسبوعي</h2>
          </div>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#27272a' : '#f3f4f6'} />
                <XAxis dataKey="name" stroke={isDark ? '#71717a' : '#9ca3af'} fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: isDark ? '#0a0a0a' : '#fff', borderRadius: '16px', border: 'none', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="conversions" name="عدد العمليات" stroke="#10b981" strokeWidth={4} fill="url(#colorC)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 md:p-12 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
          <div className="flex items-center gap-4 mb-6">
            <Settings2 size={24} className="text-emerald-500" />
            <h3 className="text-xl font-black italic">نظام التشفير والمعالجة</h3>
          </div>
          <p className="text-sm opacity-50 font-medium leading-relaxed">
            يتم تشغيل Storehalal Convert باستخدام مكتبات JavaScript متقدمة تعمل محلياً (On-device). هذا يعني أن الخوادم لا تلمس بيانات الصور الخاصة بك، مما يوفر أماناً بنسبة 100% ضد أي تسريب للبيانات.
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, isDark }: any) => (
  <div className={`p-8 rounded-[2rem] md:rounded-[2.5rem] border flex items-center gap-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mb-1">{title}</div>
      <div className="text-2xl font-black italic">{value}</div>
    </div>
  </div>
);

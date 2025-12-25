
import React from 'react';
import { Post, AnalyticsData } from '../types.ts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit2, Trash2, Eye, DollarSign, Settings, ShieldCheck, Users, TrendingUp, MousePointer2 } from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  isDark: boolean;
  analytics: AnalyticsData;
  onNewPost: () => void;
  onEditPost: (id: string) => void;
  onDeletePost: (id: string) => void;
  onOpenAdSense: () => void;
  onOpenSecurity: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  posts, isDark, analytics, onNewPost, onEditPost, onDeletePost, onOpenAdSense, onOpenSecurity 
}) => {
  const chartData = analytics.dailyEarnings.map((val, i) => ({
    name: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'][i],
    earnings: val
  }));

  const totalEarnings = analytics.dailyEarnings.reduce((a, b) => a + b, 0).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black mb-3 tracking-tighter italic">مركز التحكم</h1>
          <p className={`font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>مرحباً عبدو، إليك تقرير أداء "عبدو ويب" المباشر.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={onOpenSecurity} className={`px-6 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-emerald-400' : 'border-zinc-200 hover:bg-white text-zinc-600 shadow-lg'}`}><ShieldCheck size={20} className="text-emerald-500" />الأمان</button>
          <button onClick={onOpenAdSense} className={`px-6 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-emerald-400' : 'border-zinc-200 hover:bg-white text-zinc-600 shadow-lg'}`}><Settings size={20} className="text-zinc-400" />أدسنس</button>
          <button onClick={onNewPost} className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-2xl shadow-emerald-500/20 transition-all"><Plus size={20} />نشر مقال</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="إجمالي الزيارات" value={analytics.totalViews.toLocaleString()} icon={<Eye size={22} />} color="emerald" isDark={isDark} />
        <StatCard title="الزوار الآن" value={analytics.liveVisitors.toString()} icon={<Users size={22} />} color="emerald" isDark={isDark} pulse />
        <StatCard title="أرباح الأسبوع" value={`$${totalEarnings}`} icon={<DollarSign size={22} />} color="emerald" isDark={isDark} />
        <StatCard title="نسبة النقر (CTR)" value={analytics.ctr} icon={<MousePointer2 size={22} />} color="emerald" isDark={isDark} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className={`lg:col-span-2 p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900/50 border-emerald-500/10' : 'bg-white border-zinc-100 shadow-xl'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-black flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-500" /> اتجاه الأرباح (7 أيام)
            </h2>
            <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">+14% عن الأسبوع الماضي</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#27272a' : '#f3f4f6'} />
                <XAxis dataKey="name" stroke={isDark ? '#71717a' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: isDark ? '#0a0a0a' : '#fff', 
                    borderColor: '#10b98120',
                    borderRadius: '16px',
                    fontWeight: 'bold'
                  }} 
                />
                <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 rounded-[2.5rem] border flex flex-col justify-between ${isDark ? 'bg-zinc-900/50 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
          <div>
            <h3 className="text-sm font-black opacity-60 uppercase tracking-widest mb-6">توقعات أدسنس</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold opacity-50">سعر النقرة (CPC)</span>
                <span className="text-xl font-black">{analytics.cpc}</span>
              </div>
              <div className="w-full bg-emerald-500/10 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[65%]"></div>
              </div>
              <p className="text-[10px] leading-relaxed opacity-60">تعتمد هذه الأرقام على تتبع "عبدو ويب" التلقائي لتفاعلات المستخدمين مع المساحات الإعلانية المخصصة.</p>
            </div>
          </div>
          <button onClick={onOpenAdSense} className="w-full py-4 bg-black text-white dark:bg-emerald-500 dark:text-black rounded-2xl font-black text-sm transition-transform hover:scale-105">
            إدارة الوحدات الإعلانية
          </button>
        </div>
      </div>

      <div className={`rounded-[2.5rem] border overflow-hidden ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
        <div className="p-8 border-b border-zinc-800/10 flex justify-between items-center">
          <h3 className="font-black text-xl">المقالات المنشورة</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-zinc-500 bg-zinc-800/20' : 'text-zinc-400 bg-zinc-50'}`}>
                <th className="px-8 py-4">المحتوى</th>
                <th className="px-8 py-4">التصنيف</th>
                <th className="px-8 py-4 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-emerald-500/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-black group-hover:text-emerald-500 transition-colors">{post.title}</div>
                    <div className="text-[10px] opacity-40 mt-1 uppercase tracking-widest">{post.date}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black">{post.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => onEditPost(post.id)} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => onDeletePost(post.id)} className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, isDark, pulse = false }: { title: string, value: string, icon: any, color: string, isDark: boolean, pulse?: boolean }) => (
  <div className={`p-6 rounded-[2rem] border flex items-center gap-5 transition-transform hover:scale-105 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pulse ? 'animate-pulse' : ''} ${isDark ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">{title}</div>
      <div className="text-2xl font-black tracking-tighter">{value}</div>
    </div>
  </div>
);

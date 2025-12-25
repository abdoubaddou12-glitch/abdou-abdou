
import React from 'react';
import { Post } from '../types.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Plus, Edit2, Trash2, Eye, DollarSign, Settings } from 'lucide-react';

interface AdminPanelProps {
  posts: Post[];
  isDark: boolean;
  onNewPost: () => void;
  onEditPost: (id: string) => void;
  onDeletePost: (id: string) => void;
  onOpenAdSense: () => void;
}

const statsData = [
  { name: 'الأحد', views: 2400 },
  { name: 'الاثنين', views: 1398 },
  { name: 'الثلاثاء', views: 9800 },
  { name: 'الأربعاء', views: 3908 },
  { name: 'الخميس', views: 4800 },
  { name: 'الجمعة', views: 3800 },
  { name: 'السبت', views: 4300 },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ posts, isDark, onNewPost, onEditPost, onDeletePost, onOpenAdSense }) => {
  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black mb-3 tracking-tighter italic">الإدارة</h1>
          <p className={`font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>مرحباً بك مجدداً في عبدو ويب، إليك نظرة على أداء مدونتك.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onOpenAdSense}
            className={`px-6 py-4 rounded-2xl font-black flex items-center gap-2 border transition-all ${
              isDark ? 'border-zinc-800 hover:bg-zinc-900' : 'border-zinc-200 hover:bg-white'
            }`}
          >
            <Settings size={20} />
            إعدادات أدسنس
          </button>
          <button 
            onClick={onNewPost}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 shadow-2xl shadow-indigo-600/40 transition-all"
          >
            <Plus size={20} />
            إضافة محتوى جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
        <div className={`lg:col-span-3 p-8 rounded-[2.5rem] border ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/50'}`}>
          <h2 className="text-lg font-black mb-8 flex items-center gap-2">
            <Eye size={20} className="text-indigo-500" /> إحصائيات الزوار الأسبوعية
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#27272a' : '#f3f4f6'} />
                <XAxis dataKey="name" stroke={isDark ? '#71717a' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: isDark ? '#27272a' : '#f9fafb'}}
                  contentStyle={{ 
                    backgroundColor: isDark ? '#18181b' : '#fff', 
                    borderColor: isDark ? '#27272a' : '#e5e7eb',
                    borderRadius: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }} 
                />
                <Bar dataKey="views" radius={[10, 10, 10, 10]} barSize={40}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#4f46e5' : '#818cf8'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-10 rounded-[2.5rem] border flex flex-col items-center justify-center text-center ${isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-50 border-indigo-100 text-indigo-900'}`}>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
            <DollarSign size={24} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">إجمالي الأرباح المقدرة</span>
          <div className="text-4xl font-black mb-4 tracking-tighter">$142.00</div>
          <p className="text-xs font-bold opacity-80">أداء أدسنس لهذا الشهر</p>
        </div>
      </div>

      <div className={`rounded-[2.5rem] border overflow-hidden ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/50'}`}>
        <div className="p-8 border-b border-zinc-800/10 flex justify-between items-center">
          <h3 className="font-black text-xl">جميع المقالات</h3>
          <input 
            type="text" 
            placeholder="ابحث..." 
            className={`px-4 py-2 rounded-xl text-sm border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-50 border-zinc-200'}`} 
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[600px]">
            <thead>
              <tr className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-zinc-500 bg-zinc-800/20' : 'text-zinc-400 bg-zinc-50'}`}>
                <th className="px-8 py-6">المقال</th>
                <th className="px-8 py-6">التصنيف</th>
                <th className="px-8 py-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/10">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-black text-lg group-hover:text-indigo-500 transition-colors">{post.title}</div>
                    <div className="text-xs opacity-50 mt-1">{post.date}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full bg-zinc-500/10 text-[10px] font-black">{post.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => onEditPost(post.id)} 
                        className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDeletePost(post.id)} 
                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
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

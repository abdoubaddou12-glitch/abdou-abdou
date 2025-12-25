
import React from 'react';
import { Post } from '../types.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminPanelProps {
  posts: Post[];
  isDark: boolean;
  onNewPost: () => void;
  onEditPost: (id: string) => void;
  onDeletePost: (id: string) => void;
}

const statsData = [
  { name: 'يناير', views: 4000 },
  { name: 'فبراير', views: 3000 },
  { name: 'مارس', views: 5000 },
  { name: 'ابريل', views: 2780 },
  { name: 'مايو', views: 1890 },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ posts, isDark, onNewPost, onEditPost, onDeletePost }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black mb-2 italic">لوحة التحكم</h1>
          <p className={isDark ? 'text-zinc-400' : 'text-gray-500'}>إدارة المحتوى ومتابعة الإحصائيات</p>
        </div>
        <button 
          onClick={onNewPost}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg shadow-indigo-500/20"
        >
          مقالة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${isDark ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-gray-100'}`}>
          <h2 className="text-lg font-bold mb-6">مشاهدات المقالات</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#27272a' : '#f3f4f6'} />
                <XAxis dataKey="name" stroke={isDark ? '#71717a' : '#9ca3af'} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#18181b' : '#fff', 
                    borderColor: isDark ? '#27272a' : '#e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 2 ? '#4f46e5' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-6 rounded-2xl border flex flex-col justify-center text-center ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
          <div className="text-indigo-500 font-bold mb-2 uppercase tracking-widest text-xs">إجمالي المقالات</div>
          <div className="text-6xl font-black mb-4">{posts.length}</div>
        </div>
      </div>

      <div className={`rounded-2xl border overflow-x-auto ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
        <table className="w-full text-right border-collapse min-w-[600px]">
          <thead>
            <tr className={`border-b ${isDark ? 'border-zinc-800 bg-zinc-800/50' : 'border-gray-50 bg-gray-50'}`}>
              <th className="px-6 py-4 font-bold text-sm">العنوان</th>
              <th className="px-6 py-4 font-bold text-sm">التصنيف</th>
              <th className="px-6 py-4 font-bold text-sm text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className={`border-b transition-colors ${isDark ? 'border-zinc-800 hover:bg-zinc-800/30' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                <td className="px-6 py-4 font-semibold">{post.title}</td>
                <td className="px-6 py-4 text-sm">{post.category}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-reverse space-x-3">
                    <button onClick={() => onEditPost(post.id)} className="text-indigo-500 font-bold hover:underline">تعديل</button>
                    <button onClick={() => onDeletePost(post.id)} className="text-red-500 font-bold hover:underline">حذف</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
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
          <div className={`text-sm ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>+12% زيادة عن الشهر الماضي</div>
        </div>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className={`border-b ${isDark ? 'border-zinc-800 bg-zinc-800/50' : 'border-gray-50 bg-gray-50'}`}>
              <th className="px-6 py-4 font-bold text-sm">العنوان</th>
              <th className="px-6 py-4 font-bold text-sm">التصنيف</th>
              <th className="px-6 py-4 font-bold text-sm">الحالة</th>
              <th className="px-6 py-4 font-bold text-sm">التاريخ</th>
              <th className="px-6 py-4 font-bold text-sm text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className={`border-b transition-colors ${isDark ? 'border-zinc-800 hover:bg-zinc-800/30' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                <td className="px-6 py-4 font-semibold">{post.title}</td>
                <td className="px-6 py-4 text-sm">{post.category}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                    post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {post.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500">{post.date}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-reverse space-x-3">
                    <button onClick={() => onEditPost(post.id)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button onClick={() => onDeletePost(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
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

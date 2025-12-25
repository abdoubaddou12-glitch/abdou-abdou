
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { generatePostContent } from '../services/geminiService';

interface PostEditorProps {
  post?: Post;
  isDark: boolean;
  onSave: (post: Partial<Post>) => void;
  onCancel: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, isDark, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    category: 'تقنية',
    excerpt: '',
    content: '',
    status: 'draft',
    image: 'https://picsum.photos/800/600',
    ...post
  });

  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAssist = async () => {
    if (!formData.title) {
      alert("يرجى كتابة عنوان أولاً ليقوم الذكاء الاصطناعي بمساعدتك!");
      return;
    }
    setIsAiLoading(true);
    const content = await generatePostContent(formData.title || "");
    setFormData(prev => ({ ...prev, content }));
    setIsAiLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">{post ? 'تعديل المقالة' : 'كتابة مقالة جديدة'}</h1>
        <div className="flex space-x-reverse space-x-3">
          <button 
            onClick={onCancel}
            className={`px-6 py-2 rounded-xl border ${isDark ? 'border-zinc-800 text-zinc-400' : 'border-gray-200 text-gray-600'}`}
          >
            إلغاء
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold"
          >
            حفظ المقالة
          </button>
        </div>
      </div>

      <div className={`p-8 rounded-2xl border space-y-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
        <div>
          <label className="block text-sm font-bold mb-2 opacity-70">عنوان المقالة</label>
          <input 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
              isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
            }`}
            placeholder="مثال: مستقبل الذكاء الاصطناعي في 2025"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">التصنيف</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <option value="تقنية">تقنية</option>
              <option value="ثقافة">ثقافة</option>
              <option value="ريادة">ريادة</option>
              <option value="صحة">صحة</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">رابط صورة المقالة</label>
            <input 
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 opacity-70">مقتطف قصير</label>
          <textarea 
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border outline-none resize-none ${
              isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
            }`}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold opacity-70">محتوى المقالة</label>
            <button 
              type="button"
              onClick={handleAiAssist}
              disabled={isAiLoading}
              className={`text-xs font-bold flex items-center px-3 py-1 rounded-full border border-indigo-500/30 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all ${isAiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 11-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              {isAiLoading ? 'جاري التوليد...' : 'مساعدة ذكية (AI)'}
            </button>
          </div>
          <textarea 
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border outline-none font-mono text-sm leading-relaxed ${
              isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
            }`}
            placeholder="ابدأ بكتابة أفكارك هنا..."
          />
        </div>
      </div>
    </div>
  );
};

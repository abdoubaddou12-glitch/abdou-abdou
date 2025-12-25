
import React, { useState } from 'react';
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
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    ...post
  });

  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAssist = async () => {
    if (!formData.title) {
      alert("يرجى كتابة عنوان أولاً ليقوم الذكاء الاصطناعي بمساعدتك!");
      return;
    }
    setIsAiLoading(true);
    try {
      const content = await generatePostContent(formData.title || "");
      setFormData(prev => ({ 
        ...prev, 
        content,
        excerpt: content.substring(0, 150) + "..."
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black">{post ? 'تعديل المقالة' : 'كتابة مقالة جديدة'}</h1>
        <div className="flex space-x-reverse space-x-3 w-full md:w-auto">
          <button 
            onClick={onCancel}
            className={`flex-1 md:flex-none px-6 py-2 rounded-xl border transition-colors ${isDark ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}
          >
            إلغاء
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="flex-1 md:flex-none px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            حفظ المقالة
          </button>
        </div>
      </div>

      <div className={`p-8 rounded-2xl border space-y-6 shadow-xl ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 opacity-70">عنوان المقالة</label>
            <input 
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
              }`}
              placeholder="مثال: أهمية البرمجة في العصر الحديث"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">التصنيف</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border outline-none cursor-pointer ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <option value="تقنية">تقنية</option>
              <option value="ثقافة">ثقافة</option>
              <option value="ريادة">ريادة</option>
              <option value="تصميم">تصميم</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">رابط الصورة</label>
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
          <label className="block text-sm font-bold mb-2 opacity-70">مقتطف قصير (يظهر في الرئيسية)</label>
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
              className={`text-xs font-bold flex items-center px-4 py-1.5 rounded-full border border-indigo-500/30 text-indigo-500 hover:bg-indigo-600 hover:text-white transition-all ${isAiLoading ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'}`}
            >
              {isAiLoading ? (
                <svg className="animate-spin h-3 w-3 ml-2 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.586a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
                </svg>
              )}
              {isAiLoading ? 'جاري كتابة المقال...' : 'توليد محتوى ذكي'}
            </button>
          </div>
          <textarea 
            rows={12}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border outline-none font-sans text-base leading-relaxed ${
              isDark ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-50 border-gray-100'
            }`}
            placeholder="ابدأ بكتابة أفكارك هنا أو استخدم مساعد الذكاء الاصطناعي..."
          />
        </div>
      </div>
    </div>
  );
};

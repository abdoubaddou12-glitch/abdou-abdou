
import React, { useState } from 'react';
import { Post } from '../types.ts';
import { generatePostContent } from '../services/geminiService.ts';
import { Save, X, Sparkles } from 'lucide-react';

interface PostEditorProps {
  post?: Post;
  isDark: boolean;
  onSave: (post: Partial<Post>) => void;
  onCancel: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ post, isDark, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    category: 'أخبار المغرب',
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
          <button onClick={onCancel} className="px-6 py-3 rounded-2xl border flex items-center gap-2 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
            <X size={18} /> إلغاء
          </button>
          <button 
            onClick={() => onSave(formData)} 
            className="px-8 py-3 rounded-2xl bg-emerald-500 text-black font-black flex items-center gap-2 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            <Save size={18} /> حفظ المقال
          </button>
        </div>
      </div>

      <div className={`p-8 rounded-[2.5rem] border space-y-6 ${isDark ? 'bg-zinc-950 border-emerald-500/10' : 'bg-white border-gray-100 shadow-xl shadow-zinc-200/50'}`}>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">عنوان المقال</label>
          <input 
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-zinc-900 border-zinc-800 focus:border-emerald-500' : 'bg-gray-50 border-zinc-200'}`}
            placeholder="مثال: ملاعب الكان في المغرب 2025"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">المحتوى</label>
          <button 
            onClick={handleAiAssist} 
            disabled={isAiLoading}
            className={`flex items-center gap-2 text-sm font-black transition-all ${isAiLoading ? 'opacity-50 animate-pulse' : 'text-emerald-500 hover:text-emerald-400'}`}
          >
            <Sparkles size={16} />
            {isAiLoading ? 'جاري التوليد بواسطة Gemini...' : 'توليد المحتوى بالذكاء الاصطناعي'}
          </button>
        </div>

        <textarea 
          rows={12}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all font-medium leading-relaxed ${isDark ? 'bg-zinc-900 border-zinc-800 focus:border-emerald-500' : 'bg-gray-50 border-zinc-200'}`}
          placeholder="ابدأ بكتابة أفكارك هنا أو استخدم مساعد الذكاء الاصطناعي..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">رابط صورة الغلاف (URL)</label>
            <input 
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50'}`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest opacity-40 pr-2">التصنيف</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50'}`}
            >
              <option value="أخبار المغرب">أخبار المغرب</option>
              <option value="تقنية">تقنية</option>
              <option value="تطوير الذات">تطوير الذات</option>
              <option value="تقييم المنتجات">تقييم المنتجات</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};


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
      alert("يرجى كتابة عنوان أولاً!");
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
          <button onClick={onCancel} className="px-6 py-2 rounded-xl border">إلغاء</button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold">حفظ</button>
        </div>
      </div>

      <div className={`p-8 rounded-2xl border space-y-6 ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100'}`}>
        <input 
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50'}`}
          placeholder="عنوان المقالة"
        />
        <button 
          onClick={handleAiAssist} 
          disabled={isAiLoading}
          className="text-indigo-600 font-bold underline"
        >
          {isAiLoading ? 'جاري التوليد...' : 'استخدام الذكاء الاصطناعي لكتابة المحتوى'}
        </button>
        <textarea 
          rows={10}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl border outline-none ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50'}`}
          placeholder="محتوى المقالة..."
        />
      </div>
    </div>
  );
};

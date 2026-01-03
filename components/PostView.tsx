
import React from 'react';
import { Post } from '../types.ts';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

interface PostViewProps {
  post: Post;
  isDark: boolean;
  onBack: () => void;
}

export const PostView: React.FC<PostViewProps> = ({ post, isDark, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-slide-up px-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-10 opacity-50 hover:opacity-100 transition-all font-black uppercase tracking-widest text-xs"
      >
        <ArrowLeft size={16} /> العودة للمدونة
      </button>

      <article>
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-[10px] font-black uppercase tracking-widest text-emerald-500">
            <span className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-lg"><Tag size={12} /> {post.category}</span>
            <span className="flex items-center gap-2 opacity-40 text-white"><Calendar size={12} /> {post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-10 leading-tight text-glow">{post.title}</h1>
          <div className="rounded-[3rem] overflow-hidden border border-emerald-500/10 shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
          </div>
        </header>

        <div className={`prose prose-invert max-w-none font-medium leading-[2] text-lg ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {post.content.split('\n').map((para, i) => (
            para.trim() && <p key={i} className="mb-8">{para}</p>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-emerald-500/10 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-6 opacity-30">
                <Share2 size={20} className="text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest">نشر المقال</span>
            </div>
            {/* أزرار مشاركة مصغرة يمكن إضافتها هنا */}
        </footer>
      </article>
    </div>
  );
};

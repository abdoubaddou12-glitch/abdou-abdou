
import React from 'react';
import { Post } from '../types.ts';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isDark: boolean;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isDark, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className={`blog-card group cursor-pointer rounded-[2.5rem] overflow-hidden flex flex-col h-full border ${
        isDark 
          ? 'bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/30 shadow-2xl shadow-black/20' 
          : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:shadow-indigo-500/10'
      }`}
    >
      <header className="relative h-60 overflow-hidden">
        <img 
          src={post.image} 
          alt={`غلاف مقال: ${post.title}`} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-5 right-5">
          <span className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-indigo-500/10">
            {post.category}
          </span>
        </div>
      </header>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[11px] mb-4 opacity-60 font-black tracking-wide uppercase">
          <time className="flex items-center gap-1.5" dateTime={post.date}>
            <Calendar size={12} className="text-indigo-500" /> {post.date}
          </time>
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-indigo-500" /> {post.author}
          </div>
        </div>
        
        <h2 className="text-2xl font-black mb-4 leading-[1.3] group-hover:text-indigo-500 transition-colors">
          {post.title}
        </h2>
        
        <p className={`text-[15px] leading-relaxed mb-6 line-clamp-2 font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {post.excerpt}
        </p>
        
        <footer className="mt-auto flex items-center justify-between">
          <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs flex items-center gap-2 group-hover:gap-3 transition-all">
            اقرأ التفاصيل <ArrowRight size={14} />
          </span>
          <div className="w-10 h-1 bg-indigo-500/10 rounded-full overflow-hidden">
            <div className="w-0 group-hover:w-full h-full bg-indigo-600 transition-all duration-500"></div>
          </div>
        </footer>
      </div>
    </article>
  );
};


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
      className={`blog-card group cursor-pointer rounded-[2rem] overflow-hidden flex flex-col h-full border ${
        isDark 
          ? 'bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/30' 
          : 'bg-white border-zinc-100 shadow-xl shadow-zinc-200/50'
      }`}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-5 right-5">
          <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[11px] mb-4 opacity-60 font-bold">
          <div className="flex items-center gap-1"><Calendar size={12} /> {post.date}</div>
          <div className="flex items-center gap-1"><User size={12} /> {post.author}</div>
        </div>
        
        <h3 className="text-xl font-black mb-4 leading-snug group-hover:text-indigo-500 transition-colors">
          {post.title}
        </h3>
        
        <p className={`text-sm leading-relaxed mb-6 line-clamp-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-indigo-500 font-black text-xs flex items-center gap-2">
            اكتشف المزيد <ArrowRight size={14} className="group-hover:translate-x-[-4px] transition-transform" />
          </span>
          <div className="w-8 h-1 bg-indigo-500/20 rounded-full overflow-hidden">
            <div className="w-0 group-hover:w-full h-full bg-indigo-500 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

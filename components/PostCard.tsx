
import React from 'react';
import { Post } from '../types.ts';
import { Calendar, ArrowUpRight, Clock } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isDark: boolean;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isDark, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className="group cursor-pointer quantum-card flex flex-col h-full overflow-hidden"
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 dark:bg-black/80 backdrop-blur-xl px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] mb-6 opacity-40 font-black uppercase tracking-widest">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-emerald-500" /> {post.date}</span>
          <span className="flex items-center gap-2"><Clock size={14} className="text-emerald-500" /> 4 دقائق</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight group-hover:text-emerald-500 transition-colors tracking-tighter">
          {post.title}
        </h3>
        
        <p className="text-lg leading-relaxed mb-10 line-clamp-2 font-medium opacity-50">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-5 transition-all text-emerald-500">
            اقرأ المزيد <ArrowUpRight size={20} />
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-[10px]">
            AW
          </div>
        </div>
      </div>
    </article>
  );
};


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
      className="group cursor-pointer infinity-card flex flex-col h-full overflow-hidden"
    >
      <div className="relative h-96 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div className="absolute top-8 right-8">
          <span className="bg-white/95 dark:bg-black/90 backdrop-blur-2xl px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-12 flex flex-col flex-grow">
        <div className="flex items-center gap-6 text-[10px] mb-8 opacity-30 font-black uppercase tracking-widest">
          <span className="flex items-center gap-3"><Calendar size={16} className="text-emerald-500" /> {post.date}</span>
          <span className="flex items-center gap-3"><Clock size={16} className="text-emerald-500" /> 5 د</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black mb-8 leading-[1.1] group-hover:text-emerald-500 transition-colors tracking-tighter">
          {post.title}
        </h3>
        
        <p className="text-xl leading-relaxed mb-12 line-clamp-2 font-medium opacity-40">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-10 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 group-hover:gap-6 transition-all text-emerald-500">
            اقرأ التفاصيل <ArrowUpRight size={24} />
          </span>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xs italic">
            AV
          </div>
        </div>
      </div>
    </article>
  );
};

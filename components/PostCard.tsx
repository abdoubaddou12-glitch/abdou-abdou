
import React from 'react';
import { Post } from '../types.ts';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isDark: boolean;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className="group cursor-pointer emerald-card flex flex-col h-full overflow-hidden"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
        <div className="absolute top-6 right-6">
          <span className="bg-emerald-500 text-black px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[9px] mb-6 opacity-30 font-black uppercase tracking-widest">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-emerald-500" /> {post.date}</span>
        </div>
        
        <h3 className="text-2xl font-black mb-6 leading-tight group-hover:text-emerald-500 transition-colors tracking-tighter">
          {post.title}
        </h3>
        
        <p className="text-base leading-relaxed mb-10 line-clamp-2 font-medium opacity-40">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-8 border-t border-emerald-500/10 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 text-emerald-500 group-hover:gap-6 transition-all">
            استكشف <ArrowUpRight size={18} />
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-[10px]">
            E
          </div>
        </div>
      </div>
    </article>
  );
};

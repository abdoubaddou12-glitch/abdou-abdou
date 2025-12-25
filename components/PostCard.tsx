
import React from 'react';
import { Post } from '../types.ts';
import { Calendar, ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isDark: boolean;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isDark, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className="group cursor-pointer"
    >
      <div className="neo-card rounded-[2.5rem] overflow-hidden flex flex-col h-full">
        <div className="relative h-72 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-6 right-6">
            <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-10 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-[10px] mb-6 opacity-40 font-black uppercase tracking-widest">
            <Calendar size={14} className="text-emerald-500" /> {post.date}
          </div>
          
          <h3 className="text-2xl font-black mb-6 leading-snug group-hover:text-emerald-500 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-[15px] leading-relaxed mb-10 line-clamp-2 font-medium opacity-60">
            {post.excerpt}
          </p>
          
          <div className="mt-auto flex items-center justify-between border-t border-emerald-500/10 pt-8">
            <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
              اقرأ المزيد <ArrowUpRight size={18} className="text-emerald-500" />
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xs">
              AW
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

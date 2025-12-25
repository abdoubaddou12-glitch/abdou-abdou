
import React from 'react';
import { Post } from '../types.ts';
import { Calendar, User, ArrowUpLeft } from 'lucide-react';

interface PostCardProps {
  post: Post;
  isDark: boolean;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isDark, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className="group cursor-pointer relative"
    >
      <div className={`glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full group-hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.2)] group-hover:-translate-y-2`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-6 right-6">
            <span className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-xl">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-[10px] mb-4 opacity-50 font-black uppercase tracking-tighter">
            <div className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</div>
            <div className="flex items-center gap-1.5"><User size={12} /> {post.author}</div>
          </div>
          
          <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
          
          <p className={`text-[15px] leading-relaxed mb-8 line-clamp-2 font-medium opacity-60`}>
            {post.excerpt}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              اكتشف المزيد <ArrowUpLeft size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-600/5 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <span className="text-xs font-black">BW</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

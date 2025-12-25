
import React from 'react';
import { Post } from '../types.ts';

interface PostCardProps {
  post: Post;
  isDark: boolean;
  onClick: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isDark, onClick }) => {
  return (
    <article 
      onClick={() => onClick(post.id)}
      className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${isDark ? 'bg-zinc-900 border-zinc-800 hover:border-indigo-500/50' : 'bg-white border-gray-100'}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-xs mb-3 text-indigo-500 font-semibold space-x-reverse space-x-3">
          <span>{post.date}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors leading-tight">
          {post.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>
          {post.excerpt}
        </p>
        <div className="flex items-center text-indigo-600 font-bold text-sm">
          اقرأ المزيد
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform group-hover:translate-x-[-4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    </article>
  );
};
